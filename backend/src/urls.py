
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

# import debug_toolbar

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('', include('api.urls', namespace='api')),

    # path('', include('website.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)