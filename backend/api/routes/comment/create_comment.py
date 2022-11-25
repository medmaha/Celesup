from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from users.models import User
from post.models import Post
from comment.models import Comment
from .serializers import CommentSerializer
from utilities.generators import get_profile_data
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

        self.perform_create(serializer)
        post.activity_rate += 1
        post.save()
        headers = self.get_success_headers(serializer.data)

        return Response(status=201, headers=headers)

    def perform_create(self, serializer):
        serializer.save()


class PostCommentList(ListAPIView):
    def list(self, request, *args, **kwargs):

        post_key = str(request.get_full_path()).split("?")[1].split("=")[1]
        post = get_object_or_404(Post, key=post_key)

        queryset = Comment.objects.filter(post=post, parent=None).order_by(
            "-created_at"
        )[:3]

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

            child_comments = Comment.objects.filter(
                post_id=comment["post"], parent_id=comment["id"]
            ).order_by("-created_at")[:3]

            self.serializer_class = UserMiniInfoSeriaLizer
            comment["author"] = self.get_serializer(
                User.objects.get(id=comment["author"])
            ).data
            self.serializer_class = CommentSerializer
            comment["children"] = self.get_serializer(child_comments, many=True).data

            for child in comment["children"]:
                self.serializer_class = UserMiniInfoSeriaLizer
                child["author"] = self.get_serializer(
                    User.objects.get(id=child["author"])
                ).data

        return data


class PostCommentReplyCreate(CreateAPIView):
    def create(self, request, *args, **kwargs):

        data = request.data.copy()
        post_id = data.get("post")
        comment_id = data.get("parent")
        comment_author_id = data.get("author")

        post = get_object_or_404(Post, key=post_id)
        get_object_or_404(User, id=comment_author_id)
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
