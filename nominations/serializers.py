from rest_framework import serializers
from nominations.models import Nomination
from tags.models import Tag
from django.contrib.auth.models import User


class NominationSerializer(serializers.ModelSerializer):
    """
    Serializer for the Nomination model.
    Links the nomination to a nominee and a single tag.
    Includes frontend user ownership check.
    """
    is_user = serializers.SerializerMethodField()
    nominator = serializers.ReadOnlyField(source='nominator.username')
    display_name = serializers.ReadOnlyField(
        source='nominator.profile.display_name'
    )
    nominee = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )
    nominee_username = serializers.ReadOnlyField(source='nominee.username')
    nominee_display_name = serializers.ReadOnlyField(
        source='nominee.profile.display_name'
    )
    tag = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Tag.objects.all()
    )
    tag_id = serializers.ReadOnlyField(source='tag.id')
    tag_color = serializers.SerializerMethodField()
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()

    class Meta:
        model = Nomination
        fields = [
            'id', 'is_user', 'nominator', 'display_name', 'nominee',
            'nominee_username', 'nominee_display_name', 'title', 'content',
            'tag', 'tag_id', 'tag_color', 'created_at', 'updated_at',
            'likes_count', 'comments_count',
        ]

    def get_is_user(self, obj):
        request = self.context.get('request')
        return request and request.user == obj.nominator

    def get_tag_color(self, obj):
        return obj.tag.color if obj.tag else None
