from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views.overview import OverviewViewSet, SlideViewSet
from api.views.file import FileViewSet

router = DefaultRouter()
router.register(r"overview", OverviewViewSet, basename="overview")
router.register(r"slide", SlideViewSet, basename="slide")
router.register(r"file", FileViewSet, basename="file")

app_name = "api"

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include("authentication.urls")),
]
