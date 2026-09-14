"""Evaluate the trained CIFAKE ResNet-18 and print all required metrics."""
import sys
from pathlib import Path
import numpy as np
import torch
from datasets import load_dataset
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score, roc_auc_score

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT))
from model.training.cifake_model import build_model, checkpoint_path, evaluation_transform
from model.training.train_cifake import make_loader

def evaluate():
    ckpt = checkpoint_path()
    if not ckpt.exists():
        print(f"No checkpoint at {ckpt}")
        sys.exit(1)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = build_model(pretrained=False).to(device)
    checkpoint = torch.load(ckpt, map_location=device, weights_only=True)
    model.load_state_dict(checkpoint["model_state_dict"])
    model.eval()

    dataset = load_dataset("dragonintelligence/CIFAKE-image-dataset",
                            cache_dir=str(PROJECT_ROOT / "data" / "cifake-cache"))
    loader = make_loader(dataset["test"], evaluation_transform(), 64, False)

    all_labels, all_scores = [], []
    with torch.inference_mode():
        for batch in loader:
            logits = model(batch["pixel_values"].to(device))
            fake_probs = torch.softmax(logits, dim=1)[:, 0].cpu().numpy()
            all_scores.extend(fake_probs.tolist())
            all_labels.extend((1 - batch["labels"].numpy()).tolist())

    scores, labels = np.array(all_scores), np.array(all_labels)
    preds = (scores >= 0.5).astype(int)

    print(f"ROC-AUC:   {roc_auc_score(labels, scores):.4f}")
    print(f"Accuracy:  {accuracy_score(labels, preds):.4f}")
    print(f"Macro-F1:  {f1_score(labels, preds, average='macro'):.4f}")
    print(f"FPR:       {(preds[labels == 0] == 1).mean():.4f}")
    print(f"Confusion Matrix (rows=actual, cols=predicted, 0=real 1=AI):\n{confusion_matrix(labels, preds)}")

if __name__ == "__main__":
    evaluate()