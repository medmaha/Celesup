from django.urls import path
from . import ProfileView, ProfileEdit, ProfileFollow, ProfileList


users_url_patterns = [
    path("profile/all", ProfileList.as_view()),
    path("profile/view", ProfileView.as_view()),
    path("profile/edit", ProfileEdit.as_view()),
    path("profile/follow", ProfileFollow.as_view()),
]
