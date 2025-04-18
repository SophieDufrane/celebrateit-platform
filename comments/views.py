from rest_framework import generics, permissions
from .models import Comment
from .serializers import CommentSerializer
from celebrateit_api.permissions import IsObjectOwnerOrReadOnly


class CommentList(generics.ListCreateAPIView):
    """
    List all comments or create a new one if authenticated.
    Comments must be attached to either a post or a nomination.
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a comment.
    Only the comment author can modify or delete it.
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsObjectOwnerOrReadOnly]
