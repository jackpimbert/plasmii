from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import PlasmidFile, PlasmidEntry


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class PlasmidFileSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=False)
    created_by = UserSerializer(read_only=True)
    plasmid_entry = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=PlasmidEntry.objects.all())

    class Meta:
        model = PlasmidFile
        fields = ('file', 'plasmid_entry', 'created_by',)
        read_only_fields = ('id', 'filename', 'created_date',)


class PlasmidEntrySerializer(serializers.ModelSerializer):
    plasmid_files = PlasmidFileSerializer(many=True, read_only=True)

    class Meta:
        model = PlasmidEntry
        fields = ('id', 'name', 'description', 'plasmid_files')

