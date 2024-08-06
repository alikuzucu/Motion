from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


class FriendRequest(models.Model):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    REJECTED = 'rejected'

    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (REJECTED, 'Rejected'),
    ]

    requester = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='requester',default=1)
    friend = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='receiver',default=1)
    status = models.CharField(choices=STATUS_CHOICES, default=PENDING, max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
