import uuid
from app_features.models import UniqueIds
from users.models import User
from celebrity.models import Celebrity
from supporter.models import Supporter



# Generate a unique uuid for each model object
def uuid_generator(used_for=str):
    a = uuid.uuid4()
    new_uuid = str(a)
    existing_ids = UniqueIds.objects.all()

    while True:
        if str(new_uuid) in existing_ids:
            a = uuid.uuid4()
            new_uuid = str(a)
        else:
            break
    new_uuid = new_uuid.replace('-', '')
    UniqueIds.objects.create(used_for=used_for, unique_id=new_uuid)
    return new_uuid


# Find out the user type from the given argument of the user Instance
def get_user_profile(instance):
    user = User.objects.get(id=instance.id)
    celebrity = Celebrity.objects.filter(user=user).exists()
    supporter = Supporter.objects.filter(user=user).exists()
    
    if celebrity:
        return {
            'profile': Celebrity.objects.get(user=user),
            'type': 'celebrity'
        }
    if supporter:
        return {
            'profile': Supporter.objects.get(user=user),
            'type': 'supporter'
        }
    return {
        'profile': object(),
        'type': ''
    }

