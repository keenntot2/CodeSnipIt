from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User

# Create your models here.
class Language(models.Model):
    language = models.CharField(max_length=64)
    slug = models.CharField(unique=True, blank=True, max_length=64)


    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.language)
        super(Language,self).save(*args, **kwargs)
    
    def __str__(self):
        return self.language

class Snippet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    language = models.ForeignKey(Language, on_delete= models.CASCADE, related_name='codesnippet')
    title = models.CharField(max_length=64)
    code = models.TextField()
    slug = models.CharField(max_length=64, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.language.slug + '-' + slugify(self.title)
        super(Snippet,self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.language}: {self.title}"