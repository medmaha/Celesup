from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from app_features.models import Feed, Post
from users.models import User
from .serializers import PostListSerializer
from ....serializers import UserDetailSerializer
from ....utils.post_liked_by import PostLikedByUsers
from ....utils.user_profile import Profile

BASE_URL = 'http://localhost:8000'


class PostsList(generics.ListAPIView):
    """ Gets all post related to the authenticated user"""
    
    serializer_class = PostListSerializer

    def get_queryset(self):
        try:
            user_feeds = Feed.objects.get(user=self.request.user)
            return user_feeds.posts.all().order_by('-date_posted')
        except:
            return Post.objects.all().order_by('-date_posted')


    def list(self, request, *args, **kwargs):
        query = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(query)
        serializer = self.get_serializer(page, many=True)

        for post in serializer.data:
            instance = Post.objects.get(key=post['key'])

            post['me'] = request.user in instance.likes.all()
            post['liked_by_users'] = PostLikedByUsers(instance, request.user).data

            post['author'] = Profile(instance.author).data
            post['picture'] = BASE_URL + instance.picture.url
            post['author']['avatar'] = BASE_URL + instance.author.avatar.url
        return self.get_paginated_response(serializer.data)
