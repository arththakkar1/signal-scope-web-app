"""Image preprocessing and inference helpers for the Django API."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path
import sys

import numpy as np
from PIL import Image, UnidentifiedImageError
import torch

PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from model.training.cifake_model import build_model, checkpoint_path, evaluation_transform

_MODEL: torch.nn.Module | None = None


def get_model() -> torch.nn.Module:
    """Load the validated CIFAKE checkpoint once per Django process."""
    global _MODEL
    if _MODEL is None:
        path = checkpoint_path()
        if not path.exists():
            raise FileNotFoundError("No trained model checkpoint is available.")
        checkpoint = torch.load(path, map_location="cpu", weights_only=True)
        _MODEL = build_model(pretrained=False)
        _MODEL.load_state_dict(checkpoint["model_state_dict"])
        _MODEL.eval()
    return _MODEL


def preprocess_image(image_bytes: bytes) -> torch.Tensor:
    """Convert an image to the normalized NHWC tensor expected by the model."""
    try:
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
    except (UnidentifiedImageError, OSError) as error:
        raise ValueError("Upload a valid image file.") from error

    return evaluation_transform()(image).unsqueeze(0)


def classify_image(image_bytes: bytes) -> dict[str, float | str | bool]:
    """Return the model's responsible likelihood assessment for one image."""
    image = preprocess_image(image_bytes)
    model = get_model()
    with torch.inference_mode():
        probabilities = torch.softmax(model(image), dim=1).numpy()[0]

    real_probability = float(probabilities[0])
    ai_probability = float(probabilities[1])
    is_ai = ai_probability > 0.5
    confidence = ai_probability if is_ai else real_probability

    return {
        "verdict": "Likely AI-generated" if is_ai else "Likely real",
        "confidence": round(confidence * 100, 2),
        "ai_probability": round(ai_probability * 100, 2),
        "real_probability": round(real_probability * 100, 2),
        "threshold_used": 0.5,
        "is_trained_model": True,
    }
