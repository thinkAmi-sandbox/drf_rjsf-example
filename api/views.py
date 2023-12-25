from rest_framework import viewsets

from api.serializers import DiarySerializer
from diary.models import Diary


class DiaryViewSet(viewsets.ModelViewSet):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer
