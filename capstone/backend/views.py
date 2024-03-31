from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .serializers import UserSerializer
from .permissions import IsAuthenticated, HasRefreshToken
from .utils import set_cookie_token, get_tokens_for_user,delete_cookie_token

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


from rest_framework_simplejwt.tokens import AccessToken,RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

# Create your views here.

class UserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        access_token_b64 = request.COOKIES.get('access') 
        try:
            response = Response()
            access = AccessToken(access_token_b64)
            user_id = access['user_id']
            user = User.objects.get(pk=user_id)
            serializer = UserSerializer(user)
            response.data = serializer.data
            return response
        except TokenError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
class LoginView(APIView):
    def post(self, request):
        data = request.data

        username = data['username']
        password= data['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            response = Response()
            token = get_tokens_for_user(user)
            set_cookie_token(response, token['access'], 'ACCESS')
            set_cookie_token(response, token['refresh'], 'REFRESH')
            return response
        return Response(status=status.HTTP_401_UNAUTHORIZED)

class LogoutAPIView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self, request):
        response = Response()
        refresh = request.COOKIES.get('refresh')
        token = RefreshToken(refresh)
        token.blacklist()
        delete_cookie_token(response, 'ACCESS')
        delete_cookie_token(response, 'REFRESH')
        return response

class RefreshTokenAPI(APIView):
    permission_classes = [HasRefreshToken]

    def get(self, request):
        refresh = request.COOKIES.get('refresh')

        try:
            response = Response()
            new_access_token = str(RefreshToken(refresh).access_token)
            set_cookie_token(response, new_access_token, 'ACCESS')
            return response
        except TokenError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class VerifyUsernameAPIVIew(APIView):

    def post(self, request):
        data = request.data
        username = data['username']  
        try: 
            User.objects.get(username=username)  
            return Response(status=status.HTTP_409_CONFLICT) 
        except User.DoesNotExist:
            return Response(status=status.HTTP_200_OK)

        
    
