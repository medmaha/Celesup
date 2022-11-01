from django.db.models.signals import post_save
from django.dispatch import receiver

from post.models import Post

@receiver(signal=post_save, sender=Post)
def like_notification(sender, instance, created, *args, **kwargs):
    if created: return




