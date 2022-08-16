from rest_framework import serializers
from app_features.models import ( Post, Status )
from celebrity.models import Celebrity
from supporter.models import Supporter
from users.models import User


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['avatar', 'username','full_name', 'user_type']

class UserCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['avatar', 'email', 'username','first_name','last_name', 'gender',  'city',  'biography', 'user_type',]


class PostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['key', 'post_author','title', 'slug']

class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = fields = ['key', 'post_author','title', 'slug', 'hashtags', 'content', 'thumbnail', 'picture','date_posted','post_likes','post_views', 'post_shares']

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['key', 'author', 'title', 'hashtags', 'content', 'thumbnail', 'picture', 'video']

class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['key', 'hashtags', 'content', 'thumbnail']


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ['author', 'caption', 'picture', 'date_posted', 'status_likes','statsus_views']


class CelebritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Celebrity
        fields = ['id', 'friends','followers','following']
    


class SupporterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supporter
        fields = ['id', 'friends','following']


