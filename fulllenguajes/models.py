from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Lenguaje(models.Model):
	nombre = models.CharField(max_length=10)
	version = models.CharField(max_length=10)
	version_api = models.CharField(max_length=10)
	tipo_lenguaje = models.CharField(max_length=20)