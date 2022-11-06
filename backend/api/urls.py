app_name = "api"

from django.urls import path

from .routes.authentication.register import (
    SignupUser,
    SignupUserVerification,
    SignupUserInformations,
)

from .routes.authentication.login import (
    AuthenticationTokens,
    RefreshAuthenticationTokens,
    UpdateAuthenticationTokens,
)

from .routes.dashboard.posts import posts_url_patterns
from .routes.user import users_url_patterns
from .routes.query import query_url_patterns
from .routes.notification.urls import notifications_url_patterns
from .routes.comment.urls import comment_url_patterns
from .routes.messenging.urls import messenging_url_patterns

urlpatterns = [
    # registration
    path("signup/user", SignupUser.as_view()),
    path("signup/user/verification", SignupUserVerification.as_view()),
    path("signup/user/informations", SignupUserInformations.as_view()),
    # authentication
    path("obtain/user/tokens", AuthenticationTokens.as_view()),
    path("refresh/user/tokens", RefreshAuthenticationTokens.as_view()),
    path("update/user/tokens", UpdateAuthenticationTokens.as_view()),
    # re_path(r'', TemplateView.as_view(template_name='index.html')),
]

# api routes urls
urlpatterns += posts_url_patterns
urlpatterns += comment_url_patterns
urlpatterns += users_url_patterns
urlpatterns += query_url_patterns
urlpatterns += notifications_url_patterns
urlpatterns += messenging_url_patterns
