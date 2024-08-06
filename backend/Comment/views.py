from rest_framework import status
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Comment
from Comment.serializers import CommentSerializer


class GetPostComments(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CommentSerializer
    def get_queryset(self, *args, **kwargs):
        post_id = self.kwargs.get('post_id')
        return Comment.objects.filter(post_id=post_id)

    def post(self, request, *args, **kwargs):
        author_id = self.request.user.id
        post_id = self.kwargs.get('post_id')
        content = self.request.data.get('content')

        post_comment = Comment(author_id=author_id, post_id=post_id, content=content)
        post_comment.save()
        return Response(data=CommentSerializer(post_comment).data, status=status.HTTP_201_CREATED)




