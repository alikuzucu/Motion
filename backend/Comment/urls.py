from django.urls import path

from Comment.views import GetPostComments

urlpatterns = [
    path('social/comments/<int:post_id>/', GetPostComments.as_view()),
]