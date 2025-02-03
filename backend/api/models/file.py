from django.db import models
from uuid import uuid4


class File(models.Model):
    id = models.UUIDField(unique=True, default=uuid4, primary_key=True)
    filename = models.CharField(max_length=255)
    storage_key = models.TextField()
    content_type = models.CharField(max_length=100)
    file_size = models.BigIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.filename
