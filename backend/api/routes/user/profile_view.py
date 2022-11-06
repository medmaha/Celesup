from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from django.shortcuts import get_object_or_404
from users.models import User

from utilities.generators import get_profile_data
from api.routes.user.serializers import UserDetailSerializer


class ProfileView(GenericAPIView):

    serializer_class = UserDetailSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")

        user = get_object_or_404(User, username__iexact=username)

        profile = get_profile_data(user)
        serializer = self.get_serializer(user).data

        data = {**profile, **serializer}
        return Response(data, status=200)
