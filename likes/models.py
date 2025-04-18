from django.db import models
from django.contrib.auth.models import User
from posts.models import Post
from nominations.models import Nomination


class Like(models.Model):
    """
    A like made by a user on either a post or a nomination.
    Each like is tied to only one type of content, never both.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='likes',
        null=True,
        blank=True
    )
    nomination = models.ForeignKey(
        Nomination,
        on_delete=models.CASCADE,
        related_name='likes',
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [
            ('user', 'post'),
            ('user', 'nomination')
        ]

    def __str__(self):
        if self.post:
            return f'{self.user} liked post: {self.post.id}'
        elif self.nomination:
            return f'{self.user} liked nomination: {self.nomination.id}'
        return f"{self.user} liked something"
