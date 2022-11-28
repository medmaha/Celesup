from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework import status

from .serializers import PostCreateSerializer


class PostCreate(CreateAPIView):
    serializer_class = PostCreateSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data["author"] = request.user.id

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_201_CREATED)
