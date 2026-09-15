"""JSON endpoints used by the SignalScope web interface."""

from __future__ import annotations

import json

from django.contrib.auth import authenticate, logout
from django.contrib.auth.models import User
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_http_methods
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from .models import UsageRecord
from .services import classify_image

MAX_UPLOAD_SIZE = 10 * 1024 * 1024
GUEST_LIMIT = 3


def _json_response(payload: dict, status: int = 200) -> JsonResponse:
    return JsonResponse(payload, status=status)


# ---------------------------------------------------------------------------
# JWT Cookie Helpers
# ---------------------------------------------------------------------------

def _set_jwt_cookies(response: JsonResponse, access_token: str, refresh_token: str) -> JsonResponse:
    """Set access and refresh tokens in HttpOnly cookies."""
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        samesite="Lax",
        secure=False,  # Set to True in HTTPS production
        path="/",
        max_age=7 * 24 * 3600,
    )
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite="Lax",
        secure=False,  # Set to True in HTTPS production
        path="/",
        max_age=15 * 60,
    )
    return response


def _clear_jwt_cookies(response: JsonResponse) -> JsonResponse:
    """Delete access and refresh token cookies."""
    response.delete_cookie("refresh_token", path="/", samesite="Lax")
    response.delete_cookie("access_token", path="/", samesite="Lax")
    response.delete_cookie("sessionid", path="/", samesite="Lax")
    response.set_cookie("refresh_token", "", max_age=0, path="/", httponly=True, samesite="Lax")
    response.set_cookie("access_token", "", max_age=0, path="/", httponly=True, samesite="Lax")
    response.set_cookie("sessionid", "", max_age=0, path="/", httponly=True, samesite="Lax")
    return response


def _get_user_from_request(request: HttpRequest) -> User | None:
    """Resolve user from Authorization header, access_token cookie, or Django session."""
    auth_header = request.headers.get("Authorization", "")
    token_str = None
    if auth_header.startswith("Bearer "):
        token_str = auth_header.split(" ", 1)[1].strip()

    if not token_str:
        token_str = request.COOKIES.get("access_token")

    if token_str:
        try:
            token = AccessToken(token_str)
            user_id = token.get("user_id")
            if user_id:
                return User.objects.get(id=user_id)
        except (TokenError, InvalidToken, User.DoesNotExist):
            pass

    if request.user and request.user.is_authenticated:
        return request.user

    return None


# ---------------------------------------------------------------------------
# Usage-limit helpers
# ---------------------------------------------------------------------------

def _ensure_session(request: HttpRequest) -> None:
    """Make sure the session exists so we can track anonymous usage."""
    if not request.session.session_key:
        request.session.create()


def _get_usage_record(request: HttpRequest) -> UsageRecord | None:
    """Return the UsageRecord for the current session, preferring a user-linked one."""
    _ensure_session(request)
    session_key = request.session.session_key
    try:
        record = UsageRecord.objects.get(session_key=session_key)
        return record
    except UsageRecord.DoesNotExist:
        return None


def _get_usage(request: HttpRequest) -> int:
    """Return the current analysis count for this session."""
    record = _get_usage_record(request)
    return record.count if record else 0


def _increment_usage(request: HttpRequest) -> int:
    """Increment and return the new analysis count for this session."""
    _ensure_session(request)
    record, _ = UsageRecord.objects.get_or_create(
        session_key=request.session.session_key
    )
    record.count += 1
    record.save(update_fields=["count", "updated_at"])
    return record.count


