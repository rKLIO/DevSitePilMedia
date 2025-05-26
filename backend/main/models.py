from django.db import models

# Create your models here.
class Realisation(models.Model):
    nom_projet = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.FilePathField(
    path='static/image/realisations/',
    match = r'.*\.(jpg|jpeg|png|gif|svg)$',
    recursive=True,
    allow_files=True,
    allow_folders=False,
    blank=True,
    null=True
)

    def __str__(self):
        return self.nom_projet

from phonenumber_field.modelfields import PhoneNumberField
import uuid

class DemandeProjet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nom = models.CharField(max_length=255, blank=False, null=False)
    email = models.EmailField(blank=False, null=False)
    indicatif = models.CharField(max_length=10, blank=True, null=True)
    numero_sans_indicatif = models.CharField(max_length=20, blank=True, null=True)
    numero = PhoneNumberField(blank=True, null=True, verbose_name="Numéro de téléphone")
    date_creation = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.nom or 'Sans nom'} - {self.email or 'Sans email'}"
