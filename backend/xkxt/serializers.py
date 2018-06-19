from django.contrib.auth.models import User, Group
from rest_framework import serializers
from xkxt.models import *
from auto_course.models import *

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
        fields = ('username', 'name')

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = ('classroom_location', 'classroom_capacity')

class CourseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('course_id', 'name', 'course_type', 'credit', 'assessment')

class CourseArrangedSerializer(serializers.ModelSerializer):
    # course_id = CourseDetailSerializer()['course_id']
    # name = CourseDetailSerializer()['name']
    # course_type = CourseDetailSerializer()['course_type']
    # credit = CourseDetailSerializer()['credit']
    # assessment = CourseDetailSerializer()['assessment']
    # capacity = ClassroomSerializer()['classroom_capacity']
    classroom = ClassroomSerializer()
    course = CourseDetailSerializer()
    teacher = FacultySerializer()

    class Meta:
        model = course_teacher_time_classroom_relation
        # fields = ('course_id', 'name', 'course_type', 'credit', 'assessment', 'classroom', 'teacher', 'time', 'capacity')
        fields = ('classroom', 'teacher', 'id', 'time', 'course')

class MajorSerializer(serializers.ModelSerializer):
    depart = DepartmentSerializer()
    class Meta:
        model = Major
        fields = ('depart', 'major')

class StudentSerializer(serializers.ModelSerializer):
    major = MajorSerializer()['major']
    class Meta:
        model = Student
        fields = ('username', 'name', 'major')

class student_cul_prog_serializer(serializers.ModelSerializer):
    course = CourseSerializer()
    student = StudentSerializer()
    class Meta:
        model = student_cul_prog
        fields = ('student', 'course', 'selected', 'term')

class major_requirement_serializer(serializers.ModelSerializer):
    class Meta:
        model = major_requirement
        fields = ('public_course_mincredit', 'major_optional_mincredit')

class major_cul_prog_serializer(serializers.ModelSerializer):
    course = CourseSerializer()
    class Meta:
        model = major_cul_prog
        fields = ('major', 'course', 'term')

class course_select_relation_serializer(serializers.ModelSerializer):
    course = CourseArrangedSerializer()
    student = StudentSerializer()
    class Meta:
        model = course_select_relation
        fields = ('course', 'pass_state', 'student')


