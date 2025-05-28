"use client";
import React, { useState } from "react";
import {
  Sun,
  Thermometer,
  Droplets,
  DoorOpen,
  Fan,
  Zap,
  Refrigerator,
  Activity,
  AlertCircle,
  BarChart2,
  Wifi,
  CloudRain,
  Leaf,
  UserCheck,
} from "lucide-react";
import Thermostat from "./Thermostat";

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  const dismissBanner = () => setIsVisible(false);
  const copyPromoCode = () => {
    navigator.clipboard.writeText("SPRING25");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labs = [
    { name: "Lab 1", temperature: 15, humidity: 60, doorOpen: false, compressor: true, power: 120 },
    { name: "Lab 2", temperature: 23, humidity: 50, doorOpen: true, compressor: false, power: 80 },
  ];
  const alerts = [
    { time: "12:10", message: "Porta aberta no Lab 2", type: "warning" },
    { time: "11:55", message: "Temperatura alta no Lab 1", type: "danger" },
  ];

  const cards = [
    {
      key: "thermostat",
      content: (
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center w-full min-w-[160px]">
          <Thermostat />
          <span className="mt-4 text-gray-500 text-xs font-semibold">Ajuste geral de temperatura</span>
        </div>
      ),
    },
    {
      key: "fan",
      content: (
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center gap-4 w-full min-w-[160px]">
          <Fan className="text-[#47c0f9] w-8 h-8" />
          <span className="text-gray-800 font-bold text-base">Ventilação</span>
          <button className="bg-[#47c0f9] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2996ce] transition text-sm">
            Ativar
          </button>
        </div>
      ),
    },
    {
      key: "labs",
      content: (
        <div className="bg-white rounded-2xl shadow-lg p-5 w-full min-w-[180px]">
          <h2 className="text-lg font-bold mb-3 text-[#2786b6] flex items-center gap-2">
            <Refrigerator className="w-5 h-5 text-[#47c0f9]" />
            Refrigeradores
          </h2>
          <div className="flex flex-col gap-3">
            {labs.map((lab, idx) => (
              <div key={idx} className="border rounded-lg p-3 flex flex-col gap-2 bg-[#f6fbfd]">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{lab.name}</span>
                  <span className={`rounded px-2 py-1 text-xs font-bold ${lab.compressor ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-400"}`}>
                    {lab.compressor ? "Compressor Ligado" : "Compressor Off"}
                  </span>
                </div>
                <div className="flex gap-2 mt-1 flex-wrap text-xs">
                  <div className="flex items-center gap-1">
                    <Thermometer className="w-4 h-4 text-[#47c0f9]" />
                    <span>{lab.temperature}°C</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="w-4 h-4 text-[#2786b6]" />
                    <span>{lab.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DoorOpen className={`w-4 h-4 ${lab.doorOpen ? "text-[#ff6b6b]" : "text-green-500"}`} />
                    <span>{lab.doorOpen ? "Aberta" : "Fechada"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-[#b5d3f6]" />
                    <span>{lab.power}W</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "alertas",
      content: (
        <div className="bg-white rounded-2xl shadow-lg p-5 w-full min-w-[150px]">
          <h2 className="text-lg font-bold mb-3 text-[#ff6b6b] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#ff6b6b]" />
            Alertas Recentes
          </h2>
          <ul className="divide-y">
            {alerts.map((alert, idx) => (
              <li key={idx} className="py-2 flex items-center gap-3">
                <AlertCircle className={`w-4 h-4 ${alert.type === "danger" ? "text-[#ff6b6b]" : alert.type === "warning" ? "text-[#FFA500]" : "text-[#47c0f9]"}`} />
                <span className="flex-1">{alert.message}</span>
                <span className="text-gray-400 text-xs">{alert.time}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      key: "consumo",
      content: (
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center gap-2 w-full min-w-[150px]">
          <BarChart2 className="text-[#2786b6] w-7 h-7 mb-2" />
          <span className="font-bold text-lg">3.2 kWh</span>
          <span className="text-gray-500 text-xs">Consumo hoje</span>
        </div>
      ),
    },
    {
      key: "weather",
      content: (
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-row items-center gap-2 w-full min-w-[120px]">
          <CloudRain className="text-[#47c0f9] w-7 h-7" />
          <div>
            <span className="font-semibold text-gray-800 text-sm">Previsão: Chuva</span>
            <div className="text-gray-500 text-xs">21°C - Umidade 72%</div>
          </div>
        </div>
      ),
    },
    {
      key: "wifi",
      content: (
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-row items-center justify-between gap-2 w-full min-w-[140px]">
          <Wifi className="text-[#47c0f9] w-6 h-6" />
          <span className="flex-1 ml-2 text-gray-800 font-semibold text-sm">Online</span>
          <span className="h-3 w-3 rounded-full bg-green-400 inline-block"></span>
        </div>
      ),
    },
    {
      key: "eco",
      content: (
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-row items-center gap-2 w-full min-w-[120px]">
          <Leaf className="text-[#43a047] w-7 h-7" />
          <span className="flex-1 font-semibold text-[#43a047] text-sm">Modo Eco</span>
          <button className="bg-[#43a047] text-white px-3 py-1 rounded font-semibold hover:bg-[#357a38] transition text-xs">
            Ativar
          </button>
        </div>
      ),
    },
    {
      key: "presenca",
      content: (
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-row items-center gap-2 w-full min-w-[120px]">
          <UserCheck className="text-[#2786b6] w-7 h-7" />
          <div>
            <span className="font-semibold text-gray-800 text-sm">Pessoas próximas: 3</span>
            <div className="text-gray-500 text-xs">Detectadas via sensor</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-[#d7f3fe] via-[#f0f8fd] to-[#cde5f6] font-poppins">
      {isVisible && (
        <div className="relative w-full overflow-hidden bg-[#D362AF] px-4 py-4 sm:px-6 sm:py-5 shadow-lg z-20">
          {/* ...bubbles decorativas */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 h-40 w-40 animate-pulse rounded-full bg-white opacity-10"></div>
            <div className="absolute top-5 right-10 h-16 w-16 animate-bounce rounded-full bg-white opacity-10 delay-300"></div>
            <div className="absolute bottom-4 left-1/3 h-14 w-14 animate-ping rounded-full bg-white opacity-10 [animation-duration:3s]"></div>
            <div className="absolute -right-10 -bottom-10 h-28 w-28 animate-pulse rounded-full bg-white opacity-10 delay-700"></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <Sun className="h-12 w-12 text-white animate-spin hidden md:block" style={{ animationDuration: "9000ms" }} />
              <div className="space-y-1 text-center md:text-left">
                <span className="inline-flex animate-pulse rounded-md bg-white px-3 py-1 text-xs sm:text-sm font-bold text-[#D362AF] shadow-sm">25% OFF PARA ESCOLAS</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">Dashboard de Refrigeração Inteligente</h3>
                <p className="text-xs sm:text-base font-medium text-white/90">
                  Use o código{" "}
                  <span className="rounded bg-white/20 px-2 py-0.5 font-bold tracking-wider text-white">
                    SPRING25
                  </span>{" "}
                  para ativar descontos!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 mt-3 md:mt-0">
              <button
                onClick={copyPromoCode}
                className="relative rounded-md border-2 border-[#D362AF] bg-white px-4 py-2 text-sm sm:text-base font-medium text-[#D362AF] backdrop-blur-sm transition-all hover:bg-white/80 focus:ring-2 focus:ring-white/50 focus:outline-none"
              >
                <span className={`transition-opacity ${copied ? "opacity-0" : "opacity-100"}`}>
                  Copiar código
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

      <div className="flex-1 w-full h-full overflow-auto px-2 py-6 sm:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 min-h-[70vh] items-start">
          {cards.map((card) => (
            <div key={card.key} className="w-full">{card.content}</div>
          ))}
        </div>
      </div>
    </div>
  );
}