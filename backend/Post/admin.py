from django.contrib import admin
from Post.models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'user']
    list_filter = ['user']
    search_fields = ['title']
    ordering = ['title']
    fieldsets = (
        (None, {
            'fields': ('title', 'content', 'user', 'liked_by')
        }),
    )


admin.site.register(Post, PostAdmin)
