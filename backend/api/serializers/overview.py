from rest_framework import serializers
from api.models.overview import Overview, Slide


class SlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slide
        fields = ["id", "description", "image_url", "created_on", "updated_on"]
        read_only_fields = ["id", "created_on", "updated_on"]


class OverviewSerializer(serializers.ModelSerializer):
    slides = SlideSerializer(many=True, read_only=True)

    class Meta:
        model = Overview
        fields = [
            "id",
            "title",
            "description",
            "slides",
            "team",
            "status",
            "created_on",
            "updated_on",
        ]
        read_only_fields = ["id", "created_on", "updated_on"]
