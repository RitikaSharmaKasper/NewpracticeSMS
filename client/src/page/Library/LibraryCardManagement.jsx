import React, { useState, useEffect, useRef } from "react";
import { HiSearch } from "react-icons/hi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import libraryMembers from "../../data/libraryMembers.json";
import cardbackground from "../../assets/images/cardbackground.png";
import GenerateLibraryCardModal from "./GenerateLibraryCardModal";

import QRCode from "qrcode";


import idcard_logo from "../../assets/images/idcard_logo.png"
const LibraryCardManagement = () => {
  const [activeTab, setActiveTab]         = useState("Student");

  const [generatedCards, setGeneratedCards] = useState(() => {
  const saved = localStorage.getItem("library_cards");
  return saved ? JSON.parse(saved) : [];
});

  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm]       = useState("");
  const [currentPage, setCurrentPage]     = useState(1);
  const [itemsPerPage, setItemsPerPage]   = useState(10);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);
  const [checkedIds, setCheckedIds]       = useState(new Set());
  const perPageRef = useRef(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const allData  = activeTab === "Student" ? libraryMembers.students : libraryMembers.staff;

  const filtered = allData.filter((r) => {
    const q = searchTerm.toLowerCase();
    if (activeTab === "Student") {
      return (
        r.memberName.toLowerCase().includes(q) ||
        r.admissionNo.toLowerCase().includes(q) ||
        r.memberId.toLowerCase().includes(q) ||
        r.class?.toString().includes(q) ||
        r.section?.toLowerCase().includes(q)
      );
    }
    return (
      r.memberName.toLowerCase().includes(q) ||
      r.empId.toLowerCase().includes(q) ||
      r.memberId.toLowerCase().includes(q) ||
      r.department?.toLowerCase().includes(q) ||
      r.role?.toLowerCase().includes(q)
    );
  });

  const totalItems   = filtered.length;
  const totalPages   = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfFirst = (currentPage - 1) * itemsPerPage;
  const currentData  = filtered.slice(indexOfFirst, indexOfFirst + itemsPerPage);
const cardRef = useRef(null);
  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };


const handleGenerateCard = (newCard) => {
  const updatedCards = [...generatedCards, newCard];
  setGeneratedCards(updatedCards);
  localStorage.setItem("library_cards", JSON.stringify(updatedCards));
  
  // Also add to libraryMembers data structure if needed
  if (newCard.role === "Student") {
    const existingStudents = libraryMembers.students;
    const studentExists = existingStudents.some(s => s.memberId === newCard.memberId);
    if (!studentExists) {
      libraryMembers.students.push({
        memberId: newCard.memberId,
        memberName: newCard.memberName,
        admissionNo: newCard.admissionNo,
        class: newCard.class,
        section: newCard.section,
        issueDate: newCard.issueDate,
        expiryDate: newCard.expiryDate
      });
    }
  } else {
    const existingStaff = libraryMembers.staff;
    const staffExists = existingStaff.some(s => s.memberId === newCard.memberId);
    if (!staffExists) {
      libraryMembers.staff.push({
        memberId: newCard.memberId,
        memberName: newCard.memberName,
        empId: newCard.empId,
        department: "",
        role: "",
        issueDate: newCard.issueDate,
        expiryDate: newCard.expiryDate
      });
    }
  }
  
  // Save updated libraryMembers to localStorage
  localStorage.setItem("library_members", JSON.stringify(libraryMembers));
  
  alert(`Library card generated successfully!\nCard Number: ${newCard.id}`);
};