def _transfer_usage_to_user(request: HttpRequest, user: User) -> None:
    """Link the current session's usage to an authenticated user.

    If the user already has a usage record from a previous session, the
    higher count wins (the guest may have used more trials in this new
    session).  The current session is then pointed at the user-owned record
    so that subsequent lookups (including after logout) resolve correctly.
    """
    _ensure_session(request)
    session_key = request.session.session_key

    # Current session record (may or may not exist yet)
    session_record = UsageRecord.objects.filter(
        session_key=session_key
    ).first()
    session_count = session_record.count if session_record else 0

    # Existing user-owned record from a previous session?
    user_record = (
        UsageRecord.objects.filter(user=user)
        .exclude(session_key=session_key)
        .first()
    )

    if user_record:
        # Merge: keep the higher count, then point session at this record
        user_record.count = max(user_record.count, session_count)
        user_record.session_key = session_key
        user_record.save(update_fields=["count", "session_key", "updated_at"])
        # Delete the orphaned session record if it was different
        if session_record and session_record.pk != user_record.pk:
            session_record.delete()
    else:
        # First time this user logs in — claim the session record
        if session_record:
            session_record.user = user
            session_record.save(update_fields=["user", "updated_at"])
        else:
            UsageRecord.objects.create(
                session_key=session_key, user=user, count=0
            )


def _check_limit(request: HttpRequest) -> JsonResponse | None:
    """Return an error response if the anonymous user has hit the limit."""
    user = _get_user_from_request(request)
    if user is not None and user.is_authenticated:
        return None  # no limit for logged-in users

    used = _get_usage(request)
    if used >= GUEST_LIMIT:
        return _json_response(
            {
                "detail": "You've reached the free analysis limit. Sign up or log in to continue.",
                "code": "LIMIT_REACHED",
                "limit": GUEST_LIMIT,
                "used": used,
            },
            403,
        )
    return None


# ---------------------------------------------------------------------------
# Public endpoints
# ---------------------------------------------------------------------------

@require_GET
def ping(_: HttpRequest) -> JsonResponse:
    return _json_response({"status": "ok", "service": "signalscope-django"})


@require_GET
def usage_status(request: HttpRequest) -> JsonResponse:
    """Return current usage information for the frontend."""
    _ensure_session(request)
    user = _get_user_from_request(request)
    is_auth = user is not None and user.is_authenticated
    return _json_response(
        {
            "used": _get_usage(request),
            "limit": GUEST_LIMIT,
            "authenticated": is_auth,
            "username": user.username if is_auth else None,
        }
    )


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def predict(request: HttpRequest) -> JsonResponse:
    if request.method == "OPTIONS":
        return _json_response({})

    # Check usage limit for anonymous users
    limit_error = _check_limit(request)
    if limit_error is not None:
        return limit_error

    image = request.FILES.get("image")
    if image is None:
        return _json_response({"detail": "Provide an image using the 'image' form field."}, 400)
    if image.size > MAX_UPLOAD_SIZE:
        return _json_response({"detail": "The image must be 10 MB or smaller."}, 400)

    try:
        result = classify_image(image.read())
    except ValueError as error:
        return _json_response({"detail": str(error)}, 400)
    except FileNotFoundError as error:
        return _json_response({"detail": str(error)}, 503)
    except Exception:
        return _json_response({"detail": "Image analysis could not be completed."}, 500)

    # Increment usage only on successful analysis for guests
    user = _get_user_from_request(request)
    if user is None or not user.is_authenticated:
        _increment_usage(request)

    return _json_response(result)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def explain(request: HttpRequest) -> JsonResponse:
    """Return bounded, non-fabricated explanation text for the current baseline."""
    if request.method == "OPTIONS":
        return _json_response({})

    # Check usage limit for anonymous users
    limit_error = _check_limit(request)
    if limit_error is not None:
        return limit_error

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

    # Increment usage only on successful analysis for guests
    user = _get_user_from_request(request)
    if user is None or not user.is_authenticated:
        _increment_usage(request)

    prediction["visual_cues"] = [
        "Explanation heatmaps are not available in the current baseline.",
        "This assessment must not be treated as proof of image provenance.",
    ]
    return _json_response(prediction)


# ---------------------------------------------------------------------------
# Authentication endpoints (JWT based with HTTP-Only Cookies)
# ---------------------------------------------------------------------------

