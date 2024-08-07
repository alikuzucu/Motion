from django.urls import path

from FriendRequest.views import SendFriendRequestView, UpdateGetDeleteFriendRequestView, ListAllFriendsView, \
    ListPendingFriendsView

urlpatterns = [
    path('friends/<int:user_id>/', SendFriendRequestView.as_view()),
    path('friends/requests/<int:pk>/', UpdateGetDeleteFriendRequestView.as_view()),
    path('social/friends/requests/', ListPendingFriendsView.as_view()),
    path('friends/', ListAllFriendsView.as_view()),
]
