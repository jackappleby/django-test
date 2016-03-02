from django.conf.urls import patterns, include, url
from . import views



urlpatterns = [

    url(r'^$', views.lister, name='root'),

    url(r'^recruiter/(?P<id>\w+)/$', views.detail, name='detail'),

]