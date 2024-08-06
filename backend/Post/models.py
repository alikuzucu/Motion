from django.db import models
from django.conf import settings

from User.models import User


class Post(models.Model):
    user = models.ForeignKey(
        verbose_name='User',
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='Post',
    )

    title = models.TextField(
        verbose_name='title'
    )

    # picture = models.TextField(
    #     verbose_name='picture'
    #     default ='C:\Users\waltr\Desktop\coursework\group-2\backend\Post\image'
    # )

    content = models.TextField(
        verbose_name='content'
    )
    created = models.DateTimeField(
        verbose_name='created',
        auto_now_add=True,
    )
    updated = models.DateTimeField(
        verbose_name='updated',
        auto_now_add=True,
    )

    liked_by = models.ManyToManyField(
        verbose_name='liked_by',
        to=User,
        related_name='liked_posts',
        blank=True,
    )
    shared_by = models.ManyToManyField(
        User,
        related_name='shared_posts',
        blank=True,
        verbose_name='shared by'
    )

    def __str__(self):
        return f"{self.user}: {self.content[:50]} ..."

    def share_post(self, user):
        if not self.shared_by.filter(id=user.id).exists():
            self.shared_by.create(user)
            self.save()
        return self
