from .generators import get_user_profile
from django.contrib.auth.models import AnonymousUser

def profile(request):
    if isinstance(request.user, AnonymousUser):
        return []
    user = get_user_profile(request.user)['profile']
    return {'profile': user}