from django.apps import AppConfig


class AppFeaturesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app_features'

    def ready(self) -> None:
        from utilities import (signals, resize)
        return super().ready()
