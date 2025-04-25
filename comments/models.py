from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from posts.models import Post
from nominations.models import Nomination
from django.core.validators import MaxLengthValidator


class Comment(models.Model):
    """
    A comment made by a user on either a post or a nomination,
    includes message content and timestamps.
    Only one of post or nomination should be set.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
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
    content = models.TextField(
        validators=[MaxLengthValidator(1000)],
        blank=False,
        verbose_name="Your Comment",
        help_text=(
            "Share your thoughts (up to 1000 characters)."
        )
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        if self.post:
            return f'{self.user} commented on post: {self.post.id}'
        elif self.nomination:
            return f'{self.user} commented on nomination: {self.nomination.id}'
        return f"{self.user} commented"

    def clean(self):
        """
        Enforces that comment must be linked to either a post or a nomination.
        """
        if not self.post and not self.nomination:
            raise ValidationError(
                "A comment must be linked to either a post or a nomination."
            )
        if self.post and self.nomination:
            raise ValidationError(
                "A comment cannot be linked to both a post and a nomination."
            )
