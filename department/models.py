from django.db import models


class Department(models.Model):
    """
    Department model used to group users by team.
    Includes a name, short code, and optional icon.
    """
    name = models.CharField(max_length=50, blank=True)
    code = models.CharField(max_length=10, unique=True)
    icon = models.ImageField(
        upload_to='department_icons/',
        blank=True, null=True
    )

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
