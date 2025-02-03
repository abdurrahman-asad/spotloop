from rest_framework import viewsets


class BaseViewSetMixin:
    def get_queryset(self):
        queryset = self.action_queryset.get(
            self.action, self.action_queryset.get("default")
        )
        return queryset(self) if queryset else self.queryset

    def get_serializer_class(self):
        return self.action_serializer.get(
            self.action, self.action_serializer.get("default", self.serializer_class)
        )


class BaseViewSet(BaseViewSetMixin, viewsets.ModelViewSet):
    action_serializer = {}
    action_queryset = {}


class BaseReadOnlyViewSet(BaseViewSetMixin, viewsets.ReadOnlyModelViewSet):
    action_serializer = {}
    action_queryset = {}
