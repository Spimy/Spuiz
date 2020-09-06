from django.views.generic import CreateView, FormView, RedirectView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls.base import reverse_lazy
from django.contrib import messages
from django.contrib.auth import login, logout
from .mixins import SuccessUrlMixin
from .forms import RegistrationForm, LoginForm


class RegistrationView(CreateView):
    template_name = 'accounts/register.html'
    form_class = RegistrationForm
    success_url = reverse_lazy('home:homepage')

    def form_valid(self, form: RegistrationForm):
        valid = super(RegistrationView, self).form_valid(form)
        login(self.request, self.object)
        return valid

    def form_invalid(self, form: RegistrationForm):
        errors = form.errors.get_json_data()

        for msg in errors:
            messages.error(self.request, errors[msg][0]['message'])

        return super(RegistrationView, self).form_invalid(form)


class LoginView(SuccessUrlMixin, FormView):

    form_class = LoginForm
    template_name = 'accounts/login.html'

    def form_valid(self, form: LoginForm):
        login(self.request, form.get_user())
        return super(LoginView, self).form_valid(form)

    def form_invalid(self, form: LoginForm):
        errors = form.errors.get_json_data()

        for msg in errors:
            messages.error(self.request, errors[msg][0]['message'])

        return super(LoginView, self).form_invalid(form)


class LogoutView(LoginRequiredMixin, RedirectView):

    url = reverse_lazy('home:homepage')
    redirect_field_name = None

    def get(self, request, *args, **kwargs):
        logout(request)
        return super(LogoutView, self).get(request, *args, **kwargs)
