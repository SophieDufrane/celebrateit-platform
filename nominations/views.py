from rest_framework import generics, permissions
from .models import Nomination
from .serializers import NominationSerializer
from celebrateit_api.permissions import IsNominatorOrReadOnly


class NominationList(generics.ListCreateAPIView):
    """
    List all nominations or create a new one if authenticated.
    Each nomination includes a nominee, title, message, and a required tag.
    """
    queryset = Nomination.objects.all()
    serializer_class = NominationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
