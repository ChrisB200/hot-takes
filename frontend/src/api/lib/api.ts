import axios, { type AxiosInstance } from "axios";
import { API_URL } from "@/utils/constants";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers = config.headers || {};
    if (!config.headers.Authorization && !config.headers["authorization"]) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
