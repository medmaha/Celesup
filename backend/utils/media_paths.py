
# Posts
def post_thumbnail_path(instance, filename):
    return f'posts/{instance.author.username}/id__{instance.title[:7]}__/thumbn__{filename}'

def post_img_path(instance, filename):
    return f'posts/{instance.author.username}/{instance.title[:7]}/img__{filename}'

def post_video_path(instance, filename):
    return f'posts/{instance.author.email}/{instance.title[:7]}/video__{filename}'


# Status
def status_img_path(instance, filename):
    return f'status/{instance.author.email}/img/{filename}'

# Status
def status_video_path(instance, filename):
    return f'status/{instance.author.email}/video/{filename}'


# profile celebrity
def avater_path(instance, filename):
    return f'profiles/{instance.email}/avater/{filename}'
    

def cover_img_path(instance, filename):
    return f'profiles/{instance.email}/cover/{filename}'


# Group chat images
def group_chat_img_path(instance, filename):
    return f'groups/{instance.group_set.name}/img/{filename}'


# Group chat video
def group_chat_video_path(instance, filename):
    return f'groups/{instance.group_set.name}/video/{filename}'