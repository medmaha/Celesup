from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from django.shortcuts import get_object_or_404

from users.models import User
from .serializers import SupporterSerializer, CelebritySerializer, UserDetailSerializer

from ...utils.user_profile import Profile

class ProfileView(GenericAPIView):
    
    def post(self, request, *args, **kwargs):
        profile_id = request.data.get('Profile-Id')
   
        user = get_object_or_404(User, id=profile_id)
        profile = Profile(user, profile=True)
        
        return Response(profile.data, status=200)