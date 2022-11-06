from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from post.models import Post
from .serializers import PostDetailSerializer

from utilities.generators import get_profile_data
from comment.models import Comment

from api.routes.user.serializers import UserDetailSerializer


class LikePost(GenericAPIView):

    serializer_class = PostDetailSerializer

    def post(self, request, *args, **kwargs):

        post_key = request.data.get("post_key")
        post = get_object_or_404(Post, key=post_key)

        if request.user in post.likes.all():
            post.likes.remove(request.user)
        else:
            post.likes.add(request.user)

        serializer = self.get_serializer(post)

        self.serializer_class = UserDetailSerializer

        data = {
            **serializer.data,
            "likes": self.get_serializer(post.likes.all(), many=True).data,
            "comments": Comment.objects.filter(post=post).count(),
            "bookmarks": 0,
            "shares": post.shares.all().count(),
            "author": self.get_serializer(post.author).data,
        }

        return Response(
            data,
            status=200,
        )
