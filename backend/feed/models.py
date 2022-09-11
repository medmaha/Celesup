from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from users.models import User


class Feed(models.Model):
    id = models.CharField(unique=True, primary_key=True, max_length=100)
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)

    object = GenericForeignKey('content_type', 'object_id')
    object_id = models.CharField(max_length=255)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def likes(self):
        return self.posts.count

    @property 
    def views(self):
        return self.views.count

    def __str__(self):
        return f'Feed => {self.user.email}'

    def __id__(self):
        return f'{self.id[:10]}...'

    def __posts__(self):
        return self.posts.all().count()

    def __status__(self):
        return self.status.all().count()
