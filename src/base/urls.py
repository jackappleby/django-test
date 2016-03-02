from django.conf.urls import patterns, include, url
from django.contrib import admin



urlpatterns = [

    url(r'^', include('home.urls', namespace='home')),

    url(r'^admin/', admin.site.urls),

    url(r'^recruiters/', include('recruiters.urls', namespace='recruiters')),

]