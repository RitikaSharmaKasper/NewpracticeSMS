import React, { useState, useEffect, useRef } from "react";

// CustomCalendar Component
const CustomCalendar = ({ label, value, onChange, placeholder, popDirection = "down" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectDay = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dayString = String(day).padStart(2, "0");
    onChange(`${dayString}/${month}/${year}`);
    setIsOpen(false);
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const monthString = String(month + 1).padStart(2, "0");
      const dayString = String(day).padStart(2, "0");
      const combined = `${dayString}/${monthString}/${year}`;
      const isSelected = value === combined;

      days.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={() => handleSelectDay(day)}
          className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-colors cursor-pointer
            ${isSelected 
              ? "bg-[#0B3142] text-white" 
              : "text-[#1C1C1C] hover:bg-slate-100"
            }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="relative" ref={calendarRef}>
      <label className="block text-[14px] font-semibold text-[#1C1C1C] mb-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-[16px] bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center"
        >
          <span className={value ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
            {value ? value : placeholder}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-4 h-4 text-[#9C9C9C]">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h40v-40h80v40h320v-40h80v40h40q33 0 56.5 23.5T840-760v560q0-33-23.5 33.5T760-120H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
          </svg>
        </button>

        {isOpen && (
          <div className={`absolute right-0 z-50 bg-white border border-[#E6E6E6] rounded-[14px] shadow-xl p-2 w-[250px] ${popDirection === "up" ? "bottom-full mb-1" : "top-full mt-1"}`}>
            <div className="flex justify-between items-center mb-3">
              <button type="button" onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm">&lt;</button>
              <span className="text-sm font-semibold text-[#1C1C1C]">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
              <button type="button" onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {daysOfWeek.map(day => (
                <span key={day} className="text-[11px] font-semibold text-[#9C9C9C] uppercase">{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-0">
              {renderDays()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const GenerateLibraryCardModal = ({ isOpen, onClose, onSubmit, existingMembers }) => {
  const [formData, setFormData] = useState({
    role: "",
    className: "",
    section: "",
    memberId: "",
    memberName: "",
    issueDate: "",
    expiryDate: "",
    admissionNo: "",
    empId: "",
    validityPeriod: "1 Year"
  });

  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [isValidityOpen, setIsValidityOpen] = useState(false);
  
  const roleRef = useRef(null);
  const classRef = useRef(null);
  const sectionRef = useRef(null);
  const memberRef = useRef(null);
  const validityRef = useRef(null);

  const validityOptions = [
    { value: "3 Months", label: "3 Months", months: 3 },
    { value: "6 Months", label: "6 Months", months: 6 },
    { value: "9 Months", label: "9 Months", months: 9 },
    { value: "1 Year", label: "1 Year", months: 12 }
  ];

  // Convert DD/MM/YYYY to YYYY-MM-DD for calculation
  const convertToISODate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateStr;
  };

  // Calculate expiry date based on issue date and validity period
  const calculateExpiryDate = (issueDateStr, validityMonths) => {
    if (!issueDateStr) return "";
    const isoDate = convertToISODate(issueDateStr);
    const date = new Date(isoDate);
    date.setMonth(date.getMonth() + validityMonths);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Set default dates and validity
  useEffect(() => {
    if (isOpen) {
      const today = new Date();
      const day = today.getDate().toString().padStart(2, '0');
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const year = today.getFullYear();
      const formattedToday = `${day}/${month}/${year}`;
      
      const validityOption = validityOptions.find(v => v.value === "1 Year");
      const expiryDate = calculateExpiryDate(formattedToday, validityOption.months);
      
      setFormData(prev => ({
        ...prev,
        issueDate: formattedToday,
        expiryDate: expiryDate,
        validityPeriod: "1 Year"
      }));
    }
  }, [isOpen]);

  // Update expiry date when issue date or validity period changes
  useEffect(() => {
    if (formData.issueDate && formData.validityPeriod) {
      const validityOption = validityOptions.find(v => v.value === formData.validityPeriod);
      if (validityOption) {
        const newExpiryDate = calculateExpiryDate(formData.issueDate, validityOption.months);
        setFormData(prev => ({ ...prev, expiryDate: newExpiryDate }));
      }
    }
  }, [formData.issueDate, formData.validityPeriod]);

  const filterMembers = (members) => {
    if (!formData.role) return members;
    
    if (formData.role === "Student") {
      return members.filter(member => 
        member.role === "Student" || 
        !member.role || 
        member.class !== undefined
      );
    }
    if (formData.role === "Staff") {
      return members.filter(member => 
        member.role === "Staff" || 
        member.empId !== undefined
      );
    }
    return members;
  };

  const filteredMembers = filterMembers(existingMembers);

  const handleMemberSelect = (member) => {
    setFormData({
      ...formData,
      memberId: member.memberId || member.id,
      memberName: member.memberName || member.name,
      admissionNo: member.admissionNo || "",
      empId: member.empId || "",
      className: member.class || formData.className,
      section: member.section || formData.section
    });
    setIsMemberOpen(false);
  };

  const generateCardNumber = () => {
    const prefix = formData.role === "Student" ? "LIB-STU" : "LIB-STAFF";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}${random}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role || !formData.memberId || !formData.memberName) {
      alert("Please fill all required fields");
      return;
    }

    // Format dates for display
    const formatDateForFinal = (dateStr) => {
      if (!dateStr) return "";
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
      }
      return dateStr;
    };

    const newCard = {
      id: generateCardNumber(),
      memberId: formData.memberId,
      memberName: formData.memberName,
      role: formData.role,
      class: formData.className,
      section: formData.section,
      issueDate: formatDateForFinal(formData.issueDate),
      expiryDate: formatDateForFinal(formData.expiryDate),
      issueDateRaw: formData.issueDate,
      expiryDateRaw: formData.expiryDate,
      validityPeriod: formData.validityPeriod,
      admissionNo: formData.admissionNo,
      empId: formData.empId,
      generatedAt: new Date().toISOString(),
      status: "Active"
    };

    onSubmit(newCard);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setFormData({
      role: "",
      className: "",
      section: "",
      memberId: "",
      memberName: "",
      issueDate: "",
      expiryDate: "",
      admissionNo: "",
      empId: "",
      validityPeriod: "1 Year"
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[0.5px] flex items-center justify-center p-3 md:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-[16px] w-full max-w-[48rem] max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-[#E6E6E6] relative animate-scaleUp">
        
        {/* Header */}
        <div className="bg-white text-slate-800 pt-4 pb-1 px-4 relative flex justify-between items-center select-none">
          <div>
            <h3 className="text-[18px] font-semibold font-[600] text-[#1C1C1C]">Generate Library Card</h3>
            <p className="text-[14px] text-[#9C9C9C] font-normal -mt-[2px]">Create a new library card for a member</p>
          </div>
          <button 
            type="button" 
            onClick={() => { handleReset(); onClose(); }} 
            className="text-[#1C1C1C] rounded-full transition cursor-pointer flex items-center justify-center w-8 h-8 hover:bg-gray-100"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overflow-x-visible pt-5 pr-5 pl-5 pb-8 space-y-4">
          
          {/* Role, Class, Section - Dynamic grid based on role */}
          <div className={`grid gap-3 relative ${formData.role === "Student" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"}`}>
            {/* Role */}
            <div className="relative" ref={roleRef}>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] mb-1">Role *</label>
              <button
                type="button"
                onClick={() => {
                  setIsMemberOpen(false);
                  setIsValidityOpen(false);
                  setIsRoleOpen(!isRoleOpen);
                }}
                className="w-full px-4 py-3 text-[16px] bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center"
              >
                <span className={formData.role ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
                  {formData.role || "Select role"}
                </span>
                <svg className={`w-4 h-4 text-[#9C9C9C] transition-transform duration-200 ${isRoleOpen ? "" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isRoleOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[12px] shadow-lg overflow-hidden py-1">
                  {["Student", "Staff"].map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, role, className: "", section: "", memberId: "", memberName: "" });
                        setIsRoleOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-[16px] transition-colors block ${
                        formData.role === role ? "bg-[#F5F5F5] text-[#1C1C1C] font-medium" : "text-[#4A4A4A] hover:bg-[#F9F9F9]"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Class - Only show when Student is selected */}
            {formData.role === "Student" && (
              <div className="relative" ref={classRef}>
                <label className="block text-[14px] font-semibold text-[#1C1C1C] mb-1">Class</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsMemberOpen(false);
                    setIsValidityOpen(false);
                    setIsClassOpen(!isClassOpen);
                  }}
                  className="w-full px-4 py-3 text-[16px] bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center"
                >
                  <span className={formData.className ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
                    {formData.className || "Select class"}
                  </span>
                  <svg className="w-4 h-4 text-[#9C9C9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isClassOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[12px] shadow-lg overflow-hidden py-1">
                    {["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"].map(cls => (
                      <button key={cls} type="button" onClick={() => { setFormData({ ...formData, className: cls }); setIsClassOpen(false); }} className="w-full text-left px-4 py-3 text-[16px] hover:bg-[#F9F9F9] block">{cls}</button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Section - Only show when Student is selected */}
            {formData.role === "Student" && (
              <div className="relative" ref={sectionRef}>
                <label className="block text-[14px] font-semibold text-[#1C1C1C] mb-1">Section</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsMemberOpen(false);
                    setIsValidityOpen(false);
                    setIsSectionOpen(!isSectionOpen);
                  }}
                  className="w-full px-4 py-3 text-[16px] bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center"
                >
                  <span className={formData.section ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
                    {formData.section || "Select section"}
                  </span>
                  <svg className="w-4 h-4 text-[#9C9C9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isSectionOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[12px] shadow-lg overflow-hidden py-1">
                    {["A", "B", "C", "D", "E", "F"].map(sec => (
                      <button key={sec} type="button" onClick={() => { setFormData({ ...formData, section: sec }); setIsSectionOpen(false); }} className="w-full text-left px-4 py-3 text-[16px] hover:bg-[#F9F9F9] block">{sec}</button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Member Selection */}
          <div className="relative" ref={memberRef}>
            <label className="block text-[14px] font-semibold text-[#1C1C1C] mb-1">Member *</label>
            <button
              type="button"
              onClick={() => {
                setIsRoleOpen(false);
                setIsValidityOpen(false);
                setIsMemberOpen(!isMemberOpen);
              }}
              className="w-full px-4 py-3 text-[16px] bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center"
              disabled={!formData.role}
            >
              <span className={formData.memberName ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
                {formData.memberName || (formData.role ? `Select ${formData.role.toLowerCase()}` : "Select role first")}
              </span>
              <svg className="w-4 h-4 text-[#9C9C9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMemberOpen && filteredMembers.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[12px] shadow-lg overflow-hidden max-h-[200px] overflow-y-auto">
                {filteredMembers.map(member => (
                  <button
                    key={member.memberId || member.id}
                    type="button"
                    onClick={() => handleMemberSelect(member)}
                    className="w-full text-left px-4 py-3 text-[14px] hover:bg-[#F9F9F9] block border-b border-[#E6E6E6] last:border-0"
                  >
                    <div className="font-semibold text-[#1C1C1C]">{member.memberName || member.name}</div>
                    <div className="text-[12px] text-[#9C9C9C]">{member.memberId || member.id}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Validity Period */}
          <div className="relative" ref={validityRef}>
            <label className="block text-[14px] font-semibold text-[#1C1C1C] mb-1">Validity Period *</label>
            <button
              type="button"
              onClick={() => {
                setIsRoleOpen(false);
                setIsMemberOpen(false);
                setIsValidityOpen(!isValidityOpen);
              }}
              className="w-full px-4 py-3 text-[16px] bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center"
            >
              <span className="text-[#1C1C1C]">{formData.validityPeriod}</span>
              <svg className={`w-4 h-4 text-[#9C9C9C] transition-transform duration-200 ${isValidityOpen ? "" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isValidityOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[12px] shadow-lg overflow-hidden py-1">
                {validityOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, validityPeriod: option.value });
                      setIsValidityOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-[16px] transition-colors block ${
                      formData.validityPeriod === option.value ? "bg-[#F5F5F5] text-[#1C1C1C] font-medium" : "text-[#4A4A4A] hover:bg-[#F9F9F9]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Issue Date & Expiry Date */}
          <div className="grid grid-cols-2 gap-4">
            <CustomCalendar 
              label="Issue Date *"
              placeholder="DD/MM/YYYY"
              value={formData.issueDate}
              onChange={(val) => setFormData({ ...formData, issueDate: val })}
              popDirection="up"
            />

            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] mb-1">Expiry Date *</label>
              <input
                type="text"
                value={formData.expiryDate}
                readOnly
                className="w-full px-4 py-3 text-[16px] bg-gray-50 border border-[#E6E6E6] rounded-[12px] outline-none text-[#1C1C1C] cursor-not-allowed"
              />
              <p className="text-[12px] text-[#9C9C9C] mt-1">
                Auto-calculated based on issue date and validity period
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => { handleReset(); onClose(); }}
              className="py-2 h-[42px] min-w-[100px] rounded-[8px] border border-[#9C9C9C] bg-white px-4 text-[16px] font-semibold text-[#696969] transition cursor-pointer hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[42px] min-w-[120px] rounded-[8px] bg-[#0B3142] px-5 text-[16px] font-semibold text-white hover:bg-[#15465c] transition cursor-pointer"
            >
              Generate Card
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default GenerateLibraryCardModal;