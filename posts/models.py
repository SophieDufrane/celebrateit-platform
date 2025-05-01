from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxLengthValidator


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
    image = models.ImageField(
        upload_to='images/',
        blank=True,
        null=True,
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
