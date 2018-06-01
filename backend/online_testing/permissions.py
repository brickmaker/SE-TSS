from rest_framework import permissions
from authentication.models import Faculty, Course


class QuestionPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        t = request.user.user_type
        if t != 2:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        if request.method not in permissions.SAFE_METHODS:
            faculty = Faculty.objects().get(username=request.user)
            cnt = Course.objects().filter(faculty=faculty, course_id=obj.course).count()
            if cnt <= 0:
                return False
            return True
        return True


class PaperPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        t = request.user.user_type
        if t != 2 and t != 1:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        t = request.user.user_type
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