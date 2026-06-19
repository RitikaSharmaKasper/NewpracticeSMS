import {
  Award,
  Calendar,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import AcademicPerformanceChart from "./PerformanceDashboardComp/AcademicPerformanceChart";
import GradeDistribution from "./PerformanceDashboardComp/GradeDistribution";
import TopPerformers from "./PerformanceDashboardComp/TopPerformers";
import NeedsAttention from "./PerformanceDashboardComp/NeedsAttention";
import SubjectWisePerformance from "./PerformanceDashboardComp/SubjectWisePerformance";
import StudentPerformance from "./PerformanceDashboardComp/StudentPerformance";

const AcademicPerformance = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
const [showAcademicYearDropdown, setShowAcademicYearDropdown] = useState(false);
const [showClassDropdown, setShowClassDropdown] = useState(false);
const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  const currentYear = new Date().getFullYear();

  // Current + past years only
  const academicYears = Array.from({ length: 12 }, (_, index) => {
    const startYear = currentYear - index;
    // console.log(startYear)
    return `${startYear}-${startYear + 1}`;
  });

  // Demo
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4"];
  const sections = ["A", "B", "C", "D"];

  // ///////////////
  const stats = [
    {
      value: "60",
      title: "Total Students",
      icon: <Users size={20} color="#1E3A5F" />,
      bg: "#EAF2FF",
    },
    {
      value: "69",
      title: "Average Score",
      icon: <TrendingUp size={20} color="#6C63FF" />,
      bg: "#F1EEFF",
    },
    {
      value: "98",
      title: "Highest Score",
      icon: <Award size={20} color="#17B26A" />,
      bg: "#E8F8EE",
    },
    {
      value: "42",
      title: "Lowest Score",
      icon: <TrendingDown size={20} color="#F04438" />,
      bg: "#FEECEC",
    },
    {
      value: "100",
      title: "Pass %",
      icon: <CheckCircle size={20} color="#17B26A" />,
      bg: "#E8F8EE",
    },
    {
      value: "83.6",
      title: "Attendance",
      icon: <Calendar size={20} color="#F79009" />,
      bg: "#FFF4E5",
    },
  ];

  return (
    <>
      <div className="border border-[#E6E6E6] bg-white rounded-xl p-4 space-y-5">
        <div>
          <p className="text-[#1C1C1C] text-lg font-semibold">
            Performance Overview
          </p>
        </div>

      



<div className="grid md:grid-cols-3 gap-6">
  {/* Academic Year Dropdown */}
  <div className="flex flex-col">
    <label className="mb-2 text-sm font-medium">Academic Year</label>
    
    <div className="relative inline-block w-full">
      <button
        onClick={() => setShowAcademicYearDropdown(!showAcademicYearDropdown)}
        className="bg-white border border-[#E6E6E6] rounded-xl px-4 py-3 text-[14px] text-[#1C1C1C] cursor-pointer flex items-center justify-between w-full h-12"
      >
        <span className={!selectedYear ? "text-[#9C9C9C]" : "text-[#1C1C1C]"}>
          {selectedYear || "Select Academic Year"}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${showAcademicYearDropdown ? "rotate-180" : ""}`}
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

      {showAcademicYearDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-xl shadow-lg overflow-hidden">
          <button
            onClick={() => {
              setSelectedYear("");
              setShowAcademicYearDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-[14px] hover:bg-[#F5F7F7] cursor-pointer"
          >
            Select Academic Year
          </button>
          
          {academicYears.map((year, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedYear(year);
                setShowAcademicYearDropdown(false);
              }}
              className={`w-full text-left px-4 py-2 text-[14px] hover:bg-[#F5F7F7] cursor-pointer ${
                selectedYear === year ? "bg-[#F5F7F7] font-medium" : ""
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>

  {/* Class Dropdown */}
  <div className="flex flex-col">
    <label className="mb-2 text-sm font-medium">Class</label>
    
    <div className="relative inline-block w-full">
      <button
        onClick={() => setShowClassDropdown(!showClassDropdown)}
        className="bg-white border border-[#E6E6E6] rounded-xl px-4 py-3 text-[14px] text-[#1C1C1C] cursor-pointer flex items-center justify-between w-full h-12"
      >
        <span className={!selectedClass ? "text-[#9C9C9C]" : "text-[#1C1C1C]"}>
          {selectedClass || "Select Class"}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${showClassDropdown ? "rotate-180" : ""}`}
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

      {showClassDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto">
          <button
            onClick={() => {
              setSelectedClass("");
              setShowClassDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-[14px] hover:bg-[#F5F7F7] cursor-pointer"
          >
            Select Class
          </button>
          
          {classes.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedClass(item);
                setShowClassDropdown(false);
              }}
              className={`w-full text-left px-4 py-2 text-[14px] hover:bg-[#F5F7F7] cursor-pointer ${
                selectedClass === item ? "bg-[#F5F7F7] font-medium" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>

  {/* Section Dropdown */}
  <div className="flex flex-col">
    <label className="mb-2 text-sm font-medium">Section</label>
    
    <div className="relative inline-block w-full">
      <button
        onClick={() => setShowSectionDropdown(!showSectionDropdown)}
        className="bg-white border border-[#E6E6E6] rounded-xl px-4 py-3 text-[14px] text-[#1C1C1C] cursor-pointer flex items-center justify-between w-full h-12"
      >
        <span className={!selectedSection ? "text-[#9C9C9C]" : "text-[#1C1C1C]"}>
          {selectedSection || "Select Section"}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${showSectionDropdown ? "rotate-180" : ""}`}
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

      {showSectionDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-xl shadow-lg overflow-hidden">
          <button
            onClick={() => {
              setSelectedSection("");
              setShowSectionDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-[14px] hover:bg-[#F5F7F7] cursor-pointer"
          >
            Select Section
          </button>
          
          {sections.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedSection(item);
                setShowSectionDropdown(false);
              }}
              className={`w-full text-left px-4 py-2 text-[14px] hover:bg-[#F5F7F7] cursor-pointer ${
                selectedSection === item ? "bg-[#F5F7F7] font-medium" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
</div>





      </div>

      {/* kpi card */}
      <div className="bg-[#FFFFFF] p-6 mt-4 rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#EAEAEA] rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm"
            >
              <div className="flex flex-col">
                <h2 className="text-[24px] leading-none font-bold text-[#1C1C1C] flex items-start gap-1">
                  {item.value}
                  <span className="text-[15px] font-medium text-[#696969] mt-1">
                    %
                  </span>
                </h2>

                <p className="text-[14px] text-[#696969] mt-2">{item.title}</p>
              </div>

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: item.bg,
                }}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>
        
        {/* dashboard data */}
        <div className="grid grid-cols-12 gap-4 mt-6">
          {/* Academic Performance Trends */}
          <div className="col-span-12 lg:col-span-6">
            <AcademicPerformanceChart />
          </div>

          {/* Grade Distribution */}
          <div className="col-span-12 lg:col-span-6">
            <GradeDistribution />
          </div>

          {/* Top Performers */}
          <div className="col-span-12 lg:col-span-6 border rounded-xl p-4">
            <TopPerformers />
          </div>

          {/* Needs Attention */}
          <div className="col-span-12 lg:col-span-6 border rounded-xl p-4">
            <NeedsAttention />
          </div>
          {/* Subject-wise Performance */}
          <div className="col-span-12 lg:col-span-12 ">
            <SubjectWisePerformance />
          </div>
          {/* Student Performance */}
          <div className="col-span-12 lg:col-span-12 ">
            <StudentPerformance />
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademicPerformance;
