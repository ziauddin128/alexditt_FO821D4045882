// src/lib/axios.js
import axios from "axios";
import { storage } from "../../lib/storage";

const apiBaseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

// Public Axios instance (no auth)
export const publicAxios = axios.create({
  baseURL: apiBaseURL, // base url coming from dotenv file
  headers: {
    // 'Content-Type': 'application/json',
  },
});

// Private Axios instance (with auth)
export const privateAxios = axios.create({
  baseURL: apiBaseURL,
  headers: {
    // 'Content-Type': 'application/json',
  },
});

// Add interceptor to attach auth token to privateAxios requests
privateAxios.interceptors.request.use(
  (config) => {
    const token = storage.getItem("authToken");
    // console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
privateAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // storage.removeItem('authToken');
      //window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
