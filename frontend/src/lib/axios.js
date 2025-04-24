// lib/axios.js

export const axiosInstance = axios.create({
  baseURL: "https://chitchat-by-aleeza.railway.app/api", // ✅ this is very important!
  withCredentials: true,
});

