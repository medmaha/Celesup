from django.dispatch import receiver
from django.db.models.signals import (post_save, pre_delete, pre_save)
from users.models import User, Admin



from app_features.models import Post, Feed, Status
from .generators import (
    uuid_generator,
    get_user_profile
)
from celebrity.models import Celebrity
from supporter.models import Supporter


# Define the user_type when a new User is registered
@receiver(post_save, sender=User)
def isolate_user(sender, instance, created, **kwargs):
    if created:        
        if instance.user_type.lower().startswith('cel'):
            Celebrity.objects.create(user=instance, id=instance.id)
            # instance.save()

        if instance.user_type.lower().startswith('sup'):
            Supporter.objects.create(user=instance, id=instance.id)
            # instance.save()
            
        if instance.user_type.lower() == ('admin'):
            Admin.objects.create(user=instance)
            # instance.save()



# Create a streaming algorithm for feeding followers and friends on new status arrival
@receiver(post_save, sender=Post)
def stream_post(sender, instance, created, **kwargs):
    
    author = instance.author
    if author.user_type.lower() == 'admin':
        return

    feeds = Feed.objects.all()
    profile = author.profile


    friends = profile.friends.all()
    followers = None

    if created and profile.user_type == 'celebrity':
        followers = profile.user_type.followers.all() 

        for friend in friends:
            friend_has_feed = False  
            for feed in feeds:
                if feed.user == friend:
                    feed.posts.add(instance)
                    friend_has_feed = True

            if not friend_has_feed:
                id = uuid_generator(used_for=f'Post Feed')
                feed = Feed.objects.create(user=friend, id=id)
                feed.posts.add(instance)

        for follower in followers:
            if follower in friends:
                continue
            follower_has_feed = False
            for feed in feeds:
                if feed.user == follower:
                    feed.posts.add(instance)
                    follower_has_feed = True

            if not follower_has_feed:
                id = uuid_generator(used_for=f'Post Feed')
                feed = Feed.objects.create(user=follower, id=id)
                feed.posts.add(instance)

    if created and profile.user_type == 'supporter':
        for friend in friends:
            follower_has_feed = False
            for feed in feeds:
                if feed.user == friend:
                    feed.posts.add(instance)
                    follower_has_feed = True
                    
            if not follower_has_feed:
                id = uuid_generator(used_for='Post Feed')
                feed = Feed.objects.create(user=friend, id=id)
                feed.posts.add(instance)


# Streamming status to friends and followers
@receiver(post_save, sender=Status)
def stream_status(sender, instance, created, **kwargs):
    if created:

        feeds = Feed.objects.all()
        author = get_user_profile(instance.author)
        friends = author['profile'].friends.all()

        if author['type'] == 'celebrity':
            followers = author['profile'].followers.all() 

            for friend in friends:
                friend_has_feed = False
                for feed in feeds:
                    if feed.user == friend:
                        feed.status.add(instance)
                        friend_has_feed = True

                if not friend_has_feed:
                    id = uuid_generator(used_for=f'Status Feed')
                    feed = Feed.objects.create(user=friend, id=id)
                    feed.status.add(instance)

            for follower in followers:
                if not follower in friends: #key
                    follower_has_feed = False
                    for feed in feeds:
                        if feed.user == follower:
                            feed.status.add(instance)
                            follower_has_feed = True


                    if not follower_has_feed:
                        id = uuid_generator(used_for=f'Status Feed')
                        feed = Feed.objects.create(user=follower, id=id)
                        feed.status.add(instance)


        if author['type'] == 'supporter':
            for friend in friends:
                friend_has_feed = False
                for feed in feeds:
                    if feed.user == friend:
                        feed.status.add(instance)
                        friend_has_feed = True
                        
                if not friend_has_feed:
                    id = uuid_generator(used_for=f'Status Feed')
                    feed = Feed.objects.create(user=friend, id=id)
                    feed.status.add(instance)

