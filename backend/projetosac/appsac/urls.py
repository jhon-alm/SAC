from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import ClienteViewSet, CategoriaViewSet, AtendenteViewSet, ReclamacaoViewSet

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'atendentes', AtendenteViewSet)
router.register(r'reclamacoes', ReclamacaoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]