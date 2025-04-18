from rest_framework import generics
from .models import Department
from .serializers import DepartmentSerializer


class DepartmentList(generics.ListAPIView):
    """
    List all departments.
    Used for filtering users or categorizing profiles by department.
    """
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
