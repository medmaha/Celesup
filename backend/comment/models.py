from django.db import models
from post.models import Post
from users.models import User


class Comment(models.Model):
    post = models.ForeignKey(
        Post, null=True, blank=True, related_name="comment", on_delete=models.CASCADE
    )
    author = models.ForeignKey(
        User, blank=True, related_name="comment_author", on_delete=models.CASCADE
    )
    content = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    parent = models.ForeignKey(
        "Comment",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="replies",
    )
    likes = models.ManyToManyField(User, blank=True)
    # is_updated = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.author.username}/{self.content[:15]}..."
