'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import group76 from "../assets/group76.svg";
import somIcon from "../assets/som.svg";
import shapeIcon from "../assets/Shape.svg";
import routerIcon from "../assets/router.svg";
import lampadaIcon from "../assets/lampada.svg";
import BarChart from "../components/BarChart";


const ROTATION_RANGE = 5;
const PERSPECTIVE = 400;

export default function CreditCard02() {
  const [currentRoom, setCurrentRoom] = useState('ON');
  const [showSettings, setShowSettings] = useState(false);

  const [somOn, setSomOn] = useState(false);
  const [temperatureOn, setTemperatureOn] = useState(false);
  const [routerOn, setRouterOn] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [ROTATION_RANGE, -ROTATION_RANGE]);
  const rotateY = useTransform(x, [-50, 50], [-ROTATION_RANGE, ROTATION_RANGE]);

  const handleMove = (clientX, clientY, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseMove = (event) => {
    handleMove(event.clientX, event.clientY, event.currentTarget);
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    handleMove(touch.clientX, touch.clientY, event.currentTarget);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleRoomChange = (room) => {
    setCurrentRoom(room);
    setShowSettings(false);
    const turnOn = room === 'ON';
    setSomOn(turnOn);
    setTemperatureOn(turnOn);
    setRouterOn(turnOn);
    setLightsOn(turnOn);
  };

  const toggleSwitch = (device) => {
    switch (device) {
      case 'somOn':
        setSomOn(!somOn);
        break;
      case 'temperatureOn':
        setTemperatureOn(!temperatureOn);
        break;
      case 'routerOn':
        setRouterOn(!routerOn);
        break;
      case 'lightsOn':
        setLightsOn(!lightsOn);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex-1 px-6 py-4 font-poppins bg-white">
      <div className="w-full max-w-[800px]">
        <div className="mt-2 flex justify-start">
          <div className="flex items-center text-gray-700 text-sm space-x-4 pt-5">
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">My Devices</h2>
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
                    {['ON', 'OFF'].map((room) => (
                      <li
                        key={room}
                        onClick={() => handleRoomChange(room)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {room}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cards de controle */}
        <div className="flex flex-wrap gap-4 mt-8 justify-start">
          {/* Música */}
          <div
            className="w-[230px] sm:w-[250px] rounded-xl border border-gray-200 bg-[#EC5A55] p-3 flex flex-col justify-between cursor-pointer"
            onClick={() => toggleSwitch("somOn")}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[12px] font-semibold text-white">
                {somOn ? "ON" : "OFF"}
              </span>
              <div className="w-8 h-4 bg-white rounded-full flex items-center p-0.5">
                <div className={`w-3.5 h-3.5 rounded-full transition-all ${somOn ? "ml-auto bg-[#EC5A55]" : "bg-gray-300"}`} />
              </div>
            </div>
            <div className="mb-2">
              <img src={somIcon} alt="Music" className="w-7" />
            </div>
            <span className="font-medium text-sm text-white">Music</span>
          </div>

          {/* Temperatura */}
          <div
            className="w-[230px] sm:w-[250px] rounded-xl p-3 text-white flex flex-col justify-between cursor-pointer"
            style={{
              backgroundColor: temperatureOn ? "#3DCC65" : "#d1d5db",
            }}
            onClick={() => toggleSwitch("temperatureOn")}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[12px] font-semibold">{temperatureOn ? "ON" : "OFF"}</span>
              <div className="w-8 h-4 bg-white rounded-full flex items-center p-0.5">
                <div className={`w-3.5 h-3.5 rounded-full transition-all ${temperatureOn ? "ml-auto bg-[#3DCC65]" : "bg-gray-300"}`} />
              </div>
            </div>
            <div className="mb-2">
              <img src={shapeIcon} alt="Temperature" className="w-7 h-5" />
            </div>
            <span className="font-medium text-sm">Temperatura</span>
          </div>

          {/* Roteador */}
          <div
            className="w-[230px] sm:w-[250px] rounded-xl border border-gray-200 bg-[#3ACBE9] p-3 flex flex-col justify-between cursor-pointer"
            onClick={() => toggleSwitch("routerOn")}
          >
            <div className="flex justify-between items-center mb-3">
              <span className={`text-[12px] font-semibold ${routerOn ? "text-white" : "text-gray-400"}`}>
                {routerOn ? "ON" : "OFF"}
              </span>
              <div className="w-8 h-4 bg-white rounded-full flex items-center p-0.5">
                <div className={`w-3.5 h-3.5 rounded-full transition-all ${routerOn ? "ml-auto bg-[#3ACBE9]" : "bg-gray-300"}`} />
              </div>
            </div>
            <div className="mb-2">
              <img src={routerIcon} alt="Router" className="w-7 h-5" />
            </div>
            <span className={`font-medium text-sm ${routerOn ? "text-white" : "text-gray-400"}`}>
              Router
            </span>
          </div>

          {/* Luzes */}
          <div
            className={`w-[230px] sm:w-[250px] rounded-xl border border-gray-200 p-3 flex flex-col justify-between cursor-pointer ${
              lightsOn ? "bg-[#8C5EEE]" : "bg-white"
            }`}
            onClick={() => toggleSwitch("lightsOn")}
          >
            <div className="flex justify-between items-center mb-3">
              <span className={`text-[12px] font-semibold ${lightsOn ? "text-white" : "text-gray-400"}`}>
                {lightsOn ? "ON" : "OFF"}
              </span>
              <div className="w-8 h-4 bg-white rounded-full flex items-center p-0.5">
                <div className={`w-3.5 h-3.5 rounded-full transition-all ${lightsOn ? "ml-auto bg-[#9D8EF8]" : "bg-gray-300"}`} />
              </div>
            </div>
            <div className="mb-2">
            <img
                src={lampadaIcon}
                alt="Luzes"
                className={`w-7 h-5 ${lightsOn ? "brightness-0 invert" : "brightness-75"}`}
/>

            </div>
            <span className={`font-medium text-sm ${lightsOn ? "text-white" : "text-gray-400"}`}>
              Luzes
            </span>
          </div>
        </div>
            <BarChart />
      </div>
    </div>
  );
}
