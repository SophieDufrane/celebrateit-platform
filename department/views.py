from rest_framework import generics
from .models import Department
from .serializers import DepartmentSerializer

class DepartmentList(generics.ListAPIView):
    """
    List all departments.
    
    """
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


# class DepartmentDetail(generics.RetrieveUpdateAPIView):
#     """
#     Retrieve a department detail and update only if admin.
#     """
#     queryset = Department.objects.all()
#     serializer_class = DepartmentSerializer
#     permission_classes = [IsAdminReadOnly]

