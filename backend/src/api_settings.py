import os
from datetime import timedelta

CORS_ALLOW_ALL_ORIGINS = True

# from api_celesup.features.paginator import CustomPaginator

FILE_SIZE_MB = 2621440 * 6 #15 MB
DATA_UPLOAD_MAX_MEMORY_SIZE = FILE_SIZE_MB

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'api_celesup.features.paginator.CelesupPaginator',

    'PAGE_SIZE': 25,

    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.IsAuthenticated',),

    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # 'rest_framework.authentication.TokenAuthentication',
    ),

    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
    ]
}


SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=31),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    
    # 'UPDATE_LAST_LOGIN': True,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': os.environ.get('DJANGO_SECRET_KEY'),

    'AUTH_HEADER_TYPES': ('Celesup', 'JWT'),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'email',
    'USER_ID_CLAIM': 'email',
}


DJOSER = {
    'USER_ID_FIELD': 'username',
    'LOGIN_FIELD': 'email',
    
    'PASSWORD_RESET_CONFIRM_URL': 'password-reset/?uid={uid}&tkn={token}',
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,

    'PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND': True,
}

