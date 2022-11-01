from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from django.shortcuts import get_object_or_404
from users.models import User
from .serializers import UserEditSerializer
from utilities.generators import get_profile_data, get_new_auth_tokens
from ...utils.user_profile import Profile


class ProfileEdit(UpdateAPIView):
    def update(self, request, *args, **kwargs):
        profile_instance_id = request.data.get("Profile-Id")
        del request.data["Profile-Id"]

        user = get_object_or_404(User, id=profile_instance_id)

        serializer = UserEditSerializer(instance=user, data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        profile = get_profile_data(user)

        refresh_token = request.data.get("refreshToken")
        if refresh_token:
            tokens = get_new_auth_tokens(refresh_token)
            profile.update({"tokens": tokens})

        profile_data["username"] = profile_data["username"].capitalize()

        if profile_data["full_name"]:
            profile_data["full_name"] = profile_data["full_name"].capitalize()

        return Response(profile, status=200)
