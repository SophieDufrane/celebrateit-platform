from django.db import models
from django.contrib.auth.models import User


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
    title = models.CharField(max_length=255)
    content = models.TextField()
    tags = models.ManyToManyField('tags.Tag')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
