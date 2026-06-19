// components/SectionFilter.jsx
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosInstance";

const SectionFilter = ({ 
  selectedSection, 
  onSectionChange,
  classFilter = null, // Optional: filter sections by selected class
  placeholder = "Section",
  className = "",
  showAllOption = true,
  allOptionLabel = "All"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Fetch sections from API
  const { data: sections = [], isLoading, error } = useQuery({
    queryKey: ["section-filter", classFilter],
    queryFn: async () => {
      let url = "/classes";
      // If class filter is selected, fetch sections for that specific class
      if (classFilter && classFilter !== "All") {
        url = `/classes?className=${encodeURIComponent(classFilter)}`;
      }
      
      const response = await api.get(url);
      // Extract unique sections
      const sectionNames = response.data.data.map(item => item.section);
      // Remove duplicates and filter out null/undefined
      return [...new Set(sectionNames)].filter(Boolean);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    enabled: true // Always fetch
  });

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

  // Filter sections based on search
  const filteredSections = sections.filter(sec => 
    sec.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (sec) => {
    onSectionChange(sec);
    setIsOpen(false);
    setSearchTerm("");
  };

  const displayText = selectedSection || placeholder;

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#EFF2F2] rounded-[6px] px-4 py-2.5 text-[12px] text-[#1C1C1C] min-w-[124px] cursor-pointer flex items-center justify-between hover:bg-[#E5E8E8] transition-colors"
      >
        <span className="truncate">
          {isLoading ? "Loading..." : displayText}
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
              placeholder="Search sections..."
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
                  selectedSection === allOptionLabel ? "bg-[#F3F4F6] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
                }`}
              >
                {allOptionLabel}
              </button>
            )}

            {isLoading ? (
              <div className="px-4 py-2 text-[13px] text-[#9C9C9C]">Loading...</div>
            ) : error ? (
              <div className="px-4 py-2 text-[13px] text-red-500">Error loading sections</div>
            ) : filteredSections.length === 0 ? (
              <div className="px-4 py-2 text-[13px] text-[#9C9C9C]">
                {classFilter && classFilter !== "All" 
                  ? `No sections found for ${classFilter}` 
                  : "No sections found"}
              </div>
            ) : (
              filteredSections.map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleSelect(sec)}
                  className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] transition-colors ${
                    selectedSection === sec ? "bg-[#F3F4F6] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
                  }`}
                >
                  {sec}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionFilter;