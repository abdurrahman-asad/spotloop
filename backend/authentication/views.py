from authentication.models import User

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.tokens import RefreshToken
from api.views import BaseViewSet
from .serializers import UserWritableSerializer, UserReadOnlySerializer


def get_custom_token(user, data):
    token = RefreshToken.for_user(user)
    token["username"] = data["username"]
    token["firstname"] = data.get("first_name", "")
    token["lastname"] = data.get("last_name", "")
    token["email"] = data["email"]
    token["is_teacher"] = user.is_teacher
    token["is_admin"] = user.is_admin
    token["institution_id"] = str(user.institution_id)
    return str(token.access_token), str(token)


class IsSelf(BasePermission):
    """Permission class for checking user privileges on update"""

    def has_object_permission(self, request, view, obj):
        return obj == request.user


class IsAdmin(BasePermission):
    """Permission class for checking user privileges on create"""

    def has_permission(self, request, view):
        return request.user.has_perm("authentication.add_user")


class UserView(BaseViewSet):
    """
    Creates user and returns username, email and token on success
    """

    queryset = User.objects.all()
    permission_classes = (IsAuthenticated, IsSelf)
    lookup_field = "username"

    action_serializer = {
        "default": UserWritableSerializer,
        "retrieve": UserReadOnlySerializer,
    }

    def get_permissions(self):
        if self.action == "create":
            return [IsAdmin()]
        return super().get_permissions()

    # def create(self, request, *args, **kwargs):
    #     serializer = UserWritableSerializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     user = serializer.save()
    #     return Response(
    #         {
    #             **serializer.data,
    #             "access": access,
    #             "refresh": refresh,
    #         }
    #     )

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        access, refresh = get_custom_token(user, serializer.data)
        return Response(
            {
                **serializer.data,
                "access": access,
                "refresh": refresh,
            }
        )

    def list(self, request, *args, **kwargs):
        queryset = self.queryset.filter(created_by=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
