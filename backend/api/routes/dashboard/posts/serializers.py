from rest_framework import serializers
from post.models import Post

from feed.models import FeedObjects


class FeedPost(serializers.ModelSerializer):
    class Meta:
        model = FeedObjects
        fields = ["object"]


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            "author",
            "excerpt",
            "hashtags",
            "caption",
            "picture",
            "video",
            "thumbnail",
        ]


class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["key", "excerpt", "caption"]


class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = fields = [
            "key",
            "author",
            "caption",
            "excerpt",
            "hashtags",
            "video",
            "picture",
            "created_at",
            "thumbnail",
        ]
