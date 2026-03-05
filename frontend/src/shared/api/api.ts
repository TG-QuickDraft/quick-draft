import { logout } from "@/features/auth/api/auth.api";
import axios from "axios";
import { localStorageKeys } from "../utils/localStorageKeys";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(localStorageKeys.accessToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      setTimeout(() => {
        logout();
        if (typeof window !== "undefined") window.location.href = "/";
      }, 0);
    }

    return Promise.reject(error);
  },
);

export default api;
