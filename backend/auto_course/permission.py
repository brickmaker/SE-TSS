from rest_framework import permissions

class AdminCheck(permissions.BasePermission):
    def has_permission(self, request, view):
        type = request.user.user_type
        print(request.user)
        if not type == 3:
            return False
        else:
            return True

class RequestCheck(permissions.BasePermission):
    def has_permission(self, request, view):
        type = request.user.user_type
        if type == 2 or type == 3:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        if request.user.user_type == 3:
            return True
        if obj.teacher.username.username == request.user.username:
            print("permission")
            print(obj.teacher.username.username)
            return True
        else:
            return False
