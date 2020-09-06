from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import AbstractUser, UserManager


class EUserManager(UserManager):
    def get_by_natural_key(self, username):
        '''
        Override Django's default case-sensitive username check
        This makes the username case-insensitve so only one user
        can have a specific username regardless of its letter casing 
        '''
        case_insensitive_username_field = f'{self.model.USERNAME_FIELD}__iexact'
        return self.get(**{case_insensitive_username_field: username})


class User(AbstractUser):

    slug = models.SlugField(max_length=255, blank=True)
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to='users/avatars', blank=True)
    banner = models.ImageField(upload_to='users/banners', blank=True)
    biography = models.TextField()
    objects = EUserManager()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.username)
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.username
