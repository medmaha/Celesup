from utilities.media_paths import *
from utilities.generators import id_generator
from django.db import models


from users.models import User

from django.db import models
from django.db.models import Q


class ObjectManager(models.Manager):
    def trending(self, limit=5):
        queryset = self.filter(activity_rate__gte=3)[:limit]
        return queryset

    def not_trending(self, limit=5):
        queryset = self.filter(activity_rate__lte=3)[:limit]
        return queryset

    def get_latest(self, limit=5):
        queryset = self.filter().order_by("-created_at")[:limit]
        return queryset

    def get_earliest(self, limit=5):
        queryset = self.filter().order_by("created_at")[:limit]
        return queryset

    def smart_query(self, limit=5):
        queryset = self.filter(Q(activity_rate__gte=1))
        return queryset


class Video(models.Model):
    file = models.FileField(upload_to=post_video_path, null=True, blank=True)
    title = models.TextField(max_length=150, null=True, blank=True)
    alt_text = models.CharField(max_length=50, default="post video")
    thumbnail = models.ImageField(
        upload_to=post_thumbnail_path,
        default="defaults/thumbnail.png",
        null=True,
        blank=True,
    )

    def __str__(self):
        self.title or self.file.url


class Photo(models.Model):
    image = models.ImageField(
        upload_to=post_thumbnail_path,
        default="posts/default-thumbnail.png",
        null=True,
        blank=True,
    )
    alt_text = models.CharField(max_length=50, default="post image")

    def __str__(self) -> str:
        return self.post_set().author or self.image.url


class Post(models.Model):
    key = models.CharField(max_length=100, primary_key=True, blank=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="author", blank=True
    )

    tags = models.ManyToManyField(User, related_name="tag", blank=True)
    publish = models.CharField(max_length=35, default="Public")

    caption = models.CharField(max_length=250, null=True, blank=True)
    excerpt = models.TextField(max_length=2000, null=True, blank=True)
    hashtags = models.CharField(max_length=250, null=True, blank=True)

    thumbnail = models.ImageField(
        upload_to=post_thumbnail_path,
        default="posts/default-thumbnail.png",
        null=True,
        blank=True,
    )
    picture = models.ImageField(upload_to=post_img_path, null=True, blank=True)
    video = models.FileField(upload_to=post_video_path, null=True, blank=True)

    likes = models.ManyToManyField(User, blank=True, related_name="post_likes")
    shares = models.ManyToManyField(User, blank=True, related_name="post_shares")
    views = models.ManyToManyField(User, blank=True, related_name="views")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    activity_rate = models.BigIntegerField(default=1, null=True, blank=True)
    objects = ObjectManager()

    def __str__(self):
        return "Author --> " + self.author.email

    class Meta:
        get_latest_by = "created_at"
        ordering = ("-updated_at", "activity_rate", "-created_at")

    def save(self, *args, **kwargs):
        if self.key:
            return super().save(*args, **kwargs)

        key = id_generator(f"Post")
        self.key = key
        return super().save(*args, **kwargs)

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
        return "3.7k"

    @property
    def post_comments(self):
        return str(2) + "k"

    @property
    def post_saves(self):
        return str(10)


# b = User.objects.last()
# a = User.objects.first()

# c = [a, b]
# import random

# for i in range(22, 50):
#     Post.objects.create(
#         author=random.choice(c),
#         caption=f"post {i}",
#         excerpt=f"testing feed pagination post_{i}",
#     )
