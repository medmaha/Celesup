""" a sub user category"""

from django.db import models
from users.models import User

# class FanClub(models.Model):
#     """
#     Provides a fan base functionality for a celebrity user...
#     * One fans club for each celebrity
#     """
#     name = models.CharField(max_length=100)
#     members = models.ManyToManyField(User, blank=True)
#     conversations = [{
#         'author':'medmaha',
#         'message':'my fav! i love j-hus',
#     }]


class Celebrity (models.Model):
    """
    Celebrity user acoount class
    """
    id        = models.CharField(max_length=100, unique=True, primary_key=True)
    user      = models.OneToOneField(User, models.CASCADE, related_name='celebrity_user')
    friends   = models.ManyToManyField(User, blank=True, related_name='celebrity_friends')
    followers = models.ManyToManyField(User, blank=True, related_name='celebrity_followers')
    following = models.ManyToManyField(User, blank=True, related_name='celebrity_following')
    profile_type = models.CharField(max_length=50, default='Celebrity', editable=False)
    
    # fan_club  = models.OneToOneField(FanClub, on_delete=models.PROTECT, null=True, blank=True)

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

    class Meta:
        verbose_name = 'Celebrity'
        verbose_name_plural = 'Celebrities'


