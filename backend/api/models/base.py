from django.db import models
from uuid import uuid4
from django.utils import timezone


class BaseModel(models.Model):
    id = models.UUIDField(unique=True, default=uuid4, primary_key=True)

    created_on = models.DateTimeField(auto_now_add=True)

    updated_on = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(
        "authentication.User",
        on_delete=models.PROTECT,
        related_name="%(class)s_created_by",
        default=None,
        null=True,
        blank=True,
    )

    updated_by = models.ForeignKey(
        "authentication.User",
        on_delete=models.PROTECT,
        related_name="%(class)s_updated_by",
        default=None,
        null=True,
        blank=True,
    )

    deleted = models.BooleanField(default=False)

    class Meta(object):
        abstract = True
