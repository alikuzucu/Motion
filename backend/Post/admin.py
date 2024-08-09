from django.contrib import admin
from django.utils.html import format_html

from Post.models import Post, Image


class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'user']
    list_filter = ['user']
    search_fields = ['title']
    ordering = ['title']
    fieldsets = (
        (None, {
            'fields': ('title', 'content', 'user', 'liked_by')
        }),
    )


admin.site.register(Post, PostAdmin)


class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'image', 'post_id')  # Customize fields to display
    search_fields = ('description',)  # Optional: Add search functionality
    readonly_fields = ('image_preview',)  # Optional: Make the image preview read-only

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 100px;" />', obj.image.url)
        return 'No Image'
    image_preview.short_description = 'Image Preview'

admin.site.register(Image, ImageAdmin)