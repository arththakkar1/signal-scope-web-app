"""Evaluate models on unseen generators (Midjourney/DALL-E/SD)."""
import sys
from pathlib import Path
import numpy as np
import torch
from datasets import load_dataset
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score, roc_auc_score

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT))

from model.training.cifake_model import build_model, checkpoint_path as cifake_checkpoint_path, evaluation_transform
from model.training.clip_probe_model import load_clip_backbone, build_probe, checkpoint_path as clip_checkpoint_path

def evaluate():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    # Load CIFAKE ResNet-18
    cifake_ckpt = cifake_checkpoint_path()
    if not cifake_ckpt.exists():
        print(f"No checkpoint at {cifake_ckpt}")
        sys.exit(1)
    resnet = build_model(pretrained=False).to(device)
    resnet.load_state_dict(torch.load(cifake_ckpt, map_location=device, weights_only=True)["model_state_dict"])
    resnet.eval()
    resnet_transform = evaluation_transform()

    # Load CLIP Probe
    clip_ckpt = clip_checkpoint_path()
    if not clip_ckpt.exists():
        print(f"No checkpoint at {clip_ckpt}")
        sys.exit(1)
    encoder, clip_transform = load_clip_backbone()
    encoder = encoder.to(device)
    probe = build_probe(embed_dim=512).to(device)
    probe.load_state_dict(torch.load(clip_ckpt, map_location=device, weights_only=True)["model_state_dict"])
    probe.eval()

    # Load dataset
    print("Loading dataset...")
    dataset = load_dataset("julienlucas/midjourney-dalle-sd-dataset", split="test", cache_dir=str(PROJECT_ROOT / "data" / "unseen-cache"))

    resnet_scores = []
    clip_scores = []
    labels = []

    print("Evaluating models...")
    with torch.inference_mode():
        for item in dataset:
            img = item["image"].convert("RGB")
            
            # Raw label 0=fake, 1=real -> Transformed label 1=fake, 0=real
            raw_label = item["label"]
            label = 1 - raw_label
            labels.append(label)

            # CIFAKE ResNet-18 inference
            resnet_input = resnet_transform(img).unsqueeze(0).to(device)
            resnet_logits = resnet(resnet_input)
            resnet_score = torch.softmax(resnet_logits, dim=1)[0, 0].cpu().item()
            resnet_scores.append(resnet_score)

            # CLIP Probe inference
            clip_input = clip_transform(img).unsqueeze(0).to(device)
            features = encoder(clip_input)
            clip_logits = probe(features)
            clip_score = torch.softmax(clip_logits, dim=1)[0, 0].cpu().item()
            clip_scores.append(clip_score)

    labels = np.array(labels)
    
    def print_metrics(model_name, scores):
        scores = np.array(scores)
        preds = (scores >= 0.5).astype(int)
        print(f"--- {model_name} ---")
        print(f"ROC-AUC:   {roc_auc_score(labels, scores):.4f}")
        print(f"Accuracy:  {accuracy_score(labels, preds):.4f}")
        print(f"Macro-F1:  {f1_score(labels, preds, average='macro'):.4f}")
        print(f"FPR:       {(preds[labels == 0] == 1).mean():.4f}")
        print(f"Confusion Matrix (rows=actual, cols=predicted, 0=real 1=AI):\n{confusion_matrix(labels, preds)}\n")

    print_metrics("CIFAKE ResNet-18", resnet_scores)
    print_metrics("CLIP Linear Probe", clip_scores)

if __name__ == "__main__":
    evaluate()
