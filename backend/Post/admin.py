from django.contrib import admin
from Post.models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'User']
    list_filter = ['User']
    search_fields = ['title']
    ordering = ['title']
    fieldsets = (
        (None, {
            'fields': ('title', 'content', 'User', 'liked_by')
        }),
    )


admin.site.register(Post, PostAdmin)
