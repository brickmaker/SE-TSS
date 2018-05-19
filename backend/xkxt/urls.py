from django.urls import path
from django.conf.urls import url, include

from . import views

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
	url(r'^', include(router.urls)),
    path('', views.index, name='index'),
]