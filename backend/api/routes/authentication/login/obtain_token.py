from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status

from api.routes.authentication.utils import GenerateToken, Database
from users.models import User


class AuthenticationTokens(TokenObtainPairView):
    """A view for getting access token and refreshing tokens"""

    serializer_class = GenerateToken
    temporal_db = Database("signup_verification")

    def post(self, request, *args, **kwargs):

        data = request.data.copy()

        email = data.get("email")
        password = data.get("password")

        user = authenticate(request, email=email, password=password)
        cookie_id = self.temporal_db.authenticate(email, password)

        if not cookie_id and not user:
            return Response(
                {"message": "Your credentials does match our database"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user:
            tokens = self.serializer_class.tokens(user)
            return Response(tokens, status=status.HTTP_200_OK)

        data = {**self.temporal_db.get(cookie_id=cookie_id)}
        del data["code"]
        return Response(data, status=status.HTTP_200_OK)
