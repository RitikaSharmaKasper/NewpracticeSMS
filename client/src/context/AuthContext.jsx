import React, { useState, useEffect, createContext, useContext } from "react";
import api from "../config/axiosInstance";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  // dont reply on token just rely on backend logout

  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      setUser(null);
      Cookies.remove("refreshToken");
      Cookies.remove("otpPending");
      Cookies.remove("otpEmail");
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me", { withCredentials: true });
      if (res.data.user) {
        setUser(res.data.user);
        // setAuthReady(true);
      } else {
        setUser(null);
        // setAuthReady(true);
      }
    } catch (e) {
      console.error("Fetch user error:", e);
      if (e.response?.status === 401) {
        console.log("401 - waiting for refresh flow");
        // Cookies.remove("token");
        // Cookies.remove("refreshToken");
      }
      setUser(null);
      setAuthReady(true);
    } finally {
      setLoading(false);
      setAuthReady(true);
    }
  };

  const refreshUser = async () => {
    try {
      const res = await api.get("/auth/me", { withCredentials: true });
      if (res.data.user) {
        setUser(res.data.user);
      }
    } catch (e) {
      console.error("Failed to refresh user:", e);
    }
  };

  // Skip auth check for specific routes
  useEffect(() => {
    const path = window.location.pathname;
    const skipPaths = ["/login", "/otp", "/forget", "/reset-password"];

    if (skipPaths.includes(path)) {
      console.log("On public route - skipping auth check");
      setLoading(false);
      setAuthReady(true);
      return;
    }

    // Only fetch user if not on public route and token exists
    fetchUser();
  }, []); // Empty dependency array - runs once on mount

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, authReady, logout, refreshUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
