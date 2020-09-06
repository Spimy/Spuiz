from django.urls import path, reverse_lazy
from django.views.generic import RedirectView
from .views import RegistrationView, LoginView, LogoutView

app_name = 'accounts'

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegistrationView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout')
]
