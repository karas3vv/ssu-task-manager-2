import axios, { AxiosInstance } from "axios";

export const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});
