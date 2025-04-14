from rest_framework import serializers
from posts.models import Post
from tags.models import Tag


class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    tags = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all()
    )

    class Meta:
        model = Post
        fields = [
            'id', 'user', 'title', 'content', 'image',
            'created_at', 'updated_at', 'tags',
        ]


