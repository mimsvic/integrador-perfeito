import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRouter;