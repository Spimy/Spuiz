from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


class RegistrationForm(UserCreationForm):

    username = forms.CharField(
        required=True,
        label='Username',
        widget=forms.TextInput(
            attrs={'placeholder': '\uf007'}
        )
    )

    email = forms.EmailField(
        required=True,
        label='Email',
        widget=forms.EmailInput(
            attrs={'placeholder': '\uf0e0'}
        )
    )

    password1 = forms.CharField(
        required=True,
        label='Password',
        widget=forms.PasswordInput(
            attrs={'placeholder': '\uf023'}
        )
    )

    password2 = forms.CharField(
        required=True,
        label='Password confirmation',
        widget=forms.PasswordInput(
            attrs={'placeholder': '\uf023'}
        )
    )

    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)
        self.label_suffix = ''

        for field_name in ['username', 'email', 'password1', 'password2']:
            self.fields[field_name].help_text = None

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password1', 'password2']


class LoginForm(AuthenticationForm):

    error_messages = {
        'invalid_login': ('The username or password you have entered is invalid.'),
        'inactive': ('This account is inactive.'),
    }

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.label_suffix = ''

    username = forms.CharField(
        label='Email or Username',
        widget=forms.widgets.TextInput(
            attrs={'placeholder': "\uf007"}
        )
    )

    password = forms.CharField(
        label='Password',
        widget=forms.widgets.PasswordInput(
            attrs={'placeholder': "\uf023"}
        )
    )
