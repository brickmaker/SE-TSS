from rest_framework import serializers
from .models import Plate, Reply, Notice, Plate_Plate, Plate_admin


class Plate_serializer(serializers.ModelSerializer):
    class Meta:
        model = Plate
        fields = ('id', 'title', 'description', 'create_time')


class Reply_serializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ('id', 'content', 'create_time', 'post_id', 'reply_to')


class Notice_serializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = ('id', 'uid', 'title', 'content', 'plate_id', 'create_time')


class Plate_Plate_serializer(serializers.ModelSerializer):
    class Meta:
        model = Plate_Plate
        exclude = ('valid',)


class Plate_admin_serializer(serializers.ModelSerializer):
    class Meta:
        model = Plate_admin
        exclude = ('valid', )