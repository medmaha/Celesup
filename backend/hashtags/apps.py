from django.apps import AppConfig


class HashtagsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hashtags'


    def ready(self):
        from . import signals
        return super().ready()