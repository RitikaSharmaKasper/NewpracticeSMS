import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../../../CSS/Style.css";
import "react-day-picker/dist/style.css";

/* <----------------------------------- import img & gif ---------------------------------------> */
import calender1 from "../../../assets/images/calender.gif";
import calender2 from "../../../assets/images/calender2.gif";
import calender3 from "../../../assets/images/calender3.gif";
import calender4 from "../../../assets/images/calender4.gif";
import everdeen from "../../../assets/images/katnis.jpg";
import goku from "../../../assets/images/goku.jpg";
import langford from "../../../assets/images/langford.jpg";
import homelander from "../../../assets/images/homelander.jpg";
import thanos from "../../../assets/images/thanos.jpg";
import Joffrey from "../../../assets/images/Joffrey.jpg";
import doll from "../../../assets/images/bella.jpg";
import prime from "../../../assets/images/prime.jpg";
import gamora from "../../../assets/images/gamora.jpg";
import meave from "../../../assets/images/meave.jpg";

import Pagination from "../../../components/Pagination";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
/* <---------------------------------------------- icon -----------------------------------------------------> */
import { PiArrowsDownUpThin } from "react-icons/pi";
import { HiSearch, HiOutlineExclamationCircle } from 'react-icons/hi';
/* <--------------------------------------------------- calender -----------------------------------------------> */
import { LuCalendarDays } from "react-icons/lu";

