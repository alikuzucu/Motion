import random
import string

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


def code_generator(length=12):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))


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

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'username']
