from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from django.shortcuts import get_object_or_404
from users.models import User

from utilities.generators import get_profile_data
from api.routes.user.serializers import UserDetailSerializer


class ProfileView(GenericAPIView):

    serializer_class = UserDetailSerializer
    
    def post(self, request, *args, **kwargs):
        profile_id = request.data.get('Profile-Id')
   
        user = get_object_or_404(User, id=profile_id)

        profile_data = get_profile_data(user)

        # serialize_data = self.get_serializer(user)
        # profile_data.update(serialize_data.data)



        
        return Response(profile_data, status=200)