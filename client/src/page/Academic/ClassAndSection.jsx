import React, { useEffect, useRef, useState } from "react";
import "../../CSS/Style.css";
import "../../CSS/Room.css";
import styled from "styled-components";
import PaginationAll from "../../components/PaginationAll";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/axiosInstance";
import { toast } from "react-toastify";
{
  /* <----------------------------------------------- GIF ----------------------------------------------------> */
}
import TotalRooms from "../../assets/images/classroom-lesson.gif";
import OccupiedRooms from "../../assets/images/books.gif";
import AvailableRooms from "../../assets/images/calender.gif";
import TotalCapacity from "../../assets/images/speedmeter.gif";

{
  /* <---------------------------------------------- icon -----------------------------------------------------> */
}
import viewMessage from "../../assets/images/viewmessage.png";

import deleteIcon from "../../assets/images/delete-2.png";
import { FiEdit, FiPlus, FiUpload } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { MdOutlineRemoveRedEye, MdVerified } from "react-icons/md";

/* <----------------------------------------------- img -------------------------------------------------------> */
import everdeen from "../../assets/images/katnis.jpg";
import meave from "../../assets/images/meave.jpg";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { LuFileInput } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import profile from "../../assets/images/building.png";
import { FaRegEdit } from "react-icons/fa";
import nodata_foundIcon from "../../assets/images/absence.png";
import DeletePopup from "../../components/DeletePopup";
import cross_icon from "../../assets/images/cross.svg";
import { HiSearch, HiOutlineExclamationCircle } from 'react-icons/hi';
const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  }
 
`;

const Range = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 10px;
  outline: none;
  appearance: none;
  -webkit-appearance: none;

  /* 🎨 Dynamic gradient fill */
  background: ${({ value }) =>
    `linear-gradient(
    to right,
    #0B3142 0%,
    #1C7DA8 ${value}%,
    #e5e7eb ${value}%,
    #e5e7eb 100%
  )`};

  /* ❌ Hide thumb completely */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    display: none;
  }

  &::-moz-range-thumb {
    display: none;
  }

  &::-ms-thumb {
    display: none;
  }
`;

const cardData = [
  {
    des: "Total Classes",
    number: "50",
    text: "Students enrolled",
    left: "145",
    gif: TotalRooms,
  },

  {
    des: "Total Subjects",
    number: "30",
    text: "Active curriculum",
    gif: OccupiedRooms,
  },
  {
    des: "Attendance Rate",
    number: "94%",
    text: "from the last month",
    left: "+2.1%",
    gif: AvailableRooms,
  },
  {
    des: "Overall Performance",
    number: "97.5%",
    text: "Performance of overall classes",
    gif: TotalCapacity,
  },
];

/* <--------------------------------------------------- student Dummy Data --------------------------------------------> */

const roomData = [
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
  {
    class: "Nursery-A",
    subject: "8",
    teacher: "6",
    room: "Room 101",
    capacitytotal: 30,
    capacityexisting: 20,
    classteacher: "Ananya Patel",
    classEMPID: "EMP12345",
    status: "Available",
    img: everdeen,
  },
];
const teacherData = [
  {
    name: "Priya Kumari",
    role: "Math Teacher",
    isverified: false,
    img: everdeen,
  },
];

