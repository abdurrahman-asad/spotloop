from authentication.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
from rest_framework_simplejwt.state import token_backend
from rest_framework_simplejwt.utils import datetime_from_epoch
from django.utils import timezone


class UserWritableSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "is_teacher",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["institution_id"] = user.institution_id
        validated_data["is_teacher"] = True
        validated_data["created_by"] = user
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        user = self.context["request"].user
        validated_data["updated_by"] = user
        validated_data["updated_on"] = timezone.now()
        for field, value in validated_data.items():
            if field != "password":
                setattr(instance, field, value)

        password = validated_data.get("password")
        if password:
            instance.set_password(password)

        instance.save()
        return instance


class UserReadOnlySerializer(serializers.ModelSerializer):
    # institution = InstitutionSerializer()

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "is_teacher",
            "is_admin",
            "institution",
        )
        read_only_fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "is_teacher",
            "is_admin",
            "institution",
        )


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    # def validate(self, attrs):
    #     try:
    #         return super().validate(attrs)
    #     except exceptions.AuthenticationFailed:
    #         raise exceptions.AuthenticationFailed("Incorrect username or password")
    #     except Exception as e:
    #         raise e

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        user.last_login = timezone.now()
        user.save()
        token["username"] = user.username
        token["firstname"] = user.first_name
        token["lastname"] = user.last_name
        token["email"] = user.email
        token["is_teacher"] = user.is_teacher
        token["is_admin"] = user.is_admin
        token["institution_id"] = str(user.institution_id)
        return token


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        token_payload = token_backend.decode(data["refresh"])
        OutstandingToken.objects.get_or_create(
            jti=token_payload["jti"],
            defaults={
                "token": data["refresh"],
                "user_id": token_payload["user_id"],
                "expires_at": datetime_from_epoch(token_payload["exp"]),
                "created_at": datetime_from_epoch(token_payload["iat"]),
            },
        )
        return data
