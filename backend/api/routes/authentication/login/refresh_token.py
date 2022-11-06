from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from users.models import User
from notification.models import Notification
from messenging.models import Message
from ...user.serializers import UserMiniInfoSeriaLizer


class RefreshTokenClass(RefreshToken):
    @classmethod
    def for_user(cls, user: User):
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


class RefreshTokensSerializer(TokenRefreshSerializer):
    token_class = RefreshTokenClass


class RefreshAuthenticationTokens(TokenRefreshView):
    serializer_class = RefreshTokensSerializer

    def post(self, request, *args, **kwargs):

        user = get_object_or_404(User, id=request.data.get("user_id"))
        refresh = RefreshTokenClass.for_user(user)

        tokens = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        return Response(tokens, status=200)

    # def post(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