const ClassAndSection = () => {
  const [showAddClass, setshowAddClass] = useState(false);
  const [showEditClass, setshowEditClass] = useState(false);
  const [viewClassDetails, setviewClassDetails] = useState(false);
  const [openAdd, setopenAdd] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [value, setValue] = useState(70);
  const navigate = useNavigate();
  const addRef = useRef(null);
  const [deleteModel, setdeleteModel] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
const [showClassDropdown, setShowClassDropdown] = useState(false);
const [showSectionDropdown, setShowSectionDropdown] = useState(false);
const [showStatusDropdown, setShowStatusDropdown] = useState(false);
const [showRoomDropdown, setShowRoomDropdown] = useState(false);
const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);
const [showStreamDropdown, setShowStreamDropdown] = useState(false);

 const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    stream: "General",
    room: "",
    teacher: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createClassMutation = useMutation({
    mutationFn: async (data) => {
      return await api.post("/classes/create", data);
    },
    onSuccess: () => {
      toast.success("Class created successfully");
      queryClient.invalidateQueries(["classes"]);
      setshowAddClass(false);

      // reset form
      setFormData({
        className: "",
        section: "",
        stream: "General",
        room: "",
        teacher: "",
      });
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || "Failed to create class";

      toast.error(msg);
    },
  });
 const handleclickBulkImport = () => {
    navigate("/bulk-import-room");
  };

  const queryClient = useQueryClient();
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await api.get("/classes");
      return res.data.data;
    },
    onError: () => {
      toast.error("Failed to fetch classes");
    },
  });

  // staff

  const { data, isError, error } = useQuery({
    queryKey: ["all-staff"],

    queryFn: async () => {
      const res = await api.get("/staff/all-staff", {});

      return res.data;
    },
  });

  const staffList = data?.data || [];

  const teachers = staffList.filter(
    (staff) => staff?.employmentInfo?.role?.toLowerCase() === "teacher",
  );
  ///////////////////////////////////////

  const deleteClassMutation = useMutation({
    mutationFn: async (id) => {
      return await api.delete(`/classes/${id}`);
    },
    onSuccess: () => {
      toast.success("Class deleted");
      queryClient.invalidateQueries(["classes"]);
    },
    onError: () => {
      toast.error("Delete failed");
    },
  });
  const updateClassMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      return await api.put(`/classes/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Class updated successfully");
      queryClient.invalidateQueries(["classes"]);
      setshowEditClass(false);
    },
    onError: () => {
      toast.error("Update failed");
    },
  });

  const { data: rooms = [] } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await api.get("/rooms");
      return res.data.data;
    },
  });

  const handleSubmit = () => {
    if (!formData.className || !formData.section || !formData.room) {
      toast.error("Please fill required fields");
      return;
    }

    createClassMutation.mutate(formData);
  };
  const handleUpdate = () => {
    if (!selectedClass?._id) return;

    updateClassMutation.mutate({
      id: selectedClass._id,
      data: formData,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (addRef.current && !addRef.current.contains(e.target)) {
        setopenAdd(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter
  // ✅ define here (TOP LEVEL inside component)
  const uniqueClasses = [...new Set(classes.map((c) => c.className))];
  const uniqueSections = [...new Set(classes.map((c) => c.section))];

  // ✅ filter
// Filter data - search across class, room, and teacher
const filteredClasses = classes.filter((item) => {
  // Safely get searchable values
  const fullClassName = `${item.className || ''}-${item.section || ''}`.toLowerCase();
  const roomName = (item.room?.roomName || '').toLowerCase();
  const teacherName = (item.teacher?.personalInfo?.staffName || '').toLowerCase();
  const teacherId = (item.teacher?.staffId || '').toLowerCase();
  
  const searchLower = (searchTerm || '').toLowerCase();
  
  // Check if search term matches any field
  let matchesSearch = true;
  if (searchTerm && searchTerm.trim() !== '') {
    matchesSearch = 
      fullClassName.includes(searchLower) ||
      roomName.includes(searchLower) ||
      teacherName.includes(searchLower) ||
      teacherId.includes(searchLower);
  }
  
  // Apply filters - FIX STATUS FILTER HERE
  const matchesClass = !classFilter || classFilter === "All" || item.className === classFilter;
  const matchesSection = !sectionFilter || sectionFilter === "All" || item.section === sectionFilter;
  
  // Fix: Check statusFilter against item.status
  // If statusFilter is empty or "All" or "Status", show all
  // Otherwise filter by the selected status
 // If you want to filter by availability based on room capacity
const matchesStatus = (statusFilter === "Available" && item.room?.capacity > 0) ||
                      (statusFilter === "Full" && item.room?.capacity === 0) ||
                      (!statusFilter || statusFilter === "All" || statusFilter === "Status");
  
  return matchesSearch && matchesClass && matchesSection && matchesStatus;
});
  // ✅ THEN pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClasses.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ fontFamily: "Segoe UI" }}>
      {/* <--------------------------------------- Card -----------------------------------> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3">
        {cardData.map((item, index) => (
          <div key={index} className="box-shadow bg-white rounded-xl p-4">
            <div className="flex items-center justify-between ">
              {/* LEFT CONTENT */}
              <div className="flex flex-col justify-center">
                <p className="font-normal text-[12px] md:text-[14px] lg:text-[16px] text-[#1C1C1C]">
                  {item.des}
                </p>

                <span className="font-bold text-[20px] md:text-[24px] lg:text-[28px] text-[#1c1c1c] mt-5 leading-none">
                  {item.number}
                </span>

                <p className="mt-3 flex items-center gap-2 text-[10px] md:text-[12px] lg:text-[14px] font-semibold ">
                  <span className="text-[#009638]">{item.left}</span>{" "}
                  <span className="text-[#696969]">{item.text}</span>
                </p>
              </div>

              {/* RIGHT ICON / GIF */}
              <div className="flex items-center justify-center w-16 h-16">
                <img
                  src={item.gif}
                  alt="student"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="box-shadow mt-6 bg-white rounded-2xl"
        style={{
          padding: "16px",
          gap: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
          {/* LEFT CONTENT */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              className="text-[14px] md:text-[16px] lg:text-[18px]"
              style={{ color: "#1C1C1C", fontWeight: "600" }}
            >
              Class Management
            </label>
            <label
              className="text-[12px] md:text-[14px] lg:text-[16px]"
              style={{ color: "#9C9C9C", fontWeight: "400", fontSize: "14px" }}
            >
              Manage class section, teachers, and student assignments
            </label>
          </div>

          {/* RIGHT BUTTONS */}
          {/* <div className="flex flex-col sm:flex-row gap-3">
          

            <div ref={addRef} className="relative">
  <button
    onClick={() => setopenAdd((prev) => !prev)}
    className="inline-flex items-center gap-2 px-9 py-2 cursor-pointer
    bg-[#0B3142] text-white border border-[#0B3142] rounded-lg"
  >
    <AiOutlinePlus />
    Add
  </button>

  {openAdd && (
    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#e6e6e6] z-50">
      <ul className="py-1 text-sm text-gray-700">
        <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setshowAddClass(true)}>
          <FiPlus /> Add Class
        </li>
        <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/create-section')}>
          <FiPlus /> Add Section
        </li>
        <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/create-stream')}>
          <FiPlus /> Add Stream
        </li>

        

        <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <FiUpload /> Bulk Import
        </li>
      </ul>
    </div>
  )}
</div>
           </div> */}
          <div
            className="text-[12px] md:text-[14px] lg:text-[16px]"
            style={{ display: "flex", gap: "10px" }}
          >
            <button
                onClick={handleclickBulkImport}
              // onClick={handleclickBulkImport}
              // onClick={setAddRoomAction}
              // onClick={() => setAddRoomAction((prev) => !prev)}

              style={{
                // backgroundColor: "#0B3142",
                color: "#9C9C9C",
                padding: "12px 24px",
                borderRadius: "8px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // width: "100%",
                gap: "3px",
                border: "1px solid #9C9C9C",
              }}
            >
              <LuFileInput /> Bulk Import
            </button>
            <button
              // onClick={() => {
              //   setshowAddRoom(true);
              // }}
              onClick={() => setshowAddClass(true)}
              style={{
                backgroundColor: "#0B3142",
                color: "#FFFFFF",
                padding: "12px 24px",
                borderRadius: "8px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap:"4px"
                // width: "100%",
              }}
            >
                 <AiOutlinePlus className="text-white " /> Add Class
            </button>
          </div>
        </div>

        {/* <-------------------------------------- search & filter ------------------------------> */}

        
    
          {/* Select filter Button */}
          {/* <div
            className="sms-filter-more-btn"
            style={{
              display: "flex",
              alignItems: "center",

              cursor: "pointer",
              gap: "10px",
              fontSize: "14px",
              // flexWrap:"wrap"
            }}
          >
            <div
              className="text-[10px] md:text-[12px] lg:text-[14px]"
              style={{
                display: "inline-block",
                position: "relative",
                backgroundColor: "#EFF2F2",
                borderRadius: "6px",
                width: "124px",
              }}
            >
              <Select
                value={classFilter}
                onChange={(e) => {
                  setClassFilter(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  // maxWidth: "124px",
                  width: "100%",
                  outline: "none",
                  color: "#1C1C1C",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  paddingLeft: "12px",
                  paddingRight: "8px",
                }}
              >
                <option value="" hidden>
                  Class
                </option>
                <option value="All">All</option>

                {uniqueClasses.map((cls, index) => (
                  <option key={index} value={cls}>
                    {cls}
                  </option>
                ))}
              </Select>
           

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
              className="text-[10px] md:text-[12px] lg:text-[14px]"
              style={{
                display: "inline-block",
                position: "relative",
                backgroundColor: "#EFF2F2",
                borderRadius: "6px",
                width: "124px",
              }}
            >
              <Select
                // value={statusFilter}
                // onChange={(e) => {
                //   setStatusFilter(e.target.value);
                //   setCurrentPage(1);
                // }}
                value={sectionFilter}
                onChange={(e) => {
                  setSectionFilter(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: "100%",
                  // maxWidth:"124px",
                  outline: "none",
                  color: "#1C1C1C",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  paddingLeft: "12px",
                  paddingRight: "8px",
                }}
              >
                <option value="" hidden>
                  Section
                </option>
                <option value="All">All</option>
                {uniqueSections.map((sec, index) => (
                  <option key={index} value={sec}>
                    {sec}
                  </option>
                ))}
              </Select>
           

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
              className="text-[10px] md:text-[12px] lg:text-[14px]"
              style={{
                display: "inline-block",
                position: "relative",
                backgroundColor: "#EFF2F2",
                borderRadius: "6px",
                width: "124px",
              }}
            >
              <Select
                // value={statusFilter}
                // onChange={(e) => {
                //   setStatusFilter(e.target.value);
                //   setCurrentPage(1);
                // }}
                style={{
                  width: "100%",
                  // maxWidth:"124px",
                  outline: "none",
                  color: "#1C1C1C",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  paddingLeft: "12px",
                  paddingRight: "8px",
                }}
              >
                <option value="Status" hidden>
                  Status
                </option>
                <option value="Status">All</option>
                <option value="Active">Available</option>
                <option value="Inactive">Full</option>
              </Select>
        

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
          </div> */}
<div className="flex flex-col md:flex-row gap-4 mb-6 px-0">   
              
                <div className="relative flex-1">
                        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
                        <input
    type="text"
    placeholder="Search by class, room, or teacher name..."
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    }}
                          className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-[9px] text-[14px]  focus:outline-none"
                        />
                      </div>

<div
  className="sms-filter-more-btn"
  style={{
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "10px",
    fontSize: "14px",
  }}
>
  {/* CLASS DROPDOWN */}
  <div className="relative inline-block">
    <button
      onClick={() => setShowClassDropdown(!showClassDropdown)}
      className="bg-[#EFF2F2] rounded-[6px] px-4 py-2.5 text-[12px] text-[#1C1C1C] min-w-[124px] cursor-pointer flex items-center justify-between"
    >
      <span>{classFilter === "All" ? "All" : classFilter || "Class"}</span>
      <svg
        className={`w-4 h-4 transition ${showClassDropdown ? "" : ""}`}
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
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E8E8] rounded-[6px] shadow-lg overflow-hidden">
        <button
          onClick={() => {
            setClassFilter("All");
            setShowClassDropdown(false);
            setCurrentPage(1);
          }}
          className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6]"
        >
          All
        </button>
        {uniqueClasses.map((cls) => (
          <button
            key={cls}
            onClick={() => {
              setClassFilter(cls);
              setShowClassDropdown(false);
              setCurrentPage(1);
            }}
            className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] ${
              classFilter === cls ? "text-[#1C1C1C] font-normal" : ""
            }`}
          >
            {cls}
          </button>
        ))}
      </div>
    )}
  </div>

  {/* SECTION DROPDOWN */}
  <div className="relative inline-block">
    <button
      onClick={() => setShowSectionDropdown(!showSectionDropdown)}
      className="bg-[#EFF2F2] rounded-[6px] px-4 py-2.5 text-[12px] text-[#1C1C1C] min-w-[124px] cursor-pointer flex items-center justify-between"
    >
      <span>{sectionFilter === "All" ? "All" : sectionFilter || "Section"}</span>
      <svg
        className={`w-4 h-4 transition ${showSectionDropdown ? "rotate-180" : ""}`}
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
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E8E8] rounded-[6px] shadow-lg overflow-hidden">
        <button
          onClick={() => {
            setSectionFilter("All");
            setShowSectionDropdown(false);
            setCurrentPage(1);
          }}
          className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6]"
        >
          All
        </button>
        {uniqueSections.map((sec) => (
          <button
            key={sec}
            onClick={() => {
              setSectionFilter(sec);
              setShowSectionDropdown(false);
              setCurrentPage(1);
            }}
            className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] ${
              sectionFilter === sec ? "text-[#1C1C1C] font-normal" : ""
            }`}
          >
            {sec}
          </button>
        ))}
      </div>
    )}
  </div>

  {/* STATUS DROPDOWN */}
  {/* STATUS DROPDOWN */}
<div className="relative inline-block">
  <button
    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
    className="bg-[#EFF2F2] rounded-[6px] px-4 py-2.5 text-[12px] text-[#1C1C1C] min-w-[124px] cursor-pointer flex items-center justify-between"
  >
    <span>
      {statusFilter === "All" ? "All" : statusFilter || "Status"}
    </span>
    <svg
      className={`w-4 h-4 transition ${showStatusDropdown ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {showStatusDropdown && (
    <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E8E8] rounded-[6px] shadow-lg overflow-hidden">
      <button
        onClick={() => {
          setStatusFilter("All");
          setShowStatusDropdown(false);
          setCurrentPage(1);
        }}
        className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6]"
      >
        All
      </button>
      <button
        onClick={() => {
          setStatusFilter("Available");
          setShowStatusDropdown(false);
          setCurrentPage(1);
        }}
        className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] ${
          statusFilter === "Available" ? "text-[#1C1C1C] font-normal" : ""
        }`}
      >
        Available
      </button>
      <button
        onClick={() => {
          setStatusFilter("Full");
          setShowStatusDropdown(false);
          setCurrentPage(1);
        }}
        className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] ${
          statusFilter === "Full" ? "text-[#1C1C1C] font-normal" : ""
        }`}
      >
        Full
      </button>
    </div>
  )}
