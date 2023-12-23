from rest_framework import serializers

from diary.models import Diary


class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ['id', 'name', 'content', 'updated_at']
