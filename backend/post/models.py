from utilities.media_paths import *
from utilities.generators import id_generator
from django.db import models
from users.models import User

from django.db import models

class Post(models.Model):
    key = models.CharField(max_length=100, primary_key=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author', blank=True)

    tags = models.ManyToManyField(User, related_name='tag', blank=True)
    publish = models.CharField(max_length=35, default='Public')

    caption = models.CharField(max_length=250, null=True, blank=True)
    excerpt = models.TextField(max_length=2000, null=True, blank=True)
    hashtags = models.CharField(max_length=250, null=True, blank=True)

    thumbnail = models.ImageField(upload_to=post_thumbnail_path, default='posts/default-thumbnail.png', null=True, blank=True)
    picture = models.ImageField(upload_to=post_img_path, null=True, blank=True)
    video = models.FileField(upload_to=post_video_path, null=True, blank=True)

    likes = models.ManyToManyField(User, blank=True, related_name='post_likes')
    shares = models.ManyToManyField(User, blank=True, related_name='post_shares')
    views = models.ManyToManyField(User, blank=True, related_name='views')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    query_number = models.BigIntegerField(default=0, null=True, blank=True)
    activity_rate = models.BigIntegerField(default=1, null=True, blank=True)

    def save(self, *args, **kwargs):
        key = id_generator(f'Post')
        self.key = key
        super().save(*args, **kwargs)
    

    @property
    def get_short_excerpt(self):
        return self.excerpt[:100]

    @property
    def post_views(self):
        return self.views.count()

    @property
    def post_likes(self):
        return str(self.likes.count())

    @property
    def post_shares(self):
        return '3.7k'

    @property
    def post_comments(self):
        return str(2)+'k'
    @property
    def post_saves(self):
        return str(10)
