import uuid
import requests
from features.models import UniqueId


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
    from admin_users.models import Admin

    from celebrity.models import Celebrity
    from supporter.models import Supporter

    from api.routes.user.serializers import (
        AdminSerializer,
        CelebritySerializer,
        SupporterSerializer,
    )

    profile = user.get_profile()

    if isinstance(profile, Admin):
        return AdminSerializer(profile)
    elif isinstance(profile, Celebrity):
        return CelebritySerializer(profile)
    elif isinstance(profile, Supporter):
        return SupporterSerializer(profile)
    else:
        return {}


def get_auth_tokens(url: str, email: str, password: str):

    data = {"email": str(email), "password": str(password)}
    headers = {"Content-Type": "Application/json"}

    token = requests.post(
        url="http://{}/obtain/user/tokens".format(url), json=data, headers=headers
    )
    return token.json()
