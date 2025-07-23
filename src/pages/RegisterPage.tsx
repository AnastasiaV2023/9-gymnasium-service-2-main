import RegisterForm from "@/components/register-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from '@/api/api.auth';

/**
 * Страница регистрации пользователя.
 * Использует RegisterForm для отображения формы регистрации.
 */
const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    if (AuthService.isAuthenticated()) {
      navigate('/'); // Перенаправляем на главную страницу, если уже авторизован
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage; 