function StudentAttendance() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const calendarRef = useRef(null);
  const [active, setActive] = useState("Daily Attendance");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);

  /* <----------------------------- PERIOD ATTENDANCE STATE -----------------------------> */
  const [filterClass, setFilterClass] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("");
  const [classOptions, setClassOptions] = useState([]);
  const [periodOptions, setPeriodOptions] = useState([]);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const classDropdownRef = useRef(null);
  const periodDropdownRef = useRef(null);

  const [showPeriodAttendance, setShowPeriodAttendance] = useState(false);
  const [periodAttendanceData, setPeriodAttendanceData] = useState([]);
  const [periodSearchTerm, setPeriodSearchTerm] = useState("");
  const [isMarkAllPresent, setIsMarkAllPresent] = useState(false);
  const periodPreMarkAllSnapshotRef = useRef(null);

  /* <----------------------------- PERIOD ATTENDANCE PAGINATION STATE -----------------------------> */
  const [periodCurrentPage, setPeriodCurrentPage] = useState(1);
  const [periodItemsPerPage, setPeriodItemsPerPage] = useState(10);
  const [isPeriodItemsPerPageOpen, setIsPeriodItemsPerPageOpen] = useState(false);

  /* <----------------------------- DAILY ATTENDANCE - MARK ALL PRESENT STATE -----------------------------> */
  const [isDailyMarkAllPresent, setIsDailyMarkAllPresent] = useState(false);
  const dailyPreMarkAllSnapshotRef = useRef(null);

  const baseBtn =
    "flex font-medium text-sm rounded-full transition-all duration-300";

  const activeBtn =
    "bg-[#F5F7F7] text-[#0B3142] border border-white px-8 py-2 shadow-sm";

  const inactiveBtn = "text-[#9EA1A1] px-8 py-2 hover:text-[#0B3142]";

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close Class/Period filter dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutsideFilters(event) {
      if (classDropdownRef.current && !classDropdownRef.current.contains(event.target)) {
        setIsClassDropdownOpen(false);
      }
      if (periodDropdownRef.current && !periodDropdownRef.current.contains(event.target)) {
        setIsPeriodDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideFilters);
    return () => document.removeEventListener("mousedown", handleClickOutsideFilters);
  }, []);

  // Fetch Class & Period dropdown options
  useEffect(() => {
    const fetchClassAndPeriodOptions = async () => {
      try {
        const classJson = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
        const periodJson = Array.from({ length: 8 }, (_, i) => `Period ${i + 1}`);
        setClassOptions(classJson);
        setPeriodOptions(periodJson);
      } catch (error) {
        console.error("Failed to fetch class/period options:", error);
      }
    };
    fetchClassAndPeriodOptions();
  }, []);

  // Calendar helpers
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleSelectDay = (day) => {
    const year = currentCalendarDate.getFullYear();
    const month = String(currentCalendarDate.getMonth() + 1).padStart(2, "0");
    const dayString = String(day).padStart(2, "0");
    const selectedDate = new Date(year, currentCalendarDate.getMonth(), day);
    setDate(selectedDate);
    setIsCalendarOpen(false);
  };

  const renderCalendarDays = () => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);

    const dayButtons = [];

    for (let i = 0; i < firstDayIndex; i++) {
      dayButtons.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isSelected = date.getDate() === day && 
                         date.getMonth() === month && 
                         date.getFullYear() === year;
      const isToday = new Date().getDate() === day && 
                      new Date().getMonth() === month && 
                      new Date().getFullYear() === year;

      dayButtons.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={() => handleSelectDay(day)}
          className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-colors cursor-pointer
            ${isSelected 
              ? "bg-[#0B3142] text-white" 
              : isToday
                ? "border border-[#0B3142] text-[#0B3142] font-bold"
                : "text-[#1C1C1C] hover:bg-slate-100"
            }`}
        >
          {day}
        </button>
      );
    }

    return dayButtons;
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const attendanceData = [
    {
      id: 1,
      title: "Present Students",
      value: "460",
      percentage: "60%",
      des: "present Students",
      icon: calender1,
      percentColor: "text-[#009638]",
    },
    {
      id: 2,
      title: "Absent Students",
      value: "10",
      percentage: "38%",
      des: "absent Students",
      icon: calender2,
      percentColor: "text-[#DC2626]",
    },
    {
      id: 3,
      title: "On - Leave",
      value: "5",
      percentage: "28%",
      des: "leave Students",
      icon: calender3,
      percentColor: "text-[#F97316]",
    },
    {
      id: 4,
      title: "Attendance Rate",
      value: "95%",
      percentage: "95%",
      des: "attendance rate",
      icon: calender4,
      percentColor: "text-[#009638]",
    },
  ];

  /* <--------------------------------------------------- student Dummy Data --------------------------------------------> */
  const studentData = [
    {
      id: 1,
      student: "katniss Everdeen",
      studentId: "001",
      img: everdeen,
      class: "12B",
      status: "Present",
      rollNo: "1",
      attendancePercentage: "95%",
    },
    {
      id: 2,
      student: "Goku",
      studentId: "002",
      img: goku,
      class: "11B",
      status: "Present",
      rollNo: "2",
      attendancePercentage: "100%",
    },
    {
      id: 3,
      student: "Katniss langford",
      studentId: "010",
      img: langford,
      class: "1B",
      status: "Present",
      rollNo: "3",
      attendancePercentage: "99%",
    },
    {
      id: 4,
      student: "Homelander",
      img: homelander,
      studentId: "003",
      class: "10C",
      status: "Present",
      rollNo: "4",
      attendancePercentage: "45%",
    },
    {
      id: 5,
      student: "Thanos",
      studentId: "004",
      img: thanos,
      class: "9A",
      status: "Absent",
      rollNo: "5",
      attendancePercentage: "2%",
    },
    {
      id: 6,
      student: "Joffrey Baratheon",
      img: Joffrey,
      studentId: "005",
      class: "11A",
      status: "Leave",
      rollNo: "6",
      attendancePercentage: "1%",
    },
    {
      id: 7,
      student: "Annembella",
      img: doll,
      studentId: "006",
      class: "11B",
      status: "Present",
      rollNo: "7",
      attendancePercentage: "9%",
    },
    {
      id: 8,
      student: "optimus Prime",
      img: prime,
      studentId: "007",
      class: "7A",
      status: "Present",
      rollNo: "8",
      attendancePercentage: "100%",
    },
    {
      id: 9,
      student: "Gamora ",
      img: gamora,
      studentId: "008",
      class: "12A",
      status: "Absent",
      rollNo: "9",
      attendancePercentage: "50%",
    },
    {
      id: 10,
      student: "Meave Wiley",
      img: meave,
      studentId: "009",
      class: "12C",
      status: "Leave",
      rollNo: "10",
      attendancePercentage: "90%",
    },
  ];

  const [dailyAttendanceData, setDailyAttendanceData] = useState(studentData);

  const filteredData = dailyAttendanceData.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.student.toLowerCase().includes(searchLower) ||
      item.studentId.toLowerCase().includes(searchLower) ||
      item.class.toLowerCase().includes(searchLower)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  const statusStyle = {
    Present: "bg-[#D4EDDA] text-[#009638]",
    Absent: "bg-[#F8D7DA] text-[#C92131]",
    Leave: "bg-[#FDEBD0] text-[#D35400]",
  };

  const leaveAbsent = [
    {
      id: 1,
      img: thanos,
      student: "Thanos",
      class: "9A",
      status: "Absent",
      reason: "No information",
    },
    {
      id: 2,
      img: Joffrey,
      student: "Joffrey Baratheon",
      class: "12A",
      status: "Absent",
      reason: "No information",
    },
    {
      id: 3,
      img: meave,
      student: "Meave Wiley",
      class: "12C",
      status: "Leave",
      reason: "Sick Leave",
    },
    {
      id: 4,
      img: goku,
      student: "Goku",
      class: "11B",
      status: "Absent",
      reason: "No information",
    },
    {
      id: 5,
      img: gamora,
      student: "Gamora ",
      class: "12A",
      status: "Absent",
      reason: "Family Function",
    },
    {
      id: 6,
      img: Joffrey,
      student: "Joffrey Baratheon",
      class: "12A",
      status: "Absent",
      reason: "No information",
    },
  ];
  
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    setIsItemsPerPageOpen(false);
  };

  /* <----------------------------- PERIOD PAGINATION HANDLERS -----------------------------> */
  const getPeriodPageNumbers = () => {
    const totalPeriodItems = filteredPeriodData.length;
    const totalPeriodPages = Math.ceil(totalPeriodItems / periodItemsPerPage) || 1;
    const pages = [];
    if (totalPeriodPages <= 5) {
      for (let i = 1; i <= totalPeriodPages; i++) {
        pages.push(i);
      }
    } else if (periodCurrentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else if (periodCurrentPage >= totalPeriodPages - 2) {
      for (let i = totalPeriodPages - 4; i <= totalPeriodPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = periodCurrentPage - 2; i <= periodCurrentPage + 2; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const handlePeriodPageChange = (page) => {
    const totalPeriodItems = filteredPeriodData.length;
    const totalPeriodPages = Math.ceil(totalPeriodItems / periodItemsPerPage) || 1;
    if (page >= 1 && page <= totalPeriodPages) {
      setPeriodCurrentPage(page);
    }
  };

  const handlePeriodItemsPerPageChange = (value) => {
    setPeriodItemsPerPage(value);
    setPeriodCurrentPage(1);
    setIsPeriodItemsPerPageOpen(false);
  };

  /* <----------------------------- DAILY ATTENDANCE HANDLERS -----------------------------> */
  const handleDailyStatusChange = (id, status) => {
    setDailyAttendanceData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    if (status !== "Present") {
      setIsDailyMarkAllPresent(false);
    }
  };

  const handleDailyMarkAllPresentToggle = () => {
    const newValue = !isDailyMarkAllPresent;
    setIsDailyMarkAllPresent(newValue);

    if (newValue) {
      dailyPreMarkAllSnapshotRef.current = dailyAttendanceData.map((item) => ({
        id: item.id,
        status: item.status,
      }));
      setDailyAttendanceData((prev) => prev.map((item) => ({ ...item, status: "Present" })));
    } else {
      const snapshot = dailyPreMarkAllSnapshotRef.current;
      if (snapshot) {
        setDailyAttendanceData((prev) =>
          prev.map((item) => {
            const saved = snapshot.find((s) => s.id === item.id);
            return saved ? { ...item, status: saved.status } : item;
          })
        );
      }
    }
  };

  // Daily Reset Handler
  const handleDailyReset = () => {
    setDailyAttendanceData(studentData);
    setIsDailyMarkAllPresent(false);
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Daily Save Handler
  const handleDailySave = () => {
    // In a real app, this would save to API
    alert("Daily attendance saved successfully!");
  };

  /* <----------------------------- PERIOD ATTENDANCE HANDLERS -----------------------------> */
  const handleSelectFilterClass = (cls) => {
    setFilterClass(cls);
    setIsClassDropdownOpen(false);
  };

  const handleSelectFilterPeriod = (period) => {
    setFilterPeriod(period);
    setIsPeriodDropdownOpen(false);
  };

  const handlePeriodSearch = () => {
    setPeriodAttendanceData(studentData.map((item) => ({ ...item })));
    setPeriodSearchTerm("");
    setIsMarkAllPresent(false);
    setShowPeriodAttendance(true);
    setPeriodCurrentPage(1);
  };

  const handlePeriodStatusChange = (id, status) => {
    setPeriodAttendanceData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    if (status !== "Present") {
      setIsMarkAllPresent(false);
    }
  };

  const handleMarkAllPresentToggle = () => {
    const newValue = !isMarkAllPresent;
    setIsMarkAllPresent(newValue);

    if (newValue) {
      periodPreMarkAllSnapshotRef.current = periodAttendanceData.map((item) => ({
        id: item.id,
        status: item.status,
      }));
      setPeriodAttendanceData((prev) =>
        prev.map((item) => ({ ...item, status: "Present" }))
      );
    } else {
      const snapshot = periodPreMarkAllSnapshotRef.current;
      if (snapshot) {
        setPeriodAttendanceData((prev) =>
          prev.map((item) => {
            const saved = snapshot.find((s) => s.id === item.id);
            return saved ? { ...item, status: saved.status } : item;
          })
        );
      }
    }
  };

  // Period Reset Handler
  const handlePeriodReset = () => {
    setPeriodAttendanceData([]);
    setIsMarkAllPresent(false);
    setPeriodSearchTerm("");
    setFilterClass("");
    setFilterPeriod("");
    setShowPeriodAttendance(false);
    setPeriodCurrentPage(1);
  };

  // Period Save Handler
  const handlePeriodSave = () => {
    // In a real app, this would save to API
    alert("Period attendance saved successfully!");
  };

  const filteredPeriodData = periodAttendanceData.filter((item) => {
    const searchLower = periodSearchTerm.toLowerCase();
    return (
      item.student.toLowerCase().includes(searchLower) ||
      item.studentId.toLowerCase().includes(searchLower) ||
      item.class.toLowerCase().includes(searchLower)
    );
  });
  
  /* <-------------------------------- graph component ----------------------> */
  function ExamPerformanceTrendChart() {
    const svgRef = useRef(null);
    const wrapperRef = useRef(null);
    const tooltipRef = useRef(null);
    const [width, setWidth] = useState(0);

    const data = [
      { Attendance: "Jan", attendanceRate: 55 },
      { Attendance: "feb", attendanceRate: 75 },
      { Attendance: "March", attendanceRate: 90 },
      { Attendance: "April", attendanceRate: 82 },
      { Attendance: "May", attendanceRate: 52 },
      { Attendance: "June", attendanceRate: 98 },
    ];

    useEffect(() => {
      if (!wrapperRef.current) return;
      const observer = new ResizeObserver((entries) => {
        setWidth(entries[0].contentRect.width);
      });
      observer.observe(wrapperRef.current);
      return () => observer.disconnect();
    }, []);

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
        .domain(data.map((d) => d.Attendance))
        .range([0, innerWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([0, 100])
        .nice()
        .range([innerHeight, 0]);

      const grid = chart
        .append("g")
        .call(
          d3
            .axisLeft(yScale)
            .tickValues([0, 25, 50, 75, 100])
            .tickSize(-innerWidth)
            .tickFormat(""),
        );

      grid
        .selectAll("line")
        .attr("stroke", "#e6e6e6")
        .attr("stroke-dasharray", "2 2");

      grid
        .selectAll("line")
        .filter((d) => d === 100)
        .remove();

      chart
        .append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale).tickValues([0, 25, 50, 75, 100]));

      chart.select(".y-axis").select(".domain").remove();
      chart.selectAll(".y-axis .tick line").remove();

      chart
        .append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale));

      chart.selectAll(".domain").remove();

      const area = d3
        .area()
        .x((d) => xScale(d.Attendance))
        .y0(innerHeight)
        .y1((d) => yScale(d.attendanceRate))
        .curve(d3.curveMonotoneX);

      chart
        .append("path")
        .datum(data)
        .attr("fill", "url(#area-gradient)")
        .attr("d", area);

      const line = d3
        .line()
        .x((d) => xScale(d.Attendance))
        .y((d) => yScale(d.attendanceRate))
        .curve(d3.curveMonotoneX);

      chart
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#007AFF")
        .attr("stroke-width", 3)
        .attr("d", line);

      const hoverLine = chart
        .append("line")
        .attr("stroke", "#007AFF")
        .attr("y1", 0)
        .attr("y2", innerHeight)
        .style("opacity", 0);

      chart
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.Attendance))
        .attr("cy", (d) => yScale(d.attendanceRate))
        .attr("r", 6)
        .attr("fill", "#007AFF")
        .on("mouseenter", (event, d) => {
          const cy = yScale(d.attendanceRate);
          hoverLine
            .attr("x1", xScale(d.Attendance))
            .attr("x2", xScale(d.Attendance))
            .attr("y1", cy)
            .attr("y2", innerHeight)
            .style("opacity", 1);

          d3.select(tooltipRef.current)
            .style("opacity", 1)
            .html(
              `<strong>${d.Attendance}</strong><br/>attendanceRate: ${d.attendanceRate}`,
            );
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
      <div ref={wrapperRef} className="relative w-full h-80">
        <svg ref={svgRef} className="w-full h-full" />
        <div
          ref={tooltipRef}
          className="absolute bg-[#0B3142] text-white px-3 py-2 rounded text-sm pointer-events-none opacity-0"
        />
      </div>
    );
  }

  return (
    <>
  
    <div className="box-shadow bg-white rounded-xl p-4">
        <div className="flex justify-between p-0 mt-0 items-center">
          <div>
            <p className="flex flex-col">
              <span className="text-[18px] md:text-[18px] text-[#1c1c1c] font-semibold font-[600]">
         Attendance Tracking 
              </span>
              <span className="text-[14px]  font-normal font-[400] text-[#696969]">
              Mark and manage student attendance 
              </span>
            </p>
          </div>

          <div className=" p-1 bg-white">
            <div className="inline-flex items-center gap-2 bg-[linear-gradient(to_right,#F5F2ED,#F4F5F0,#EDF5F3)] mt-1 rounded-2xl p-1">
              {["Daily Attendance", "Period Attendance"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={`${baseBtn} ${
                    active === item ? activeBtn : inactiveBtn
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CALENDAR */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3 pr-0 pl-0">
          <div className="relative w-fit" ref={calendarRef}>
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="flex items-center justify-between gap-3 bg-[#F2F5F4] rounded-lg px-3 py-1"
            >
              <span className="text-[14px] font-normal font-[400] text-[#1C1C1C]">
                {formatDate(date)}
              </span>
              <LuCalendarDays className="w-4 h-4 text-[#1C1C1C]" />
            </button>

            {isCalendarOpen && (
              <div className="absolute z-50 mt-3 bg-white border border-[#E6E6E6] rounded-[16px] shadow-xl p-4 w-[280px]">
                <div className="flex justify-between items-center mb-3">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm"
                  >
                    &lt;
                  </button>
                  <span className="text-sm font-semibold text-[#1C1C1C]">
                    {months[currentCalendarDate.getMonth()]} {currentCalendarDate.getFullYear()}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm"
                  >
                    &gt;
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center mb-1">
                  {daysOfWeek.map(day => (
                    <span key={day} className="text-[11px] font-semibold text-[#9C9C9C] uppercase">
                      {day}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {renderCalendarDays()}
                </div>
              </div>
            )}
          </div>
        </div>

        {active === "Daily Attendance" ? (
          <>
            {/* SEARCH + FILTER + MARK ALL PRESENT */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5 px-0 mt-8">   
              <div className="relative flex-1 w-full">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
                <input
                  type="text"
                  placeholder="Search by student name, ID, or class..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-[9px] text-[14px] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Mark All Present */}
                <label className="flex items-center gap-1 text-[14px] font-normal text-[#1C1C1C] border border-[#C3C3C3] px-3 rounded-[6px] py-0.5 cursor-pointer whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={isDailyMarkAllPresent}
                    onChange={handleDailyMarkAllPresentToggle}
                    className="w-3 h-3 cursor-pointer accent-[#0B3142]"
                  />
                  Mark All Present
                </label>
              </div>
            </div>

            {/* TABLE */}
            <div className="p-0">
              <div className="w-full overflow-x-auto border border-[#e6e6e6] rounded-lg">
                <table className="w-full table-auto min-w-[900px]">
                  <thead className="border-b border-[#e6e6e6] bg-gray-50/50">
                    <tr>
                      <th className="pl-1 pr-5 py-3 text-center text-sm font-semibold whitespace-nowrap">
                        Roll No
                      </th>
                      <th className="pl-14 pr-8 py-3 text-left text-sm font-semibold w-[20%]">
                        <div className="flex items-center gap-2">
                          <span>Student Name</span>
                          <PiArrowsDownUpThin />
                        </div>
                      </th>
                      <th className="pl-12 pr-9 py-3 text-center text-sm font-semibold whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <span>Class</span>
                          <PiArrowsDownUpThin />
                        </div>
                      </th>
                      <th className="pl-17 pr-5 py-3 text-center text-sm font-semibold whitespace-nowrap">
                        Status
                      </th>
                      <th className="pl-1 py-3 text-center text-sm font-semibold min-w-[100px]">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((item) => (
                        <tr key={item.id} className="border-b border-[#e6e6e6] transition-colors">
                          <td className="pl-0 pr-5 py-4 text-center text-sm font-semibold text-[#9c9c9c] whitespace-nowrap">
                            #{item.rollNo}
                          </td>
                          
                          <td className="pl-14 pr-8 py-3 text-left text-sm font-semibold">
                            <div className="flex gap-4 items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <img
                                  src={item.img}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col leading-tight">
                                <span className="text-[#12516E] font-semibold">
                                  {item.student}
                                </span>
                                <span className="text-xs text-[#9c9c9c] font-normal mt-0.5">
                                  {item.studentId}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="pl-9 pr-9 py-3 text-center text-[14px] font-normal font-[400] text-gray-700 whitespace-nowrap">
                            {item.class}
                          </td>
                          
                          <td className="pl-20 pr-5 py-3 text-center text-sm font-semibold whitespace-nowrap">
                            <span
                              className={`inline-flex items-center justify-center gap-1.5 w-[75px] py-1 rounded text-[12px] font-semibold ${
                                statusStyle[item.status] || "bg-gray-100 text-gray-600"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0"></span>
                              <span className="font-semibold font-[600] leading-none">{item.status}</span>
                            </span>
                          </td>

                          <td className="pl-1 py-3 text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => handleDailyStatusChange(item.id, "Present")}
                                className={`border w-[150px] h-[24px] rounded-[4px] font-normal text-[14px] transition-colors ${
                                  item.status === "Present"
                                    ? "bg-[#009638] text-white border-[#009638]"
                                    : "border-[#9C9C9C] text-[#9C9C9C] hover:bg-[#009638] hover:text-white"
                                }`}
                              >
                                Present
                              </button>
                              <button
                                onClick={() => handleDailyStatusChange(item.id, "Absent")}
                                className={`border w-[150px] h-[24px] rounded-[4px] font-normal text-[14px] transition-colors ${
                                  item.status === "Absent"
                                    ? "bg-[#DEDEDE] text-white border-[#DEDEDE]"
                                    : "border-[#9C9C9C] text-[#9C9C9C] hover:bg-[#DEDEDE] hover:text-white"
                                }`}
                              >
                                Absent
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-[#9C9C9C]">
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* PAGINATION + RESET & SAVE BUTTONS */}
              <div className="flex flex-col gap-4 mt-4">
                {/* Pagination */}
                <div
                  className="text-[10px] md:text-[12px] lg:text-[14px]"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    color: "#6B7280",
                    fontFamily: "Segoe UI",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
                        style={{
                          width: "80px",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          background: "#F9F9F9",
                          boxShadow:
                            "-2px 0px 1px rgba(0,0,0,0.05) inset, 2px 0px 1px rgba(0,0,0,0.05) inset, 0px -2px 1px rgba(0,0,0,0.05) inset, 0px 2px 1px rgba(0,0,0,0.05) inset",
                          cursor: "pointer",
                          outline: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className="text-[#1C1C1C] font-bold text-[14px]">{itemsPerPage}</span>
                        <span
                          style={{
                            fontSize: "8px",
                            color: "#555",
                            transition: "transform 0.2s",
                            transform: isItemsPerPageOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        >
                          ▼
                        </span>
                      </div>

                      {isItemsPerPageOpen && (
                        <div className="absolute bottom-full mb-2 left-0 w-20 bg-white border border-[#696969] rounded-[8px] shadow-xl z-50 overflow-hidden">
                          {[5, 10, 20, 50].map((val) => (
                            <div
                              key={val}
                              onClick={() => handleItemsPerPageChange(val)}
                              className="px-4 py-2 text-[12px] text-[#696969] hover:bg-[#F3F4F6] cursor-pointer text-center font-normal"
                            >
                              {val}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[14px] text-[#696969]">
                      Showing{" "}
                      <span style={{ color: "#1C1C1C" }}>
                        {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                      </span>
                      -{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={`cursor-pointer ${currentPage === 1 ? "opacity-30 pointer-events-none" : ""}`}
                    >
                      <button
                        disabled={currentPage === 1}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#9CA3AF",
                          display: "flex",
                          alignItems: "center",
                          cursor: currentPage === 1 ? "not-allowed" : "pointer",
                          opacity: currentPage === 1 ? 0.5 : 1,
                          padding: "4px 8px",
                        }}
                      >
                        <MdKeyboardArrowLeft size={25} /> Previous
                      </button>
                    </div>

                    <div className="flex gap-1">
                      {getPageNumbers().map((p) => (
                        <span
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`w-7 h-7 flex items-center justify-center rounded-[8px] cursor-pointer transition-colors ${
                            currentPage === p
                              ? "bg-[#002B36] text-white"
                              : "hover:bg-gray-100 text-[#1C1C1C]"
                          }`}
                        >
                          {p}
                        </span>
                      ))}
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <>
                          <span className="w-7 h-7 flex items-center justify-center text-[#6B7280]">
                            ...
                          </span>
                          <span
                            onClick={() => handlePageChange(totalPages)}
                            className="w-7 h-7 flex items-center justify-center rounded-[8px] cursor-pointer hover:bg-gray-100 text-[#1C1C1C]"
                          >
                            {totalPages}
                          </span>
                        </>
                      )}
                    </div>

                    <div
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={`cursor-pointer ${currentPage === totalPages ? "opacity-30 pointer-events-none" : ""}`}
                    >
                      <button
                        disabled={currentPage === totalPages}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#9CA3AF",
                          display: "flex",
                          alignItems: "center",
                          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                          opacity: currentPage === totalPages ? 0.5 : 1,
                          padding: "4px 8px",
                        }}
                      >
                        Next <MdKeyboardArrowRight size={25} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 🟢 RESET & SAVE BUTTONS - BOTTOM */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleDailyReset}
                    className="px-6 py-2 border border-[#9C9C9C] text-[#9C9C9C] rounded-[6px] text-[14px] font-normal hover:bg-gray-100 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleDailySave}
                    className="px-6 py-2 bg-[#0B3142] text-white rounded-[6px] text-[14px] font-semibold hover:bg-[#1a4a5e] transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* PERIOD ATTENDANCE — CLASS & PERIOD FILTERS */}
            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <div className="flex-1">
                <label className="block text-[14px] font-semibold font-[600] text-[#1C1C1C] mb-1">Class</label>
                <div className="relative" ref={classDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                    className="w-full flex items-center justify-between gap-3 bg-[#FFFFFF] border border-[#E6E6E6] rounded-[12px] px-3 py-3 text-left"
                  >
                    <span
                      className={`text-[14px] font-normal ${
                        filterClass ? "text-[#1C1C1C]" : "text-[#9C9C9C]"
                      }`}
                    >
                      {filterClass || "Select assign class"}
                    </span>
                    <span
                      className={`text-[10px] text-[#696969] transition-transform ${
                        isClassDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {isClassDropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-[#E6E6E6] rounded-[12px] shadow-xl max-h-60 overflow-y-auto">
                      {classOptions.map((cls) => (
                        <div
                          key={cls}
                          onClick={() => handleSelectFilterClass(cls)}
                          className="px-4 py-2 text-[14px] text-[#1C1C1C] hover:bg-[#F3F4F6] cursor-pointer"
                        >
                          {cls}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-[14px] font-[600] font-semibold text-[#1C1C1C] mb-1">Period</label>
                <div className="relative" ref={periodDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
                    className="w-full flex items-center justify-between gap-3 bg-[#FFFFFF] border border-[#E6E6E6] rounded-[12px] px-3 py-3 text-left"
                  >
                    <span
                      className={`text-[14px] font-normal ${
                        filterPeriod ? "text-[#1C1C1C]" : "text-[#9C9C9C]"
                      }`}
                    >
                      {filterPeriod || "Period 1"}
                    </span>
                    <span
                      className={`text-[10px] text-[#696969] transition-transform ${
                        isPeriodDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {isPeriodDropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-[#E6E6E6] rounded-[12px] shadow-xl max-h-60 overflow-y-auto">
                      {periodOptions.map((p) => (
                        <div
                          key={p}
                          onClick={() => handleSelectFilterPeriod(p)}
                          className="px-4 py-2 text-[14px] text-[#1C1C1C] hover:bg-[#F3F4F6] cursor-pointer"
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <div className="mt-5">
              <button
                type="button"
                onClick={handlePeriodSearch}
                className="flex items-center gap-2 bg-[#0B3142] text-white px-4 py-2 w-[120px] h-[40px] rounded-[8px] text-[16px] font-semibold font-[600] transition-colors"
              >
                <HiSearch className="text-[18px]" />
                Search
              </button>
            </div>

            {showPeriodAttendance && (
              <>
                {/* SEARCH STUDENTS + MARK ALL PRESENT */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5 px-0 mt-8">
                  <div className="relative flex-1 w-full">
                    <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
                    <input
                      type="text"
                      placeholder="Search students by name or admission number..."
                      value={periodSearchTerm}
                      onChange={(e) => setPeriodSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-[9px] text-[14px] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 text-[14px] font-normal text-[#1C1C1C] cursor-pointer border border-[#C3C3C3] px-3 rounded-[6px] py-0.5 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={isMarkAllPresent}
                        onChange={handleMarkAllPresentToggle}
                        className="w-3 h-3 cursor-pointer accent-[#0B3142]"
                      />
                      Mark All Present
                    </label>
                  </div>
                </div>

                {/* PERIOD ATTENDANCE TABLE */}
                <div className="p-0">
                  <div className="w-full overflow-x-auto border border-[#e6e6e6] rounded-lg">
                    <table className="w-full table-auto min-w-[900px]">
                      <thead className="border-b border-[#e6e6e6] bg-gray-50/50">
                        <tr>
                          <th className="pl-1 pr-5 py-3 text-center text-[14px] font-[600] font-semibold whitespace-nowrap">
                            Roll Number
                          </th>
                          <th className="pl-14 pr-8 py-3 text-left text-[14px] font-[600] font-semibold w-[20%]">
                            Student
                          </th>
                          <th className="pl-12 pr-9 py-3 text-center text-[14px] font-[600] font-semibold whitespace-nowrap">
                            Class
                          </th>
                          <th className="pl-17 pr-5 py-3 text-center text-sm font-semibold whitespace-nowrap">
                            Status
                          </th>
                          <th className="pl-1 py-3 text-center text-[14px] font-[600] font-semibold min-w-[100px]">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {(() => {
                          const totalPeriodItems = filteredPeriodData.length;
                          const indexOfLastPeriod = periodCurrentPage * periodItemsPerPage;
                          const indexOfFirstPeriod = indexOfLastPeriod - periodItemsPerPage;
                          const currentPeriodData = filteredPeriodData.slice(indexOfFirstPeriod, indexOfLastPeriod);
                          
                          if (currentPeriodData.length > 0) {
                            return currentPeriodData.map((item) => (
                              <tr key={item.id} className="border-b border-[#e6e6e6] transition-colors">
                                <td className="pl-0 pr-5 py-4 text-center text-sm font-semibold text-[#9c9c9c] whitespace-nowrap">
                                  #{item.rollNo}
                                </td>

                                <td className="pl-14 pr-8 py-3 text-left text-sm font-semibold">
                                  <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                      <img
                                        src={item.img}
                                        alt=""
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                      <span className="text-[#12516E] font-semibold">
                                        {item.student}
                                      </span>
                                      <span className="text-xs text-[#9c9c9c] font-normal mt-0.5">
                                        {item.studentId}
                                      </span>
                                    </div>
                                  </div>
                                </td>

                                <td className="pl-9 pr-9 py-3 text-center text-[14px] font-normal text-gray-700 whitespace-nowrap">
                                  {item.class}
                                </td>

                                <td className="pl-20 pr-5 py-3 text-center text-[14px] font-semibold whitespace-nowrap">
                                  <span
                                    className={`inline-flex items-center justify-center gap-1.5 w-[75px] py-1 rounded text-[12px] font-semibold ${
                                      statusStyle[item.status] || "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0"></span>
                                    <span className="font-semibold font-[600] leading-none">{item.status}</span>
                                  </span>
                                </td>

                                <td className="pl-1 py-3 text-center">
                                  <div className="flex items-center justify-center gap-3">
                                    <button
                                      onClick={() => handlePeriodStatusChange(item.id, "Present")}
                                      className={`border w-[150px] h-[24px] rounded-[4px] font-normal text-[14px] transition-colors ${
                                        item.status === "Present"
                                          ? "bg-[#009638] text-white border-[#009638]"
                                          : "border-[#9C9C9C] text-[#9C9C9C] hover:bg-[#009638] hover:text-white"
                                      }`}
                                    >
                                      Present
                                    </button>
                                    <button
                                      onClick={() => handlePeriodStatusChange(item.id, "Absent")}
                                      className={`border w-[150px] h-[24px] rounded-[4px] font-normal text-[14px] transition-colors ${
                                        item.status === "Absent"
                                          ? "bg-[#DEDEDE] text-white border-[#DEDEDE]"
                                          : "border-[#9C9C9C] text-[#9C9C9C] hover:bg-[#DEDEDE] hover:text-white"
                                      }`}
                                    >
                                      Absent
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ));
                          } else {
                            return (
                              <tr>
                                <td colSpan="5" className="text-center py-8 text-[#9C9C9C]">
                                  No students found
                                </td>
                              </tr>
                            );
                          }
                        })()}
                      </tbody>
                    </table>
                  </div>

                  {/* 🟢 PERIOD PAGINATION + RESET & SAVE BUTTONS - BOTTOM */}
                  {filteredPeriodData.length > 0 && (
                    <div className="flex flex-col gap-4 mt-4">
                      {/* Period Pagination */}
                      <div
                        className="text-[10px] md:text-[12px] lg:text-[14px]"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px",
                          color: "#6B7280",
                          fontFamily: "Segoe UI",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div
                              onClick={() => setIsPeriodItemsPerPageOpen(!isPeriodItemsPerPageOpen)}
                              style={{
                                width: "80px",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                background: "#F9F9F9",
                                boxShadow:
                                  "-2px 0px 1px rgba(0,0,0,0.05) inset, 2px 0px 1px rgba(0,0,0,0.05) inset, 0px -2px 1px rgba(0,0,0,0.05) inset, 0px 2px 1px rgba(0,0,0,0.05) inset",
                                cursor: "pointer",
                                outline: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <span className="text-[#1C1C1C] font-bold text-[14px]">{periodItemsPerPage}</span>
                              <span
                                style={{
                                  fontSize: "8px",
                                  color: "#555",
                                  transition: "transform 0.2s",
                                  transform: isPeriodItemsPerPageOpen ? "rotate(180deg)" : "rotate(0deg)",
                                }}
                              >
                                ▼
                              </span>
                            </div>

                            {isPeriodItemsPerPageOpen && (
                              <div className="absolute bottom-full mb-2 left-0 w-20 bg-white border border-[#696969] rounded-[8px] shadow-xl z-50 overflow-hidden">
                                {[5, 10, 20, 50].map((val) => (
                                  <div
                                    key={val}
                                    onClick={() => handlePeriodItemsPerPageChange(val)}
                                    className="px-4 py-2 text-[12px] text-[#696969] hover:bg-[#F3F4F6] cursor-pointer text-center font-normal"
                                  >
                                    {val}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className="text-[14px] text-[#696969]">
                            Showing{" "}
                            <span style={{ color: "#1C1C1C" }}>
                              {filteredPeriodData.length === 0 ? 0 : (periodCurrentPage - 1) * periodItemsPerPage + 1}
                            </span>
                            -{Math.min(periodCurrentPage * periodItemsPerPage, filteredPeriodData.length)} of {filteredPeriodData.length} results
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div
                            onClick={() => handlePeriodPageChange(periodCurrentPage - 1)}
                            className={`cursor-pointer ${periodCurrentPage === 1 ? "opacity-30 pointer-events-none" : ""}`}
                          >
                            <button
                              disabled={periodCurrentPage === 1}
                              style={{
                                border: "none",
                                background: "transparent",
                                color: "#9CA3AF",
                                display: "flex",
                                alignItems: "center",
                                cursor: periodCurrentPage === 1 ? "not-allowed" : "pointer",
                                opacity: periodCurrentPage === 1 ? 0.5 : 1,
                                padding: "4px 8px",
                              }}
                            >
                              <MdKeyboardArrowLeft size={25} /> Previous
                            </button>
                          </div>

                          <div className="flex gap-1">
                            {getPeriodPageNumbers().map((p) => {
                              const totalPeriodPages = Math.ceil(filteredPeriodData.length / periodItemsPerPage) || 1;
                              return (
                                <span
                                  key={p}
                                  onClick={() => handlePeriodPageChange(p)}
                                  className={`w-7 h-7 flex items-center justify-center rounded-[8px] cursor-pointer transition-colors ${
                                    periodCurrentPage === p
                                      ? "bg-[#002B36] text-white"
                                      : "hover:bg-gray-100 text-[#1C1C1C]"
                                  }`}
                                >
                                  {p}
                                </span>
                              );
                            })}
                          </div>

                          <div
                            onClick={() => handlePeriodPageChange(periodCurrentPage + 1)}
                            className={`cursor-pointer ${periodCurrentPage === Math.ceil(filteredPeriodData.length / periodItemsPerPage) || filteredPeriodData.length === 0 ? "opacity-30 pointer-events-none" : ""}`}
                          >
                            <button
                              disabled={periodCurrentPage === Math.ceil(filteredPeriodData.length / periodItemsPerPage) || filteredPeriodData.length === 0}
                              style={{
                                border: "none",
                                background: "transparent",
                                color: "#9CA3AF",
                                display: "flex",
                                alignItems: "center",
                                cursor: periodCurrentPage === Math.ceil(filteredPeriodData.length / periodItemsPerPage) || filteredPeriodData.length === 0 ? "not-allowed" : "pointer",
                                opacity: periodCurrentPage === Math.ceil(filteredPeriodData.length / periodItemsPerPage) || filteredPeriodData.length === 0 ? 0.5 : 1,
                                padding: "4px 8px",
                              }}
                            >
                              Next <MdKeyboardArrowRight size={25} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 🟢 RESET & SAVE BUTTONS - BOTTOM */}
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={handlePeriodReset}
                          className="px-6 py-2 border border-[#9C9C9C] text-[#9C9C9C] rounded-[6px] text-[14px] font-normal hover:bg-gray-100 transition-colors"
                        >
                          Reset
                        </button>
                        <button
                          onClick={handlePeriodSave}
                          className="px-6 py-2 bg-[#0B3142] text-white rounded-[6px] text-[14px] font-semibold hover:bg-[#1a4a5e] transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>

    </>
  );
}

export default StudentAttendance