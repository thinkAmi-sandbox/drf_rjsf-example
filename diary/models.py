from django.db import models


class Diary(models.Model):
    name = models.CharField(max_length=50, blank=True, null=False)
    content = models.JSONField(blank=True, null=False)
    updated_at = models.DateTimeField(auto_now=True)
