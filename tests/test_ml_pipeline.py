from io import BytesIO
from pathlib import Path
import sys

import torch
from PIL import Image

BACKEND_DIR = Path(__file__).resolve().parents[1] / "backend"
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from detector import services
from model.training.cifake_model import build_model, evaluation_transform


def make_image_bytes() -> bytes:
    image = Image.new("RGB", (32, 32), color=(120, 120, 120))
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return buffer.getvalue()


def test_build_model_exposes_two_output_classes():
    model = build_model(pretrained=False)

    assert model.fc.out_features == 2


def test_evaluation_transform_produces_model_input_shape():
    tensor = evaluation_transform()(Image.new("RGB", (24, 24), color=(255, 255, 255)))

    assert tensor.shape == (3, 224, 224)
    assert tensor.dtype == torch.float32


def test_classify_image_loads_checkpoint_and_returns_prediction(tmp_path, monkeypatch):
    checkpoint_file = tmp_path / "cifake_resnet18.pt"
    reference_model = build_model(pretrained=False)
    torch.save({"model_state_dict": reference_model.state_dict()}, checkpoint_file)

    monkeypatch.setattr(services, "checkpoint_path", lambda: checkpoint_file)
    monkeypatch.setattr(services, "_MODEL", None)

    result = services.classify_image(make_image_bytes())

    assert result["threshold_used"] == 0.5
    assert result["is_trained_model"] is True
    assert set(result) >= {
        "verdict",
        "confidence",
        "ai_probability",
        "real_probability",
        "threshold_used",
        "is_trained_model",
    }


def test_classify_image_treats_class_zero_as_ai_generated(tmp_path, monkeypatch):
    checkpoint_file = tmp_path / "cifake_resnet18.pt"

    class FixedLogitsModel(torch.nn.Module):
        def forward(self, _images):
            return torch.tensor([[5.0, -5.0]])

    torch.save({"model_state_dict": build_model(pretrained=False).state_dict()}, checkpoint_file)

    monkeypatch.setattr(services, "checkpoint_path", lambda: checkpoint_file)
    monkeypatch.setattr(services, "_MODEL", FixedLogitsModel())
    monkeypatch.setattr(services, "_MODEL_IS_TRAINED", True)

    result = services.classify_image(make_image_bytes())

    assert result["verdict"] == "Likely AI-generated"
    assert result["ai_probability"] > result["real_probability"]
    assert result["is_trained_model"] is True


def test_classify_image_falls_back_when_checkpoint_is_missing(tmp_path, monkeypatch):
    missing_checkpoint = tmp_path / "missing.pt"

    monkeypatch.setattr(services, "checkpoint_path", lambda: missing_checkpoint)
    monkeypatch.setattr(services, "_MODEL", None)
    monkeypatch.setattr(services, "_MODEL_IS_TRAINED", None)

    result = services.classify_image(make_image_bytes())

    assert result["is_trained_model"] is False
    assert result["threshold_used"] == 0.5


def test_preprocess_image_rejects_invalid_bytes():
    try:
        services.preprocess_image(b"not-an-image")
    except ValueError as error:
        assert "valid image" in str(error)
    else:
        raise AssertionError("Invalid input bytes should raise ValueError")


if __name__ == "__main__":
    import pytest

    raise SystemExit(pytest.main([__file__]))
