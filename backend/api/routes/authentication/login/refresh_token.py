from rest_framework_simplejwt.views import TokenRefreshView

from rest_framework.response import Response
from rest_framework import status

from users.models import User

from api.routes.authentication.utils import GenerateToken


class RefreshAuthenticationTokens(TokenRefreshView):
    def post(self, request, *args, **kwargs):

        data = request.data.copy()

        if "user_id" in data:

            try:
                serializer = self.get_serializer(data={"refresh": data["refresh"]})
                serializer.is_valid(raise_exception=True)
                user = User.objects.get(id=data["user_id"])

            except Exception as e:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

            tokens = GenerateToken.tokens(user)
            return Response(tokens, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_401_UNAUTHORIZED)
