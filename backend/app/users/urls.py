from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.user_profile, name='user-profile'),
    path('settings/', views.user_settings, name='user-settings'),
]
