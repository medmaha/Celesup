
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from .serializers import PostCreateSerializer, PostDetailSerializer

class PostCreate(CreateAPIView):
    serializer_class = PostCreateSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        print(data)
        if not data.get('picture') and not data.get('caption'):
            return Response({'message': 'cannot initialize an empty post data'}, status=400)
        data['author'] = request.user.pk
        serializers = self.get_serializer(data=data)
        serializers.is_valid(raise_exception=True)
        post = serializers.save()
        return Response(PostDetailSerializer(post).data, status=201)

