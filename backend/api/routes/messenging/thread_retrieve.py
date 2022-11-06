from django.shortcuts import get_object_or_404
from django.db.models import Q

from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response

from messenging.models import Thread, Message
from users.models import User

from .serializers import ThreadSerializer, MessageSerializer
from utilities.generators import get_profile_data
from django.shortcuts import get_list_or_404


class ThreadRetrieve(RetrieveAPIView):
    def get_queryset(self):
        recipient_id = self.request.get_full_path().split("?")[1].split("=")[1]
        user = get_object_or_404(User, id=recipient_id)

        thread = Thread.objects.filter(sender=user, recipient=self.request.user)
        if not thread.exists():
            thread = Thread.objects.filter(sender=self.request.user, recipient=user)
            if not thread.exists():
                thread = Thread.objects.create(
                    sender=self.request.user,
                    recipient=user,
                    author=self.request.user,
                )
                return thread

            return thread[0]
        return thread[0]

    def retrieve(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        serializer = ThreadSerializer(queryset)

        s_data = get_profile_data(User.objects.get(id=serializer.data["sender"]))
        r_data = get_profile_data(User.objects.get(id=serializer.data["recipient"]))

        data = serializer.data

        data["sender"] = {
            "avatar": s_data["avatar"],
            "full_name": s_data["full_name"],
            "username": s_data["username"],
            "id": s_data["id"],
        }
        data["recipient"] = {
            "avatar": r_data["avatar"],
            "full_name": r_data["full_name"],
            "username": r_data["username"],
            "id": r_data["id"],
        }
        return Response(data)
