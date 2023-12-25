from django.contrib import admin

from diary.models import Diary


class DiaryModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'content', 'updated_at')


admin.site.register(Diary, DiaryModelAdmin)
