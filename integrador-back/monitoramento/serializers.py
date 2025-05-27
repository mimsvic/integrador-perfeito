from rest_framework import serializers
from .models import Ambientes, Sensores, Historico

class AmbientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambientes
        fields = '__all__'

class SensoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensores
        fields = '__all__'

class HistoricoSerializer(serializers.ModelSerializer):
    ambiente = AmbientesSerializer(read_only=True)
    sensor = SensoresSerializer(read_only=True)

    ambiente_id = serializers.PrimaryKeyRelatedField(
        queryset=Ambientes.objects.all(), source='ambiente', write_only=True
    )
    sensor_id = serializers.PrimaryKeyRelatedField(
        queryset=Sensores.objects.all(), source='sensor', write_only=True
    )

    class Meta:
        model = Historico
        fields = '__all__'