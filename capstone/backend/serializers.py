from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Language, Snippet

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'language', 'slug']

class SnippetSerializer(serializers.ModelSerializer):
    language = serializers.CharField(source='language.slug', read_only=True)

    class Meta:
        model = Snippet
        fields = ['id', 'language', 'title', 'code', 'slug', 'created_at', 'edited_at']