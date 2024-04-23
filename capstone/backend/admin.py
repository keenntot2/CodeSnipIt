from django.contrib import admin
from .models import Language, Snippet

# Register your models here.
class LanguageAdmin(admin.ModelAdmin):
    list_display=('language',
                  'slug')
    
class SnippetAdmin(admin.ModelAdmin):
    list_display=('language',
                  'title',
                  'slug',
                  'created_at',
                  'edited_at')
    
admin.site.register(Language, LanguageAdmin)
admin.site.register(Snippet, SnippetAdmin)