@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def login_view(request: HttpRequest) -> JsonResponse:
    """Authenticate a user and return JWT access/refresh tokens in payload & HTTP-Only cookies."""
    if request.method == "OPTIONS":
        return _json_response({})

    try:
        body = json.loads(request.body)
    except (json.JSONDecodeError, ValueError):
        return _json_response({"detail": "Invalid JSON body."}, 400)

    username = body.get("username", "").strip()
    password = body.get("password", "")

    if not username or not password:
        return _json_response({"detail": "Username and password are required."}, 400)

    user = authenticate(request, username=username, password=password)
    if user is None:
        return _json_response({"detail": "Invalid username or password."}, 401)

    # Transfer any guest usage to this user before issuing tokens
    _transfer_usage_to_user(request, user)

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    response = _json_response({
        "username": user.username,
        "authenticated": True,
        "access": access_token,
        "refresh": refresh_token,
    })
    return _set_jwt_cookies(response, access_token, refresh_token)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def logout_view(request: HttpRequest) -> JsonResponse:
    """Log out the current user by clearing Django session and HTTP-Only JWT cookies.

    After logout, the user gets a fresh session.  We re-point their
    user-linked UsageRecord at the new session so the guest trial count
    is preserved.
    """
    if request.method == "OPTIONS":
        return _json_response({})

    # Identify the current user before logout clears the request
    user = _get_user_from_request(request)

    logout(request)  # clears session & creates a new one

    # Re-associate the user's usage record with the new session
    if user is not None:
        _ensure_session(request)
        new_session_key = request.session.session_key
        user_record = UsageRecord.objects.filter(user=user).first()
        if user_record:
            user_record.session_key = new_session_key
            user_record.save(update_fields=["session_key", "updated_at"])

    response = _json_response({"authenticated": False})
    return _clear_jwt_cookies(response)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def signup_view(request: HttpRequest) -> JsonResponse:
    """Create a new user account and log them in immediately via JWT tokens."""
    if request.method == "OPTIONS":
        return _json_response({})

    try:
        body = json.loads(request.body)
    except (json.JSONDecodeError, ValueError):
        return _json_response({"detail": "Invalid JSON body."}, 400)

    username = body.get("username", "").strip()
    password = body.get("password", "")

    if not username or not password:
        return _json_response({"detail": "Username and password are required."}, 400)

    if len(password) < 6:
        return _json_response({"detail": "Password must be at least 6 characters."}, 400)

    if User.objects.filter(username=username).exists():
        return _json_response({"detail": "That username is already taken."}, 409)

    user = User.objects.create_user(username=username, password=password)

    # Transfer any guest usage to the newly created user
    _transfer_usage_to_user(request, user)

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    response = _json_response({
        "username": user.username,
        "authenticated": True,
        "access": access_token,
        "refresh": refresh_token,
    }, status=201)
    return _set_jwt_cookies(response, access_token, refresh_token)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def token_refresh_view(request: HttpRequest) -> JsonResponse:
    """Refresh the access token using the HTTP-Only refresh cookie or request body."""
    if request.method == "OPTIONS":
        return _json_response({})

    refresh_token_str = request.COOKIES.get("refresh_token")
    if not refresh_token_str and request.body:
        try:
            body = json.loads(request.body)
            refresh_token_str = body.get("refresh")
        except Exception:
            pass

    if not refresh_token_str:
        return _json_response({"detail": "Refresh token not provided."}, 401)

    try:
        refresh = RefreshToken(refresh_token_str)
        access_token = str(refresh.access_token)
        new_refresh_token = str(refresh)

        response = _json_response({
            "access": access_token,
            "refresh": new_refresh_token,
            "authenticated": True,
        })
        return _set_jwt_cookies(response, access_token, new_refresh_token)
    except (TokenError, InvalidToken):
        response = _json_response({"detail": "Invalid or expired refresh token."}, 401)
        return _clear_jwt_cookies(response)
