from rest_framework import serializers
from users.models import User
from admin_users.models import Admin

# from supporter.models import Supporter
# from celebrity.models import Celebrity


class UserMETADATASeriaLizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserMiniInfoSeriaLizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "avatar", "full_name", "username", "public_email"]


class UserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "cover_img",
            "avatar",
            "first_name",
            "last_name",
            "biography",
            "city",
            "gender",
            "email_2",
            "email_3",
            "public_email",
            "email_privacy",
            "notification_email",
        ]


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "cover_img",
            "avatar",
            "username",
            "full_name",
            "public_email",
            "gender",
            "city",
            "biography",
            "friends",
            "following",
            "followers",
            "date_joined",
        ]


class UserCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "avatar",
            "email",
            "username",
            "first_name",
            "last_name",
            "gender",
            "city",
            "biography",
            "user_type",
        ]


# class CelebritySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Celebrity
#         fields = ["posts", "friends", "following", "followers"]


# class SupporterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Supporter
#         fields = ["posts", "friends", "following", "followers"]


# class AdminSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Admin
#         fields = ["profile_type", "user"]
