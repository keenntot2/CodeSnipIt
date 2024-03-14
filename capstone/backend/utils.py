from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from typing import Literal

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def set_cookie_token(response, token_value : str, token_type: Literal['ACCESS' , 'REFRESH']):
    response.set_cookie(
        key=settings.SIMPLE_JWT[f'AUTH_{token_type}_COOKIE'],
        value=token_value,
        path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
        expires= settings.SIMPLE_JWT[f'{token_type}_TOKEN_LIFETIME'],
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
        domain = settings.SIMPLE_JWT['AUTH_COOKIE_DOMAIN']
    )

def delete_cookie_token(response, token_type: Literal['ACCESS' , 'REFRESH']):
    response.set_cookie(
        key=settings.SIMPLE_JWT[f'AUTH_{token_type}_COOKIE'],
        value=None,
        path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
        expires= 0,
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
        domain = settings.SIMPLE_JWT['AUTH_COOKIE_DOMAIN']
    )