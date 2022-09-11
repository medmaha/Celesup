
from django.dispatch import receiver
from django.db.models.signals import (post_save, pre_save)

from users.models import User
from admin_users.models import Admin
from celebrity.models import Celebrity
from supporter.models import Supporter

from utilities.generators import id_generator


@receiver(pre_save, sender=User)
def assign_user_id(sender, instance, *args, **kwargs):
    try:
        User.objects.get(email=instance.email)
    except:
        id = id_generator('User')
        instance.id = id


@receiver(post_save, sender=User)
def differentiate_usertypes(sender, instance, created, **kwargs):
    if created:        
        if instance.user_type.lower().startswith('cel'):
            Celebrity.objects.create(user=instance, id=instance.id)

        if instance.user_type.lower().startswith('sup'):
            Supporter.objects.create(user=instance, id=instance.id)
            
        if instance.user_type.lower() == ('admin'):
            Admin.objects.create(user=instance)

