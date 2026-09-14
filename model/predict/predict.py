"""Standalone CLI for SignalScope inference — mandatory SIH deliverable.
Usage: python model/predict/predict.py --image path/to/image.jpg [--model resnet|clip] [--threshold 0.5]
"""
import argparse
import json
import sys
from pathlib import Path

import torch
from PIL import Image

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT))


def predict_resnet(image_path: str, threshold: float) -> dict:
    from model.training.cifake_model import build_model, checkpoint_path, evaluation_transform

    ckpt = checkpoint_path()
    if not ckpt.exists():
        return {"error": f"No checkpoint at {ckpt}"}

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = build_model(pretrained=False).to(device)
    state = torch.load(ckpt, map_location=device, weights_only=True)
    model.load_state_dict(state["model_state_dict"])
    model.eval()

    img = Image.open(image_path).convert("RGB")
    tensor = evaluation_transform()(img).unsqueeze(0).to(device)

    with torch.inference_mode():
        logits = model(tensor)
        probs = torch.softmax(logits, dim=1)[0]

    return finalize(probs, threshold, is_trained=True)


def predict_clip(image_path: str, threshold: float) -> dict:
    from model.training.clip_probe_model import load_clip_backbone, build_probe, checkpoint_path

    ckpt = checkpoint_path()
    if not ckpt.exists():
        return {"error": f"No checkpoint at {ckpt}"}

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    encoder, transform = load_clip_backbone()
    encoder = encoder.to(device)
    probe = build_probe(embed_dim=512).to(device)
    state = torch.load(ckpt, map_location=device, weights_only=True)
    probe.load_state_dict(state["model_state_dict"])
    probe.eval()

    img = Image.open(image_path).convert("RGB")
    tensor = transform(img).unsqueeze(0).to(device)

    with torch.inference_mode():
        features = encoder(tensor)
        logits = probe(features)
        probs = torch.softmax(logits, dim=1)[0]

    return finalize(probs, threshold, is_trained=True)


def finalize(probs, threshold, is_trained):
    # index 0 = fake/AI probability, matching the convention used throughout eval scripts
    ai_probability = round(probs[0].item() * 100, 2)
    real_probability = round(probs[1].item() * 100, 2)
    verdict = "Likely AI-generated" if ai_probability >= threshold * 100 else "Likely real"
    return {
        "verdict": verdict,
        "confidence": max(ai_probability, real_probability),
        "ai_probability": ai_probability,
        "real_probability": real_probability,
        "threshold_used": threshold,
        "is_trained_model": is_trained,
    }


def main():
    parser = argparse.ArgumentParser(description="SignalScope standalone image classifier")
    parser.add_argument("--image", required=True, help="Path to the image file")
    parser.add_argument("--model", choices=["resnet", "clip"], default="resnet")
    parser.add_argument("--threshold", type=float, default=0.5)
    args = parser.parse_args()

    if not Path(args.image).exists():
        print(json.dumps({"error": f"Image not found: {args.image}"}))
        sys.exit(1)

    result = predict_resnet(args.image, args.threshold) if args.model == "resnet" else predict_clip(args.image, args.threshold)
    print(json.dumps(result, indent=2))
    if "error" in result:
        sys.exit(1)


if __name__ == "__main__":
    main()