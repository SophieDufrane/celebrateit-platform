from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User


class UserProfile(models.Model):
    DEPARTMENT_CHOICES = [
    ('HR', 'Human Resources'),
    ('ENG', 'Engineering'),
    ('SALES', 'Sales'),
    ('OPS', 'Operations'),
    ('MARKT', 'Marketing'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.CharField(
        max_length=50,
        choices=DEPARTMENT_CHOICES,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    presentation = models.CharField(max_length=300, blank=True)
    image = models.ImageField(
        upload_to='images/', default='https://res.cloudinary.com/dupxlk3kb/image/upload/v1/media/../default_profile_j4wwml'
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user}'s profile"


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


post_save.connect(create_user_profile, sender=User)

