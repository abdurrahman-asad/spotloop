from rest_framework import viewsets, status, mixins
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from api.models.file import File
from api.serializers.file import FileSerializer
from services.s3 import S3
from django.conf import settings


class FileViewSet(
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = File.objects.all()
    serializer_class = FileSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            s3 = S3(settings.AWS_BUCKET_NAME, settings.AWS_REGION)
            presigned_url = s3.generate_presigned_url(instance.storage_key)

            serializer = self.get_serializer(instance)
            data = serializer.data
            data["presigned_url"] = presigned_url

            return Response(data)
        except Exception as e:
            return Response(
                {"error": "Failed to generate file URL."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            s3 = S3(settings.AWS_BUCKET_NAME, settings.AWS_REGION)
            s3.delete_file(instance.storage_key)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"error": "Failed to delete file."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
