from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model
from spuiz.fields import CICharField


class Question(models.Model):
    question = models.CharField(max_length=255)

    def __str__(self):
        return self.question


class Answer(models.Model):
    answer = models.CharField(max_length=255)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return self.answer


class Quiz(models.Model):
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    title = models.CICharField(max_length=255, unique=True)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    upvotes = models.ManyToManyField(get_user_model(), blank=True)
    downvotes = models.ManyToManyField(get_user_model(), blank=True)
    thumbnail = models.ImageField(upload_to='quizzes/thumbnails', blank=True)

    mcq = models.BooleanField(default=True)
    media = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Quizzes'
