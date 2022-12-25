import os
from datetime import timedelta

CORS_ALLOW_ALL_ORIGINS = True
# CORS_ALLOW_CREDENTIALS = True
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = True

# from api_celesup.features.paginator import CustomPaginator

FILE_SIZE_MB = 2621440 * 6  # 15 MB
DATA_UPLOAD_MAX_MEMORY_SIZE = FILE_SIZE_MB

REST_FRAMEWORK = {
    "PAGE_SIZE": 10,
    "DEFAULT_PAGINATION_CLASS": "api.features.paginator.CelesupPaginator",
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        # 'rest_framework.authentication.TokenAuthentication',
    ),
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ],
}


SIMPLE_JWT = {
    # "ACCESS_TOKEN_LIFETIME": timedelta(seconds=10),
    # "REFRESH_TOKEN_LIFETIME": timedelta(seconds=30),
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": True,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": "django-insecure-!ww8*_0$j*cl2^$vmon#aoh-&hv+t8uq#u446w*r0v+$*1z3=m",
    "AUTH_HEADER_TYPES": ("Celesup", "JWT"),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "token_id",
}


DJOSER = {
    "USER_ID_FIELD": "username",
    "LOGIN_FIELD": "email",
    "PASSWORD_RESET_CONFIRM_URL": "password-reset/?uid={uid}&tkn={token}",
    "PASSWORD_RESET_CONFIRM_RETYPE": True,
    "PASSWORD_CHANGED_EMAIL_CONFIRMATION": True,
    "PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND": True,
}
