from rest_framework import serializers
from posts.models import Post
from profiles.serializers import SimpleUserSerializer


class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for the Post (Recognition Story) model.
    Includes user info, ownership check.
    """
    user = SimpleUserSerializer(read_only=True)
    is_user = serializers.SerializerMethodField()
    display_name = serializers.ReadOnlyField(
        source='user.profile.display_name'
    )
    profile_image = serializers.SerializerMethodField()
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    like_id = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'user', 'display_name', 'is_user', "profile_image", 'title',
            'content', 'image', 'created_at', 'updated_at',
            'likes_count', 'comments_count', 'like_id',
        ]

    def get_is_user(self, obj):
        request = self.context.get('request')
        return request and request.user == obj.user

    def get_profile_image(self, obj):
        image_field = getattr(obj.user.profile, 'image', None)
        if image_field and hasattr(image_field, 'url'):
            try:
                return image_field.url
            except ValueError:
                return None
        return None

    def get_like_id(self, obj):
        request = self.context.get('request')
        user = request.user if request else None
        if user and user.is_authenticated:
            like = obj.likes.filter(user=user).first()
            return like.id if like else None
        return None