</div>
</div>





        </div>












        {/* <------------------------------------------ Table ---------------------------------------> */}
        <div
          style={{
            border: "1px solid #EEEEEE",
            borderRadius: "8px",
            width: "100%",
            overflow: "auto",
          }}
        >
          <table style={{ width: "100%" }}>
            <thead
              className="text-[10px] md:text-[12px] lg:text-[14px]"
              style={{ borderBottom: "1px solid #EEEEEE" }}
            >
              <tr style={{ textAlign: "left" }}>
                <td
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",

                    fontWeight: "600",
                  }}
                >
                  Class
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",

                    fontWeight: "600",
                  }}
                >
                  Room
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",

                    fontWeight: "600",
                  }}
                >
                  Capacity
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",

                    fontWeight: "600",
                  }}
                >
                  Assign Teacher
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",

                    fontWeight: "600",
                  }}
                >
                  Status
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",

                    fontWeight: "600",
                  }}
                >
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.length === 0 ? (
                <tr>
                  <td
                    className="text-[10px] md:text-[12px] lg:text-[14px]"
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        style={{ width: "5%" }}
                        src={nodata_foundIcon}
                        alt="nodata"
                      />
                      {/* 👇 Dynamic message */}
                      <span style={{ color: "#9C9C9C", fontWeight: "500" }}>
                        {searchTerm ||
                        classFilter ||
                        sectionFilter ||
                        statusFilter
                          ? "No related search data found"
                          : "No class found"}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr
                    key={item._id}
                    onMouseEnter={() => setHoverIndex(item)}
                    onMouseLeave={() => setHoverIndex(null)}
                    style={{
                      // textAlign: "left",
                      borderBottom: "1px solid #EEEEEE",
                      fontSize: "14px",
                      backgroundColor:
                        hoverIndex === item ? "#F5F7F9" : "transparent",
                    }}
                  >
                    <td
                      className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "4px 15px",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "#12516E", fontWeight: "600" }}>
                          {/* {item.roomName} */}
                          {item.className}-{item.section}
                        </span>
                        <span style={{ color: "#9C9C9C" }}>
                          {/* {item.area} */}8 Subject
                        </span>
                      </span>
                    </td>
                    <td
                      className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "4px 15px",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ color: "#1C1C1C", fontWeight: "600" }}>
                        {item.room?.roomName}
                      </span>
                    </td>
                    <td
                      className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "4px 15px",
                        textAlign: "left",
                      }}
                    >
                      <span>
                        <p style={{ fontSize: "10px", margin: "0" }}>
                          30/{item.room?.capacity}
                        </p>
                        <Range
                          type="range"
                          min="0"
                          max="100"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                        <p style={{ fontSize: "10px", margin: "0" }}>90%</p>
                      </span>
                    </td>
                    <td
                      className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "4px 15px",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            backgroundColor: "#f6f9fb",
                            borderRadius: "50%",
                            height: "40px",
                            width: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img src={profile} alt="buildingIcon" />
                        </span>
                        <span
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span style={{ color: "#12516E", fontWeight: "600" }}>
                          {item.teacher?.personalInfo?.staffName || "Not Assigned"}
                          </span>
                          <span style={{ color: "#9C9C9C" }}>
                              {item.teacher?.staffId || "-"}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td
                      className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "4px 15px",
                        fontWeight: "400",
                      }}
                    >
                      <span
                        style={{
                          background: "#E3F2FD",
                          color: "#1565C0",
                          // background:
                          //   item.status === "Active" ? "#E6F4EA" : "#EEEEEE",
                          // color:
                          //   item.status === "Active" ? "#1E8E3E" : "#9C9C9C",
                          padding: "2px 5px",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          justifyContent: "center",
                          maxWidth: "100px",
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            background: "#1565C0",
                            // background:
                            //   item.status === "Active" ? "#1E8E3E" : "#9C9C9C",
                            borderRadius: "50%",
                          }}
                        ></span>
                        {/* {item.status} */}
                        Available
                      </span>
                    </td>
                    <td
                      className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "10px 20px 10px 20px",
                        color: "#1C1C1C",

                        fontWeight: "400",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <MdOutlineRemoveRedEye
                          onClick={() => setviewClassDetails(true)}
                          // onClick={setViewRoom}
                          // onClick={() => setViewRoom(item)}
                          style={{ color: "#9C9C9C", fontSize: "20px" }}
                        />
                        

