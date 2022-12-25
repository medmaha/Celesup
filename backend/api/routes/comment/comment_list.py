from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from users.models import User
from post.models import Post
from comment.models import Comment
from .serializers import CommentSerializer
from django.shortcuts import get_object_or_404
from ..user.serializers import UserMiniInfoSeriaLizer


class PostCommentList(ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.filter(post=self.post, parent=None).order_by(
            "-created_at"
        )
        return queryset

    def get_data(self, serializer):
        data = serializer.data

        for comment in data:
            instance = Comment.objects.get(id=comment["id"])
            child_comments = instance.get_replies()

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

    def get(self, request, key, *args, **kwargs):
        post = get_object_or_404(Post, key=key)
        self.post = post
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            data = self.get_data(serializer)
            return self.get_paginated_response(data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(data)
