from itertools import chain
import random

from django.db.models import Q
from users.models import User
from post.models import Post
from api.routes.user.serializers import UserDetailSerializer
from api.routes.dashboard.posts.serializers import PostDetailSerializer
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from rest_framework.decorators import api_view

from api.routes.hashtags.serializer import HashTagDetailSerializer

from hashtags.models import HashTag


@api_view(['GET'])
def query(request):
    # q = request.get_full_path().split('?')[1].split('=')[1].strip().lower()
    
    print(request.get_full_path())
    print(request.query_params)
 
    q='h'

    hashtags_query = HashTagDetailSerializer(
        HashTag.objects.all(
            # Q(tag_text__startswith=q)
        ), many=True
    )
        
    return Response({'query':hashtags_query.data})
