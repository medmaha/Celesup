from rest_framework.urlpatterns import format_suffix_patterns

from django.urls import path
from .create_comment import (
    PostCommentCreate,
    PostCommentReplyCreate,
    PostCommentReplyList,
    CommentCreate,
)

from .comment_list import PostCommentList

comment_url_patterns = [
    path("comments/<str:key>", PostCommentList.as_view(), name="comment"),
    path(
        "comments/<str:key>/<str:paginate>",
        PostCommentList.as_view(),
        name="comment_slice",
    ),
    path("comments/create", PostCommentCreate.as_view(), name="post_comment"),
    path(
        "comments/reply",
        PostCommentReplyCreate.as_view(),
        name="post_comment_reply_create",
    ),
    path(
        "comments/replies",
        PostCommentReplyList.as_view(),
        name="post_comment_reply_list",
    ),
]
