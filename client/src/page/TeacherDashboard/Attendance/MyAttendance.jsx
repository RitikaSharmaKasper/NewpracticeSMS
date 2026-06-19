import React, { useEffect, useRef, useState } from "react";
import "../../../CSS/Style.css";
import * as d3 from "d3";
{
  /* <----------------------------------------------- GIF ----------------------------------------------------> */
}
import calender from "../../../assets/images/calender.gif";
import calender3 from "../../../assets/images/calender3.gif";
import calender4 from "../../../assets/images/calender4.gif";
import calender5 from "../../../assets/images/calender5.gif";
import MonthFilter from "../../../components/Filters/MonthFilter.jsx";
{
  /* <---------------------------------------------- icon -----------------------------------------------------> */
}
import { TbFileImport } from "react-icons/tb";
import { GrUserAdd } from "react-icons/gr";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiArrowsDownUpThin } from "react-icons/pi";
import { FiEdit, FiSearch } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FiChevronDown } from "react-icons/fi";
import { MdOutlineCalendarToday, MdOutlineAccessTime } from "react-icons/md";
// import { MdOutlineAccessTime } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiClock } from "react-icons/fi";
import { CirclePause } from 'lucide-react';

/* <----------------------------------------------- img -------------------------------------------------------> */
import everdeen from "../../../assets/images/katnis.jpg";
import meave from "../../../assets/images/meave.jpg";
import Pagination from "../../../components/Pagination";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

