from django.urls import path
from .create_comment import (
    PostCommentCreate,
    PostCommentList,
    PostCommentReplyCreate,
    PostCommentReplyList,
)

comment_url_patterns = [
    path("comments", PostCommentList.as_view(), name="comment"),
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
