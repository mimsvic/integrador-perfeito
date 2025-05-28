"use client";
import { useState } from "react";
import { IoIosPower } from "react-icons/io";
import { BsLightbulbFill } from "react-icons/bs";
import { FaThLarge } from "react-icons/fa";
import lampIcon from "../assets/lamp.svg";
import arIcon from "../assets/arcondicionado.svg";
import lampadaIcon from "../assets/Light.svg";

export default function SmartLight() {
  const [intensity, setIntensity] = useState(35);
  const [tone, setTone] = useState("warm");
  const [power, setPower] = useState(false);
  const [smartLight, setSmartLight] = useState(true);
  const [smartAC, setSmartAC] = useState(false);

  const toggleSwitch = (deviceKey) => {
    if (deviceKey === "smartLight") setSmartLight((v) => !v);
    if (deviceKey === "smartAC") setSmartAC((v) => !v);
  };

  return (
    <div className="w-full min-h-screen bg-white font-poppins flex flex-col items-center py-4 px-2 sm:px-0">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 lg:gap-16 items-stretch justify-center">
        {/* Left (controls) */}
        <div className="flex flex-col gap-8 w-full lg:w-[370px] pt-2 lg:pt-32">
          {/* Intensity */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-700 text-base sm:text-lg">Intensidade</span>
              <span className="text-gray-500 text-md">{intensity}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-yellow-400"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Desligado</span>
              <span>100%</span>
            </div>
          </div>
          {/* Power and Color */}
          <div className="flex flex-col xs:flex-row items-center gap-4 xs:gap-10">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 text-base">Power</span>
              <label className="relative inline-flex items-center cursor-pointer ml-2">
                <input
                  type="checkbox"
                  checked={power}
                  onChange={() => setPower((v) => !v)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#FCAE39] transition"></div>
                <div className="absolute left-1 top-0.5 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
              </label>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 text-base">Cor</span>
              <button className="ml-2">
                <span
                  className="w-7 h-7 rounded-full border border-gray-200 inline-block"
                  style={{
                    background:
                      "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
                  }}
                ></span>
              </button>
            </div>
          </div>
          {/* Tone Glow */}
          <div>
            <div className="font-semibold text-gray-700 mb-1 text-base">Tom da Luz</div>
            <div className="flex bg-gray-200 rounded-full overflow-hidden w-full max-w-xs mx-auto">
              <button
                className={`flex-1 px-3 py-2 text-sm ${
                  tone === "warm"
                    ? "bg-gray-800 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setTone("warm")}
              >
                Quente
              </button>
              <button
                className={`flex-1 px-3 py-2 text-sm ${
                  tone === "cold"
                    ? "bg-gray-800 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setTone("cold")}
              >
                Frio
              </button>
            </div>
            {/* Intensity Circle */}
            <div className="flex justify-center mt-8">
              <div className="relative w-32 h-32 sm:w-48 sm:h-48">
                <svg width="100%" height="100%" viewBox="0 0 192 192">
                  <circle
                    cx="96"
                    cy="96"
                    r="76"
                    stroke="#fcd79f"
                    strokeWidth="20"
                    fill="none"
                    opacity="0.4"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="76"
                    stroke="#fcb46f"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 76}
                    strokeDashoffset={2 * Math.PI * 76 * (1 - intensity / 100)}
                    strokeLinecap="round"
                    style={{
                      transition: "stroke-dashoffset 0.4s",
                    }}
                  />
                </svg>
                <span className="absolute left-0 top-1/2 -translate-y-1/2 font-semibold text-gray-600 text-xs sm:text-md">
                  Baixo
                </span>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 font-semibold text-gray-600 text-xs sm:text-md">
                  Alto
                </span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-gray-700 text-2xl sm:text-3xl">
                  {intensity}%
                </span>
              </div>
            </div>
          </div>
          {/* Schedule and Scenes */}
          <div className="flex flex-col gap-3 mt-6">
            <div className="p-3 rounded-xl bg-gray-100 flex items-center justify-between">
              <span className="font-semibold text-gray-800 text-sm">Agendar</span>
              <button className="bg-[#FCAE39] px-4 py-1 rounded-full text-white font-semibold text-xs shadow hover:bg-[#e69e32] transition">
                Definir
              </button>
            </div>
            <div className="p-3 rounded-xl bg-gray-100 flex items-center justify-between">
              <span className="font-semibold text-gray-800 text-sm">Cenas</span>
              <div className="flex gap-2">
                <button className="bg-[#FCAE39] w-7 h-7 rounded-full shadow"></button>
                <button className="bg-blue-400 w-7 h-7 rounded-full shadow"></button>
                <button className="bg-green-400 w-7 h-7 rounded-full shadow"></button>
              </div>
            </div>
          </div>
        </div>
        {/* Center (lamp) */}
        <div className="flex-1 flex flex-col items-center justify-start">
          <div className="flex justify-center items-center h-52 sm:h-[420px]">
            <img
              src={lampIcon}
              alt="Lamp"
              className="max-h-52 sm:max-h-[420px] object-contain select-none"
              style={{
                filter: power
                  ? "brightness(1)"
                  : "brightness(0.5) grayscale(0.6)",
                transition: "filter 0.3s",
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 w-full max-w-md">
            <div className="bg-[#f9f7f2] rounded-lg p-4 sm:p-6 flex flex-col items-center shadow">
              <BsLightbulbFill className="text-[#fcb46f] text-2xl sm:text-3xl mb-2" />
              <span className="font-semibold text-base text-gray-700">Modo Ambiente</span>
              <span className="text-gray-500 text-xs sm:text-sm">Luz suave e relaxante</span>
            </div>
            <div className="bg-[#f9f7f2] rounded-lg p-4 sm:p-6 flex flex-col items-center shadow">
              <FaThLarge className="text-[#242424] text-2xl sm:text-3xl mb-2" />
              <span className="font-semibold text-base text-gray-700">Economia</span>
              <span className="text-gray-500 text-xs sm:text-sm">Consumo otimizado</span>
            </div>
          </div>
          <div className="flex justify-center mt-6 sm:mt-8">
            <div className="bg-[#fdebc1] rounded-full px-4 sm:px-5 py-1.5 sm:py-2 shadow flex items-center gap-2">
              <IoIosPower className="text-[#FCAE39] text-lg sm:text-xl" />
              <span className="text-gray-700 font-semibold text-sm sm:text-base">
                Status: {power ? "Ligado" : "Desligado"}
              </span>
            </div>
          </div>
        </div>
        {/* Right (side gadgets) */}
        <div className="flex flex-row lg:flex-col gap-4 sm:gap-12 min-w-0 justify-center items-center pt-4 lg:pt-32">
          <div className="flex flex-col items-center gap-2 bg-white shadow-md rounded-xl p-4 sm:p-6 w-32 sm:w-44">
            <div className="flex items-center gap-2">
              <IoIosPower className="text-gray-400 text-2xl sm:text-3xl" />
              <span className="w-7 h-7 rounded-full border-2 border-[#FCAE39] flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-[#FCAE39] block"></span>
              </span>
            </div>
            <span className="font-bold text-gray-600 text-lg sm:text-2xl">12Kw</span>
            <span className="text-gray-400 text-xs sm:text-md">Hue</span>
          </div>
          <div
            className={`w-28 sm:w-[150px] rounded-xl border border-gray-200 p-3 sm:p-4 flex flex-col justify-between cursor-pointer transition-colors ${
              smartAC ? "bg-[#242424] border-[#242424]" : "bg-white border-gray-200"
            }`}
            onClick={() => toggleSwitch("smartAC")}
          >
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span
                className={`text-xs sm:text-[14px] font-semibold ${
                  smartAC ? "text-[#FCAE39]" : "text-gray-400"
                }`}
              >
                {smartAC ? "ON" : "OFF"}
              </span>
              <div
                className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${
                  smartAC ? "bg-[#FCAE39]" : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 bg-white rounded-full transition-all ${
                    smartAC ? "ml-auto" : ""
                  }`}
                ></div>
              </div>
            </div>
            <div className="mb-1 sm:mb-2 flex justify-center">
              <img src={arIcon} alt="Air Conditioner" className="w-7 h-7 sm:w-9 sm:h-7" />
            </div>
            <span
              className={`font-medium text-xs sm:text-md text-center ${
                smartAC ? "text-[#FCAE39]" : "text-gray-400"
              }`}
            >
              Ar Condicionado
            </span>
          </div>
          <div
            className={`w-28 sm:w-[150px] rounded-xl border border-gray-200 p-3 sm:p-4 flex flex-col justify-between cursor-pointer transition-colors ${
              smartLight ? "bg-[#FCAE39] border-[#FCAE39]" : "bg-white border-gray-200"
            }`}
            onClick={() => toggleSwitch("smartLight")}
          >
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span
                className={`text-xs sm:text-[14px] font-semibold ${
                  smartLight ? "text-[#242424]" : "text-gray-400"
                }`}
              >
                {smartLight ? "ON" : "OFF"}
              </span>
              <div
                className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${
                  smartLight ? "bg-[#242424]" : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 bg-white rounded-full transition-all ${
                    smartLight ? "ml-auto" : ""
                  }`}
                ></div>
              </div>
            </div>
            <div className="mb-1 sm:mb-2 flex justify-center">
              <img src={lampadaIcon} alt="Lights" className="w-7 h-7 sm:w-9 sm:h-7" />
            </div>
            <span
              className={`font-medium text-xs sm:text-md text-center ${
                smartLight ? "text-[#242424]" : "text-gray-400"
              }`}
            >
              Luzes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}