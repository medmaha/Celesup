from rest_framework import serializers
from post.models import Post

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['author', 'excerpt', 'hashtags', 'caption', 'picture']


class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['key', 'excerpt', 'caption']


class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = fields = ['key', 'author', 'caption', 'excerpt', 'hashtags', 'picture','created_at','post_likes','post_views', 'post_shares']


