from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')
    is_user_profile = serializers.SerializerMethodField()

    def get_is_user_profile(self, obj):
        request = self.context['request']
        return request.user == obj.user

    class Meta:
        model = UserProfile
        fields = [
            'id', 'user', 'first_name', 'last_name', 'created_at', 
            'updated_at', 'presentation', 'department', 'image', 
            'is_user_profile',
        ]

