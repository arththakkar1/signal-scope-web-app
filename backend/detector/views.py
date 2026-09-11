"""JSON endpoints used by the SignalScope web interface."""

from __future__ import annotations

from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_http_methods

from .services import classify_image


MAX_UPLOAD_SIZE = 10 * 1024 * 1024


def _json_response(payload: dict, status: int = 200) -> JsonResponse:
    response = JsonResponse(payload, status=status)
    response["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


@require_GET
def ping(_: HttpRequest) -> JsonResponse:
    return _json_response({"status": "ok", "service": "signalscope-django"})


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def predict(request: HttpRequest) -> JsonResponse:
    if request.method == "OPTIONS":
        return _json_response({})

    image = request.FILES.get("image")
    if image is None:
        return _json_response({"detail": "Provide an image using the 'image' form field."}, 400)
    if image.size > MAX_UPLOAD_SIZE:
        return _json_response({"detail": "The image must be 10 MB or smaller."}, 400)

    try:
        return _json_response(classify_image(image.read()))
    except ValueError as error:
        return _json_response({"detail": str(error)}, 400)
    except FileNotFoundError as error:
        return _json_response({"detail": str(error)}, 503)
    except Exception:
        return _json_response({"detail": "Image analysis could not be completed."}, 500)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def explain(request: HttpRequest) -> JsonResponse:
    """Return bounded, non-fabricated explanation text for the current baseline."""
    if request.method == "OPTIONS":
        return _json_response({})

    image = request.FILES.get("image")
    if image is None:
        return _json_response({"detail": "Provide an image using the 'image' form field."}, 400)
    if image.size > MAX_UPLOAD_SIZE:
        return _json_response({"detail": "The image must be 10 MB or smaller."}, 400)

    try:
        prediction = classify_image(image.read())
    except ValueError as error:
        return _json_response({"detail": str(error)}, 400)
    except FileNotFoundError as error:
        return _json_response({"detail": str(error)}, 503)
    except Exception:
        return _json_response({"detail": "Image analysis could not be completed."}, 500)

    prediction["visual_cues"] = [
        "Explanation heatmaps are not available in the current baseline.",
        "This assessment must not be treated as proof of image provenance.",
    ]
    return _json_response(prediction)
