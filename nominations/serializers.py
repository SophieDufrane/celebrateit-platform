from rest_framework import serializers
from nominations.models import Nomination
from tags.models import Tag
from django.contrib.auth.models import User


class NominationSerializer(serializers.ModelSerializer):
    """
    Serializer for the Nomination model.
    Requires at least one tag and links the nomination to a nominee.
    Includes frontend user ownership check.
    """
    nominator = serializers.ReadOnlyField(source='nominator.username')
    is_user = serializers.SerializerMethodField()
    nominee = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )
    tags = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all()
    )

    class Meta:
        model = Nomination
        fields = [
            'id', 'nominator', 'is_user', 'nominee', 'title', 'content',
            'created_at', 'updated_at', 'tags',
        ]

    def get_is_user(self, obj):
        return self.context['request'].user == obj.nominator

    def validate_tags(self, value):
        if not value:
            raise serializers.ValidationError(
                "Please select at least one tag."
            )
        return value
