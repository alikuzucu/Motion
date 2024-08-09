from rest_framework import serializers
from .models import Post, Image
from User.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    logged_in_user_liked = serializers.SerializerMethodField()
    is_from_logged_in_user = serializers.SerializerMethodField()
    amount_of_likes = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    def get_logged_in_user_liked(self, post):
        user = self.context['request'].user
        if post in user.liked_posts.all():
            return True
        return False

    def get_is_from_logged_in_user(self, post):
        user = self.context['request'].user
        if user == post.user:
            return True
        return False

    @staticmethod
    def get_amount_of_likes(post):
        return post.liked_by.all().count()

    def get_images(self, post):
        return [image.image.url for image in post.images.all()] if post.images.exists() else []

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        post = super().create(validated_data=validated_data)
        return post


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image']
