from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from django.db import transaction
from rest_framework.relations import ManyRelatedField

from .models import *
from rest_framework.exceptions import APIException, ParseError, NotFound
import logging
logger = logging.getLogger('django')

class PeopleSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=50, required=True)
    id_number = serializers.CharField(max_length=18, required=True)
    user_type = serializers.IntegerField(max_value=4, min_value=1)
    email = serializers.EmailField(required=True)
    name = serializers.CharField(required=True)
    gender = serializers.CharField(max_length=1, required=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())

    class Meta:
        model = Account
        fields = ('username', 'id_number', 'user_type', 'email', 'name', 'gender', 'department')
        read_only_fields = ('date_created', 'date_modified')

    def get_username(user):
        return user.data['username']

    def create(self, validated_data):
        logger.info("create account")
        return Account.objects.create_user(**validated_data)

    @transaction.atomic
    def update(self, instance, validated_data):
        return instance

    def validate(self, data):
        return data


class StudentSerializer(PeopleSerializer):
    img = serializers.ImageField(max_length=None, allow_null=True, required=False)
    grade = serializers.IntegerField(required=True)
    major = serializers.PrimaryKeyRelatedField(queryset=Major.objects.all(), required=True)
    class_name = serializers.CharField(max_length=20)
    class Meta:
        model = Account
        fields = (
            'username', 'id_number', 'user_type', 'email', 'name', 'gender', 'department', 'grade', 'major',
            'class_name',
            'img')
        read_only_fields = ('date_created', 'date_modified')
    def create(self, validated_data):
        logger.info("create student")
        username = validated_data['username']
        name = validated_data['name']
        id_number = validated_data['id_number']
        user_type = validated_data['user_type']
        email = validated_data['email']
        gender = validated_data['gender']
        department=validated_data['department']
        grade=validated_data['grade']
        major=validated_data["major"]
        class_name=validated_data["class_name"]
        instance = Account.objects.create_user(id_number=id_number, user_type=user_type, username=username, email=email, gender=gender, name=name,department=department,grade=grade, major=major,class_name=class_name)
        
        instance.save()
        return instance


class FacultySerializer(PeopleSerializer):
    title = serializers.CharField(max_length=100, required=True)  # eg: lecturer,associate professor ....
    img = serializers.ImageField(max_length=None, allow_null=True, required=False)

    class Meta:
        model = Account
        fields = ('username', 'id_number', 'user_type', 'email', 'name', 'gender', 'department', 'title', 'img')
        read_only_fields = ('date_created', 'date_modified')


class StaffSerializer(PeopleSerializer):
    img = serializers.ImageField(max_length=None, allow_null=True, required=False)

    class Meta:
        model = Account
        fields = ('username', 'id_number', 'user_type', 'email', 'name', 'gender', 'department', 'img')
        read_only_fields = ('date_created', 'date_modified')


class AdminSerializer(PeopleSerializer):
    def create(self, validated_data):
        return Account.objects.create_user(**validated_data)

    class Meta:
        model = Account
        fields = ('username', 'id_number', 'user_type', 'email', 'name', 'gender','password')
        read_only_fields = ('date_created', 'date_modified')


class CourseSerializer(serializers.ModelSerializer):
    course_id = serializers.CharField(max_length=10, required=True)
    name = serializers.CharField(max_length=20, required=True)
    credit = serializers.FloatField(min_value=0.5, required=True)
    capacity = serializers.IntegerField(max_value=200)
    assessment = serializers.CharField(max_length=20)
    #faculty = serializers.MultipleChoiceField(choices=Faculty.objects.all())
    course_type=serializers.IntegerField(max_value=3, required=True)
    state=serializers.IntegerField(max_value=3, default=1)
    department=serializers.CharField(max_length=20)
    semester=serializers.IntegerField(max_value=6, default=0)

    class Meta:
        model = Course
        fields = ('course_id', 'name', 'credit', 'semester','capacity','assessment', 'faculty','course_type', 'state','department')

    def create(self, validated_data):
        logger.info("create course")
        course_id = validated_data['course_id']
        name = validated_data['name']
        try:
            depart = Department.objects.get(name=validated_data.get('department'))
        except Exception as err:
            raise ParseError(detail='department not exists')
        
        capacity = validated_data['capacity']
        semester = validated_data['semester']
        credit = validated_data['credit']
        assessment = validated_data['assessment']
        course_type=validated_data['course_type']
        state=validated_data['state']
        instance = Course.objects.create(semester=semester,department=depart,course_id=course_id, name=name,  capacity=capacity, credit=credit, assessment=assessment,course_type=course_type, state=state)
        instance.faculty.set(validated_data['faculty'])
        instance.save()
        return instance


    @transaction.atomic
    def update(self, instance, validated_data):
        logger.info("update course info")
        try:
            depart = Department.objects.get(name=validated_data.get('department'))
        except Exception as err:
            raise ParseError(detail='department not exists')
        instance.department = depart
        instance.course_id = validated_data.get('course_id', instance.course_id)
        instance.name = validated_data.get('name', instance.name)
        instance.credit = validated_data.get('credit', instance.credit)
        instance.capacity = validated_data.get('capacity', instance.capacity)
        instance.assessment = validated_data.get('assessment', instance.assessment)
        instance.course_type=validated_data.get('course_type',instance.course_type)
        instance.state=validated_data.get('state',instance.state)
        instance.department=depart
        instance.faculty.set(validated_data.get('faculty', instance.faculty))
        instance.save()
        return instance


class AccountSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)
    username = serializers.CharField(max_length=50, required=True)

    class Meta:
        model = Account
        fields = ('username', 'old_password', 'new_password')
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def update(self, instance, validated_data):
        logger.info("update account password")
        if (instance.password != validated_data.get('old_password', None)):
            raise ParseError(detail="incorrect password, try again")
        password = validated_data.get('new_password', None)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class PasswordUpdateSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        logger.info("update account password")
        validate_password(value)
        return value


class StudentQuerySerializer(PeopleSerializer):
    img = serializers.ImageField(max_length=None, allow_null=True, required=False)
    grade = serializers.IntegerField()
    major = serializers.CharField(max_length=100, required=True)
    class_name = serializers.CharField(max_length=100, required=True)

    class Meta:
        model = Student
        fields = (
        'username', 'id_number', 'email', 'name', 'gender', 'department', 'grade', 'major', 'class_name', 'img')
        read_only_fields = ('username', 'id_number', 'date_created', 'date_modified')

    @transaction.atomic
    def update(self, instance, validated_data):
        logger.info("update student info")
        # student: email, img
        # staff: email, name, gender, department, grade, major, class_name, img
        # admin: email, name, gender, department, grade, major, class_name, img
        type = self._context['request'].user.user_type
        if validated_data.get('username') != instance.username.username:
            raise ParseError(detail='username can not be changed')
        if validated_data.get('id_number') != instance.username.id_number:
            raise ParseError(detail='id_number can not be changed')
        try:
            depart = Department.objects.get(name=validated_data.get('department'))
        except Exception as err:
            raise ParseError(detail='department not exists')

        instance.email = validated_data.get('email', instance.email)
        instance.img = validated_data.get('img', instance.img)

        if type != 1:
            instance.name = validated_data.get('name', instance.name)
            instance.gender = validated_data.get('gender', instance.gender)
            instance.department = depart
            instance.grade = validated_data.get('grade', instance.grade)
            instance.major = validated_data.get('major', instance.major)
            instance.class_name = validated_data.get('class_name', instance.class_name)
            instance.save()
            return instance
        else:
            if validated_data.get('name') != instance.name or validated_data.get('gender') != instance.gender or \
                    validated_data.get('grade') != instance.grade or validated_data.get('major') != instance.major or \
                    validated_data.get('class_name') != instance.class_name or depart != instance.department:
                raise ParseError(detail='permission denied')
            instance.save()
            return instance


class FacultyQuerySerializer(PeopleSerializer):
    title = serializers.CharField(max_length=100, required=True)  # eg: lecturer,associate professor ....
    img = serializers.ImageField(max_length=None, allow_null=True, required=False)

    class Meta:
        model = Faculty
        fields = ('username', 'id_number', 'email', 'name', 'gender', 'department', 'title', 'img')
        read_only_fields = ('username', 'id_number', 'date_created', 'date_modified')

    @transaction.atomic
    def update(self, instance, validated_data):
        logger.info("update faculty info")
        # faculty: email, img
        # staff: email, name, gender, department, title, img
        # admin: email, name, gender, department, title, img
        type = self._context['request'].user.user_type
        if validated_data.get('username') != instance.username.username:
            raise ParseError(detail='username can not be changed')
        if validated_data.get('id_number') != instance.username.id_number:
            raise ParseError(detail='id_number can not be changed')
        try:
            depart = Department.objects.get(name=validated_data.get('department'))
        except Exception as err:
            raise ParseError(detail='department not exists')

        # common info
        instance.email = validated_data.get('email', instance.email)
        instance.img = validated_data.get('img', instance.img)

        if type != 2:
            instance.name = validated_data.get('name', instance.name)
            instance.gender = validated_data.get('gender', instance.gender)
            instance.department = depart
            instance.title = validated_data.get('title', instance.grade)
            instance.save()
            return instance
        else:
            if validated_data.get('name') != instance.name or validated_data.get('gender') != instance.gender or \
                    validated_data.get('title') != instance.title or depart != instance.department:
                raise ParseError(detail='permission denied')
            instance.save()
            return instance


