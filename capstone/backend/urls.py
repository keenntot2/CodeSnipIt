from django.urls import path
from .views import (LoginView, 
                    LogoutAPIView, 
                    UserAPIView, 
                    VerifyUsernameAPIView,
                    RegisterAPIView,
                    LanguageList,
                    AddSnippetAPI,
                    ViewSnippetList,
                    SnippetAPI,
                    PatchAccountAPI)

urlpatterns = [
    path('login', LoginView.as_view(), name='login-view'),
    path('logout', LogoutAPIView.as_view(), name='logout-view'),
    path('user', UserAPIView.as_view(), name='user'),
    path('verify-username', VerifyUsernameAPIView.as_view(), name='verify-username'),
    path('register', RegisterAPIView.as_view(), name='register'),
    path('languages', LanguageList.as_view(), name='language-list'),
    path('add-snippet', AddSnippetAPI.as_view(), name='add-snippet'),
    path('snippet-list', ViewSnippetList.as_view(), name='snippet-list'),
    path('snippet/<slug:snippet_slug>', SnippetAPI.as_view(), name='delete-snippet'),
    path('account/patch/<str:info>', PatchAccountAPI.as_view(), name='patch-account')
]