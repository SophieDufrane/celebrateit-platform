from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers


class CurrentUserSerializer(UserDetailsSerializer):
    profile_id = serializers.ReadOnlyField(source='profile.id')
    profile_image = serializers.SerializerMethodField()

    def get_profile_image(self, obj):
        image_field = getattr(obj.profile, 'image', None)
        if image_field and hasattr(image_field, 'url'):
            try:
                return image_field.url
            except ValueError:
                return None
        return None

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            'profile_id', 'profile_image',
        )
