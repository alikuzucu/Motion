from django.contrib import admin
from .models import FriendRequest


class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ['User', 'user_friends', 'state']
    search_fields = ['user__username', 'user_friends__username']
    list_filter = ['state']


admin.site.register(FriendRequest)