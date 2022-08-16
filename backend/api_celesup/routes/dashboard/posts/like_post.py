
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from users.models import User
from app_features.models import Post
from .serializers import PostListSerializer
from ....utils.user_profile import Profile
from ....utils.post_liked_by import PostLikedByUsers
from ...user.serializers import UserDetailSerializer

BASE_URL = 'http://localhost:8000'


class LikePost(GenericAPIView):
    def post(self, request, *args, **kwargs):
        post_key = request.data.get('post_key')
        post = get_object_or_404(Post, key=post_key)

        
        liked_by_users = post.likes.all()
        if request.user in liked_by_users:
            liked = True
        else:
            liked = False

        if liked:
            post.likes.remove(request.user)
        if not liked:
            post.likes.add(request.user)

        
        liked_by_users = PostLikedByUsers(post, request.user).data

        return Response({'post': self.set_return_post(post), 'liked_by_users':liked_by_users[:6], 'me': not liked}, status=200)

    def set_return_post(self, post):
        serializer = PostListSerializer(post)
        DATA = serializer.data
        user = post.author

        DATA.update({'author': Profile(user, post=post).data})

        DATA.update({'picture': BASE_URL + DATA['picture']})
        DATA['author']['avatar'] = BASE_URL + DATA['author']['avatar']
        
        return DATA