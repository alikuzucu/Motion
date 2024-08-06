
from rest_framework_simplejwt import views as jwt_views
from User.views import RegistrationView, RegistrationValidationView
from django.urls import path
from .views import UserListView, ListOfFollowers, ListOfFollowing, FollowUnfollowUser, UserProfileView, MeView


urlpatterns = [
    path('auth/registration/', RegistrationView.as_view()),
    path('auth/registration/validation/', RegistrationValidationView.as_view()),
    path('auth/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh'),
    path('users/', UserListView.as_view(), name='user_list'),
    path('users/<int:user_id>/', UserProfileView.as_view(), name='User-profile'),
    path('social/followers/', ListOfFollowers.as_view(), name='list-followers'),
    path('social/following/', ListOfFollowing.as_view(), name='list-following'),
    path('social/toggle-follow/<int:user_id>/', FollowUnfollowUser.as_view(), name='follow-unfollow-User'),
    path('users/me/', MeView.as_view()),
]