from rest_framework import serializers
from comment.models import Comment
from celebrity.models import Celebrity
from supporter.models import Supporter
from users.models import User


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "author", "parent", "content", "post", "parent", "created_at"]
