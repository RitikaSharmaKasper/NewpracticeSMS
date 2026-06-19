import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "./config.js";
import Cookies from "js-cookie";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If it's not a 401 error or request already retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 🔥 CRITICAL: Don't try to refresh if this is the refresh token request itself
    if (originalRequest.url === "/auth/refresh-token") {
      // Refresh token endpoint failed - redirect to login
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      Cookies.remove("userData");
      Cookies.remove("userId");
      Cookies.remove("otpPending");
      Cookies.remove("otpEmail");

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    // Check if it's an auth page request
    const isAuthPage =
      window.location.pathname === "/login" ||
      window.location.pathname === "/otp" ||
      window.location.pathname === "/forget";

    if (isAuthPage) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      // If already refreshing, queue this request
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    isRefreshing = true;

    try {
      // Try to refresh the token
      const response = await api.post(
        "/auth/refresh-token",
        {},
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        // Process queued requests
        processQueue(null);
        // Dispatch event to re-fetch user
        window.dispatchEvent(new Event("auth-refresh"));
        // Retry original request
        return api(originalRequest);
      }
    } catch (refreshError) {
      // Refresh failed, clear cookies and redirect to login
      processQueue(refreshError, null);

      // Clear all auth cookies
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      Cookies.remove("userData");
      Cookies.remove("userId");
      Cookies.remove("otpPending");
      Cookies.remove("otpEmail");

      // Redirect to login if not already there
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }

    return Promise.reject(error);
  },
);

export default api;
