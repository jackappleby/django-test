from django.db import models
from django.core.urlresolvers import reverse



# Create your models here.

class Recruiter(models.Model):

    name        = models.CharField(max_length=500, unique=True, null=False, blank=False)
    description = models.TextField(max_length=2000, null=True, blank=True)
    is_active   = models.BooleanField(default=True)
    created     = models.DateTimeField(auto_now_add=True)
    updated     = models.DateTimeField(auto_now=True)


    def get_absolute_url(self):
        return reverse('recruiters:detail', args=[str(self.id)])
