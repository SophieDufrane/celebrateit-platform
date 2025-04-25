from django.db import models


class Department(models.Model):
    """
    Department model used to group users by team.
    Includes a name, short code, and optional icon.
    """
    name = models.CharField(
        max_length=50,
        unique=True,
        blank=False,
        verbose_name="Department name",
        help_text="Display name for the department (e.g. Engineering, Sales)."
    )
    code = models.CharField(
        max_length=10,
        unique=True,
        verbose_name="Department code",
        help_text="Short unique code for the department (e.g. ENG, OPS)."
    )
    icon = models.ImageField(
        upload_to='images/',
        blank=True,
        null=True,
        verbose_name="Department icon",
        help_text="Optional icon representing this department."
    )

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
