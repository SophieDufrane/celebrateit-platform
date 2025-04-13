from rest_framework import generics
from .models import Post
from .serializers import PostSerializer
from celebrateit_api.permissions import IsUserProfileOrReadOnly


class PostList(generics.ListCreateAPIView):
    """
    List all posts or create a new one.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a post if the user is the owner of the post.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsUserProfileOrReadOnly]
