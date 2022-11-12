from rest_framework import generics

from feed.models import Feed, FeedObjects
from post.models import Post
from api.utils.post_liked_by import PostLikedByUsers
from .serializers import PostDetailSerializer
from django.shortcuts import get_object_or_404
from users.models import User
from utilities.generators import get_profile_data
from comment.models import Comment
from api.routes.user.serializers import UserDetailSerializer


class PostsFeed(generics.ListAPIView):
    """Gets all post related to the authenticated user"""

    serializer_class = PostDetailSerializer

    def get_queryset(self, user_id):

        feed = Feed.objects.get(user=self.request.user)
        objects = feed.feed_objects.all().order_by("-timestamp")

        data = []
        for f in objects:
            f: FeedObjects = f
            data.append(f.object)

        return data

        # try:

        #     if user_id:
        #         user = get_object_or_404(User, id=user_id)
        #         return feed.posts.filter(author=user).order_by("-created_at")
        #     return feed.posts.all().order_by("-created_at")
        # except:
        #     if user_id:
        #         user = get_object_or_404(User, id=user_id)
        #         return Post.objects.filter(author=user).order_by("-created_at")

        #     return Post.objects.filter().order_by("-created_at")

    def list(self, request, *args, **kwargs):

        path = request.get_full_path()
        user_id = None
        if len(path.split("?")) > 1:
            user_id = path.split("?")[1].split("=")[1]

        query = self.filter_queryset(self.get_queryset(user_id))
        page = self.paginate_queryset(query)
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
