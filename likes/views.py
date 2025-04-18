from rest_framework import generics, permissions
from .models import Like
from likes.serializers import LikeSerializer
from celebrateit_api.permissions import IsObjectOwnerOrReadOnly

from .serializers import LikeSerializer


class LikeList(generics.ListCreateAPIView):
    """
    List likes or create one if logged in.
    Optional filters: ?post=<id> or ?nomination=<id>
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = LikeSerializer
    
    def get_queryset(self):
        queryset = Like.objects.all()
        post_id = self.request.query_params.get('post')
        nomination_id = self.request.query_params.get('nomination')
        
        if post_id:
            queryset = queryset.filter(post__id=post_id)
        if nomination_id:
            queryset = queryset.filter(nomination__id=nomination_id)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LikeDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve or delete a like.
    Only the user who created the like can delete it.
    """
    permission_classes = [IsObjectOwnerOrReadOnly]
    serializer_class = LikeSerializer
    queryset = Like.objects.all()
