from django.conf.urls import url, include
from .views import teacher
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r'classroom', ClassroomList, base_name='classroom')

urlpatterns = [
    url(r'^teacher$', teacher),
    url(r'^classroom/$', ClassroomList.as_view()),
    url(r'^classroom/(?P<pk>[0-9]+)/$', ClassroomUpdate.as_view()),
    url(r'^course/', CourseList.as_view()),
    url(r'^request/$', RequestList.as_view()),
    url(r'^request/(?P<pk>[0-9]+)/$', RequestUpdate.as_view()),
    url(r'^timetable/$', TimetableList.as_view()),
    url(r'^timetable/(?P<pk>[0-9]+)/$', TimetableUpdate.as_view()),
    url(r'^arrange/$', ArrangeList.as_view()),
]