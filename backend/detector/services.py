"""Image preprocessing and inference helpers for the Django API."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path
import sys
from typing import Any

import jax
import jax.numpy as jnp
import numpy as np
from PIL import Image, UnidentifiedImageError

PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from model.training.train import create_train_state


_MODEL_STATE: Any | None = None
IMAGE_SIZE = (224, 224)


def get_model_state() -> Any:
    """Create the baseline model once per Django process."""
    global _MODEL_STATE
    if _MODEL_STATE is None:
        _MODEL_STATE = create_train_state(jax.random.PRNGKey(42), learning_rate=1e-3)
    return _MODEL_STATE


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """Convert an image to the normalized NHWC tensor expected by the model."""
    try:
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
    except (UnidentifiedImageError, OSError) as error:
        raise ValueError("Upload a valid image file.") from error

    image = image.resize(IMAGE_SIZE)
    pixels = np.asarray(image, dtype=np.float32) / 255.0
    mean = np.asarray([0.485, 0.456, 0.406], dtype=np.float32)
    std = np.asarray([0.229, 0.224, 0.225], dtype=np.float32)
    return ((pixels - mean) / std)[np.newaxis, ...]


def classify_image(image_bytes: bytes) -> dict[str, float | str | bool]:
    """Return the model's responsible likelihood assessment for one image."""
    image = preprocess_image(image_bytes)
    state = get_model_state()
    logits = state.apply_fn({"params": state.params}, jnp.asarray(image), training=False)
    probabilities = np.asarray(jax.nn.softmax(logits, axis=-1))[0]

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
        "is_trained_model": False,
    }
