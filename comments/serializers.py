from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Comment model.
    Adds user info and ownership check for frontend rendering,
    validates that a comment can only apply to either a post or a nomination.
    """
    user = serializers.ReadOnlyField(source='user.username')
    is_user = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='user.profile.id')
    profile_image = serializers.ReadOnlyField(source='user.profile.image.url')
    post_title = serializers.SerializerMethodField()
    nomination_title = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def get_is_user(self, obj):
        request = self.context.get('request', None)
        return request and request.user == obj.user
    
    def get_post_title(self, obj):
        return obj.post.title if obj.post else None

    def get_nomination_title(self, obj):
        return obj.nomination.title if obj.nomination else None 

    def get_created_at(self, obj):
        return naturaltime(obj.created_at)

    def get_updated_at(self, obj):
        return naturaltime(obj.updated_at)

    def validate(self, data):
        post = data.get('post')
        nomination = data.get('nomination')

        if not post and not nomination:
            raise serializers.ValidationError(
                "Comment must be linked to either a post or a nomination."
            )
        if post and nomination:
            raise serializers.ValidationError(
                "Comment cannot be linked to both a post and a nomination."
            )
        return data

    class Meta:
        model = Comment
        fields = [
            'id', 'user', 'is_user','profile_id', 'profile_image',
            'post', 'post_title', 'nomination', 'nomination_title', 
            'content', 'created_at', 'updated_at',
        ]
