
app_name = 'api'

from django.urls import (
    path, include, re_path
)

from django.views.generic import TemplateView

from .routes.authentication.register import (
    SignupUser,
    SignupUserVerification, SignupUserInformations
)

from .routes.authentication.login import (
    AuthenticationTokens, RefreshAuthenticationTokens
)

# url patterns
from .routes.dashboard.posts import posts_url_patterns
from .routes.user import users_url_patterns

urlpatterns = [
    # registration
    path('signup/user', SignupUser.as_view()),
    path('signup/user/verification', SignupUserVerification.as_view()),
    path('signup/user/informations', SignupUserInformations.as_view()),

    # authentication
    path('obtain/user/tokens', AuthenticationTokens.as_view()),
    path('refresh/user/tokens', RefreshAuthenticationTokens.as_view()),

    # re_path(r'', TemplateView.as_view(template_name='index.html')),
]  

# post routers
urlpatterns += posts_url_patterns
urlpatterns += users_url_patterns