from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from django.shortcuts import get_object_or_404
from users.models import User
from .serializers import UserEditSerializer

from ...utils.user_profile import Profile

class ProfileEdit(UpdateAPIView):

    def update(self, request, *args, **kwargs):
        profile_instance_id = request.data.get('Profile-Id')
        del request.data['Profile-Id']

        user = get_object_or_404(User, id=profile_instance_id)

        serializer = UserEditSerializer(instance=user, data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()
    
        profile = Profile(user, profile=True)
        
        return Response(profile.data, status=200)
