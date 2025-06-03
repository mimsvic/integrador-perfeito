import React, { useEffect, useState } from 'react';
import { Import } from "lucide-react";

const getSensorLabel = (sensor) =>
  typeof sensor === 'object'
    ? sensor.sensor || sensor.mac_address || sensor.id
    : sensor;
const getAmbienteLabel = (ambiente) =>
  typeof ambiente === 'object'
    ? ambiente.descricao || ambiente.id
    : ambiente;

const API_BASE = "http://127.0.0.1:8000/";

const getToken = () => localStorage.getItem('accessToken') || localStorage.getItem('token');

const fetchOptions = (method = 'GET', body = null, contentType = true) => {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    ...(contentType && { 'Content-Type': 'application/json' }),
  };
  return {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };
};

const Historico24h = () => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [refresh, setRefresh] = useState(0);

  const [sensores, setSensores] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  const [sensorId, setSensorId] = useState('');
  const [ambienteId, setAmbienteId] = useState('');
  const [valor, setValor] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [importMsg, setImportMsg] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    Promise.all([
      fetch(API_BASE + 'api/sensores/', { headers: { Authorization: `Bearer ${token}` } }),
      fetch(API_BASE + 'api/ambientes/', { headers: { Authorization: `Bearer ${token}` } }),
    ])
      .then(async ([resSensores, resAmbientes]) => {
        const sensoresData = await resSensores.json();
        const ambientesData = await resAmbientes.json();
        setSensores(sensoresData);
        setAmbientes(ambientesData);
      })
      .catch(() => {
        setSensores([]);
        setAmbientes([]);
      });
  }, []);

  useEffect(() => {
    const fetchHistorico = async () => {
      const token = getToken();
      if (!token) {
        setErro('Você precisa fazer login!');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          API_BASE + 'api/historico/ultimas-24h/',
          fetchOptions()
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Erro ao buscar histórico');

        if (Array.isArray(data)) {
          setHistorico(data);
          setErro('');
        } else if (data.detail) {
          setHistorico([]);
          setErro(data.detail);
        } else {
          setHistorico([]);
          setErro('Nenhum dado encontrado nas últimas 24 horas.');
        }
      } catch (error) {
        setErro(error.message || 'Erro ao buscar histórico');
        setHistorico([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistorico();
  }, [refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMsg('');
    if (!sensorId || !ambienteId || valor === '') {
      setFormMsg('Preencha todos os campos!');
      return;
    }
    try {
      const res = await fetch(
        API_BASE + 'api/historico/',
        fetchOptions('POST', { sensor_id: sensorId, ambiente_id: ambienteId, valor: Number(valor) })
      );
      if (!res.ok) {
        const err = await res.json();
        setFormMsg(err.detail || 'Erro ao cadastrar histórico');
        return;
      }
      setFormMsg('Histórico cadastrado com sucesso!');
      setSensorId('');
      setAmbienteId('');
      setValor('');
      setRefresh(v => v + 1);
    } catch {
      setFormMsg('Erro ao cadastrar histórico');
    }
  };

  const handleImportPlanilhas = async () => {
    setImportMsg("Importando...");
    const token = getToken();
    try {
      const res = await fetch(API_BASE + 'api/importar/', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setImportMsg(data.erro || "Erro ao importar planilhas.");
      } else {
        setImportMsg(data.sucesso || "Importação concluída!");
        setRefresh(v => v + 1);
      }
    } catch {
      setImportMsg("Erro ao importar planilhas.");
    }
    setTimeout(() => setImportMsg(""), 6000);
  };

  return (
    <div
      className="min-h-[60vh] w-full flex flex-col items-center justify-start bg-white py-12 px-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-teal-500 text-center">
            Histórico das Últimas 24h
          </h1>
          <button
            onClick={handleImportPlanilhas}
            className="flex items-center gap-2 px-4 py-2 mt-4 sm:mt-0 bg-emerald-500 hover:bg-emerald-700 text-white rounded-lg font-semibold transition"
            title="Importar planilhas do servidor"
            type="button"
          >
            <Import className="w-5 h-5" />
            Importar Planilhas
          </button>
        </div>
        {importMsg && (
          <div className="text-center mb-4 text-sm text-emerald-600">{importMsg}</div>
        )}

        <form onSubmit={handleSubmit} className="mb-8 flex flex-wrap gap-3 items-end justify-center">
          <select
            className="border rounded px-3 py-2"
            value={sensorId}
            onChange={e => setSensorId(e.target.value)}
            required
          >
            <option value="">Selecione o sensor</option>
            {sensores.map(s => (
              <option key={s.id} value={s.id}>{getSensorLabel(s)}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2"
            value={ambienteId}
            onChange={e => setAmbienteId(e.target.value)}
            required
          >
            <option value="">Selecione o ambiente</option>
            {ambientes.map(a => (
              <option key={a.id} value={a.id}>{getAmbienteLabel(a)}</option>
            ))}
          </select>
          <input
            className="border rounded px-3 py-2"
            type="number"
            step="0.01"
            placeholder="Valor"
            value={valor}
            onChange={e => setValor(e.target.value)}
            required
          />
          <button
            className="px-4 py-2 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition"
            type="submit"
          >
            Cadastrar Histórico
          </button>
        </form>
        {formMsg && <div className="text-center mb-4 text-sm text-teal-600">{formMsg}</div>}

        {loading ? (
          <div className="text-center text-gray-500 text-lg py-12">
            Carregando...
          </div>
        ) : erro ? (
          <div className="text-center text-red-500 text-lg py-8">{erro}</div>
        ) : historico.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-8">
            Nenhum dado encontrado nas últimas 24 horas.
          </div>
        ) : (
          <div className="overflow-x-auto flex-grow">
            <div
              className="overflow-y-auto rounded-xl border"
              style={{ height: 'calc(80vh - 250px)' }} // 250px é aproximado para cabeçalho, formulário, botões etc.
            >
              <table className="min-w-full bg-white">
                <thead className="sticky top-0 bg-white z-10">
                  <tr>
                    <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">
                      Sensor
                    </th>
                    <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">
                      Ambiente
                    </th>
                    <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">
                      Valor
                    </th>
                    <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">
                      Data/Hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historico.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-3 py-2 border-b text-gray-800">
                        {getSensorLabel(item.sensor)}
                      </td>
                      <td className="px-3 py-2 border-b text-gray-800">
                        {getAmbienteLabel(item.ambiente)}
                      </td>
                      <td className="px-3 py-2 border-b text-gray-800">
                        {item.valor}
                      </td>
                      <td className="px-3 py-2 border-b text-gray-600 text-sm">
                        {item.timestamp
                          ? new Date(item.timestamp).toLocaleString('pt-BR')
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Historico24h;
