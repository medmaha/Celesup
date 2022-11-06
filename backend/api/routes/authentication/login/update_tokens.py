from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from users.models import User
from notification.models import Notification
from messenging.models import Message
from .obtain_token import AccessTokenPayload
from ...user.serializers import UserMiniInfoSeriaLizer


class TokenClass(RefreshToken):
    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)

        user_data = UserMiniInfoSeriaLizer(user).data
        token["has_alerts"] = Notification.objects.filter(
            recipient=user, is_viewed=False
        ).exists()
        token["has_message"] = Message.objects.filter(
            recipient=user, is_seen=False
        ).exists()
        for key, val in user_data.items():
            token[str(key)] = val
        return token


class UpdateAuthenticationTokens(TokenRefreshView):

    serializer_class = AccessTokenPayload

    def put(self, request, *args, **kwargs):
        user = get_object_or_404(User, id=request.data.get("user_id"))
        tokens = TokenClass.for_user(user)
        serializer = self.get_serializer(tokens)

        return Response(serializer.data, status=status.HTTP_200_OK)
