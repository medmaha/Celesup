from rest_framework import serializers
from celebrity.models import Celebrity
from supporter.models import Supporter
from users.models import User, Admin


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['profile_type', 'user']

class UserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['cover_img', 'avatar', 'first_name', 'last_name']


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'cover_img', 'avatar', 'username', 'full_name']




class UserCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['avatar', 'email', 'username','first_name','last_name', 'gender',  'city',  'biography', 'user_type',]


class CelebritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Celebrity
        fields = ['posts', 'friends','followers','following']
    


class SupporterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supporter
        fields = ['posts', 'friends','following']

