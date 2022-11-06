from django.shortcuts import render
from channels.generic.websocket import WebsocketConsumer
import json
from django.urls import path, re_path

from asgiref.sync import async_to_sync


def index(request):

    return render(request, "chat/index.html")


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = "chats"

        # self.channel_layer.group_add(self.group_name, self.channel_name)

        async_to_sync(self.channel_layer.group_add)(self.group_name, self.channel_name)
        self.accept()

        self.send(
            text_data='{"connection": "established"}',
        )

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name, self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)

        message = text_data_json["message"]

        event = {"type": "chat_message", "message": message}
        async_to_sync(self.channel_layer.group_send)(self.group_name, event)

    def chat_message(self, event):
        message = event["message"]
        self.send(text_data=json.dumps({"type": "chat", "message": message}))


urlpatterns = [
    re_path("ws/socket-server/", ChatConsumer.as_asgi()),
]
