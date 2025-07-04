# Generated by Django 4.2 on 2025-06-15 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Enter a short label for this tag (max 50 characters).', max_length=50, unique=True)),
                ('slug', models.SlugField(help_text='Unique slug generated from the name.', max_length=60, unique=True)),
                ('color', models.CharField(default='#cccccc', help_text='Hex code (e.g. #FF5733)', max_length=7)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
    ]
