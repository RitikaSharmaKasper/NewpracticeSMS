import React, { useEffect, useRef, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../../../config/axiosInstance"
import "../../../CSS/Style.css";
import "react-calendar/dist/Calendar.css";
import * as d3 from "d3";

/* <------------------------------- icon ------------------------------> */
import { IoMdArrowBack } from "react-icons/io";
import { IoSchoolOutline } from "react-icons/io5";
import { CiTrophy } from "react-icons/ci";
import { PiChartLineUpLight } from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { FaMale } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { GiBus } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { MdOutlineImage } from "react-icons/md";
import { TfiBook } from "react-icons/tfi";
import { SlBadge } from "react-icons/sl";
import { LuTarget } from "react-icons/lu";
import { CiWarning } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { FaClipboardList } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { SiTicktick } from "react-icons/si";
import { FiPrinter } from "react-icons/fi";
import { Link } from "react-router-dom";

/** <------------------------------------ images -------------------------------> */
import langford from "../../../assets/images/langford.jpg";
import mikasa from "../../../assets/images/mikasa.png";
import card from "../../../assets/images/cards.gif";
import bank from "../../../assets/images/bank.gif";
import upi from "../../../assets/images/upi.gif";
import cash from "../../../assets/images/cash.gif";
import Money from "../../../assets/images/money.gif";
import Correct from "../../../assets/images/correct.gif";
import Danger from "../../../assets/images/Danger.gif";

/* <--------------------------- npm -------------------------------------> */
import Calendar from "react-calendar";



function SubjectWiseMarksChart() {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);
  const [width, setWidth] = useState(0);
  const gridTicks = [25, 50, 75];

  const data = [
    { subject: "Mathematics", marks: 100 },
    { subject: "Science", marks: 88 },
    { subject: "English", marks: 78 },
    { subject: "History", marks: 88 },
    { subject: "Geography", marks: 88 },
  ];

  /* Resize Observer */
  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  /* Draw Chart */
  useEffect(() => {
    if (!width) return;

    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("width", width).attr("height", height);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.subject))
      .range([0, innerWidth])
      .padding(0.25);

    const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

    const grid = chart.append("g").call(
      d3
        .axisLeft(yScale)

        .tickSize(-innerWidth)
        .tickFormat(() => "")
    );

    grid
      .selectAll("line")
      .attr("stroke", "#e6e6e6")
      .attr("stroke-dasharray", "2 2");

    grid
      .selectAll("line")
      .filter((d) => d === 0 || d === yScale.domain()[1])
      .remove();

    chart
      .append("g")
      .call(d3.axisLeft(yScale).tickValues([0, 25, 50, 75, 100]));

    chart.selectAll(".domain").attr("stroke", "#e6e6e6");

    chart
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .call((g) => g.selectAll("line").remove()) // remove tick lines
      .call((g) => g.select(".domain").remove()) // remove bottom axis line
      .call((g) =>
        g
          .selectAll("text") // style labels
          .attr("fill", "#1c1c1c")
          .attr("font-size", "13px")
          .attr("font-weight", "500")
      );
    chart
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .call((g) => g.selectAll("line").remove())
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll("text")
          .attr("fill", "#1c1c1c")
          .attr("font-size", "13px")
          .attr("font-weight", "500")
      );

    /* ---------------- Bars (ONLY ONCE) ---------------- */
    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "bar")
      .attr("fill", "#00B4D8")
      .attr("d", (d) => {
        const x = xScale(d.subject);
        const y = yScale(d.marks);
        const w = xScale.bandwidth();
        const h = innerHeight - y;
        const r = 6;

        return `
      M ${x}, ${y + r}
      Q ${x}, ${y} ${x + r}, ${y}
      L ${x + w - r}, ${y}
      Q ${x + w}, ${y} ${x + w}, ${y + r}
      L ${x + w}, ${y + h}
      L ${x}, ${y + h}
      Z
    `;
      })
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("opacity", 0.8);

        d3.select(tooltipRef.current)
          .style("opacity", 1)
          .html(`<strong>${d.subject}</strong><br/>Marks: ${d.marks}`);
      })
      .on("mousemove", function (event) {
        const bounds = wrapperRef.current.getBoundingClientRect();

        d3.select(tooltipRef.current)
          .style("left", event.clientX - bounds.left + 10 + "px")
          .style("top", event.clientY - bounds.top - 40 + "px");
      })
      .on("mouseleave", function () {
        d3.select(this).attr("opacity", 1);
        d3.select(tooltipRef.current).style("opacity", 0);
      });
  }, [width]);

  return (
    <div ref={wrapperRef} className="w-full">
      <svg ref={svgRef} />
    </div>
  );
}

