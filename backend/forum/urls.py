from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('subscriptions',views.subscriptions.as_view(),name='subscriptions'),
    path('courses',views.courses.as_view(),name='courses'),
    
]