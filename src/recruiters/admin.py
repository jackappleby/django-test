from django.contrib import admin
from .models import Recruiter



class RecruitersAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'is_active')

admin.site.register(Recruiter, RecruitersAdmin)

