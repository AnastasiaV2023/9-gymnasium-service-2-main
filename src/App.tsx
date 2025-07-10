import { useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import PrivateRoute from "@/privateRoute";
import UsersPage from "@/pages/UsersPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import UserPage from "@/pages/UserPage";
import AccountPage from "@/pages/AccountPage";
import { useAppDispatch } from "@/store/hooks";
// import { checkAuth } from "@/store/authSlice";
import { Toaster } from "@/components/ui/sonner";

/**
 * Главный компонент приложения.
 * Содержит роутинг и глобальные эффекты (например, проверка авторизации).
 */
const App = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    // АВТОМАТИЧЕСКИЙ ЛОГИН, КОТОРЫЙ НАДО УБРАТЬ, ЧТОБЫ ИСПОЛЬЗОВАТЬ API
    localStorage.setItem('access-token', 'ssssssssssssssssssssss')
    
    // // Проверяем авторизацию только если есть токен
    // const token = localStorage.getItem("access-token");
    // if (token) {
    //   dispatch(checkAuth());
    // }
  }, [dispatch]);
 
    return (
    <BrowserRouter>
        <Routes>
            {/* Редирект с / на /users */}
            <Route path="/" element={<Navigate to="/users" replace />} />
            {/* Страницы, для которых не требуется авторизация */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Страницы, для которых требуется авторизация */}
            <Route path="/users" element={<PrivateRoute  />}>
                <Route path="" element={<UsersPage />} />
                <Route path=":id" element={<UserPage />} />
            </Route>
            <Route path="/account" element={<PrivateRoute />}>
                <Route path="" element={<AccountPage />} />
            </Route>
            {/* 404 */}
            <Route path="*" element={<div>404... not found </div>} />
        </Routes>
        <Toaster />
    </BrowserRouter>
   );
};

export default App;