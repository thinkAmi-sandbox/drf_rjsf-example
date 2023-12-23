from django.urls import path, include
from rest_framework import routers

from api import views

app_name = 'api'

router = routers.SimpleRouter()
router.register('diaries', viewset=views.DiaryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]