# Generated by Django 4.2.8 on 2023-12-23 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Diary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50)),
                ('content', models.JSONField(blank=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]