""" A sub_user categories"""

from django.db import models
from users.models import User

class Supporter (models.Model):
    id = models.CharField(max_length=100, unique=True, primary_key=True)
    user = models.OneToOneField(User, models.CASCADE, related_name='supporter_user')
    friends = models.ManyToManyField(User, blank=True, related_name='supporter_friends')
    following = models.ManyToManyField(User, blank=True, related_name='supporter_following')
    profile_type = models.CharField(max_length=50, blank=True, default='Supporter', editable=False)

    
    @property
    def avatar(self):
        return self.user.avater.url

    @property
    def posts(self):
        from app_features.models import Post
        posts = Post.objects.filter(author=self.user)
        return posts.count()

    def __str__(self):
        return self.user.email