# Generated by Django 4.2 on 2025-06-15 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Display name for the department (e.g. Engineering, Sales).', max_length=50, unique=True, verbose_name='Department name')),
                ('code', models.CharField(help_text='Short unique code for the department (e.g. ENG, OPS).', max_length=10, unique=True, verbose_name='Department code')),
                ('icon', models.ImageField(blank=True, help_text='Optional icon representing this department.', null=True, upload_to='images/', verbose_name='Department icon')),
            ],
            options={
                'ordering': ['name'],
            },
        ),
    ]
