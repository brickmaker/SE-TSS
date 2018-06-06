from django.contrib.auth.models import User, Group
from rest_framework import serializers
from xkxt.models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('name', )

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('course_id', 'name', 'course_type', 'credit')

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ('id_number', 'name')

class CourseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('course_id', 'name', 'course_type', 'credit', 'capacity', 'assessment', 'faculty')

class MajorSerializer(serializers.ModelSerializer):
    depart = DepartmentSerializer()
    class Meta:
        model = Major
        fields = ('depart', 'major')

class StudentSerializer(serializers.ModelSerializer):
    major = MajorSerializer()['major']
    class Meta:
        model = Student
        fields = ('id_number', 'name', 'major')

class student_cul_prog_serializer(serializers.ModelSerializer):
    course = CourseSerializer()
    student = StudentSerializer()
    class Meta:
        model = student_cul_prog
        fields = ('student', 'course', 'selected', 'term')

class major_cul_prog_serializer(serializers.ModelSerializer):
    course = CourseSerializer()
    class Meta:
        model = major_cul_prog
        fields = ('major', 'course', 'term')

class course_select_relation_serializer(serializers.ModelSerializer):
    course = CourseDetailSerializer()
    student = StudentSerializer()
    class Meta:
        model = course_select_relation
        fields = ('course', 'pass_state', 'student')

