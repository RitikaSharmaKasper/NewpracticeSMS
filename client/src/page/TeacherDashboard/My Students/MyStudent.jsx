import React, { useState, useEffect, useMemo, useRef } from "react";
import "../../../CSS/Style.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../config/axiosInstance";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { HiSearch, HiOutlineExclamationCircle } from 'react-icons/hi';
// GIFsimg
import student from "../../../assets/images/studentGif.gif";
import calender from "../../../assets/images/calender.gif";
import kalu from "../../../assets/images/kalu.gif";
import chair from "../../../assets/images/chair.gif";

// Icons
import { TbFileImport, TbFileExport } from "react-icons/tb";
import { GrUserAdd } from "react-icons/gr";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiArrowsDownUpThin } from "react-icons/pi";
import { FiEdit, FiSearch } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

// Images
import defaultAvatar from "../../../assets/images/katnis.jpg";
import Pagination from "../../../components/Pagination";

const statusStyle = {
  Active: "bg-[#D4EDDA] text-[#009638]",
  Inactive: "bg-[#DEDEDE] text-[#696969]",
  Alumni: "bg-[#FDEBD0] text-[#D35400]",
};

const MyStudent = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("All");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [classFilter, setClassFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");
  
  // Selected rows for export
  const [selectedRowIds, setSelectedRowIds] = useState(new Set());
  const [selectAllGlobal, setSelectAllGlobal] = useState(false);
  
  // Cache for selected rows
  const selectedRowsCacheRef = useRef(new Map());
  
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    inactiveStudents: 0,
    alumniStudents: 0,
  });
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch students from API
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users/students");
      const data = response.data;
      setStudents(data);
      
      // Calculate stats
      const total = data.length;
      const activeCount = data.filter(s => s.studentInfo?.accountInfo?.status === "Active" || s.account?.status === "Active").length;
      const inactiveCount = data.filter(s => s.studentInfo?.accountInfo?.status === "Inactive" || s.account?.status === "Inactive").length;
      const alumniCount = data.filter(s => s.studentInfo?.accountInfo?.status === "Alumni" || s.account?.status === "Alumni").length;
      
      setStats({
        totalStudents: total,
        activeStudents: activeCount,
        inactiveStudents: inactiveCount,
        alumniStudents: alumniCount,
      });
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error(error.response?.data?.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students based on search, status, class, section
  const filteredStudents = useMemo(() => {
    let filtered = [...students];
    
    // Status filter
    if (active !== "All") {
      filtered = filtered.filter((student) => {
        const studentStatus = student.studentInfo?.accountInfo?.status || student.account?.status;
        return studentStatus === active;
      });
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((student) => {
        const fullName = student.studentInfo?.personalInfo?.fullName || "";
        const admissionNumber = student.studentInfo?.admissionNumber || "";
        const studentId = student.studentInfo?.studentId || "";
        const currentClass = student.studentInfo?.academicInfo?.currentClass || "";
        const section = student.studentInfo?.academicInfo?.section || "";
        return fullName.toLowerCase().includes(searchLower) || 
               admissionNumber.toLowerCase().includes(searchLower) ||
               studentId.toLowerCase().includes(searchLower) ||
               currentClass.toLowerCase().includes(searchLower) ||
               section.toLowerCase().includes(searchLower);
      });
    }
    
    // Class filter - using classFilter
    if (classFilter && classFilter !== "All") {
      filtered = filtered.filter((student) => {
        const currentClass = student.studentInfo?.academicInfo?.currentClass;
        return currentClass === classFilter;
      });
    }
    
    // Section filter - using sectionFilter
    if (sectionFilter && sectionFilter !== "All") {
      filtered = filtered.filter((student) => {
        const section = student.studentInfo?.academicInfo?.section;
        return section === sectionFilter;
      });
    }
    
    return filtered;
  }, [students, active, searchTerm, classFilter, sectionFilter]);

  // Reset selections when filters change
  useEffect(() => {
    setSelectedRowIds(new Set());
    setSelectAllGlobal(false);
    selectedRowsCacheRef.current.clear();
  }, [active, searchTerm, classFilter, sectionFilter]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [active, searchTerm, classFilter, sectionFilter]);

  // Update selectAllGlobal when selection changes on current page
  const paginatedStudents = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredStudents, currentPage, itemsPerPage]);

  // Update cache with current page students
  useEffect(() => {
    paginatedStudents.forEach((student) => {
      if (student && student._id) {
        selectedRowsCacheRef.current.set(student._id, student);
      }
    });
  }, [paginatedStudents]);

  // Check if all items on current page are selected
  const allVisibleSelected = paginatedStudents.length > 0 && 
    paginatedStudents.every((student) => selectedRowIds.has(student._id));

  // Handle select all on current page
  const handleSelectAllCurrentPage = (checked) => {
    if (checked) {
      const currentPageIds = paginatedStudents.map(s => s._id);
      const newSelected = new Set(selectedRowIds);
      currentPageIds.forEach(id => newSelected.add(id));
      setSelectedRowIds(newSelected);
      setSelectAllGlobal(false);
    } else {
      const currentPageIds = paginatedStudents.map(s => s._id);
      const newSelected = new Set(selectedRowIds);
      currentPageIds.forEach(id => newSelected.delete(id));
      setSelectedRowIds(newSelected);
      setSelectAllGlobal(false);
    }
  };

  // Handle select all across all pages
  const handleSelectAllAcrossPages = async (checked) => {
    if (checked) {
      const allIds = filteredStudents.map(s => s._id);
      // Cache all students for export
      filteredStudents.forEach(student => {
        if (student && student._id) {
          selectedRowsCacheRef.current.set(student._id, student);
        }
      });
      setSelectedRowIds(new Set(allIds));
      setSelectAllGlobal(true);
    } else {
      setSelectedRowIds(new Set());
      setSelectAllGlobal(false);
    }
  };

  // Get rows to export (selected ones or all if selectAllGlobal)
  const getRowsToExport = () => {
    if (selectAllGlobal) {
      return filteredStudents;
    }
    return Array.from(selectedRowIds)
      .map(id => selectedRowsCacheRef.current.get(id))
      .filter(Boolean);
  };

  // Export to PDF
  const handleExportPDF = () => {
    const rowsToExport = getRowsToExport();
    
    if (rowsToExport.length === 0) {
      toast.error("Please select at least one student to export");
      return;
    }

    const doc = new jsPDF();
    doc.text("Students Report", 14, 15);

    const tableColumns = [
      "Student Name",
      "Student ID",
      "Class",
      "Section",
      "Parent/Guardian",
      "Mobile Number",
      "Status"
    ];

    const tableRows = rowsToExport.map(student => {
      const studentInfo = student.studentInfo;
      const account = student.account;
      const status = studentInfo?.accountInfo?.status || account?.status || "Active";
      
      return [
        studentInfo?.personalInfo?.fullName || "N/A",
        studentInfo?.studentId || "N/A",
        studentInfo?.academicInfo?.currentClass || "N/A",
        studentInfo?.academicInfo?.section || "N/A",
        studentInfo?.parentInfo?.father?.fullName || studentInfo?.parentInfo?.mother?.fullName || "N/A",
        account?.phone || studentInfo?.contactInfo?.primaryMobile || "N/A",
        status
      ];
    });

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 20,
      styles: {
        fontSize: 8,
      },
      headStyles: {
        fillColor: [155, 155, 155],
        textColor: "white",
      },
      theme: "striped",
    });

    const filename = `students-${rowsToExport.length}-${new Date().toISOString().split('T')[0]}`;
    doc.save(`${filename}.pdf`);

    toast.success(`Exported ${rowsToExport.length} student${rowsToExport.length !== 1 ? "s" : ""}`);
  };

  // Export to Excel
  const handleExportExcel = async () => {
    const rowsToExport = getRowsToExport();
    
    if (rowsToExport.length === 0) {
      toast.error("Please select at least one student to export");
      return;
    }

    try {
      const tableColumns = [
        "Student Name",
        "Student ID",
        "Class",
        "Section",
        "Parent/Guardian",
        "Mobile Number",
        "Email",
        "Date of Birth",
        "Gender",
        "Blood Group",
        "Address",
        "Status"
      ];

      const tableRows = rowsToExport.map(student => {
        const studentInfo = student.studentInfo;
        const account = student.account;
        const status = studentInfo?.accountInfo?.status || account?.status || "Active";
        
        return [
          studentInfo?.personalInfo?.fullName || "N/A",
          studentInfo?.studentId || "N/A",
          studentInfo?.academicInfo?.currentClass || "N/A",
          studentInfo?.academicInfo?.section || "N/A",
          studentInfo?.parentInfo?.father?.fullName || studentInfo?.parentInfo?.mother?.fullName || "N/A",
          account?.phone || studentInfo?.contactInfo?.primaryMobile || "N/A",
          account?.email || studentInfo?.contactInfo?.email || "N/A",
          studentInfo?.personalInfo?.dateOfBirth ? new Date(studentInfo.personalInfo.dateOfBirth).toLocaleDateString() : "N/A",
          studentInfo?.personalInfo?.gender || "N/A",
          studentInfo?.personalInfo?.bloodGroup || "N/A",
          studentInfo?.contactInfo?.address || "N/A",
          status
        ];
      });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Students");

      // Add header row with styling
      const headerRow = worksheet.addRow(tableColumns);
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "99c5ff" },
        };
        cell.border = {
          top: { style: "thin", color: { argb: "338bff" } },
          left: { style: "thin", color: { argb: "338bff" } },
          bottom: { style: "thin", color: { argb: "338bff" } },
          right: { style: "thin", color: { argb: "338bff" } },
        };
        cell.font = { bold: true };
      });

      // Set column widths
      const columnWidths = [25, 15, 12, 10, 25, 15, 25, 15, 12, 12, 30, 12];
      columnWidths.forEach((width, i) => {
        worksheet.getColumn(i + 1).width = width;
      });

      // Add data rows
      tableRows.forEach(row => worksheet.addRow(row));

      // Generate buffer and save
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(
        new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `students-${rowsToExport.length}-${new Date().toISOString().split('T')[0]}.xlsx`
      );
      
      toast.success(`Exported ${rowsToExport.length} student${rowsToExport.length !== 1 ? "s" : ""}`);
    } catch (err) {
      toast.error(err?.message || "Error exporting to Excel");
    }
  };

  // Get unique classes for filter
  const uniqueClasses = [...new Set(students.map(s => s.studentInfo?.academicInfo?.currentClass).filter(Boolean))];
  
  // Get unique sections for filter
  const uniqueSections = [...new Set(students.map(s => s.studentInfo?.academicInfo?.section).filter(Boolean))];

  // Delete student
  const handleDeleteStudent = async (studentId, studentName) => {
    if (window.confirm(`Are you sure you want to delete ${studentName}?`)) {
      try {
        await api.delete(`/users/student/${studentId}`);
        toast.success("Student deleted successfully");
        fetchStudents(); // Refresh list
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error(error.response?.data?.message || "Failed to delete student");
      }
    }
  };

  const baseBtn = "gap-8";
  const activeBtn = "bg-[#F5F7F7] text-[#0B3142] border border-[#ffffff] rounded-full px-15 py-2";
  const inactiveBtn = "text-[#9EA1A1] px-15 py-2";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="box-shadow mt-3 bg-white rounded-md">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 items-center">
          <div>
            <p className="flex flex-col">
              <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold">
                Student Management
              </span>
              <span className="text-sm text-[#696969]">
                Manage Student Information, Enrollment, and Academic Report
              </span>
            </p>
          </div>
        </div>

        {/* Status Filter */}
        <div className="w-full p-4 bg-white">
          <div className="inline-flex items-center gap-2 bg-[linear-gradient(to_right,#F5F2ED,#F4F5F0,#EDF5F3)] mt-2 rounded-2xl p-1">
            {["All", "Active", "Inactive", "Alumni"].map((item) => (
              <button style={{padding:"0px 30px"}}
                key={item}
                onClick={() => setActive(item)}
                className={`${baseBtn} ${active === item ? activeBtn : inactiveBtn}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-1 mt-2 px-4">   
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
            <input
              type="text"
              placeholder="Search by name, ID, admission number or class..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-[9px] text-[14px] focus:outline-none"
            />
          </div>

          <div className="sms-filter-more-btn" style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "10px", fontSize: "14px" }}>
            {/* CLASS DROPDOWN */}
            <div className="relative inline-block">
              <button
                onClick={() => setShowClassDropdown(!showClassDropdown)}
                className="bg-[#EFF2F2] rounded-[6px] px-4 py-2.5 text-[12px] text-[#1C1C1C] min-w-[124px] cursor-pointer flex items-center justify-between"
              >
                <span>{classFilter === "All" ? "All" : classFilter || "Class"}</span>
                <svg
                  className={`w-4 h-4 transition ${showClassDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

            {/* EXPORT DROPDOWN */}
            <div className="relative inline-block">
              <button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                className="bg-[#EFF2F2] rounded-[6px] px-4 py-2.5 text-[12px] text-[#1C1C1C] min-w-[124px] cursor-pointer flex items-center justify-between"
              >
                <span>Export</span>
                <svg
                  className={`w-4 h-4 transition ${showExportDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showExportDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E8E8] rounded-[6px] shadow-lg overflow-hidden">
                  <button
                    onClick={() => {
                      handleExportPDF();
                      setShowExportDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6]"
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => {
                      handleExportExcel();
                      setShowExportDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6]"
                  >
                    Excel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="p-4">
          <div className="w-full overflow-x-auto border border-[#e6e6e6] rounded-lg">
            <table className="w-full">
              <thead className="bg-[#F5F7F7]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={allVisibleSelected || (selectAllGlobal && filteredStudents.length > 0)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (filteredStudents.length <= paginatedStudents.length) {
                              handleSelectAllCurrentPage(true);
                            } else {
                              if (window.confirm(`Select all ${filteredStudents.length} students across all pages?`)) {
                                handleSelectAllAcrossPages(true);
                              } else {
                                handleSelectAllCurrentPage(true);
                              }
                            }
                          } else {
                            handleSelectAllAcrossPages(false);
                          }
                        }}
                      />
                      <span>Student Name</span>
                      <PiArrowsDownUpThin />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Class</span>
                      <PiArrowsDownUpThin />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Parent / Guardian</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Mobile Number</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No students found
                    </td>
                  </tr>
                ) : (
                  paginatedStudents.map((student, index) => {
                    const studentInfo = student.studentInfo;
                    const account = student.account;
                    const status = studentInfo?.accountInfo?.status || account?.status || "Active";
                    const studentPhotoDoc = studentInfo?.documents?.studentDocuments?.find((doc) => doc.documentType === "Student Photo")
                    const profileImage = account?.profileImage?.url || studentPhotoDoc?.fileUrl;

                    return (
                      <tr key={student._id || index} className="border-b border-[#e6e6e6] hover:bg-gray-50">
                        <td className="px-4 py-3 text-left text-sm font-semibold">
                          <div className="flex gap-3 items-center">
                            <input 
                              type="checkbox" 
                              checked={selectedRowIds.has(student._id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedRowIds(new Set([...selectedRowIds, student._id]));
                                  selectedRowsCacheRef.current.set(student._id, student);
                                  setSelectAllGlobal(false);
                                } else {
                                  const newSelected = new Set(selectedRowIds);
                                  newSelected.delete(student._id);
                                  setSelectedRowIds(newSelected);
                                  setSelectAllGlobal(false);
                                }
                              }}
                            />
                            <Link to={`/MyStudentdetails/${student._id}`} className="flex gap-4 items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                {profileImage ? (
                                  <img
                                    src={profileImage}
                                    alt={studentInfo?.personalInfo?.fullName}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">
                                    {studentInfo?.personalInfo?.fullName?.charAt(0) || "S"}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col leading-tight">
                                <span className="text-[#12516E] font-semibold">
                                  {studentInfo?.personalInfo?.fullName || "N/A"}
                                </span>
                                <span className="text-sm text-[#9c9c9c] font-semibold">
                                  {studentInfo?.studentId || "ID N/A"}
                                </span>
                              </div>
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-left text-[14px] font-normal font-400">
                          <Link to={`/MyStudentdetails/${student._id}`}>
                            {studentInfo?.academicInfo?.currentClass || "N/A"} {studentInfo?.academicInfo?.section ? `- ${studentInfo.academicInfo.section}` : ""}
                          </Link>
                        </td>
                        <td className="px-5 py-3 text-left text-[14px] font-normal font-400">
                          <Link to={`/MyStudentdetails/${student._id}`}>
                            {studentInfo?.parentInfo?.father?.fullName || studentInfo?.parentInfo?.mother?.fullName || "N/A"}
                          </Link>
                        </td>
                        <td className="px-5 py-3 text-left text-[14px] font-normal font-400">
                          <Link to={`/MyStudentdetails/${student._id}`}>
                            {account?.phone || studentInfo?.contactInfo?.primaryMobile || "N/A"}
                          </Link>
                        </td>
                        <td className="px-3 py-3 text-left text-[14px] font-normal font-400">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[status] || "bg-gray-100 text-gray-600"}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0"></span>
                            <span className="font-semibold font-[600] text-[14px] leading-none">{status}</span>
                          </span>
                        </td>
                        <td className="px-5 py-3 text-left text-sm font-semibold">
                          <div className="flex gap-3">
                            <Link to={`/MyStudentdetails/${student._id}`}>
                              <CgProfile className="w-6 h-6 text-[#9C9C9C] hover:text-blue-500 cursor-pointer" />
                            </Link>
                         
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredStudents.length > 0 && (
            <Pagination
              currentPage={currentPage}
              total={filteredStudents.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
              onItemsPerPageChange={(newPerPage) => {
                setItemsPerPage(newPerPage);
                setCurrentPage(1);
              }}
              itemsPerPageOptions={[10, 20, 50, 100, 'All']}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStudent;