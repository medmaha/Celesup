from rest_framework import generics

from post.models import Post
from .serializers import PostDetailSerializer
from utilities.generators import get_profile_data
from comment.models import Comment
from api.routes.user.serializers import UserDetailSerializer


class PostsList(generics.ListAPIView):
    """Gets all post related to the authenticated user"""

    queryset = Post.objects.filter().order_by("-created_at")
    serializer_class = PostDetailSerializer

    def list(self, request, *args, **kwargs):

        posts = super().list(request, *args, **kwargs)

        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)

        for post in serializer.data:
            instance = Post.objects.get(key=post["key"])

            post_comments = Comment.objects.filter(post=instance)

            self.serializer_class = UserDetailSerializer

            data = {
                "bookmarks": 0,
                "comments": post_comments.count(),
                "shares": instance.shares.all().count(),
                "likes": self.get_serializer(instance.likes.all(), many=True).data,
                "author": {
                    **get_profile_data(instance.author),
                    **self.get_serializer(instance.author).data,
                },
            }

            post.update(data)

        return self.get_paginated_response(serializer.data)
