from rest_framework import serializers
from .models import Lenguaje

class LenguajeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Lenguaje
		fields = ( 'id', 'nombre', 'version', 'version_api', 'tipo_lenguaje')