from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User

# Create your models here.
class Language(models.Model):
    language = models.CharField(max_length=64)
    slug = models.TextField(unique=True, blank=True)


    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.language)
        super(Language,self).save(*args, **kwargs)