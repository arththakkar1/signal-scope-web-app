"""Models for the detector app."""

from django.conf import settings
from django.db import models


class UsageRecord(models.Model):
    """Tracks image analysis usage for anonymous and authenticated rate-limiting.

    Anonymous guests are tracked by ``session_key``.  When a guest signs in or
    signs up, their accumulated count is transferred to a user-linked record so
    that the usage persists across sessions.
    """

    session_key = models.CharField(max_length=40, unique=True, db_index=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="usage_records",
    )
    count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "usage record"
        verbose_name_plural = "usage records"

    def __str__(self) -> str:
        label = self.user.username if self.user else f"Session {self.session_key}"
        return f"{label}: {self.count} analyses"
