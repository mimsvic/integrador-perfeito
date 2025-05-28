import React, { useEffect, useState } from 'react';
const Historico24h = () => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorico = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('Você precisa fazer login!');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://127.0.0.1:8000/api/historico/ultimas-24h/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Erro ao buscar histórico');
        const data = await response.json();
        setHistorico(data);
      } catch (error) {
        alert('Erro ao buscar histórico');
      } finally {
        setLoading(false);
      }
    };
    fetchHistorico();
  }, []);

  return (
    <div
      className="min-h-[60vh] w-full flex flex-col items-center justify-start bg-gray-100 py-12 px-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-teal-500 mb-6 text-center">
          Histórico das Últimas 24h
        </h1>
        {loading ? (
          <div className="text-center text-gray-500 text-lg py-12">Carregando...</div>
        ) : historico.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-8">
            Nenhum dado encontrado nas últimas 24 horas.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl">
              <thead>
                <tr>
                  <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">Sensor</th>
                  <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">Ambiente</th>
                  <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">Valor</th>
                  <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">Data/Hora</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-3 py-2 border-b text-gray-800">{item.sensor?.sensor || item.sensor}</td>
                    <td className="px-3 py-2 border-b text-gray-800">{item.ambiente?.descricao || item.ambiente}</td>
                    <td className="px-3 py-2 border-b text-gray-800">{item.valor}</td>
                    <td className="px-3 py-2 border-b text-gray-600 text-sm">
                      {new Date(item.timestamp).toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Historico24h;