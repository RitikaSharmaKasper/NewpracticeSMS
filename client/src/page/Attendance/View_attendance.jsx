import React, { useEffect, useRef, useState } from "react";
import "../../CSS/Style.css";
import * as d3 from "d3";
{
  /* <----------------------------------------------- GIF ----------------------------------------------------> */
}
import calender from "../../assets/images/calender.gif";
import calender3 from "../../assets/images/calender3.gif";
import calender4 from "../../assets/images/calender4.gif";
import calender5 from "../../assets/images/calender5.gif";

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
import { CirclePause } from "lucide-react";

/* <----------------------------------------------- img -------------------------------------------------------> */
import everdeen from "../../assets/images/katnis.jpg";
import meave from "../../assets/images/meave.jpg";
import Pagination from "../../components/Pagination";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

// import AttendanceRegister from "./AttendanceRegister";

/* <--------------------------------------------------- student Dummy Data --------------------------------------------> */

/* Legend Card */

const View_attendance = () => {
  const [active, setActive] = useState("View Attendance");

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [tab, setTab] = useState("teacher");
  const [months, setMonths] = useState(6);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const staffDatas = [
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

  const navigate = useNavigate();
  return (
    <div>
      <div className="box-shadow bg-white rounded-xl">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="flex flex-col">
              <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold">
                Employee Wise Attendance
              </span>
              <span className="text-sm text-[#696969]">
                You can view attendance by employee here
              </span>
            </p>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex gap-3 ">
            <div className="flex items-center gap-4">
              {/* Clock In Button */}

              {/* Year Select */}
              <div className="flex items-center bg-[#E9E9E9] min-w-44  px-4 py-2 cursor-pointer  rounded-lg">
                <input
                  placeholder="Select Staff"
                  type="text"
                  className="appearance-none bg-[#E9E9E9] text-[#333] outline-none cursor-pointer"
                />

                <FiChevronDown className=" text-gray-600" />
              </div>

              {/* Month Select */}
              <div className="flex items-center gap-3 text-white">
                <button className="py-2 px-6 bg-[#0B3142] rounded-lg">
                  Fetch Attendance
                </button>

                {/* <FiChevronDown className=" right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* filter in years and month */}
        <div className="flex items-center gap-4 p-4">
            <div className="flex items-center gap-2">
                <label htmlFor="Select Year:">Select Year:</label>
                <select className="bg-[#EFF2F2] px-3 py-1 rounded-lg" name="" id="">
                    <option value="">2025</option>
                    <option value="">2026</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="Select Year:">Select Month:</label>
                <select className="bg-[#EFF2F2] px-3 py-1 rounded-lg" name="" id="">
                    <option value="">March</option>
                    <option value="">April</option>
                </select>
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

                        <div className="absolute hidden left-8 top-0 z-50 group-hover:block bg-white border  border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px] h-40">
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

      {/* {openLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
         
            <div className="flex items-start justify-between pb-2">
              <div>
                <h2 className="text-[20px] font-semibold text-[#1c1c1c]">
                  Update Attendance
                </h2>
                <p className="text-[14px] text-[#9C9C9C]">
                  You can update staff attendance here
                </p>
              </div>
              <button
                onClick={() => setOpenLeaveModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer text-xl font-bold"
              >
                ✕
              </button>
            </div>

            
            <div className="mt-6 rounded-xl bg-[#FAFBFF] p-6">
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
               
                <div>
                  <label className="mb-1 block text-[14px] font-medium">
                    Role
                  </label>
                  <select className="w-full rounded-lg border border-[#E6E6E6] bg-white px-4 py-3 text-[14px] text-[#696969]">
                    <option>Teacher</option>
                  </select>
                </div>

                
                <div>
                  <label className="mb-1 block text-[14px] font-medium">
                    Staff
                  </label>
                  <select className="w-full rounded-lg border border-[#E6E6E6] bg-white px-4 py-3 text-[14px] text-[#696969]">
                    <option>Anushka Sharma (EP123456)</option>
                  </select>
                </div>

                
                <div>
                  <label className="mb-1 block text-[14px] font-medium">
                    Login Time
                  </label>
                  <input
                    value="08:00 AM"
                    readOnly
                    className="w-full rounded-lg border border-[#E6E6E6] bg-white px-4 py-3 text-[14px] text-[#696969]"
                  />
                </div>

               
                <div>
                  <label className="mb-1 block text-[14px] font-medium">
                    Logout Time
                  </label>
                  <input
                    value="04:00 PM"
                    readOnly
                    className="w-full rounded-lg border border-[#E6E6E6] bg-white px-4 py-3 text-[14px] text-[#696969]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-[14px] font-medium">
                    Remark
                  </label>
                  <input
                    placeholder="Type here..."
                    className="w-full rounded-lg border border-[#E6E6E6] bg-white px-4 py-3 text-[14px] text-[#696969]"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button className="rounded-lg border border-[#D1D1D1] bg-white px-6 py-2 text-[14px] font-medium text-[#696969]">
                  Reset
                </button>
                <button className="rounded-lg bg-[#0B3142] px-6 py-2 text-[14px] font-semibold text-white">
                  Update Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default View_attendance;
