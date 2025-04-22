from rest_framework import serializers
from .models import Tag


class TagSerializer(serializers.ModelSerializer):
    """
    Serializer for the Tag model.
    Used for displaying tag name and slug in tag listings and filters.
    """
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug', 'color']
