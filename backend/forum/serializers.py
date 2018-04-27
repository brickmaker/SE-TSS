from rest_framework import serializers
from .models import Plate, Reply, Notice


class Plate_serializer(serializers.ModelSerializer):
    class Meta:
        model = Plate
        fields = ('id', 'title', 'description', 'valid', 'create_time')


class Reply_serializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ('id', 'content', 'create_time', 'post_id', 'reply_to', 'valid')


class Notice_serializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = ('id', 'uid', 'title', 'content', 'plate_id', 'valid','create_time')

