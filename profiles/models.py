from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    description = models.CharField(max_length=200)
    role = models.CharField(max_length=20)
    image = models.ImageField(
        upload_to='images/', default='../default_profile_j4wwml'
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user}'s profile"


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


post_save.connect(create_user_profile, sender=User)

