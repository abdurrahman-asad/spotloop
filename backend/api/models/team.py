from django.db import models

from api.models.base import BaseModel
from api.models.company import Company


class TeamRole(models.TextChoices):
    OWNER = "OWNER", "Owner"
    ADMIN = "ADMIN", "Admin"
    MEMBER = "MEMBER", "Member"


class TeamMembership(models.Model):
    team = models.ForeignKey("Team", on_delete=models.CASCADE)
    user = models.ForeignKey("authentication.User", on_delete=models.CASCADE)
    role = models.CharField(
        max_length=20, choices=TeamRole.choices, default=TeamRole.MEMBER
    )

    class Meta:
        unique_together = ("team", "user")


class Team(BaseModel):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(
        "authentication.User", through=TeamMembership, related_name="teams"
    )
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        help_text="The company this team belongs to. Required.",
    )

    class Meta:
        unique_together = ("name", "company")
