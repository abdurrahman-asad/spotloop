from io import BytesIO

import boto3
from botocore.client import Config
from botocore.exceptions import NoCredentialsError
from django.conf import settings


class S3:
    def __init__(self, bucket_name: str, region_name: str) -> None:
        # Initialize S3 client with the given bucket name and region.
        self.s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            config=Config(signature_version="s3v4"),
            region_name=region_name,
        )
        self.bucket_name: str = bucket_name

    def upload_file(self, file: BytesIO, file_key: str, content_type: str) -> str:
        """
        Uploads a file to the S3 bucket.

        Args:
            file (BytesIO): The file object to upload.
            file_key (str): The S3 object key (path).
            content_type (str): The MIME type of the file.

        Returns:
            str: The URL to access the uploaded file.
        """
        try:
            self.s3.upload_fileobj(
                file,
                self.bucket_name,
                file_key,
                ExtraArgs={"ContentType": content_type},
            )
            return f"https://{self.bucket_name}.s3.amazonaws.com/{file_key}"
        except NoCredentialsError:
            raise Exception("AWS credentials not available.")
        except Exception as e:
            raise Exception(f"Failed to upload file to S3: {e}")

    def generate_presigned_url(self, file_key: str, expiration: int = 3600) -> str:
        """
        Generates a presigned URL to access a file on S3.

        Args:
            file_key (str): The S3 object key (path).
            expiration (int): The URL expiration time in seconds. Default is 3600 seconds (1 hour).

        Returns:
            str: The presigned URL to access the file.
        """
        try:
            url = self.s3.generate_presigned_url(
                "get_object",
                Params={"Bucket": self.bucket_name, "Key": file_key},
                ExpiresIn=expiration,
            )
            return url
        except Exception as e:
            raise Exception(f"Failed to generate presigned URL: {e}")

    def delete_file(self, file_key: str) -> None:
        """
        Deletes a file from the S3 bucket.

        Args:
            file_key (str): The S3 object key (path) of the file to delete.

        Raises:
            Exception: If deletion fails.
        """
        try:
            self.s3.delete_object(Bucket=self.bucket_name, Key=file_key)
        except Exception as e:
            raise Exception(f"Failed to delete file from S3: {e}")
