import django_filters
from .models import Cliente, Categoria, Atendente, Reclamacao

class ClienteFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(lookup_expr='icontains')
    email = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Cliente
        fields = ['id_cliente', 'nome', 'email']

class CategoriaFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(lookup_expr='icontains')
    descricao = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Categoria
        fields = ['id_categoria', 'nome', 'descricao']

class AtendenteFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(lookup_expr='icontains')
    setor = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Atendente
        fields = ['id_atendente', 'nome', 'setor']

class ReclamacaoFilter(django_filters.FilterSet):
    titulo = django_filters.CharFilter(lookup_expr='icontains')
    descricao = django_filters.CharFilter(lookup_expr='icontains')
    status = django_filters.ChoiceFilter(choices=Reclamacao.STATUS_CHOICES)
    id_cliente = django_filters.ModelChoiceFilter(queryset=Cliente.objects.all())
    id_categoria = django_filters.ModelChoiceFilter(queryset=Categoria.objects.all())
    id_atendente = django_filters.ModelChoiceFilter(queryset=Atendente.objects.all())

    class Meta:
        model = Reclamacao
        fields = ['id_reclamacao', 'titulo', 'descricao', 'status', 'id_cliente', 'id_categoria', 'id_atendente']