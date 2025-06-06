# cms_plugins.py
from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from django.utils.translation import gettext_lazy as _
from .models import *
from django.template.loader import render_to_string

class ServicePlugin(CMSPluginBase):
    module = "Mes plugins"
    name = _("Liste des services")
    render_template = "plugins/service_plugin.html"  # Ton template d'affichage
    cache = False

    def render(self, context, instance, placeholder):
        context['services'] = ServiceImage.objects.all()
        return context

plugin_pool.register_plugin(ServicePlugin)

class RealisationPlugin(CMSPluginBase):
    module = "Mes plugins"
    name = _("Liste des realisations")
    render_template = "plugins/realisation_plugin.html"  # Ton template d'affichage
    cache = False

    def render(self, context, instance, placeholder):
        context['realisations'] = Realisation.objects.all()
        return context

plugin_pool.register_plugin(RealisationPlugin)