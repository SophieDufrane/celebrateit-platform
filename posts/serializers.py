from rest_framework import serializers
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for the Post (Recognition Story) model.
    Includes user info, ownership check.
    """
    user = serializers.ReadOnlyField(source='user.username')
    is_user = serializers.SerializerMethodField()
    display_name = serializers.ReadOnlyField(
        source='user.profile.display_name'
    )
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()

    class Meta:
        model = Post
        fields = [
            'id', 'user', 'display_name', 'is_user', 'title', 'content',
            'image', 'created_at', 'updated_at',
            'likes_count', 'comments_count',
        ]

    def get_is_user(self, obj):
        request = self.context.get('request')
        return request and request.user == obj.user
