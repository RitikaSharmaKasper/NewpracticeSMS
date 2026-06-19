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
import { ArrowDownToLine, CirclePause } from "lucide-react";

/* <----------------------------------------------- img -------------------------------------------------------> */
import everdeen from "../../assets/images/katnis.jpg";
import meave from "../../assets/images/meave.jpg";
import Pagination from "../../components/Pagination";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

const Today_Attendance = () => {
  const [active, setActive] = useState("View Attendance");

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [tab, setTab] = useState("teacher");
  const [months, setMonths] = useState(6);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const staffDatas = [
    {
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      staffName: "Anushka Sharma",
      staffId: "EMP001",
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
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      staffName: "Ranveer Singh",
      staffId: "EMP002",
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
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      staffName: "Kareena Kapoor",
      staffId: "EMP003",
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
      img: "https://randomuser.me/api/portraits/men/75.jpg",
      staffName: "Shah Rukh Khan",
      staffId: "EMP004",
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
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      staffName: "Deepika Padukone",
      staffId: "EMP005",
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

  return (
    <div>
      {" "}
      <div className="box-shadow bg-white rounded-xl">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="flex flex-col">
              <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold">
                Today's Attendance
              </span>
              <span className="text-sm text-[#696969]">Monday, 04/05/2026</span>
            </p>
          </div>
        </div>

        {/* filter  */}
        <div
          className="searchfilter-rooms p-4"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "100px",
          }}
        >
          <div
            style={{
              backgroundColor: "#EEEEEE",
              borderRadius: "8px",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <input
              className="text-[12px] md:text-[14px] lg:text-[16px]"
              style={{ border: "none", outline: "none", width: "100%" }}
              type="search"
              placeholder="Search staff by name or staff id..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                // setPage(1);
              }}
            />
          </div>
          {/* Select filter Button */}
          <button className="bg-[#EFF2F2] min-w-[130px] px-4 py-2 rounded-lg flex items-center justify-between border border-[#E6E6E6] cursor-pointer">
            <ArrowDownToLine className="w-4 h-4" />
            <span className="text-sm">Export XLSX</span>
          </button>
        </div>

        {/* <------------------------------------------ Table*/}
        <div className="p-4">
          <div className="w-full overflow-x-auto border border-[#e6e6e6] rounded-lg">
            <table className="w-full">
              <thead className="bg-[#F5F7F7]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Staff
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
                      <div className="flex items-start gap-4 ">
                        <span>
                          <img
                            className="w-9.5 h-9.5 rounded-full"
                            src={item.img}
                            alt=""
                          />
                        </span>
                        <div className=" flex flex-col">
                          <span className="font-normal text-sm">
                            {item.staffName}
                          </span>
                          <span className="font-normal text-sm">
                            {item.staffId}
                          </span>
                        </div>
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
      <Pagination/>
        </div>
      </div>
    </div>
  );
};

export default Today_Attendance;