{
  /* <------------------------------- Second Graph ------------------------------> */
}
function ExamPerformanceTrendChart() {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);
  const [width, setWidth] = useState(0);

  const data = [
    { exam: "UT 1", score: 55 },
    { exam: "UT 2", score: 75 },
    { exam: "Mid-Term", score: 90 },
    { exam: "UT 3", score: 82 },
    { exam: "UT 4", score: 52 },
    { exam: "Final", score: 98 },
  ];

  /* ---------------- Resize Observer ---------------- */
  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------------- Draw Chart ---------------- */
  useEffect(() => {
    if (!width) return;

    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    /* ---------------- Gradient Definition ---------------- */
    const defs = svg.append("defs");

    const gradient = defs
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#007AFF")
      .attr("stop-opacity", 0.35);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#007AFF")
      .attr("stop-opacity", 0);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.exam))
      .range([0, innerWidth])
      .padding(0);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([innerHeight, 0]);

    /* ---------------- Grid Lines ---------------- */
    const grid = chart
      .append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickValues([0, 25, 50, 75, 100])
          .tickSize(-innerWidth)
          .tickFormat("")
      );

    grid
      .selectAll("line")
      .attr("stroke", "#e6e6e6")
      .attr("stroke-dasharray", "2 2");

    /* REMOVE top grid line (100) */
    grid
      .selectAll("line")
      .filter((d) => d === 100)
      .remove();

    /* ---------------- Y Axis (numbers only) ---------------- */
    chart
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale).tickValues([0, 25, 50, 75, 100]));

    /* REMOVE Y-axis black line */
    chart.select(".y-axis").select(".domain").remove();

    /* 🔥 REMOVE Y-axis tick dashes (-) */
    chart.selectAll(".y-axis .tick line").remove();

    /* ---------------- X Axis ---------------- */
    chart
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    /* REMOVE all remaining domain lines */
    chart.selectAll(".domain").remove();

    chart
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", yScale(100))
      .attr("y2", yScale(100))
      .attr("stroke", "#9CA3AF")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2 2");

    /* ---------------- Area ---------------- */
    const area = d3
      .area()
      .x((d) => xScale(d.exam))
      .y0(innerHeight)
      .y1((d) => yScale(d.score))
      .curve(d3.curveMonotoneX);

    chart
      .append("path")
      .datum(data)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area);

    /* ---------------- Line ---------------- */
    const line = d3
      .line()
      .x((d) => xScale(d.exam))
      .y((d) => yScale(d.score))
      .curve(d3.curveMonotoneX);

    chart
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#007AFF")
      .attr("stroke-width", 3)
      .attr("d", line);

    /* ---------------- Hover Line ---------------- */
    const hoverLine = chart
      .append("line")
      .attr("stroke", "#007AFF")
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .style("opacity", 0);

    /* ---------------- Dots + Tooltip ---------------- */
    chart
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.exam))
      .attr("cy", (d) => yScale(d.score))
      .attr("r", 6)
      .attr("fill", "#007AFF")
      .on("mouseenter", (event, d) => {
        const cy = yScale(d.score);
        hoverLine
          .attr("x1", xScale(d.exam))
          .attr("x2", xScale(d.exam))
          .attr("y1", cy) // ✅ start from circle
          .attr("y2", innerHeight)
          .style("opacity", 1);

        d3.select(tooltipRef.current)
          .style("opacity", 1)
          .html(`<strong>${d.exam}</strong><br/>Score: ${d.score}`);
      })
      .on("mousemove", (event) => {
        const bounds = wrapperRef.current.getBoundingClientRect();
        d3.select(tooltipRef.current)
          .style("left", event.clientX - bounds.left + 10 + "px")
          .style("top", event.clientY - bounds.top - 40 + "px");
      })
      .on("mouseleave", () => {
        hoverLine.style("opacity", 0);
        d3.select(tooltipRef.current).style("opacity", 0);
      });
  }, [width]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <svg ref={svgRef} />
      <div
        ref={tooltipRef}
        className="absolute bg-[#0B3142] text-white px-3 py-2 rounded text-sm pointer-events-none opacity-0"
      />
    </div>
  );
}

/* <------------------------------------------ calalender -------------------------------------------> */
// ✅ MUST COME FIRST
const STATUS_STYLES = {
  Holiday: {
    bg: "#00ADAD",
    textClass: "text-white",
  },
  Absent: {
    bg: "#DC2626",
    textClass: "text-white",
  },
  Leave: {
    bg: "#F97316",
    textClass: "text-white",
  },
  Present: {
    bg: "#009638",
    textClass: "text-white",
  },
};

// ✅ THEN helpers
const formatDateKey = (date) => {
  return date.toISOString().split("T")[0];
};

const getStatusClasses = (status) => {
  return STATUS_STYLES[status] || "";
};

// ✅ Attendance data (mock / backend-ready)
const attendanceMap = {
  "2024-09-01": { status: "Present" },
  "2024-09-02": { status: "Absent" },
  "2024-09-03": { status: "Holiday" },
  "2024-09-04": { status: "Leave" },
  "2026-01-01": { status: "Present" },
};

