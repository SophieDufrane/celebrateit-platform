from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Comment model.
    Adds user info and ownership check for frontend rendering,
    validates that a comment can only apply to either a post or a nomination.
    """
    user = serializers.ReadOnlyField(source='user.username')
    is_user = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='user.profile.id')
    profile_image = serializers.ReadOnlyField(source='user.profile.image.url')

    class Meta:
        model = Comment
        fields = [
            'id', 'user', 'is_user', 'profile_id', 'profile_image',
            'post', 'nomination', 'created_at', 'updated_at', 'content'
        ]

    def get_is_user(self, obj):
        return self.context['request'].user == obj.user

    def validate(self, data):
        post = data.get('post')
        nomination = data.get('nomination')

        if not post and not nomination:
            raise serializers.ValidationError(
                "Comment must be linked to either a post or a nomination."
            )
        if post and nomination:
            raise serializers.ValidationError(
                "Comment cannot be linked to both a post and a nomination."
            )
        return data
