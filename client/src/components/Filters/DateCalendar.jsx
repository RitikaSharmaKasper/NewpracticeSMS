// components/DateCalendar.jsx
import React, { useState, useEffect, useRef } from "react";

const DateCalendar = ({
  selectedDate,
  onDateChange,
  placeholder = "Select Date",
  className = "",
  disabled = false,
  minDate = null,
  maxDate = null,
  format = "YYYY-MM-DD", // Display format
  highlightToday = true,
  showWeekends = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);

  // Months and Days arrays
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset to selected date's month when opened
  useEffect(() => {
    if (isOpen && selectedDate) {
      const dateObj = new Date(selectedDate);
      if (!isNaN(dateObj)) {
        setCurrentMonth(dateObj);
      }
    }
  }, [isOpen, selectedDate]);

  // Helper functions
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleSelectDay = (day) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const dayString = String(day).padStart(2, "0");
    const formattedDate = `${year}-${month}-${dayString}`;

    // Check min/max date constraints
    if (minDate && formattedDate < minDate) return;
    if (maxDate && formattedDate > maxDate) return;

    onDateChange(formattedDate);
    setIsOpen(false);
  };

  const isDateDisabled = (day) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const dayString = String(day).padStart(2, "0");
    const dateStr = `${year}-${month}-${dayString}`;

    if (minDate && dateStr < minDate) return true;
    if (maxDate && dateStr > maxDate) return true;
    return false;
  };

  const isToday = (day) => {
    const today = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const dayButtons = [];

    // Empty slots for days before month starts
    for (let i = 0; i < firstDayIndex; i++) {
      dayButtons.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    // Render days
    for (let day = 1; day <= totalDays; day++) {
      const monthString = String(month + 1).padStart(2, "0");
      const dayString = String(day).padStart(2, "0");
      const dateStr = `${year}-${monthString}-${dayString}`;
      const isSelected = selectedDate === dateStr;
      const isTodayDate = isToday(day);
      const disabled = isDateDisabled(day);

      // Check if it's a weekend
      const dateObj = new Date(year, month, day);
      const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

      dayButtons.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={() => !disabled && handleSelectDay(day)}
          disabled={disabled}
          className={`
            w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-colors
            ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}
            ${isSelected 
              ? "bg-[#0B3142] text-white" 
              : isTodayDate && highlightToday
                ? "bg-[#E8F0FE] text-[#0B3142] border border-[#0B3142]"
                : isWeekend && !showWeekends
                  ? "text-[#9C9C9C]"
                  : "text-[#1C1C1C] hover:bg-slate-100"
            }
          `}
        >
          {day}
        </button>
      );
    }

    return dayButtons;
  };

  // Format selected date for display
  const getDisplayValue = () => {
    if (!selectedDate) return placeholder;

    if (format === "YYYY-MM-DD") {
      return selectedDate;
    }

    const dateObj = new Date(selectedDate);
    if (isNaN(dateObj)) return placeholder;

    switch (format) {
      case "DD/MM/YYYY":
        return `${String(dateObj.getDate()).padStart(2, "0")}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${dateObj.getFullYear()}`;
      case "MM/DD/YYYY":
        return `${String(dateObj.getMonth() + 1).padStart(2, "0")}/${String(dateObj.getDate()).padStart(2, "0")}/${dateObj.getFullYear()}`;
      case "DD MMM YYYY":
        return `${String(dateObj.getDate()).padStart(2, "0")} ${months[dateObj.getMonth()].slice(0, 3)} ${dateObj.getFullYear()}`;
      case "MMMM DD, YYYY":
        return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
      default:
        return selectedDate;
    }
  };

  return (
    <div ref={calendarRef} className={`relative ${className}`}>
      {/* Calendar Toggle Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] 
          text-left outline-none transition flex justify-between items-center
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-[#0B3142]"}
          ${isOpen ? "border-[#0B3142]" : ""}
        `}
      >
        <span className={selectedDate ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
          {getDisplayValue()}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="w-4 h-4 text-[#9C9C9C]"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h40v-40h80v40h320v-40h80v40h40q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
        </svg>
      </button>

      {/* Calendar Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute left-0 z-50 mt-1 bg-white border border-[#E6E6E6] rounded-[16px] shadow-xl p-4 w-[280px]">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm transition-colors"
            >
              &lt;
            </button>
            <span className="text-sm font-semibold text-[#1C1C1C]">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm transition-colors"
            >
              &gt;
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {daysOfWeek.map(day => (
              <span key={day} className="text-[11px] font-semibold text-[#9C9C9C] uppercase">
                {day}
              </span>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {renderCalendarDays()}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex justify-between mt-3 pt-2 border-t border-[#E6E6E6]">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const formatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
                if (!isDateDisabled(today.getDate())) {
                  onDateChange(formatted);
                  setIsOpen(false);
                }
              }}
              className="text-xs text-[#0B3142] font-medium hover:underline transition"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => {
                onDateChange("");
                setIsOpen(false);
              }}
              className="text-xs text-[#9C9C9C] font-medium hover:underline transition"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateCalendar;