from django.db import IntegrityError
from rest_framework import serializers
from likes.models import Like


class LikeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Like
        fields = ['id', 'created_at', 'user', 'post', 'nomination']

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
