from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('subscriptions',views.subscriptions.as_view(),name='subscriptions'),
    path('courses',views.courses.as_view(),name='courses'),
    path('course',views.course.as_view(),name='course'),
    path('teacher',views.teacher.as_view(),name='teacher'),
    path('post',views.thread.as_view(),name='post'),
    path('post_reply',views.reply.as_view(),name='reply'),
    path('msgentries',views.msgentries.as_view(),name='msgentries'),
    path('messages',views.messages.as_view(),name='messages'),
]