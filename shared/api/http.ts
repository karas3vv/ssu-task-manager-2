import axios, { AxiosError, AxiosInstance } from "axios";
import { ApiError } from "@shared/types/api";

export const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const message = error.response?.data?.message ?? "Не удалось выполнить запрос";

    return Promise.reject(new Error(message));
  }
);
