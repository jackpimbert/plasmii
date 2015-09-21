# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import api.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PlasmidEntry',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='PlasmidFile',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('filename', models.CharField(max_length=255)),
                ('file', models.FileField(upload_to=api.models.upload_file_location)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='created_files')),
                ('plasmid_entry', models.ForeignKey(to='api.PlasmidEntry', related_name='plasmid_files')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
