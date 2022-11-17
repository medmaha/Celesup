from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import UpdateAPIView, GenericAPIView
from django.shortcuts import get_object_or_404
from users.models import User
from .serializers import (
    UserEditSerializer,
    UserDetailSerializer,
    UserMETADATASeriaLizer,
)
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


class AccountEdit(GenericAPIView):

    serializer_class = UserMETADATASeriaLizer

    def get(self, request, *args, **kwargs):
        user = request.user

        if not isinstance(user, User):
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.filter_queryset(self.get_queryset(user))

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        data = request.data.copy()

        return super().put(request, *args, **kwargs)
