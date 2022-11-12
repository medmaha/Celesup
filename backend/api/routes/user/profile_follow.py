from django.shortcuts import get_object_or_404
from django.contrib.contenttypes.models import ContentType
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from rest_framework import status

from feed.models import Feed, FeedObjects
from users.models import User
from post.models import Post

from .serializers import UserDetailSerializer
from utilities.generators import get_profile_data

from django.db import transaction


class ProfileFollow(GenericAPIView):
    def post(self, request, *args, **kwargs):
        profile = get_object_or_404(User, id=request.data.get("profile_id"))

        client = request.user

        try:
            get_object_or_404(User, id=profile.id)
        except AttributeError:
            pass

        if not isinstance(client, User):
            return Response(status=status.HTTP_404)

        if client in profile.followers.all():
            profile.followers.remove(client)
            client.following.remove(profile)

            FollowThread(profile, client, "onFollow")

        else:
            profile.followers.add(client)
            client.following.add(profile)

            FollowThread(profile, client)

        self.serializer_class = UserDetailSerializer

        profile_data = get_profile_data(profile)
        serializer = self.get_serializer(profile).data

        data = {**profile_data, **serializer}

        return Response(data, status=status.HTTP_200_OK)


import threading


class FollowThread(threading.Thread):
    def __init__(self, user, client, task="Follow"):
        self.user = user
        self.client = client
        self.task_action = task
        threading.Thread.__init__(self)
        self.start()

    def run(self):
        client_feed = Feed.objects.get(user=self.client)
        user_posts = Post.objects.filter(author=self.user)

        with transaction.atomic():
            if self.task_action == "Follow":
                for post in user_posts:
                    feed = FeedObjects(object=post, id=post.key)
                    feed.save()
                    client_feed.feed_objects.add(feed)

            elif self.task_action == "onFollow":
                for feed in client_feed.feed_objects.all():
                    for post in user_posts:
                        if feed.object == post:
                            client_feed.feed_objects.remove(feed)
