from django.urls import path

from . import views


urlpatterns = [
    path("ping/", views.ping, name="ping"),
    path("predict/", views.predict, name="predict"),
    path("explain/", views.explain, name="explain"),
]