<button onClick={() => {
                            setSelectedClass(item); // ✅ store clicked row
                            setFormData({
                              className: item.className,
                              section: item.section,
                              stream: item.stream || "General",
                              room: item.room?._id || "",
                              teacher: item.teacher?._id || "",
                            });
                            setshowEditClass(true);
                          }}
                      
                      className="transition cursor-pointer text-[#9C9C9C] hover:text-[#1C1C1C]"
                      title="View Notice"
                    >
                      
                       <img
                          src={viewMessage}
                          alt="viewmessage"
                         
                          className="h-6 w-6 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                        />
                      {/* <FiExternalLink size={20} strokeWidth={2.5} /> */}
                    </button>








                          <button     onClick={() => {
                            setSelectedClass(item); // store clicked row
                            setdeleteModel(true); // open modal
                          }}
                                              className="transition cursor-pointer"
                                              title="Delete Notice"
                                            >
                                         
                                               <img
                                                  src={deleteIcon}
                                                  alt="delete"
                                                 
                                                  className="h-5.5 w-5.5 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                                                />
                                            </button>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* <------------------------------------------- pagination  All---------------------------------> */}
        <PaginationAll
          totalItems={filteredClasses.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
      {showAddClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setshowAddClass(false)}
        >
          <div
            style={{ height: "100%", maxHeight: "470px" }}
            className="bg-white max-w-3xl w-full rounded-2xl shadow-lg flex flex-col max-h-156 overflow-auto p-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrollable Content */}
            <div className=" mt-0 ">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    htmlFor=""
                    style={{ color: "#1C1C1C", fontWeight: "600" }}
                  >
                    {/* Add New Room */}
                    Add New Class
                  </label>
                  <label
                    htmlFor=""
                    style={{
                      color: "#9C9C9C",
                      fontWeight: "400",
                      fontSize: "14px",
                    }}
                  >
                    Create a new class section with teacher assignment
                  </label>
                </div>

                <RxCross2
                  onClick={() => setshowAddClass(false)}
                  style={{
                    cursor: "pointer",
                    color: "#1F1F1F",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div>
                  <label className="text-sm font-semibold">Class Name</label>
                  <input
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    placeholder="Nursery"
                    className="w-full mt-1 px-3 py-2 border rounded-lg border-[#E6E6E6] outline-none"
                  />
                </div>

               



<div>
  <label className="text-sm font-semibold">Section</label>
  
  <div className="relative w-full mt-1">
    <button
      type="button"
      onClick={() => setShowSectionDropdown(!showSectionDropdown)}
      className="w-full bg-white border border-[#E6E6E6] rounded-lg px-3 py-2 text-left flex items-center justify-between ] transition-colors  outline-none"
    >
      <span className={`text-sm ${formData.section ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}>
        {formData.section || "Select Section"}
      </span>
      <svg
        className={`w-3.5 h-3.5 transition-transform duration-200 ${showSectionDropdown ? "rotate-180" : ""}`}
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
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-lg shadow-lg overflow-hidden">
        {["A", "B", "C"].map((section) => (
          <button
            key={section}
            type="button"
            onClick={() => {
              const event = { target: { name: "section", value: section } };
              handleChange(event);
              setShowSectionDropdown(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-[#F5F7F7] transition-colors ${
              formData.section === section ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
            }`}
          >
            {section}
          </button>
        ))}
      </div>
    )}
  </div>
