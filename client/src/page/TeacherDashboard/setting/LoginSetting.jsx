import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaRegSave, FaSave } from "react-icons/fa";

const LoginSetting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className=" bg-gray-50 p-4 md:p-6 rounded-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Authentication</p>
      </div>

      {/* Two Factor Authentication */}
      <div className="mt-6 flex items-center justify-between border-b border-[#E6E6E6] pb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Two-Factor Authentication
          </h2>
          <p className="text-sm text-gray-500">
            Add an extra layer of security to your account
          </p>
        </div>

        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className={`relative h-8 w-14 rounded-full transition-all duration-300 ${
            isEnabled ? "bg-[#0b3142]" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform duration-300 ${
              isEnabled ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {/* Login Details */}
      <div className="mt-6  pb-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Update Login Details
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Username</span>
          <span className="font-medium text-gray-900">
            Nikhil.ydv@gmail.com
          </span>
        </div>
      </div>

      {/* Change Password */}
      <div className="flex items-center justify-between mt-6  border-b border-[#e6e6e6] pb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Change Password
          </h2>

          <p className="text-sm text-gray-500">Last changed: 2024-11-15</p>
        </div>

        <div className="relative w-full max-w-md">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-12 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2 bg-[#0b3142] text-white rounded-lg hover:bg-[#0b3142] transition"
        >
          <FaSave size={16} />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>
  );
};

export default LoginSetting;
