# Generated by Django 4.1.3 on 2022-11-17 16:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='activity_rate',
        ),
        migrations.RemoveField(
            model_name='post',
            name='query_number',
        ),
    ]
