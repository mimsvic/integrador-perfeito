from django.http import HttpResponse
from .models import Ambientes, Sensores, Historico
from .serializers import AmbientesSerializer, SensoresSerializer, HistoricoSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.tokens import RefreshToken
import os
import django
from django.http import JsonResponse
import pandas as pd  
from django.utils import timezone

# ======================= Ambientes =======================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_ambientes(request):
    if request.method == 'GET':
        queryset = Ambientes.objects.all()
        serializer = AmbientesSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AmbientesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AmbientesView(ListCreateAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer
    permission_classes = [IsAuthenticated]

class AmbientesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer
    permission_classes = [IsAuthenticated]

class AmbientesSearchView(ListAPIView):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['id', 'sig', 'descricao', 'ni', 'responsavel']


# ======================= Sensores =======================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_sensores(request):
    if request.method == 'GET':
        queryset = Sensores.objects.all()
        serializer = SensoresSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = SensoresSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class SensoresView(ListCreateAPIView):
    queryset = Sensores.objects.all()
    serializer_class = SensoresSerializer
    permission_classes = [IsAuthenticated]

class SensoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Sensores.objects.all()
    serializer_class = SensoresSerializer
    permission_classes = [IsAuthenticated]

class SensoresSearchView(ListAPIView):
    queryset = Sensores.objects.all()
    serializer_class = SensoresSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['id', 'sensor', 'mac_address', 'unidade_med', 'latitude', 'longitude', 'status']


# ======================= Historico =======================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def historico_ultimas_24h(request):
    from django.utils import timezone
    from datetime import timedelta
    limite = timezone.now() - timedelta(hours=24)
    queryset = Historico.objects.filter(timestamp__gte=limite)
    serializer = HistoricoSerializer(queryset, many=True)
    return Response(serializer.data)
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_historico(request):
    if request.method == 'GET':
        queryset = Historico.objects.all()
        serializer = HistoricoSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = HistoricoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class HistoricoView(ListCreateAPIView):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]
    

class HistoricoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]

class HistoricoSearchView(ListAPIView):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = [
        'id',
        'sensor__sensor',
        'sensor__mac_address',
        'sensor__id',
        'ambiente__descricao',
        'ambiente__id',
        'timestamp',
        'valor'
    ]


# ======================= Usuario =======================

@api_view(['POST'])
def cadastrar_usuario(request):
    dados_recebidos = request.data

    username = dados_recebidos.get('username', '').strip()
    email = dados_recebidos.get('email', '').strip()
    senha = dados_recebidos.get('password', '').strip()

    erros = {}

    if not username:
        erros['username'] = 'O campo nome de usuário é obrigatório.'

    if not email:
        erros['email'] = 'O campo e-mail é obrigatório.'

    if not senha:
        erros['senha'] = 'O campo senha é obrigatório.'

    if erros:
        return Response({'erros': erros}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'username': 'Nome de usuário já existe.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'email': 'E-mail já está em uso.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username=username, email=email, password=senha)
        user.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'erro': f'Erro ao criar usuário: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'back.settings')
django.setup()

def importar_planilhas(request):
    planilhas = {
        'contador.xlsx':        ('Contador de Pessoas', 'Un'),
        'luminosidade.xlsx':    ('Luminosidade', 'Lux'),
        'temperatura.xlsx':     ('Temperatura', '°C'),
        'umidade.xlsx':         ('Umidade', '%'),
    }

    BASE_PATH = os.path.dirname(os.path.dirname(__file__)) 
    inseridos = 0

    # Importar sensores
    for nome_arquivo, (tipo_sensor, unidade) in planilhas.items():
        caminho = os.path.join(BASE_PATH, nome_arquivo)
        try:
            df = pd.read_excel(caminho)
        except Exception as e:
            print(f"Erro ao abrir {nome_arquivo}: {e}")
            continue

        for index, row in df.iterrows():
            try:
                Sensores.objects.create(
                    sensor=tipo_sensor,
                    mac_address=str(row['mac_address']),
                    unidade_med=unidade,
                    latitude=float(row['latitude']),
                    longitude=float(row['longitude']),
                    status=str(row['status']).strip().lower() == 'ativo',
                )
                inseridos += 1
            except Exception as e:
                print(f"Erro na linha {index + 2} do arquivo {nome_arquivo}: {e}")

    print(f"\nTotal de sensores inseridos: {inseridos}")

    # Importar ambientes
    excel_path = os.path.join(BASE_PATH, 'Ambientes.xlsx')
    if not os.path.exists(excel_path):
        return JsonResponse({"erro": f"Arquivo não encontrado: {excel_path}"})

    try:
        df = pd.read_excel(excel_path)
    except Exception as e:
        return JsonResponse({"erro": f"Erro ao abrir Ambientes.xlsx: {e}"})

    contador = 0
    for index, row in df.iterrows():
        try:
            Ambientes.objects.create(
                sig=str(row['sig']),
                descricao=str(row['descricao']),
                ni=str(row['ni']),
                responsavel=str(row['responsavel'])
            )
            contador += 1
        except Exception as e:
            print(f"Erro na linha {index + 1} do Ambientes.xlsx: {e}")

    print(f"Inserções de ambientes concluídas: {contador}")

    # Função auxiliar para importar históricos
    def importar_historico_excel(nome_arquivo):
        caminho = os.path.join(BASE_PATH, nome_arquivo)
        inseridos = 0

        if os.path.exists(caminho):
            try:
                df = pd.read_excel(caminho)
                print(f"Colunas lidas de {nome_arquivo}:", df.columns)
            except Exception as e:
                print(f"Erro ao abrir {nome_arquivo}: {e}")
                return 0

            for index, row in df.iterrows():
                try:
                    sensor = Sensores.objects.get(pk=int(row['sensor']))
                    ambiente = Ambientes.objects.get(pk=int(row['ambiente']))
                    Historico.objects.create(
                        sensor=sensor,
                        ambiente=ambiente,
                        valor=float(row['valor']),
                        timestamp=pd.to_datetime(row['timestamp'], dayfirst=True, errors='coerce') or timezone.now()
                    )
                    inseridos += 1
                except Exception as e:
                    print(f"Erro na linha {index + 2} do {nome_arquivo}: {e}")
        else:
            print(f"Arquivo {nome_arquivo} não encontrado em {caminho}")
        return inseridos

    total_historico = 0
    for nome in ['histórico.xlsx', 'historicoLux.xlsx', 'historicoTemp.xlsx', 'historicoUmid.xlsx']:
        total_historico += importar_historico_excel(nome)

    return JsonResponse({
        "sucesso": f"{inseridos} sensores, {contador} ambientes e {total_historico} registros históricos foram inseridos."
    })

