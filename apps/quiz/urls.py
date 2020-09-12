from django.urls import path
from .views import QuizCreateView, QuizDetailView

app_name = 'quiz'

urlpatterns = [
    path('create/', QuizCreateView.as_view(), name='create-quiz'),
    path('<slug>/', QuizDetailView.as_view(), name='detail-quiz')
]
