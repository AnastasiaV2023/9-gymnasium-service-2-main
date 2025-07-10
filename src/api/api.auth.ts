import type { AxiosResponse } from "axios";
import axios from "axios";

interface LoginRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
}

const AuthService = {
    login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return axios.post("https://dummyjson.com/auth/login", { username, password } as LoginRequest, {
            withCredentials: true
        });
    },
    
    refresh(): Promise<AxiosResponse<AuthResponse>> {
        return axios.post('https://dummyjson.com/auth/refresh', {
          refreshToken: localStorage.getItem("refreshToken"),
        }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
    },
};

export default AuthService; 