"""Model and preprocessing shared by CIFAKE training and Django inference."""

from __future__ import annotations

from pathlib import Path

import torch
from torchvision.models import ResNet18_Weights, resnet18
from torchvision.transforms import v2


CLASS_NAMES = ("AI-generated", "real")
IMAGE_SIZE = 224


def build_model(pretrained: bool = True) -> torch.nn.Module:
    """Create a binary ResNet-18 classifier, optionally ImageNet initialized."""
    weights = ResNet18_Weights.IMAGENET1K_V1 if pretrained else None
    model = resnet18(weights=weights)
    model.fc = torch.nn.Linear(model.fc.in_features, len(CLASS_NAMES))
    return model


def training_transform() -> v2.Compose:
    return v2.Compose(
        [
            v2.ToImage(),
            v2.ToDtype(torch.float32, scale=True),
            v2.RandomResizedCrop((IMAGE_SIZE, IMAGE_SIZE), scale=(0.75, 1.0), ratio=(0.9, 1.1), antialias=True),
            v2.RandomHorizontalFlip(),
            v2.RandomRotation(10),
            v2.ColorJitter(brightness=0.1, contrast=0.1, saturation=0.05),
            v2.GaussianBlur(kernel_size=3, sigma=(0.1, 1.2)),
            v2.Normalize(mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)),
        ]
    )


def evaluation_transform() -> v2.Compose:
    return v2.Compose(
        [
            v2.ToImage(),
            v2.ToDtype(torch.float32, scale=True),
            v2.Resize((IMAGE_SIZE, IMAGE_SIZE), antialias=True),
            v2.Normalize(mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)),
        ]
    )


def checkpoint_path() -> Path:
    return Path(__file__).resolve().parents[1] / "checkpoints" / "cifake_resnet18.pt"
