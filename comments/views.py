from rest_framework import generics
from .models import Comment
from .serializers import CommentSerializer
from celebrateit_api.permissions import IsObjectOwnerOrReadOnly


class CommentList(generics.ListCreateAPIView):
    """
    List all comments or create a new one.
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a comment if the user is the author.
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsObjectOwnerOrReadOnly]
