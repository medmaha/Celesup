from notification.models import Notification
from messenging.models import Message
from api.routes.user.serializers import UserMiniInfoSeriaLizer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class GenerateToken(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        t = cls.token_class.for_user(user)
        token = cls.get_user_data(t, user)
        return token

    @classmethod
    def get_user_data(cls, token, user):
        user_data = UserMiniInfoSeriaLizer(user).data
        token["data"] = {}

        token["data"]["has_alerts"] = Notification.objects.filter(
            recipient=user, is_viewed=False
        ).exists()
        token["data"]["has_message"] = Message.objects.filter(
            recipient=user, is_seen=False
        ).exists()

        for key, val in user_data.items():
            token["data"][str(key)] = val

        return token

    @classmethod
    def tokens(cls, user):
        token = cls.get_token(user)

        data = {"access": str(token.access_token), "refresh": str(token)}

        return data
