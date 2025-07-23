import LoginForm from "@/components/login-form"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from '@/api/api.auth';

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate('/users');
    }
  }, [navigate])
  
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage;