const QRImage = ({ value }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      // value is now a JSON string containing all member data
      QRCode.toCanvas(canvasRef.current, value, {
        width: 52,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
    }
  }, [value]);

  return <canvas ref={canvasRef} />;
};


  useEffect(() => {
    setCurrentPage(1);
    setCheckedIds(new Set());
  }, [searchTerm, activeTab, itemsPerPage]);

  useEffect(() => {
    const handler = (e) => {
      if (perPageRef.current && !perPageRef.current.contains(e.target))
        setIsPerPageOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleCheck = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        // If we are unchecking the member that is currently viewing, close the modal
        if (selectedMember && selectedMember.memberId === id) {
          setIsViewModalOpen(false);
          setSelectedMember(null);
        }
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allChecked =
    currentData.length > 0 && currentData.every((r) => checkedIds.has(r.memberId));

  const toggleAll = () => {
    if (allChecked) {
      setCheckedIds((prev) => {
        const next = new Set(prev);
        currentData.forEach((r) => next.delete(r.memberId));
        return next;
      });
      // If the currently viewed member is in currentData and we uncheck all, close the modal
      if (selectedMember && currentData.some(r => r.memberId === selectedMember.memberId)) {
        setIsViewModalOpen(false);
        setSelectedMember(null);
      }
    } else {
      setCheckedIds((prev) => {
        const next = new Set(prev);
        currentData.forEach((r) => next.add(r.memberId));
        return next;
      });
    }
  };

const handleDownload = async () => {
  const domtoimage = (await import("dom-to-image-more")).default;
  try {
    const node = cardRef.current;
    const blob = await domtoimage.toBlob(node, {
      width: node.offsetWidth * 3,
      height: node.offsetHeight * 3,
      style: {
        transform: `scale(3)`,
        transformOrigin: "top left",
        width: node.offsetWidth + "px",
        height: node.offsetHeight + "px",
      },
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `library-card-${selectedMember?.memberId || "card"}.png`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download failed:", err);
  }
};

const handlePrint = async () => {
  const domtoimage = (await import("dom-to-image-more")).default;
  try {
    const node = cardRef.current;
    const scale = 3;
    const dataUrl = await domtoimage.toPng(node, {
      width: node.offsetWidth * scale,
      height: node.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: node.offsetWidth + "px",
        height: node.offsetHeight + "px",
      },
    });

    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Library Card - ${selectedMember?.memberName || ""}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body {
              width: 100%;
              background: #fff;
            }
            img {
              display: block;
              width: ${node.offsetWidth}px;
              height: ${node.offsetHeight}px;
              margin: 0;
              padding: 0;
              position: absolute;
              top: 0;
              left: 0;
            }
            @media print {
              @page {
                size: auto;
                margin: 10mm;
              }
              html, body {
                width: 100%;
                background: #fff;
              }
              img {
                position: static;
                width: ${node.offsetWidth}px;
                height: ${node.offsetHeight}px;
                display: block;
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" />
          <script>
            window.onload = function () {
              setTimeout(function () {
                window.print();
                window.onafterprint = function () { window.close(); };
              }, 500);
            };
          <\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  } catch (err) {
    console.error("Print failed:", err);
  }
};




  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const handleViewCard = (member) => {
    // Check the checkbox when opening modal
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.add(member.memberId);
      return next;
    });
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  const pageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, 5];
    if (currentPage >= totalPages - 2)
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  return (
    <div className="pt-1 pl-1 pr-1 pb-1" style={{ fontFamily: "Segoe UI" }}>
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] p-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <div>
            <h1 className="text-[18px] font-semibold text-[#1C1C1C]">Library Card Management</h1>
            <p className="text-[14px] text-[#9C9C9C] font-normal -mt-[2px]">
              Generate and manage library cards for members
            </p>
          </div>
          <button
            type="button"
              onClick={() => setIsGenerateModalOpen(true)}
            className="bg-[#0B3142] text-white px-5 h-10 rounded-[8px] text-[14px] font-semibold flex items-center gap-2 hover:bg-[#15465c] transition cursor-pointer"
          >
            <span className="text-[18px] -mt-[1px]">+</span> Generate Card
          </button>
        </div>

        {/* Search + Tab */}
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] max-w-[400px] sm:max-w-[540px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1300px] border border-[#E8E8E8] rounded-[9px] text-[14px] focus:outline-none outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex bg-[linear-gradient(to_right,#F5F2ED,#F4F5F0,#EDF5F3)] rounded-[20px] py-1 px-2 w-full sm:w-auto md:w-auto">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("Student");
                  setCurrentPage(1);
                }}
                className={`flex-1 md:flex-none pl-4 pr-4 rounded-[14px] text-[14px] font-medium transition-all whitespace-nowrap py-1.5 focus:outline-none outline-none ${
                  activeTab === "Student"
                    ? "bg-[#F5F7F7] border border-[#FFFFFF] shadow-md text-[#0B3142]"
                    : "text-[#6B7280]"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("Staff");
                  setCurrentPage(1);
                }}
                className={`flex-1 md:flex-none pl-4 pr-4 rounded-[14px] text-[14px] focus:outline-none outline-none font-medium transition-all whitespace-nowrap py-1.5 ${
                  activeTab === "Staff"
                    ? "bg-[#F5F7F7] border border-[#FFFFFF] shadow-md text-[#0B3142]"
                    : "text-[#6B7280]"
                }`}
              >
                Staff
              </button>
            </div>
          </div>
        </div>

        {/* ==================== SPLIT CONTENT LAYOUT ==================== */}
        <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
          
          {/* Left Container: Table Wrapper */}
          <div className={`w-full transition-all duration-300 ${isViewModalOpen ? "lg:w-[62%]" : "lg:w-full"}`}>
            <div className="overflow-x-auto rounded-[12px] border border-[#E6E6E6]">
              <table className="w-full text-left" style={{ borderCollapse: "collapse" }}>
                <thead className="border-b border-[#E6E6E6] bg-white">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={toggleAll}
                        className="w-4 h-3 accent-[#0B3142] cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3 text-[14px] font-semibold font-[600] text-[#1C1C1C] whitespace-nowrap">
                      Card Number
                    </th>
                    <th className="px-6 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600]">
                      {activeTab === "Student" ? "Student" : "Staff"}
                    </th>
                    <th className="px-4 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600] whitespace-nowrap">
                      Issue Date
                    </th>
                    <th className="px-4 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600] whitespace-nowrap">
                      Expiry Date
                    </th>
                    <th className="px-4 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-[14px] text-[#9C9C9C]">
                        No records found.
                        </td>
                    </tr>
                  ) : (
                    currentData.map((row) => (
                      <tr
                        key={row.memberId}
                        className={`border-b border-[#E6E6E6] last:border-0 transition-colors ${
                          selectedMember?.memberId === row.memberId && isViewModalOpen ? "bg-[#F9FAFB]" : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={checkedIds.has(row.memberId)}
                            onChange={() => toggleCheck(row.memberId)}
                            className="w-4 h-3 accent-[#0B3142] cursor-pointer"
                          />
                        </td>

                        {/* Card Number */}
                        <td className="px-4 py-3 text-[14px] text-[#1C1C1C] font-normal whitespace-nowrap">
                          {row.memberId}
                        </td>

                        {/* Avatar + Name + sub-id */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.memberName)}&background=random&size=40`}
                              alt={row.memberName}
                              className="w-9 h-9 rounded-full object-cover shrink-0"
                            />
                            <div>
                              <p className="text-[14px] font-semibold font-[600] text-[#1C1C1C] leading-tight">
                                {row.memberName}
                              </p>
                              <p className="text-[14px] text-[#9C9C9C] font-normal">
                                {activeTab === "Student" ? row.admissionNo : row.empId}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Issue Date */}
                        <td className="px-4 py-3 text-[14px] text-[#1C1C1C] font-normal whitespace-nowrap">
                          {row.issueDate}
                        </td>

                        {/* Expiry Date */}
                        <td className="px-4 py-3 text-[14px] text-[#1C1C1C] font-normal whitespace-nowrap">
                          {row.expiryDate}
                        </td>

                        {/* Action */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <button 
                              title="View" 
                              onClick={() => handleViewCard(row)}
                              className={`transition cursor-pointer ${
                                selectedMember?.memberId === row.memberId && isViewModalOpen ? "text-[#0B3142]" : "text-[#9C9C9C] hover:text-[#1C1C1C]"
                              }`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            </button>
                            <button onClick={() => { handleViewCard(row); setTimeout(handlePrint, 200); }} title="Print" className="text-[#9C9C9C] hover:text-[#1C1C1C] transition cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 6 2 18 2 18 9"/>
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                                <rect x="6" y="14" width="12" height="8"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Segment */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 mt-1">
              <div className="flex items-center gap-3">
                <div className="relative" ref={perPageRef}>
                  <div
                    onClick={() => setIsPerPageOpen(!isPerPageOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#F9F9F9] border border-[#E0E0E0] rounded-[6px] text-[14px] text-[#1C1C1C] cursor-pointer min-w-[60px] justify-between"
                  >
                    <span className="font-semibold">{itemsPerPage}</span>
                    <span className="text-[9px] text-[#555]">▼</span>
                  </div>
                  {isPerPageOpen && (
                    <div className="absolute bottom-full mb-2 left-0 w-20 bg-white border border-[#E0E0E0] rounded-[8px] shadow-xl z-50 overflow-hidden">
                      {[5, 10, 20, 50].map((val) => (
                        <div
                          key={val}
                          onClick={() => { setItemsPerPage(val); setIsPerPageOpen(false); }}
                          className="px-4 py-2 text-[13px] text-[#696969] hover:bg-[#F3F4F6] cursor-pointer text-center"
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[13px] text-[#696969]">
                  Showing{" "}
                  <span className="text-[#1C1C1C] font-medium">
                    {totalItems === 0 ? 0 : indexOfFirst + 1}
                  </span>
                  -{Math.min(indexOfFirst + itemsPerPage, totalItems)} of {totalItems} results
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-[6px] text-[13px] text-[#9CA3AF] transition ${
                    currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#F0F2F2] cursor-pointer"
                  }`}
                >
                  <MdKeyboardArrowLeft size={18} /> Previous
                </button>

                <div className="flex gap-1">
                  {pageNumbers().map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded-[6px] text-[13px] cursor-pointer transition ${
                        currentPage === p
                          ? "bg-[#0B3142] text-white"
                          : "text-[#696969] hover:bg-[#F0F2F2]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="w-8 h-8 flex items-center justify-center text-[#696969] text-[13px]">...</span>
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className="w-8 h-8 flex items-center justify-center rounded-[6px] text-[13px] text-[#696969] hover:bg-[#F0F2F2] cursor-pointer"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-[6px] text-[13px] text-[#9CA3AF] transition ${
                    currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-[#F0F2F2] cursor-pointer"
                  }`}
                >
                  Next <MdKeyboardArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Container: ID Card Preview Panel - YOUR ORIGINAL LAYOUT RESTORED */}
          {isViewModalOpen && selectedMember && (
            <div className="w-full lg:w-[41.5%]  border border-[#E8E8E8] rounded-[12px] pl-4 pr-3 pt-3 pb-4 bg-white relative animate-fadeIn">
              
   

    {/* One line with Card Holder Name + Download + Print */}
<div className="mb-4">
  <div className="flex justify-between items-start mb-1">
    <h2 className="text-[17px] font-semibold font-[600] text-[#1C1C1C]">ID Card Preview</h2>
    <div className="flex gap-2">
      <button onClick={handleDownload} className="border border-[#E0E0E0] hover:bg-[#F9F9F9] h-9 px-4 rounded-[6px] text-[13px] font-medium text-[#1C1C1C] flex items-center justify-center gap-1.5 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download
      </button>
      <button  onClick={handlePrint} className="bg-[#0B3142] hover:bg-[#15465c] text-white h-9 px-4 rounded-[6px] text-[13px] font-medium flex items-center justify-center gap-1.5 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Print
      </button>
    </div>
  </div>
  <p className="text-[15px] text-[#9C9C9C] -mt-[15px]">Preview of the student ID card design</p>
</div>

              {/* Card Holder Section - Your original order */}
              <div ref={cardRef} className="relative rounded-xl shadow-lg overflow-hidden w-[20rem] jutsify-between items-start ">
                {/* Background Image */}
                <img 
                  src={cardbackground} 
                  alt="Card Background" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Card Content - Overlay on top of background image */}
                <div className="relative pt-2 pl-3 pr-3 pb-3 z-10">
                  
                  {/* Top Section - Card Holder Info */}
                <div className="flex justify-between items-start">
  <div className="space-y-1">
    <span className="text-[16px] font-bold font-[700] font-Montserrat text-[#FFFFFF] tracking-wider block mb-10">
      Library Card
    </span>
    <span className="text-[10px] font-regular font-[400] font-Montserrat text-[#FFFFFF]/60 tracking-widest block">
      Card Holder Name
    </span>
    <span className="text-[16px] font-semibold font-[600]  block tracking-wide truncate max-w-[170px] -mt-[8px] text-white">
      {selectedMember.memberName}
    </span>
    <span className="text-[18px] font-bold  font-[700] block tracking-[0.25rem]   font-Montserrat  mt-1 text-white">
      {selectedMember.memberId}
    </span>
  </div>
  
  <div className="text-white mt-[2px]">
     <img 
    src={idcard_logo} 
    alt="QR Code" 
    className="w-[55px] h-[15px]" 
  />
  </div>
</div>
                  
                  <div className="-mt-[2px] ml-4 mr-4 "></div>
                  
                  {/* Bottom Section - Issue Date, Expiry Date & QR Code */}
                  <div className="flex justify-between items-end">
                    <div className="flex gap-4 ml-2">
                      <div>
                        <span className="opacity-75 font-Montserrat font-normal font-[400] tracking-[0.05rem] text-[10px] text-[#FFFFFF]/60 leading-none">Issue Date</span>
                        <span className="font-semibold text-white text-[10px] font-[600] block leading-none -mt-[2px]">
                          {selectedMember.issueDate || "Jan 15, 2025"}
                        </span>
                      </div>
                      <div>
                        <span className="opacity-75 font-Montserrat font-normal font-[400] tracking-[0.05rem] text-[10px] text-[#FFFFFF]/60 leading-none">Expiry Date</span>
                        <span className="font-semibold text-white text-[10px] font-[600] block leading-none -mt-[2px]">
                          {selectedMember.expiryDate || "Jan 14, 2026"}
                        </span>
                      </div>
                    </div>
                    
            <div className="bg-white p-1 rounded-[8px] shrink-0 shadow-sm">
  <QRImage value={JSON.stringify({
    memberId: selectedMember.memberId,
    name: selectedMember.memberName,
    role: activeTab,
    class: selectedMember.class || "",
    section: selectedMember.section || "",
    admissionNo: selectedMember.admissionNo || "",
    empId: selectedMember.empId || ""
  })} />
</div>
                  </div>
                </div>
              </div>

              {/* Specifications Blueprint Segment - Your original position at bottom */}
              <div className="bg-[#F9F9F9] rounded-[4px] p-3 border border-[#0000001A] mt-4 pt-1 pl-2 pb-4 opacity-80">
                <h4 className="text-[12px] font-semibold text-[#9C9C9C] font-[600] v mb-2">Card Specifications:</h4>
                <ul className="text-[12px] text-[#9C9C9C]  space-y-1 list-disc pl-3.5 font-normal">
                  <li>Size: 85.6mm × 54mm (CR80)</li>
                  <li>Material: PVC with lamination</li>
                  <li>Features: QR Code, Emergency contact</li>
                  <li>Validity: 1 Academic Year</li>
                </ul>
              </div>

            </div>
          )}

        </div>
{isGenerateModalOpen && (
  <GenerateLibraryCardModal
    isOpen={isGenerateModalOpen}
    onClose={() => setIsGenerateModalOpen(false)}
    onSubmit={handleGenerateCard}
    existingMembers={[
      ...libraryMembers.students.map(s => ({ ...s, role: "Student" })),
      ...libraryMembers.staff.map(s => ({ ...s, role: "Staff" }))
    ]}
  />
)}

      </div>
    </div>
  );
};

export default LibraryCardManagement;