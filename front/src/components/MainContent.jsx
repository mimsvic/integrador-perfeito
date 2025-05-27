import { useState } from "react";
import { Droplet, Thermometer, ChevronDown } from "lucide-react";
import group76 from "../assets/group76.svg";
import refrigeradorIcon from "../assets/refrigerador.svg";
import shapeIcon from "../assets/Shape.svg";
import arIcon from "../assets/arcondicionado.svg";
import lampadaIcon from "../assets/lampada.svg";

export default function MainContent() {
  const [currentRoom, setCurrentRoom] = useState("Living Room");
  const [showSettings, setShowSettings] = useState(false);

  const [roomStates, setRoomStates] = useState({
    "Living Room": {
      refrigeratorOn: true,
      temperatureOn: true,
      airConditionerOn: false,
      lightsOn: false,
    },
    Quarto: {
      refrigeratorOn: false,
      temperatureOn: false,
      airConditionerOn: false,
      lightsOn: true,
    },
    Cozinha: {
      refrigeratorOn: true,
      temperatureOn: false,
      airConditionerOn: false,
      lightsOn: true,
    },
    Sala: {
      refrigeratorOn: false,
      temperatureOn: true,
      airConditionerOn: true,
      lightsOn: false,
    },
  });

  const toggleSwitch = (deviceKey) => {
    setRoomStates((prev) => ({
      ...prev,
      [currentRoom]: {
        ...prev[currentRoom],
        [deviceKey]: !prev[currentRoom][deviceKey],
      },
    }));
  };

  const handleRoomChange = (roomName) => {
    setCurrentRoom(roomName);
    setShowSettings(false);
  };

  const { refrigeratorOn, temperatureOn, airConditionerOn, lightsOn } =
    roomStates[currentRoom];

  return (
    <div className="flex-1 px-6 py-4 font-poppins bg-white">
      <div className="w-full max-w-[800px]">
        <div className="relative w-full h-auto">
          <img
            src={group76}
            alt="Group 76"
            className="w-full h-auto md:w-[80%] lg:w-[85%] sm:w-full"
          />
        </div>

        <div className="mt-2 flex justify-start">
          <div className="flex items-center text-gray-700 text-sm space-x-4 pt-5">
            <div className="flex items-center space-x-1">
              <Droplet className="w-5 h-5" />
              <span>35%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Thermometer className="w-5 h-5" />
              <span>15°C</span>
            </div>

            <div className="relative">
              <div
                className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 cursor-pointer"
                onClick={() => setShowSettings(!showSettings)}
              >
                {currentRoom}
                <ChevronDown className="w-5 h-5 ml-1" />
              </div>

              {showSettings && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <ul className="py-2 text-sm text-gray-700">
                    <li
                      onClick={() => handleRoomChange("Quarto")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Sala Admin
                    </li>
                    <li
                      onClick={() => handleRoomChange("Cozinha")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Lab1
                    </li>
                    <li
                      onClick={() => handleRoomChange("Sala")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Lab2
                    </li>
                    <li
                      onClick={() => handleRoomChange("Living Room")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Lab3
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Senai City</h2>

        {/* Cards pequenos */}
        <div className="flex flex-wrap gap-4 mt-8 justify-start">
          {/* Refrigerador */}
          <div
            className="w-[130px] sm:w-[150px] rounded-xl border border-gray-200 bg-white p-3 flex flex-col justify-between cursor-pointer"
            onClick={() => toggleSwitch("refrigeratorOn")}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[12px] font-semibold text-gray-700">
                {refrigeratorOn ? "ON" : "OFF"}
              </span>
              <div
                className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${
                  refrigeratorOn ? "bg-orange-400" : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 bg-white rounded-full transition-all ${
                    refrigeratorOn ? "ml-auto" : ""
                  }`}
                ></div>
              </div>
            </div>
            <div className="mb-2">
              <img src={refrigeradorIcon} alt="Refrigerator" className="w-7" />
            </div>
            <span className="font-medium text-sm text-gray-900">Refrigerator</span>
          </div>

          {/* Temperatura */}
          <div
            className="w-[130px] sm:w-[150px] rounded-xl p-3 text-white flex flex-col justify-between cursor-pointer"
            style={{ backgroundColor: temperatureOn ? "#0075E3" : "#d1d5db" }}
            onClick={() => toggleSwitch("temperatureOn")}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[12px] font-semibold">
                {temperatureOn ? "ON" : "OFF"}
              </span>
              <div className="w-8 h-4 bg-white rounded-full flex items-center p-0.5">
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-all ${
                    temperatureOn ? "ml-auto" : ""
                  }`}
                  style={{
                    backgroundColor: temperatureOn ? "#8AC0FF" : "#e5e7eb",
                  }}
                ></div>
              </div>
            </div>
            <div className="mb-2">
              <img src={shapeIcon} alt="Temperature" className="w-7 h-5" />
            </div>
            <span className="font-medium text-sm">Temperature</span>
          </div>

          {/* Ar condicionado */}
          <div
            className="w-[130px] sm:w-[150px] rounded-xl border border-gray-200 bg-white p-3 flex flex-col justify-between cursor-pointer"
            onClick={() => toggleSwitch("airConditionerOn")}
          >
            <div className="flex justify-between items-center mb-3">
              <span
                className={`text-[12px] font-semibold ${
                  airConditionerOn ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {airConditionerOn ? "ON" : "OFF"}
              </span>
              <div
                className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${
                  airConditionerOn ? "bg-[#9D8EF8]" : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 bg-white rounded-full transition-all ${
                    airConditionerOn ? "ml-auto" : ""
                  }`}
                ></div>
              </div>
            </div>
            <div className="mb-2">
              <img src={arIcon} alt="Air Conditioner" className="w-7 h-5" />
            </div>
            <span
              className={`font-medium text-sm ${
                airConditionerOn ? "text-gray-900" : "text-gray-400"
              }`}
            >
              Air Conditioner
            </span>
          </div>

          {/* Luzes */}
          <div
            className="w-[130px] sm:w-[150px] rounded-xl border border-gray-200 bg-white p-3 flex flex-col justify-between cursor-pointer"
            onClick={() => toggleSwitch("lightsOn")}
          >
            <div className="flex justify-between items-center mb-3">
              <span
                className={`text-[12px] font-semibold ${
                  lightsOn ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {lightsOn ? "ON" : "OFF"}
              </span>
              <div
                className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${
                  lightsOn ? "bg-yellow-400" : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 bg-white rounded-full transition-all ${
                    lightsOn ? "ml-auto" : ""
                  }`}
                ></div>
              </div>
            </div>
            <div className="mb-2">
              <img src={lampadaIcon} alt="Lights" className="w-7 h-5" />
            </div>
            <span
              className={`font-medium text-sm ${
                lightsOn ? "text-gray-900" : "text-gray-400"
              }`}
            >
              Lights
            </span>
          </div>
        </div>

        {/* Card grande abaixo */}
        <div className="mt-8 w-full max-w-full bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Informações do cômodo: {currentRoom}
          </h3>
          <p className="text-sm text-gray-700">
            Aqui você pode monitorar os dispositivos ligados e o clima do ambiente.
          </p>
          <ul className="mt-4 text-sm text-gray-600 space-y-1">
            <li>
              Refrigerador:{" "}
              <span className="font-semibold">
                {refrigeratorOn ? "Ligado" : "Desligado"}
              </span>
            </li>
            <li>
              Temperatura:{" "}
              <span className="font-semibold">
                {temperatureOn ? "Ligada" : "Desligada"}
              </span>
            </li>
            <li>
              Ar Condicionado:{" "}
              <span className="font-semibold">
                {airConditionerOn ? "Ligado" : "Desligado"}
              </span>
            </li>
            <li>
              Luzes:{" "}
              <span className="font-semibold">
                {lightsOn ? "Ligadas" : "Desligadas"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
