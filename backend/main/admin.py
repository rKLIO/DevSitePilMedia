from django.contrib import admin

from main.models import *

# Register your models here.


class RealisationAdmin(admin.ModelAdmin):
    list_display = ('nom_projet', 'description', 'image')
    search_fields = ('nom_projet',)
    list_filter = ('nom_projet',)
    ordering = ('nom_projet',)

admin.site.register(Realisation, RealisationAdmin)

class ServiceImageAdmin(admin.ModelAdmin):
    list_display = ('titre','description','image', 'alt_field', 'order')
    search_fields = ('alt_field',)
    list_filter = ('order',)
    ordering = ('order',)
    
admin.site.register(ServiceImage, ServiceImageAdmin)

admin.site.register(DemandeProjet)