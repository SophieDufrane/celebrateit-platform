from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserProfile model.
    Includes user infofrom related User,
    and ownership check for frontend controls.
    """
    user = serializers.ReadOnlyField(source='user.username')
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')
    is_user_profile = serializers.SerializerMethodField()
    department = serializers.StringRelatedField()
    profile_image = serializers.SerializerMethodField()

    def get_is_user_profile(self, obj):
        request = self.context['request']
        return request.user == obj.user

    def get_profile_image(self, obj):
        image_field = getattr(obj, 'image', None)
        if image_field and hasattr(image_field, 'url'):
            try:
                return image_field.url
            except ValueError:
                return None
        return None

    class Meta:
        model = UserProfile
        fields = [
            'id', 'user', 'first_name', 'last_name', 'created_at',
            'updated_at', 'presentation', 'department', 'profile_image',
            'is_user_profile',
        ]


class SimpleUserSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer for basic user info display.
    Useful for foreign key relations and user listings.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']
