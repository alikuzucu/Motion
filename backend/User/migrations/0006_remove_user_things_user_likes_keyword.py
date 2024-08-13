# Generated by Django 5.0.6 on 2024-08-13 08:45

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0005_alter_user_things_user_likes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='things_user_likes',
        ),
        migrations.CreateModel(
            name='Keyword',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keyword', models.CharField(max_length=20, verbose_name='keyword')),
                ('user', models.ManyToManyField(related_name='things_user_likes', to=settings.AUTH_USER_MODEL, verbose_name='user')),
            ],
        ),
    ]