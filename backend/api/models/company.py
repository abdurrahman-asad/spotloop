from django.db import models
from api.models.base import BaseModel


class Company(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    
    class Meta:
        verbose_name_plural = "Companies"
