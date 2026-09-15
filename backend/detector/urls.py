from django.urls import path

from . import views


urlpatterns = [
    path("ping/", views.ping, name="ping"),
    path("predict/", views.predict, name="predict"),
    path("explain/", views.explain, name="explain"),
    path("usage/", views.usage_status, name="usage_status"),
    path("auth/login/", views.login_view, name="login"),
    path("auth/logout/", views.logout_view, name="logout"),
    path("auth/signup/", views.signup_view, name="signup"),
    path("auth/refresh/", views.token_refresh_view, name="token_refresh"),
]
