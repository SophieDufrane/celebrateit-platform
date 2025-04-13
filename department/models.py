from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=50, blank=True)
    code = models.CharField(max_length=10, unique=True)
    icon = models.ImageField(
        upload_to='department_icons/',
        blank=True, null=True
    )

    def __str__(self):
        return self.name
