from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxLengthValidator


class Nomination(models.Model):
    """
    A formal nomination created by a user for another user.
    Includes title, message content, tags, and timestamps.
    """
    nominator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='nominations_sent'
    )
    nominee = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='nominations_received'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(
        max_length=255,
        blank=False,
        verbose_name="Title",
        help_text="Enter a short title for your recognition story."
    )
    content = models.TextField(
        validators=[MaxLengthValidator(2000)],
        blank=False,
        verbose_name="Story Content",
        help_text="Share your story (up to 2000 characters)."
    )
    tag = models.ForeignKey(
        'tags.Tag',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Nomination Tag",
        help_text="Tag assigned to categorize the nomination."
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
