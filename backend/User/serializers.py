from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    logged_in_user_is_following = serializers.SerializerMethodField()
    amount_of_followers = serializers.SerializerMethodField()
    amount_following = serializers.SerializerMethodField()

    def get_logged_in_user_is_following(self, user):
        request = self.context.get('request')
        if request and hasattr(request, 'User'):
            return user in request.user.follower.all()
        return False
# return User in self.context['request'].User.followers.all()

    def get_amount_of_followers(self, user):
        return User.objects.filter(followers=user).count()

    def get_amount_following(self, user):
        return user.followees.count()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'about_me', 'amount_of_followers', 'logged_in_user_is_following',
                  'amount_following', ]
        read_only_fields = ['email']


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password_repeat = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'code', 'password', 'password_repeat', 'first_name', 'last_name', 'email']

    def validate(self, attrs):
        password = attrs.get('password')
        password_repeat = attrs.get('password_repeat')

        if password != password_repeat:
            raise serializers.ValidationError({"password_repeat": "Passwords do not match."})

        return attrs

    def update(self, instance, validated_data):
        validated_data.pop('password_repeat')  # Remove password_repeat since it's not needed for User update
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class FirstUserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']
        read_only_fields = ('date_joined', 'last_login')