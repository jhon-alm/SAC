from rest_framework import serializers
from .models import Cliente, Categoria, Atendente, Reclamacao

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id_cliente', 'nome', 'email', 'telefone']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id_categoria', 'nome', 'descricao']

class AtendenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atendente
        fields = ['id_atendente', 'nome', 'setor']

class ReclamacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclamacao
        fields = ['id_reclamacao', 'titulo', 'descricao', 'data_abertura', 'status', 'id_cliente', 'id_categoria', 'id_atendente']