// pages/Forget/Forget.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axiosInstance";
import login from "../../assets/images/login.png";
import logo from "../../assets/images/munc-logo.png";

function Forget() {
  const navigate = useNavigate();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Timer effect
  useEffect(() => {
    let interval;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && step === "otp") {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, "").slice(0, 1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    const otpArray = pastedData.split("");
    const newOtp = [...otp];
    for (let i = 0; i < otpArray.length; i++) {
      newOtp[i] = otpArray[i];
    }
    setOtp(newOtp);
  };

  // Send OTP request
  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      // Verify email
      const verifyRes = await api.post("/api/forgot/verify_email", { email });
      const idFromServer = verifyRes?.data?.userId;
      
      if (!idFromServer) {
        toast.error("Unable to verify email");
        return;
      }

      setUserId(idFromServer);

      // Send OTP
      await api.post(`/api/forgot/send_otp/${idFromServer}`);

      toast.success("OTP sent to your email");
      setStep("otp");
      setTimer(180); // 3 minutes
      setCanResend(false);
      setOtp(["", "", "", ""]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!userId) {
      toast.error("Session expired, please try again");
      setStep("email");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/api/forgot/send_otp/${userId}`);
      toast.success("OTP resent successfully");
      setTimer(180);
      setCanResend(false);
      setOtp(["", "", "", ""]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 4) {
      toast.error("Please enter the 4-digit OTP");
      return;
    }

    if (!userId) {
      toast.error("Session expired, please try again");
      setStep("email");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/forgot/verify_otp", { userId, otp: otpCode });
      toast.success("OTP verified successfully");
      setStep("newPassword");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
      setOtp(["", "", "", ""]);
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async () => {
    // Validate passwords
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/forgot/reset_password", {
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });
      
      toast.success("Password reset successfully! Please login with your new password.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md p-6 sm:p-8 border border-[#EEEEEE] shadow rounded-xl bg-white">
            {/* LOGO */}
            <div className="mb-6 text-center">
              <img src={logo} alt="logo" className="h-16 mx-auto object-contain" />
            </div>

            {/* EMAIL STEP */}
            {step === "email" && (
              <>
                <div className="flex flex-col gap-2 text-center">
                  <span className="font-bold text-2xl text-[#0F172A]">
                    Forgot Password?
                  </span>
                  <span className="text-[#64748B] text-sm">
                    Enter your email and we'll send you a secure link to reset it.
                  </span>
                </div>

                <form onSubmit={handleSendOtp} className="mt-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#475569] text-sm font-semibold">
                      Email Address
                    </label>
                    <div className="flex items-center gap-3 border border-[#E2E8F0] px-3 py-3 rounded-lg focus-within:border-blue-500 transition">
                      <MdEmail size={18} className="text-[#94A3B8]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="outline-none w-full text-sm"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#055BDA] text-white py-3 mt-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              </>
            )}

            {/* OTP STEP */}
            {step === "otp" && (
              <>
                <div className="flex flex-col gap-2 text-center">
                  <span className="font-bold text-2xl text-[#0F172A]">
                    Enter OTP
                  </span>
                  <span className="text-[#64748B] text-sm">
                    We sent a 4-digit code to your email
                  </span>
                </div>

                <div className="mt-6">
                  <div className="flex gap-3 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        className="w-14 h-14 text-center text-xl font-bold border-2 border-[#E2E8F0] rounded-lg focus:border-blue-500 focus:outline-none"
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="w-full bg-[#055BDA] text-white py-3 mt-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>

                  <div className="text-center mt-4">
                    {canResend ? (
                      <button
                        onClick={handleResendOtp}
                        disabled={loading}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        {loading ? "Sending..." : "Resend OTP"}
                      </button>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        Resend OTP in {formatTime(timer)}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setStep("email")}
                    className="w-full text-blue-600 text-sm mt-2 hover:underline"
                  >
                    Back to Email
                  </button>
                </div>
              </>
            )}

            {/* NEW PASSWORD STEP */}
            {step === "newPassword" && (
              <>
                <div className="flex flex-col gap-2 text-center">
                  <span className="font-bold text-2xl text-[#0F172A]">
                    Create New Password
                  </span>
                  <span className="text-[#64748B] text-sm">
                    Enter your new password below
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {/* New Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#475569] text-sm font-semibold">
                      New Password
                    </label>
                    <div className={`flex items-center gap-3 border ${errors.newPassword ? 'border-red-500' : 'border-[#E2E8F0]'} px-3 py-3 rounded-lg focus-within:border-blue-500 transition`}>
                      <FaLock size={18} className="text-[#94A3B8]" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Enter new password"
                        className="outline-none w-full text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="focus:outline-none"
                      >
                        {showPassword ? (
                          <IoEyeOffOutline size={18} className="text-[#94A3B8]" />
                        ) : (
                          <IoEyeOutline size={18} className="text-[#94A3B8]" />
                        )}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <span className="text-red-500 text-xs">{errors.newPassword}</span>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#475569] text-sm font-semibold">
                      Confirm Password
                    </label>
                    <div className={`flex items-center gap-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-[#E2E8F0]'} px-3 py-3 rounded-lg focus-within:border-blue-500 transition`}>
                      <FaLock size={18} className="text-[#94A3B8]" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm new password"
                        className="outline-none w-full text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <IoEyeOffOutline size={18} className="text-[#94A3B8]" />
                        ) : (
                          <IoEyeOutline size={18} className="text-[#94A3B8]" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-red-500 text-xs">{errors.confirmPassword}</span>
                    )}
                  </div>

                  <button
                    onClick={handleResetPassword}
                    disabled={loading}
                    className="w-full bg-[#055BDA] text-white py-3 mt-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </>
            )}

            {/* Back to Login Link */}
            <div className="text-center mt-6">
              <Link to="/login" className="text-blue-600 text-sm hover:underline">
                Back to Login
              </Link>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="mt-8 text-sm text-[#0F172A] text-center">
            © {new Date().getFullYear()} MUN-C LMS. All rights reserved
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:block lg:w-1/2">
          <img src={login} alt="login" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Forget;