class StaffQuerySerializer(PeopleSerializer):
    img = serializers.ImageField(max_length=None, allow_null=True, required=False)

    class Meta:
        model = Faculty
        fields = ('username', 'id_number', 'email', 'name', 'gender', 'department', 'img')
        read_only_fields = ('username', 'id_number', 'date_created', 'date_modified')

    @transaction.atomic
    def update(self, instance, validated_data):
        logger.info("update staff info")
        # =======   Guarantee unique username(ID) & email===================#
        # staff: email, img
        # admin: email, name, gender, department, img
        type = self._context['request'].user.user_type
        if validated_data.get('username') != instance.username.username:
            raise ParseError(detail='username can not be changed')
        if validated_data.get('id_number') != instance.username.id_number:
            raise ParseError(detail='id_number can not be changed')
        try:
            depart = Department.objects.get(name=validated_data.get('department'))
        except Exception as err:
            raise ParseError(detail='department not exists')

        # common info
        instance.email = validated_data.get('email', instance.email)
        instance.img = validated_data.get('img', instance.img)

        if type != 3:
            instance.name = validated_data.get('name', instance.name)
            instance.gender = validated_data.get('gender', instance.gender)
            instance.department = depart
            instance.save()
            return instance
        else:
            if validated_data.get('name') != instance.name or validated_data.get('gender') != instance.gender or \
                    depart != instance.department:
                raise ParseError(detail='permission denied')
            instance.save()
            return instance


class AdminQuerySerializer(PeopleSerializer):
    class Meta:
        model = Admin
        fields = ('username', 'id_number', 'email', 'name', 'gender', 'department')
        read_only_fields = ('username', 'id_number', 'date_created', 'date_modified')

    @transaction.atomic
    def update(self, instance, validated_data):
        logger.info("update admin info")
        # admin: email, name, gender, department
        type = self._context['request'].user.user_type
        if validated_data.get('username') != instance.username.username:
            raise ParseError(detail='username can not be changed')
        if validated_data.get('id_number') != instance.username.id_number:
            raise ParseError(detail='id_number can not be changed')
        try:
            depart = Department.objects.get(name=validated_data.get('department'))
        except Exception as err:
            raise ParseError(detail='department not exists')

        instance.email = validated_data.get('email', instance.email)
        instance.img = validated_data.get('img', instance.img)
        instance.name = validated_data.get('name', instance.name)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.department = depart
        instance.save()
        return instance


class CourseQuerySerializer(serializers.ModelSerializer):
    course_id = serializers.CharField(max_length=10, required=True)
    name = serializers.CharField(max_length=20, required=True)
    credit = serializers.FloatField(min_value=0.5, required=True)
    capacity = serializers.IntegerField(max_value=200)
    semester=serializers.IntegerField(required=True)
    assessment = serializers.CharField(max_length=20)
    state = serializers.IntegerField(required=True)
    course_type=serializers.IntegerField(required=True)
    department=serializers.CharField(max_length=20)
    class Meta:
        model = Course
        fields = ('course_id', 'name', 'credit', 'capacity','semester','department',  'assessment', 'state','course_type')

    @transaction.atomic
    def update(self, instance, validated_data):
        logger.info("update course info")
        Course.objects.filter(course_id=instance.course_id).delete()
        instance.course_id = validated_data.get('course_id', instance.course_id)
        instance.name = validated_data.get('img', instance.name)
        instance.credit = validated_data.get('credit', instance.credit)
        instance.capacity = validated_data.get('capacity', instance.capacity)
        instance.semester = validated_data.get('semester', instance.semester)
        try:
            depart = Department.objects.get(name=validated_data.get('department', instance.department))
        except Exception as err:
            raise ParseError(detail='department not exists')
        instance.department = depart
        instance.assessment = validated_data.get('assessment', instance.assessment)
        instance.course_type = validated_data.get('course_type', instance.course_type)
        type = self._context['request'].user.user_type
        if type == 3 or type == 4:
            instance.state = validated_data.get('state', instance.state)
        else:
            if instance.state != validated_data.get('state'):
                raise ParseError(detail='permission denied')
        instance.save()
        return instance


class LoginSerializer(PeopleSerializer):
    class Meta:
        model = Account
        fields = ('username', 'password')

class DepartmentQuerySerializer(serializers.ModelSerializer):
    #major=TrackSerializer(many=True, read_only=True)
    major=serializers.StringRelatedField(many=True)
    class Meta:
        model = Department
        fields = ('name','major')
        read_only_fields =('name','major')

class MajorQuerySerializer(serializers.ModelSerializer):
    #class_name=TrackSerializer(many=True, read_only=True)
    class_name=serializers.StringRelatedField(many=True)
    class Meta:
        model = Major
        fields = ('depart','major',"class_name")
        #read_only_fields =('major',"class_name")
