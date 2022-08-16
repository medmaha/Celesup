
from django.urls import path

from . import (
    PostsList, PostCreate, PostDelete, PostUpdate, PostRetrieve, LikePost
)

posts_url_patterns = [

    # feed
    path('posts/list', PostsList.as_view()),
    path('posts/create', PostCreate.as_view()),
    path('posts/delete', PostDelete.as_view()),
    path('posts/update', PostUpdate.as_view()),
    path('posts/retrieve', PostRetrieve.as_view()),

    # interact
    path('posts/like', LikePost.as_view()),
]
