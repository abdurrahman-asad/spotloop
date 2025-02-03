from rest_framework.permissions import IsAuthenticated
from api.models.overview import Overview, Slide
from api.serializers.overview import OverviewSerializer, SlideSerializer
from api.views.base import BaseViewSet


class SlideViewSet(BaseViewSet):
    """
    Slide ViewSet

    Post request body:
    {
        "description": "string",
        "image_url": "string"
    }
    """

    queryset = Slide.objects.filter(deleted=False)
    serializer_class = SlideSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)


class OverviewViewSet(BaseViewSet):
    """
    Overview ViewSet

    Post request body:
    {
        "title": "string",
        "description": "string",
        "slides": [{"description": "string", "image_url": "string"}]
    }
    """

    queryset = Overview.objects.filter(deleted=False)
    serializer_class = OverviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)
