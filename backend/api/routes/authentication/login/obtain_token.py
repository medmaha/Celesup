
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from utilities.generators import get_profile_data

class AccessTokenPayload(TokenObtainPairSerializer):
    """ A custom jwt token payload """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        profile_data = get_profile_data(user)

        for key, val in profile_data.items():
            token[str(key)] = val
        
        return token


class AuthenticationTokens(TokenObtainPairView):
    """ A view for get access token and refreshing tokens""" 
    serializer_class = AccessTokenPayload


