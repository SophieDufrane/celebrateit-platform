from django.db import models
from django.contrib.auth.models import User
from posts.models import Post
from nominations.models import Nomination


class Like(models.Model):
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
