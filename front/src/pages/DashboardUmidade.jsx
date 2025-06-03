import React, { useEffect, useState } from "react";
import { Import, Pencil, Trash2 } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/sensores/";

function onlyLetters(str) {
  str = String(str || '');

  return /^[A-Za-zÀ-ÿ\s%°C2-9]+$/.test(str.trim());
}
function onlyMac(str) {
  str = String(str || '');
  return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(str.trim());
}
function onlyNumber(str) {
  str = String(str || '');
  return /^-?\d+(\.\d+)?$/.test(str.trim());
}

export default function SensoresCrud() {
  const [sensores, setSensores] = useState([]);
  const [form, setForm] = useState({
    sensor: "",
    mac_address: "",
    unidade_med: "",
    latitude: "",
    longitude: "",
    status: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formMsg, setFormMsg] = useState('');
  const [importMsg, setImportMsg] = useState('');
  const [refresh, setRefresh] = useState(0);


  const fetchSensores = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setSensores(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSensores();

  }, [refresh]);

  const validate = () => {
    let err = {};
    if (!onlyLetters(form.sensor)) {
      err.sensor = "Só letras e espaços.";
    }
    if (!onlyMac(form.mac_address)) {
      err.mac_address = "MAC inválido. Use AA:BB:CC:DD:EE:FF";
    }
    if (form.unidade_med && !onlyLetters(form.unidade_med)) {
      err.unidade_med = "Só letras, números, %, °C (ex: °C, %, m2, m3).";
    }
    if (form.latitude && !onlyNumber(form.latitude)) {
      err.latitude = "Só números.";
    }
    if (form.longitude && !onlyNumber(form.longitude)) {
      err.longitude = "Só números.";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMsg('');
    if (!validate()) return;

    const token = localStorage.getItem("accessToken");
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}${editingId}/` : API_URL;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setFormMsg('Erro ao salvar sensor');
      return;
    }

    setForm({
      sensor: "",
      mac_address: "",
      unidade_med: "",
      latitude: "",
      longitude: "",
      status: true,
    });
    setEditingId(null);
    setErrors({});
    setFormMsg(editingId ? 'Sensor atualizado com sucesso!' : 'Sensor cadastrado com sucesso!');
    setRefresh(v => v + 1);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("accessToken");
    await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setRefresh(v => v + 1);
  };

  const handleEdit = (sensor) => {
    setForm({
      sensor: sensor.sensor,
      mac_address: sensor.mac_address,
      unidade_med: sensor.unidade_med,
      latitude: sensor.latitude,
      longitude: sensor.longitude,
      status: sensor.status,
    });
    setEditingId(sensor.id);
    setErrors({});
    setFormMsg('');
  };

  const handleImportSensores = async () => {
    setImportMsg("Importando...");
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/importar/", {
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
            Gerenciamento de Sensores
          </h1>
          <button
            onClick={handleImportSensores}
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
          <input
            className={`border rounded px-3 py-2 ${errors.sensor ? "border-red-400" : ""}`}
            placeholder="Tipo do Sensor"
            value={form.sensor}
            onChange={e => setForm({ ...form, sensor: e.target.value })}
            required
          />
          <input
            className={`border rounded px-3 py-2 ${errors.mac_address ? "border-red-400" : ""}`}
            placeholder="MAC Address"
            value={form.mac_address}
            onChange={e => setForm({ ...form, mac_address: e.target.value })}
            required
          />
          <input
            className={`border rounded px-3 py-2 ${errors.unidade_med ? "border-red-400" : ""}`}
            placeholder="Unidade Medida (ex: °C, %, m2)"
            value={form.unidade_med}
            onChange={e => setForm({ ...form, unidade_med: e.target.value })}
          />
          <input
            className={`border rounded px-3 py-2 ${errors.latitude ? "border-red-400" : ""}`}
            placeholder="Latitude"
            type="number"
            value={form.latitude}
            onChange={e => setForm({ ...form, latitude: e.target.value })}
          />
          <input
            className={`border rounded px-3 py-2 ${errors.longitude ? "border-red-400" : ""}`}
            placeholder="Longitude"
            type="number"
            value={form.longitude}
            onChange={e => setForm({ ...form, longitude: e.target.value })}
          />
          <label className="flex items-center gap-2 px-2 text-gray-700">
            <input
              type="checkbox"
              checked={form.status}
              onChange={e => setForm({ ...form, status: e.target.checked })}
              className="rounded border-cyan-300 text-cyan-400 focus:ring-cyan-300"
            />
            Ativo
          </label>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setForm({
                  sensor: "",
                  mac_address: "",
                  unidade_med: "",
                  latitude: "",
                  longitude: "",
                  status: true,
                });
                setEditingId(null);
                setErrors({});
                setFormMsg('');
              }}
              className="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded hover:bg-red-200 transition"
            >
              Cancelar
            </button>
          )}
          <button
            className="px-4 py-2 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition"
            type="submit"
          >
            {editingId ? "Salvar" : "Adicionar"}
          </button>
        </form>
        {(formMsg || Object.values(errors).length > 0) && (
          <div className="text-center mb-4 text-sm text-teal-600">
            {formMsg}
            <div>
              {Object.entries(errors).map(([field, msg]) => (
                <div key={field} className="text-red-500 text-xs">{msg}</div>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500 text-lg py-12">
            Carregando...
          </div>
        ) : sensores.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-8">
            Nenhum sensor cadastrado.
          </div>
        ) : (
          <div className="overflow-x-auto flex-grow">
            <div
              className="overflow-y-auto rounded-xl border"
              style={{ height: 'calc(80vh - 250px)' }}
            >
              <table className="min-w-full bg-white">
                <thead className="sticky top-0 bg-white z-10">
                  <tr>
                    <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">Tipo</th>
                    <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">MAC Address</th>
                    <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">Unidade</th>
                    <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">Latitude</th>
                    <th className="px-3 py-2 border-b text-gray-700 text-left font-semibold">Longitude</th>
                    <th className="px-3 py-2 border-b text-gray-700 text-center font-semibold">Status</th>
                    <th className="px-3 py-2 border-b text-gray-700 text-center font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sensores.map((sensor) => (
                    <tr key={sensor.id} className="hover:bg-gray-50 transition">
                      <td className="px-3 py-2 border-b text-gray-800">{sensor.sensor}</td>
                      <td className="px-3 py-2 border-b text-gray-800">{sensor.mac_address}</td>
                      <td className="px-3 py-2 border-b text-gray-800">{sensor.unidade_med}</td>
                      <td className="px-3 py-2 border-b text-gray-800">{sensor.latitude}</td>
                      <td className="px-3 py-2 border-b text-gray-800">{sensor.longitude}</td>
                      <td className="px-3 py-2 border-b text-gray-800 text-center">
                        {sensor.status ? (
                          <span className="inline-block rounded-full bg-green-200 px-2 py-0.5 text-xs font-semibold text-green-700">
                            Ativo
                          </span>
                        ) : (
                          <span className="inline-block rounded-full bg-red-200 px-2 py-0.5 text-xs font-semibold text-red-700">
                            Inativo
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 border-b text-gray-800 text-center">
                        <button
                          onClick={() => handleEdit(sensor)}
                          title="Editar"
                          className="text-teal-600 hover:text-teal-900 mr-2"
                        >
                          <Pencil className="inline w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(sensor.id)}
                          title="Excluir"
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="inline w-5 h-5" />
                        </button>
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
}