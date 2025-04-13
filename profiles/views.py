from rest_framework import generics
from .models import UserProfile
from .serializers import UserProfileSerializer
from celebrateit_api.permissions import IsUserProfileOrReadOnly


class UserProfileList(generics.ListAPIView):
    """
    List all user profiles.
    
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve a profile detail and update only if you're the owner.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsUserProfileOrReadOnly]
