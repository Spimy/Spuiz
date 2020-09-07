from django.db import models
from .mixins import CaseInsensitiveFieldMixin


class CICharField(CaseInsensitiveFieldMixin, models.CharField):
    pass
