import React, { useEffect, useState } from "react";
import {
  Cpu,
  MapPin,
  Activity,
  Wifi,
  RefreshCcw,
  PlusCircle,
  Save,
  XCircle,
  Edit2,
  Trash2,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/sensores/";

function onlyLetters(str) {
  return /^[A-Za-zÀ-ÿ\s]+$/.test(str.trim());
}
function onlyMac(str) {
  return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(str.trim());
}
function onlyNumber(str) {
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
    // eslint-disable-next-line
  }, []);

  const validate = () => {
    let err = {};
    if (!onlyLetters(form.sensor)) {
      err.sensor = "Só letras e espaços.";
    }
    if (!onlyMac(form.mac_address)) {
      err.mac_address = "MAC inválido. Use AA:BB:CC:DD:EE:FF";
    }
    if (form.unidade_med && !onlyLetters(form.unidade_med.replace("%", ""))) {
      err.unidade_med = "Só letras (e % opcional).";
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
    if (!validate()) return;

    const token = localStorage.getItem("accessToken");
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}${editingId}/` : API_URL;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

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
    fetchSensores();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("accessToken");
    await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchSensores();
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
  };

  return (
    <section className="relative overflow-hidden py-5 w-full font-[Poppins] bg-white min-h-screen">
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="teal" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-full sm:max-w-2xl md:max-w-5xl px-2 sm:px-4 md:px-6">
        {/* Título */}
        <div className="mx-auto mb-4 sm:mb-6 max-w-2xl text-center">
          <div className="mb-2 flex justify-center">
            <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-0.5 text-xs font-medium text-cyan-600">
              <Cpu className="mr-1 h-4 w-4" />
              CRUD de Sensores
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Gerenciamento de Sensores IoT
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Cadastre, edite e remova sensores conectados ao sistema SmartCity.
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-gradient-to-tr from-emerald-50 to-cyan-50 rounded-xl shadow-lg p-2 sm:p-6 mb-4 sm:mb-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tipo do Sensor
                </label>
                <div className="relative flex items-center">
                  <Activity className="absolute left-2 top-1/2 -translate-y-1/2 text-cyan-400 w-4 h-4" />
                  <input
                    className={`pl-8 border ${errors.sensor ? "border-red-400" : "border-cyan-200"} rounded-lg p-2 w-full outline-cyan-400 text-sm`}
                    placeholder="Ex: Temperatura"
                    value={form.sensor}
                    onChange={(e) => setForm({ ...form, sensor: e.target.value })}
                    required
                  />
                </div>
                {errors.sensor && <span className="text-xs text-red-500">{errors.sensor}</span>}
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  MAC Address
                </label>
                <div className="relative flex items-center">
                  <Wifi className="absolute left-2 top-1/2 -translate-y-1/2 text-cyan-400 w-4 h-4" />
                  <input
                    className={`pl-8 border ${errors.mac_address ? "border-red-400" : "border-cyan-200"} rounded-lg p-2 w-full outline-cyan-400 text-sm`}
                    placeholder="Ex: AA:BB:CC:DD:EE:FF"
                    value={form.mac_address}
                    onChange={(e) => setForm({ ...form, mac_address: e.target.value })}
                    required
                  />
                </div>
                {errors.mac_address && <span className="text-xs text-red-500">{errors.mac_address}</span>}
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Unidade Medida
                </label>
                <input
                  className={`border ${errors.unidade_med ? "border-red-400" : "border-cyan-200"} rounded-lg p-2 w-full outline-cyan-400 text-sm`}
                  placeholder="Ex: °C, Lux, %"
                  value={form.unidade_med}
                  onChange={(e) => setForm({ ...form, unidade_med: e.target.value })}
                />
                {errors.unidade_med && <span className="text-xs text-red-500">{errors.unidade_med}</span>}
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Latitude
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-cyan-400 w-4 h-4" />
                  <input
                    className={`pl-8 border ${errors.latitude ? "border-red-400" : "border-cyan-200"} rounded-lg p-2 w-full outline-cyan-400 text-sm`}
                    placeholder="Latitude"
                    type="number"
                    value={form.latitude}
                    onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                  />
                </div>
                {errors.latitude && <span className="text-xs text-red-500">{errors.latitude}</span>}
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Longitude
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-cyan-400 w-4 h-4" />
                  <input
                    className={`pl-8 border ${errors.longitude ? "border-red-400" : "border-cyan-200"} rounded-lg p-2 w-full outline-cyan-400 text-sm`}
                    placeholder="Longitude"
                    type="number"
                    value={form.longitude}
                    onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                  />
                </div>
                {errors.longitude && <span className="text-xs text-red-500">{errors.longitude}</span>}
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="border border-cyan-200 rounded-lg p-2 w-full outline-cyan-400 text-sm"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value === "true" })}
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row gap-2 flex-wrap mt-2">
              <button
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition text-sm ${
                  editingId
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-cyan-500 hover:bg-cyan-600"
                } shadow`}
                type="submit"
              >
                {editingId ? <Save className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                {editingId ? "Salvar" : "Adicionar"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition shadow text-sm"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      sensor: "",
                      mac_address: "",
                      unidade_med: "",
                      latitude: "",
                      longitude: "",
                      status: true,
                    });
                    setErrors({});
                  }}
                >
                  <XCircle className="w-4 h-4" />
                  Cancelar
                </button>
              )}
              <button
                type="button"
                title="Atualizar lista"
                className="p-2 rounded-lg bg-gray-100 hover:bg-cyan-200 text-cyan-700 transition shadow"
                onClick={fetchSensores}
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Tabela - só desktop/tablet */}
        <div className="rounded-xl bg-white/80 shadow-lg overflow-x-auto hidden sm:block">
          {loading ? (
            <p className="text-center py-8 text-cyan-600 font-semibold">Carregando sensores...</p>
          ) : (
            <table className="min-w-[640px] w-full divide-y divide-cyan-100 text-xs sm:text-sm">
              <thead className="bg-gradient-to-r from-cyan-100 via-white to-emerald-50">
                <tr>
                  <th className="px-2 py-2 text-left font-semibold text-cyan-700">Tipo</th>
                  <th className="px-2 py-2 text-left font-semibold text-cyan-700">MAC</th>
                  <th className="px-2 py-2 text-left font-semibold text-cyan-700">Unidade</th>
                  <th className="px-2 py-2 text-left font-semibold text-cyan-700">Latitude</th>
                  <th className="px-2 py-2 text-left font-semibold text-cyan-700">Longitude</th>
                  <th className="px-2 py-2 text-left font-semibold text-cyan-700">Status</th>
                  <th className="px-2 py-2 text-center font-semibold text-cyan-700">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-50">
                {sensores.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-400 font-medium">
                      Nenhum sensor cadastrado.
                    </td>
                  </tr>
                )}
                {sensores.map((s) => (
                  <tr key={s.id} className="hover:bg-cyan-50 transition">
                    <td className="px-2 py-2 whitespace-nowrap">{s.sensor}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{s.mac_address}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{s.unidade_med}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{s.latitude}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{s.longitude}</td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full font-bold ${
                          s.status
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {s.status ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-center">
                      <button
                        className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg px-2 sm:px-3 py-1 text-xs font-semibold mr-2 transition"
                        onClick={() => handleEdit(s)}
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" /> Editar
                      </button>
                      <button
                        className="inline-flex items-center gap-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg px-2 sm:px-3 py-1 text-xs font-semibold transition"
                        onClick={() => handleDelete(s.id)}
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" /> Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden mt-4 space-y-4">
          {loading ? (
            <p className="text-center py-8 text-cyan-600 font-semibold">Carregando sensores...</p>
          ) : (
            sensores.length === 0 ? (
              <div className="py-8 text-center text-gray-400 font-medium">
                Nenhum sensor cadastrado.
              </div>
            ) : (
              sensores.map((s) => (
                <div key={s.id} className="rounded-xl border border-cyan-100 bg-white p-4 shadow flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-cyan-700">{s.sensor}</span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full font-bold text-xs ${
                        s.status
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {s.status ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                    <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> {s.mac_address}</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {s.unidade_med}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {s.latitude}, {s.longitude}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg px-3 py-1 text-xs font-semibold transition"
                      onClick={() => handleEdit(s)}
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" /> Editar
                    </button>
                    <button
                      className="inline-flex items-center gap-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg px-3 py-1 text-xs font-semibold transition"
                      onClick={() => handleDelete(s.id)}
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" /> Excluir
                    </button>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </section>
  );
}