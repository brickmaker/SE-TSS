from rest_framework import serializers
from score_management.models import Take
from authentication.serializers import StudentSerializer,FacultySerializer,CourseSerializer
class TakeSerializer(serializers.ModelSerializer):
    student_name=serializers.SerializerMethodField()
    faculty_name=serializers.SerializerMethodField()
    course_name = serializers.SerializerMethodField()
    class Meta:
        model=Take
        fields=('student','course','teacher','score','test_date','student_name','faculty_name','course_name')

    def get_student_name(self, obj):
        return obj.student.name

    def get_faculty_name(self, obj):
        return obj.teacher.name

    def get_course_name(self, obj):
        return obj.course.name