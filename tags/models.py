from django.db import models
from django.utils.text import slugify


class Tag(models.Model):
    """
    Tag model used for categorizing recognition stories and nominations.
    Each tag has a name and a unique slug.
    """
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=60, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
