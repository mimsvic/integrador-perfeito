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

  // Função para alternar o estado dos dispositivos
  const toggleSwitch = (deviceKey) => {
    if (deviceKey === "smartLight") setSmartLight((v) => !v);
    if (deviceKey === "smartAC") setSmartAC((v) => !v);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-poppins bg-white ">
      <div className="flex flex-row gap-16 items-start w-full max-w-7xl mx-auto min-h-screen py-12">
        {/* Controls */}
        <div className="flex flex-col gap-10 w-[370px]">
          {/* Intensity */}
          <div>
            <div className="flex justify-between items-center mb-1 pt-32">
              <span className="font-semibold text-gray-700 text-lg">Intensity</span>
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
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>Off</span>
              <span>100%</span>
            </div>
          </div>

          {/* Power Switch & Color */}
          <div className="flex items-center gap-10">
            <div>
              <span className="font-semibold text-gray-700 text-lg">Power</span>
              <label className="relative inline-flex items-center cursor-pointer ml-2">
                <input
                  type="checkbox"
                  checked={power}
                  onChange={() => setPower((v) => !v)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#FCAE39] transition"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
              </label>
            </div>
            <div>
              <span className="font-semibold text-gray-700 text-lg">Color</span>
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
            <div className="font-semibold text-gray-700 mb-1 text-lg">Tone Glow</div>
            <div className="flex bg-gray-200 rounded-full overflow-hidden w-[220px]">
              <button
                className={`flex-1 px-5 py-2 ${
                  tone === "warm"
                    ? "bg-gray-800 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setTone("warm")}
              >
                Warm
              </button>
              <button
                className={`flex-1 px-5 py-2 ${
                  tone === "cold"
                    ? "bg-gray-800 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setTone("cold")}
              >
                Cold
              </button>
            </div>
            {/* Bola de intensidade logo abaixo do Tone Glow */}
            <div className="flex justify-center mt-10">
              <div className="relative w-48 h-48">
                <svg width="192" height="192">
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
                <span className="absolute left-0 top-1/2 -translate-y-1/2 font-semibold text-gray-600 text-md">
                  Low
                </span>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 font-semibold text-gray-600 text-md">
                  High
                </span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-gray-700 text-3xl">
                  {intensity}%
                </span>
              </div>
            </div>
          </div>

          {/* Novos elementos para preencher a tela */}
          <div className="flex flex-col gap-3 mt-8">
            <div className="p-4 rounded-xl bg-gray-100 flex items-center justify-between">
              <span className="font-semibold text-gray-800">Schedule</span>
              <button className="bg-[#FCAE39] px-4 py-1 rounded-full text-white font-semibold text-sm shadow hover:bg-[#e69e32] transition">
                Set
              </button>
            </div>
            <div className="p-4 rounded-xl bg-gray-100 flex items-center justify-between">
              <span className="font-semibold text-gray-800">Scenes</span>
              <div className="flex gap-2">
                <button className="bg-[#FCAE39] w-8 h-8 rounded-full shadow"></button>
                <button className="bg-blue-400 w-8 h-8 rounded-full shadow"></button>
                <button className="bg-green-400 w-8 h-8 rounded-full shadow"></button>
              </div>
            </div>
          </div>
        </div>

        {/* Lâmpada no topo */}
        <div className="flex-1 flex flex-col font-poppins bg-white">
          <div className="flex justify-center items-center h-[420px]">
            <img
              src={lampIcon}
              alt="Lamp"
              className="max-h-[420px] object-contain select-none"
              style={{
                filter: power
                  ? "brightness(1)"
                  : "brightness(0.5) grayscale(0.6)",
                transition: "filter 0.3s",
              }}
            />
          </div>
          {/* Adicionando elementos para preencher */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-[#f9f7f2] rounded-lg p-6 flex flex-col items-center shadow">
              <BsLightbulbFill className="text-[#fcb46f] text-3xl mb-2" />
              <span className="font-semibold text-lg text-gray-700">Ambient Mode</span>
              <span className="text-gray-500 text-sm">Soft, relaxing light</span>
            </div>
            <div className="bg-[#f9f7f2] rounded-lg p-6 flex flex-col items-center shadow">
              <FaThLarge className="text-[#242424] text-3xl mb-2" />
              <span className="font-semibold text-lg text-gray-700">Energy Saving</span>
              <span className="text-gray-500 text-sm">Optimal consumption</span>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <div className="bg-[#fdebc1] rounded-full px-5 py-2 shadow flex items-center gap-2">
              <IoIosPower className="text-[#FCAE39] text-xl" />
              <span className="text-gray-700 font-semibold">Status: {power ? "On" : "Off"}</span>
            </div>
          </div>
        </div>

        {/* Detalhes e botões */}
        <div className="flex flex-col gap-12 min-w-[190px] pt-32">
          {/* Card de energia */}
          <div className="flex flex-col items-center gap-3 bg-white shadow-md rounded-xl p-6 w-44">
            <div className="flex items-center gap-2">
              <IoIosPower className="text-gray-400 text-3xl" />
              <span className="w-8 h-8 rounded-full border-2 border-[#FCAE39] flex items-center justify-center">
                <span className="w-5 h-5 rounded-full bg-[#FCAE39] block"></span>
              </span>
            </div>
            <span className="font-bold text-gray-600 text-2xl">12Kw</span>
            <span className="text-gray-400 text-md">Hue</span>
          </div>

          {/* Ar condicionado */}
          <div
            className={`w-[150px] rounded-xl border border-gray-200 p-4 flex flex-col justify-between cursor-pointer transition-colors ${
              smartAC ? "bg-[#242424] border-[#242424]" : "bg-white border-gray-200"
            }`}
            onClick={() => toggleSwitch("smartAC")}
          >
            <div className="flex justify-between items-center mb-3">
              <span
                className={`text-[14px] font-semibold ${
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
            <div className="mb-2 flex justify-center">
              <img src={arIcon} alt="Air Conditioner" className="w-9 h-7" />
            </div>
            <span
              className={`font-medium text-md text-center ${
                smartAC ? "text-[#FCAE39]" : "text-gray-400"
              }`}
            >
              Air Conditioner
            </span>
          </div>

          {/* Luzes */}
          <div
            className={`w-[150px] rounded-xl border border-gray-200 p-4 flex flex-col justify-between cursor-pointer transition-colors ${
              smartLight ? "bg-[#FCAE39] border-[#FCAE39]" : "bg-white border-gray-200"
            }`}
            onClick={() => toggleSwitch("smartLight")}
          >
            <div className="flex justify-between items-center mb-3">
              <span
                className={`text-[14px] font-semibold ${
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
            <div className="mb-2 flex justify-center">
              <img src={lampadaIcon} alt="Lights" className="w-9 h-7" />
            </div>
            <span
              className={`font-medium text-md text-center ${
                smartLight ? "text-[#242424]" : "text-gray-400"
              }`}
            >
              Lights
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}