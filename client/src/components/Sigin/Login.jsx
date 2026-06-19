// pages/Login/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axiosInstance";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthContext";

{/* <=============---------- icon -----------==============> */}
import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

{/* <==============--------- img ----------================> */}
import login from "../../assets/images/login.png";
import logo from "../../assets/images/munc-logo.png";

function Login() {
  const navigate = useNavigate();
  const { user, setUser,  loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Generate device ID
  const getDeviceId = () => {
    let deviceId = Cookies.get("deviceId");
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      Cookies.set("deviceId", deviceId, { expires: 365 });
    }
    return deviceId;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username/Email/Student ID is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const deviceId = getDeviceId();
      
      const response = await api.post("/auth/login", {
        username: formData.username,
        password: formData.password,
        rememberMe: formData.rememberMe,
        deviceId: deviceId,
        deviceInfo: navigator.userAgent,
      }, { withCredentials: true });

      // Check if 2FA is required
      if (response.data.twoFactor) {
        navigate("/otp", { 
          state: { 
            email: response.data.email,
            userId: response.data.userId,
            fromLogin: true,
            rememberMe: formData.rememberMe
          } 
        });
        toast.info("OTP sent to your email");
        return;
      }

      // Login successful without 2FA
      if (response.data.message === "Login successful") {
        const { user } = response.data;
        setUser(user);
        
        toast.success(`Welcome back, ${user.fullName || user.username}!`);
        navigate("/dashboard");
        // Redirect based on user type
          // if (user.userType === "Student") {
          //   navigate("/student-dashboard");
          // } else if (user.userType === "Teacher") {
          //   navigate("/teacher-dashboard");
          // } else {
          //   navigate("/dashboard");
          // }
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        toast.error("Invalid username or password");
        setErrors({
          username: "Invalid credentials",
          password: "Invalid credentials"
        });
      } else if (error.response?.status === 403) {
        toast.error(error.response.data.message || "Account is inactive");
      } else {
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-between min-h-screen">
        <div className="w-full lg:w-[50%] flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <div className="bg-white w-full rounded-xl shadow-md p-5 sm:p-6 border border-[#eeeeee]">
              {/* LOGO */}
              <div className="mb-3">
                <img src={logo} alt="logo" className="h-20 object-contain" />
              </div>

              <div className="mt-6">
                <div className="flex flex-col">
                  <span className="text-[#0F172A] lg:text-[28px] md:text-[24px] text-[20px] font-bold">
                    School Management System
                  </span>
                  <span className="text-[#64748B] font-normal lg:text-[18px] md:text-[16px] text-[14px]">
                    Sign in to manage your school
                  </span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin}>
                <div className="mt-6 flex flex-col gap-4">
                  {/* Username Field */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-[#475569] text-sm font-semibold">
                      Username / Email / Student ID
                    </label>
                    <div className={`flex items-center gap-4 border ${errors.username ? 'border-red-500' : 'border-[#E2E8F0]'} px-3 py-4 rounded-lg transition-all`}>
                      <FaUser size={18} className="text-[#1C1C1C]" />
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your username, email or student ID"
                        className="outline-none border-none w-full text-[#1C1C1C]"
                        autoComplete="username"
                      />
                    </div>
                    {errors.username && (
                      <span className="text-red-500 text-xs mt-1">{errors.username}</span>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-[#475569] text-sm font-semibold">
                      Password
                    </label>
                    <div className={`flex items-center gap-4 border ${errors.password ? 'border-red-500' : 'border-[#E2E8F0]'} px-3 py-4 rounded-lg transition-all`}>
                      <FaLock size={18} className="text-[#1C1C1C]" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        placeholder="••••••••••••"
                        className="outline-none border-none w-full text-[#1C1C1C]"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="focus:outline-none"
                      >
                        {showPassword ? (
                          <IoEyeOffOutline size={18} className="text-[#1C1C1C]" />
                        ) : (
                          <IoEyeOutline size={18} className="text-[#1C1C1C]" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-red-500 text-xs mt-1">{errors.password}</span>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <label htmlFor="rememberMe" className="text-[#475569] text-sm cursor-pointer">
                        Remember Me
                      </label>
                    </div>
                    
                    {/* ✅ ADD THIS - Forgot Password Link */}
                    <Link 
                      to="/forget" 
                      className="text-[#055BDA] text-sm hover:underline transition"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 bg-[#055BDA] p-4 mt-6 rounded-lg hover:bg-[#044a9e] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span className="text-white font-bold">Logging in...</span>
                    </>
                  ) : (
                    <span className="text-white font-bold">Login</span>
                  )}
                </button>
              </form>

              {/* Or Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-[#CBD5E1]"></div>
                <span className="px-3 text-[#64748B] text-sm font-normal">Or</span>
                <div className="flex-1 border-t border-[#CBD5E1]"></div>
              </div>

              {/* Track Registration Status */}
              <Link
                to="/track-registration"
                className="w-full flex justify-center items-center py-4 rounded-lg border border-[#CBD5E1] hover:border-[#055BDA] transition-all"
              >
                <span className="text-[#0F172A] font-bold text-base">Track Registration Status</span>
              </Link>

              {/* Don't have an account? Register */}
              <p className="text-center mt-4 text-[#64748B] text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#055BDA] font-medium hover:underline">
                  Register
                </Link>
              </p>

              {/* Footer */}
              <div className="flex justify-center mt-8">
                <span className="text-[#475569] text-sm">
                  © {new Date().getFullYear()} MUN-C LMS. All rights reserved
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-[50%]">
          <img
            src={login}
            alt="Login illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;