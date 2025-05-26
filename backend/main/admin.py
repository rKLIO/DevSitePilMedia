from django.contrib import admin

from main.models import *

# Register your models here.


class RealisationAdmin(admin.ModelAdmin):
    list_display = ('nom_projet', 'description', 'image')
    search_fields = ('nom_projet',)
    list_filter = ('nom_projet',)
    ordering = ('nom_projet',)

admin.site.register(Realisation, RealisationAdmin)

admin.site.register(DemandeProjet)