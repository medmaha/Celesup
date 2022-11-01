from rest_framework import generics

from feed.models import Feed
from post.models import Post
from api.utils.post_liked_by import PostLikedByUsers
from .serializers import PostDetailSerializer
from django.shortcuts import get_object_or_404
from users.models import User
from utilities.generators import get_profile_data


class PostsList(generics.ListAPIView):
    """Gets all post related to the authenticated user"""

    serializer_class = PostDetailSerializer

    def get_queryset(self, user_id):
        try:
            user_feeds = Feed.objects.get(user=self.request.user)
            if user_id:
                user = get_object_or_404(User, id=user_id)
                return user_feeds.posts.filter(author=user).order_by("-created_at")
            return user_feeds.posts.all().order_by("-created_at")
        except:
            if user_id:
                user = get_object_or_404(User, id=user_id)
                return Post.objects.filter(author=user).order_by("-created_at")

            return Post.objects.filter().order_by("-created_at")

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

            post["me"] = request.user in instance.likes.all()
            post["liked_by_users"] = PostLikedByUsers(instance, request.user).data

            user = User.objects.get(id=post["author"])

            post["author"] = get_profile_data(user)

        return self.get_paginated_response(serializer.data)
