from django.urls import path
from .views import LoginView, LogoutAPIView, UserAPIView, RefreshTokenAPI

urlpatterns = [
    path('login', LoginView.as_view(), name='login-view'),
    path('logout', LogoutAPIView.as_view(), name='logout-view'),
    path('user', UserAPIView.as_view(), name='user'),
    path('refresh-token', RefreshTokenAPI.as_view(), name='refresh-token')
]