from django.urls import path
from django.conf.urls import url, include
from . import views, testdb
from rest_framework import routers

router = routers.DefaultRouter()
#router.register(r'users', views.UserViewSet)
#router.register(r'groups', views.GroupViewSet)

urlpatterns = [
	url(r'^', include(router.urls)),
    # url(r'^testdb', testdb.test2),
    url(r'^courseInfo/$', views.course_info.as_view()),
    url(r'^management/$', views.management.as_view()),
    url(r'^courseStudent/$', views.course_student.as_view()),
    url(r'^course/$', views.course.as_view()),
	# url(r'^schedule/$', views.schedule),
    # url(r'^program/$', views.cul_prog),	#(?P<uid>[0-9]+)/
    url(r'^program/$', views.cul_prog.as_view()),
]