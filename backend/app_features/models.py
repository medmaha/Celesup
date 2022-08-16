from utils.media_paths import *
from django.utils import timezone
from django.db import models
from django.db.models import Q
from django.utils.text import slugify

from users.models import User


class UniqueIds(models.Model):
    used_for = models.CharField(max_length=100, null=True, blank=True)
    unique_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f'{self.id}. {self.used_for} -- {self.unique_id}'

# Api Query that returns the must liked and the must watched "Video Post"


class ApiQueryManager(models.Manager):
    def get_queryset(self):
        objects = super().get_queryset()
        queryset = objects.filter(
            Q(likes__gte=2, views__gte=2) |
            Q(likes__gte=1, views__gte=1)
        )
        ids = []
        for i in set(queryset):
            ids.append(i.id)
        queryset = objects.filter(id__in=ids).order_by('-rating')
        return queryset


class Post(models.Model):
    key = models.CharField(max_length=40, unique=True,
                           blank=True, primary_key=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='author', blank=True)
    title = models.CharField(max_length=150, blank=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    hashtags = models.CharField(max_length=100, null=True, blank=True)
    caption = models.TextField(max_length=1500, null=True, blank=True)

    thumbnail = models.ImageField(upload_to=post_thumbnail_path,
                                  default='posts/default-thumbnail.png', null=True, blank=True)
    picture = models.ImageField(upload_to=post_img_path, null=True, blank=True)
    video = models.FileField(upload_to=post_video_path, null=True, blank=True)

    likes = models.ManyToManyField(User, blank=True, related_name='post_likes')
    shares = models.ManyToManyField(
        User, blank=True, related_name='post_shares')
    views = models.ManyToManyField(User, blank=True, related_name='views')

    date_posted = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    objects = models.Manager()
    api_query = ApiQueryManager()

    rating = models.IntegerField(default=1)

    # def get_absolute_url(self):
    #     return reverse('post-detail', self.pk)

    @property
    def author_profile(self):
        from utils.generators import get_user_profile
        return get_user_profile(self.author)['profile']

    @property
    def post_author(self):
        profile = self.author_profile
        return str(profile.user.username)

    @property
    def get_short_content(self):
        return self.content[:100]

    @property
    def post_views(self):
        return self.views.count()

    @property
    def post_likes(self):
        return str(self.likes.count())
    # @property
    # def post_likes(self):
    #     return str(147)+'k'

    @property
    def post_shares(self):
        return str(10)+'k'
    @property
    def post_comments(self):
        return str(20)+'k'
    @property
    def post_saves(self):
        return str(10)

    def save(self, *args, **kwargs):
        try:
            Post.objects.get(key=self.key)
            return super().save(*args, **kwargs)
        
        # todo pre_save signal method
        except:

            from utils.generators import uuid_generator
            slug = slugify(self.title)
            self.slug = slug
            self.key = slugify(uuid_generator(f'Post'))

            try:
                return super().save(*args, **kwargs)
            except:
                if not self.title:
                    self.slug = self.key
                else:
                    self.slug = slug +'-'+ self.key[:5]
                return super().save(*args, **kwargs)



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


# For Feed
class CustomFeedManager(models.Manager):
    def get_queryset(self):
        queryset = super().get_queryset()
        queryset.all().exclude(
            Q(posts__lte=1) |
            Q(status__lte=1)
        )
        return queryset


class Feed(models.Model):
    id = models.CharField(unique=True, primary_key=True, max_length=100)
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    posts = models.ManyToManyField('Post', blank=True, related_name='posts')
    status = models.ManyToManyField(
        'Status', blank=True, related_name='statsu')
    updated = models.DateTimeField(auto_now=True)
    started = models.DateTimeField(auto_now_add=True)

    objects = CustomFeedManager()

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


class Trends():
    class Meta:
        verbose_name_plural = 'Trendings'
    pass


class Activity():
    class Meta:
        verbose_name_plural = 'Activities'
    pass
