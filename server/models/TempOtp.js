// server/models/TempOtp.js
import mongoose from "mongoose";

const tempOtpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } }, // auto-delete when expired
}, { timestamps: true });

export default mongoose.model("TempOtp", tempOtpSchema);
