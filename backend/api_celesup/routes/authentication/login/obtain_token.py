
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from celebrity.models import Celebrity
from supporter.models import Supporter

from utils.generators import get_user_profile
from ....serializers import (CelebritySerializer, SupporterSerializer)


class AccessTokenPayload(TokenObtainPairSerializer):
    """ A custom jwt token payload """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        profile = user.get_profile()

        if isinstance(profile, Celebrity):
            profile = CelebritySerializer(profile).data

        if isinstance(profile, Supporter):
            profile = SupporterSerializer(profile).data

        # Add custom claims
        token['id'] = user.id
        token['avatar'] = 'http://localhost:8000'+user.avatar.url
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['user_type'] = user.user_type
        return token


class AuthenticationTokens(TokenObtainPairView):
    """ A view for get access token and refreshing tokens""" 
    serializer_class = AccessTokenPayload


