# Generated by Django 4.1.3 on 2022-11-17 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_remove_post_activity_rate_remove_post_query_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='activity_rate',
            field=models.BigIntegerField(blank=True, default=1, null=True),
        ),
    ]
