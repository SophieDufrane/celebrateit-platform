from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User


class UserProfile(models.Model):
    """
    User profile model linked to the built-in User model.
    Includes department info, profile picture, presentation, and timestamps.

    The `display_name` property returns the user's full name (first + last),
    or falls back to their username if no name is provided.
    """
    DEPARTMENT_CHOICES = [
        ('HR', 'Human Resources'),
        ('ENG', 'Engineering'),
        ('SALES', 'Sales'),
        ('OPS', 'Operations'),
        ('MARKT', 'Marketing'),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    department = models.CharField(
        max_length=50,
        choices=DEPARTMENT_CHOICES,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    presentation = models.CharField(max_length=300, blank=True)
    image = models.ImageField(
        upload_to='images/', default='../default_profile_vjekwr'
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user}'s profile"

    @property
    def display_name(self):
        first = self.user.first_name
        last = self.user.last_name
        if first or last:
            return f"{first} {last}".strip()
        return self.user.username


def create_user_profile(sender, instance, created, **kwargs):
    """
    Creates a UserProfile whenever a new User instance is created.
    """
    if created:
        UserProfile.objects.create(user=instance)


post_save.connect(create_user_profile, sender=User)
