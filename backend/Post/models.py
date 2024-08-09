from django.db import models
from django.conf import settings

from User.models import User


def get_post_picture_path(instance, filename):
    return f'posts/{instance.user_id}/{filename}'


class Post(models.Model):
    user = models.ForeignKey(
        verbose_name='User',
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='posts',
    )

    title = models.TextField(
        verbose_name='title',
        blank=True,
        null=True,
    )

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

    def get_image_url(self):
        if self.images:
            return [self.images.url]
        return []

    def __str__(self):
        return f"{self.user}: {self.content[:50]} ..."

    def share_post(self, user):
        if not self.shared_by.filter(id=user.id).exists():
            self.shared_by.create(user)
            self.save()
        return self


def get_image_path(instance, filename):
    return f'posts/{instance.post.user_id}/{filename}'


class Image(models.Model):
    post = models.ForeignKey(
        'Post',
        related_name='images',
        on_delete=models.CASCADE
    )
    image = models.ImageField(
        verbose_name='image',
        upload_to=get_image_path
    )

    def __str__(self):
        return f"Image {self.id} for Post {self.post.id}"
