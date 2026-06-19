import React, {useState, useEffect, useRef  } from "react";
import {
  LuSearch,
  LuMessageSquare,
  LuMail,
  LuBell,
  LuChevronDown,
} from "react-icons/lu";
import { BsChatText } from "react-icons/bs";
import {useAuth} from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../config/axiosInstance";
import { toast } from "react-toastify";

function Navbar({ onToggleSidebar, onLogoutClick }) {
  const {id} = useParams();
   const [student, setStudent] = useState(null);
  const dropdownRef = useRef();
  const {user, setUser, loading: authLoading, logout} = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  // const handleLogout = async () => {
  //   await logout();
  //   navigate("/login");
  // }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside)
  },[]);

  const getProfileImage = () => {
    if(user?.account?.profileImage?.url) {
      return user?.account.profileImage.url;
    }
    const studentPhoto = user?.studentInfo?.documents?.studentDocuments?.find((doc) => doc.documentType === "Student Photo");
    return studentPhoto?.fileUrl || null;
  }
const studentInfo = user?.studentInfo;
const personalInfo = studentInfo?.personalInfo || {};
  const profileImage = getProfileImage();
  return (
    <nav className="h-20 bg-white flex items-center justify-between px-4 md:px-6 ">

      {/* ===== LEFT ===== */}
      <div className="flex items-center gap-3">

        {/* Hamburger */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-gray-700" />
          <span className="w-6 h-0.5 bg-gray-700" />
          <span className="w-6 h-0.5 bg-gray-700" />
        </button>

        {/* Search (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-2 bg-[#EEEEEE] px-4 py-3 rounded-lg w-[220px] lg:w-[325px]">
          <LuSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search here..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* ===== RIGHT ===== */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Icons */}
        
      <div className="bg-[#D9E3E8] h-10 w-10 flex justify-center items-center rounded-full">  <LuBell className="text-xl text-[#12516E]  hover:text-blue-600 cursor-pointer" /></div>
       <div className="bg-[#D9E3E8] h-10 w-10 flex justify-center items-center rounded-full">  <BsChatText  className="text-xl -scale-x-100 text-[#12516E] hover:text-blue-600 cursor-pointer" /></div>

        {/* Divider (hidden on small) */}
        <div className="hidden md:block h-6 w-px bg-gray-300" />

        {/* User */}
        <div className="relative">
        <div
        onClick={(e) => { e.stopPropagation(); setOpenDropdown((prev) => !prev)}}
        className="flex items-center gap-2 cursor-pointer">
          {profileImage ? (
          <img
            src={profileImage}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-2xl">
              {personalInfo?.fullName?.charAt(0) || "A"}
            </div>
          )}

          {/* Name hidden on mobile */}
          <div className="hidden md:block leading-tight">
            <p className="text-sm font-semibold text-gray-800">
              {user?.studentInfo?.personalInfo?.fullName}
            </p>
            <p className="text-xs text-gray-500">
             {user?.account?.role?.roleName || user?.userType}
            </p>
          </div>

          <LuChevronDown className="hidden md:block text-2xl text-gray-400" />
        </div>
        </div>
        {/* dropdown */}
       {openDropdown && (
  <div
  ref={dropdownRef}
    className="absolute right-0 top-full translate-y-0 origin-top-right w-[260px] rounded-2xl overflow-hidden shadow-2xl z-50"
    style={{
      background:
        "linear-gradient(135deg, rgba(255,0,0,0.8), rgba(0,0,255,0.8))",
    }}
  >
    {/* Blur Layer */}
    <div
      className="absolute inset-0"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    />

    {/* Content */}
    <div className="relative z-10 text-white">

      {/* Profile Section */}
      <div className="flex flex-col items-center py-5">
        <p className="font-semibold text-white">
             {user?.account?.role?.roleName || user?.userType}
            </p>
        {profileImage ? (
          <img
            src={profileImage}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-2xl">
              {personalInfo?.fullName?.charAt(0) || "A"}
            </div>
          )}
        <p className="mt-2 font-semibold">{user?.account?.username || "User"}</p>
        <p className="text-xs opacity-80">{user?.studentInfo?.studentId || "EMP-1234"}</p>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 space-y-2">
        <button className="w-full bg-white/20 hover:bg-white/30 transition py-2 rounded-lg text-sm">
          Manage Account
        </button>

        <button
        onClick={onLogoutClick}
          className="w-full bg-black/40 hover:bg-black/60 transition py-2 rounded-lg text-sm"
        >
          Sign out
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </nav>
  );
}

export default Navbar;
