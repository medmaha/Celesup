from django.apps import AppConfig


class AdminUserConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "admin_users"

    def ready(self):
        from . import signals

        fake()

        return super().ready()


def fake():
    from faker_.users import createUsers

    from faker_.posts import createPost
    from faker_.comments import createComment

    # createUsers()
    # createPost()
    # createComment(count=1000)
    pass
