from rest_framework import serializers
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Post
        fields = [
            'id', 'user', 'title', 'content', 'image',
            'created_at', 'updated_at',
        ]

