import express from "express";

const router = express.Router();

import RefreshToken from "../models/RefreshToken.js"; // ✅ add .js

import { validate } from "../validators/studentValidator.js"; // ✅

import {
  loginSchema,
  otpVerifySchema,
  resendOtpSchema,
} from "../validators/authValidator.js"; // ✅

import {
  loginUser,
  logoutUser,
  logDevice,
  getMe,
  verifyotp,
  resendOtp,
  toggleTwoFactor,
  refreshToken,
  registerFirstAdmin,
  sendOtp,
  verifyRegistrationOtp,
  resendRegistrationOtp,
} from "../controllers/authController.js"; // ✅
import { authMiddleware } from "../middleware/auth.js"; // ✅

import {
  loginLimiter,
  otpSendLimiter,
  otpVerifyLimiter,
} from "../middleware/rateLimiter.js"; // ✅

// super admin login
router.post("/register-first-admin", registerFirstAdmin);

// Login routes
router.post("/login", loginLimiter, validate(loginSchema), loginUser);
router.post(
  "/verify_otp",
  otpVerifyLimiter,
  validate(otpVerifySchema),
  verifyotp,
);
router.post(
  "/resend_otp",
  otpSendLimiter,
  validate(resendOtpSchema),
  resendOtp,
);

router.post("/verify-registration-otp", verifyRegistrationOtp);

router.post("/resend-registration-otp", resendRegistrationOtp);

router.post("/otpsend",  sendOtp);

// refresh token
router.post("/refresh-token", refreshToken);

// Logout
router.post("/logout", logoutUser);

// Device tracking
router.post("/log-device", authMiddleware, logDevice);

// Get logged-in user
router.get("/me", authMiddleware, getMe);

// Two Factor Authentication
router.put("/toggle-2fa/:id", authMiddleware, toggleTwoFactor);

// module.exports = router;
// ❌ OLD
// module.exports = router;

export default router; // ✅ ES Module export
