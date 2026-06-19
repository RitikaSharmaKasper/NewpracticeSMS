import React, { useState } from "react";
import students_card_icon from "../../assets/GIF/active-stundent.gif";
import employee_card_icon from "../../assets/GIF/active-employee.gif";
import perfomance_card_icon from "../../assets/GIF/perfomance.gif";
import fee_card_icon from "../../assets/GIF/rupee.gif";
import curves_card from "../../assets/images/curves.png";
import notice from "../../assets/images/notice.png";
import Event_img from "../../assets/images/event-img.png";
import staff from "../../assets/images/elipse.svg";
import {
  MdBarChart,
  MdOutlineEventNote,
  MdOutlineKeyboardArrowRight,
  MdOutlineWatchLater,
} from "react-icons/md";
import { TbBus, TbCalendarEvent, TbRouteSquare } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import EventCalender from "./EventCalender";
import {
  Eye,
  Download,
  CheckCircle,
  MapPin,
  Clock,
  RefreshCw,
} from "lucide-react";
import { CiClock2, CiLocationOn } from "react-icons/ci";
import styled from "styled-components";
import TotalStudentGraph from "./TotalStudentGraph";
import { RiShoppingBagLine } from "react-icons/ri";
import EarningsGraph from "./RevenueGraph";
import { VscGraph } from "react-icons/vsc";
import ExpenseGraph from "./ExpenseGraph";
import RevenueGraph from "./RevenueGraph";
import indicate from "../../assets/images/active-bus-icon.svg";
import delay from "../../assets/images/delay-icon.svg";
import arrived from "../../assets/images/arived-icon.svg";
import abroad from "../../assets/images/abroad-icon.svg";
import green from "../../assets/images/green-bus.png";
import orange from "../../assets/images/orange-bus.png";
import blue from "../../assets/images/blue-bus.png";
import sky from "../../assets/images/sky-bus.png";
import { RxCountdownTimer } from "react-icons/rx";
import { CgTime } from "react-icons/cg";
import profile from "../../assets/images/profile.png";
import udefine_profile from "../../assets/images/nul-profile.svg";
import { BsArrowDown, BsArrowDownUp, BsDot } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "../../CSS/AdminDashboard.css";
const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  }
 
