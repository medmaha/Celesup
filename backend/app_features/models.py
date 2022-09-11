from utilities.media_paths import *
from django.utils import timezone
from django.db import models
from django.db.models import Q
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from users.models import User




class Comment(models.Model):
    id = models.CharField(max_length=100, unique=True, primary_key=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    post = models.ForeignKey(
        'Post', on_delete=models.CASCADE, null=True, blank=True)
    status = models.ForeignKey(
        'Status', on_delete=models.CASCADE, null=True, blank=True)
    body = models.TextField(max_length=500)
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.post:
            return f'Post => {self.body[:15]}'
        return f'Status => {self.body[:15]}'


class Status(models.Model):
    key = models.CharField(max_length=100, unique=True, blank=True, null=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='status_author')
    caption = models.CharField(max_length=200, null=True, blank=True)
    picture = models.ImageField(
        upload_to=status_img_path, null=True, blank=True)
    video = models.FileField(
        upload_to=status_video_path, null=True, blank=True)
    likes = models.ManyToManyField(
        User, blank=True, related_name='status_likes')
    views = models.ManyToManyField(
        User, blank=True, related_name='status_views')
    date_posted = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name_plural = 'Status'

    def __str__(self):
        if self.caption:
            return f'{self.author.username} -- {self.caption[:10]}...'
        return f'{self.author.username}'


class GroupChatsThread(models.Model):
    message = models.CharField(max_length=500, null=True, blank=True)
    image = models.ImageField(
        upload_to=group_chat_img_path, null=True, blank=True)
    file = models.FileField(
        upload_to=group_chat_video_path, null=True, blank=True)
    date_posted = models.DateTimeField(default=timezone.now)


class Group(models.Model):
    name = models.CharField(max_length=150, blank=True,
                            unique=True, editable=True)
    creator = models.ForeignKey(User, on_delete=models.PROTECT, blank=True)
    admins = models.ManyToManyField(User, blank=True, related_name='admins')
    members = models.ManyToManyField(User, blank=True, related_name='members')
    conversations = models.ManyToManyField(
        'GroupChatsThread', blank=True, related_name='conversations')
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Groups'


#
class Trends():
    class Meta:
        verbose_name_plural = 'Trendings'
    pass


class Activity():
    class Meta:
        verbose_name_plural = 'Activities'
    pass
