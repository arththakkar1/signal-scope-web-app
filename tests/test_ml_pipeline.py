from io import BytesIO

import torch
from PIL import Image

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


def test_preprocess_image_rejects_invalid_bytes():
    try:
        services.preprocess_image(b"not-an-image")
    except ValueError as error:
        assert "valid image" in str(error)
    else:
        raise AssertionError("Invalid input bytes should raise ValueError")
