from django.contrib import admin

from .models import (
    Post, UniqueIds, Comment, Feed, Status, Group
)

# from users.celebrity import Celebrity, FanClub
# from users.supporter import Supporter

admin.site.register([
    # Celebrity, Supporter,
    UniqueIds,
    Comment, Status,
    Group,
])


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['author', 'caption', 'key']
    # prepopulated_fields = {'slug': ('name',)}


@admin.register(Feed)
class FeedAdmin(admin.ModelAdmin):
    list_display = ['user', '__id__', '__posts__', '__status__']
    # prepopulated_fields = {'slug': ('name',)}
