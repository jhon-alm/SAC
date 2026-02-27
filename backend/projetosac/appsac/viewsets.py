from rest_framework import viewsets, permissions
from rest_framework.pagination import PageNumberPagination
from .models import Cliente, Categoria, Atendente, Reclamacao
from .serializers import ClienteSerializer, CategoriaSerializer, AtendenteSerializer, ReclamacaoSerializer
from .filters import ClienteFilter, CategoriaFilter, AtendenteFilter, ReclamacaoFilter
from django_filters.rest_framework import DjangoFilterBackend

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ClienteFilter

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_class = CategoriaFilter

class AtendenteViewSet(viewsets.ModelViewSet):
    queryset = Atendente.objects.all()
    serializer_class = AtendenteSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = AtendenteFilter

class ReclamacaoPagination(PageNumberPagination):
    page_size = 1000  # Número grande para retornar todas as reclamações
    page_size_query_param = 'page_size'
    max_page_size = 10000

class ReclamacaoViewSet(viewsets.ModelViewSet):
    queryset = Reclamacao.objects.all().order_by('-data_abertura')  # Mais recentes primeiro
    serializer_class = ReclamacaoSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ReclamacaoFilter
    pagination_class = ReclamacaoPagination


