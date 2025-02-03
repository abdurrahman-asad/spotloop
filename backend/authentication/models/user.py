from django.db import models
from django.contrib.auth.models import AbstractUser
from api.models import BaseModel


class User(BaseModel, AbstractUser):
    email = models.EmailField(unique=True)
