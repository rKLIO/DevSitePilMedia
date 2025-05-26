from django.urls import path
from .views import *
from .forms import InfosGeneralesForm

urlpatterns = [
    path('', main_page, name='main_page'),  # Main page URL
    path("contact/", DemandeProjetWizard.as_view([("infos", InfosGeneralesForm)]), name="contact"),
]
