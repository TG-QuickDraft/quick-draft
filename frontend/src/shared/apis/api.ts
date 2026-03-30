import axios from "axios";
import { localStorageKeys } from "../utils/storageKeys";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
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
      localStorage.removeItem(localStorageKeys.accessToken);

      setTimeout(() => {
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/login"
        )
          window.location.href = "/login";
      }, 0);
    }

    return Promise.reject(error);
  },
);

export default api;
