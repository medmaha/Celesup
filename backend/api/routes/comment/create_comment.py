from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import View
from users.models import User
from post.models import Post
from comment.models import Comment
from .serializers import CommentSerializer
from utilities.generators import get_profile_data
from django.shortcuts import get_object_or_404
from ..user.serializers import UserMiniInfoSeriaLizer


class CommentCreate(GenericAPIView):
    def get(self, request, key, paginate=None, *args, **kwargs):
        post = get_object_or_404(Post, key=key)

        if paginate:
            offset, slice = paginate.split("&")
            print(offset, slice)

        return Response([], status=status.HTTP_200_OK)


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

        self.perform_create(serializer)
        post.activity_rate += 1
        post.save()
        headers = self.get_success_headers(serializer.data)

        comment = serializer.data
        comment["author"] = UserMiniInfoSeriaLizer(post.author).data

        return Response(serializer.data, status=201, headers=headers)

    def perform_create(self, serializer):
        serializer.save()


class PostCommentReplyCreate(CreateAPIView):
    def create(self, request, *args, **kwargs):

        data = request.data.copy()
        post_id = data.get("post")
        comment_id = data.get("parent")

        if not isinstance(request.user, User):
            return Response(status=status.HTTP_404_NOT_FOUND)

        data["author"] = request.user.id
        post = get_object_or_404(Post, key=post_id)
        get_object_or_404(Comment, id=comment_id)

        serializer = CommentSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        post.activity_rate += 2
        post.save()
        headers = self.get_success_headers(serializer.data)

        return Response(status=201, headers=headers)

    def perform_create(self, serializer):
        serializer.save()


class PostCommentReplyList(ListAPIView):
    def list(self, request, *args, **kwargs):

        comment_id, post_key = str(request.get_full_path()).split("?")[1].split("&")

        post = get_object_or_404(Post, key=post_key.split("=")[1])
        comment = get_object_or_404(Comment, id=comment_id.split("=")[1])

        queryset = Comment.objects.filter(post=post, parent=comment).order_by(
            "created_at"
        )

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = CommentSerializer(page, many=True)
            data = self.get_data(serializer)
            return self.get_paginated_response(data)

        serializer = CommentSerializer(queryset, many=True)
        serializer = self.get_data(serializer)
        return Response(data)

    def get_data(self, serializer):
        data = serializer.data
        for comment in data:
            comment["author"] = get_profile_data(User.objects.get(id=comment["author"]))

        return data
