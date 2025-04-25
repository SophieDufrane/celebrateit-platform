from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_alter_userprofile_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='department',
            field=models.CharField(
                max_length=50,
                blank=True,
                choices=[
                    ('HR', 'Human Resources'),
                    ('ENG', 'Engineering'),
                    ('SALES', 'Sales'),
                    ('OPS', 'Operations'),
                    ('MARKT', 'Marketing'),
                ]
            ),
        ),
    ]
