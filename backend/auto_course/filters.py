import django_filters
from .models import *
from .serializers import  *

class ClassroomFilter(django_filters.rest_framework.FilterSet):

    id = django_filters.CharFilter(name="classroom_id")
    campus = django_filters.CharFilter(name="campus")
    building = django_filters.CharFilter(name="building")
    room = django_filters.CharFilter(name="room")


    class Meta:
        model = ClassRoom
        fields = ['campus', 'building', 'room']

class CourseFilter(django_filters.rest_framework.FilterSet):

    id = django_filters.CharFilter(name="course_id")

    class Meta:
        model = Course
        fields = ['id']

class TimetableFilter(django_filters.rest_framework.FilterSet):

    teachername = django_filters.CharFilter(name="teacher__name")

    class Meta:
        model = course_teacher_time_classroom_relation
        fields = ['teachername']

class RequestFilter(django_filters.rest_framework.FilterSet):

    status = django_filters.NumberFilter(name="status")

    class Meta:
        model = Request
        fields = ['status']