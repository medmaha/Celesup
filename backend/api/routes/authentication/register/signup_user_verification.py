from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .db import Database


class SignupUserVerification(APIView):
    "Verifies the client whose trying to register by sending a (validation code) to the givin email"
    permission_classes = []
    authentication_classes = []

    temporal_database = Database(table_name='signup_verification')

    def post(self, request, format=None):
        data = request.data


        if not data.get('code'):
            return Response({'message': ' "Code" field is required'}, status=status.HTTP_400_BAD_REQUEST) 

        client = self.temporal_database.get_record(code=data.get('code'))
        if client:
            return Response( {'message':'Success verified'}, status=status.HTTP_200_OK)    
        
        return Response({'message': 'Invalid Code'}, status=status.HTTP_400_BAD_REQUEST)

