from rest_framework import serializers
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for the Post (Recognition Story) model.
    Includes user info, ownership check, and tag relationships.
    """
    user = serializers.ReadOnlyField(source='user.username')
    is_user = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'user', 'is_user', 'title', 'content', 'image',
            'created_at', 'updated_at',
        ]

    def get_is_user(self, obj):
        return self.context['request'].user == obj.user
