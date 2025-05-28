
import React, { useState } from 'react';
import thermometer from '../assets/mode.svg';
import snowflake from '../assets/mode (2).svg';
import heating from '../assets/mode (1).svg';

export default function Thermostat() {
  const [isOn, setIsOn] = useState(false);
  const [mode, setMode] = useState('cool');

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-64">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Thermostat</h2>
        <div className="flex items-center space-x-2">
          <button
            className={`w-10 h-6 rounded-full ${isOn ? 'bg-orange-400' : 'bg-gray-300'} relative`}
            onClick={() => setIsOn(!isOn)}
          >
            <span
              className={`block w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform ${
                isOn ? 'translate-x-4' : ''
              }`}
            ></span>
          </button>
          <span className="text-sm text-gray-400">Edit</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <img src={thermometer} alt="Thermometer" className="w-5 h-5 text-blue-500" />
        <span className="text-gray-500 text-lg">25°C</span>
      </div>

      <div className="flex justify-around">
        <button
          onClick={() => setMode('cool')}
          className={`flex flex-col items-center ${
            mode === 'cool' ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              mode === 'cool' ? 'bg-blue-100' : 'bg-gray-100'
            }`}
          >
            <img src={snowflake} alt="Cool" className="w-6 h-6" />
          </div>
          <span className="text-sm mt-1">Cool</span>
        </button>

        <button
          onClick={() => setMode('heating')}
          className={`flex flex-col items-center ${
            mode === 'heating' ? 'text-orange-500' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              mode === 'heating' ? 'bg-orange-100' : 'bg-gray-100'
            }`}
          >
            <img src={heating} alt="Heating" className="w-6 h-6" />
          </div>
          <span className="text-sm mt-1">Heating</span>
        </button>
      </div>
    </div>
  );
}
