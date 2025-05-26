from django import forms
from .models import DemandeProjet


# forms.py
class InfosGeneralesForm(forms.ModelForm):
    class Meta:
        model = DemandeProjet
        fields = ['nom', 'email', 'numero', 'indicatif', 'numero_sans_indicatif']

        widgets = {
            
            'email': forms.EmailInput(attrs={
                'placeholder': 'votre@email.com',
                'required': 'required',
                'pattern': '^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9._%+\\-]+\\.[a-zA-Z]{2,}$',
                'title': 'Veuillez entrer une adresse e-mail valide'
            }),
            # Ne pas gérer le pattern ici, c’est la librairie JS qui gère la validation
            'numero': forms.TextInput(attrs={
                'placeholder': 'Votre numéro de téléphone',
                'class': 'phone-input',
                'id':'id_numero',
                'type': 'tel'
            }),
            'nom': forms.TextInput(attrs={'required': 'required', 'placeholder': 'Nom de particulier ou d\'entreprise'}),
            'indicatif': forms.HiddenInput(attrs={'id':'indicatif'}),
            'numero_sans_indicatif': forms.HiddenInput(attrs={'id':'numero_sans_indicatif'}),
        }

        # fields = [
        #     'nom_projet',
        #     'description',
        #     'date_debut',
        #     'date_fin',
        #     'type',
        #     'cible_utilisateurs',
        #     'budget_estime',
        # ]
        # widgets = {
        #     'description': forms.Textarea(attrs={'rows': 4}),
        #     'date_debut': forms.DateInput(attrs={'type': 'date'}),
        #     'date_fin': forms.DateInput(attrs={'type': 'date'}),
        #     'budget_estime': forms.RadioSelect(),
        #     'cible_utilisateurs': forms.RadioSelect(),
        # }


# class FonctionnalitesForm(forms.ModelForm):
#     class Meta:
#         model = DemandeProjet
#         fields = [
#             'logo_existant',
#             'systeme_paiement',
#             'authentification_utilisateurs',
#             'cms_prefere',
#             'hebergement_prevu',
#         ]
#         widgets = {
#             'cms_prefere': forms.TextInput(attrs={'placeholder': 'WordPress, Joomla, etc.'}),
#         }


# class AspectsJuridiqueForm(forms.ModelForm):
#     class Meta:
#         model = DemandeProjet
#         fields = [
#             'donnees_sensibles',
#             'conformite_rgpd',
#             'mentions_légales',
#             'cgu',
#             'cgv',
#         ]
