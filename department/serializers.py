from rest_framework import serializers
from .models import Department


class DepartmentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Department model.
    Includes code, name, and optional icon used to group users by department.
    """
    class Meta:
        model = Department
        fields = ['id', 'code', 'name', 'icon']
