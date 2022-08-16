
from django.shortcuts import redirect, render
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.views.generic import (
    View, ListView, DetailView, UpdateView
)

from utils.generators import get_user_profile
from app_features.models import (
    Feed, Post, Status
)


class Index(View):
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')

        try:
            my_feed = Feed.objects.get(user=request.user)
            posts = my_feed.posts.all().order_by('-date_posted')
            status = my_feed.status.all().order_by('-date_posted')
            posts = Post.objects.all().order_by('-date_posted')
            status = Status.objects.all()[:6]
            trends = [] # top_trending()

            paginator = Paginator(posts, 15) # Show 25 contacts per page.

            page_number = request.GET.get('page')
            page_obj = paginator.get_page(page_number)
    
            return render(request, 'website/index.html',{
                'statuses':status,
                'trends':trends,
                'posts': page_obj,
            })
        except:

            return render(request, 'website/index.html',{
                'statuses':[],
                'trends':[],
                'posts': [],
            })

class PostListView(ListView):
    paginate_by = 15
    model = Post
    context_object_name = 'posts' 
    template_name = 'website/index.html'

    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')
        return super().get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        
        myfeed = Feed.objects.get(user=self.request.user)
        status = myfeed.status.all().order_by('-date_posted')
        trends = top_trendings()

        context = super().get_context_data(**kwargs)
        context.update({'trends':trends, 'statuses':status, 'posts': context['page_obj']})
        return context


class PostDetail(DetailView):
    model = Post
    template_name = 'website/post_detail.html'
    context_object_name = 'post'

    def get_object(self, *args, **kwargs):
        post = super().get_object(*args, **kwargs)
        post.views.add(self.request.user)
        return super().get_object(*args, **kwargs)


class PostUpdate(UpdateView):
    model = Post
    template_name = 'website/post_update.html'
    fields = ['title', 'content', 'hashtags', 'picture']

    def form_valid(self, *args, **kwargs):
        print(list(self.request.FILES.values()))
        self.object.picture = self.request.FILES
        return super().form_valid(*args, **kwargs)

    def get_success_url(self):
        self.success_url = reverse('post-detail', args=str(self.object.pk))
        self.object.picture = self.request.FILES
        return super().get_success_url()


class Logout(View):
    def get(self, request):
        logout(request)
        return redirect('login')

@login_required(redirect_field_name='login')
def post_like(request, post_key):
    if request.method == 'POST':
        post = Post.objects.get(key=post_key)
        is_like = False
        if request.user in post.likes.all():
            is_like = True
    
        if is_like:
            post.likes.remove(request.user)
    
        if not is_like:
            post.likes.add(request.user)
    
    return redirect(request.META['HTTP_REFERER'])


@login_required(redirect_field_name='login')
def friend_and_unfriend(request, user_id):
    user = get_user_profile(User.objects.get(id=user_id))
    profile = user['profile']
    
    is_friend = False
    if request.user in profile.friends.all():
        is_friend = True
    
    if is_friend:
        profile.friends.remove(request.user)
        profile = get_user_profile(request.user)['profile']
        profile.friends.remove(profile.user)
        
    if not is_friend:
        profile.friends.add(request.user)
        profile = get_user_profile(request.user)['profile']
        profile.friends.add(profile.user)

    return redirect(request.META['HTTP_REFERER'])


@login_required(redirect_field_name='login')
def follow_and_unfollow(request, user_id):
    user = get_user_profile(User.objects.get(id=user_id))
    if user['type'].lower() == 'celebrity':
        profile = user['profile']
        is_following = False
        if request.user in profile.followers.all():
            is_following = True
        
        if is_following:
            profile.followers.remove(request.user)
            profile = get_user_profile(request.user)['profile']
            profile.following.remove(profile.user)
            
        if not is_following:
            profile.followers.add(request.user)
            profile = get_user_profile(request.user)['profile']
            profile.following.add(profile.user)
    
    return redirect(request.META['HTTP_REFERER'])


