import random
import string

from django.contrib.auth.models import AbstractUser
from django.db import models

from project import settings


def code_generator(length=12):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))


def get_avatar_picture_path(instance, filename):
    return f'avatars/{instance.id}/{filename}'


class User(AbstractUser):
    about_me = models.CharField(
        verbose_name='User description',
        max_length=1000,
        blank=True
    )

    followees = models.ManyToManyField(
        verbose_name='followees',
        to='self', symmetrical=False,
        related_name='followers',
        blank=True,
    )

    code = models.CharField(max_length=12, default=code_generator)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    avatar = models.ImageField(blank=True, null=True, upload_to=get_avatar_picture_path)
    phone_number = models.IntegerField(blank=True, null=True)
    location = models.CharField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'username']

class Keyword(models.Model):
    user = models.ManyToManyField(
        verbose_name='user',
        to=settings.AUTH_USER_MODEL,
        related_name='things_user_likes',
    )
    keyword = models.CharField(
        verbose_name='keyword',
        max_length=20
    )

    def __str__(self):
        return f"{self.keyword}"
