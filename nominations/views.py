from rest_framework import generics
from .models import Nomination
from .serializers import NominationSerializer
from celebrateit_api.permissions import IsNominatorOrReadOnly


class NominationList(generics.ListCreateAPIView):
    """
    List all nominations or create a new one.
    """
    queryset = Nomination.objects.all()
    serializer_class = NominationSerializer

    def perform_create(self, serializer):
        serializer.save(nominator=self.request.user)


class NominationDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a nomination if the user is the nominator.
    """
    queryset = Nomination.objects.all()
    serializer_class = NominationSerializer
    permission_classes = [IsNominatorOrReadOnly]
