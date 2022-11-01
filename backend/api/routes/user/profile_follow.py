from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from users.models import User

from .serializers import SupporterSerializer, CelebritySerializer, UserDetailSerializer
from ...utils.user_profile import Profile


class ProfileFollow(GenericAPIView):
    def post(self, request, *args, **kwargs):
        profile_user = get_object_or_404(User, id=request.data.get("profile_id"))
        profile = profile_user.profile

        if hasattr(profile, "followers"):
            follower = request.user

            if request.user in profile.followers.all():
                profile.followers.remove(follower)
                follower.profile.following.remove(profile_user)

            else:
                profile.followers.add(follower)
                follower.profile.following.add(profile_user)

        profile = Profile(profile_user)

        return Response(profile.data, status=200)
