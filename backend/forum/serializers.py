from rest_framework import serializers
from .models import Section, Reply, Notice


class Plate_serializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('id', 'title', 'description', 'create_time')


class Reply_serializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ('id', 'content', 'create_time', 'post_id', 'reply_to')


class Notice_serializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = ('id', 'uid', 'title', 'content', 'section_id', 'create_time')
