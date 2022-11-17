from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ...user.serializers import UserMiniInfoSeriaLizer
from notification.models import Notification
from messenging.models import Message


class AccessTokenPayload(TokenObtainPairSerializer):
    """A custom jwt token payload"""

    @classmethod
    def get_token(cls, user):
        # token = super().get_token(user)
        token = cls.token_class.for_user(user)
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


class AuthenticationTokens(TokenObtainPairView):
    """A view for get access token and refreshing tokens"""

    serializer_class = AccessTokenPayload
