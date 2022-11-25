from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.parsers import MultiPartParser, FormParser

from django.http import QueryDict

from .serializers import PostCreateSerializer, PostDetailSerializer


class PostCreate(CreateAPIView):
    serializer_class = PostCreateSerializer

    def create(self, request, *args, **kwargs):
        request.data["author"] = request.user.id

        print(request.data)
        return super().create(request, *args, **kwargs)
