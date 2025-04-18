from django.db.models import Count
from rest_framework import generics, permissions, filters
from celebrateit_api.permissions import IsObjectOwnerOrReadOnly
from .models import Post
from .serializers import PostSerializer


class PostList(generics.ListCreateAPIView):
    """
    List all recognition stories or create one if authenticated.
    Adds likes and comments count annotations.
    Allows searching by author (username).
    """
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Post.objects.annotate(
        likes_count=Count('likes', distinct=True),
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__username']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a recognition story if the user is the author.
    Includes annotated like/comment counts.
    """
    serializer_class = PostSerializer
    permission_classes = [IsObjectOwnerOrReadOnly]
    queryset = Post.objects.annotate(
        likes_count=Count('likes', distinct=True),
        comments_count=Count('comment', distinct=True)
    )
