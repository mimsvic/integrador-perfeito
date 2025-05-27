from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, TokenBlacklistView)
from .views import (
    listar_ambientes, AmbientesDetailView, AmbientesSearchView,
    listar_sensores, SensoresDetailView, SensoresSearchView,
    listar_historico, HistoricoDetailView, HistoricoSearchView, historico_ultimas_24h,
    cadastrar_usuario, importar_planilhas
)

urlpatterns = [
    # JWT Auth
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),

    # Ambientes
    path('ambientes/', listar_ambientes, name='listar_ambientes'),                # GET, POST
    path('ambientes/<int:pk>/', AmbientesDetailView.as_view(), name='ambiente_detail'),  # GET, PUT, DELETE
    path('ambientes/search/', AmbientesSearchView.as_view(), name='ambiente_search'),

    # Sensores
    path('sensores/', listar_sensores, name='listar_sensores'),                   # GET, POST
    path('sensores/<int:pk>/', SensoresDetailView.as_view(), name='sensor_detail'),      # GET, PUT, DELETE
    path('sensores/search/', SensoresSearchView.as_view(), name='sensor_search'),

    # Histórico
    path('historico/', listar_historico, name='listar_historico'),                # GET, POST
    path('historico/<int:pk>/', HistoricoDetailView.as_view(), name='historico_detail'), # GET, PUT, DELETE
    path('historico/search/', HistoricoSearchView.as_view(), name='historico_search'),
    path('historico/ultimas-24h/', historico_ultimas_24h, name='historico_ultimas_24h'),

    # Usuários e utilidades
    path('cadastro/', cadastrar_usuario, name='cadastro'),
    path('importar/', importar_planilhas, name='importar_planilhas'),
]