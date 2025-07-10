import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const PrivateRoute: React.FC = () => {
  const { isAuth, isAuthInProgress } = useAppSelector(state => state.auth);
  const token = localStorage.getItem("access-token");

  // Если нет токена, сразу перенаправляем на логин
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Если есть токен, но авторизация в процессе
  if (isAuthInProgress) {
    return <div>Checking auth...</div>;
  }

  // Если авторизован
  if (isAuth) {
    return <Outlet/>
  } else {
    return <Navigate to="/login" />;
  }
};
  
export default PrivateRoute; 