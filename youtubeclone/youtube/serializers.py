from rest_framework import serializers
from .models import Channel, Video, Comment
from django.contrib.auth.models import User


class ChannelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Channel
        fields = ('user', 'name', 'subscribers', 'profile_picture')

class VideoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = ('user', 'channel', 'video_file',
         'upload_time', 'title', 'description',
         'thumbnail', 'view', 'likes', 'dislikes'
        )


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('user', 'created_at', 'video', 'text')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}