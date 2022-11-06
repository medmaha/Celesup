from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView

from post.models import Post
from .serializers import PostDetailSerializer

from utilities.generators import get_profile_data


class PostRetrieve(RetrieveAPIView):
    serializer_class = PostDetailSerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            key = request.get_full_path().split("?")[1].split("=")[1]
            post = get_object_or_404(Post, key=key)
        except:
            key = request.data.get("key")
            post = get_object_or_404(Post, key=key)

        serialized_data = self.get_serializer(post).data
        author = get_profile_data(post.author)

        serialized_data["author"] = author

        return Response(
            {
                "post": serialized_data,
            },
            status=200,
        )
