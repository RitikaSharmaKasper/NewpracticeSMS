import React, { useState, useEffect, useMemo, useRef } from "react";
import "../../CSS/Style.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axiosInstance";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

// GIFsimg
import student from "../../assets/images/studentGif.gif";
import calender from "../../assets/images/calender.gif";
import kalu from "../../assets/images/kalu.gif";
import chair from "../../assets/images/chair.gif";

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
import defaultAvatar from "../../assets/images/katnis.jpg";
import Pagination from "../../components/Pagination";

const statusStyle = {
  Active: "bg-[#D4EDDA] text-[#009638]",
  Inactive: "bg-[#DEDEDE] text-[#696969]",
  Alumni: "bg-[#FDEBD0] text-[#D35400]",
};

const Student = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("All");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  
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
    
    // Search filter (name or admission number)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((student) => {
        const fullName = student.studentInfo?.personalInfo?.fullName || "";
        const admissionNumber = student.studentInfo?.admissionNumber || "";
        const studentId = student.studentInfo?.studentId || "";
        return fullName.toLowerCase().includes(searchLower) || 
               admissionNumber.toLowerCase().includes(searchLower) ||
               studentId.toLowerCase().includes(searchLower);
      });
    }
    
    // Class filter
    if (selectedClass) {
      filtered = filtered.filter((student) => {
        const currentClass = student.studentInfo?.academicInfo?.currentClass;
        return currentClass === selectedClass;
      });
    }
    
    // Section filter
    if (selectedSection) {
      filtered = filtered.filter((student) => {
        const section = student.studentInfo?.academicInfo?.section;
        return section === selectedSection;
      });
    }
    
    return filtered;
  }, [students, active, searchTerm, selectedClass, selectedSection]);

  // Reset selections when filters change
  useEffect(() => {
    setSelectedRowIds(new Set());
    setSelectAllGlobal(false);
    selectedRowsCacheRef.current.clear();
  }, [active, searchTerm, selectedClass, selectedSection]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [active, searchTerm, selectedClass, selectedSection]);

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
    
    // Optional: Clear selection after export
    // setSelectedRowIds(new Set());
    // setSelectAllGlobal(false);
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
      
      // Optional: Clear selection after export
      // setSelectedRowIds(new Set());
      // setSelectAllGlobal(false);
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

  const cardData = [
    {
      des: "Total Student",
      number: stats.totalStudents,
      left: stats.activeStudents,
      text: "Student Present",
      gif: student,
    },
    {
      des: "Attendance Rate",
      number: stats.totalStudents ? `${((stats.activeStudents / stats.totalStudents) * 100).toFixed(1)}%` : "0%",
      left: "",
      text: "from total students",
      gif: calender,
    },
    // {
    //   des: "Active Student",
    //   number: stats.activeStudents,
    //   left: "",
    //   text: "Currently enrolled",
    //   gif: kalu,
    // },
        {
      des: "New Admission",
      number: stats.newadmission,
      left: "",
      text: "Session",
      gif: kalu,
    },
    {
      des: "Fees Collected",
      number: stats.feescollected,
      left: "",
      text: "this month",
      gif: chair,
    },
  ];

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
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3">
        {cardData.map((item, index) => (
          <div key={index} className="box-shadow bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center">
                <p className="font-medium text-[16px] text-[#1C1C1C]">{item.des}</p>
                <span className="font-bold text-[28px] text-[#1c1c1c] mt-2 leading-none">
                  {item.number}
                </span>
                <p className="mt-3 flex items-center gap-2 text-[14px] font-semibold">
                  <span className="text-[#009638]">{item.left}</span>
                  <span className="text-[#696969]">{item.text}</span>
                </p>
              </div>
              <div className="flex items-center justify-center w-16 h-16">
                <img src={item.gif} alt="student" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        ))}
      </div>

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

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-[#9C9C9C] font-semibold rounded-lg text-[#9C9C9C]">
              <TbFileImport className="text-[#9C9C9C]" />
              Bulk Import
            </button>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B3142] text-white border border-[#0B3142] rounded-lg"
              onClick={() => navigate("/addStudent")}
            >
              <GrUserAdd className="text-white" />
              Add Student
            </button>
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
        <div className="mt-3 p-4 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="search"
              placeholder="🔎 Search Student by name, admission number or student ID..."
              className="w-full bg-[#EEEEEE] rounded-lg px-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#EFF2F2] rounded px-2 py-2">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="border-0 outline-0 bg-transparent"
              >
                <option value="">Classes</option>
                {uniqueClasses.map((className) => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
            </div>

            <div className="bg-[#EFF2F2] rounded px-2 py-2">
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="border-0 outline-0 bg-transparent"
              >
                <option value="">Sections</option>
                {uniqueSections.map((section) => (
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </select>
            </div>

            {/* Export Dropdown */}
            <div className="relative group">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#EFF2F2] rounded-lg">
                <TbFileExport className="text-[#9C9C9C]" />
                Export As
                <MdOutlineKeyboardArrowDown />
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg hidden group-hover:block z-10">
                <button
                  onClick={handleExportPDF}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                >
                  PDF
                </button>
                <button
                  onClick={handleExportExcel}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                >
                  Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Count Display
         {(selectedRowIds.size > 0 || selectAllGlobal) && (
          <div className="px-4 pb-2">
            <span className="text-sm text-blue-600">
              {selectAllGlobal 
                ? `All ${filteredStudents.length}  across all pages` 
                : `${selectedRowIds.size} student${selectedRowIds.size !== 1 ? 's' : ''} selected`}
            </span>
          </div>
        )} */}

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
                              // If all items fit on one page, just select current page
                              handleSelectAllCurrentPage(true);
                            } else {
                              // Ask user if they want to select all across pages
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
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
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
                            <Link to={`/Studentdetails/${student._id}`} className="flex gap-4 items-center">
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
                        <td className="px-4 py-3 text-left text-sm font-semibold">
                          <Link to={`/Studentdetails/${student._id}`}>
                            {studentInfo?.academicInfo?.currentClass || "N/A"} {studentInfo?.academicInfo?.section ? `- ${studentInfo.academicInfo.section}` : ""}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-left text-sm font-semibold">
                          <Link to={`/Studentdetails/${student._id}`}>
                            {studentInfo?.parentInfo?.father?.fullName || studentInfo?.parentInfo?.mother?.fullName || "N/A"}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-left text-sm font-semibold">
                          <Link to={`/Studentdetails/${student._id}`}>
                            {account?.phone || studentInfo?.contactInfo?.primaryMobile || "N/A"}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-left text-sm font-semibold">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[status] || "bg-gray-100 text-gray-600"}`}>
                            <span className="text-sm leading-none">• {status}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3 text-left text-sm font-semibold">
                          <div className="flex gap-3">
                            <Link to={`/Studentdetails/${student._id}`}>
                              <CgProfile className="w-5 h-5 text-[#9C9C9C] hover:text-blue-500 cursor-pointer" />
                            </Link>
                            <Link to={`/editStudent/${student._id}`}>
                              <FiEdit className="w-5 h-5 text-[#9C9C9C] hover:text-green-500 cursor-pointer" />
                            </Link>
                            <Link to={`/admissionLetter/${student.studentInfo?.studentId}`}>
                              <FaRegFileAlt className="w-5 h-5 text-[#9C9C9C] hover:text-orange-500 cursor-pointer" />
                            </Link>
                            <RiDeleteBin5Line 
                              className="w-5 h-5 text-[#FF4B4B] hover:text-red-700 cursor-pointer"
                              onClick={() => handleDeleteStudent(student._id, studentInfo?.personalInfo?.fullName)}
                            />
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

export default Student;
// import React, { useState } from "react";
// import "../../CSS/Style.css";
// import { Link, useNavigate } from "react-router-dom";

// {
//   /* <----------------------------------------------- GIF ----------------------------------------------------> */
// }
// import student from "../../assets/images/studentGif.gif";
// import calender from "../../assets/images/calender.gif";
// import kalu from "../../assets/images/kalu.gif";
// import chair from "../../assets/images/chair.gif";

// {
//   /* <---------------------------------------------- icon -----------------------------------------------------> */
// }
// import { TbFileImport } from "react-icons/tb";
// import { GrUserAdd } from "react-icons/gr";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { CgProfile } from "react-icons/cg";
// import { PiArrowsDownUpThin } from "react-icons/pi";
// import { FiEdit, FiSearch } from "react-icons/fi";
// import { FaRegFileAlt } from "react-icons/fa";
// import { RiDeleteBin5Line } from "react-icons/ri";

// /* <----------------------------------------------- img -------------------------------------------------------> */
// import everdeen from "../../assets/images/katnis.jpg";
// import goku from "../../assets/images/goku.jpg";
// import langford from "../../assets/images/langford.jpg";
// import homelander from "../../assets/images/homelander.jpg";
// import thanos from "../../assets/images/thanos.jpg";
// import Joffrey from "../../assets/images/Joffrey.jpg";
// import doll from "../../assets/images/bella.jpg";
// import prime from "../../assets/images/prime.jpg";
// import peter from "../../assets/images/lord.jpg";
// import gamora from "../../assets/images/gamora.jpg";
// import meave from "../../assets/images/meave.jpg";
// import Pagination from "../../components/Pagination";

// const cardData = [
//   {
//     des: "Total Student",
//     number: "500",
//     left: "468",
//     text: "Student Present",
//     gif: student,
//   },
//   {
//     des: "Attendance Rate",
//     number: "94.7%",
//     left: "+2.1%",
//     text: "from the last month",
//     gif: calender,
//   },
//   {
//     des: "New Student",
//     number: "34",
//     left: "",
//     text: "session 2024-2025",
//     gif: kalu,
//   },
//   {
//     des: "Unassigned Student",
//     number: "12",
//     left: "",
//     text: "Not mapped to class or section",
//     gif: chair,
//   },
// ];

// /* <--------------------------------------------------- student Dummy Data --------------------------------------------> */
// const studentData = [
//   {
//     student: "katniss Everdeen",
//     studentId: "001",
//     img: everdeen,
//     class: "12B",
//     parent: "Peeta Mallak",
//     number: 620489625,
//     status: "Active",
//   },
//   {
//     student: "Goku",
//     studentId: "002",
//     img: goku,
//     class: "11B",
//     parent: "Bodok",
//     number: 620489855,
//     status: "Inactive",
//   },
//   {
//     student: "Katniss langford",
//     studentId: "010",
//     img: langford,
//     class: "1B",
//     parent: "Jensen",
//     number: 620489625,
//     status: "Active",
//   },
//   {
//     student: "Homelander",
//     img: homelander,
//     studentId: "003",
//     class: "10C",
//     parent: "Soldier Boy",
//     number: 620489625,
//     status: "Inactive",
//   },
//   {
//     student: "Thanos",
//     studentId: "004",
//     img: thanos,
//     class: "9A",
//     parent: "A'Lars",
//     number: 629639625,
//     status: "Alumni",
//   },
//   {
//     student: "Joffrey Baratheon",
//     img: Joffrey,
//     studentId: "005",
//     class: "11A",
//     parent: "Robert Baratheon",
//     number: 620489625,
//     status: "Active",
//   },
//   {
//     student: "Annembella",
//     img: doll,
//     studentId: "006",
//     class: "11B",
//     parent: "Nun",
//     number: 600489625,
//     status: "Active",
//   },
//   {
//     student: "optimus Prime",
//     img: prime,
//     studentId: "007",
//     class: "7A",
//     parent: "Bumble Bee",
//     number: 620489625,
//     status: "Active",
//   },
//   {
//     student: "Gamora ",
//     img: gamora,
//     studentId: "008",
//     class: "12A",
//     parent: "Thanos",
//     number: 620489625,
//     status: "Active",
//   },
//   {
//     student: "Meave Wiley",
//     img: meave,
//     studentId: "009",
//     class: "12C",
//     parent: "Otis Milburn",
//     number: 620489625,
//     status: "Active",
//   },
// ];

// const statusStyle = {
//   Active: "bg-[#D4EDDA] text-[#009638]",
//   Inactive: "bg-[#DEDEDE] text-[#696969]",
//   Alumni: "bg-[#FDEBD0] text-[#D35400]",
// };

// const Student = () => {
//   const [active, setActive] = useState("All");

//   const baseBtn = "  gap-8 ";

//   const activeBtn =
//     "bg-[#F5F7F7] text-[#0B3142] border border-[#ffffff] rounded-full px-15 py-2 ";

//   const inactiveBtn = "text-[#9EA1A1] px-15 py-2";
//   const navigate = useNavigate();

//   return (
//     <div>
//       {/* <--------------------------------------- Card -----------------------------------> */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3">
//         {cardData.map((item, index) => (
//           <div key={index} className="box-shadow bg-white rounded-2xl p-4">
//             <div className="flex items-center justify-between ">
//               {/* LEFT CONTENT */}
//               <div className="flex flex-col justify-center">
//                 <p className="font-medium text-[16px] text-[#1C1C1C]">
//                   {item.des}
//                 </p>

//                 <span className="font-bold text-[28px] text-[#1c1c1c] mt-2 leading-none">
//                   {item.number}
//                 </span>

//                 <p className="mt-3 flex items-center gap-2 text-[14px] font-semibold ">
//                   <span className="text-[#009638]">{item.left}</span>
//                   <span className="text-[#696969]">{item.text}</span>
//                 </p>
//               </div>

//               {/* RIGHT ICON / GIF */}
//               <div className="flex items-center justify-center w-16 h-16">
//                 <img
//                   src={item.gif}
//                   alt="student"
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="box-shadow mt-3 bg-white rounded-md">
//         <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 items-center">
//           {/* LEFT CONTENT */}
//           <div>
//             <p className="flex flex-col">
//               <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold">
//                 Student Management
//               </span>
//               <span className="text-sm text-[#696969]">
//                 Manage Student Information, Enrollment, and Academic Report
//               </span>
//             </p>
//           </div>

//           {/* RIGHT BUTTONS */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button className="inline-flex items-center gap-2 px-6 py-3 border border-[#9C9C9C] font-semibold rounded-lg text-[#9C9C9C] ">
//               <TbFileImport className="text-[#9C9C9C]" />
//               Bulk Import
//             </button>

//             <div>
//               {/* <Link to='../addStudent'> */}
//               <button
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B3142] text-white border border-[#0B3142] rounded-lg"
//                 onClick={() => navigate("/addStudent")}
//               >
//                 <GrUserAdd className="text-white" />
//                 Add Student
//               </button>

//               {/* </Link> */}
//             </div>
//           </div>
//         </div>

//         {/* <------------------------------------- filter -------------------------------> */}
//         <div className="w-full p-4 bg-white">
//           <div className="inline-flex items-center gap-2 bg-[linear-gradient(to_right,#F5F2ED,#F4F5F0,#EDF5F3)] mt-2 rounded-2xl p-1">
//             {["All", "Active", "Inactive", "Alumni"].map((item) => (
//               <button
//                 key={item}
//                 onClick={() => setActive(item)}
//                 className={`${baseBtn} ${
//                   active === item ? activeBtn : inactiveBtn
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* <-------------------------------------- search & filter ------------------------------> */}
//         <div className="mt-3 p-4 flex items-center gap-36">
//           {/* SEARCH */}
//           <div className="flex-1">
//             <span></span>
//             <input
//               type="search"
//               placeholder="🔎︎ Search Student by name or admission Number..."
//               className="w-full bg-[#EEEEEE] rounded-lg px-4 py-2"
//             />
//           </div>

//           {/* FILTER BUTTONS */}
//           <div className="inline-flex items-center gap-3">
//             <div className="flex justify-between">
//               <label For="class" className=""></label>
//               <div className="bg-[#EFF2F2] rounded px-2 py-2">
//                 <select name="" id="class" className="border-0 outline-0">
//                   <option value="">Class</option>
//                   <option value="">Nursery </option>
//                   <option value="">UKG</option>
//                   <option value="">Class 1</option>
//                   <option value="">Class 2</option>
//                   <option value="">Class 3</option>
//                   <option value="">Class 4</option>
//                   <option value="">Class 5</option>
//                   <option value="">Class 6</option>
//                   <option value="">Class 7</option>
//                   <option value="">Class 8</option>
//                 </select>
//               </div>
//             </div>
//             <label For="Section"></label>
//             <div className="bg-[#EFF2F2] rounded px-1 py-1">
//               <select
//                 name=""
//                 id="Section"
//                 className="px-1 py-1 border-0 outline-0"
//               >
//                 <option value="">Section</option>
//                 <option value="">A</option>
//                 <option value="">B</option>
//                 <option value="">C</option>
//                 <option value="">D</option>
//               </select>
//             </div>
//             <label For="Export"></label>
//             <div className="bg-[#EFF2F2] rounded px-1 py-1">
//               <select
//                 name=""
//                 id="Export"
//                 className="bg-[#EFF2F2] rounded px-1 py-1 border-0 outline-0"
//               >
//                 <option value="">Export As</option>
//                 <option value=""></option>
//                 <option value=""></option>
//                 <option value=""></option>
//                 <option value=""></option>
//                 <option value=""></option>
//                 <option value=""></option>
//                 <option value=""></option>
//                 <option value=""></option>
//                 <option value=""></option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* <------------------------------------------ Table ---------------------------------------> */}
//         <div className="p-4">
//           <div className="w-full overflow-x-auto border border-[#e6e6e6] rounded-lg">
//             <table className="w-full">
//               <thead className="bg-[#F5F7F7]">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-semibold">
//                     <div className="flex items-center gap-2">
//                       <input type="checkbox" />
//                       <span>Student Name</span>
//                       <PiArrowsDownUpThin />
//                     </div>
//                   </th>

//                   <th className="px-4 py-3 text-left text-sm font-semibold">
//                     <div className="flex items-center gap-2">
//                       <span>Class</span>
//                       <PiArrowsDownUpThin />
//                     </div>
//                   </th>

//                   <th className="px-4 py-3 text-left text-sm font-semibold">
//                     Parent / Guardian
//                   </th>

//                   <th className="px-4 py-3 text-left text-sm font-semibold">
//                     Mobile Number
//                   </th>

//                   <th className="px-4 py-3 text-left text-sm font-semibold">
//                     Status
//                   </th>

//                   <th className="px-4 py-3 text-left text-sm font-semibold">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {studentData.map((item, index) => (
//                   <tr key={index} className="border-b border-[#e6e6e6]">
//                     <td className="px-4 py-3 text-left text-sm font-semibold flex gap-3 items-center">
//                       <input type="checkbox" />
//                       <Link to="/Studentdetails">
//                         <div className="flex gap-4">
//                           <div className="w-10 h-10 rounded-full overflow-hidden">
//                             <img
//                               src={item.img}
//                               alt=""
//                               className="w-full h-full object-cover"
//                             />
//                           </div>

//                           {/* Name + ID */}
//                           <div className="flex flex-col leading-tight">
//                             <span className="text-[#12516E] font-semibold">
//                               {item.student}
//                             </span>
//                             <span className="text-sm text-[#9c9c9c] font-semibold">
//                               {item.studentId}
//                             </span>
//                           </div>
//                         </div>
//                       </Link>
//                     </td>

//                     <td className="px-4 py-3 text-left text-sm font-semibold">
//                       <Link to="/Studentdetails">{item.class}</Link>
//                     </td>
//                     <td className="px-4 py-3 text-left text-sm font-semibold">
//                       <Link to="/Studentdetails">{item.parent}</Link>
//                     </td>
//                     <td className="px-4 py-3 text-left text-sm font-semibold">
//                       <Link to="/Studentdetails">{item.number}</Link>
//                     </td>
//                     <td className="px-4 py-3 text-left text-sm font-semibold">
//                       <span
//                         className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[item.status] || "bg-gray-100 text-gray-600"}`}
//                       >
//                         <span className="text-sm leading-none">
//                           <Link to="/Studentdetails">•{item.status}</Link>
//                         </span>
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-left text-sm font-semibold flex gap-3 ">
//                       <Link to="/Studentdetails">
//                         <CgProfile className="w-5 h-5 text-[#9C9C9C]" />
//                       </Link>
//                       <Link to="/editStudent">
//                         <FiEdit className="w-5 h-5 text-[#9C9C9C]" />
//                       </Link>
//                       <FaRegFileAlt className="w-5 h-5 text-[#9C9C9C]" />
//                       <RiDeleteBin5Line className="w-5 h-5 text-[#FF4B4B]" />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//         {/* <------------------------------------------- pagination ---------------------------------> */}
//         <Pagination />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Student;
