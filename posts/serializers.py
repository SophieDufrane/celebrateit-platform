from rest_framework import serializers
from posts.models import Post
from tags.models import Tag


class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for the Post (Recognition Story) model.
    Includes user info, ownership check, and tag relationships.
    """
    user = serializers.ReadOnlyField(source='user.username')
    is_user = serializers.SerializerMethodField()
    tags = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Tag.objects.all()
    )

    class Meta:
        model = Post
        fields = [
            'id', 'user', 'is_user', 'title', 'content', 'image',
            'created_at', 'updated_at', 'tags',
        ]

    def get_is_user(self, obj):
        return self.context['request'].user == obj.user
