from django.shortcuts import render, redirect
from main.models import *
from django.core.mail import send_mail
from django.conf import settings
# Create your views here.

def main_page(request):
    realisation = Realisation.objects.all()
    service = ServiceImage.objects.all()
    context={
        'title': 'PIL - MEDIA',
        'description': 'This is the main page of PIL - MEDIA.',
        'content': 'Welcome to the main page! Here you can find various resources and information about our application.',
        'realisations': realisation,
        'services': service,
    }
    return render(request, 'index.html', context=context)

# def contact_page(request):

#     return render(request, 'contact.html')

from formtools.wizard.views import SessionWizardView
from .forms import InfosGeneralesForm
from .models import DemandeProjet

# Vue Wizard qui gère les différentes étapes du formulaire
class DemandeProjetWizard(SessionWizardView):
    # Définition des étapes du formulaire : ici, une seule étape nommée "infos"
    form_list = [("infos", InfosGeneralesForm)]

    # Nom du template utilisé pour afficher le formulaire (le même pour toutes les étapes)
    template_name = "contact.html"

    # Méthode appelée à CHAQUE étape pour récupérer ou créer une instance du modèle
    def get_instance(self, step):
        # Si une instance est déjà attachée à cette vue, on la réutilise
        if hasattr(self, 'instance'):
            return self.instance

        # On vérifie si une instance existe déjà via la session
        instance_id = self.request.session.get('demandeprojet_id')
        if instance_id:
            try:
                # On tente de charger l’instance existante depuis la base de données
                self.instance = DemandeProjet.objects.get(id=instance_id)
            except DemandeProjet.DoesNotExist:
                # Si l’ID est invalide (par exemple l’objet a été supprimé), on crée une nouvelle instance
                self.instance = DemandeProjet.objects.create()
                # On stocke son identifiant dans la session
                self.request.session['demandeprojet_id'] = str(self.instance.id)
        else:
            # Aucune instance n’a encore été créée → on en crée une
            self.instance = DemandeProjet.objects.create()
            # On mémorise son ID pour les prochaines étapes
            self.request.session['demandeprojet_id'] = str(self.instance.id)

        return self.instance

    # Méthode appelée après la validation de CHAQUE étape du formulaire
    def process_step(self, form):
        # On récupère l’instance à mettre à jour (déjà créée ou nouvellement créée)
        instance = self.get_instance(self.steps.current)

        # On met à jour les champs de cette instance avec les données validées du formulaire
        for field, value in form.cleaned_data.items():
            setattr(instance, field, value)

        # On enregistre en base immédiatement (sauvegarde progressive)
        instance.save()

        # On retourne les données du formulaire pour que le wizard continue à fonctionner normalement
        return self.get_form_step_data(form)

    # Méthode appelée uniquement lorsque toutes les étapes ont été complétées
    def done(self, form_list, **kwargs):
        # Supprime l'ID de la session pour forcer la création d'une nouvelle instance la prochaine fois
        if 'demandeprojet_id' in self.request.session:
            del self.request.session['demandeprojet_id']

            # Récupère l'instance enregistrée en base
        instance = self.get_instance(self.steps.current)

        # Envoie de l'e-mail
        subject = "Nouvelle demande de projet"
        message = f"""
            Nouvelle demande de projet soumise :

            Nom : {instance.nom}
            Email : {instance.email}
            Téléphone : {instance.numero}
            """
        from_email = settings.EMAIL_HOST_USER
        recipient_list = ['contact@pil-media.com']  # Adresse qui reçoit le mail

        send_mail(subject, message, from_email, recipient_list)
    
        return redirect("main_page")