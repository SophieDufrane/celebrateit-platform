from django.db import models
from django.contrib.auth.models import User


class Nomination(models.Model):
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
    content = models.TextField(blank=True)
    category = models.CharField(max_length=100)
    tags = models.ManyToManyField('tags.Tag', blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
