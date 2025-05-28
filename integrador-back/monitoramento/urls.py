from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, TokenBlacklistView)
from .views import (
    listar_ambientes, AmbientesDetailView, AmbientesSearchView,
    listar_sensores, SensoresDetailView, SensoresSearchView,
    listar_historico, HistoricoDetailView, HistoricoSearchView, historico_ultimas_24h,
    cadastrar_usuario, importar_planilhas
)

urlpatterns = [

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('ambientes/', listar_ambientes, name='listar_ambientes'),   
    path('ambientes/<int:pk>/', AmbientesDetailView.as_view(), name='ambiente_detail'),
    path('ambientes/search/', AmbientesSearchView.as_view(), name='ambiente_search'),
    path('sensores/', listar_sensores, name='listar_sensores'),               
    path('sensores/<int:pk>/', SensoresDetailView.as_view(), name='sensor_detail'), 
    path('sensores/search/', SensoresSearchView.as_view(), name='sensor_search'),
    path('historico/', listar_historico, name='listar_historico'),       
    path('historico/<int:pk>/', HistoricoDetailView.as_view(), name='historico_detail'), 
    path('historico/search/', HistoricoSearchView.as_view(), name='historico_search'),
    path('historico/ultimas-24h/', historico_ultimas_24h, name='historico_ultimas_24h'),
    path('cadastro/', cadastrar_usuario, name='cadastro'),
    path('importar/', importar_planilhas, name='importar_planilhas'),
]