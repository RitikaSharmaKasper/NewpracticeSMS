import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "../CSS/Room.css"

const PaginationAll = ({ totalItems,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,}) => {
   const totalPages = Math.ceil(totalItems / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPages = () => {
    let pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

  return pages;
};

  return (
    <div
         className="text-[10px] md:text-[12px] lg:text-[14px] paginationAll-sms"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        color: "#6B7280",
        fontFamily: "Segoe UI",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
  <select
    value={itemsPerPage}
    onChange={(e) => {
      setItemsPerPage(Number(e.target.value));
      setCurrentPage(1);
    }}
    style={{
      width: "80px",
      padding:"4px 8px",
      borderRadius: "4px",
   
      background: "#F9F9F9",
      appearance: "none",        // ✅ hide default arrow
      WebkitAppearance: "none",  // ✅ Safari/Chrome
      MozAppearance: "none",     // ✅ Firefox
      boxShadow:
        "-2px 0px 1px rgba(0,0,0,0.05) inset, 2px 0px 1px rgba(0,0,0,0.05) inset, 0px -2px 1px rgba(0,0,0,0.05) inset, 0px 2px 1px rgba(0,0,0,0.05) inset",
      cursor: "pointer",
      outline:"none"
    }}
  >
    <option value={10}>10</option>
    <option value={25}>25</option>
    <option value={50}>50</option>
  </select>

  {/* Custom Icon */}
  <span
    style={{
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none", // so click works on select
      fontSize: "8px",
      color: "#555",
    }}
  >
    ▼
  </span>
</div>

        <span style={{color:"#696969"}}>
          Showing <span style={{color:"#1C1C1C"}}>{start}-{end}</span> of {totalItems} results
        </span>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Previous */}
        <button
         disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          style={{
            border: "none",
            background: "transparent",
            // cursor: "pointer",
            color: "#9CA3AF",
            display: "flex",
            alignItems: "center",
           cursor: currentPage === 1 ? "not-allowed" : "pointer",
            opacity: currentPage === 1 ? 0.5 : 1
          }}
        >
          <MdKeyboardArrowLeft size={25} /> Previous
        </button>

        {/* Page Numbers */}
        {getPages().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              padding: "2px 8px",
              borderRadius: "6px",
              border: "1px solid #E5E7EB",
              backgroundColor: currentPage === page ? "#118AB2" : "transparent",
              color: currentPage === page ? "#fff" : "#374151",
              cursor: "pointer",
             
            }}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
         disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          style={{
            border: "none",
            background: "transparent",
            // cursor: "pointer",
            color: "#9CA3AF",
            display: "flex",
            alignItems: "center",
            // cursor:"not-allowed",
             cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            opacity: currentPage === totalPages ? 0.5 : 1
          }}
        >
          Next <MdKeyboardArrowRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default PaginationAll;
