from django.contrib.auth import update_session_auth_hash
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework import status
from django.db import transaction
from rest_framework.relations import ManyRelatedField

from .models import *
from rest_framework.exceptions import APIException, ParseError, NotFound
from rest_framework.decorators import api_view
from rest_framework.response import Response


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'


class ClassroomSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField('get_classroom_id')
    capacity = serializers.IntegerField(source='classroom_capacity')
    campus = serializers.CharField(source='get_campus_display')

    class Meta:
        model = ClassRoom
        fields = ('id', 'campus', 'building', 'room', 'capacity')

    def get_classroom_id(self, obj):
        return obj.classroom_id

    def get_campus_id(self, campus_name):
        if(campus_name == "紫金港"):
            campus_id = 0
        elif(campus_name == "玉泉"):
            campus_id = 1
        elif(campus_name == "西溪"):
            campus_id = 2
        elif(campus_name == "华家池"):
            campus_id = 3
        return campus_id

    def create(self, validated_data):
        campus_id = self.get_campus_id(validated_data['get_campus_display'])
        return ClassRoom.objects.create(campus=campus_id, building=validated_data['building'],
                                        room=validated_data['room'], classroom_capacity=validated_data['classroom_capacity'], )

    def update(self, instance, validated_data):
        print(validated_data)
        campus_id = self.get_campus_id(validated_data['get_campus_display'])
        instance.campus = campus_id
        instance.building = validated_data.get('building', instance.building)
        instance.room = validated_data.get('room', instance.room)
        instance.classroom_capacity = validated_data.get('classroom_capacity', instance.classroom_capacity)
        instance.save()
        return instance




class CourseSerializer(serializers.ModelSerializer):
    # courseId = serializers.CharField(source='course_id', read_only=True)
    # courseName = serializers.CharField(source='name', read_only=True)

    class Meta:
        model = Course
        fields = '__all__'


class RequestSerializer(serializers.ModelSerializer):

    teacher = serializers.CharField(source="teacher.name")
    id = serializers.SerializerMethodField('get_request_id')
    teacherId = serializers.CharField(source="teacher.username")
    class Meta:
        model = Request
        fields = ('id', 'teacherId', 'teacher', 'topic', 'content', 'status', )

    def get_request_id(self, obj):
        return obj.request_id

    def create(self, validated_data):
        print(validated_data)
        return Request.objects.create(validated_data)

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

class TimetableSerializer(serializers.ModelSerializer):
    teacher_username = serializers.CharField(source="teacher.username")
    teacher = serializers.CharField(source="teacher.name")
    course_id = serializers.CharField(source="course.course_id")
    course = serializers.CharField(source="course.name")
    room = serializers.CharField(source="location")
    room_id = serializers.CharField(source="classroom.classroom_id")
    semester = serializers.CharField(source="course.semester")
    class Meta:
        model = course_teacher_time_classroom_relation
        fields = ('id', 'teacher_username', 'teacher', 'course_id', 'course', 'room', 'room_id', 'time', "semester", )



    def update(self, instance, validated_data):
        print(validated_data)
        instance.time = validated_data.get('time', instance.time)
        rooms = ClassRoom.objects.all()
        for everyroom in rooms:
            existlocation = everyroom.get_campus_display() + everyroom.building + everyroom.room
            if validated_data['location'] == existlocation:
                newroom = everyroom
                break
        instance.classroom = newroom
        instance.save()
        return instance