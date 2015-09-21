from django.conf.urls import include, static, url
from django.views.generic import TemplateView

from rest_framework import routers

from api import views
from plasmii import settings


router = routers.DefaultRouter()
router.register(r'plasmid-file', views.PlasmidFileViewSet)
router.register(r'plasmid-entry', views.PlasmidEntryViewSet)
router.register(r'user', views.UserViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^$', TemplateView.as_view(template_name='plasmii/index.html')),
] + static.static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
