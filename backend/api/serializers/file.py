from rest_framework import serializers
from rest_framework.exceptions import APIException
from django.conf import settings
from api.models.file import File
from services import S3
import uuid


class FileSerializer(serializers.ModelSerializer):
    file = serializers.FileField(write_only=True)

    class Meta:
        model = File
        fields = [
            "id",
            "filename",
            "storage_key",
            "content_type",
            "file_size",
            "created_at",
            "updated_at",
            "file",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "filename",
            "storage_key",
            "content_type",
            "file_size",
        ]

    def create(self, validated_data):
        file_obj = validated_data.pop("file")
        request = self.context.get("request")
        company_id = request.user.teams.first().company_id
        try:
            file_extension = (
                file_obj.name.split(".")[-1] if "." in file_obj.name else ""
            )
            storage_key = f"files/{company_id}/{uuid.uuid4()}.{file_extension}"
            # Upload to S3
            s3 = S3(settings.AWS_BUCKET_NAME, settings.AWS_REGION)
            s3.upload_file(file_obj, storage_key, file_obj.content_type)
            # Create file record
            return File.objects.create(
                filename=file_obj.name,
                storage_key=storage_key,
                content_type=file_obj.content_type,
                file_size=file_obj.size,
            )
        except Exception as e:
            raise APIException("File upload failed. Please try again later.")
