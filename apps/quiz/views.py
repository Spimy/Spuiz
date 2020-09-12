from django.urls import reverse
from django.views.generic import CreateView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Quiz
from .forms import QuizForm, QuestionFormSet, AnswerFormSet


class QuizCreateView(LoginRequiredMixin, CreateView):
    form_class = QuizForm
    template_name = 'quiz/quiz_create.html'

    def get_initial(self):
        initial_data = {'author': self.request.user}
        return initial_data

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['qs_formset'] = QuestionFormSet(prefix='qs_formset')
        context['ans_formset'] = AnswerFormSet(prefix='ans_formset_0')
        return context

    def form_valid(self, form):
        result = super().form_valid(form)

        questions_formset = QuestionFormSet(
            data=form.data,
            instance=self.object,
            prefix='qs_formset'
        )

        if questions_formset.is_valid():
            questions = questions_formset.save()

            questions_count = 0
            for question in questions:
                answers_formset = AnswerFormSet(
                    data=form.data,
                    instance=question,
                    prefix=f'ans_formset_{questions_count}',
                )
                if answers_formset.is_valid():
                    answers_formset.save()
                questions_count += 1

        return result

    def get_success_url(self):
        return reverse('quiz:detail-quiz', kwargs={'slug': self.object.slug})


class QuizDetailView(DetailView):
    model = Quiz
    template_name = 'quiz/quiz_detail.html'
