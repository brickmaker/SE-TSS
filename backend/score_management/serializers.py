from rest_framework import serializers
from score_management.models import Score_Relation,Application
from authentication.serializers import StudentSerializer,FacultySerializer,CourseSerializer


class ScoreRelationSerializer(serializers.ModelSerializer):
    student_name=serializers.SerializerMethodField()
    faculty_name=serializers.SerializerMethodField()
    course_name = serializers.SerializerMethodField()
    course_cid=serializers.SerializerMethodField()

    class Meta:
        model=Score_Relation
        fields=('course_cid','score','test_date','modify_state','student_name','faculty_name','course_name')

    def get_student_name(self, obj):
        return obj.course_select_info.student.name

    def get_faculty_name(self, obj):
        return obj.course_select_info.course.teacher.name

    def get_course_name(self, obj):
        return obj.course_select_info.course.course.name

    def get_course_cid(self,obj):
        return obj.course_select_info.course.course.course_id


class ApplicationSerializer(serializers.ModelSerializer):
    student_name=serializers.SerializerMethodField()
    faculty_name=serializers.SerializerMethodField()
    course_name = serializers.SerializerMethodField()
    class Meta:
        model=Application
        fields=('student','course','teacher','title','apply_des','state','score','create_time','student_name','faculty_name','course_name')

    def get_student_name(self, obj):
        return obj.student.name

    def get_faculty_name(self, obj):
        return obj.teacher.name

    def get_course_name(self, obj):
        return obj.course.name
