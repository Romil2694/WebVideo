from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_page, name='login_page'),
    path('console/', views.console, name='console'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('analysis/', views.analysis, name='analysis'),
    path('maintenance', views.maintenance, name='maintenance'),
    path('webvideo/', views.webview, name='webvideo'),
]