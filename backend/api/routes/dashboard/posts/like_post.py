
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from post.models import Post
from api.utils.post_liked_by import PostLikedByUsers
from .serializers import PostDetailSerializer

from utilities.generators import get_profile_data

class LikePost(GenericAPIView):

    serializer_class = PostDetailSerializer
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

        serialized_data =self.get_serializer(post).data
        author = get_profile_data(post.author)

        serialized_data['author'] = author

        return Response({'post': serialized_data, 'liked_by_users':liked_by_users[:6], 'me': not liked}, status=200)

 