from rest_framework import permissions
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

class IsAuthenticated(permissions.BasePermission):

    def has_permission(self, request, view):
        access = request.COOKIES.get('access')
        if access is not None: 
            try: 
                AccessToken(access)
                return True
            except TokenError:
                return False
        return False


class HasRefreshToken(permissions.BasePermission):

    def has_permission(self, request, view):
        refresh = request.COOKIES.get('refresh')

        if refresh is not None: 
            try: 
                RefreshToken(refresh)
                return True
            except TokenError:
                return False
        return False