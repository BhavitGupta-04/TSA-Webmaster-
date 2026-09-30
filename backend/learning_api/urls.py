from django.urls import path

from . import views

app_name = 'learning_api'

urlpatterns = [
    path('health/', views.health, name='health'),
    path('challenge/', views.challenge, name='challenge'),
]
