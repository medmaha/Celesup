from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from users.models import User
from api.routes.authentication.utils import GenerateToken, Database, SendMail
from django.template.loader import render_to_string

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


class VerifyEmailAddress(APIView):
    "Verifies the client whose trying to register by sending a (validation code) to the givin email"
    permission_classes = []
    authentication_classes = []

    temporal_db = Database(table_name="signup_verification")

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        response["Access-Control-Allow-Credentials"] = "true"
        return response

    def get(self, request, format=None):

        cookie = request.headers.get("authorization")

        if not cookie:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        is_authenticated = self.temporal_db.is_authenticated(cookie)

        if is_authenticated:

            dummy = self.temporal_db.get(cookie_id=cookie)

            if not dummy["mailed"]:
                recipient = dummy["email"]
                content = render_to_string(
                    "template_email.html",
                    {"code": dummy["code"], "username": dummy["username"]},
                )
                mail = SendMail(content, recipient, verify_email=True)
                mail.proceed()
                self.temporal_db.update("mailed", int(True), ("cookie_id", cookie))

            return Response(status=status.HTTP_200_OK)

    def post(self, request, format=None):

        CODE = request.data.get("code")
        COOKIE = request.COOKIES.get("cookie_id")

        if "resend-code" in request.data:
            code = self.temporal_db.update_code(cookie_id=COOKIE)

            # todo send code to email

            return Response(status=status.HTTP_200_OK)

        if CODE:
            if self.temporal_db.exists(code=CODE):
                client = self.temporal_db.get_raw_data(code=CODE)
                user = User.objects.create_user(
                    email=client.get("email"),
                    username=client.get("username"),
                    password=client.get("password"),
                    user_type=client.get("user_type"),
                    verified=True,
                )

                tokens = GenerateToken.tokens(user)

                self.temporal_db.delete(code=CODE)
                return Response(
                    tokens,
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            {"message": "Code is missing or invalid"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def send_email_verification_code(code, username, recipients):
        """sends verifications email to the recipient list\n* This can take some minutes"""
        # try:
        #     email = EmailMessage(
        #         '[Celesup] Confirm E-mail Address',
        #         render_to_string('signup_email_body.html', {'username':username, 'code':code}),
        #         settings.EMAIL_HOST_USER,
        #         [recipients]
        #     )
        #     email.fail_silently=False
        #     sended = email.send()
        #     if sended:
        #         return True
        # except:
        #     pass
        # return None
        return True
