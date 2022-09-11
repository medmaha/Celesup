
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.parsers import MultiPartParser, FormParser

from django.http import QueryDict

from .serializers import PostCreateSerializer, PostDetailSerializer

class PostCreate(CreateAPIView):
    serializer_class = PostCreateSerializer
    # parser_classes = [MultiPartParser, FormParser]

    # def create(self, request, *args, **kwargs):
    #     data = request.data
    #     if not data.get('picture') and not data.get('caption') and not data.get('excerpt'):
    #         return Response({'message': 'cannot initialize an empty post data'}, status=400)

    #     data['author'] = request.user.pk

    #     # if not data.get('picture'):
    #     #     # if data.get('picture') == '':
    #     #         # del data['picture']
    #     #     del data['picture']

    #     serializers = self.get_serializer(data=data)
    #     print(data)
    #     print(request.headers)
    #     # print(serializers.errors)
    #     if serializers.is_valid():
    #         post = serializers.save()
    #         return Response(PostDetailSerializer(post).data, status=201)

    #     print(serializers.errors)
    #     serializers.is_valid(raise_exception=True)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        if not data.get('picture') and not data.get('caption'):
            return Response({'message': 'cannot initialize an empty post data'}, status=400)
        data['author'] = request.user.pk
        serializers = self.get_serializer(data=data)
        serializers.is_valid(raise_exception=True)
        print(data)
        post = serializers.save()
        return Response(PostDetailSerializer(post).data, status=201)