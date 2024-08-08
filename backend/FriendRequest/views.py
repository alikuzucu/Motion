from django.db.models import Q
from rest_framework import status
from rest_framework.generics import GenericAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from User.models import User
from User.permissions import IsOwnerOrReadOnly
from User.serializers import UserSerializer
from .models import FriendRequest
from .serializers import FriendRequestSerializer


class SendFriendRequestView(GenericAPIView):
    serializer_class = FriendRequestSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        requester = self.request.user

        try:
            friend = User.objects.get(id=kwargs['user_id'])
        except:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if FriendRequest.objects.filter(friend_id=friend.id, requester_id=requester.id).exists():
            return Response({'error': 'FriendRequest already exists'}, status=status.HTTP_400_BAD_REQUEST)

        friend_request = FriendRequest(requester=requester, friend_id=friend.id)
        friend_request.save()

        serializer = FriendRequestSerializer(friend_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UpdateGetDeleteFriendRequestView(RetrieveUpdateDestroyAPIView):
    serializer_class = FriendRequestSerializer
    queryset = FriendRequest.objects.all()
    permission_classes = (IsOwnerOrReadOnly,)

    def patch(self, request, *args, **kwargs):
        try:
            friend_request = FriendRequest.objects.get(id=kwargs['pk'])
        except:
            return Response({'error': 'FriendRequest not found'}, status=status.HTTP_404_NOT_FOUND)
        if friend_request.status != FriendRequest.PENDING:
            return Response({'error': 'FriendRequest already concluded'}, status=status.HTTP_400_BAD_REQUEST)
        if friend_request.friend_id == self.request.user.id or self.request.user.is_staff is True:
            serializer = FriendRequestSerializer(friend_request)
            new_status = self.request.data.get('status')
            if int(new_status):
                friend_request.status = FriendRequest.ACCEPTED
                friend_request.save()
            else:
                friend_request.status = FriendRequest.REJECTED
                friend_request.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not authorized'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            friend_request = FriendRequest.objects.get(id=kwargs['pk'])
        except:
            return Response({'error': 'FriendRequest not found'}, status=status.HTTP_404_NOT_FOUND)
        if friend_request.requester_id == self.request.user.id or self.request.user.is_staff is True:
            friend_request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'You are not authorized'}, status=status.HTTP_404_NOT_FOUND)


class ListAllFriendsView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        friend_requests = FriendRequest.objects.filter(
            (Q(requester_id=self.request.user.id) | Q(friend_id=self.request.user.id)) & Q(
                status=FriendRequest.ACCEPTED))
        user_ids = set()
        for friend_request in friend_requests:
            if friend_request.friend_id == self.request.user.id:
                user_ids.add(friend_request.requester_id)
            else:
                user_ids.add(friend_request.friend_id)
        return User.objects.filter(id__in=user_ids)


class ListPendingFriendsView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    def get_queryset(self):
        friend_requests = FriendRequest.objects.filter(Q(friend_id=self.request.user.id) & Q(status=FriendRequest.PENDING))
        user_ids = set()
        for friend_request in friend_requests:
            user_ids.add(friend_request.requester_id)
        return User.objects.filter(id__in=user_ids)