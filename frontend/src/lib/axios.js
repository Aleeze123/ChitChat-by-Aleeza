// lib/axios.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "https://chitchat-by-aleeza.railway.app/api", // ✅ /api added here
  withCredentials: true,
});
