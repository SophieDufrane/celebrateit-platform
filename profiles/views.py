from rest_framework import generics, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import UserProfile
from .serializers import UserProfileSerializer, SimpleUserSerializer
from celebrateit_api.permissions import IsObjectOwnerOrReadOnly
from django.contrib.auth.models import User


class UserProfileList(generics.ListAPIView):
    """
    List all user profiles.
    Supports searching by name and optional alphabetical ordering.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = ['department']
    search_fields = ['user__first_name', 'user__last_name']
    ordering_fields = ['user__last_name']
    ordering = ['user__last_name']


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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'first_name', 'last_name']
