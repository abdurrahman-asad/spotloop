from django.db import models

from api.models.base import BaseModel
from api.models.team import Team


class OverviewStatus(models.TextChoices):
    DRAFT = "DRAFT", "Draft"
    PUBLISHED = "PUBLISHED", "Published"


class Slide(BaseModel):
    description = models.TextField()
    image_url = models.URLField()


class Overview(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    slides = models.ManyToManyField(Slide)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=255, choices=OverviewStatus.choices, default=OverviewStatus.DRAFT
    )
