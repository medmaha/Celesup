from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from users.models import User

from django.utils import timezone


class FeedObjects(models.Model):
    id = models.CharField(unique=True, primary_key=True, max_length=100, blank=True)
    object = GenericForeignKey("content_type", "object_id")
    object_id = models.CharField(max_length=255)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)


class Feed(models.Model):
    id = models.CharField(unique=True, primary_key=True, max_length=100, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)

    feed_objects = models.ManyToManyField(FeedObjects, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
