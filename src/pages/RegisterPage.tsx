import RegisterForm from "@/components/register-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Страница регистрации пользователя.
 * Использует RegisterForm для отображения формы регистрации.
 */
const RegisterPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem('access-token');
      if (token) navigate('/')
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