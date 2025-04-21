from rest_framework import serializers
from nominations.models import Nomination
from tags.models import Tag
from django.contrib.auth.models import User


class NominationSerializer(serializers.ModelSerializer):
    """
    Serializer for the Nomination model.
    Links the nomination to a nominee and a single tag.
    Includes frontend user ownership check.
    """
    nominator = serializers.ReadOnlyField(source='nominator.username')
    nominee = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )
    nominee_username = serializers.ReadOnlyField(source='nominee.username')
    is_user = serializers.SerializerMethodField()
    tag = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all()
    )

    class Meta:
        model = Nomination
        fields = [
            'id', 'nominator', 'is_user', 'nominee', 'nominee_username', 
            'title', 'content', 'created_at', 'updated_at', 'tag',
        ]

    def get_is_user(self, obj):
        return self.context['request'].user == obj.nominator

