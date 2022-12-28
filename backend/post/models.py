from utilities.media_paths import *
from utilities.generators import id_generator
from django.db import models


from users.models import User

from django.db import models
from django.db.models import Q

import mimetypes
from django.core.exceptions import ValidationError

MAX_FILE_SIZE = 10485760  # mega bytes


def validate_file(file):
    mime_type = mimetypes.guess_type(file.name)[0]
    audio_types = ["audio/mpeg", "audio/ogg", "audio/webm" "audio/wav"]
    video_types = ["video/mp4", "video/webm", "video/ogg"]
    image_types = [
        "image/jpeg",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/bmp",
        "image/webp",
    ]

    file_size = file.size
    if file_size > MAX_FILE_SIZE:  # 10MB
        raise ValidationError("File is too large")

    if mime_type not in [*audio_types, *video_types, *image_types]:
        raise ValidationError("Invalid file type")


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


def post_video_path(instance, filename):
    return f"posts/by__{instance.author.email}/videos/{filename}"


class Video(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    file = models.FileField(
        upload_to=post_video_path,
        null=True,
        blank=True,
        validators=[validate_file],
    )
    title = models.TextField(
        max_length=150,
        null=True,
        blank=True,
    )
    alt_text = models.CharField(max_length=50, default="post")
    thumbnail = models.ImageField(
        upload_to=post_thumbnail_path,
        default="default/video.png",
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.file.url


def post_video_path(instance, filename):
    return f"posts/by__{instance.author.email}/videos/{filename}"


class Music(models.Model):
    audio = models.FileField(
        upload_to=post_video_path,
        validators=[validate_file],
    )
    pass


def post_photo_path(instance, filename):
    return f"posts/by__{instance.author.email}/photos/{filename}"


class Photo(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    image = models.FileField(
        upload_to=post_photo_path,
        default="default/photo.png",
        null=True,
        blank=True,
        validators=[validate_file],
    )
    alt_text = models.CharField(max_length=50, default="post")

    def __str__(self) -> str:
        return self.image.url


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
    video = models.ForeignKey(Video, null=True, blank=True, on_delete=models.SET_NULL)
    picture = models.ForeignKey(Photo, null=True, blank=True, on_delete=models.SET_NULL)
    music = models.ForeignKey(Music, null=True, blank=True, on_delete=models.SET_NULL)

    likes = models.ManyToManyField(User, blank=True, related_name="post_likes")
    shares = models.ManyToManyField(User, blank=True, related_name="post_shares")
    views = models.ManyToManyField(User, blank=True, related_name="views")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    activity_rate = models.BigIntegerField(default=1, null=True, blank=True)
    objects = ObjectManager()

    def __str__(self):
        return "Author --> " + self.author.email

    def get_data(self, view, serializer):
        from utilities.api_utils import get_post_json

        data = get_post_json(self, view)

        # TODO --> files implementation e.g Music, Video

        if data.get("picture"):
            view.serializer_class = serializer
            photo = Photo.objects.get(id=data["picture"])
            photo = view.get_serializer(photo)
            data["picture"] = photo.data["image"]

        return data

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