</div>




<div>
  <label className="text-sm font-semibold">Stream</label>
  
  <div className="relative w-full mt-1">
    <button
      type="button"
      onClick={() => setShowStreamDropdown(!showStreamDropdown)}
      className="w-full bg-white border border-[#E6E6E6] rounded-lg px-3 py-2 text-left flex items-center justify-between transition-colors  outline-none"
    >
      <span className={`text-sm ${formData.stream ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}>
        {formData.stream || "Select Stream"}
      </span>
      <svg
        className={`w-3.5 h-3.5 transition-transform duration-200 ${showStreamDropdown ? "" : ""}`}
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

    {showStreamDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-lg shadow-lg overflow-hidden">
        {["General", "Science", "Maths"].map((stream) => (
          <button
            key={stream}
            type="button"
            onClick={() => {
              const event = { target: { name: "stream", value: stream } };
              handleChange(event);
              setShowStreamDropdown(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-[#F5F7F7] transition-colors ${
              formData.stream === stream ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
            }`}
          >
            {stream}
          </button>
        ))}
      </div>
    )}
  </div>
</div>














              </div>

             <div className="md:grid-cols-2 gap-4 mt-4">
  <label className="text-sm font-semibold">Room Name</label>

  <div className="relative w-full mt-1">
    <button
      type="button"
      onClick={() => setShowRoomDropdown(!showRoomDropdown)}
      className="w-full bg-white border border-[#E6E6E6] rounded-lg px-3 py-2 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors outline-none"
    >
      <span className={`text-sm ${formData.room ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}>
        {formData.room ? rooms.find(r => r._id === formData.room)?.roomName || "Select Room" : "Select Room"}
      </span>
      <svg
        className={`w-3.5 h-3.5 transition-transform duration-200 ${showRoomDropdown ? "rotate-180" : ""}`}
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

    {showRoomDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-lg shadow-lg max-h-60 overflow-y-auto">
        <button
          type="button"
          onClick={() => {
            const event = { target: { name: "room", value: "" } };
            handleChange(event);
            setShowRoomDropdown(false);
          }}
          className="w-full text-left px-3 py-2 text-sm hover:bg-[#F5F7F7] transition-colors text-[#9C9C9C]"
        >
          Select Room
        </button>
        {rooms.map((r) => (
          <button
            key={r._id}
            type="button"
            onClick={() => {
              const event = { target: { name: "room", value: r._id } };
              handleChange(event);
              setShowRoomDropdown(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-[#F5F7F7] transition-colors ${
              formData.room === r._id ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
            }`}
          >
            {r.roomName}
          </button>
        ))}
      </div>
    )}
  </div>
