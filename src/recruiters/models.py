from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Recruiter(models.Model):

    name        = models.CharField(max_length=500, unique=True, null=False, blank=False)
    description = models.TextField(max_length=2000, null=True, blank=True)
    is_active   = models.BooleanField(default=True)