from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from django.shortcuts import get_object_or_404
from users.models import User
from .serializers import UserEditSerializer, UserDetailSerializer
from utilities.generators import get_profile_data


class ProfileEdit(UpdateAPIView):
    def update(self, request, *args, **kwargs):
        user = get_object_or_404(User, id=request.data.get("profileId"))

        data = request.data.copy()

        if not data["avatar"]:
            del data["avatar"]

        if not data["cover_img"]:
            del data["cover_img"]

        if data.get("full_name"):
            data["first_name"] = data["full_name"].split(" ")[0]
            data["last_name"] = data["full_name"].split(" ")[1]

        # ? setter
        serializer = UserEditSerializer(instance=user, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # ? getter
        self.serializer_class = UserDetailSerializer
        profile = get_profile_data(user)
        serializer = self.get_serializer(user).data

        data = {**profile, **serializer}

        return Response(data, status=200)
