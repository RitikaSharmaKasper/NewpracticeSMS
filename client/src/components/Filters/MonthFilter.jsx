// components/MonthFilter.jsx
import React, { useState, useEffect, useRef } from "react";

const MonthFilter = ({ 
  selectedMonth, 
  onMonthChange, 
  placeholder = "Month",
  className = "",
  showAllOption = true,
  allOptionLabel = "All"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Months data
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter months based on search
  const filteredMonths = months.filter(month => 
    month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (month) => {
    onMonthChange(month);
    setIsOpen(false);
    setSearchTerm("");
  };

  const displayText = selectedMonth || placeholder;

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#EFF2F2] rounded-[6px] px-4 py-2.5 text-[12px] text-[#1C1C1C] min-w-[124px] cursor-pointer flex items-center justify-between hover:bg-[#E5E8E8] transition-colors"
      >
        <span className="truncate">
          {displayText}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E8E8] rounded-[6px] shadow-lg overflow-hidden min-w-[180px]">
          {/* Search Input */}
          <div className="p-2 border-b border-[#E8E8E8]">
            <input
              type="text"
              placeholder="Search months..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1.5 text-[12px] border border-[#E8E8E8] rounded-[4px] outline-none focus:border-[#0B3142]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {showAllOption && (
              <button
                onClick={() => handleSelect(allOptionLabel)}
                className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] transition-colors ${
                  selectedMonth === allOptionLabel ? "bg-[#F3F4F6] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
                }`}
              >
                {allOptionLabel}
              </button>
            )}

            {filteredMonths.length === 0 ? (
              <div className="px-4 py-2 text-[13px] text-[#9C9C9C]">No months found</div>
            ) : (
              filteredMonths.map((month) => (
                <button
                  key={month}
                  onClick={() => handleSelect(month)}
                  className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] transition-colors ${
                    selectedMonth === month ? "bg-[#F3F4F6] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
                  }`}
                >
                  {month}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthFilter;