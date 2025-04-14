from django.db import models
from django.contrib.auth.models import User
from posts.models import Post
from nominations.models import Nomination


class Comment(models.Model):
    """
    A comment made by a user on either a post or a nomination
    and includes a text body and timestamps.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # Each comment is linked to either a post OR a nomination.
    # Both fields are optional, but one must be filled during usage.
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    nomination = models.ForeignKey(
        Nomination,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.content
