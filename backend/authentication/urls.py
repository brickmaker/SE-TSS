from django.conf.urls import url, include
from .views import *

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'student', StudentViewSet, base_name="student")
router.register(r'faculty', FacultyViewSet, base_name='faculty')
router.register(r'staff', StaffViewSet, base_name='staff')
router.register(r'admin', AdminViewSet, base_name='admin')
router.register(r'course', CourseViewSet, base_name='course')
router.register(r'department', DepartmentViewSet, base_name='department')
router.register(r'major', MajorViewSet, base_name='major')

urlpatterns = [
    url(r'^get_token$', obtain_jwt_token),
    url(r'^refresh_token', refresh_jwt_token),
    url(r'^is_token_valid', verify_jwt_token),
    url(r'^register_student$', StudentRegister.as_view()),
    url(r'^register_faculty$', FacultyRegister.as_view()),
    url(r'^register_staff$', StaffRegister.as_view()),
    url(r'^register_admin$', AdminRegister.as_view()),
    url(r'^register_course$', CourseRegister.as_view()),
    url(r'^update_password$', PasswordUpdate.as_view()),
    url(r'^user$', UserViewSet.as_view()),
    url(r'^login$', Login.as_view()),
    url(r'^course_faculty$', CourseFacultyViewSet.as_view()),
    url(r'^', include(router.urls)),  # list/detail all account infomation
]
