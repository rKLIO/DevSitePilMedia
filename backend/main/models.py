from django.db import models

# Create your models here.
class Realisation(models.Model):
    nom_projet = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='static/image/', blank=True, null=True)

    def __str__(self):
        return self.nom_projet
