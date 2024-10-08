from django.db.models import Q
from rest_framework import status
from rest_framework.generics import ListAPIView, GenericAPIView, ListCreateAPIView, \
    RetrieveUpdateDestroyAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from FriendRequest.models import FriendRequest
from User.models import User
from .models import Post, Image
from User.permissions import IsOwnerOrReadOnly

from .serializers import PostSerializer


class ListCreatePosts(ListCreateAPIView):
    """
    get:
    List all Posts.
    post:
    Create a new Post.
    """
    serializer_class = PostSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        search_str = self.request.query_params.get('search', None)
        if search_str:
            return Post.objects.filter(Q(content__icontains=search_str) | Q(title__icontains=search_str)).order_by("-created")
        else:
            return Post.objects.all().order_by("-created")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = serializer.save(user=self.request.user)

        # Handle multiple images
        images = request.FILES.getlist('images')  # Get list of images from the request
        for image in images:
            Image.objects.create(post=post, image=image)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class RetrieveUpdateDestroyPost(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve Post.

    patch:
    Update Post.

    delete:
    Delete Post.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_url_kwarg = 'post_id'
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]


class ListPostsUser(ListAPIView):
    """
    get:
    List all Post of a specific User.
    """
    serializer_class = PostSerializer
    lookup_url_kwarg = 'user_id'

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        return Post.objects.filter(user__id=user_id).order_by("-created")


class ListPostsFollowees(ListAPIView):
    """
    get:
    List all Posts of Users the logged-in User follows.
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        followed_user_ids = self.request.user.followees.all().values_list("id", flat=True)
        posts = Post.objects.filter(user__in=followed_user_ids)
        return posts.order_by("-created")


class ListLikes(ListAPIView):
    """
    get:
    List all Posts bookmarked by logged-in User.
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(liked_by__id=self.request.user.id).order_by("-created")


class ListFriendsPostsView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        accepted_requests = FriendRequest.objects.filter(Q(requester=user) | Q(friend=user), status="accepted")
        friends = User.objects.filter(
            (Q(receiver__in=accepted_requests) | Q(requester__in=accepted_requests)) & ~Q(
                id=user.id)).distinct()
        return Post.objects.filter(user__in=friends).order_by("-created")

    # def get(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #     serializer = self.serializer_class(queryset, many=True)
    #     return self.get_paginated_response(serializer.data)


class CreateLike(GenericAPIView):
    """
    post:
    Like Post for logged-in User.
    """
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_url_kwarg = 'post_id'

    def post(self, request, **kwargs):
        # get_object will return the object from the provided queryset that matches the post_id from the url
        post_to_save = self.get_object()
        user = self.request.user
        if post_to_save in user.liked_posts.all():
            user.liked_posts.remove(post_to_save)
            return Response(self.get_serializer(instance=post_to_save).data)
        user.liked_posts.add(post_to_save)
        return Response(self.get_serializer(instance=post_to_save).data)
