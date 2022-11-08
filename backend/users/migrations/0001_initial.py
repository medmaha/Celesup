# Generated by Django 4.1.3 on 2022-11-08 16:18

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.utils.timezone
import utilities.media_paths


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('id', models.CharField(blank=True, max_length=100, primary_key=True, serialize=False)),
                ('avatar', models.ImageField(default='profiles/avatar_default.png', upload_to=utilities.media_paths.avatar_path)),
                ('email', models.EmailField(blank=True, max_length=160, unique=True)),
                ('username', models.CharField(max_length=50)),
                ('first_name', models.CharField(blank=True, max_length=100, null=True)),
                ('last_name', models.CharField(blank=True, max_length=100, null=True)),
                ('gender', models.CharField(blank=True, default='Unspecified', max_length=20, null=True)),
                ('city', models.CharField(blank=True, default='Unspecified', max_length=100, null=True)),
                ('biography', models.CharField(blank=True, max_length=350, null=True)),
                ('cover_img', models.ImageField(default='profiles/cover_default.png', upload_to=utilities.media_paths.cover_img_path)),
                ('user_type', models.CharField(blank=True, default='Admin', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('followers', models.ManyToManyField(blank=True, related_name='user_followers', to=settings.AUTH_USER_MODEL)),
                ('following', models.ManyToManyField(blank=True, related_name='user_following', to=settings.AUTH_USER_MODEL)),
                ('friends', models.ManyToManyField(blank=True, related_name='user_friends', to=settings.AUTH_USER_MODEL)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
