// lib/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('session-expired')); // 👉 Trigger dialog
      window.dispatchEvent(new Event('storage')); // Sync other tabs

    }
    if (status === 400) {
        const message = error.response?.data?.detail || 'Bad request occurred';
        window.dispatchEvent(new CustomEvent('400-error', { detail: message }));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
