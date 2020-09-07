from django.conf import settings
from django.urls.base import reverse_lazy


class SuccessUrlMixin(object):
    ''' Allows to redirect a view to its correct success url. '''

    success_url = reverse_lazy(settings.SUCCESS_LOGIN_URL)

    def get_success_url(self):
        if 'next' in self.request.GET:
            return self.request.GET.get('next')
        return self.success_url
