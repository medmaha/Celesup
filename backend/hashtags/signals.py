from django.dispatch import receiver
from django.db.models.signals import post_save
from hashtags.models import HashTag
from post.models import Post

# Create a streaming algorithm for feeding followers and friends on new status arrival
@receiver(post_save, sender=Post)
def stream_post(sender, instance, created, **kwargs):

    hashtag = instance.hashtags

    if not hashtag: return

    hashtags = hashtag.split(',')

    for tag in hashtags:
        try:
            tag = tag.split('#')[1].strip().lower()
        except:
            tag = tag.strip().lower() 

        existing_hashtags = HashTag.objects.filter(tag_text=tag).exists()

        # TODO add hashtag object to the matching tag
        if existing_hashtags: continue

        HashTag.objects.create(
            tag_text=tag,
            object=instance, 
            object_id=instance.key
        )