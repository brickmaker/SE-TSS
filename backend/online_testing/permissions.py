from rest_framework import permissions
from authentication.models import Faculty, Course


class QuestionPermission(permissions.BasePermission):
    # if you are teacher, you can list.
    def has_permission(self, request, view):
        t = request.user.user_type
        if t != 2:
            return False
        return True

    # if you want details of questions, you must be the teacher of this course.
    def has_object_permission(self, request, view, obj):
        faculty = Faculty.objects.all().get(username=request.user)
        cnt = faculty.teacher_course.all().filter(course_id=obj.course.course_id).count()
        if cnt <= 0:
            return False
        return True


class PaperPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        t = request.user.user_type
        if t != 2 and t != 1:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        t = request.user.user_type
        if t == 2:
            faculty = Faculty.objects().get(username=request.user)
            cnt = faculty.teacher_course.all().filter(course_id=obj.course.course_id).count()
            if cnt <= 0:
                return False
        if t == 1:  # must check if this student has taken this course
            pass
        if request.method not in permissions.SAFE_METHODS:
            if t == 1:
                return False
            if obj.teacher.username.username == request.user.username:
                return True
            return False
        return True


class ExamInfoAccessPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        t = request.user.user_type
        if request.method == 'DELETE' and t != 3:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        t = request.user.user_type
        if t == 1:
            if request.user.username == obj.student.username.username:
                return True
            else:
                return False
        else:
            return True