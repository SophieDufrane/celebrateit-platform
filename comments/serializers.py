from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Comment model
    Adds user info and ownership check for frontend rendering
    """
    user = serializers.ReadOnlyField(source='user.username')
    is_user = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='user.profile.id')
    profile_image = serializers.ReadOnlyField(source='user.profile.image.url')

    def get_is_user(self, obj):
        request = self.context['request']
        return request.user == obj.user 
    
    class Meta:
        model = Comment
        fields = [
            'id', 'user', 'is_user', 'profile_id', 'profile_image',
            'post', 'nomination', 'created_at', 'updated_at', 'content'
        ]
