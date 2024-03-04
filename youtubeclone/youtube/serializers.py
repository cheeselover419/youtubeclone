from rest_framework import serializers
from .models import Channel, Video, Comment


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