`;

const TeacherDashboard = () => {
  const teacherData = [
    { name: "Sunil Bhadouriya", role: "Math Teacher", status: "Present" },
    { name: "Ravi Sharma", role: "Science Teacher", status: "Absent" },
    { name: "Ravi Sharma", role: "Science Teacher", status: "Leave" },
    { name: "Ravi Sharma", role: "Science Teacher", status: "Leave" },
    { name: "Ravi Sharma", role: "Science Teacher", status: "Leave" },
    { name: "Ravi Sharma", role: "Science Teacher", status: "Absent" },
    { name: "Ravi Sharma", role: "Science Teacher", status: "Absent" },
  ];

  const staffData = [
    { name: "Amit Kumar", role: "Clerk", status: "Present" },
    { name: "Suresh Yadav", role: "Peon", status: "Leave" },
    { name: "Suresh Yadav", role: "Peon", status: "Absent" },
  ];
  const studentAll = [
    { name: "Kasim Siddique", class: "Class 1", exam: "Final", percent: "80%" },
    { name: "Akash Kumar", class: "Class 1", exam: "Mid Term", percent: "50%" },
    { name: "Akash Kumar", class: "Class 1", exam: "Mid Term", percent: "50%" },
    {
      name: "Priyanshu Pandey",
      class: "Nursery",
      exam: "Final",
      percent: "70%",
    },
    { name: "Diwakar Yadav", class: "Class 1", exam: "Final", percent: "90%" },
    { name: "Diwakar Yadav", class: "Class 1", exam: "Final", percent: "90%" },
    { name: "Diwakar Yadav", class: "Class 1", exam: "Final", percent: "90%" },
    { name: "Diwakar Yadav", class: "Class 1", exam: "Final", percent: "90%" },
  ];
  const [active, setActive] = useState("All");
  const [staffTab, setStaffTab] = useState("teacher");
  const currentData = staffTab === "teacher" ? teacherData : staffData;
  const [earningTab, setEarningTab] = useState("revenue");
  const [selectedClass, setSelectedClass] = React.useState("All");
  const [selectedExam, setSelectedExam] = React.useState("Final");
  // ✅ 3. FILTER LOGIC AFTER STATE
  const filteredData = studentAll.filter((item) => {
    const classMatch = selectedClass === "All" || item.class === selectedClass;

    const examMatch = selectedExam === "All" || item.exam === selectedExam;

    return classMatch && examMatch;
  });

  const tabs = [
    "All",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Computer Science",
    "English",
  ];

  const activeBusStatus = [
    {
      indicateIcon: indicate,
      number: "2",
      statusBus: "Active Buses",
      busColorIcon: green,
      numberColor: "#009638",
      statusColor: "#009638",
    },
    {
      indicateIcon: delay,
      number: "3",
      statusBus: "Delayed",
      busColorIcon: orange,
      numberColor: "#F97316",
      statusColor: "#F97316",
    },
    {
      indicateIcon: arrived,
      number: "4",
      statusBus: "Arrived",
      busColorIcon: blue,
      numberColor: "#007AFF",
      statusColor: "#007AFF",
    },
    {
      indicateIcon: abroad,
      number: "5",
      statusBus: "Students Aboard",
      busColorIcon: sky,
      numberColor: "#00ADAD",
      statusColor: "#00ADAD",
    },
  ];
  const classWisePerformance = [
    {
      class: "Nursery A",
      students: 50,
      Avgmarks: "92%",
      attendance: "91%",
      status: "Excellent",
    },
    {
      class: "Nursery B",
      students: 50,
      Avgmarks: "95%",
      attendance: "90%",
      status: "Good",
    },
    {
      class: "Nursery C",
      students: 50,
      Avgmarks: "98%",
      attendance: "88%",
      status: "Average",
    },
    {
      class: "Nursery C",
      students: 50,
      Avgmarks: "98%",
      attendance: "88%",
      status: "Average",
    },
    {
      class: "Nursery C",
      students: 50,
      Avgmarks: "98%",
      attendance: "88%",
      status: "Average",
    },
    {
      class: "Nursery C",
      students: 50,
      Avgmarks: "98%",
      attendance: "88%",
      status: "Average",
    },
    {
      class: "Nursery C",
      students: 50,
      Avgmarks: "98%",
      attendance: "88%",
      status: "Average",
    },
  ];
  const navigate = useNavigate();
  const handleStudentClick = () => {
    navigate("/active-student-view");
  };
  const handleEmployeeClick = () => {
    navigate("/active-employee-view");
  };
  const handlePerformanceOverviewClick = () => {
    navigate("/performance-overview");
  };
  const handleNoticeBoardViewClick = () => {
    navigate("/notice-boardview");
  };
  const handleEventCalendarViewClick = () => {
    navigate("/eventcalendar-view");
  };

  return (
    <div style={{ fontFamily: "Segoe UI" }}>
      <div className="">
        {/* Admin Header */}
        <div className="flex justify-between items-center">
          <span>
            <h1 className="text-[15px] sm:text-[18px] md:text-[25px] lg:text-[30px] text-[#0B3142] font-semibold">
              Welcome Back, Teacher!
            </h1>
            <p className="text[#696969] text-[10px] sm:text-[12px] md:text-[15px] lg:text-[20px] font-normal">
              Here’s a Quick Overview of Today’s Activities
            </p>
          </span>
          <span className="text-[#696969] font-normal text-right sm:text-left">
            <p className="text-[14px] text-right">9:30 AM</p>
            <p className="text-[14px] ">22 October 2025, Sunday</p>
          </span>
        </div>
        {/* container-one */}
        <div
          className="sms-dashboard-admin-container-one"
          style={{
            padding: "16px 0",
            display: "flex",
            gap: "16px",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",

          }}
        >
          {/* Left Side Container */}
          <div
            className="left-side-container-sms-admindashboard"
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* Card Container */}
            <div
              className="card-container-admindashbaord"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: "10px",
              }}
            >
              {/*Admin Card  */}
              <div
                className="admin-card-sms"
                style={{
                  position: "relative",
                  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                  width: "100%",
                  maxWidth: "284px",

                  height: "136px",
                  padding: "16px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <img
                  onClick={handleStudentClick}
                  src={curves_card}
                  style={{
                    width: "60px",
                    height: "60px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  alt="curves-card"
                />
                <p className="text-[12px] sm:text-[10px] md:text-[12px] lg:text-[14px] text[#1C1C1C] font-normal">
                  Active Students
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor=""
                      className="text-[#1C1C1C] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-bold"
                    >
                      468
                    </label>
                    <label
                      htmlFor=""
                      className="text-[#767676] text-[14px] lg:text-[12px] md:text-[10] sm:text-[8px] font-normal"
                    >
                      Total student : 500
                    </label>
                  </div>
                  <div>
                    <img
                      style={{ width: "48px" }}
                      src={students_card_icon}
                      alt="students_card_icon"
                    />
                  </div>
                </div>
              </div>
              {/*AdminCard  */}
              <div
                className="admin-card-sms"
                style={{
                  position: "relative",
                  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                  width: "100%",
                  maxWidth: "284px",
                  height: "136px",
                  padding: "16px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <img
                  onClick={handleEmployeeClick}
                  src={curves_card}
                  style={{
                    width: "60px",
                    height: "60px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  alt="curves-card"
                />
                <p className="text-[12px] sm:text-[10px] md:text-[12px] lg:text-[14px] text[#1C1C1C] font-normal">
                  Active Employees
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor=""
                      className="text-[#1C1C1C] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-bold"
                    >
                      175
                    </label>
                    <label
                      htmlFor=""
                      className="text-[#767676] text-[14px] font-normal"
                    >
                      Teaching: 165 • Other: 10
                    </label>
                  </div>
                  <div>
                    <img
                      style={{ width: "48px" }}
                      src={employee_card_icon}
                      alt="employee_card_icon"
                    />
                  </div>
                </div>
              </div>
              {/*Admin Card  */}
              <div
                className="admin-card-sms"
                style={{
                  position: "relative",
                  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                  width: "100%",
                  maxWidth: "284px",
                  height: "136px",
                  padding: "16px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <img
                  onClick={handlePerformanceOverviewClick}
                  src={curves_card}
                  style={{
                    width: "60px",
                    height: "60px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  alt="curves-card"
                />
                <p className="text-[12px] sm:text-[10px] md:text-[12px] lg:text-[14px] text[#1C1C1C] font-normal">
                  Performance
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor=""
                      className="text-[#1C1C1C] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-bold"
                    >
                      97.5%
                    </label>
                    <label
                      htmlFor=""
                      className="text-[#767676] text-[14px] font-normal"
                    >
                      overall classes attendance rate
                    </label>
                  </div>
                  <div>
                    <img
                      style={{ width: "48px" }}
                      src={perfomance_card_icon}
                      alt="perfomance_card_icon"
                    />
                  </div>
                </div>
              </div>
              {/*Admin Card  */}
              <div
                className="admin-card-sms"
                style={{
                  position: "relative",
                  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                  width: "100%",
                  maxWidth: "284px",
                  height: "136px",
                  padding: "16px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={curves_card}
                  style={{
                    width: "60px",
                    height: "60px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    borderRadius: "8px",
                  }}
                  alt="curves-card"
                />
                <p className="text-[12px] sm:text-[10px] md:text-[12px] lg:text-[14px] text[#1C1C1C] font-normal">
                  Fees Collected
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor=""
                      className="text-[#1C1C1C] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-bold"
                    >
                      ₹3.6 L
                    </label>
                    <label
                      htmlFor=""
                      className="text-[#767676] text-[14px] font-normal"
                    >
                      Pending fee : 3.1lakh
                    </label>
                  </div>
                  <div>
                    <img
                      style={{ width: "48px" }}
                      src={fee_card_icon}
                      alt="fee_card_icon"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Card Container Two */}
            <div
              className="card-container-two-admindashboard-sms"
              style={{ display: "flex", gap: "10px" }}
            >
              {/* Attendance Overview */}
              <div
                className="student-graph-overview-sms"
                style={{
                  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                  padding: "16px",
                  borderRadius: "8px",
                  width: "100%",
                  backgroundColor: "white",
                  height: "330px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div>
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <span className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-[#1C1C1C] font-semibold flex items-center gap-1">
                      <MdOutlineEventNote size={20} /> Attendance Overview
                    </span>

                    {/* Select filter Button */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",

                        cursor: "pointer",
                        gap: "10px",
                        fontSize: "14px",
                      }}
                    >
                      <div
                        style={{
                          display: "inline-block",
                          position: "relative",
                          backgroundColor: "#EFF2F2",
                          borderRadius: "6px",
                        }}
                      >
                        <Select
                          name=""
                          id=""
                          style={{
                            width: "90px",
                            outline: "none",
                            color: "#1C1C1C",
                            paddingTop: "6px",
                            paddingBottom: "6px",
                            paddingLeft: "4px",
                            paddingRight: "10px",
                          }}
                        >
                          <option value="">Students</option>
                          <option value="">Staffs</option>
                        </Select>
                        {/* Custom Icon */}

                        <div
                          style={{
                            position: "absolute",
                            right: "8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                            color: "#1C1C1C",
                            fontSize: "8px",
                            fontWeight: "200",
                          }}
                        >
                          ▼
                        </div>
                      </div>
                      <div
                        style={{
                          display: "inline-block",
                          position: "relative",
                          backgroundColor: "#EFF2F2",
                          borderRadius: "6px",
                          width: "90px",
                        }}
                      >
                        <Select
                          name=""
                          id=""
                          style={{
                            width: "90px",
                            outline: "none",
                            color: "#1C1C1C",
                            paddingTop: "6px",
                            paddingBottom: "6px",
                            paddingLeft: "4px",
                            paddingRight: "10px",
                          }}
                        >
                          <option value="">This week</option>
                          <option value="">29-Sep-4-Oct</option>
                          <option value="">4-Oct-29-Nov</option>
                        </Select>
                        {/* Custom Icon */}

                        <div
                          style={{
                            position: "absolute",
                            right: "8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                            color: "#1C1C1C",
                            fontSize: "8px",
                            fontWeight: "200",
                          }}
                        >
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="total-student-graph-sms"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "60px",
                    }}
                  >
                    <TotalStudentGraph />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#0096C7",
                            borderRadius: "50px",
                            height: "10px",
                            width: "10px",
                          }}
                        ></div>
                        <span>Present</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#00B4D8",
                            borderRadius: "50px",
                            height: "10px",
                            width: "10px",
                          }}
                        ></div>
                        <span>Absent</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#90E0EF",
                            borderRadius: "50px",
                            height: "10px",
                            width: "10px",
                          }}
                        ></div>
                        <span>Leave</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Staff Member */}
              <div
                style={{
                  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                  padding: "16px",
                  borderRadius: "8px",
                  width: "100%",
                  height: "330px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "white",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-[#1C1C1C] font-semibold flex items-center gap-1">
                    <RiShoppingBagLine size={20} /> Staff Member
                  </span>

                  {/* Select filter Button */}

                  <div
                    style={{
                      background:
                        "linear-gradient(115deg, #F5F2ED 0%, #F4F5F0 52%, #EDF5F3 100%, #EDF5F3 100%)",
                      borderRadius: "20px",
                      padding: "6px 8px",
                      height: "40px",
                      display: "flex",
                      width: "210px",
                      gap: "10px",
                    }}
                  >
                    {/* <button style={{background: '#F5F7F7', boxShadow: '0px 4px 10px rgba(10.01, 19.13, 8.53, 0.12)',borderRadius:"14px",width:"100%",color:'#0B3142', fontSize:"14px"}}>Teacher</button>
                        <button style={{background: '#F5F7F7', boxShadow: '0px 4px 10px rgba(10.01, 19.13, 8.53, 0.12)',borderRadius:"14px",width:"100%",color:'#0B3142', fontSize:"14px"}}>Other Staff</button> */}
                    {["teacher", "staff"].map((tab) => {
                      const isActive = staffTab === tab; // ✅ inside map

                      return (
                        <button
                          key={tab}
                          onClick={() => setStaffTab(tab)}
                          style={{
                            background: isActive ? "#F5F7F7" : "transparent",
                            boxShadow: isActive
                              ? "0px 4px 10px rgba(10, 19, 8, 0.12)"
                              : "none",
                            borderRadius: "14px",
                            color: isActive ? "#0B3142" : "#9CA3AF",
                            width: "100%",
                            fontSize: "14px",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {tab === "teacher" ? "Teacher" : "Other Staff"}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div
                  style={{
                    overflow: "auto",
                    height: "calc(100% - 48px)",
                    backgroundColor: "#b3b2b222",
                    borderRadius: "4px",
                    padding: "6px",
                  }}
                >
                  {currentData.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #E6E6E6",
                        padding: "6px 0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <img src={staff} alt="" />
                        <div>
                          <label style={{ fontSize: "14px" }}>
                            {item.name}
                          </label>
                          <p style={{ fontSize: "12px", color: "#0096C7" }}>
                            {item.role}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <div
                        style={{
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color:
                            item.status === "Present"
                              ? "#009638"
                              : item.status === "Absent"
                                ? "#DC2626"
                                : "#F97316",
                          backgroundColor:
                            item.status === "Present"
                              ? "#B5FFD1"
                              : item.status === "Absent"
                                ? "#FBD1D1"
                                : "#FBEBD1",
                        }}
                      >
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Card Container Three */}
            <div
              className="card-container-three-admindashboard-sms"
              style={{ display: "flex", gap: "10px", width: "100%" }}
            >
              {/* Earnings */}
              <div
                style={{
                  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                  padding: "16px",
                  borderRadius: "8px",
                  width: "100%",
                  height: "400px",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-[#1C1C1C] font-semibold flex items-center gap-1">
                    <VscGraph size={20} /> Earnings
                  </span>

                  {/* Select filter Button */}

                  <div
                    style={{
                      background:
                        "linear-gradient(115deg, #F5F2ED 0%, #F4F5F0 52%, #EDF5F3 100%, #EDF5F3 100%)",
                      borderRadius: "20px",
                      padding: "6px 8px",
                      height: "40px",
                      display: "flex",
                      width: "210px",
                      gap: "10px",
                    }}
                  >
                    {["revenue", "expense"].map((tab) => {
                      const isActive = earningTab === tab; // ✅ inside map

                      return (
                        <button
                          key={tab}
                          onClick={() => setEarningTab(tab)}
                          style={{
                            background: isActive ? "#F5F7F7" : "transparent",
                            boxShadow: isActive
                              ? "0px 4px 10px rgba(10, 19, 8, 0.12)"
                              : "none",
                            borderRadius: "14px",
                            color: isActive ? "#0B3142" : "#9CA3AF",
                            width: "100%",
                            fontSize: "14px",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {tab === "revenue" ? "Revenue" : "Expense"}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {earningTab === "revenue" && <RevenueGraph />}
                {earningTab === "expense" && <ExpenseGraph />}
              </div>
              {/* Top Performers */}
              <div
                style={{
                  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                  padding: "16px",
                  borderRadius: "8px",
                  width: "100%",
                  height: "400px",
                  backgroundColor: "white",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-[#1C1C1C] font-semibold flex items-center gap-1">
                    <MdOutlineEventNote size={20} /> Top Performers
                  </span>

                  {/* Select filter Button */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: "center",
                      cursor: "pointer",
                      gap: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        position: "relative",
                        backgroundColor: "#EFF2F2",
                        borderRadius: "6px",
                      }}
                    >
                      <Select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        name=""
                        id=""
                        style={{
                          width: "90px",
                          outline: "none",
                          color: "#1C1C1C",
                          paddingTop: "6px",
                          paddingBottom: "6px",
                          paddingLeft: "4px",
                          paddingRight: "10px",
                        }}
                      >
                        <option value="aAl">All</option>
                        <option value="Class 1">Class 1</option>
                        <option value="Nursery">Nursery</option>
                      </Select>
                      {/* Custom Icon */}

                      <div
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          color: "#1C1C1C",
                          fontSize: "8px",
                          fontWeight: "200",
                        }}
                      >
                        ▼
                      </div>
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        position: "relative",
                        backgroundColor: "#EFF2F2",
                        borderRadius: "6px",
                        width: "90px",
                      }}
                    >
                      <Select
                        value={selectedExam}
                        onChange={(e) => setSelectedExam(e.target.value)}
                        name=""
                        id=""
                        style={{
                          width: "90px",
                          outline: "none",
                          color: "#1C1C1C",
                          paddingTop: "6px",
                          paddingBottom: "6px",
                          paddingLeft: "4px",
                          paddingRight: "10px",
                        }}
                      >
                        <option value="All">All</option>
                        <option value="Final">Final</option>
                        <option value="Mid Term">Mid Term</option>
                      </Select>
                      {/* Custom Icon */}

                      <div
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          color: "#1C1C1C",
                          fontSize: "8px",
                          fontWeight: "200",
                        }}
                      >
                        ▼
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    overflow: "auto",
                    height: "calc(100% - 48px)",
                    // backgroundColor: "#b3b2b222",
                    borderRadius: "4px",
                    padding: "6px",
                    gap: "5px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {filteredData.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        // borderBottom: "1px solid #E6E6E6",
                        padding: "6px 0",
                        backgroundColor: "#FAFBFF",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <img src={staff} alt="" />
                        <div>
                          <label
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#000000",
                            }}
                          >
                            {item.name}
                          </label>
                          <p style={{ fontSize: "12px", color: "#696969" }}>
                            {item.class}
                          </p>
                        </div>
                      </div>

                      {/* percent*/}
                      <div
                        style={{
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#000000",
                        }}
                      >
                        {item.percent}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Right Side Container */}
          <div
            className="right-side-container-sms-admindashboard"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "30%",
            }}
          >
            {/* Notice */}
            <div
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "8px",
                background: "#fff",
                padding: "0px 16px",
                boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <img src={notice} alt="notice" />
                  <span className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-[#1C1C1C] font-semibold">
                    Notice board
                  </span>
                </div>

                {/* Arrow Button */}
                <div
                  onClick={handleNoticeBoardViewClick}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "8px",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <MdOutlineKeyboardArrowRight color="#0B3142" />
                </div>
              </div>

              {/* Content Box */}
              <div
                style={{
                  background: "#f5f5f5",
                  borderRadius: "12px",
                  padding: "14px",
                }}
              >
                <div className="text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold">
                  Invitation for Republic Day
                </div>

                <div
                  className="text-[14px] lg:text-[14px] md:text-[10px] sm:text-[8px] font-normal"
                  style={{
                    color: "#666",
                    lineHeight: "1.5",
                    marginBottom: "14px",
                  }}
                >
                  Let us make a promise that we would not let the hard
                  sacrifices of our brave freedom fighters go in vain. We would
                  work hard to make our country the best in the world. Happy
                  Republic Day 2021!
                </div>

                {/* Footer */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="user"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                  />

                  <div>
                    <div className="text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold">
                      Principal
                    </div>
                    <div className="text-[12px] lg:text-[10px] md:text-[8px] sm:text-[4px] font-normal text-[#666]">
                      21 Oct, 2025 • 10:30AM
                    </div>
                  </div>
                </div>
              </div>

              {/* View More */}
              <div
                className="text-[12px] lg:text-[12px] md:text-[8px] sm:text-[4px]"
                style={{
                  textAlign: "right",
                  marginTop: "10px",

                  color: "#007bff",
                  cursor: "pointer",
                }}
              >
                View more (3)
              </div>
            </div>
            {/* Event */}
            <div
              style={{
                width: "100%",
                height: "575px",
                borderRadius: "8px",
                background: "#fff",
                padding: "16px",
                boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                gap: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <TbCalendarEvent size={20} />
                  <span className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-[#1C1C1C] font-semibold">
                    Event and Calendar
                  </span>
                </div>

                {/* Arrow Button */}
                <div
                  onClick={handleEventCalendarViewClick}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "8px",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <MdOutlineKeyboardArrowRight color="#0B3142" />
                </div>
              </div>
              <EventCalender />
              {/* Upcomin Event */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <TbCalendarEvent size={20} />
                    <span className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-[#1C1C1C] font-semibold">
                      Upcoming Events
                    </span>
                  </div>

                  {/* Arrow Button */}
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "8px",
                      background: "#f1f1f1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <MdOutlineKeyboardArrowRight color="#0B3142" />
                  </div>
                </div>
                <div style={{ position: "relative" }}>
                  <img
                    style={{
                      width: "100%",
                      maxHeight: "113px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    src={Event_img}
                    alt=""
                  />
                  <FaHeart
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                      color: "white",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      className="text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px]"
                      htmlFor=""
                      style={{ color: "#696969", fontWeight: "600" }}
                    >
                      Rhythm Fest 2025
                    </label>
                    <label
                      className="text-[12px] lg:text-[11px] md:text-[8px] sm:text-[6px]"
                      htmlFor=""
                      style={{ color: "#696969", fontWeight: "400" }}
                    >
                      Guru Randhawa Music Concert
                    </label>
                  </div>
                  <MdOutlineKeyboardArrowRight
                    style={{ fontSize: "20px", fontWeight: "600" }}
                  />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <label
                    htmlFor=""
                    className="text-[12px] lg:text-[10px] md:text-[8px] sm:text-[6px] font-normal"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "red",
                    }}
                  >
                    <FaHeart style={{ display: "flex" }} />
                    56
                  </label>
                  <label
                    htmlFor=""
                    className="text-[12px] lg:text-[11px] md:text-[8px] sm:text-[6px] font-normal"
                  >
                    on 24 October
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* container-two */}
        <div
          className="sms-adminadmindashboard-containertwo"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Active Bus Status */}
          <div
            className="active-bus-container-main"
            style={{
              borderRadius: "8px",
              background: "#fff",
              padding: "0px 16px",
              boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "300px",
              gap: "10px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-[#1C1C1C] font-semibold flex items-center gap-1">
                <TbBus size={20} /> Active Bus Status
              </span>

              {/* View All Routes Button */}
              <button
                style={{
                  backgroundColor: "#0B31421A",
                  padding: "6px 8px",
                  borderRadius: "4px",
                  color: "#0B3142",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <TbRouteSquare /> View All Routes
              </button>
            </div>
            <div
              className="active-bus-container-sms"
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <div
                className="active-bus-container-sms-map"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  columnGap: "5px",
                  rowGap: "5px",
                }}
              >
                {activeBusStatus.map((item, key) => (
                  <div
                    style={{
                      border: "1px solid #E6E6E6",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",

                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px",
                      }}
                    >
                      <img src={item.indicateIcon} alt="indicate" />
                      <label
                        htmlFor=""
                        style={{ color: item.numberColor, fontWeight: "600" }}
                      >
                        {item.number}
                      </label>
                    </span>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "end",
                      }}
                    >
                      <label
                        htmlFor=""
                        style={{
                          color: item.statusColor,
                          fontWeight: "600",
                          paddingLeft: "8px",
                        }}
                      >
                        {item.statusBus}
                      </label>
                      <img src={item.busColorIcon} alt="bus_icon" />
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="active-bus-sms"
                style={{
                  border: "1px solid #EEEEEE",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",

                  padding: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <CheckCircle size={20} color="#22C55E" />
                    <label
                      htmlFor=""
                      style={{
                        fontWeight: "600",
                        fontSize: "13px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span>Route A- North District</span>
                      <span
                        style={{
                          color: "#696969",
                          fontWeight: "400",
                          fontSize: "10px",
                        }}
                      >
                        Driver: Rajesh Yadav
                      </span>
                    </label>
                  </div>
                  {/* Status */}
                  <span
                    style={{
                      background: "#16A34A",
                      color: "#fff",
                      fontSize: "10px",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontWeight: "500",
                      height: "35px",
                      width: "70px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    On-Time
                  </span>
                </div>

                {/* Middle Section */}
                <div
                  style={{ marginTop: "14px", fontSize: "13px", color: "#555" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <MapPin size={14} />
                    <span>Current: Nehru Place Road</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "6px",
                    }}
                  >
                    <Clock size={14} />
                    <span>
                      Next Stop: Indirapuram &nbsp;
                      <span style={{ color: "#777" }}>ETA: 8:25 AM</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Section */}
                <div
                  style={{
                    marginTop: "18px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#777",
                  }}
                >
                  <span>18/25 students</span>
                  <span>Updated just now</span>
                </div>
              </div>
            </div>
          </div>
          {/* Class-wise Performance Overview*/}
          <div
            style={{
              borderRadius: "8px",
              background: "#fff",
              padding: "16px",
              boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "300px",
              gap: "10px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-[#1C1C1C] font-semibold flex items-center gap-1">
                <MdBarChart size={20} /> Class-wise Performance Overview
              </span>

              {/* Select filter Button */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",

                  cursor: "pointer",
                  gap: "10px",
                  fontSize: "14px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    position: "relative",
                    backgroundColor: "#EFF2F2",
                    borderRadius: "6px",
                  }}
                >
                  <Select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    name=""
                    id=""
                    style={{
                      width: "90px",
                      outline: "none",
                      color: "#1C1C1C",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingLeft: "4px",
                      paddingRight: "10px",
                    }}
                  >
                    <option value="Class">Class</option>
                    <option value="Nursery">Nursery</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class 1</option>
                  </Select>
                  {/* Custom Icon */}

                  <div
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#1C1C1C",
                      fontSize: "8px",
                      fontWeight: "200",
                    }}
                  >
                    ▼
                  </div>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    position: "relative",
                    backgroundColor: "#EFF2F2",
                    borderRadius: "6px",
                    width: "90px",
                  }}
                >
                  <Select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    name=""
                    id=""
                    style={{
                      width: "90px",
                      outline: "none",
                      color: "#1C1C1C",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingLeft: "4px",
                      paddingRight: "10px",
                    }}
                  >
                    <option value="Section">Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </Select>
                  {/* Custom Icon */}

                  <div
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#1C1C1C",
                      fontSize: "8px",
                      fontWeight: "200",
                    }}
                  >
                    ▼
                  </div>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    position: "relative",
                    backgroundColor: "#EFF2F2",
                    borderRadius: "6px",
                    width: "90px",
                  }}
                >
                  <Select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    name=""
                    id=""
                    style={{
                      width: "90px",
                      outline: "none",
                      color: "#1C1C1C",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingLeft: "4px",
                      paddingRight: "10px",
                    }}
                  >
                    <option value="Status">Status</option>
                    <option value="Good">Good</option>
                    <option value="Excellent">Excellent</option>
                  </Select>
                  {/* Custom Icon */}

                  <div
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#1C1C1C",
                      fontSize: "8px",
                      fontWeight: "200",
                    }}
                  >
                    ▼
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                overflow: "auto",
                height: "195px",
                border: "1px solid #EEEEEE",
                borderRadius: "8px",
              }}
            >
              <table style={{ width: "100%", fontFamily: "Segoe UI" }}>
                <thead style={{ borderBottom: "1px solid #EEEEEE" }}>
                  <tr style={{ textAlign: "left" }}>
                    <th
                      style={{
                        padding: "10px 15px",
                        color: "#1C1C1C",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      <BsArrowDownUp color="#9C9C9C" /> Class
                    </th>
                    <th
                      style={{
                        padding: "10px 15px",
                        color: "#1C1C1C",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Students
                    </th>
                    <th
                      style={{
                        padding: "10px 15px",
                        color: "#1C1C1C",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Avg Marks
                    </th>
                    <th
                      style={{
                        padding: "10px 15px",
                        color: "#1C1C1C",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Attendance %{" "}
                    </th>
                    <th
                      style={{
                        padding: "10px 15px",
                        color: "#1C1C1C",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody style={{ width: "100%" }}>
                  {classWisePerformance.map((item, key) => (
                    <tr key={key} style={{ textAlign: "left" }}>
                      <td
                        style={{
                          padding: "10px 15px",
                          color: "#1C1C1C",
                          fontWeight: "400",
                          fontSize: "14px",
                        }}
                      >
                        <span>{item.class}</span>
                      </td>
                      <td
                        style={{
                          padding: "10px 15px",
                          fontWeight: "400",
                          fontSize: "14px",
                        }}
                      >
                        <span>{item.students}</span>
                      </td>
                      <td
                        style={{
                          padding: "10px 15px",
                          fontWeight: "400",
                          fontSize: "14px",
                        }}
                      >
                        <span>{item.Avgmarks}</span>
                      </td>
                      <td
                        style={{
                          padding: "10px 15px",
                          fontWeight: "400",
                          fontSize: "14px",
                        }}
                      >
                        <span>{item.attendance}</span>
                      </td>
                      <td
                        style={{
                          padding: "10px 15px",
                          fontWeight: "400",
                          fontSize: "14px",
                        }}
                      >
                        <span
                          style={{
                            background: "#E6F4EA",
                            color: "#1E8E3E",
                            padding: "2px 5px",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              background: "#1E8E3E",
                              borderRadius: "50%",
                            }}
                          ></span>
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
        {/* container-three */}
        <div
          className="sms-adminadmindashboard-containerthree"
          style={{
            width: "100%",
            display: "flex",
            // width: "100%",
            justifyContent: "space-between",
            paddingTop: "16px",
            gap: "16px",
          }}
        >
          {/* Pending Fees List */}
          <div
            style={{
              borderRadius: "8px",
              background: "#fff",
              padding: "16px",
              boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
              // maxWidth:"948px"
              width: "100%",
              position: "relative",
              height: "410px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-[#1C1C1C] font-semibold flex items-center gap-1">
                <RxCountdownTimer size={20} /> Pending Fees List
              </span>

              {/* Select filter Button */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  cursor: "pointer",
                  gap: "10px",
                  fontSize: "14px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    position: "relative",
                    backgroundColor: "#EFF2F2",
                    borderRadius: "6px",
                  }}
                >
                  <Select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    name=""
                    id=""
                    style={{
                      width: "90px",
                      outline: "none",
                      color: "#1C1C1C",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingLeft: "4px",
                      paddingRight: "10px",
                    }}
                  >
                    <option value="Class">Class</option>
                    <option value="Nursery">Nursery</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class 1</option>
                  </Select>
                  {/* Custom Icon */}

                  <div
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#1C1C1C",
                      fontSize: "8px",
                      fontWeight: "200",
                    }}
                  >
                    ▼
                  </div>
                </div>

                <div
                  style={{
                    display: "inline-block",
                    position: "relative",
                    backgroundColor: "#EFF2F2",
                    borderRadius: "6px",
                    width: "90px",
                  }}
                >
                  <Select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    name=""
                    id=""
                    style={{
                      width: "90px",
                      outline: "none",
                      color: "#1C1C1C",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingLeft: "4px",
                      paddingRight: "10px",
                    }}
                  >
                    <option value="Status">Status</option>
                    <option value="Good">Good</option>
                    <option value="Excellent">Excellent</option>
                  </Select>
                  {/* Custom Icon */}

                  <div
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#1C1C1C",
                      fontSize: "8px",
                      fontWeight: "200",
                    }}
                  >
                    ▼
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                borderRadius: "8px",
                width: "100%",
                border: "1px solid #E6E6E6",
                overflow: "hidden",
                height: "300px",
              }}
            >
              <table style={{ width: "100%", fontFamily: "Segoe Ui" }}>
                <thead style={{ color: "#1C1C1C" }}>
                  <tr style={{ borderBottom: "1px solid #E6E6E6" }}>
                    <th
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      <BsArrowDownUp color="#9C9C9C" /> Student Name
                    </th>
                    <th
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Total Amount
                    </th>
                    <th
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Paid
                    </th>
                    <th
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Due
                    </th>
                    <th
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Due Date
                    </th>
                    <th
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: "12px" }}>
                  <tr style={{ border: "1px solid #E6E6E6" }}>
                    <td
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>
                        <img src={profile} alt="profile" />
                      </span>
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "#12516E" }}>Kareena Kapoor</span>
                        <span style={{ color: "#9C9C9C" }}>STUD-5161</span>
                      </span>
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "left" }}>
                      ₹5000
                    </td>
                    <td
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        color: "#009638",
                      }}
                    >
                      ₹4000{" "}
                    </td>
                    <td
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        color: "#DC2626",
                      }}
                    >
                      ₹1000
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "left" }}>
                      15 Jan,2025
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "left" }}>
                      <span
                        style={{
                          backgroundColor: "#FFEDB4",
                          borderRadius: "4px",
                          padding: "2px 4px",
                          color: "#A14700",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BsDot />
                        Partial
                      </span>
                    </td>
                  </tr>
                  <tr style={{ border: "1px solid #E6E6E6" }}>
                    <td
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>
                        <img src={profile} alt="profile" />
                      </span>
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "#12516E" }}>Kareena Kapoor</span>
                        <span style={{ color: "#9C9C9C" }}>STUD-5161</span>
                      </span>
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "left" }}>
                      ₹5000
                    </td>
                    <td
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        color: "#009638",
                      }}
                    >
                      ₹4000{" "}
                    </td>
                    <td
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        color: "#DC2626",
                      }}
                    >
                      ₹1000
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "left" }}>
                      15 Jan,2025
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "left" }}>
                      <span
                        style={{
                          backgroundColor: "#FFEDB4",
                          borderRadius: "4px",
                          padding: "2px 4px",
                          color: "#A14700",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BsDot />
                        Partial
                      </span>
                    </td>
                  </tr>
                  <tr style={{ border: "1px solid #E6E6E6" }}>
                    <td
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>
                        <img src={udefine_profile} alt="profile" />
                      </span>
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "#12516E" }}>Kareena Kapoor</span>
                        <span style={{ color: "#9C9C9C" }}>STUD-5161</span>
                      </span>
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "left" }}>
                      ₹5000
                    </td>
                    <td
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        color: "#009638",
                      }}
                    >
                      ₹4000{" "}
                    </td>
                    <td
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        color: "#DC2626",
                      }}
                    >
                      ₹1000
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "left" }}>
                      15 Jan,2025
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "left" }}>
                      <span
                        style={{
                          backgroundColor: "#F8D7DA",
                          borderRadius: "4px",
                          padding: "2px 4px",
                          color: "#C92131",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BsDot />
                        Overdue
                      </span>
                    </td>
                  </tr>
                  <tr style={{ border: "1px solid #E6E6E6" }}>
                    <td
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>
                        <img src={profile} alt="profile" />
                      </span>
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "#12516E" }}>Kareena Kapoor</span>
                        <span style={{ color: "#9C9C9C" }}>STUD-5161</span>
                      </span>
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "left" }}>
                      ₹5000
                    </td>
                    <td
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        color: "#009638",
                      }}
                    >
                      ₹4000{" "}
                    </td>
                    <td
                      style={{
                        padding: "12px 12px",
                        textAlign: "left",
                        color: "#DC2626",
                      }}
                    >
                      ₹1000
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "left" }}>
                      15 Jan,2025
                    </td>
                    <td style={{ padding: "12px 12px", textAlign: "left" }}>
                      <span
                        style={{
                          backgroundColor: "#E3F2FD",
                          borderRadius: "4px",
                          padding: "2px 4px",
                          color: "#1565C0",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BsDot />
                        Due
                      </span>
                    </td>
                  </tr>
                  <tr style={{ border: "1px solid #E6E6E6" }}>
                    <td
                      style={{
                        padding: "6px 8px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>
                        <img src={profile} alt="profile" />
                      </span>
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "#12516E" }}>Kareena Kapoor</span>
                        <span style={{ color: "#9C9C9C" }}>STUD-5161</span>
                      </span>
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "left" }}>
                      ₹5000
                    </td>
                    <td
                      style={{
                        padding: "6px 8px",
                        textAlign: "left",
                        color: "#009638",
                      }}
                    >
                      ₹4000{" "}
                    </td>
                    <td
                      style={{
                        padding: "6px 8px",
                        textAlign: "left",
                        color: "#DC2626",
                      }}
                    >
                      ₹1000
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "left" }}>
                      15 Jan,2025
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "left" }}>
                      <span
                        style={{
                          backgroundColor: "#E3F2FD",
                          borderRadius: "4px",
                          padding: "2px 4px",
                          color: "#1565C0",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BsDot />
                        Due
                      </span>
                    </td>
                  </tr>
                  <tr style={{ border: "1px solid #E6E6E6" }}>
                    <td
                      style={{
                        padding: "6px 8px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>
                        <img src={profile} alt="profile" />
                      </span>
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "#12516E" }}>Kareena Kapoor</span>
                        <span style={{ color: "#9C9C9C" }}>STUD-5161</span>
                      </span>
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "left" }}>
                      ₹5000
                    </td>
                    <td
                      style={{
                        padding: "6px 8px",
                        textAlign: "left",
                        color: "#009638",
                      }}
                    >
                      ₹4000{" "}
                    </td>
                    <td
                      style={{
                        padding: "6px 8px",
                        textAlign: "left",
                        color: "#DC2626",
                      }}
                    >
                      ₹1000
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "left" }}>
                      15 Jan,2025
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "left" }}>
                      <span
                        style={{
                          backgroundColor: "#E3F2FD",
                          borderRadius: "4px",
                          padding: "2px 4px",
                          color: "#1565C0",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BsDot />
                        Due
                      </span>
                    </td>
                  </tr>
                  <tr style={{ border: "1px solid #E6E6E6" }}>
                    <td
                      style={{
                        padding: "6px 8px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>
                        <img src={profile} alt="profile" />
                      </span>
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "#12516E" }}>Kareena Kapoor</span>
                        <span style={{ color: "#9C9C9C" }}>STUD-5161</span>
                      </span>
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "left" }}>
                      ₹5000
                    </td>
                    <td
                      style={{
                        padding: "6px 8px",
                        textAlign: "left",
                        color: "#009638",
                      }}
                    >
                      ₹4000{" "}
                    </td>
                    <td
                      style={{
                        padding: "6px 8px",
                        textAlign: "left",
                        color: "#DC2626",
                      }}
                    >
                      ₹1000
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "left" }}>
                      15 Jan,2025
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "left" }}>
                      <span
                        style={{
                          backgroundColor: "#E3F2FD",
                          borderRadius: "4px",
                          padding: "2px 4px",
                          color: "#1565C0",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BsDot />
                        Due
                      </span>
                    </td>
                  </tr>
                  <tr style={{ border: "1px solid #E6E6E6" }}>
                    <td
                      style={{
                        padding: "6px 8px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>
                        <img src={profile} alt="profile" />
                      </span>
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "#12516E" }}>Kareena Kapoor</span>
                        <span style={{ color: "#9C9C9C" }}>STUD-5161</span>
                      </span>
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "left" }}>
                      ₹5000
                    </td>
                    <td
                      style={{
                        padding: "6px 8px",
                        textAlign: "left",
                        color: "#009638",
                      }}
                    >
                      ₹4000{" "}
                    </td>
                    <td
                      style={{
                        padding: "6px 8px",
                        textAlign: "left",
                        color: "#DC2626",
                      }}
                    >
                      ₹1000
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "left" }}>
                      15 Jan,2025
                    </td>
                    <td style={{ padding: "6px 8px", textAlign: "left" }}>
                      <span
                        style={{
                          backgroundColor: "#E3F2FD",
                          borderRadius: "4px",
                          padding: "2px 4px",
                          color: "#1565C0",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <BsDot />
                        Due
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "15px",
                zIndex: "9999",
                right: "15px",
              }}
            >
              <Link
                style={{
                  color: "#118AB2",
                  fontWeight: "400",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                View All <MdOutlineKeyboardArrowRight />
              </Link>
            </div>
          </div>
          {/* Today's Timetable */}
          <div
            style={{
              borderRadius: "8px",
              background: "#fff",
              padding: "16px",
              boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
              width: "100%",
              position: "relative",
              overflow: "hidden",
              height: "410px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-[#1C1C1C] font-semibold flex items-center gap-1">
                <CgTime size={20} /> Today's Timetable
              </span>

              {/* Select filter Button */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  cursor: "pointer",
                  gap: "10px",
                  fontSize: "14px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    position: "relative",
                    backgroundColor: "#EFF2F2",
                    borderRadius: "6px",
                  }}
                >
                  <Select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    name=""
                    id=""
                    style={{
                      width: "90px",
                      outline: "none",
                      color: "#1C1C1C",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingLeft: "4px",
                      paddingRight: "10px",
                    }}
                  >
                    <option value="Class">Class</option>
                    <option value="Nursery">Nursery</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class 1</option>
                  </Select>
                  {/* Custom Icon */}

                  <div
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#1C1C1C",
                      fontSize: "8px",
                      fontWeight: "200",
                    }}
                  >
                    ▼
                  </div>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    position: "relative",
                    backgroundColor: "#EFF2F2",
                    borderRadius: "6px",
                    width: "90px",
                  }}
                >
                  <Select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    name=""
                    id=""
                    style={{
                      width: "90px",
                      outline: "none",
                      color: "#1C1C1C",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingLeft: "4px",
                      paddingRight: "10px",
                    }}
                  >
                    <option value="Status">Period 1</option>
                    <option value="Good">Period 2</option>
                    <option value="Excellent">Excellent</option>
                  </Select>
                  {/* Custom Icon */}

                  <div
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#1C1C1C",
                      fontSize: "8px",
                      fontWeight: "200",
                    }}
                  >
                    ▼
                  </div>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    position: "relative",
                    backgroundColor: "#EFF2F2",
                    borderRadius: "6px",
                    width: "90px",
                  }}
                >
                  <Select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    name=""
                    id=""
                    style={{
                      width: "90px",
                      outline: "none",
                      color: "#1C1C1C",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingLeft: "4px",
                      paddingRight: "10px",
                    }}
                  >
                    <option value="Status">Status</option>
                    <option value="Good">Good</option>
                    <option value="Excellent">Excellent</option>
                  </Select>
                  {/* Custom Icon */}

                  <div
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#1C1C1C",
                      fontSize: "8px",
                      fontWeight: "200",
                    }}
                  >
                    ▼
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                height: "300px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100px",
                  border: "1px solid #E6E6E6",
                  borderRadius: "8px",
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <label
                    htmlFor=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      color: "#696969",
                    }}
                  >
                    Mathematics{" "}
                    <span
                      style={{
                        backgroundColor: "#EEEEEE",
                        borderRadius: "8px",
                        padding: "4px 5px",
                        color: "#1C1C1C",
                        fontSize: "12px",
                      }}
                    >
                      Completed
                    </span>
                  </label>
                  <label
                    htmlFor=""
                    style={{
                      border: "1px solid #E6E6E6",
                      padding: "2px 5px",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    Class 10-A
                  </label>
                </div>
                <div
                  style={{
                    color: "#9C9C9C",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  <label
                    htmlFor=""
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <MdOutlineWatchLater /> 8:30 - 9:15 AM
                  </label>
                  <label
                    htmlFor=""
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <CiLocationOn /> Room 201
                  </label>
                </div>
              </div>
              <div
                style={{
                  height: "100px",
                  border: "1px solid #E6E6E6",
                  borderRadius: "8px",
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <label
                    htmlFor=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      color: "#696969",
                    }}
                  >
                    Mathematics{" "}
                    <span
                      style={{
                        backgroundColor: "#EEEEEE",
                        borderRadius: "8px",
                        padding: "4px 5px",
                        color: "#1C1C1C",
                        fontSize: "12px",
                      }}
                    >
                      Completed
                    </span>
                  </label>
                  <label
                    htmlFor=""
                    style={{
                      border: "1px solid #E6E6E6",
                      padding: "2px 5px",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    Class 10-A
                  </label>
                </div>
                <div
                  style={{
                    color: "#9C9C9C",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  <label
                    htmlFor=""
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <MdOutlineWatchLater /> 8:30 - 9:15 AM
                  </label>
                  <label
                    htmlFor=""
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <CiLocationOn /> Room 201
                  </label>
                </div>
              </div>
              <div
                style={{
                  height: "100px",
                  border: "1px solid #E6E6E6",
                  borderRadius: "8px",
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <label
                    htmlFor=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      color: "#696969",
                    }}
                  >
                    Mathematics{" "}
                    <span
                      style={{
                        backgroundColor: "#EEEEEE",
                        borderRadius: "8px",
                        padding: "4px 5px",
                        color: "#1C1C1C",
                        fontSize: "12px",
                      }}
                    >
                      Completed
                    </span>
                  </label>
                  <label
                    htmlFor=""
                    style={{
                      border: "1px solid #E6E6E6",
                      padding: "2px 5px",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    Class 10-A
                  </label>
                </div>
                <div
                  style={{
                    color: "#9C9C9C",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  <label
                    htmlFor=""
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <MdOutlineWatchLater /> 8:30 - 9:15 AM
                  </label>
                  <label
                    htmlFor=""
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <CiLocationOn /> Room 201
                  </label>
                </div>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "15px",
                zIndex: "9999",
                right: "15px",
              }}
            >
              <Link
                style={{
                  color: "#118AB2",
                  fontWeight: "400",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                View All <MdOutlineKeyboardArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
