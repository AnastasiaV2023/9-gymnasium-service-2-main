import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

export const instance: AxiosInstance = axios.create({
  // к запросу будет приуепляться cookies
  withCredentials: true,
  baseURL: 'http://localhost:5000/api/',
});

// создаем перехватчик ответов
// который в случае невалидного accessToken попытается его обновить
// и переотправить запрос с обновленным accessToken
instance.interceptors.response.use(
  // в случае валидного accessToken ничего не делаем:
  (response: AxiosResponse) => {
    return response;
  },
  // в случае просроченного accessToken пытаемся его обновить:
  async (error) => {
   // предотвращаем зацикленный запрос, добавляя свойство _isRetry 
   const originalRequest = {...error.config};
   originalRequest._isRetry = true; 
    if (
      // проверим, что ошибка именно из-за невалидного accessToken
      error.response?.status === 401 && 
      // проверим, что запрос не повторный
      error.config &&
      !error.config._isRetry
    ) {
      try {
        // запрос на обновление токенов
        await instance.get("/auth/refresh");
        // Сервер автоматически обновит httpOnly cookies
        // переотправляем запрос с обновленными cookies
        return instance.request(originalRequest);
      } catch {
        console.log("AUTH ERROR");
      }
    }
    // на случай, если возникла другая ошибка (не связанная с авторизацией)
    // пробросим эту ошибку 
    throw error;
  }
); 