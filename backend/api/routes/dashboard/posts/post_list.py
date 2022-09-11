from rest_framework import generics

from feed.models import Feed
from post.models import Post
from api.utils.post_liked_by import PostLikedByUsers
from .serializers import PostDetailSerializer

from users.models import User
from utilities.generators import get_profile_data


class PostsList(generics.ListAPIView):
    """ Gets all post related to the authenticated user"""
    
    serializer_class = PostDetailSerializer

    def get_queryset(self):
        try:
            user_feeds = Feed.objects.get(user=self.request.user)
            return user_feeds.posts.all().order_by('-created_at')
        except:
            return Post.objects.all().order_by('-created_at')


    def list(self, request, *args, **kwargs):
        query = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(query)
        serializer = self.get_serializer(page, many=True)

        for post in serializer.data:
            instance = Post.objects.get(key=post['key'])

            post['me'] = request.user in instance.likes.all()
            post['liked_by_users'] = PostLikedByUsers(instance, request.user).data

            user = User.objects.get(id=post['author'])

            post['author'] = get_profile_data(user)
                
        return self.get_paginated_response(serializer.data)
