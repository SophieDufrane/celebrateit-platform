from django.db import models
from django.utils.text import slugify


class Tag(models.Model):
    """
    Tag model used for categorizing recognition stories and nominations.
    Each tag has a name, a unique slug and a color.
    """
    name = models.CharField(
        max_length=50,
        unique=True,
        help_text="Enter a short label for this tag (max 50 characters)."
    )
    slug = models.SlugField(
        max_length=60,
        unique=True,
        blank=False,
        help_text="Unique slug generated from the name."
    )
    color = models.CharField(
        max_length=7,
        default='#cccccc',
        help_text='Hex code (e.g. #FF5733)'
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        # Ensure slug uniqueness
        original_slug = self.slug
        counter = 1
        while Tag.objects.filter(slug=self.slug).exists():
            self.slug = f"{original_slug}-{counter}"
            counter += 1

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
