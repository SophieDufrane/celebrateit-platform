from rest_framework import serializers
from nominations.models import Nomination
from tags.models import Tag
from django.contrib.auth.models import User


class NominationSerializer(serializers.ModelSerializer):
    nominator = serializers.ReadOnlyField(source='nominator.username')
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
            'id', 'nominator', 'nominee', 'title', 'content',
            'created_at', 'updated_at', 'tags',
        ]

