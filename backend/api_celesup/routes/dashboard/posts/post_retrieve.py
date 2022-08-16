from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView

from app_features.models import Post
from .serializers import PostDetailSerializer     

class PostRetrieve(RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        key = request.data.get('key')
        instance = get_object_or_404(Post, key=key)
        serializer = PostDetailSerializer(instance)
        return Response(serializer.data)