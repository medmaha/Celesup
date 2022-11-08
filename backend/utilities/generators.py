import os
import json
import uuid
import requests
from features.models import UniqueId

BASE_URL = os.environ.get("BASE_URL")


def id_generator(used_for=str):
    """Generate a unique uuid for each model object

    Args:
        used_for (string, optional): _description_. Defaults to str.

    Returns:
        _type_: _description_
    """

    a = uuid.uuid4()
    new_uuid = str(a)
    existing_ids = UniqueId.objects.all()

    while True:
        if str(new_uuid) in existing_ids:
            a = uuid.uuid4()
            new_uuid = str(a)
        else:
            break
    new_uuid = new_uuid.replace("-", "")
    UniqueId.objects.create(used_for=used_for, unique_id=new_uuid)
    return new_uuid


def get_profile_data(user):
    # from admin_users.models import Admin

    # from celebrity.models import Celebrity
    # from supporter.models import Supporter

    from api.routes.user.serializers import (
        # AdminSerializer,
        # CelebritySerializer,
        # SupporterSerializer,
        UserDetailSerializer,
    )

    # profile = user.get_profile()
    # profile_serializer = None

    # if isinstance(profile, Admin):
    #     profile_serializer = AdminSerializer(profile).data

    # if isinstance(profile, Celebrity):
    #     profile_serializer = CelebritySerializer(profile).data

    # if isinstance(profile, Supporter):
    #     profile_serializer = SupporterSerializer(profile).data

    # user_serializer = UserDetailSerializer(user).data
    # profile_serializer.update(user_serializer)

    return UserDetailSerializer(user).data


def get_auth_tokens(email: str, password: str):

    data = {"email": str(email), "password": str(password)}
    headers = {"Content-Type": "Application/json"}

    token = requests.post(
        url=BASE_URL + "/obtain/user/tokens", json=data, headers=headers
    )
    return token.json()


def get_new_auth_tokens(token, headers):
    data = {"refresh": str(token)}
    tokens = requests.post(BASE_URL + "/refresh/user/tokens", json=data)
    if tokens:
        return tokens.json()

    return {}
