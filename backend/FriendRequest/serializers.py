from rest_framework import serializers

from User.serializers import UserSerializer
from .models import FriendRequest


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['id', 'requester', 'friend', 'status', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
