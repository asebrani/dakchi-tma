from django.urls import path
from . import views

urlpatterns = [
    path('analyze-image/', views.analyze_image, name='analyze_image'),
]
