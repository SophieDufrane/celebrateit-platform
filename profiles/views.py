from rest_framework import generics, filters
from .models import UserProfile
from .serializers import UserProfileSerializer
from celebrateit_api.permissions import IsObjectOwnerOrReadOnly


class UserProfileList(generics.ListAPIView):
    """
    List all user profiles with ordering support.
    
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['user__last_name', 'created_at', 'department__name']
    ordering = ['-created_at'] # Default ordering


class UserProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve a profile detail and update only if you're the owner.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsObjectOwnerOrReadOnly]
