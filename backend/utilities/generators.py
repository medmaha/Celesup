import uuid
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
    new_uuid = new_uuid.replace('-', '')
    UniqueId.objects.create(used_for=used_for, unique_id=new_uuid)
    return new_uuid



def get_profile_data(user):
    from admin_users.models import Admin
    from celebrity.models import Celebrity
    from supporter.models import Supporter
    
    from api.routes.user.serializers import (
        AdminSerializer, CelebritySerializer, SupporterSerializer, UserDetailSerializer
    )

    profile = user.get_profile()

    if isinstance(profile, Admin):
        profile_serializer = AdminSerializer(profile).data

    if isinstance(profile, Celebrity):
        profile_serializer = CelebritySerializer(profile).data

    if isinstance(profile, Supporter):
        profile_serializer = SupporterSerializer(profile).data

    user_serializer = UserDetailSerializer(user).data
    profile_serializer.update(user_serializer)

    return profile_serializer
