from django.contrib.auth.models import User
from rest_framework import viewsets

from api.models import PlasmidFile, PlasmidEntry
from api.serializers import (
    PlasmidFileSerializer,
    PlasmidEntrySerializer,
    UserSerializer,
)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PlasmidFileViewSet(viewsets.ModelViewSet):
    queryset = PlasmidFile.objects.all()
    serializer_class = PlasmidFileSerializer

    def perform_create(self, serializer):
        datafile = self.request.FILES.get('file')
        filename = datafile.name
        serializer.save(file=datafile, filename=filename)

class PlasmidEntryViewSet(viewsets.ModelViewSet):
    queryset = PlasmidEntry.objects.all()
    serializer_class = PlasmidEntrySerializer
