from rest_framework import serializers
from nominations.models import Nomination
from tags.models import Tag


class NominationSerializer(serializers.ModelSerializer):
    nominator = serializers.ReadOnlyField(source='nominator.username')
    nominee = serializers.ReadOnlyField(source='nominee.username')
    tags = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all()
    )

    class Meta:
        model = Nomination
        fields = [
            'id', 'nominator', 'nominee', 'title', 'content', 'category',
            'created_at', 'updated_at', 'tags',
        ]

