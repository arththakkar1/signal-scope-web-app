"""Fine-tune a ResNet-18 on the official CIFAKE dataset."""

from __future__ import annotations

import argparse
import json
import random
from pathlib import Path

import numpy as np
import torch
from datasets import Dataset, load_dataset
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
from torch.utils.data import DataLoader

from model.training.cifake_model import build_model, checkpoint_path, evaluation_transform, training_transform


DATASET_ID = "dragonintelligence/CIFAKE-image-dataset"
SEED = 42


def select_device() -> torch.device:
    if torch.backends.mps.is_available():
        return torch.device("mps")
    if torch.cuda.is_available():
        return torch.device("cuda")
    return torch.device("cpu")


def set_seed() -> None:
    random.seed(SEED)
    np.random.seed(SEED)
    torch.manual_seed(SEED)


def make_loader(dataset: Dataset, transform, batch_size: int, shuffle: bool) -> DataLoader:
    def transform_examples(examples):
        examples["pixel_values"] = [transform(image.convert("RGB")) for image in examples["image"]]
        return examples

    prepared = dataset.with_transform(transform_examples)

    def collate(examples):
        return {
            "pixel_values": torch.stack([example["pixel_values"] for example in examples]),
            "labels": torch.tensor([example["label"] for example in examples], dtype=torch.long),
        }

    return DataLoader(prepared, batch_size=batch_size, shuffle=shuffle, num_workers=0, collate_fn=collate)


@torch.inference_mode()
def evaluate(model: torch.nn.Module, loader: DataLoader, device: torch.device) -> dict[str, float]:
    model.eval()
    labels, scores = [], []
    for batch in loader:
        logits = model(batch["pixel_values"].to(device))
        # CIFAKE labels are 0=fake and 1=real. Use fake probability as the positive score.
        fake_scores = torch.softmax(logits, dim=1)[:, 0].cpu().numpy()
        scores.extend(fake_scores.tolist())
        labels.extend((1 - batch["labels"].numpy()).tolist())

    predictions = (np.asarray(scores) >= 0.5).astype(int)
    return {
        "roc_auc": float(roc_auc_score(labels, scores)),
        "accuracy": float(accuracy_score(labels, predictions)),
        "macro_f1": float(f1_score(labels, predictions, average="macro")),
    }


def train(epochs: int, batch_size: int, max_train_samples: int | None) -> dict[str, float]:
    set_seed()
    project_root = Path(__file__).resolve().parents[2]
    cache_dir = project_root / "data" / "cifake-cache"
    dataset = load_dataset(DATASET_ID, cache_dir=str(cache_dir))
    train_split = dataset["train"]
    if max_train_samples:
        train_split = train_split.shuffle(seed=SEED).select(range(min(max_train_samples, len(train_split))))
    split = train_split.train_test_split(test_size=0.1, seed=SEED, stratify_by_column="label")

    device = select_device()
    model = build_model(pretrained=True).to(device)
    optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=1e-4)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)
    loss_function = torch.nn.CrossEntropyLoss()
    train_loader = make_loader(split["train"], training_transform(), batch_size, shuffle=True)
    validation_loader = make_loader(split["test"], evaluation_transform(), batch_size, shuffle=False)
    test_loader = make_loader(dataset["test"], evaluation_transform(), batch_size, shuffle=False)

    best_validation_auc = -1.0
    output_path = checkpoint_path()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    for epoch in range(1, epochs + 1):
        model.train()
        total_loss = 0.0
        for batch in train_loader:
            optimizer.zero_grad(set_to_none=True)
            logits = model(batch["pixel_values"].to(device))
            loss = loss_function(logits, batch["labels"].to(device))
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
            optimizer.step()
            total_loss += loss.item()
        scheduler.step()
        validation_metrics = evaluate(model, validation_loader, device)
        print(json.dumps({"epoch": epoch, "train_loss": total_loss / len(train_loader), **validation_metrics}))
        if validation_metrics["roc_auc"] > best_validation_auc:
            best_validation_auc = validation_metrics["roc_auc"]
            torch.save(
                {
                    "model_state_dict": model.state_dict(),
                    "architecture": "resnet18",
                    "dataset": "CIFAKE",
                    "labels": {"0": "AI-generated", "1": "real"},
                    "validation_metrics": validation_metrics,
                },
                output_path,
            )

    checkpoint = torch.load(output_path, map_location=device, weights_only=True)
    model.load_state_dict(checkpoint["model_state_dict"])
    test_metrics = evaluate(model, test_loader, device)
    metrics = {"device": str(device), "best_validation_auc": best_validation_auc, "test": test_metrics}
    report_path = project_root / "report" / "model-report" / "cifake_resnet18_metrics.json"
    report_path.write_text(json.dumps(metrics, indent=2) + "\n")
    print(json.dumps(metrics, indent=2))
    return metrics


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--epochs", type=int, default=3)
    parser.add_argument("--batch-size", type=int, default=64)
    parser.add_argument("--max-train-samples", type=int)
    arguments = parser.parse_args()
    train(arguments.epochs, arguments.batch_size, arguments.max_train_samples)
