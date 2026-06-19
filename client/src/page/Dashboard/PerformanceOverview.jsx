import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdOutlineEventNote } from "react-icons/md";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AttendanceChart from "./AttendanceChart";
import AverageChart from "./AverageChart";
import GradeDistributionGraph from "./GradeDistributionGraph";
import TotalStudentGraph from "./TotalStudentGraph";
import TotalStudentPerGraph from "./TotalStudentPerGraph";
import staff from "../../assets/images/elipse.svg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import AcrossClassesGraph from "./AcrossClassesGraph";
import "../../CSS/AdminDashboard.css";

const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  }
 
`;

const PerformanceOverview = () => {
  const studentAbove = [
    { name: "Kasim Siddique", class: "Class 1", exam: "Final", percent: "80%" },
    { name: "Akash Kumar", class: "Class 1", exam: "Mid Term", percent: "50%" },
    { name: "Akash Kumar", class: "Class 1", exam: "Mid Term", percent: "50%" },

    { name: "Diwakar Yadav", class: "Class 1", exam: "Final", percent: "90%" },
    { name: "Diwakar Yadav", class: "Class 1", exam: "Final", percent: "90%" },
  ];

  const navigate = useNavigate();
  const [active, setActive] = useState("All");
  const [activeChart, setActiveChart] = useState("attendance");

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div style={{ fontFamily: "Segoe UI" }}>
      {/* Back Button */}
      <div
        onClick={handleClick}
        htmlFor=""
        className="text-[20px] sm:text-[20px] md:text-[25px] lg:text-[24px]"
        style={{
          color: "#696969",
          display: "flex",
          alignItems: "center",
          fontWeight: "400",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        <MdKeyboardArrowLeft /> Back
      </div>

      {/* Main Section */}
      <div
        style={{
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
          borderRadius: "16px",
          padding: "16px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Header + Filter */}
        <div
          className="performance-overview-headerfilter-sms"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "100px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
              Performance Overview
            </label>
            <label
              htmlFor=""
              style={{ color: "#9C9C9C", fontWeight: "400", fontSize: "14px" }}
            >
              Manage class schedules, teacher timetables, and substitutions
            </label>
          </div>

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
                <option value="Class">2025-2026</option>
                <option value="Nursery">2022-2026</option>
                <option value="UKG">2024-2028</option>
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
                <option value="Section">All Class</option>
                <option value="A">Class 1</option>
                <option value="B">Nursery</option>
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
                <option value="Status">All Section</option>
                <option value="Good">A</option>
                <option value="Excellent">B</option>
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

        {/* Aceademic Performance Trends Graph Section */}
        <div
          style={{
            border: "1px solid #E6E6E6",
            padding: "10px 15px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
            height: "430px",
          }}
        >
          {/* Header + Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
                Academic Performance Trends
              </label>
              <label
                htmlFor=""
                style={{
                  color: "#9C9C9C",
                  fontWeight: "400",
                  fontSize: "14px",
                }}
              >
                Track average scores and attendance{" "}
              </label>
            </div>
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
              {["attendance", "average"].map((tab) => {
                const isActive = activeChart === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveChart(tab)}
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
                    {tab === "attendance" ? "Attendance" : "Avg Score"}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {activeChart === "attendance" && <AttendanceChart />}
            {activeChart === "average" && <AverageChart />}
          </div>
        </div>
        {/* Distribution Graph + Chart */}
        <div
          className="distribution-graphchart-section-sms"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div
            className="distribution-graphchart-card-sms"
            style={{
              border: "1px solid #E6E6E6",
              padding: "10px 15px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
              width: "50%",
              height: "388px",
            }}
          >
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
                  style={{ color: "#1C1C1C", fontWeight: "600" }}
                >
                  Grade Distribution
                </label>
                <label
                  htmlFor=""
                  style={{
                    color: "#9C9C9C",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Overall student performance breakdown
                </label>
              </div>
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
                    <option value="Class">UT 1</option>
                    <option value="Nursery">UT 1</option>
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
            <GradeDistributionGraph />
          </div>
          <div
            className="distribution-graphchart-card-sms"
            style={{
              border: "1px solid #E6E6E6",
              padding: "10px 15px",
              borderRadius: "8px",
              width: "50%",
              height: "388px",
              display: "flex",
              flexDirection: "column",
              // justifyContent:"space-between",
              gap: "30px",
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
              <span
                className="flex items-center gap-1"
                style={{ color: "#1C1C1C", fontWeight: "600" }}
              >
                <MdOutlineEventNote size={20} /> Student Performance
                Distribution
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
                    width: "90px",
                  }}
                >
                  <Select
                    // value={selectedExam}
                    //  onChange={(e) => setSelectedExam(e.target.value)}
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
                    <option value="Status">UT 1</option>
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
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                gap: "60px",
                justifyContent: "center",
              }}
            >
              <TotalStudentPerGraph />
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
                      backgroundColor: "#EF476F",
                      borderRadius: "50px",
                      height: "10px",
                      width: "10px",
                    }}
                  ></div>
                  <span className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[16px]">
                    Excellent (90-100%)
                  </span>
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
                      backgroundColor: "#FFD166",
                      borderRadius: "50px",
                      height: "10px",
                      width: "10px",
                    }}
                  ></div>
                  <span className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[16px]">
                    Good (80-89%)
                  </span>
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
                      backgroundColor: "#696969",
                      borderRadius: "50px",
                      height: "10px",
                      width: "10px",
                    }}
                  ></div>
                  <span className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[16px]">
                    Above Average (70-79%)
                  </span>
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
                      backgroundColor: "#48CAE4",
                      borderRadius: "50px",
                      height: "10px",
                      width: "10px",
                    }}
                  ></div>
                  <span className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[16px]">
                    Average (60-69%)
                  </span>
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
                      backgroundColor: "#12516E",
                      borderRadius: "50px",
                      height: "10px",
                      width: "10px",
                    }}
                  ></div>
                  <span className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[16px]">
                    Below Average (60%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performance Section */}
        {/* Header + Filter */}
        <div
          className="performance-overview-headerfilter-sms"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "100px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
              Class-wise Top Performers & Students Needing Attention
            </label>
            <label
              htmlFor=""
              style={{
                color: "#9C9C9C",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              Identify high achievers and students requiring additional support
            </label>
          </div>

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
                <option value="Class">UT 1</option>
                <option value="Nursery">UT 2</option>
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
          className="top-performer-above-below-sms"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Student Above */}
          <div
            className="student-above-sms"
            style={{
              border: "1px solid #E6E6E6",
              padding: "10px 15px",
              borderRadius: "8px",
              width: "50%",
              position: "relative",
              height: "388px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
                Top Performers
              </label>
              <label
                htmlFor=""
                style={{
                  color: "#9C9C9C",
                  fontWeight: "400",
                  fontSize: "14px",
                }}
              >
                Students with above 90%
              </label>
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
                paddingBottom: "15px",
              }}
            >
              {studentAbove.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // borderBottom: "1px solid #E6E6E6",
                    padding: "6px 0",
                    backgroundColor: "#F2FFF5",
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
                      color: "#009638",
                    }}
                  >
                    {item.percent}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "0px",
                zIndex: "9999",
                right: "12px",
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
          {/* Student Below */}
          <div
            className="student-below-sms"
            style={{
              border: "1px solid #E6E6E6",
              padding: "10px 15px",
              borderRadius: "8px",
              width: "50%",
              height: "388px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
                Least Performers
              </label>
              <label
                htmlFor=""
                style={{
                  color: "#9C9C9C",
                  fontWeight: "400",
                  fontSize: "14px",
                }}
              >
                Students with below 35%
              </label>
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
              {studentAbove.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // borderBottom: "1px solid #E6E6E6",
                    padding: "6px 0",
                    backgroundColor: "#FFF8F8",
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
                      color: "#DC2626",
                    }}
                  >
                    {item.percent}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "0px",
                zIndex: "9999",
                right: "12px",
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

        {/* Class Performance Graph */}
        <div
          style={{
            border: "1px solid #E6E6E6",
            padding: "10px 15px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "420px",
          }}
        >
          {/* Header + Filter */}
          <div
            className="performance-overview-headerfilter-sms"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "100px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
                Class Performance
              </label>
              <label
                htmlFor=""
                style={{
                  color: "#9C9C9C",
                  fontWeight: "400",
                  fontSize: "14px",
                }}
              >
                Performance across classes
              </label>
            </div>

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
                  <option value="Class">UT 1</option>
                  <option value="Nursery">UT 2</option>
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
          <div style={{display:"flex", alignItems:"center", justifyContent:"end", gap:"20px", marginBottom:"10px"}}>
            <label
              htmlFor=""
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              {" "}
              <span
                style={{
                  background:
                    "linear-gradient(180deg, #E60B0F 0%, rgba(255, 255, 255, 0) 100%)",
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                }}
              ></span>
              Maths
            </label>
            <label
              htmlFor=""
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              {" "}
              <span
                style={{
                 background: 'linear-gradient(180deg, #F3722C 0%, rgba(255, 255, 255, 0) 100%)',
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                }}
              ></span>
              Science
            </label>
             <label
              htmlFor=""
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              {" "}
              <span
                style={{
                  background: 'linear-gradient(180deg, #F8961E 0%, rgba(255, 255, 255, 0) 100%)',
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                }}
              ></span>
              English
            </label>
            <label
              htmlFor=""
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              {" "}
              <span
                style={{
                background: 'linear-gradient(180deg, #F9C74F 0%, rgba(255, 255, 255, 0) 100%)',
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                }}
              ></span>
              History
            </label>
             <label
              htmlFor=""
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              {" "}
              <span
                style={{
                 background: 'linear-gradient(180deg, #90BE6D 0%, rgba(255, 255, 255, 0) 100%)',
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                }}
              ></span>
              Geography
            </label>
             <label
              htmlFor=""
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              {" "}
              <span
                style={{
                 background: 'linear-gradient(180deg, #43AA8B 0%, rgba(255, 255, 255, 0) 100%)',
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                }}
              ></span>
              Computer
            </label>
          </div>
          <AcrossClassesGraph />
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverview;
