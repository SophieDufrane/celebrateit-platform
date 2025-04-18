from rest_framework import generics, filters
from .models import UserProfile
from .serializers import UserProfileSerializer, SimpleUserSerializer
from celebrateit_api.permissions import IsObjectOwnerOrReadOnly
from django.contrib.auth.models import User


class UserProfileList(generics.ListAPIView):
    """
    List all user profiles with optional ordering,
    for browsing and displaying employee info.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['user__last_name', 'created_at', 'department']
    ordering = ['-created_at']


class UserProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a user profile.
    Only the profile owner can make updates.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsObjectOwnerOrReadOnly]


class UserList(generics.ListAPIView):
    """
    Searchable list of users for selecting a nominee.
    Filters by username, first name, or last name.
    """
    queryset = User.objects.all().order_by('last_name')
    serializer_class = SimpleUserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'first_name', 'last_name']
