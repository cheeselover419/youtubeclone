from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),

    path('create-user', views.create_user, name='create-user'),
    path('login', views.custom_login, name='login'),
    path('logout', views.custom_logout, name='logout'),

    path('channel/<str:username>/<int:pk>', views.channel, name='channel'),
    path('create-channel', views.create_channel, name='create-channel')
]