</div>

              <div className="md:grid-cols-2 gap-4 mt-4">
  <label className="text-sm font-semibold">Assign Teacher</label>

  <div className="relative w-full mt-1">
    <button
      type="button"
      onClick={() => setShowTeacherDropdown(!showTeacherDropdown)}
      className="w-full bg-white border border-[#E6E6E6] rounded-lg px-3 py-2 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors outline-none"
    >
      <span className={`text-sm ${formData.teacher ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}>
        {formData.teacher 
          ? teachers.find(t => t._id === formData.teacher)?.personalInfo?.staffName || "Select Teacher"
          : "Select Teacher"}
      </span>
      <svg
        className={`w-3.5 h-3.5 transition-transform duration-200 ${showTeacherDropdown ? "rotate-180" : ""}`}
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

    {showTeacherDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-lg shadow-lg max-h-60 overflow-y-auto">
        <button
          type="button"
          onClick={() => {
            const event = { target: { name: "teacher", value: "" } };
            handleChange(event);
            setShowTeacherDropdown(false);
          }}
          className="w-full text-left px-3 py-2 text-sm hover:bg-[#F5F7F7] transition-colors text-[#9C9C9C]"
        >
          Select Teacher
        </button>
        {teachers.map((teacher) => (
          <button
            key={teacher._id}
            type="button"
            onClick={() => {
              const event = { target: { name: "teacher", value: teacher._id } };
              handleChange(event);
              setShowTeacherDropdown(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-[#F5F7F7] transition-colors ${
              formData.teacher === teacher._id ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
            }`}
          >
            {teacher.personalInfo?.staffName} ({teacher.staffId})
          </button>
        ))}
      </div>
    )}
  </div>
