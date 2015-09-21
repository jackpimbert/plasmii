from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class MetaModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(User, related_name='%(class)s_modified_by')
    archived = models.BooleanField(default=False)

    class Meta:
        abstract = True


def upload_file_location(instance, filename):
    now = timezone.now().strftime('%Y%m%d')
    base, ext = os.path.splitext(filename)
    return '{date}/{base}{ext}'.format(date=now, base=base, ext=ext.lower())


class File(models.Model):
    filename = models.CharField(max_length=255)
    file = models.FileField(upload_to=upload_file_location)
    created_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, related_name='created_files')

    class Meta:
        abstract = True


class PlasmidFile(File):
    plasmid_entry = models.ForeignKey('PlasmidEntry', related_name='plasmid_files')


class PlasmidEntry(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

