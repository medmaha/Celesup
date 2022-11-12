from rest_framework import generics
from rest_framework.response import Response

from feed.models import Feed, FeedObjects
from post.models import Post
from .serializers import PostDetailSerializer, FeedPost
from users.models import User
from utilities.api_utils import get_post_json
import random


class PostsFeed(generics.ListAPIView):
    """Gets all post related to the authenticated user"""

    def get_queryset(self):
        feed = Feed.objects.get(user=self.request.user)
        objects = feed.feed_objects.all().order_by("-timestamp")

        data = []

        for f in objects:
            feed: FeedObjects = f
            data.append(feed.object)

        data = [*data, *Post.objects.filter(author=self.request.user)]

        random.shuffle(data)
        return data

    def list(self, request, *args, **kwargs):

        self.serializer_class = PostDetailSerializer

        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)

        feed = []
        for post in serializer.data:

            if not post.get("key"):
                continue

            instance = Post.objects.get(key=post["key"])

            data = get_post_json(instance, self)
            feed.append({**post, **data})

        return self.get_paginated_response(feed)