</div>
            </div>

            {/* Footer (Fixed) */}
            <div className="flex justify-end gap-3 pt-6">
              <button
                onClick={() => setshowAddClass(false)}
                className="px-4 py-2 border rounded-lg text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#0B3142] text-white rounded-lg"
              >
                Create Class
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setshowEditClass(false)}
        >
          <div
            className="bg-white max-w-3xl w-full rounded-2xl shadow-lg flex flex-col max-h-156"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrollable Content */}
            <div className="p-4 overflow-y-auto  mt-0 ">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Edit Class
                  </h2>
                  <p className="text-sm text-[#9C9C9C]">
                    Update the class information
                  </p>
                </div>

                <button
                  onClick={() => setshowEditClass(false)}
                  className="text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div>
                  <label className="text-sm font-semibold">Class Name</label>
                  <input
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    placeholder="Nursery"
                    className="w-full mt-1 px-3 py-2 border rounded-lg border-[#E6E6E6] outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Section</label>
                  <input
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    placeholder="A"
                    className="w-full mt-1 px-3 py-2 border rounded-lg border-[#E6E6E6] outline-none"
                  />
                </div>

               <div>
  <label className="text-sm font-semibold">Stream</label>
  
  <div className="relative w-full mt-1">
    <button
      type="button"
      onClick={() => setShowStreamDropdown(!showStreamDropdown)}
      className="w-full bg-white border border-[#E6E6E6] rounded-lg px-3 py-2 text-left flex items-center justify-between  transition-colors"
      style={{ outline: "none" }}
    >
      <span className={`text-sm ${formData.stream ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}>
        {formData.stream || "Select Stream"}
      </span>
      <svg
        className={`w-3.5 h-3.5 transition-transform duration-200 ${showStreamDropdown ? "rotate-180" : ""}`}
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

    {showStreamDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-lg shadow-lg overflow-hidden">
        {["General", "Science", "Maths"].map((stream) => (
          <button
            key={stream}
            type="button"
            onClick={() => {
              const event = { target: { name: "stream", value: stream } };
              handleChange(event);
              setShowStreamDropdown(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-[#F5F7F7] transition-colors ${
              formData.stream === stream ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
            }`}
          >
            {stream}
          </button>
        ))}
      </div>
    )}
  </div>
