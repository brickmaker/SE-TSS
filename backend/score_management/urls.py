from django.conf.urls import url
from score_management import views

urlpatterns=[
    url(r'^scorelist/', views.score_list),
    url(r'^scorestatistics/', views.score_statistics),
    url(r'^scoredistribution/', views.score_distribution),
    url(r'^scoreteacherhistory/', views.score_teacher_history),
]