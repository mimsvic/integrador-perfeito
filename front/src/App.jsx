import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./pages/MainContent";
import RightPanel from "./components/RightPanel";
import AboutMe from "./pages/AboutMe";
import Refrigerador from "./pages/Refrigerador";
import SmartLight from "./pages/SmartLight";
import DashboardUmidade from "./pages/DashboardUmidade";
import Login from "./pages/Login";
import Historico24h from "./pages/Historico24h";
import Register from "./pages/Register";
import PrivateRouter from "./components/PrivateRouter";
import AmbientesPage from "./pages/Ambientes";

export default function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"]; // Adicione mais rotas se quiser esconder o Header em outras páginas

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        {!hideHeaderRoutes.includes(location.pathname) && <Header />}
        <div className="flex flex-1 overflow-hidden">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRouter>
                  <div className="flex flex-1">
                    <MainContent />
                    <RightPanel />
                  </div>
                </PrivateRouter>
              }
            />
            <Route path="/sobre" element={<AboutMe />} />
            <Route path="/refrigerador" element={<Refrigerador />} />
            <Route path="/smartlight" element={<SmartLight />} />
            <Route path="/dashboardumidade" element={<DashboardUmidade />} />
            <Route path="/login" element={<Login />} />
            <Route path="/historico" element={<Historico24h />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ambientes" element={<AmbientesPage/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}