from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from api.routes.user.serializers import UserCreationSerializer


from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .db import Database
 

def send_email_verification_code(code, username, recipients):
    """ sends verifications email to the recipient list\n* This can take some minutes"""
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
    
 
class SignupUser(APIView):
    " signup route for initial client data collection "

    permission_classes = []
    authentication_classes = []

    temporal_database = Database(table_name='signup_verification')

    def get(self, request, format=None):
        return Response({'message': 'method "GET" not allowed'}, status=status.HTTP_405_BAD_REQUEST)

    def post(self, request, format=None):
        serializer = UserCreationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = request.data
        CODE = self.temporal_database.create_unique_validation_code()
        print(CODE)
        print(data.get('email'), data.get('password'))

        send_mail = send_email_verification_code(code=CODE, username=data.get('username', ''), recipients=data.get('email', 'email@email.com'))
        if not send_mail:
            return Response({'message': "Sorry We can't reach your domain! Try again later"}, status=408)
        
        
        db = self.temporal_database.add_record(
            email=data['email'], username=data.get('username'),
            password=data['password'], user_type=data.get('user_type').capitalize(), code=CODE 
        )
        if db:
            return Response({'message': "We've send a verification code to the email you provide"}, status=status.HTTP_200_OK)        
        return Response({'message': 'Oops something went wrong! this not your fault'}, status=status.HTTP_400_BAD_REQUEST)


