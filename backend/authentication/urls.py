from django.urls import path, include
from rest_framework_simplejwt.views import (
    token_verify,
    token_refresh,
    token_blacklist,
    token_obtain_pair,
)
from rest_framework import routers

from .views import UserView

router = routers.DefaultRouter()

router.register(r"user", UserView, "user")

urlpatterns = [
    path("", include(router.urls)),
    path("refresh/", token_refresh, name="refresh-token"),
    path("verify/", token_verify, name="verify-token"),
    path("login/", token_obtain_pair, name="login"),
    path("logout/", token_blacklist, name="logout"),
]
