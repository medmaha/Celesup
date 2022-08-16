from django.urls import path

from .views import (
    Index,
    PostDetail,
    PostListView,
    PostUpdate, post_like,
    friend_and_unfriend,
    follow_and_unfollow,
)

from .authentication import (
    sign_out,
    sign_in,
    sign_up,
    register
)

urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('login/', sign_in, name='login'),
    path('register/', register, name='register'),
    path('signup/', sign_up, name='signup'),
    path('logout/', sign_out, name='logout'),


    path('post-like/<str:post_key>/', post_like, name='post-like'),

    path('post-detail/<str:pk>/', PostDetail.as_view(), name='post-detail'),
    path('post-update/<str:pk>/', PostUpdate.as_view(), name='post-update'),

    path('follow_unfollow/<str:user_id>/', follow_and_unfollow, name='follow'),
    path('friend_unfriend/<str:user_id>/', friend_and_unfriend, name='friend'),
]