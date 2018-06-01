from rest_framework import permissions


class ModifyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        t = request.user.user_type
        if request.method not in permissions.SAFE_METHODS and t != 2:
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