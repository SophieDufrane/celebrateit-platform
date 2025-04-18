from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    """
    A recognition story (post) created by a user, which includes a title,
    optional content, image, and associated tags.
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(
        upload_to='images/',
        default='../default_post_rxcscg',
        blank=True
    )
    tags = models.ManyToManyField('tags.Tag', blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