// YearFilter Component
const YearFilter = ({ 
  selectedYear, 
  onYearChange, 
  placeholder = "Year",
  className = "",
  showAllOption = true,
  allOptionLabel = "All",
  startYear = 2020
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Generate years dynamically (startYear to next year)
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = startYear; year <= currentYear + 5; year++) {
      years.push(year.toString());
    }
    return years;
  };

  const years = getYears();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter years based on search
  const filteredYears = years.filter(year => 
    year.includes(searchTerm)
  );

  const handleSelect = (year) => {
    onYearChange(year);
    setIsOpen(false);
    setSearchTerm("");
  };

  const displayText = selectedYear || placeholder;

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#EFF2F2] rounded-[6px] px-4 py-2.5 text-[12px] text-[#1C1C1C] min-w-[124px] cursor-pointer flex items-center justify-between hover:bg-[#E5E8E8] transition-colors"
      >
        <span className="truncate">
          {displayText}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E8E8] rounded-[6px] shadow-lg overflow-hidden min-w-[140px]">
          {/* Search Input */}
          <div className="p-2 border-b border-[#E8E8E8]">
            <input
              type="text"
              placeholder="Search year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1.5 text-[12px] border border-[#E8E8E8] rounded-[4px] outline-none focus:border-[#0B3142]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {showAllOption && (
              <button
                onClick={() => handleSelect(allOptionLabel)}
                className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] transition-colors ${
                  selectedYear === allOptionLabel ? "bg-[#F3F4F6] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
                }`}
              >
                {allOptionLabel}
              </button>
            )}

            {filteredYears.length === 0 ? (
              <div className="px-4 py-2 text-[13px] text-[#9C9C9C]">No years found</div>
            ) : (
              filteredYears.map((year) => (
                <button
                  key={year}
                  onClick={() => handleSelect(year)}
                  className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] transition-colors ${
                    selectedYear === year ? "bg-[#F3F4F6] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
                  }`}
                >
                  {year}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const MyAttendance = () => {
  const [active, setActive] = useState("View Attendance");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  // Clock In/Out States
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [tab, setTab] = useState("teacher");
  const [months, setMonths] = useState(6);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);

  // Initial staff data
  const initialStaffDatas = [
    {
      date: "20",
      day: "Friday",
      shift: "Shift 1",
      shiftTime: "09:00AM-06:30PM",
      mark: "Present",
      loginTime: "9:20 AM",
      logoutTime: "6:30 PM",
      logs: 1,
      netLogin: "9 Hrs 10 Min",
      status: "Login",
    },
    {
      date: "24",
      day: "Tuesday",
      shift: "Shift 1",
      shiftTime: "09:00AM-06:30PM",
      mark: "Week Off",
      loginTime: "Week Off",
      logoutTime: "Week Off",
      logs: 1,
      netLogin: "9 Hrs 10 Min",
      status: "Logout",
    },
    {
      date: "23",
      day: "Monday",
      shift: "Shift 1",
      shiftTime: "09:00AM-06:30PM",
      mark: "Half Day",
      loginTime: "9:20 AM",
      logoutTime: "1:30 PM",
      logs: 1,
      netLogin: "4 Hrs 30 Min",
      status: "Processed",
    },
    {
      date: "25",
      day: "Wednesday",
      shift: "Shift 1",
      shiftTime: "09:00AM-06:30PM",
      mark: "Absent",
      loginTime: "--",
      logoutTime: "--",
      logs: "--",
      netLogin: "0 Hrs 0 Min",
      status: "Logout",
    },
    {
      date: "26",
      day: "Thursday",
      shift: "Shift 1",
      shiftTime: "09:00AM-06:30PM",
      mark: "Present",
      loginTime: "9:05 AM",
      logoutTime: "6:35 PM",
      logs: 2,
      netLogin: "9 Hrs 30 Min",
      status: "Login",
    },
  ];

  const [staffDatas, setStaffDatas] = useState(initialStaffDatas);

  const navigate = useNavigate();

  // Handle Clock In
  const handleClockIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    setIsClockedIn(true);
    setClockInTime(timeString);
    
    // Add new attendance record
    const newRecord = {
      date: now.getDate().toString(),
      day: now.toLocaleDateString('en-US', { weekday: 'long' }),
      shift: "Shift 1",
      shiftTime: "09:00AM-06:30PM",
      mark: "Present",
      loginTime: timeString,
      logoutTime: "--",
      logs: 1,
      netLogin: "0 Hrs 0 Min",
      status: "Login",
    };
    
    setStaffDatas([newRecord, ...staffDatas]);
    
    toast.success("Clock In successful!");
  };

  // Handle Clock Out
  const handleClockOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    setClockOutTime(timeString);
    setIsClockedIn(false);
    
    // Calculate net login time
    const loginDate = new Date();
    const logoutDate = new Date();
    // Parse login time
    const loginParts = clockInTime.match(/(\d+):(\d+)\s*(AM|PM)/);
    if (loginParts) {
      let hours = parseInt(loginParts[1]);
      const minutes = parseInt(loginParts[2]);
      const ampm = loginParts[3];
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      loginDate.setHours(hours, minutes, 0);
    }
    
    const logoutParts = timeString.match(/(\d+):(\d+)\s*(AM|PM)/);
    if (logoutParts) {
      let hours = parseInt(logoutParts[1]);
      const minutes = parseInt(logoutParts[2]);
      const ampm = logoutParts[3];
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      logoutDate.setHours(hours, minutes, 0);
    }
    
    const diffMs = logoutDate - loginDate;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const netLogin = `${diffHrs} Hrs ${diffMins} Min`;
    
    // Update the first record (latest) with logout details
    const updatedRecords = [...staffDatas];
    if (updatedRecords.length > 0) {
      updatedRecords[0] = {
        ...updatedRecords[0],
        logoutTime: timeString,
        netLogin: netLogin,
        status: "Logout",
        logs: 2
      };
    }
    setStaffDatas(updatedRecords);
    
    toast.success("Clock Out successful!");
  };

  return (
    <div>
      <div className="box-shadow bg-white rounded-xl">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="flex flex-col">
              <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold">
                Attendance List
              </span>
              <span className="text-sm text-[#696969]">
                You can check your attendance here.
              </span>
            </p>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Clock In/Out Buttons - Conditional Rendering */}
              {!isClockedIn ? (
                <button 
                  onClick={handleClockIn}
                  className="bg-[#0BA53B] text-white px-[16px] py-[5px] rounded-[8px] flex items-center gap-2 font-semibold text-[16px] font-[600] hover:bg-[#0A8F33] transition-colors"
                >
                  <span>▶</span>
                  <span>Clock In</span>
                </button>
              ) : (
                <button 
                  onClick={handleClockOut}
                  className="bg-[#C92131] text-white px-[16px] py-[5px] rounded-[8px] flex items-center gap-2 font-semibold text-[16px] font-[600] hover:bg-[#B01D2A] transition-colors"
                >
                  <span><CirclePause /></span>
                  <span>Clock Out</span>
                </button>
              )}

              {/* Month Filter */}
              <MonthFilter
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
                placeholder="Month"
                showAllOption={true}
                allOptionLabel="All"
              />

              {/* Year Filter */}
              <YearFilter
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
                placeholder="Year"
                showAllOption={true}
                allOptionLabel="All"
                startYear={2020}
              />
            </div>
          </div>
        </div>

        {/* <------------------------------------------ Table*/}
        <div className="p-4">
          <div className="w-full overflow-x-auto border border-[#e6e6e6] rounded-lg">
            <table className="w-full">
              <thead className="bg-[#F5F7F7]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Date | Day
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    <div className="flex items-center gap-1">
                      <span className="text-[#9C9C9C]">
                        {/* <PiArrowsDownUpThin /> */}
                      </span>
                      <span>Shift</span>
                    </div>
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Mark</span>
                    </div>
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Login Time
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Logout Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Logs
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Net Login
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {staffDatas.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#e6e6e6] hover:bg-gray-50"
                  >
                    {/* Date | Day */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4 ">
                        <span className="font-normal bg-[#EFF2F2] p-1 rounded-md text-sm">
                          {item.date}
                        </span>
                        <span className="font-normal bg-[#EFF2F2] py-1 px-4 rounded-md text-sm">
                          {item.day}
                        </span>
                      </div>
                    </td>

                    {/* Staff / Shift */}
                    <td className="px-4 py-3">
                      <div className="inline-flex items-center gap-2 bg-[#C7E2FF] px-2 py-1 rounded-md">
                        <span className="bg-[#FFFAD4] text-[#905F1E] text-sm font-normal px-3 py-1 rounded-md">
                          {item.shift}
                        </span>

                        <span className="text-[#007AFF] text-sm font-normal whitespace-nowrap">
                          {item.shiftTime}
                        </span>
                      </div>
                    </td>

                    {/* Mark */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-medium
                        ${
                          item.mark === "Present"
                            ? "bg-[#D4EDDA] text-[#009638]"
                            : item.mark === "Absent"
                              ? "bg-[#F8D7DA] text-[#C92131]"
                              : item.mark === "Week Off"
                                ? "bg-[#E3F2FD] text-[#1565C0]"
                                : "bg-[#FFEDB4] text-[#A14700]"
                        }`}
                      >
                        {item.mark}
                      </span>
                    </td>

                    {/* Login Time */}
                    <td className="px-4 py-3 text-sm">{item.loginTime}</td>

                    {/* Logout Time */}
                    <td className="px-4 py-3 text-sm">{item.logoutTime}</td>

                    {/* Logs */}
                    <td className="px-4 py-3 text-sm ">
                      <div className="relative inline-block group">
                        <div className="group inline-flex items-center gap-2 cursor-pointer">
                          {item.logs}
                          <IoEyeOutline size={16} />
                        </div>

                        <div className="absolute hidden left-8 top-0 z-50 group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px] h-40">
                          dcssjjdsljdfkjdfk
                        </div>
                      </div>
                    </td>

                    {/* Net Login */}
                    <td className="px-4 py-3 text-sm">{item.netLogin}</td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium
                        ${
                          item.status === "Login"
                            ? "bg-[#D4EDDA] text-[#009638]"
                            : item.status === "Logout"
                              ? "bg-[#F8D7DA] text-[#C92131]"
                              : "bg-[#E3F2FD] text-[#1565C0]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttendance;