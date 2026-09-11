from unittest.mock import patch

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase


class DetectorApiTests(TestCase):
    def test_ping_reports_django_service(self):
        response = self.client.get("/api/ping/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["service"], "signalscope-django")

    @patch("detector.views.classify_image")
    def test_predict_passes_uploaded_image_to_model(self, classify_image):
        classify_image.return_value = {
            "verdict": "Likely real",
            "confidence": 75.0,
            "ai_probability": 25.0,
            "real_probability": 75.0,
            "threshold_used": 0.5,
            "is_trained_model": False,
        }
        image = SimpleUploadedFile("sample.png", b"image-bytes", content_type="image/png")

        response = self.client.post("/api/predict/", {"image": image})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["verdict"], "Likely real")
        classify_image.assert_called_once_with(b"image-bytes")

    @patch("detector.views.classify_image")
    def test_explain_returns_prediction_with_visual_cues(self, classify_image):
        classify_image.return_value = {
            "verdict": "Likely AI-generated",
            "confidence": 88.0,
            "ai_probability": 88.0,
            "real_probability": 12.0,
            "threshold_used": 0.5,
            "is_trained_model": True,
        }
        image = SimpleUploadedFile("sample.png", b"image-bytes", content_type="image/png")

        response = self.client.post("/api/explain/", {"image": image})

        self.assertEqual(response.status_code, 200)
        self.assertIn("visual_cues", response.json())
        self.assertGreaterEqual(len(response.json()["visual_cues"]), 2)
        classify_image.assert_called_once_with(b"image-bytes")

    def test_predict_requires_image(self):
        response = self.client.post("/api/predict/")

        self.assertEqual(response.status_code, 400)
