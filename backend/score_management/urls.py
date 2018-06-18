from django.conf.urls import url
from score_management import views

urlpatterns=[
    url(r'^test/',views.test),
    url(r'^scorelistteacher/', views.score_list_teacher),
    url(r'^scoreliststudent/', views.score_list_student),
    url(r'^insertscore/',views.insert_score),

    # 成绩分析
    url(r'^scorestatistics/', views.score_statistics),#unused
    url(r'^scoredistribution/', views.score_distribution),#unused
    url(r'^scoreteacherhistory/', views.score_teacher_history),#unused
    url(r'^studentgpaeveryyear/', views.student_gpa_every_year),#unused

    url(r'^listallscore/', views.list_all_score),
    url(r'^studentrank/', views.student_rank),
    url(r'^updatestudentrank/', views.update_student_rank),
]
