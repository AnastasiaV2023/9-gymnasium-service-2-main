import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "@/api/api.auth";

const PrivateRoute: React.FC = () => {
  const isAuthenticated = AuthService.isAuthenticated();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
  
export default PrivateRoute; 