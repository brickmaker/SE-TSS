from django.conf.urls import url
from score_management import views

urlpatterns=[
    url(r'^scorelist/', views.score_list),
]