
from django.urls import path
from .import (
    ProfileView,
    ProfileEdit,
    ProfileFollow
)


users_url_patterns = [
    path('profile/view', ProfileView.as_view()),
    path('profile/edit', ProfileEdit.as_view()),
    path('profile/follow', ProfileFollow.as_view())
]
