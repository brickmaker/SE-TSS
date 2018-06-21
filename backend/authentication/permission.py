from rest_framework import permissions


class RegisterCheck(permissions.BasePermission):
    def has_permission(self, request, view):
        type = request.user.user_type
        if type == 1 or type == 2:
            return False
        else:
            return True



class StudentCheck(permissions.BasePermission):
    def has_permission(self, request, view):
        url = "/api/info/student/"
        type = request.user.user_type
        path = request._request.path
        # all info
        if path == url:
            if type == 3 or type == 4:
                return True
        # some info
        else:
            if type == 1 or type == 3 or type == 4:
                return True
        return False

    def has_object_permission(self, request, view, obj):
        type = request.user.user_type
        if type == 1:
            if request.user.username == obj.username.username:
                return True
            else:
                return False
        else:
            return True


class FacultyCheck(permissions.BasePermission):
    def has_permission(self, request, view):
        url = "/api/info/faculty/"
        type = request.user.user_type
        path = request._request.path
        # all info
        if path == url:
            if type == 3 or type == 4:
                return True
        # some info
        else:
            if type == 2 or type == 3 or type == 4:
                return True
        return False

    def has_object_permission(self, request, view, obj):
        type = request.user.user_type
        if type == 2:
            if request.user.username == obj.username.username:
                return True
            else:
                return False
        else:
            return True


class StaffCheck(permissions.BasePermission):
    def has_permission(self, request, view):
        url = "/api/info/staff/"
        type = request.user.user_type
        path = request._request.path
        # all info
        if path == url:
            if type == 4:
                return True
        # some info
        else:
            if type == 3 or type == 4:
                return True
        return False

    def has_object_permission(self, request, view, obj):
        type = request.user.user_type
        if type == 3:
            if request.user.username == obj.username.username:
                return True
            else:
                return False
        else:
            return True


class AdminCheck(permissions.BasePermission):
    def has_permission(self, request, view):
        url = "/api/admin/"
        type = request.user.user_type
        path = request._request.path
        # all info
        if type == 4:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        type = request.user.user_type

        # if type == 4:
        #    if request.user.username == obj.username:
        #        return True
        #    else:
        #        return False
        #else
        return True


class CourseCheck(permissions.BasePermission):
    def has_permission(self, request, view):
        type = request.user.user_type
        if type == 2 or type == 3 or type == 4:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        return True

class LogCheck(permissions.BasePermission):
    def has_permission(self, request, view):
        type = request.user.user_type
        if type == 4:
            return True
        return False
