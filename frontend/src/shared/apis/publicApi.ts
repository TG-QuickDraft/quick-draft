import axios from "axios";

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});
