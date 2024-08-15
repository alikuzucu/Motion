from django.urls import path
from Post.views import RetrieveUpdateDestroyPost, ListPostsUser, ListLikes, ListPostsFollowees, \
    CreateLike, ListFriendsPostsView

from Post.views import ListCreatePosts

urlpatterns = [
    path('social/Post/', ListCreatePosts.as_view(), name='post-list'),
    path('social/Post/<int:post_id>/', RetrieveUpdateDestroyPost.as_view(), name='retrieve-update-destroy-post'),
    path('social/Post/<int:user_id>/', ListPostsUser.as_view(), name='list-Post-User'),
    path("social/Post/Follow/", ListPostsFollowees.as_view(), name="list-Post-followees"),
    path("social/Post/Friends/", ListFriendsPostsView.as_view(), name="friends-Post"),
    path("social/Post/Liked/", ListLikes.as_view(), name="list-liked-Post"),
    path("social/Post/toggle-like/<int:post_id>/", CreateLike.as_view(), name="toggle-like")

]