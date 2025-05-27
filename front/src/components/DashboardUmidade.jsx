"use client";
import React, { useState } from "react";
import {
  Droplets,
  Wind,
  AlertTriangle,
  BarChart3,
  Gauge,
} from "lucide-react";

export default function DashboardUmidade() {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  const dismissBanner = () => setIsVisible(false);
  const copyPromoCode = () => {
    navigator.clipboard.writeText("UMIDADEVIP");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dados de exemplo
  const sensores = [
    { name: "Estufa A", humidity: 83, status: "Crítico", airflow: 22, lastUpdate: "13:24", weekly: [80,83,82,85,81,79,83] },
    { name: "Armazém Central", humidity: 56, status: "Normal", airflow: 17, lastUpdate: "13:21", weekly: [54,55,57,58,56,55,56] },
    { name: "Depósito 3", humidity: 45, status: "Seco", airflow: 10, lastUpdate: "13:20", weekly: [42,43,44,45,45,46,45] },
  ];
  const alertas = [
    { time: "13:24", message: "Umidade crítica na Estufa A!", type: "danger" },
    { time: "12:10", message: "Fluxo de ar baixo no Depósito 3", type: "warning" },
  ];

  const statusStyles = {
    "Crítico": "bg-red-100 text-red-700",
    "Normal": "bg-green-100 text-green-700",
    "Seco": "bg-blue-100 text-blue-700",
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-[#f7e8ff] via-[#e7fafd] to-[#d2f3f7] font-poppins">
      {/* Banner customizado */}
      {isVisible && (
        <div className="relative w-full overflow-hidden bg-gradient-to-tr from-[#a259e4] via-[#29c0c5] to-[#e0e7ff] px-6 py-7 shadow-lg z-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 left-1/4 h-32 w-32 animate-pulse rounded-full bg-white opacity-10"></div>
            <div className="absolute top-5 right-14 h-20 w-20 animate-bounce rounded-full bg-white opacity-20"></div>
            <div className="absolute bottom-3 right-1/3 h-16 w-16 animate-ping rounded-full bg-white opacity-10 [animation-duration:3s]"></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <Gauge className="h-14 w-14 text-white animate-spin hidden md:block" style={{ animationDuration: "8s" }} />
              <div className="space-y-1 text-center md:text-left">
                <span className="inline-flex animate-pulse rounded-md bg-white px-3 py-1 text-sm font-bold text-[#a259e4] shadow-sm">
                  MONITORAMENTO VIP
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  Painel Avançado de Umidade
                </h3>
                <p className="text-base font-medium text-white/80">
                  Use o cupom{" "}
                  <span className="rounded bg-white/30 px-2 py-0.5 font-bold tracking-wider text-white">
                    UMIDADEVIP
                  </span>{" "}
                  para liberar recursos PRO!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={copyPromoCode}
                className="relative rounded-md border-2 border-[#a259e4] bg-white px-5 py-2.5 text-base font-medium text-[#a259e4] backdrop-blur-sm transition-all hover:bg-white/80 focus:ring-2 focus:ring-white/50 focus:outline-none"
              >
                <span className={`transition-opacity ${copied ? "opacity-0" : "opacity-100"}`}>
                  Copiar cupom
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${copied ? "opacity-100" : "opacity-0"}`}>
                  Copiado!
                </span>
              </button>
              <button
                className="flex-shrink-0 text-white opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
                onClick={dismissBanner}
                aria-label="Fechar banner"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 w-full h-full overflow-auto p-8">
        {/* Grid principal */}
        <div
          className={`
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-9
            min-h-[60vh]
            items-start
          `}
        >
          {/* Sensores */}
          <div className="bg-white rounded-2xl shadow-xl p-7 w-full min-w-[320px] col-span-1 md:col-span-2 xl:col-span-2">
            <h2 className="text-xl font-bold mb-6 text-[#29c0c5] flex items-center gap-2 tracking-wide">
              <Droplets className="w-7 h-7 text-[#a259e4]" />
              Ambientes Monitorados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sensores.map((sensor, idx) => (
                <div
                  key={idx}
                  className={`
                    border-2 rounded-xl p-5 flex flex-col gap-2 shadow-none
                    ${sensor.status === "Crítico" ? "border-red-200" : sensor.status === "Seco" ? "border-blue-200" : "border-green-200"}
                    bg-gradient-to-br from-white via-[#f3fafd] to-[#f6f0fc]
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{sensor.name}</span>
                    <span className={`rounded px-2 py-1 text-xs font-bold ${statusStyles[sensor.status]}`}>
                      {sensor.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Droplets className="w-5 h-5 text-[#29c0c5]" />
                    <span className="font-bold text-xl">{sensor.humidity}%</span>
                    <span className="text-xs text-gray-400">umidade</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-4 h-4 text-[#a259e4]" />
                    <span className="text-sm">Ar: <b>{sensor.airflow} m³/min</b></span>
                  </div>
                  {/* Mini gráfico de barras */}
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Semana</div>
                    <div className="flex items-end gap-1 h-8">
                      {sensor.weekly.map((h, i) => (
                        <div
                          key={i}
                          className={`rounded bg-gradient-to-t ${h>=75 ? "from-red-300 to-red-400" : h<=50 ? "from-blue-300 to-blue-400" : "from-green-200 to-green-400"}`}
                          style={{ width: 9, height: `${h / 1.4}px` }}
                          title={h + "%"}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">Atualizado: {sensor.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Card de alertas */}
          <div className="bg-white rounded-2xl shadow-lg p-7 w-full min-w-[220px] h-fit flex flex-col gap-7">
            <div>
              <h2 className="text-xl font-bold mb-5 text-[#e07474] flex items-center gap-2 tracking-wide">
                <AlertTriangle className="w-6 h-6 text-[#e07474]" />
                Alertas
              </h2>
              <ul className="divide-y">
                {alertas.map((alert, idx) => (
                  <li key={idx} className="py-3 flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${alert.type === "danger" ? "text-[#e07474]" : "text-[#edb431]"}`} />
                    <span className="flex-1">{alert.message}</span>
                    <span className="text-gray-400 text-xs">{alert.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center border-t pt-6">
              <BarChart3 className="text-[#a259e4] w-7 h-7 mb-1" />
              <span className="font-bold text-2xl">
                {Math.round(sensores.reduce((a, b) => a + b.humidity, 0) / sensores.length)}%
              </span>
              <span className="text-gray-500 text-sm">Umidade média geral</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}