import json
import logging

from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.generics import CreateAPIView, get_object_or_404
from rest_framework.permissions import AllowAny

from User.serializers import UserSerializer, UserRegistrationSerializer, FirstUserRegistrationSerializer
from rest_framework import filters, permissions, status
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from User.serializers import UserSerializer
from .permissions import IsOwnerOrReadOnly

User = get_user_model()
logger = logging.getLogger(__name__)


class MeView(RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()

        # Extract the 'content' key from the request data
        content = request.data.get('content', None)
        avatar = request.FILES.get('avatar', None)

        if content:
            try:
                # Parse the JSON string from the 'content' key
                data = json.loads(content)
            except json.JSONDecodeError:
                return Response({'error': 'Invalid JSON in content'}, status=status.HTTP_400_BAD_REQUEST)

            if avatar:
                # Ensure that the 'avatar' field in the data dictionary is updated
                data['avatar'] = avatar

            # Pass the extracted data to the serializer
            serializer = self.get_serializer(user, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data)

        return Response({'error': 'No content provided'}, status=status.HTTP_400_BAD_REQUEST)


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email', 'first_name', 'last_name']


class UserProfileView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'


class ListOfFollowers(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def filter_queryset(self, queryset):
        return self.request.user.followers.all()


class RegistrationView(CreateAPIView):
    serializer_class = FirstUserRegistrationSerializer
    permission_classes = (AllowAny,)


#
#
# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, **kwargs):
#     send_mail(
#         'New User',
#         f'Your code is {instance.code}.',
#         'motionbackend1@gmail.com',
#         [f'{instance.email}'],
#         fail_silently=False,
#     )


class RegistrationValidationView(GenericAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)
    queryset = User.objects.all()

    def patch(self, request, *args, **kwargs):
        email = request.data.get('email')
        code = request.data.get('code')

        if not email or not code:
            return Response({'message': 'Email and code are required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=email)
        except:
            return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        if user.is_active == True:
            return Response({'message': 'You are already registered'}, status=status.HTTP_400_BAD_REQUEST)
        if user.code != code:
            return Response({'message': 'Your code is invalid'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user.is_active = True
        user.save()

        return Response({'message': 'your registration is complete'}, status=status.HTTP_200_OK)


class ListOfFollowing(ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def filter_queryset(self, queryset):
        return self.request.user.follower


class FollowUnfollowUser(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    lookup_url_kwarg = 'user_id'

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        obj = get_object_or_404(self.queryset, id=user_id)
        return obj

    def post(self, request, **kwargs):
        target_user = self.get_object()
        user = request.user
        if target_user in user.follower.all():
            user.follower.remove(target_user)
            return Response(self.get_serializer(instance=target_user).data)
        user.follower.add(target_user)
        return Response(self.get_serializer(instance=target_user).data)
