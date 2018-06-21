from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from online_testing import views

router = DefaultRouter()
router.register(r'question', views.QuestionViewSet)
router.register(r'paper', views.PaperViewSet)
router.register(r'analysis', views.AnalysisViewSet)
router.register(r'examination', views.ExaminationViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^course/$', views.CourseQuery.as_view())
]