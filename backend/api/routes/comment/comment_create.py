from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from users.models import User
from post.models import Post
from .serializers import CommentSerializer
from django.shortcuts import get_object_or_404
from ..user.serializers import UserMiniInfoSeriaLizer


class PostCommentCreate(CreateAPIView):
    def create(self, request, *args, **kwargs):

        data = request.data.copy()

        if not isinstance(request.user, User):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        user = request.user
        post = get_object_or_404(Post, key=data.get("post"))
        data["author"] = user.id

        serializer = CommentSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(post, serializer)
        headers = self.get_success_headers(serializer.data)

        self.serializer_class = UserMiniInfoSeriaLizer
        comment = serializer.data
        comment["author"] = self.get_serializer(post.author).data

        return Response(comment, status=201, headers=headers)

    def perform_create(self, post, serializer):
        serializer.save()
        post.activity_rate += 1
        post.save()
        post.author.rating += 1
        post.author.save()
