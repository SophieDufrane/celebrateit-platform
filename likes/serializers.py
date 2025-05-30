from django.db import IntegrityError
from rest_framework import serializers
from .models import Like


class LikeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Like model.
    Adds user info and ownership check for frontend rendering,
    validates that a like can only apply to either a post or a nomination.
    """
    user = serializers.ReadOnlyField(source='user.username')
    is_user = serializers.SerializerMethodField()
    display_name = serializers.ReadOnlyField(
        source='user.profile.display_name'
    )

    def get_is_user(self, obj):
        request = self.context.get('request')
        return request and request.user == obj.user

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'You have already liked this content.'
            })

    class Meta:
        model = Like
        fields = [
            'id', 'user', 'is_user', 'display_name', 'post', 'created_at',
        ]
