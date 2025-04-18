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

    class Meta:
        model = Like
        fields = ['id', 'created_at', 'user', 'post', 'nomination']
    
    def get_is_user(self, obj):
        return self.context['request'].user == obj.user

    def validate(self, data):
        post = data.get('post')
        nomination = data.get('nomination')

        if not post and not nomination:
            raise serializers.ValidationError(
                "You must like either a post or a nomination."
            )
        if post and nomination:
            raise serializers.ValidationError(
                "You can only like a post or a nomination, not both."
            )
        return data

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'You have already liked this content.'
            })
