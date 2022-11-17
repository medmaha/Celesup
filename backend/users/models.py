from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

from utilities.media_paths import avatar_path, cover_img_path


class UserManager(BaseUserManager):
    pass


class User(AbstractUser):
    "Base the user class"
    id = models.CharField(max_length=100, primary_key=True, blank=True)
    avatar = models.ImageField(
        upload_to=avatar_path, default="profiles/avatar_default.png"
    )
    email = models.EmailField(
        max_length=160,
        null=False,
        unique=True,
        blank=True,
    )
    username = models.CharField(max_length=50, null=False, blank=False)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(
        max_length=20, null=True, blank=True, default="Unspecified"
    )
    city = models.CharField(
        max_length=100, null=True, blank=True, default="Unspecified"
    )
    biography = models.CharField(max_length=350, null=True, blank=True)
    cover_img = models.ImageField(
        upload_to=cover_img_path, default="profiles/cover_default.png"
    )
    user_type = models.CharField(max_length=20, blank=True, default="Admin")

    friends = models.ManyToManyField("User", blank=True, related_name="user_friends")
    followers = models.ManyToManyField(
        "User", blank=True, related_name="user_followers"
    )
    following = models.ManyToManyField(
        "User", blank=True, related_name="user_following"
    )

    email_2 = models.EmailField(max_length=100, null=True, blank=True)
    email_3 = models.EmailField(
        max_length=100,
        null=True,
        blank=True,
    )
    public_email = models.EmailField(max_length=100, null=True, blank=True, unique=True)
    notification_email = models.EmailField(max_length=100, null=True, blank=True)
    email_privacy = models.BooleanField(default=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects: UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    @property
    def profile(self):
        from admin_users.models import Admin
        from celebrity.models import Celebrity
        from supporter.models import Supporter

        if self.user_type.lower().startswith("cele"):
            return Celebrity.objects.get(user=self)
        if self.user_type.lower().startswith("supp"):
            return Supporter.objects.get(user=self)
        if self.user_type.lower().startswith("admin"):
            return Admin.objects.get(user=self)
        return self

    @property
    def full_name(self):
        return self.first_name.capitalize() + " " + self.last_name.capitalize()

    @property
    def emails(self):
        e = [self.email, self.email_2, self.email_3]

        for i, email in enumerate(e):
            if not email:
                e.pop(i)
            elif len(email) < 3:
                e.pop(i)

        return e

    def get_profile(self):
        return self.profile

    def __str__(self):
        return self.username[:25]

    def __repr__(self):
        return self.email
