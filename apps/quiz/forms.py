from django import forms
from django.contrib.auth import get_user_model
from .models import Quiz, Question, Answer


class QuizForm(forms.ModelForm):

    author = forms.ModelChoiceField(
        queryset=get_user_model().objects.all(),
        widget=forms.HiddenInput
    )

    mcq = forms.BooleanField(
        label='Multiple Choice',
        required=False,
        initial=True
    )

    class Meta:
        model = Quiz
        exclude = ['slug', 'upvotes', 'downvotes']


class QuestionForm(forms.ModelForm):

    class Meta:
        model = Question
        exclude = ['']


class AnswerForm(forms.ModelForm):

    answer = forms.CharField(label='')

    class Meta:
        model = Answer
        exclude = ['question']


QuestionFormSet = forms.inlineformset_factory(
    parent_model=Quiz,
    model=Question,
    form=QuestionForm,
    extra=1,
    can_delete=False
)

AnswerFormSet = forms.inlineformset_factory(
    parent_model=Question,
    model=Answer,
    form=AnswerForm,
    extra=1,
    can_delete=False
)
