from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework import status

from .serializers import PostCreateSerializer
from post.models import Photo, Music, Video, Post


from django.db import transaction


class PostCreate(CreateAPIView):
    serializer_class = PostCreateSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data["author"] = request.user.id

        picture = data.get("picture")
        music = data.get("music")
        video, thumbnail = data.get("video"), data.get("thumbnail")

        if picture:
            del data["picture"]
        if music:
            del data["music"]
        if video:
            del data["video"]

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)

        try:
            with transaction.atomic():

                post: Post = serializer.save()

            if picture:
                photo = Photo.objects.create(
                    author=post.author, image=picture, alt_text="photo"
                )
                post.picture = photo
                post.save()
            elif music:
                music = Music.objects.create(
                    author=post.author,
                )
                post.music = music
                post.save()
            elif video:
                video = Video.objects.create(
                    author=post.author, file=video, thumbnail=thumbnail
                )
                post.video = video
                post.save()
        except:
            raise Exception
            # return Response("", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_201_CREATED)
