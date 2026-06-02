import axios from "axios";
import { ApiError } from "./ApiError";

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});

publicApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(new ApiError(error));
  }
);