</div>
              </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  <div>
    <label className="text-sm font-semibold">Room Name</label>
    
    <div className="relative w-full mt-1">
      <button
        type="button"
        onClick={() => setShowRoomDropdown(!showRoomDropdown)}
        className="w-full bg-white border border-[#E6E6E6] rounded-lg px-3 py-2 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors outline-none"
      >
        <span className={`text-sm ${formData.room ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}>
          {formData.room ? rooms.find(r => r._id === formData.room)?.roomName || "Select Room" : "Select Room"}
        </span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${showRoomDropdown ? "rotate-180" : ""}`}
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

      {showRoomDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <button
            type="button"
            onClick={() => {
              const event = { target: { name: "room", value: "" } };
              handleChange(event);
              setShowRoomDropdown(false);
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-[#F5F7F7] transition-colors text-[#9C9C9C]"
          >
            Select Room
          </button>
          {rooms.map((r) => (
            <button
              key={r._id}
              type="button"
              onClick={() => {
                const event = { target: { name: "room", value: r._id } };
                handleChange(event);
                setShowRoomDropdown(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-[#F5F7F7] transition-colors ${
                formData.room === r._id ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
              }`}
            >
              {r.roomName}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>

  {/* Capacity Field - Keep as is */}
  <div>
    <label className="text-sm font-semibold">
      Capacity (Automatic Fetch from Room selection)
    </label>
    <input
      type="text"
      placeholder="30"
      className="w-full mt-1 px-3 py-2 border rounded-lg border-[#E6E6E6] outline-none"
    />
  </div>
</div>
             <div className="md:grid-cols-2 gap-4 mt-4">
  <label className="text-sm font-semibold">Assign Teacher</label>

  <div className="relative w-full mt-1">
    <button
      type="button"
      onClick={() => setShowTeacherDropdown(!showTeacherDropdown)}
      className="w-full bg-white border border-[#E6E6E6] rounded-lg px-3 py-2 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors outline-none"
    >
      <span className={`text-sm ${formData.teacher ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}>
        {formData.teacher 
          ? teachers.find(t => t._id === formData.teacher)?.personalInfo?.staffName || "Select Teacher"
          : "Select Teacher"}
      </span>
      <svg
        className={`w-3.5 h-3.5 transition-transform duration-200 ${showTeacherDropdown ? "rotate-180" : ""}`}
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

    {showTeacherDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-lg shadow-lg max-h-60 overflow-y-auto">
        <button
          type="button"
          onClick={() => {
            const event = { target: { name: "teacher", value: "" } };
            handleChange(event);
            setShowTeacherDropdown(false);
          }}
          className="w-full text-left px-3 py-2 text-sm hover:bg-[#F5F7F7] transition-colors text-[#9C9C9C]"
        >
          Select Teacher
        </button>
        {teachers.map((teacher) => (
          <button
            key={teacher._id}
            type="button"
            onClick={() => {
              const event = { target: { name: "teacher", value: teacher._id } };
              handleChange(event);
              setShowTeacherDropdown(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-[#F5F7F7] transition-colors ${
              formData.teacher === teacher._id ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
            }`}
          >
            {teacher.personalInfo?.staffName} ({teacher.staffId})
          </button>
        ))}
      </div>
    )}
  </div>
</div>
            </div>

            {/* Footer (Fixed) */}
            <div className="flex justify-end gap-3 p-6 ">
              <button
                onClick={() => setshowEditClass(false)}
                className="px-4 py-2 border rounded-lg text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-[#0B3142] text-white rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {viewClassDetails && (
        <div
          style={{
            fontFamily: "Segoe UI",

            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
              maxWidth: "836px",
              height: "570px",
              //  maxHeight: "624px",
              //  overflow: "auto",
            }}
          >
            {/* Header Cross-btn */}
            <div
              style={{
                background: "linear-gradient(90deg, #B993D6 0%, #8CA6DB 100%)",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                padding: "24px",
              }}
            >
              <label
                htmlFor=""
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* {data?.roomName} */}
                Room503
                <span
                  style={{
                    background: "#E6F4EA",
                    color: "#1E8E3E",

                    padding: "2px 5px",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    justifyContent: "center",
                    maxWidth: "100px",
                    fontSize: "14px",
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
                  {/* {data?.status} */}
                  Active
                </span>
              </label>
              <img
                //  onClick={onClose}
                onClick={() => setviewClassDetails(false)}
                src={cross_icon}
                alt="cross_icon"
              />
            </div>
            {/* CLASS INFORMATION */}
            <div className="border border-[#E6E6E6] rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-3">Class Information</h3>

              <div className="grid grid-cols-4 gap-6 text-sm">
                <div>
                  <p className="text-gray-500">Room</p>
                  <p className="font-semibold">Room 101</p>
                </div>
                <div>
                  <p className="text-gray-500">Capacity</p>
                  <p className="font-semibold">31</p>
                </div>
                <div>
                  <p className="text-gray-500">Occupied</p>
                  <p className="font-semibold">29</p>
                </div>
                <div>
                  <p className="text-gray-500">Available</p>
                  <p className="font-semibold">2</p>
                </div>
              </div>
            </div>

            {/* Assign TEACHERS */}
            <div className="">
              <h3 className="font-semibold text-sm mb-3">Assign Teacher</h3>

              <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {teacherData.map((item, index) => (
                  <div
                    key={index}
                    className="border border-[#E6E6E6] rounded-lg p-3 flex items-center gap-3"
                  >
                    {/* <div  /> */}
                    <img
                      src={item.img}
                      alt=""
                      className="w-10 h-10 rounded-full "
                    />
                    <div>
                      <span className="flex gap-2">
                        <p className="font-semibold text-sm">{item.name} </p>{" "}
                        {item.isverified && (
                          <MdVerified className="mt-0.5 text-[#007AFF]" />
                        )}
                      </span>
                      <p className="text-xs text-gray-500">{item.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUBJECTS */}
            <div className="">
              <h3 className="font-semibold text-sm ">Subject</h3>
              <p className="text-xs text-gray-500 mb-3">
                Assigned subject to class
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 w-45 py-3 h-12.5 font-semibold rounded-lg border-l-4 text-[#577590] border border-[#577590]">
                  Chemistry
                </span>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-end gap-3 p-6 ">
              <button
                onClick={() => setviewClassDetails(false)}
                className="px-4 py-2 border rounded-lg text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setshowEditClass(true);
                  setviewClassDetails(false);
                }}
                className="px-4 py-2 bg-[#0B3142] text-white rounded-lg"
              >
                Edit Room
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteModel && (
        <DeletePopup
          data={selectedClass}
          nameKey="className"
          title="Delete Class"
          Cancel={() => setdeleteModel(false)}
          onConfirm={() => {
            deleteClassMutation.mutate(selectedClass._id);
            setdeleteModel(false);
          }}
        />
      )}
    </div>
  );
};

export default ClassAndSection;
