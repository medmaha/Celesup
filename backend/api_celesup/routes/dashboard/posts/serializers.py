from rest_framework import serializers
from app_features.models import Post


class PostListSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Post
        fields = ['key', 'author', 'post_author','title', 'caption', 'picture', 'post_likes', 'post_shares', 'post_saves', 'post_comments']


class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['key', 'title', 'content']


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['key', 'author', 'title', 'hashtags', 'caption', 'thumbnail', 'picture', 'video']


class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = fields = ['key', 'post_author','title', 'slug', 'hashtags', 'thumbnail', 'picture','date_posted','post_likes','post_views', 'post_shares']


