from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Nomination
from .serializers import NominationSerializer
from celebrateit_api.permissions import IsNominatorOrReadOnly


class NominationList(generics.ListCreateAPIView):
    """
    List all nominations or create a new one if authenticated.
    Each nomination includes a nominee, title, message, and a required tag.
    Adds likes and comments count annotations.
    Allows searching by nominator's name, and filtering by tag or department.
    """
    queryset = Nomination.objects.annotate(
        likes_count=Count('likes', distinct=True),
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')
    serializer_class = NominationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend,]
    filterset_fields = ['nominator__profile__department', 'tags', 'nominee']
    search_fields = [
    'nominator__first_name',
    'nominator__last_name',
    'nominee__first_name',
    'nominee__last_name',
    ]

    def perform_create(self, serializer):
        serializer.save(nominator=self.request.user)


class NominationDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a nomination.
    Only the user who created (nominated) it can modify or delete it.
    """
    queryset = Nomination.objects.all()
    serializer_class = NominationSerializer
    permission_classes = [IsNominatorOrReadOnly]
