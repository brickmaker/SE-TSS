from django.conf.urls import url
from score_management import views

urlpatterns=[
    url(r'^scorelistteacher/', views.score_list_teacher),
    url(r'^scoreliststudent/', views.score_list_student),
    url(r'^insertscore/',views.insert_score),
    url(r'^scorestatistics/', views.score_statistics),
    url(r'^scoredistribution/', views.score_distribution),
    url(r'^scoreteacherhistory/', views.score_teacher_history),

]