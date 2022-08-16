from django import forms

from app_features.models import Post

class LoginForm(forms.Form):
    email = forms.CharField(widget=forms.EmailInput())
    password = forms.CharField(widget=forms.PasswordInput())
    submit = forms.CharField(widget=forms.TextInput(attrs={'type':'submit','value':'Sign In'}))


class SignUpForm(forms.Form):
    email = forms.CharField(widget=forms.EmailInput())
    username = forms.CharField(widget=forms.TextInput())
    password = forms.CharField(widget=forms.PasswordInput())
    confirm_password = forms.CharField(widget=forms.PasswordInput())
    submit = forms.CharField(widget=forms.TextInput(attrs={'type':'submit','value':'Sign Up Free'}))
    

class ViewPostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'hashtags', 'thumbnail', 'video']


class ImagePostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'hashtags', 'thumbnail', 'picture']
