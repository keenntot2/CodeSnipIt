from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.utils import IntegrityError

from .serializers import UserSerializer, LanguageSerializer, SnippetSerializer
from .permissions import IsAuthenticated, HasRefreshToken
from .utils import set_cookie_token, get_tokens_for_user,delete_cookie_token
from .models import Language, Snippet
from .pagination import LanguageResultsSetPagination

from rest_framework import status, generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response


from rest_framework_simplejwt.tokens import AccessToken,RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

import re
import time

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

class VerifyUsernameAPIView(APIView):

    def post(self, request):
        data = request.data
        username = data['username']  
        try: 
            User.objects.get(username=username)  
            return Response(status=status.HTTP_409_CONFLICT) 
        except User.DoesNotExist:
            return Response(status=status.HTTP_200_OK)
        
class RegisterAPIView(APIView):

    def post(self, request):
        data = request.data
        first_name = data['firstName']
        last_name = data['lastName']
        username = data['username']
        password = data['password']
        confirmation_password = data['confirmationPassword']

        PASSWORD_REGEX = r'^(?=.*\d).{6,}$' # minimum of 6 characters and at least 1 numerical character

        if re.match(PASSWORD_REGEX, password) is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if password != confirmation_password:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.create_user(first_name = first_name,
                                            last_name = last_name,
                                            username= username,
                                            password = password)
            user.save()
            return Response(status=status.HTTP_200_OK)
        except IntegrityError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            

class LanguageList(generics.ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = LanguageResultsSetPagination

class AddSnippetAPI(APIView):
    permission_classes=[IsAuthenticated]
    
    def post(self,request):
        access_token_b64 = request.COOKIES.get('access')
        access = AccessToken(access_token_b64)
        user_id = access['user_id']
        

        data = request.data

        response = Response()

        language_slug = data['language_slug']
        user = User.objects.get(pk=user_id)

        language = Language.objects.get(slug=language_slug)
        title = data['title']
        code = data['code']

        try:
            Snippet.objects.get(language=language, title=title)
            return Response(status=status.HTTP_409_CONFLICT)
        except:
            pass

        if title == '' or code == '':
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        
        snippet = Snippet.objects.create(user=user, language=language, title=title, code=code)
        serializer = SnippetSerializer(snippet)
        response.data = serializer.data
        return response

class ViewSnippetList(generics.ListAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class = SnippetSerializer

    
    def get_queryset(self):
        access_64 = self.request.COOKIES.get('access')
        access = AccessToken(access_64)
        user_id = access['user_id']

        try:
            user = User.objects.get(pk=user_id)
            queryset = Snippet.objects.filter(user=user).order_by('title')
            return queryset
        except User.DoesNotExist:
            return Snippet.objects.none()
        
class SnippetAPI(APIView):
    permission_classes=[IsAuthenticated]

    def delete(self, request, snippet_slug):

        try:
            snippet = Snippet.objects.get(slug=snippet_slug)
            snippet.delete()
            return Response(status=status.HTTP_200_OK)
        except Snippet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def patch(self,request, snippet_slug):

        data = request.data
        title = data['title']
        code = data['code']

        try:
            snippet = Snippet.objects.get(slug = snippet_slug)
            snippet.title = title
            snippet.code = code
            snippet.save()
            serializer = SnippetSerializer(snippet)
            return Response(serializer.data)
        except Snippet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
