from django.urls import path
from Post.views import ListSearchPosts, RetrieveUpdateDestroyPost, ListPostsUser, ListLikes, ListPostsFollowees, \
    CreateLike, ListCreatePosts, ListFriendsPostsView

from Post.views import ListCreatePosts

urlpatterns = [
    path('social/Post/', ListCreatePosts.as_view(), name='post-list'),
    path('social/Post/?search=<str:search_string>', ListSearchPosts.as_view(), name='post-list-create-search'),
    path('social/Post/<int:post_id>/', RetrieveUpdateDestroyPost.as_view(), name='retrieve-update-destroy-post'),
    path('social/Post/<int:user_id>/', ListPostsUser.as_view(), name='list-Post-User'),
    path("social/Post/following/", ListPostsFollowees.as_view(), name="list-Post-followees"),
    path("social/Post/friends/", ListFriendsPostsView.as_view(), name="friends-Post"),
    path("social/Post/likes/", ListLikes.as_view(), name="list-liked-Post"),
    path("social/Post/toggle-like/<int:post_id>/", CreateLike.as_view(), name="toggle-like")

]