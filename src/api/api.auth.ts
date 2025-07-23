import type { AxiosResponse } from "axios";
import axios from "axios";
import { cookieUtils } from "@/utils/cookies";

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: number;
  };
  refreshToken?: string;
  accessToken?: string;
  message?: string;
}

const AuthService = {
    login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return axios.post("http://localhost:5000/api/auth/login", { email, password } as LoginRequest, {
            withCredentials: true
        });
    },
    
    refresh(): Promise<AxiosResponse<AuthResponse>> {
        return axios.get('http://localhost:5000/api/auth/refresh', {
          withCredentials: true
        });
    },

    logout(): Promise<AxiosResponse<{ message: string }>> {
        return axios.post('http://localhost:5000/api/auth/logout', {}, {
            withCredentials: true
        });
    },

    register(email: string,
      password: string,
      fullName: string,
      graduationYear: number,
      classLetter: string,
      messageToGraduates: string,
      messageToStudents: string,
      occupation: string ) : Promise<AxiosResponse<AuthResponse>> {
        return axios.post('http://localhost:5000/api/auth/register', {
          email,
          password,
          fullName,
          graduationYear,
          classLetter,
          messageToGraduates,
          messageToStudents,
          occupation,
        }, {
            withCredentials: true
        })
    },

    // Проверить авторизацию по наличию cookie
    isAuthenticated(): boolean {
        return cookieUtils.hasCookie('accessToken') || cookieUtils.hasCookie('jwtToken');
    },

    // Получить ID пользователя из cookie
    getUserId(): string | null {
        return cookieUtils.getCookie('user-id');
    }

};


export default AuthService; 