import { Bell, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png"; 

export default function Header() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  const handleProfileClick = () => {
    navigate("/sobre"); 
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 w-full font-poppins bg-white relative z-50">
      
      {/* Search bar */}
      <div className="flex items-center w-1/5 bg-gray-100 rounded-full px-3 py-1.5">
        <svg
          className="w-4 h-4 text-gray-500 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-sm w-full text-gray-700"
        />
      </div>


      <div className="flex items-center space-x-6">

        <Settings
          onClick={toggleSettingsModal}
          className="w-6 h-6 text-gray-700 cursor-pointer transition-transform duration-500 transform hover:rotate-180 hover:text-blue-500"
        />


        <Bell
          onClick={toggleNotificationModal}
          className="w-6 h-6 text-gray-700 cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:text-yellow-500"
        />

   
        {isNotificationModalOpen && (
          <div className="absolute top-16 right-6 w-64 bg-white shadow-lg rounded-lg p-4 animate-fadeIn">
            <div className="text-lg font-semibold">Notificações</div>
            <p className="text-sm text-gray-600">Sem notificações por enquanto.</p>
          </div>
        )}


        {isSettingsModalOpen && (
          <div className="absolute top-16 right-6 w-64 bg-white shadow-lg rounded-lg p-4 animate-fadeIn">
            <div className="text-lg font-semibold">Configurações</div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">Alterar Senha</li>
              <li className="hover:text-blue-500 cursor-pointer">Notificações</li>
              <li className="hover:text-blue-500 cursor-pointer">Privacidade</li>
              <li className="hover:text-blue-500 cursor-pointer">Tema</li>
            </ul>
          </div>
        )}


        <div
          onClick={handleProfileClick}
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition"
        >
          <img
            src={avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-base font-semibold text-gray-800">Emily</span>
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
