import React,{useState} from "react";
import attendance from "../../assets/GIF/attendance.gif";
import homework from "../../assets/GIF/homework.gif";
import fee from "../../assets/GIF/rupee.gif";
import exam from "../../assets/GIF/exam.gif";
import curves_card from "../../assets/images/curves.png";
import notice from "../../assets/images/notice.png";
import Event_img from "../../assets/images/event-img.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { LuDoorOpen } from "react-icons/lu";
import { ImSpoonKnife } from "react-icons/im";
import { TbCalendarEvent } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import EventCalender from "./EventCalender";
import { Eye, Download, FileText } from "lucide-react";
import { CiClock2 } from "react-icons/ci";

const StudentDashboard = () => {
  const [active, setActive] = useState("All");
  const tabs = [
    "All",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Computer Science",
    "English",
  ];

  return (
    <div>
      {/* Student StudentDashboard */}
      <div className="">
        {/* Student Header */}
        <div className="flex justify-between align-center">
          <span>
            <h1 className="text-[30px] lg:text[25] md:text-[15px] sm:text[10px] text-[#0B3142] font-semibold font-family: var(<Segoe UI>); ">
              Welcome Back, Priyanshu Singh (10-A)
            </h1>
            <p className="text[#696969] text-[24px] lg:text[20]  md:text-[15px] sm:text[10px] text-[#0B3142] font-normal">
              Here’s a Quick Overview of Today’s Activities
            </p>
          </span>
          <span className="text-[#696969] font-normal">
            <p className="text-[14px] text-right">9:30 AM</p>
            <p className="text-[14px] ">22 October 2025, Sunday</p>
          </span>
        </div>
          {/* container-one */}
        <div
          style={{
            padding: "16px 0",
            display: "flex",
            gap: "16px",
            justifyContent: "space-between",
            width: "100%",
          }}
        > 
        {/* Left Side Container */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: "10px",
              }}
            >
              {/*Student Card  */}
              <div
                className=""
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
                <p className="text-[14px] lg:text-[12px] md:text-[10] sm:text-[8px] text[#1C1C1C] font-normal">
                  Attendance Rate%
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
                      className="text-[#1C1C1C] text-[28px] lg:text-[24px] md:text-[20] sm:text-[16px] font-bold"
                    >
                      87%
                    </label>
                    <label
                      htmlFor=""
                      className="text-[#767676] text-[14px] lg:text-[12px] md:text-[10] sm:text-[8px] font-normal"
                    >
                      Good
                    </label>
                  </div>
                  <div>
                    <img
                      style={{ width: "48px" }}
                      src={attendance}
                      alt="attendance"
                    />
                  </div>
                </div>
              </div>
              {/*Student Card  */}
              <div
                className=""
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
                <p className="text-[14px] lg:text-[12px] md:text-[10] sm:text-[8px] text[#1C1C1C] font-normal">
                  Homework
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
                      className="text-[#1C1C1C] text-[28px] lg:text-[24px] md:text-[20] sm:text-[16px] font-bold"
                    >
                      3
                    </label>
                    <label
                      htmlFor=""
                      className="text-[#767676] text-[14px] font-normal"
                    >
                      Pending to complete
                    </label>
                  </div>
                  <div>
                    <img
                      style={{ width: "48px" }}
                      src={homework}
                      alt="attendance"
                    />
                  </div>
                </div>
              </div>
              {/*Student Card  */}
              <div
                className=""
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
                <p className="text-[14px] lg:text-[12px] md:text-[10] sm:text-[8px] text[#1C1C1C] font-normal">
                  Fee
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
                      className="text-[#1C1C1C] text-[28px] lg:text-[24px] md:text-[20] sm:text-[16px] font-bold"
                    >
                      ₹ 0
                    </label>
                    <label
                      htmlFor=""
                      className="text-[#767676] text-[14px] font-normal"
                    >
                      Pending Fee: ₹1,00,000
                    </label>
                  </div>
                  <div>
                    <img style={{ width: "48px" }} src={fee} alt="attendance" />
                  </div>
                </div>
              </div>
              {/*Student Card  */}
              <div
                className=""
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
                <p className="text-[14px] lg:text-[12px] md:text-[10] sm:text-[8px] text[#1C1C1C] font-normal">
                  Upcoming Exams
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
                      className="text-[#1C1C1C] text-[28px] lg:text-[24px] md:text-[20] sm:text-[16px] font-bold"
                    >
                      Jan 28, 2026
                    </label>
                    <label
                      htmlFor=""
                      className="text-[#767676] text-[14px] font-normal"
                    >
                      Mid- Term Exam
                    </label>
                  </div>
                  <div>
                    <img
                      style={{ width: "48px" }}
                      src={exam}
                      alt="attendance"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div
              style={{
                boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                padding: "16px",
                borderRadius: "8px",
                width: "100%",
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
                <span className="text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px] text-[#1C1C1C] font-semibold">
                  Timetable
                </span>

                {/* Arrow Button */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {/* timetable-card */}
                 {/* Week Card All*/}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      height: "35px",
                    }}
                  >
                    Time Slot
                  </div>
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      height: "35px",
                    }}
                  >
                    Monday
                  </div>
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      height: "35px",
                    }}
                  >
                    Monday
                  </div>
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      height: "35px",
                    }}
                  >
                    Monday
                  </div>
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      height: "35px",
                    }}
                  >
                    Monday
                  </div>
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      height: "35px",
                    }}
                  >
                    Monday
                  </div>
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      height: "35px",
                    }}
                  >
                    Monday
                  </div>
                </div>
                 {/* Subject Period Card All*/}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                > 
                 {/* card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #EEEEEE",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        08:00:AM
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#9C9C9C] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold"
                      >
                        08:45AM
                      </label>
                    </div>
                    <div
                      className="text-[14px] lg:text-[10px] md:text-[10px] sm:text-[8px]"
                      style={{
                        border: "1px solid #0000001A",
                        padding: "4px",
                        borderRadius: "4px",
                        color: "#9C9C9C",
                      }}
                    >
                      Period 1
                    </div>
                  </div>
                    {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #277DA1",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#DFECF1",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen /> Room 101
                      </label>
                    </div>
                  </div>
                   {/* Card */}
                  <div
                    className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F94144",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEE3E3",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #43AA8B",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E3F2EE",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F9C74F",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEF7E5",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #577590",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E6EAEF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #90BE6D",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#EFF5E9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                </div>
                 {/* Subject Period Card All*/}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                > 
                 {/* card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #EEEEEE",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        08:00:AM
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#9C9C9C] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold"
                      >
                        08:45AM
                      </label>
                    </div>
                    <div
                      className="text-[14px] lg:text-[10px] md:text-[10px] sm:text-[8px]"
                      style={{
                        border: "1px solid #0000001A",
                        padding: "4px",
                        borderRadius: "4px",
                        color: "#9C9C9C",
                      }}
                    >
                      Period 2
                    </div>
                  </div>
                    {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #277DA1",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#DFECF1",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen /> Room 101
                      </label>
                    </div>
                  </div>
                   {/* Card */}
                  <div
                    className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F94144",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEE3E3",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #43AA8B",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E3F2EE",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F9C74F",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEF7E5",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #577590",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E6EAEF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #90BE6D",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#EFF5E9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                </div>
                 {/* Subject Period Card All*/}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                > 
                 {/* card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #EEEEEE",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        08:00:AM
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#9C9C9C] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold"
                      >
                        08:45AM
                      </label>
                    </div>
                    <div
                      className="text-[14px] lg:text-[10px] md:text-[10px] sm:text-[8px]"
                      style={{
                        border: "1px solid #0000001A",
                        padding: "4px",
                        borderRadius: "4px",
                        color: "#9C9C9C",
                      }}
                    >
                      Period 3
                    </div>
                  </div>
                    {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #277DA1",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#DFECF1",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen /> Room 101
                      </label>
                    </div>
                  </div>
                   {/* Card */}
                  <div
                    className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F94144",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEE3E3",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #43AA8B",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E3F2EE",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F9C74F",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEF7E5",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #577590",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E6EAEF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #90BE6D",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#EFF5E9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                </div>
                {/* Subject Period Card All*/}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                > 
                 {/* card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #EEEEEE",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        08:00:AM
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#9C9C9C] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold"
                      >
                        08:45AM
                      </label>
                    </div>
                    <div
                      className="text-[14px] lg:text-[10px] md:text-[10px] sm:text-[8px]"
                      style={{
                        border: "1px solid #0000001A",
                        padding: "4px",
                        borderRadius: "4px",
                        color: "#9C9C9C",
                      }}
                    >
                      Period 4
                    </div>
                  </div>
                    {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #277DA1",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#DFECF1",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen /> Room 101
                      </label>
                    </div>
                  </div>
                   {/* Card */}
                  <div
                    className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F94144",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEE3E3",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #43AA8B",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E3F2EE",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F9C74F",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEF7E5",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #577590",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E6EAEF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #90BE6D",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#EFF5E9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                </div>
                 {/* Subject Period Card All*/}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                > 
                 {/* card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #EEEEEE",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        08:00:AM
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#9C9C9C] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold"
                      >
                        08:45AM
                      </label>
                    </div>
                    <div
                      className="text-[14px] lg:text-[10px] md:text-[10px] sm:text-[8px]"
                      style={{
                        border: "1px solid #0000001A",
                        padding: "4px",
                        borderRadius: "4px",
                        color: "#9C9C9C",
                      }}
                    >
                      Period 5
                    </div>
                  </div>
                    {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #277DA1",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#DFECF1",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen /> Room 101
                      </label>
                    </div>
                  </div>
                   {/* Card */}
                  <div
                    className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F94144",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEE3E3",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #43AA8B",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E3F2EE",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F9C74F",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEF7E5",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #577590",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E6EAEF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #90BE6D",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#EFF5E9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                </div>
                 {/* Lunch Period Card All*/}
                <div
                  style={{
                    display: "flex",
                    // justifyContent: "space-between",
                    alignItems:'center',
                    gap: "10px",
                  }}
                > 
                 {/* card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #EEEEEE",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        08:00:AM
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#9C9C9C] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold"
                      >
                        08:45AM
                      </label>
                    </div>
                    <div
                      className="text-[14px] lg:text-[10px] md:text-[10px] sm:text-[8px]"
                      style={{
                        border: "1px solid #0000001A",
                        padding: "4px",
                        borderRadius: "4px",
                        color: "#9C9C9C",
                      }}
                    >
                      Lunch
                    </div>
                  </div>
                     <label htmlFor="" style={{color:"#F97316",width:'100%', display:'flex', alignItems:"center", justifyContent:"center"}}><ImSpoonKnife/> Lunch Break - 45 minutes</label>
                </div>
                 {/* Subject Period Card All*/}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                > 
                 {/* card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #EEEEEE",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        08:00:AM
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#9C9C9C] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold"
                      >
                        08:45AM
                      </label>
                    </div>
                    <div
                      className="text-[14px] lg:text-[10px] md:text-[10px] sm:text-[8px]"
                      style={{
                        border: "1px solid #0000001A",
                        padding: "4px",
                        borderRadius: "4px",
                        color: "#9C9C9C",
                      }}
                    >
                      Period 6
                    </div>
                  </div>
                    {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #277DA1",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#DFECF1",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen /> Room 101
                      </label>
                    </div>
                  </div>
                   {/* Card */}
                  <div
                    className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F94144",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEE3E3",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #43AA8B",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E3F2EE",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F9C74F",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEF7E5",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #577590",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E6EAEF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #90BE6D",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#EFF5E9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                </div>
                  {/* Subject Period Card All*/}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                > 
                 {/* card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #EEEEEE",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        08:00:AM
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#9C9C9C] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold"
                      >
                        08:45AM
                      </label>
                    </div>
                    <div
                      className="text-[14px] lg:text-[10px] md:text-[10px] sm:text-[8px]"
                      style={{
                        border: "1px solid #0000001A",
                        padding: "4px",
                        borderRadius: "4px",
                        color: "#9C9C9C",
                      }}
                    >
                      Period 7
                    </div>
                  </div>
                    {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #277DA1",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#DFECF1",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen /> Room 101
                      </label>
                    </div>
                  </div>
                   {/* Card */}
                  <div
                    className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F94144",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEE3E3",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #43AA8B",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E3F2EE",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F9C74F",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEF7E5",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #577590",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E6EAEF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #90BE6D",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#EFF5E9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                </div>
                 {/* Subject Period Card All*/}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                > 
                 {/* card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #EEEEEE",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        08:00:AM
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#9C9C9C] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold"
                      >
                        08:45AM
                      </label>
                    </div>
                    <div
                      className="text-[14px] lg:text-[10px] md:text-[10px] sm:text-[8px]"
                      style={{
                        border: "1px solid #0000001A",
                        padding: "4px",
                        borderRadius: "4px",
                        color: "#9C9C9C",
                      }}
                    >
                      Period 8
                    </div>
                  </div>
                    {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #277DA1",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#DFECF1",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#277DA1] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen /> Room 101
                      </label>
                    </div>
                  </div>
                   {/* Card */}
                  <div
                    className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F94144",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEE3E3",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#F94144] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #43AA8B",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E3F2EE",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#43AA8B] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #F9C74F",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#FEF7E5",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#D39F23] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #577590",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E6EAEF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#577590] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className="text-[#1C1C1C] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-center"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      maxWidth: "153px",
                      border: "1px solid #90BE6D",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#EFF5E9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] font-semibold"
                      >
                        Mathematics
                      </label>
                      <label
                        htmlFor=""
                        className="text-[#90BE6D] text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-semibold flex gap-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LuDoorOpen />
                        Room 101
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
              {/* Right Side Container */}
            <div style={{display:'flex', flexDirection:"column", gap:"10px"}}>
            <div
              style={{
                width: "100%",
                maxWidth: "392px",
                borderRadius: "8px",
                background: "#fff",
                padding: "16px",
                boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                fontFamily: "sans-serif",
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
                  <span className="text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px] text-[#1C1C1C] font-semibold">
                    Notice board
                  </span>
                </div>

                {/* Arrow Button */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
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
                  className="text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] font-normal"
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
                className="text-[12px] lg:text-[10px] md:text-[8px] sm:text-[4px]"
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
             <div style={{ width: "100%",
                maxWidth: "392px",
                borderRadius: "8px",
                background: "#fff",
                padding: "16px",
                boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                gap:"10px",
                display:"flex",
                flexDirection:'column'
                }}>
                

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
                  <span className="text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px] text-[#1C1C1C] font-semibold">
                    Event and Calendar
                  </span>
                </div>

                {/* Arrow Button */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </div>
                 
              </div>
                <EventCalender/>
                {/* Upcomin Event */}
                 <div style={{display:'flex', flexDirection:"column", gap:"10px"}}>
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
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                 <TbCalendarEvent size={20} />
                  <span className="text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px] text-[#1C1C1C] font-semibold">
                    Upcoming Events
                  </span>
                </div>

                {/* Arrow Button */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </div>
                 
              </div>
                <div style={{position:"relative"}}>
                  <img style={{width:"100%", maxHeight:"113px", objectFit:"cover", borderRadius:"8px"}} src={Event_img} alt="" />
                  <FaHeart   style={{position:"absolute", bottom:"5px", right:"5px", color:"white"}}/>
                </div>
                 <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                   <div style={{display:"flex", flexDirection:"column"}}>
                    <label className="text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px]" htmlFor="" style={{color:'#696969', fontWeight:"600"}}>Rhythm Fest 2025</label>
                    <label className="text-[12px] lg:text-[10px] md:text-[8px] sm:text-[6px]" htmlFor="" style={{color:'#696969' , fontWeight:'400'}}>Guru Randhawa Music Concert</label>
                   </div>
                     <MdOutlineKeyboardArrowRight style={{fontSize:"20px", fontWeight:"600"}} />
                 </div>
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                    <label htmlFor="" className="text-[12px] lg:text-[10px] md:text-[8px] sm:text-[6px] font-normal"  style={{display:"flex", alignItems:"center", gap:"4px"}}><FaHeart style={{color:"red", display:"flex"}}/>56</label>
                    <label htmlFor="" className="text-[12px] lg:text-[10px] md:text-[8px] sm:text-[6px] font-normal">on 24 October</label>
                  </div>
                 </div>
             </div>
          </div>
        </div>
        {/* container-two */}
         <div style={{ borderRadius: "8px",
                background: "#fff",
                padding: "16px",
                boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                width:"100%"
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
                
              
                 
                  <span className="text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px] text-[#1C1C1C] font-semibold">
                   Live Bus Tracking
                  </span>
               

                {/* Arrow Button */}
                <div
                 className="text-[16px] lg:text-[14px] md:text-[12] sm:text-[10px]"
                  style={{
                    color:"#0B3142",
                    fontWeight:"600",
                    borderRadius: "12px",
                    background: "#FFC63C",
                    padding:"8px 8px",
                    textAlign:"center"
                  }}
                >
                   Arriving in 20 Min
                </div>
              </div>
               <div style={{display:"flex", gap:"16px", justifyContent:"space-between"}}>
              
                  <div style={{display:"flex", flexDirection:"column", gap:"16px", width:"40%"}}>
                 <div
  style={{
    maxWidth:"358px",
    // width:"100%",
    background: "white",
    border:"1px solid #E6E6E6",
    borderRadius:"16px",
    padding:'16px',
    boxSizing: "border-box",
   
    
  }}
>
  <label
   className="text-[16px] lg:text-[14px] md:text-[12] sm:text-[10px]"
    style={{
       fontWeight:"600",
      color: "#696969",
    }}
  >
    Bus Details
  </label>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: "46px",
          height: "46px",
          minWidth: "46px",
          borderRadius: "50%",
          background: "#F1F1F1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
            stroke="#111111"
            strokeWidth="1.8"
          />
          <path
            d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20"
            stroke="#111111"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div>
        <div
        className="text-[12px] lg:text-[12px] md:text-[10] sm:text-[10px]"
          style={{
            fontWeight:"400",
            color: "#696969",
          }}
        >
          Rajesh Kumar
        </div>
        <div
         className="text-[16px] lg:text-[14px] md:text-[10px] sm:text-[8px]"
          style={{
            
            fontWeight: "700",
            lineHeight: "30px",
            color: "#1C1C1C",
          }}
        >
          Bus Driver
        </div>
      </div>
    </div>

    <div style={{ textAlign: "right" }}>
      <div
         className="text-[12px] lg:text-[12px] md:text-[10] sm:text-[10px]"
        style={{
         
          fontWeight: "400",
          color: "#696969",
         
        }}
      >
        Bus Number
      </div>
      <div
       className="text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px]"
        style={{
          
          fontWeight: "700",
          lineHeight: "34px",
          color: "#1C1C1C",
        }}
      >
        B-12
      </div>
    </div>
  </div>

  <button
   className="text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px]"
    style={{
      width: "100%",
     padding:"8px 10px",
      border: "none",
      borderRadius: "10px",
      background: "#009638",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
     
      fontWeight: "600",
      cursor: "pointer",
    }}
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 16.92V19.92C22.0011 20.1985 21.944 20.4741 21.8323 20.7292C21.7206 20.9843 21.5568 21.2134 21.3514 21.4017C21.146 21.59 20.9035 21.7332 20.6394 21.8222C20.3754 21.9113 20.0957 21.9442 19.818 21.919C16.7428 21.584 13.7884 20.5328 11.192 18.852C8.77621 17.3176 6.72783 15.2692 5.19398 12.854C3.50784 10.2481 2.45639 7.28179 2.12798 4.19498C2.10296 3.91808 2.13562 3.63904 2.2239 3.37555C2.31218 3.11207 2.45417 2.86999 2.64083 2.66483C2.8275 2.45967 3.05472 2.29591 3.30824 2.18404C3.56176 2.07217 3.83617 2.01464 4.11398 2.01498H7.11398C7.59928 2.0102 8.06975 2.18204 8.43868 2.49868C8.80761 2.81532 9.04979 3.25502 9.11998 3.73498C9.25088 4.72855 9.49351 5.70429 9.84398 6.64498C9.97865 7.00363 10.007 7.39358 9.92568 7.76787C9.84436 8.14216 9.65685 8.48508 9.38598 8.75598L8.11598 10.026C9.53954 12.5295 11.6134 14.6034 14.117 16.027L15.387 14.757C15.6579 14.4861 16.0008 14.2986 16.3751 14.2173C16.7494 14.136 17.1393 14.1643 17.498 14.299C18.4387 14.6495 19.4144 14.8921 20.408 15.023C20.8932 15.0938 21.3375 15.3404 21.6549 15.7162C21.9722 16.0921 22.1414 16.5696 22.13 17.062L22 16.92Z"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
      +91 98765 43210
  </button>
                 </div>
                  <div
  style={{
    maxWidth:"358px",
    // width:"100%",
    background: "white",
    border:"1px solid #E6E6E6",
    borderRadius:"16px",
    padding:'16px',
    boxSizing: "border-box",
   
    
  }}
>
  <label
   className="text-[16px] lg:text-[14px] md:text-[12] sm:text-[10px]"
    style={{
       fontWeight:"600",
      color: "#696969",
    }}
  >
    Bus Details
  </label>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: "46px",
          height: "46px",
          minWidth: "46px",
          borderRadius: "50%",
          background: "#F1F1F1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
            stroke="#111111"
            strokeWidth="1.8"
          />
          <path
            d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20"
            stroke="#111111"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div>
        <div
        className="text-[12px] lg:text-[12px] md:text-[10] sm:text-[10px]"
          style={{
            fontWeight:"400",
            color: "#696969",
          }}
        >
          Rajesh Kumar
        </div>
        <div
         className="text-[16px] lg:text-[14px] md:text-[10px] sm:text-[8px]"
          style={{
            
            fontWeight: "700",
            lineHeight: "30px",
            color: "#1C1C1C",
          }}
        >
          Bus Driver
        </div>
      </div>
    </div>

    <div style={{ textAlign: "right" }}>
      <div
         className="text-[12px] lg:text-[12px] md:text-[10] sm:text-[10px]"
        style={{
         
          fontWeight: "400",
          color: "#696969",
         
        }}
      >
        Bus Number
      </div>
      <div
       className="text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px]"
        style={{
          
          fontWeight: "700",
          lineHeight: "34px",
          color: "#1C1C1C",
        }}
      >
        B-12
      </div>
    </div>
  </div>

  <button
   className="text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px]"
    style={{
      width: "100%",
     padding:"8px 10px",
      border: "none",
      borderRadius: "10px",
      background: "#009638",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
     
      fontWeight: "600",
      cursor: "pointer",
    }}
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 16.92V19.92C22.0011 20.1985 21.944 20.4741 21.8323 20.7292C21.7206 20.9843 21.5568 21.2134 21.3514 21.4017C21.146 21.59 20.9035 21.7332 20.6394 21.8222C20.3754 21.9113 20.0957 21.9442 19.818 21.919C16.7428 21.584 13.7884 20.5328 11.192 18.852C8.77621 17.3176 6.72783 15.2692 5.19398 12.854C3.50784 10.2481 2.45639 7.28179 2.12798 4.19498C2.10296 3.91808 2.13562 3.63904 2.2239 3.37555C2.31218 3.11207 2.45417 2.86999 2.64083 2.66483C2.8275 2.45967 3.05472 2.29591 3.30824 2.18404C3.56176 2.07217 3.83617 2.01464 4.11398 2.01498H7.11398C7.59928 2.0102 8.06975 2.18204 8.43868 2.49868C8.80761 2.81532 9.04979 3.25502 9.11998 3.73498C9.25088 4.72855 9.49351 5.70429 9.84398 6.64498C9.97865 7.00363 10.007 7.39358 9.92568 7.76787C9.84436 8.14216 9.65685 8.48508 9.38598 8.75598L8.11598 10.026C9.53954 12.5295 11.6134 14.6034 14.117 16.027L15.387 14.757C15.6579 14.4861 16.0008 14.2986 16.3751 14.2173C16.7494 14.136 17.1393 14.1643 17.498 14.299C18.4387 14.6495 19.4144 14.8921 20.408 15.023C20.8932 15.0938 21.3375 15.3404 21.6549 15.7162C21.9722 16.0921 22.1414 16.5696 22.13 17.062L22 16.92Z"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
      +91 98765 43210
  </button>
                 </div>
                  </div>
                  
                     
                      <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.285862096596!2d77.35719915!3d28.620125999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5456ef36d9f%3A0x3b7191b1286136c8!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1775815454684!5m2!1sen!2sin"
 
  style={{ width:"100%" , borderRadius:"16px"}}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
                     ></iframe>
                 
                 
               </div>
               
         </div>
          {/* container-three */}
           <div style={{width:"100%", display:"flex", justifyContent:"space-between", paddingTop:"16px", gap:"16px"}}>

               <div style={{ borderRadius: "8px",
                background: "#fff",
                padding: "16px",
                boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                // maxWidth:"948px"
                width:'100%'
                }}>
                 {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                
                
                 
                  <span className="text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px] text-[#1C1C1C] font-semibold">
                    Study Material
                  </span>
                

                {/* Arrow Button */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </div>
              </div>
                 <div
      style={{
        display: "inline-block",
        background: "#f2f2ef",
        padding: "6px 8px",
        borderRadius: "22px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {tabs.map((tab) => {
          const isActive = active === tab;

          return (
            <button
             className="text-[14px] text:lg-[12px] text:md-[10px] text:sm-[10px]"
              key={tab}
              onClick={() => setActive(tab)}
              style={{
                height: "30px",
                padding: "0 24px",
                border: "none",
                borderRadius: "16px",

                fontWeight: 600,
                cursor: "pointer",
                background: isActive ? "#e9e9e6" : "transparent",
                color: isActive ? "#17384b" : "#9a9a9a",
                boxShadow: isActive
                  ? "0 1px 2px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)"
                  : "none",
                transition: "all 0.2s ease",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
                </div>
                 <div style={{display:"grid", gridTemplateColumns:"repeat(2, 0fr)", columnGap:"16px", rowGap:'16px', marginTop:"12px"}}>
                 <div
      style={{
        maxWidth: "438px",
        background: "#FFFFFF",
        borderRadius: "12px",
        padding: "20px",
        boxSizing: "border-box",
        border:'1px solid #E6E6E6'
      }}
    >
      {/* Top Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
           className="text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px]"
            style={{
              margin: 0,
            
              fontWeight: 600,
              color: "#222",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Chapter 5: Photosynthesis - C...
          </h3>

          <p
          className="text-[16px] lg:text-[14px] md:text-[12] sm:text-[10px]"
            style={{
              margin: "10px 0 0",
              fontSize: "14px",
              color: "#9C9C9C",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
               fontWeight:'400'
            }}
          >
            Comprehensive notes covering the...
          </p>
        </div>

        <div
        className="text-[12px] lg:text-[10px] md:text-[8px] sm:text-[6px]"
          style={{
            
            color: "#1565C0",
            border: "1px solid #1447E640",
            background: "#1447E626",
            padding: "4px 6px",
            borderRadius: "8px",
           
          }}
        >
          Document
        </div>
      </div>

      {/* Meta Info */}
      <div
        className="text-[16px] lg:text-[14px] md:text-[12] sm:text-[10px]"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginTop: "18px",
         
          color: "#696969",
        }}
      >
        <span style={{  lineHeight: 0.8 }}>•</span>
        <span>Ms. Sarah Johnson</span>
        <span style={{ lineHeight: 0.8 }}>•</span>
        <span>2.4 MB</span>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "#dddddd",
          marginTop: "16px",
          marginBottom: "16px",
        }}
      />

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <button
          style={{
            height: "34px",
            minWidth: "104px",
            border: "1px solid #9C9C9C",
            borderRadius: "6px",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#696969",
            cursor: "pointer",
          }}
          >
          <Eye size={16} />
          Preview
        </button>

        <button
          style={{
            height: "34px",
            minWidth: "118px",
             border: "1px solid #9C9C9C",
            borderRadius: "6px",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#696969",
            cursor: "pointer",
          }}
        >
          <Download size={16} />
          Download
        </button>
      </div>
                </div>
                <div
      style={{
        maxWidth: "438px",
        background: "#FFFFFF",
        borderRadius: "12px",
        padding: "20px",
        boxSizing: "border-box",
        border:'1px solid #E6E6E6'
      }}
    >
      {/* Top Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
           className="text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px]"
            style={{
              margin: 0,
            
              fontWeight: 600,
              color: "#222",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Chapter 5: Photosynthesis - C...
          </h3>

          <p
          className="text-[16px] lg:text-[14px] md:text-[12] sm:text-[10px]"
            style={{
              margin: "10px 0 0",
              fontSize: "14px",
              color: "#9C9C9C",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
               fontWeight:'400'
            }}
          >
            Comprehensive notes covering the...
          </p>
        </div>

        <div
        className="text-[12px] lg:text-[10px] md:text-[8px] sm:text-[6px]"
          style={{
            
            color: "#008236",
            border: "1px solid #00823640",
            background: "#00823626",
            padding: "4px 6px",
            borderRadius: "8px",
           
          }}
        >
          Image
        </div>
      </div>

      {/* Meta Info */}
      <div
        className="text-[16px] lg:text-[14px] md:text-[12] sm:text-[10px]"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginTop: "18px",
         
          color: "#696969",
        }}
      >
        <span style={{  lineHeight: 0.8 }}>•</span>
        <span>Ms. Sarah Johnson</span>
        <span style={{ lineHeight: 0.8 }}>•</span>
        <span>2.4 MB</span>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "#dddddd",
          marginTop: "16px",
          marginBottom: "16px",
        }}
      />

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <button
          style={{
            height: "34px",
            minWidth: "104px",
            border: "1px solid #9C9C9C",
            borderRadius: "6px",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#696969",
            cursor: "pointer",
          }}
          >
          <Eye size={16} />
          Preview
        </button>

        <button
          style={{
            height: "34px",
            minWidth: "118px",
             border: "1px solid #9C9C9C",
            borderRadius: "6px",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#696969",
            cursor: "pointer",
          }}
        >
          <Download size={16} />
          Download
        </button>
      </div>
                </div>
                <div
      style={{
        maxWidth: "438px",
        background: "#FFFFFF",
        borderRadius: "12px",
        padding: "20px",
        boxSizing: "border-box",
        border:'1px solid #E6E6E6'
      }}
    >
      {/* Top Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
           className="text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px]"
            style={{
              margin: 0,
            
              fontWeight: 600,
              color: "#222",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Chapter 5: Photosynthesis - C...
          </h3>

          <p
          className="text-[16px] lg:text-[14px] md:text-[12] sm:text-[10px]"
            style={{
              margin: "10px 0 0",
              fontSize: "14px",
              color: "#9C9C9C",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
               fontWeight:'400'
            }}
          >
            Comprehensive notes covering the...
          </p>
        </div>

        <div
        className="text-[12px] lg:text-[10px] md:text-[8px] sm:text-[6px]"
          style={{
            
            color: "#8200DB",
            border: "1px solid #8200DB40",
            background: "#8200DB26",
            padding: "4px 6px",
            borderRadius: "8px",
           
          }}
        >
         External Link
        </div>
      </div>

      {/* Meta Info */}
      <div
        className="text-[16px] lg:text-[14px] md:text-[12] sm:text-[10px]"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginTop: "18px",
         
          color: "#696969",
        }}
      >
        <span style={{  lineHeight: 0.8 }}>•</span>
        <span>Ms. Sarah Johnson</span>
        <span style={{ lineHeight: 0.8 }}>•</span>
        <span>2.4 MB</span>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "#dddddd",
          marginTop: "16px",
          marginBottom: "16px",
        }}
      />

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <button
          style={{
            height: "34px",
            minWidth: "104px",
            border: "1px solid #9C9C9C",
            borderRadius: "6px",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#696969",
            cursor: "pointer",
          }}
          >
          <Eye size={16} />
          Preview
        </button>

        <button
          style={{
            height: "34px",
            minWidth: "118px",
             border: "1px solid #9C9C9C",
            borderRadius: "6px",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#696969",
            cursor: "pointer",
          }}
        >
          <Download size={16} />
          Download
        </button>
      </div>
                </div>
                <div
      style={{
        maxWidth: "438px",
        background: "#FFFFFF",
        borderRadius: "12px",
        padding: "20px",
        boxSizing: "border-box",
        border:'1px solid #E6E6E6'
      }}
    >
      {/* Top Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
           className="text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px]"
            style={{
              margin: 0,
            
              fontWeight: 600,
              color: "#222",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Chapter 5: Photosynthesis - C...
          </h3>

          <p
          className="text-[16px] lg:text-[14px] md:text-[12] sm:text-[10px]"
            style={{
              margin: "10px 0 0",
              fontSize: "14px",
              color: "#9C9C9C",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
               fontWeight:'400'
            }}
          >
            Comprehensive notes covering the...
          </p>
        </div>

        <div
        className="text-[12px] lg:text-[10px] md:text-[8px] sm:text-[6px]"
          style={{
            
            color: "#1565C0",
            border: "1px solid #1447E640",
            background: "#1447E626",
            padding: "4px 6px",
            borderRadius: "8px",
           
          }}
        >
          Document
        </div>
      </div>

      {/* Meta Info */}
      <div
        className="text-[16px] lg:text-[14px] md:text-[12] sm:text-[10px]"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginTop: "18px",
         
          color: "#696969",
        }}
      >
        <span style={{  lineHeight: 0.8 }}>•</span>
        <span>Ms. Sarah Johnson</span>
        <span style={{ lineHeight: 0.8 }}>•</span>
        <span>2.4 MB</span>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "#dddddd",
          marginTop: "16px",
          marginBottom: "16px",
        }}
      />

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <button
          style={{
            height: "34px",
            minWidth: "104px",
            border: "1px solid #9C9C9C",
            borderRadius: "6px",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#696969",
            cursor: "pointer",
          }}
          >
          <Eye size={16} />
          Preview
        </button>

        <button
          style={{
            height: "34px",
            minWidth: "118px",
             border: "1px solid #9C9C9C",
            borderRadius: "6px",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#696969",
            cursor: "pointer",
          }}
        >
          <Download size={16} />
          Download
        </button>
      </div>
                </div>
                </div>
                
               </div>
                <div style={{ borderRadius: "8px",
                background: "#fff",
                padding: "16px",
                boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
                width:"100%"
                }}>
                 {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                
                
                 
                  <span className="text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px] text-[#1C1C1C] font-semibold">
                    Homework
                  </span>
                

                {/* Arrow Button */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <MdOutlineKeyboardArrowRight />
                </div>
              </div>
                <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                <div className="border-l-[4px] border-t border-b border-r border-[#FFD6A7] rounded-[10px] bg-[#FFF7ED]  p-[14px] box-border" style={{maxWidth:'556px',}}>
                
      <div className="mb-[10px] flex items-center gap-[10px] flex-wrap">
        <h3 className="m-0 text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px] font-medium text-[#1f1f1f]">
          Solve Quadratic Equations
        </h3>

        <span className="rounded-full bg-[#12516E] px-3 py-[5px] text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] font-medium leading-none text-white">
          Mathematics
        </span>

        <span className="rounded-full border border-[#d6d6d6] bg-[#FFFFFF] px-3 py-[5px] text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] font-medium leading-none text-[#555]">
          Pending
        </span>
      </div>

      <p className="mb-[14px] mt-0 text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] font-normal text-[#696969]">
        Complete Exercise 5.2 - Questions 1 to 15. Show all working steps.
      </p>

      <div className="flex items-center gap-8 text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] text-[#9C9C9C]">
        <div className="flex items-center gap-2">
          <span className="text-[14px]"><CiClock2 /></span>
          <span>Assigned: Jan 22, 2026</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[14px]"><CiClock2 /></span>
          <span>Due: Jan 25, 2026</span>
        </div>
      </div>
                </div>
                 <div className="border-l-[4px] border-t border-b border-r border-[#FFC9C9] rounded-[10px] bg-[#FEF2F2]  p-[14px] box-border" style={{maxWidth:'556px',}}>
                
      <div className="mb-[10px] flex items-center gap-[10px] flex-wrap">
        <h3 className="m-0 text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px] font-medium text-[#1f1f1f]">
          Solve Quadratic Equations
        </h3>

        <span className="rounded-full bg-[#12516E] px-3 py-[5px] text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] font-medium leading-none text-white">
          Mathematics
        </span>

        <span className="rounded-full border border-[#d6d6d6] bg-[#FBD1D1] px-3 py-[5px] text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] font-medium leading-none text-[#DC2626]">
          Overdue
        </span>
      </div>

      <p className="mb-[14px] mt-0 text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] font-normal text-[#696969]">
        Complete Exercise 5.2 - Questions 1 to 15. Show all working steps.
      </p>

      <div className="flex items-center gap-8 text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] text-[#9C9C9C]">
        <div className="flex items-center gap-2">
          <span className="text-[14px]"><CiClock2 /></span>
          <span>Assigned: Jan 22, 2026</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[14px]"><CiClock2 /></span>
          <span>Due: Jan 25, 2026</span>
        </div>
      </div>
                </div>
                <div className="border-l-[4px] border-t border-b border-r border-[#FFD6A7] rounded-[10px] bg-[#FFF7ED]  p-[14px] box-border" style={{maxWidth:'556px',}}>
                
      <div className="mb-[10px] flex items-center gap-[10px] flex-wrap">
        <h3 className="m-0 text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px] font-medium text-[#1f1f1f]">
          Solve Quadratic Equations
        </h3>

        <span className="rounded-full bg-[#12516E] px-3 py-[5px] text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] font-medium leading-none text-white">
          Mathematics
        </span>

        <span className="rounded-full border border-[#d6d6d6] bg-[#FFFFFF] px-3 py-[5px] text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] font-medium leading-none text-[#555]">
          Pending
        </span>
      </div>

      <p className="mb-[14px] mt-0 text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] font-normal text-[#696969]">
        Complete Exercise 5.2 - Questions 1 to 15. Show all working steps.
      </p>

      <div className="flex items-center gap-8 text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] text-[#9C9C9C]">
        <div className="flex items-center gap-2">
          <span className="text-[14px]"><CiClock2 /></span>
          <span>Assigned: Jan 22, 2026</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[14px]"><CiClock2 /></span>
          <span>Due: Jan 25, 2026</span>
        </div>
      </div>
                </div>
                 <div className="border-l-[4px] border-t border-b border-r border-[#FFD6A7] rounded-[10px] bg-[#FFF7ED]  p-[14px] box-border" style={{maxWidth:'556px',}}>
                
      <div className="mb-[10px] flex items-center gap-[10px] flex-wrap">
        <h3 className="m-0 text-[18px] lg:text-[14px] md:text-[12] sm:text-[10px] font-medium text-[#1f1f1f]">
          Solve Quadratic Equations
        </h3>

        <span className="rounded-full bg-[#12516E] px-3 py-[5px] text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] font-medium leading-none text-white">
          Mathematics
        </span>

        <span className="rounded-full border border-[#d6d6d6] bg-[#FFFFFF] px-3 py-[5px] text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] font-medium leading-none text-[#555]">
          Pending
        </span>
      </div>

      <p className="mb-[14px] mt-0 text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] font-normal text-[#696969]">
        Complete Exercise 5.2 - Questions 1 to 15. Show all working steps.
      </p>

      <div className="flex items-center gap-8 text-[13px] lg:text-[12px] md:text-[11] sm:text-[9px] text-[#9C9C9C]">
        <div className="flex items-center gap-2">
          <span className="text-[14px]"><CiClock2 /></span>
          <span>Assigned: Jan 22, 2026</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[14px]"><CiClock2 /></span>
          <span>Due: Jan 25, 2026</span>
        </div>
      </div>
                </div>
                </div>
                
                
               </div>
           </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
