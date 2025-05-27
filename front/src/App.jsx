import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import RightPanel from "./components/RightPanel";
import AboutMe from "./components/AboutMe";
import Refrigerador from  "./components/Refrigerador";
import SmartLight from "./components/SmartLight";
import DashboardUmidade from "./components/DashboardUmidade";
import Login from "./components/Login";
import Historico24h from "./components/Historico24h";
import Register from "./components/Register"

export default function App() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-1">
                  <MainContent />
                  <RightPanel />
                </div>
              }
            />
            <Route path="/sobre" element={<AboutMe />} />
            <Route path="/refrigerador" element={<Refrigerador/>} />
            <Route path="/smartlight" element={<SmartLight/>} />
            <Route path="/dashboardumidade" element={<DashboardUmidade/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/historico" element={<Historico24h />} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
