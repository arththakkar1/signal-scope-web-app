"""Model and preprocessing for the CLIP linear probe pipeline."""

from __future__ import annotations

from pathlib import Path

import torch
import open_clip


CLASS_NAMES = ("AI-generated", "real")


def load_clip_backbone():
    """Load pretrained CLIP ViT-B-32 encoder and its transform."""
    model, _, preprocess = open_clip.create_model_and_transforms('ViT-B-32-quickgelu', pretrained='openai')
    # Freeze every parameter
    model.requires_grad_(False)
    model.eval()
    return model.visual, preprocess


def build_probe(embed_dim: int = 512) -> torch.nn.Module:
    """Create a linear probe classification head."""
    return torch.nn.Linear(embed_dim, len(CLASS_NAMES))


def checkpoint_path() -> Path:
    return Path(__file__).resolve().parents[1] / "checkpoints" / "clip_linear_probe.pt"