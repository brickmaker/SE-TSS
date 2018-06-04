from django.db.models import Q
from rest_framework import filters
from authentication.models import Faculty, Account, Course


class QuestionFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        #course_id = request.query_params.get('course_id', None)
        #if course_id:
        #    course = Course.objects.get(course_id=course_id)
        #    queryset = queryset.filter(course=course)
        tag_list = request.query_params.getlist('tag_list', [])
        teacher_list = request.query_params.getlist('teacher_list', [])
        if len(tag_list) == 0:
            return queryset
        q = Q()
        for tag in tag_list:
            q = q | Q(tag=tag)
        queryset = queryset.filter(q)
        if len(teacher_list) == 0:
            return queryset
        q = Q()
        for teacher_id in teacher_list:
            account = Account.objects.get(username=teacher_id)
            teacher = Faculty.objects.get(username=account)
            q = q | Q(provider=teacher)
        return queryset.filter(q)