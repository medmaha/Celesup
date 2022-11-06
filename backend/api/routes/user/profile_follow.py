from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from users.models import User

from .serializers import SupporterSerializer, CelebritySerializer, UserDetailSerializer
from ...utils.user_profile import Profile
from utilities.generators import get_profile_data


class ProfileFollow(GenericAPIView):
    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User, id=request.data.get("profile_id"))
        profile = user.profile

        client = request.user

        if hasattr(profile, "followers"):
            follower = request.user

            if client in profile.followers.all():
                profile.followers.remove(follower)
                follower.profile.following.remove(user)
            else:
                profile.followers.add(follower)
                follower.profile.following.add(user)

        self.serializer_class = UserDetailSerializer

        profile = get_profile_data(user)
        serializer = self.get_serializer(user)

        data = {**profile, **serializer}

        return Response(data, status=200)
