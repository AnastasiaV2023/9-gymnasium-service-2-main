import type { AxiosResponse } from "axios";
import axios from "axios";

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
}

const AuthService = {
    login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return axios.post("http://localhost:5000/api/auth/login", { email, password } as LoginRequest, {
            withCredentials: true
        });
    },
    
    refresh(): Promise<AxiosResponse<AuthResponse>> {
        return axios.post('http://localhost:5000/api/auth/refresh', {
          refreshToken: localStorage.getItem("refresh-token"),
        }, {
          headers: { 'Content-Type': 'application/json' },
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
        })
    },

};


export default AuthService; 