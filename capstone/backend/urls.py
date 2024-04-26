from django.urls import path
from .views import (LoginView, 
                    LogoutAPIView, 
                    UserAPIView, 
                    RefreshTokenAPI, 
                    VerifyUsernameAPIView,
                    RegisterAPIView,
                    LanguageList,
                    AddSnippetAPI,
                    ViewSnippetList)

urlpatterns = [
    path('login', LoginView.as_view(), name='login-view'),
    path('logout', LogoutAPIView.as_view(), name='logout-view'),
    path('user', UserAPIView.as_view(), name='user'),
    path('refresh-token', RefreshTokenAPI.as_view(), name='refresh-token'),
    path('verify-username', VerifyUsernameAPIView.as_view(), name='verify-username'),
    path('register', RegisterAPIView.as_view(), name='register'),
    path('languages', LanguageList.as_view(), name='language-list'),
    path('add-snippet', AddSnippetAPI.as_view(), name='add-snippet'),
    path('snippet-list', ViewSnippetList.as_view(), name='snippet-list')
]