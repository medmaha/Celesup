# Generated by Django 4.0.6 on 2022-07-23 11:52

from django.db import migrations, models
import django.utils.timezone
import utils.media_paths


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True)),
                ('body', models.TextField(max_length=500)),
                ('date_posted', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Feed',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('started', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=150, unique=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name_plural': 'Groups',
            },
        ),
        migrations.CreateModel(
            name='GroupChatsThread',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(blank=True, max_length=500, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to=utils.media_paths.group_chat_img_path)),
                ('file', models.FileField(blank=True, null=True, upload_to=utils.media_paths.group_chat_video_path)),
                ('date_posted', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('key', models.CharField(blank=True, max_length=40, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(blank=True, max_length=150)),
                ('slug', models.SlugField(blank=True, null=True, unique=True)),
                ('hashtags', models.CharField(blank=True, max_length=100, null=True)),
                ('caption', models.TextField(blank=True, max_length=1500, null=True)),
                ('thumbnail', models.ImageField(blank=True, default='posts/default-thumbnail.png', null=True, upload_to=utils.media_paths.post_thumbnail_path)),
                ('picture', models.ImageField(blank=True, null=True, upload_to=utils.media_paths.post_img_path)),
                ('video', models.FileField(blank=True, null=True, upload_to=utils.media_paths.post_video_path)),
                ('date_posted', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('rating', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('caption', models.CharField(blank=True, max_length=200, null=True)),
                ('picture', models.ImageField(blank=True, null=True, upload_to=utils.media_paths.status_img_path)),
                ('video', models.FileField(blank=True, null=True, upload_to=utils.media_paths.status_video_path)),
                ('date_posted', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'verbose_name_plural': 'Status',
            },
        ),
        migrations.CreateModel(
            name='UniqueIds',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('used_for', models.CharField(blank=True, max_length=100, null=True)),
                ('unique_id', models.CharField(max_length=100, unique=True)),
            ],
        ),
    ]
