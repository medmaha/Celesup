from django.db import models
from users.models import User

class Notification(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name='sender')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name='recipient')
    hint = models.CharField(max_length=250, null=True, blank=True)
    content = models.TextField(max_length=1000, null=True, blank=True)
    is_viewed = models.BooleanField(default=False, blank=True)
    created_at = models.DateTimeField(auto_now_add=True) 