function DetailsContent({ active, student }) {
  const studentInfo = student?.studentInfo;
  const account = student?.account;
  const personalInfo = studentInfo?.personalInfo || {};
  const contactInfo = studentInfo?.contactInfo || {};
  const parentInfo = studentInfo?.parentInfo || {};
  const medicalInfo = studentInfo?.medicalInfo || {};
  const transportInfo = studentInfo?.transportInfo || {};
  const academicInfo = studentInfo?.academicInfo || {};
  const documents = studentInfo?.documents || {};
  const siblings = parentInfo?.siblings || [];
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getDocumentUrl = (docType, category = "student") => {
    let docs = [];
    if (category === "student") docs = documents?.studentDocuments || [];
    else if (category === "parent") docs = documents?.parentDocuments || [];
    else docs = documents?.otherDocuments || [];
    
    const doc = docs.find(d => d.documentType === docType);
    return doc?.fileUrl || null;
  };
  const [calendarDate, setCalendarDate] = useState(new Date());

  const documentData = [
    {
      img: mikasa,
      documentName: "Date of Birth",
      date: "2024-04-10",
      fileType: "jpg",
      fileSize: "512",
    },
    {
      img: mikasa,
      documentName: "Previous School Transfer Certificate",
      date: "2024-04-10",
      fileType: "pdf",
      fileSize: "312",
    },
    {
      img: mikasa,
      documentName: "Adhar",
      date: "2024-04-10",
      fileType: "pdf",
      fileSize: "520",
    },
    {
      img: mikasa,
      documentName: "Transfer Certificate",
      date: "2024-04-10",
      fileType: "pdf",
      fileSize: "520",
    },
    {
      img: mikasa,
      documentName: "Medical Certificate",
      date: "2024-04-10",
      fileType: "pdf",
      fileSize: "520",
    },
    {
      img: mikasa,
      documentName: "Parent ID Proof",
      date: "2024-04-10",
      fileType: "pdf",
      fileSize: "520",
    },
    {
      img: mikasa,
      documentName: "Previous Acedemic Report",
      date: "2024-04-10",
      fileType: "pdf",
      fileSize: "420",
    },
    {
      img: mikasa,
      documentName: "Guardian Photo",
      date: "2024-04-10",
      fileType: "jpg",
      fileSize: "50",
    },
  ];
  switch (active) {
case "Personal Info":
  return (
    <div>
      {/* Personal Information */}
      <div className="bg-white mt-6 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-[#1c1c1c]">
          <FaRegUser className="text-[#696969]" />
          <span className="font-semibold">Personal Information</span>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-10">
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Full Name</span>
            <span className="text-[#1c1c1c] text-[16px]">{personalInfo?.fullName || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Date of Birth</span>
            <span className="text-[#1c1c1c] text-[16px]">{formatDate(personalInfo?.dateOfBirth)}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Age</span>
            <span className="text-[#1c1c1c] text-[16px]">{calculateAge(personalInfo?.dateOfBirth)}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Gender</span>
            <span className="text-[#1c1c1c] text-[16px]">{personalInfo?.gender || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Mobile Number</span>
            <span className="text-[#1c1c1c] text-[16px]">{account?.phone || contactInfo?.primaryMobile || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Email</span>
            <span className="text-[#1c1c1c] text-[16px]">{account?.email || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Student ID</span>
            <span className="text-[#1c1c1c] text-[16px]">{studentInfo?.studentId || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Admission Number</span>
            <span className="text-[#1c1c1c] text-[16px]">{studentInfo?.admissionNumber || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Blood Group</span>
            <span className="text-[#1c1c1c] text-[16px]">{personalInfo?.bloodGroup || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Category</span>
            <span className="text-[#1c1c1c] text-[16px]">{personalInfo?.category || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Nationality</span>
            <span className="text-[#1c1c1c] text-[16px]">{personalInfo?.nationality || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Religion</span>
            <span className="text-[#1c1c1c] text-[16px]">{personalInfo?.religion || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Mother Tongue</span>
            <span className="text-[#1c1c1c] text-[16px]">{personalInfo?.motherTongue || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Place of Birth</span>
            <span className="text-[#1c1c1c] text-[16px]">{personalInfo?.placeOfBirth || "N/A"}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Languages Known</span>
            <span className="text-[#1c1c1c] text-[16px]">{personalInfo?.languagesKnown?.join(", ") || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white mt-6 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-[#1c1c1c]">
          <FaMapMarkerAlt className="text-[#696969]" />
          <span className="font-semibold">Current Address</span>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-10">
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Address</span>
            <span className="text-[#1c1c1c] text-[16px]">
              {contactInfo?.currentAddress?.addressLine1 || "N/A"}
              {contactInfo?.currentAddress?.addressLine2 ? `, ${contactInfo.currentAddress.addressLine2}` : ""}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">City</span>
            <span className="text-[#1c1c1c] text-[16px]">{contactInfo?.currentAddress?.city || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">State</span>
            <span className="text-[#1c1c1c] text-[16px]">{contactInfo?.currentAddress?.state || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Country</span>
            <span className="text-[#1c1c1c] text-[16px]">{contactInfo?.currentAddress?.country || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Pincode</span>
            <span className="text-[#1c1c1c] text-[16px]">{contactInfo?.currentAddress?.pincode || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Permanent Address (if different) */}
      {contactInfo?.permanentAddress && !contactInfo?.permanentAddress?.sameAsCurrent && (
        <div className="bg-white mt-6 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-[#1c1c1c]">
            <FaMapMarkerAlt className="text-[#696969]" />
            <span className="font-semibold">Permanent Address</span>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-10">
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">Address</span>
              <span className="text-[#1c1c1c] text-[16px]">
                {contactInfo.permanentAddress?.addressLine1 || "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">City</span>
              <span className="text-[#1c1c1c] text-[16px]">{contactInfo.permanentAddress?.city || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">State</span>
              <span className="text-[#1c1c1c] text-[16px]">{contactInfo.permanentAddress?.state || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">Country</span>
              <span className="text-[#1c1c1c] text-[16px]">{contactInfo.permanentAddress?.country || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">Pincode</span>
              <span className="text-[#1c1c1c] text-[16px]">{contactInfo.permanentAddress?.pincode || "N/A"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Parent Information */}
      <div className="bg-white mt-6 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-[#1c1c1c]">
          <MdFamilyRestroom className="text-[#696969]" />
          <div>
            <span className="font-semibold">Parent/Guardian Information</span>
            <p className="text-[#9C9C9C] font-normal">Detailed Parent Guardian Contact</p>
          </div>
        </div>
        <div className="grid gap-6 mt-6 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
          {/* Father's Information */}
          <div className="border border-[#e6e6e6] rounded shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#1c1c1c]">
                <FaMale className="text-[#696969]" />
                <span className="font-semibold">Father's Information</span>
              </div>
              {getDocumentUrl("Father Photo", "parent") && (
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={getDocumentUrl("Father Photo", "parent")} alt="Father" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-10">
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Name</span>
                <span className="text-[#1c1c1c] text-[16px]">{parentInfo?.father?.fullName || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Occupation</span>
                <span className="text-[#1c1c1c] text-[16px]">{parentInfo?.father?.occupation || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Mobile</span>
                <span className="text-[#1c1c1c] text-[16px]">{parentInfo?.father?.mobileNumber || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Email</span>
                <span className="text-[#1c1c1c] text-[16px]">{parentInfo?.father?.email || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Mother's Information */}
          <div className="border border-[#e6e6e6] rounded shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#1c1c1c]">
                <FaMale className="text-[#696969]" />
                <span className="font-semibold">Mother's Information</span>
              </div>
              {getDocumentUrl("Mother Photo", "parent") && (
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={getDocumentUrl("Mother Photo", "parent")} alt="Mother" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-10">
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Name</span>
                <span className="text-[#1c1c1c] text-[16px]">{parentInfo?.mother?.fullName || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Occupation</span>
                <span className="text-[#1c1c1c] text-[16px]">{parentInfo?.mother?.occupation || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Mobile</span>
                <span className="text-[#1c1c1c] text-[16px]">{parentInfo?.mother?.mobileNumber || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Email</span>
                <span className="text-[#1c1c1c] text-[16px]">{parentInfo?.mother?.email || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local Guardian (if exists) */}
      {parentInfo?.localGuardian?.fullName && (
        <div className="bg-white mt-6 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-[#1c1c1c]">
            <FaRegUser className="text-[#696969]" />
            <span className="font-semibold">Local Guardian Information</span>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-10">
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">Name</span>
              <span className="text-[#1c1c1c] text-[16px]">{parentInfo.localGuardian?.fullName || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">Relation</span>
              <span className="text-[#1c1c1c] text-[16px]">{parentInfo.localGuardian?.relation || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">Mobile</span>
              <span className="text-[#1c1c1c] text-[16px]">{parentInfo.localGuardian?.mobileNumber || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">Email</span>
              <span className="text-[#1c1c1c] text-[16px]">{parentInfo.localGuardian?.email || "N/A"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Medical Information */}
      <div className="mt-6 bg-white p-4 rounded-lg">
        <div className="flex items-center gap-2 text-[#1c1c1c]">
          <FaRegFileAlt className="text-[#696969]" />
          <span className="font-semibold">Medical & Health Information</span>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Chronic Illness</span>
            <span className="text-[#1c1c1c] text-[16px]">{medicalInfo?.chronicIllness?.join(", ") || "None"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Allergies</span>
            <span className="text-[#1c1c1c] text-[16px]">{medicalInfo?.allergies?.join(", ") || "None"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Medication</span>
            <span className="text-[#1c1c1c] text-[16px]">{medicalInfo?.medication?.map(m => m.name).join(", ") || "None"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Dietary Restrictions</span>
            <span className="text-[#1c1c1c] text-[16px]">{medicalInfo?.dietaryRestrictions?.join(", ") || "None"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Physical Disability</span>
            <span className="text-[#1c1c1c] text-[16px]">{medicalInfo?.physicalDisability ? "Yes" : "No"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Doctor Name</span>
            <span className="text-[#1c1c1c] text-[16px]">{medicalInfo?.doctor?.name || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#696969] font-normal text-[16px]">Doctor Contact</span>
            <span className="text-[#1c1c1c] text-[16px]">{medicalInfo?.doctor?.contactNumber || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Sibling Information */}
      {siblings.length > 0 && (
        <div className="mt-6 bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 text-[#1c1c1c]">
            <LuUser className="text-[#696969]" />
            <span className="font-semibold">Sibling Information</span>
          </div>
          {siblings.map((sibling, idx) => (
            <div key={idx} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-6 border-t pt-4">
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Full Name</span>
                <span className="text-[#1c1c1c] text-[16px]">{sibling.fullName || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Relation</span>
                <span className="text-[#1c1c1c] text-[16px]">{sibling.relation || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Admission Number</span>
                <span className="text-[#1c1c1c] text-[16px]">{sibling.admissionNumber || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Class</span>
                <span className="text-[#1c1c1c] text-[16px]">{sibling.class || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#696969] font-normal text-[16px]">Gender</span>
                <span className="text-[#1c1c1c] text-[16px]">{sibling.gender || "N/A"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Transport Information */}
      {transportInfo?.opted && (
        <div className="mt-6 bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 text-[#1c1c1c]">
            <GiBus className="text-[#696969]" />
            <span className="font-semibold">Transport Information</span>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">Uses School Transport</span>
              <span className="text-[#1c1c1c] text-[16px]">{transportInfo?.opted ? "Yes" : "No"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">Bus Number</span>
              <span className="text-[#1c1c1c] text-[16px]">{transportInfo?.busNumber || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">Route</span>
              <span className="text-[#1c1c1c] text-[16px]">{transportInfo?.route || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">Bus Stop</span>
              <span className="text-[#1c1c1c] text-[16px]">{transportInfo?.busStop || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#696969] font-normal text-[16px]">Driver Name</span>
              <span className="text-[#1c1c1c] text-[16px]">{transportInfo?.driverName || "N/A"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Documents */}
      {(documents?.studentDocuments?.length > 0 || documents?.parentDocuments?.length > 0) && (
        <div className="mt-6 p-4 bg-white rounded-lg">
          <div className="flex items-center gap-2 text-[#1c1c1c]">
            <FaRegFileAlt className="text-[#696969]" />
            <span className="font-semibold">Documents Submitted</span>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {[...(documents.studentDocuments || []), ...(documents.parentDocuments || [])].map((doc, index) => (
              <div key={index} className="border-2 border-[#e6e6e6] p-4 rounded-lg flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                <div className="flex gap-4 items-center">
                  <div className="h-20 w-20 rounded-tl-md rounded-bl-md relative flex justify-center items-center overflow-hidden bg-gray-100">
                    {doc.fileUrl ? (
                      <img src={doc.fileUrl} alt={doc.documentType} className="w-full h-full object-cover" />
                    ) : (
                      <MdOutlineImage className="text-gray-400 text-[28px]" />
                    )}
                  </div>
                  <div className="flex flex-col text-sm sm:text-base">
                    <span className="font-medium">{doc.documentType}</span>
                    <span className="text-[#696969] text-xs sm:text-sm">
                      uploaded: {formatDate(doc.uploadDate)} • {doc.documentName?.split('.').pop() || "file"}
                      <span className={`ml-2 px-1.5 py-0.5 rounded-md text-xs ${doc.verified ? "bg-[#D4EDDA] text-[#009638]" : "bg-[#FEF9C2] text-[#894B00]"}`}>
                        {doc.verified ? "verified" : "pending"}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  {doc.fileUrl && (
                    <>
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-[#118AB2] rounded-lg flex gap-2 items-center justify-center text-white w-full sm:w-auto">
                        <FaEye /> View
                      </a>
                      <a href={doc.fileUrl} download className="px-4 py-2 bg-white rounded-lg flex gap-2 items-center justify-center text-[#696969] border-2 border-[#9C9C9C] w-full sm:w-auto">
                        <GoDownload /> Download
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );


    case "Attendance":
      const attendance = 50;

      const attendanceData = [
        {
          id: 1,
          day: "Present Days",
          attendancePercentage: 90,
          color: "#009638",
        },
        {
          id: 2,
          day: "Absent Days",
          attendancePercentage: 85,
          color: "#DC2626",
        },
        {
          id: 3,
          day: "Leave Days",
          attendancePercentage: 80,
          color: "#F97316",
        },
      ];

      const leaveData = [
        {
          date: "2024-06-10",
          type: "Medical",
          description: "Medical leave for 2 days",
          status: "Rejected",
          duration: "2 days",
          dateApplied: "2024-06-08",
          tillDate: "2024-06-10",
          dateAppliedTime: "02 Oct 2025, 08:30 AM",
        },
        {
          date: "2024-06-15",
          type: "Vacation",
          description: "Personal leave for 1 day",
          status: "Approved",
          duration: "1 day",
          dateApplied: "2024-06-14",
          tillDate: "2024-06-15",
          dateAppliedTime: "02 Oct 2025, 08:30 AM",
        },
        {
          date: "2024-06-15",
          type: "Sick",
          description: "Personal leave for 1 day",
          status: "Rejected",
          duration: "1 day",
          dateApplied: "2024-06-14",
          tillDate: "2024-06-15",
          dateAppliedTime: "02 Oct 2025, 08:30 AM",
        },
        {
          date: "2024-06-15",
          type: "Family",
          description: "Personal leave for 1 day",
          status: "Approved",
          duration: "1 day",
          dateApplied: "2024-06-14",
          tillDate: "2024-06-15",
          dateAppliedTime: "05 Oct 2024, 09:00 AM",
        },
        {
          date: "2024-06-15",
          type: "Personal",
          description: "Personal leave for 1 day",
          status: "Pending",
          duration: "1 day",
          dateApplied: "2024-06-14",
          tillDate: "2024-06-15",
          dateAppliedTime: "22 Sep 2025, 10:30 AM",
        },
      ];

      const leaveTypeColors = {
        Medical: "text-[#F97316]",
        Vacation: "text-[#EF476F]",
        Sick: "text-[#007AFF]",
        Family: "text-[#00ADAD]",
        Personal: "text-[#FFD166]",
      };

      const leaveStatusColors = {
        Approved: "text-[#007AFF]",
        Pending: "text-[#856404]",
        Rejected: "text-[#DC2626]",
      };

      return (
        <div>
          <div className="mt-6  bg-linear-to-r from-[#6190E8] to-[#A7BFE8] p-4 rounded-lg">
            <div className="text-white font-bold">
              <span>Attendace Summary</span>
            </div>
            <div className="mt-9 flex lg:flex-row sm:flex-col items-center flex-wrap w-full">
              <div className="bg-white p-4 rounded-2xl lg:w-[25%] m-1 sm:w-full">
                {/* Header */}
                <div className="flex flex-col">
                  <span className="text-[#1c1c1c] text-[14px] font-normal">
                    Attendance Percentage
                  </span>
                  <span className="text-[#009638] text-[18px] font-semibold">
                    {attendance}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-[#EEEEEE] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500
                   bg-linear-to-r from-[#073B4C] to-[#118AB2]"
                    style={{ width: `${attendance}%` }}
                  />
                </div>
              </div>

              {attendanceData.map((item, index) => (
                <div className="bg-white p-4 rounded-lg lg:w-[24%] m-1 sm:w-full">
                  <div key={index} className="flex flex-col">
                    <span className="text-[#1c1c1c] text-[14px] font-normal">
                      {item.day}
                    </span>
                    <span
                      className="text-[18px] font-semibold"
                      style={{
                        color:
                          item.id === 1
                            ? "#009638"
                            : item.id === 2
                            ? "#DC2626"
                            : "#F97316",
                      }}
                    >
                      {item.attendancePercentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-6 rounded-lg">
            <div className="flex flex-wrap p-2 rounded-lg justify-center items-center bg-white w-134 shadow-md">
              <span className="text-[#1C1C1C] text-[17px] font-semibold mt-4">
                Monthly Attendance Calender
              </span>
              {/* <------------------------------- Calender Graph ---------------------------------------> */}
              <div className="mt-4 w-full flex justify-center items-center react-calendar">
                <Calendar
                  value={calendarDate}
                  onChange={setCalendarDate}
                  tileClassName={({ date, view }) => {
                    if (view !== "month") return;
                    const key = formatDateKey(date);
                    const status = attendanceMap[key]?.status;

                    return getStatusClasses(status);
                  }}
                />
              </div>
              <div>
                <div className="mt-4 flex gap-6 flex-wrap">
                  {[
                    { label: "Present", color: "#009638" },
                    { label: "Absent", color: "#DC2626" },
                    { label: "Leave", color: "#F97316" },
                    { label: "Holiday", color: "#00ADAD" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[#1c1c1c] text-[16px] flex items-center gap-1">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-2 rounded-lg w-full justify-center items-center bg-white shadow-md">
              <div className="flex flex-col font-semibold mt-4">
                <span className="font-semibold text-lg text-[#1C1C1C]">
                  Attendance Summary
                </span>
                <span className="text-[#9C9C9C] text-[15px] font-normal">
                  Month-wise Attendance
                </span>
              </div>
              <div className="w-full overflow-x-auto border border-[#e6e6e6] rounded-lg mt-4">
                <table className="w-full">
                  <thead>
                    <tr className="">
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Month
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Present Days
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Absent Days
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Leave Days
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        month: "January",
                        present: 20,
                        absent: 2,
                        leave: 1,
                        status: "Good",
                      },
                      {
                        month: "February",
                        present: 18,
                        absent: 4,
                        leave: 2,
                        status: "Average",
                      },
                      {
                        month: "March",
                        present: 22,
                        absent: 0,
                        leave: 0,
                        status: "Excellent",
                      },
                      {
                        month: "April",
                        present: 19,
                        absent: 3,
                        leave: 1,
                        status: "Good",
                      },
                      {
                        month: "May",
                        present: 21,
                        absent: 1,
                        leave: 0,
                        status: "Excellent",
                      },
                      {
                        month: "June",
                        present: 17,
                        absent: 5,
                        leave: 2,
                        status: "Poor",
                      },
                    ].map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border-b border-[#e6e6e6]">
                          {item.month}
                        </td>
                        <td className="px-4 py-2 border-b border-[#e6e6e6] text-[#009638]">
                          {item.present}
                        </td>
                        <td className="px-4 py-2 border-b border-[#e6e6e6] text-[#DC2626]">
                          {item.absent}
                        </td>
                        <td className="px-4 py-2 border-b border-[#e6e6e6] text-[#F97316]">
                          {item.leave}
                        </td>
                        <td className="px-4 py-2 border-b border-[#e6e6e6] text-[#1c1c1c]">
                          {item.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <-------------------------------------- Leave ----------------------------------> */}

          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2 text-[#1c1c1c]">
              <div className="flex flex-col">
                <span className="text-[1c1c1c] font-normal">
                  Leave Requests
                </span>
                <span className="text-[#9C9C9C]">
                  Previous leave Requests History
                </span>
              </div>
            </div>
            {leaveData.map((item, index) => (
              <div className="flex items-center mt-3">
                <div key={index} className="relative w-12 h-12 ">
                  {/* VERTICAL DOTTED LINE */}
                  <span className="absolute left-2 bottom-12 h-7 border-l-2 border-dotted border-[#9C9C9C]"></span>

                  {/* DOT */}
                  <span className="absolute left-1 top-1 w-3 h-3 bg-white border-2 border-[#9C9C9C] rounded-full"></span>

                  {/* VERTICAL DOTTED LINE */}
                  {index !== leaveData.length - 1 && (
                    <span className="absolute left-2 top-5 h-17 border-l-2 border-dotted border-[#9C9C9C] z-10"></span>
                  )}

                  {/* HORIZONTAL DOTTED LINE */}
                  <span className="absolute left-5 top-2 w-7 border-t-2 border-dotted border-[#9C9C9C]"></span>
                </div>
                <div className="p-4 bg-white rounded-lg border-2 border-[#E6E6E6] w-full">
                  <div className="flex w-full">
                    <div className="flex flex-col items-start flex-1">
                      <span
                        className={`font-semibold text-[16px] ${
                          leaveTypeColors[item.type] || "text-[#1c1c1c]"
                        }`}
                      >
                        {item.type}
                      </span>

                      <span className="text-[#1c1c1c] font-semibold text-[16px]">
                        Reason
                      </span>
                      <span className="text-[#9c9c9c] font-semibold text-[14px]">
                        {item.description}
                      </span>
                    </div>
                    <div className="flex gap-12 ">
                      <div className="flex flex-1 flex-col">
                        <span className="text-[#1c1c1c] font-semibold text-[16px]">
                          Date (From - To)
                        </span>
                        <span className="text-[#9c9c9c] font-semibold text-[14px]">
                          {item.dateApplied} - {item.tillDate}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#1c1c1c] font-semibold text-[16px]">
                          Duration
                        </span>
                        <span className="text-[#9c9c9c] font-semibold text-[14px]">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col relative items-end flex-1">
                      <span className="text-[#9c9c9c] font-semibold text-[12px]">
                        {item.dateAppliedTime}
                      </span>
                      <span
                        className={`font-normal text-[14px] absolute bottom-0 ${
                          leaveStatusColors[item.status] || "text-[#1c1c1c]"
                        }`}
                      >
                        {item.status} By Class Teacher
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

   
    default:
      return null;
  }
}

function MyStudentDetails() {
  const {id} = useParams();
    const navigate = useNavigate();
  const [active, setActive] = useState("Personal Info");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const activeBtn =
    "bg-[#0B3142] text-[#FFFFFF] border rounded-full px-25 py-2 gap-8";

  const inactiveBtn =
    "text-[#9EA1A1] px-15 py-2 hover:bg-[#e6e6e6] rounded-full px-25 py-2 gap-8";

    useEffect(() => {
      const fetchStudentDetails = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/users/student/${id}`);
          setStudent(response.data);
          console.log("Student data:", response.data);
        }catch(err) {
          console.error("Error fetching student:", err);
          setError(err.response?.data?.message || "Failed to load student details");
          toast.error("Failed to load student details");
        }finally {
          setLoading(false);
        }
      }
      if(id) {
        fetchStudentDetails();
      }
    }, [id]);
// get profile image from either acount.profileImage or student documents
const getProfileImage = () => {
  if(student?.account?.profileImage?.url) {
    return student.account.profileImage.url;
  }
  const studentPhoto = student?.studentInfo?.documents?.studentDocuments?.find((doc) => doc.documentType === "Student Photo");
  return studentPhoto?.fileUrl || null;
}

  // Get student photo for documents section
  const getStudentPhoto = () => {
    const studentPhoto = student?.studentInfo?.documents?.studentDocuments?.find(
      doc => doc.documentType === "Student Photo"
    );
    return studentPhoto?.fileUrl || null;
  };
    // Get father photo
  const getFatherPhoto = () => {
    const fatherPhoto = student?.studentInfo?.documents?.parentDocuments?.find(
      doc => doc.documentType === "Father Photo"
    );
    return fatherPhoto?.fileUrl || null;
  };
   // Get mother photo
  const getMotherPhoto = () => {
    const motherPhoto = student?.studentInfo?.documents?.parentDocuments?.find(
      doc => doc.documentType === "Mother Photo"
    );
    return motherPhoto?.fileUrl || null;
  };
    // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
   // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student details...</p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error || "Student not found"}</p>
          <Link to="/teacher-mystudents" className="text-blue-500 underline mt-2 inline-block">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }
  const studentInfo = student.studentInfo;
  const account = student.account;
  const personalInfo = studentInfo?.personalInfo || {};
  const academicInfo = studentInfo?.academicInfo || {};
  const contactInfo = studentInfo?.contactInfo || {};
  const parentInfo = studentInfo?.parentInfo || {};
  const medicalInfo = studentInfo?.medicalInfo || {};
  const transportInfo = studentInfo?.transportInfo || {};
  const documents = studentInfo?.documents || {};
  const status = studentInfo?.accountInfo?.status || account?.status || "Active";
  const profileImage = getProfileImage();

  const baseBtn = "gap-8 flex justify-around w-full items-center";


  return (
    <div className="p-4">
      <div className="flex gap-4 items-center text-[#1C1C1C] font-semibold">
  <button 
    onClick={() => navigate('/teacher-mystudents')}
    className="flex items-center gap-2 cursor-pointer"
  >
    <IoMdArrowBack />
    <span>Back</span>
  </button>
</div>

      <div
        className="mt-3 p-4 sm:p-6 lg:p-7.5 rounded-lg w-full 
  bg-linear-to-r from-[#9796F0] to-[#FBC7D4]"
      >
        {/* MAIN WRAPPER */}
        <div className="flex flex-col lg:flex-row gap-6 lg:justify-between">
          {/* LEFT SECTION */}
          <div className="flex flex-col sm:flex-row gap-6 w-full">
            {/* PROFILE IMAGE */}
            <div className="flex justify-center sm:justify-start">
              <div
                className="rounded-full h-28 w-28 sm:h-36 sm:w-36 
          border-2 border-white overflow-hidden"
              >
                 {profileImage ? (
                  <img
                    src={profileImage}
                    alt={personalInfo?.fullName || "Student"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-2xl">
                    {personalInfo?.fullName?.charAt(0) || "S"}
                  </div>
                )}

              </div>
            </div>

            {/* DETAILS */}
            <div className="flex-1 w-full">
              {/* NAME + STATUS */}
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-lg font-semibold">
                 {personalInfo?.fullName || "N/A"}
                </span>

                <div className="relative inline-flex items-center px-3 py-1 rounded-full overflow-hidden">
                  <span className="absolute inset-0 bg-[#009638] rounded-full animate-spread" style={{animationDuration:"3s"}}></span>
                  <span className="relative z-10 bg-[#009638] text-white text-sm font-semibold rounded-full px-3">
                   {status}
                  </span>
                </div>
              </div>

              {/* BASIC INFO */}
              <div className="flex gap-15 mt-4 flex-wrap">
                {[
                  ["Student ID", studentInfo?.studentId || "N/A"],
                  ["Admission No.", studentInfo?.admissionNumber || "N/A"],
                  ["Class", `${academicInfo?.currentClass || "N/A"} ${academicInfo?.section ? `- ${academicInfo.section}` : ""}`],
                  ["Academic Year", "2024-26"],
                ].map(([label, value], idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-white text-sm font-normal">
                      {label}
                    </span>
                    <span className="font-semibold text-[#1C1C1C]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {/* CARD 1 */}
                <div className="bg-[#ffffff73] px-4 py-2 rounded-lg">
                  <div className="flex gap-4 items-center">
                    <div className="bg-[#DBEAFE] p-2 rounded-full">
                      <IoSchoolOutline size={26} className="text-[#155DFC]" />
                    </div>
                    <div className="flex flex-col text-[#1C1C1C]">
                      <span className="text-sm">Overall Grade</span>
                      <span className="font-semibold">A+</span>
                    </div>
                  </div>
                </div>

                {/* CARD 2 */}
                <div className="bg-[#ffffff73] px-4 py-2 rounded-lg">
                  <div className="flex gap-4 items-center">
                    <div className="bg-[#DCFCE7] p-2 rounded-full">
                      <PiChartLineUpLight
                        size={26}
                        className="text-[#00A63E]"
                      />
                    </div>
                    <div className="flex flex-col text-[#1C1C1C]">
                      <span className="text-sm">Attendance Rate</span>
                      <span className="font-semibold">95%</span>
                    </div>
                  </div>
                </div>

                {/* CARD 3 */}
                <div className="bg-[#ffffff73] px-4 py-2 rounded-lg">
                  <div className="flex gap-4 items-center">
                    <div className="bg-[#DBEAFE] p-2 rounded-full">
                      <CiTrophy size={26} className="text-[#9810FA]" />
                    </div>
                    <div className="flex flex-col text-[#1C1C1C]">
                      <span className="text-sm">Class Rank</span>
                      <span className="font-semibold">#1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT ACTION BUTTON */}
          <div>
            <div className="bg-[#0B3142] p-2 rounded-lg flex justify-start lg:justify-end">
              <Link to={`/editMyStudent/${student._id}`} className="flex gap-1 items-center text-white font-semibold">
                <LiaUserEditSolid />
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Responsive Filter Tabs ---------------- */}
    <div className="w-full mt-6 bg-white rounded-full shadow-md">
  <div
    className="
      flex
      gap-2
      p-1.5
      scrollbar-hide
      sm:overflow-visible
      sm:justify-between
    "
  >
    {[
      "Personal Info",
      "Attendance",
    ].map((item) => (
      <button
        key={item}
        onClick={() => setActive(item)}
        className={`
          flex
          items-center
          justify-center
          w-[50%]
          py-2
          text-sm
          sm:text-base
          rounded-full
          transition-all
          duration-200
          ${
            active === item
              ? "bg-[#0B3142] text-white"
              : "text-[#9EA1A1] hover:bg-[#e6e6e6]"
          }
        `}
      >
        {item}
      </button>
    ))}
  </div>
</div>

      <div className="">
        <DetailsContent active={active} student={student} />
      </div>
    </div>
  );
}

export default MyStudentDetails;
