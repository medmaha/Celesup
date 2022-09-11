from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from users.models import User

from .serializers import SupporterSerializer, CelebritySerializer, UserDetailSerializer
from ...utils.user_profile import Profile

class ProfileFollow(GenericAPIView):
    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User, id=request.data.get('profile_id'))
        profile = user.profile

        if hasattr(profile, 'followers'):
            if request.user in profile.followers.all():
                profile.followers.remove(request.user)
            else:
                profile.followers.add(request.user)

        profile = Profile(user)
        
        return Response(profile.data, status=200)