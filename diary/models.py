from django.db import models


class Diary(models.Model):
    name = models.CharField(max_length=50, blank=True, null=False)
    content = models.JSONField(blank=True, null=False)
    version = models.CharField(max_length=50, null=False, default='2023_1224')
    updated_at = models.DateTimeField(auto_now=True)
