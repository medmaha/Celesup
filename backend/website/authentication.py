from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import (
    authenticate,
    login, logout
)
from website.forms import (
    LoginForm, SignUpForm
)

def sign_out(request):
    logout(request)
    messages.success(request, "You're logged out")
    return redirect('login')


def sign_in(request):

    if request.user.is_authenticated:
        return redirect('index')

    form = LoginForm()
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            user = authenticate(email=email, password=password)
            if user != None:
                login(request, user)
                return redirect('index')
            else:
                messages.error(request, 'User does not exist')

    return render(request, 'website/authentication.html',{
        'form':form,
        'login':True
    })


def register(request):
    """
    this method lets user choose there sign up type and sets the value onto the request session
    """
    if request.user.is_authenticated:
        return redirect('index')

    type = request.POST.get('signup_as')

    if request.method == 'POST' and type.lower() in ['supporter', 'celebrity']:
        request.session['user_type'] = type.lower()
        return redirect('signup')

    return render(request, 'website/authentication.html', {
        'register': True
    })


def sign_up(request):
    """ A method for creating users into the database """
    user_type = request.session.get('user_type')
    if not user_type:
        return redirect('register')

    if request.user.is_authenticated:
        return redirect('index')
        
    form = SignUpForm()
    if request.method == 'POST' and user_type:
        form = SignUpForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')

            user = User(email=email, password=password, username=username,)
            user.user_type = user_type
            user.set_password(password)
            user.save()
            messages.success(request, f'You are successfully registered as "{str(username).capitalize()}"')
            request.session.pop('user_type')
            print('saved')
            return redirect('login')


        messages.error(request, 'Bad request "Form not valid" ')
    return render(request, 'website/authentication.html',{
        'form':form,
        'signup':True,
        'user_type': user_type
    })




