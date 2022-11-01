from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from users.models import User
from notification.serializer import Notification, NotificationSerializer

from django.shortcuts import get_object_or_404

from utilities.generators import get_profile_data


class NotificationViewed(UpdateAPIView):

    serializer_class = NotificationSerializer

    def update(self, request, *args, **kwargs):

        notification_pk = request.data.get("notification-pk")
        notification = get_object_or_404(Notification, pk=notification_pk)

        serializer = self.get_serializer(
            instance=notification, data={"is_viewed": True}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        noti_sender = User.objects.get(id=serializer.data["sender"])
        serializer.data["sender"] = get_profile_data(noti_sender)

        return Response(status=200)
