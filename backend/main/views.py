from django.shortcuts import render

from main.models import Realisation

# Create your views here.

def main_page(request):
    realisation = Realisation.objects.all()
    context={
        'title': 'Main Page',
        'description': 'This is the main page of the application.',
        'content': 'Welcome to the main page! Here you can find various resources and information about our application.',
        'realisations': realisation
    }
    return render(request, 'index.html', context=context)