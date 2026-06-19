// pages/TwoStepVerification/TwoStepVerification.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from "../../config/axiosInstance";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthContext";
import TwoStepImage from '../../assets/images/twostep.png';
import MuncLogo from '../../assets/images/munc-logo.png';

const TwoStepVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const inputRefs = useRef([]);
  const { setUser } = useAuth();
  const currentYear = new Date().getFullYear();

  // Get email from location state or cookies
  const email = location.state?.email || Cookies.get("otpEmail");
  const rememberMe = location.state?.rememberMe || false;

  // Get or create device ID
  const getDeviceId = () => {
    let deviceId = Cookies.get("deviceId");
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      Cookies.set("deviceId", deviceId, { expires: 365 });
    }
    return deviceId;
  };

  // Check if OTP session is valid
  useEffect(() => {
    const checkSession = () => {
      const hasOtpCookie = Cookies.get("otpPending") === "true";
      const hasEmailCookie = Cookies.get("otpEmail");
      
      if (hasOtpCookie || hasEmailCookie || location.state?.fromLogin) {
        setIsLoading(false);
        return;
      }
      
      // No session found, redirect to login
      toast.error("OTP session expired. Please login again.");
      navigate("/login", { replace: true });
    };

    setTimeout(checkSession, 100);
  }, [navigate, location]);

  // Timer effect
  useEffect(() => {
    if (!isLoading && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLoading, timer]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    const newOtp = [...otp];
    newOtp[index] = value ? value.slice(-1) : "";
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!email) {
      toast.error("Email not found. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const deviceId = getDeviceId();
      
      const response = await api.post("/auth/verify_otp", {
        email: email,
        otp: otpCode,
        deviceId: deviceId,
        deviceInfo: navigator.userAgent,
        rememberMe: rememberMe
      }, { withCredentials: true });

      if (response.data.success) {
        toast.success("OTP verified successfully!");
        
        // Get user data from cookie (set by backend)
        const userDataCookie = Cookies.get("userData");
        if (userDataCookie) {
          const userData = JSON.parse(decodeURIComponent(userDataCookie));
          setUser(userData);
        //   localStorage.setItem("user", JSON.stringify(userData));
        }
        
        // Clear OTP cookies
        Cookies.remove("otpPending", { path: "/" });
        Cookies.remove("otpEmail", { path: "/" });
        
        // Navigate to dashboard
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      
      if (error.response?.status === 401 || error.response?.status === 400) {
        toast.error(error.response?.data?.message || "OTP session expired. Please login again.");
        navigate("/login");
        return;
      }
      
      toast.error(error.response?.data?.message || "Invalid OTP");
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found. Please login again.");
      navigate("/login");
      return;
    }

    setIsResending(true);
    try {
      const response = await api.post("/auth/resend_otp", { email });
      toast.success(response.data.message || "OTP resent successfully");
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
      setTimer(30);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading OTP Verification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="mb-6">
              <img src={MuncLogo} alt="logo" className="h-16 object-contain" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">2 Step Verification</h2>
            <p className="text-gray-500 mb-6">
              Please enter the 6-digit OTP sent to your email address
            </p>
            
            <form onSubmit={handleVerifyOtp}>
              <div className="flex justify-between gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                ))}
              </div>
              
              <div className="text-center mb-6">
                {timer > 0 ? (
                  <p className="text-gray-500">
                    Resend OTP in 00:{timer < 10 ? `0${timer}` : timer}s
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="text-blue-600 hover:underline disabled:opacity-50"
                  >
                    {isResending ? "Resending..." : "Didn't get the OTP? Resend"}
                  </button>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Verify OTP
              </button>
            </form>
            
            <p className="text-center text-gray-400 text-sm mt-8">
              © {currentYear} MUN-C LMS. All rights reserved
            </p>
          </div>
        </div>
      </div>
      
      {/* Right Section - Image */}
      <div className="hidden lg:block w-1/2">
        <img
          src={TwoStepImage}
          alt="OTP illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default TwoStepVerification;