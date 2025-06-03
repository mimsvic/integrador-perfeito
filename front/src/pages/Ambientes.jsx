import React, { useEffect, useState } from "react";
import {
  Home,
  MapPin,
  User,
  FileText,
  RefreshCcw,
  PlusCircle,
  Save,
  XCircle,
  Edit2,
  Trash2,
  Search,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/ambientes/";



function onlyLetters(str) {
  str = String(str || ''); 
  return /^[A-Za-zÀ-ÿ\s]+$/.test(str.trim());
}

function onlyNumber(str) {
  str = String(str || '');
  return /^-?\d+$/.test(str.trim());
}


export default function AmbientesCrud() {
  const [ambientes, setAmbientes] = useState([]);
  const [form, setForm] = useState({
    sig: "",
    descricao: "",
    ni: "",
    responsavel: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");

  // Função para garantir que ambientes será sempre array
  const setAmbientesSafe = (data) => {
    if (Array.isArray(data)) setAmbientes(data);
    else if (data && Array.isArray(data.results)) setAmbientes(data.results);
    else setAmbientes([]);
  };

  const fetchAmbientes = async (q = "") => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    let url = API_URL;
    // Corrigido: use o endpoint correto de busca
    if (q) url += `search/?search=${encodeURIComponent(q)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      setAmbientes([]);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setAmbientesSafe(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAmbientes();
    // eslint-disable-next-line
  }, []);

  const validate = () => {
    let err = {};
    if (!form.sig || !onlyNumber(form.sig)) {
      err.sig = "Só números inteiros.";
    }
    if (!form.descricao || !onlyLetters(form.descricao)) {
      err.descricao = "Só letras e espaços.";
    }
    if (form.ni && !onlyLetters(form.ni)) {
      err.ni = "Só letras e espaços.";
    }
    if (form.responsavel && !onlyLetters(form.responsavel)) {
      err.responsavel = "Só letras e espaços.";
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

    // Certifique-se que sig é inteiro
    const payload = {
      ...form,
      sig: Number(form.sig),
    };

    const resp = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      const data = await resp.json();
      alert("Erro: " + JSON.stringify(data));
      return;
    }

    setForm({
      sig: "",
      descricao: "",
      ni: "",
      responsavel: "",
    });
    setEditingId(null);
    setErrors({});
    fetchAmbientes();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("accessToken");
    await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAmbientes();
  };

  const handleEdit = (amb) => {
    setForm({
      sig: amb.sig.toString(),
      descricao: amb.descricao,
      ni: amb.ni,
      responsavel: amb.responsavel,
    });
    setEditingId(amb.id);
    setErrors({});
  };

  const handleSearchClick = () => {
    fetchAmbientes(search);
  };

  const handleClearSearch = () => {
    setSearch("");
    fetchAmbientes();
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
              <Home className="mr-1 h-4 w-4" />
              CRUD de Ambientes
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Gerenciamento de Ambientes
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Cadastre, edite e remova ambientes do sistema SmartCity.
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
                  SIG (Número)
                </label>
                <div className="relative flex items-center">
                  <FileText className="absolute left-2 top-1/2 -translate-y-1/2 text-cyan-400 w-4 h-4" />
                  <input
                    type="number"
                    className={`pl-8 border ${errors.sig ? "border-red-400" : "border-cyan-200"} rounded-lg p-2 w-full outline-cyan-400 text-sm`}
                    placeholder="Ex: 101"
                    value={form.sig}
                    onChange={(e) => setForm({ ...form, sig: e.target.value })}
                    required
                  />
                </div>
                {errors.sig && <span className="text-xs text-red-500">{errors.sig}</span>}
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Descrição
                </label>
                <div className="relative flex items-center">
                  <FileText className="absolute left-2 top-1/2 -translate-y-1/2 text-cyan-400 w-4 h-4" />
                  <input
                    className={`pl-8 border ${errors.descricao ? "border-red-400" : "border-cyan-200"} rounded-lg p-2 w-full outline-cyan-400 text-sm`}
                    placeholder="Ex: Laboratório de Informática"
                    value={form.descricao}
                    onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                    required
                  />
                </div>
                {errors.descricao && <span className="text-xs text-red-500">{errors.descricao}</span>}
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  NI
                </label>
                <input
                  className={`border ${errors.ni ? "border-red-400" : "border-cyan-200"} rounded-lg p-2 w-full outline-cyan-400 text-sm`}
                  placeholder="Ex: Bloco A"
                  value={form.ni}
                  onChange={(e) => setForm({ ...form, ni: e.target.value })}
                />
                {errors.ni && <span className="text-xs text-red-500">{errors.ni}</span>}
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Responsável
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-2 top-1/2 -translate-y-1/2 text-cyan-400 w-4 h-4" />
                  <input
                    className={`pl-8 border ${errors.responsavel ? "border-red-400" : "border-cyan-200"} rounded-lg p-2 w-full outline-cyan-400 text-sm`}
                    placeholder="Ex: João da Silva"
                    value={form.responsavel}
                    onChange={(e) => setForm({ ...form, responsavel: e.target.value })}
                  />
                </div>
                {errors.responsavel && <span className="text-xs text-red-500">{errors.responsavel}</span>}
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
                      sig: "",
                      descricao: "",
                      ni: "",
                      responsavel: "",
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
                onClick={() => fetchAmbientes()}
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
              {/* Corrigido: Não é mais um <form> dentro do form */}
              <div className="flex items-center gap-1 ml-auto">
                <input
                  className="border border-cyan-200 rounded-lg px-2 py-1 outline-cyan-400 text-sm"
                  placeholder="Buscar ambiente"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <button
                  type="button"
                  className="p-2 rounded-lg bg-cyan-100 hover:bg-cyan-200 text-cyan-700 transition"
                  title="Buscar"
                  onClick={handleSearchClick}
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-cyan-700 transition"
                  title="Limpar"
                  onClick={handleClearSearch}
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Tabela desktop/tablet */}
        <div className="rounded-xl bg-white/80 shadow-lg overflow-x-auto hidden sm:block">
          {loading ? (
            <p className="text-center py-8 text-cyan-600 font-semibold">Carregando ambientes...</p>
          ) : (
            <table className="min-w-[640px] w-full divide-y divide-cyan-100 text-xs sm:text-sm">
              <thead className="bg-gradient-to-r from-cyan-100 via-white to-emerald-50">
                <tr>
                  <th className="px-2 py-2 text-left font-semibold text-cyan-700">SIG</th>
                  <th className="px-2 py-2 text-left font-semibold text-cyan-700">Descrição</th>
                  <th className="px-2 py-2 text-left font-semibold text-cyan-700">NI</th>
                  <th className="px-2 py-2 text-left font-semibold text-cyan-700">Responsável</th>
                  <th className="px-2 py-2 text-center font-semibold text-cyan-700">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-50">
                {ambientes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400 font-medium">
                      Nenhum ambiente cadastrado.
                    </td>
                  </tr>
                )}
                {ambientes.map((a) => (
                  <tr key={a.id} className="hover:bg-cyan-50 transition">
                    <td className="px-2 py-2 whitespace-nowrap">{a.sig}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{a.descricao}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{a.ni}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{a.responsavel}</td>
                    <td className="px-2 py-2 whitespace-nowrap text-center">
                      <button
                        className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg px-2 sm:px-3 py-1 text-xs font-semibold mr-2 transition"
                        onClick={() => handleEdit(a)}
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" /> Editar
                      </button>
                      <button
                        className="inline-flex items-center gap-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg px-2 sm:px-3 py-1 text-xs font-semibold transition"
                        onClick={() => handleDelete(a.id)}
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
            <p className="text-center py-8 text-cyan-600 font-semibold">Carregando ambientes...</p>
          ) : (
            ambientes.length === 0 ? (
              <div className="py-8 text-center text-gray-400 font-medium">
                Nenhum ambiente cadastrado.
              </div>
            ) : (
              ambientes.map((a) => (
                <div key={a.id} className="rounded-xl border border-cyan-100 bg-white p-4 shadow flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-cyan-700">{a.sig}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {a.descricao}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> NI: {a.ni}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {a.responsavel}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg px-3 py-1 text-xs font-semibold transition"
                      onClick={() => handleEdit(a)}
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" /> Editar
                    </button>
                    <button
                      className="inline-flex items-center gap-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg px-3 py-1 text-xs font-semibold transition"
                      onClick={() => handleDelete(a.id)}
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