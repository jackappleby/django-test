from django.shortcuts import render
from .models import Recruiter

# Create your views here.


def lister(request):

    recruiters = Recruiter.objects.all()

    return render(request, 'lister.html', {'recruiters' : recruiters})



def detail(request, id=None):

    recruiter = Recruiter.objects.get(pk=id)
    
    return render(request, 'detail.html', {'recruiter' : recruiter})