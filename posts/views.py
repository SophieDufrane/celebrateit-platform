from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from celebrateit_api.permissions import IsObjectOwnerOrReadOnly
from .models import Post
from .serializers import PostSerializer


class PostList(generics.ListCreateAPIView):
    """
    List all recognition stories or create one if authenticated.
    Adds likes and comments count annotations.
    Allows searching by user's first or last name and filtering by department.
    """
    queryset = Post.objects.annotate(
        likes_count=Count('likes', distinct=True),
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend,]
    filterset_fields = ['user__profile__department']
    search_fields = ['user__first_name', 'user__last_name']

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
