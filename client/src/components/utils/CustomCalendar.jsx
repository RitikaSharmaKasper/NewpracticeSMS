import React, { useState } from 'react';
import calendarIcon from '../../assets/images/calendar-icon.png';

const CustomCalendar = ({ 
  mode = 'range', // 'single' or 'range'
  selectedDate, 
  startDate, 
  endDate, 
  onSelect, 
  placeholder = "Select Date" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const parseToDate = (dateStr) => {
    if (!dateStr) return null;
    if (typeof dateStr === 'string' && dateStr.includes('/')) {
      const [d, m, y] = dateStr.split('/');
      const date = new Date(y, m - 1, d);
      return isNaN(date.getTime()) ? null : date;
    }
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  };

  const formatDate = (dateStr) => {
    const date = parseToDate(dateStr);
    if (!date) return dateStr || "";
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };

  const handleDateClick = (day) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const dateStr = formatDate(selected);

    if (mode === 'single') {
      onSelect(dateStr);
      setIsOpen(false);
    } else {
      const startObj = parseToDate(startDate);
      const endObj = parseToDate(endDate);

      if (!startDate || (startDate && endDate)) {
        onSelect({ start: dateStr, end: "" });
      } else {
        const currentSelectedObj = selected;
        if (currentSelectedObj < startObj) {
          onSelect({ start: dateStr, end: startDate });
        } else {
          onSelect({ start: startDate, end: dateStr });
        }
      }
    }
  };

  const renderSelectedText = () => {
    if (mode === 'single') {
      return selectedDate ? formatDate(selectedDate) : placeholder;
    } else {
      if (startDate && endDate) {
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
      } else if (startDate) {
        return `From ${formatDate(startDate)}`;
      }
      return placeholder;
    }
  };

  return (
    <div className="relative w-full">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className=" border border-[#E6E6E6] rounded-[9px] px-4 py-2.5 text-[14px] text-[#1C1C1C] flex items-center justify-between gap-3 cursor-pointer min-w-[160px]"
      >
        <span className={(!selectedDate && !startDate) ? "text-[#9C9C9C]" : "text-[#1C1C1C]"}>
          {renderSelectedText()}
        </span>
        <img src={calendarIcon} alt="calendar" className="h-4 w-4" />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute z-50 right-0 mt-2 bg-white border border-[#E8E8E8] rounded-[16px] shadow-2xl p-4 w-[320px]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)));
                  }} 
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  ‹
                </button>
                <span className="text-[14px] font-bold">{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)));
                  }} 
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  ›
                </button>
              </div>
              <button type="button" onClick={() => setIsOpen(false)}>✕</button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d} className="text-[11px] font-bold text-[#9C9C9C]">{d}</div>
              ))}
              
              {Array.from({ length: getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              
              {Array.from({ length: getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => {
                const d = i + 1;
                const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
                const dateStr = formatDate(date);
                
                let active = false;
                let mid = false;

                if (mode === 'single') {
                  active = dateStr === formatDate(selectedDate);
                } else {
                  active = dateStr === formatDate(startDate) || dateStr === formatDate(endDate);
                  const startObj = parseToDate(startDate);
                  const endObj = parseToDate(endDate);
                  if (startObj && endObj && date > startObj && date < endObj) {
                    mid = true;
                  }
                }

                return (
                  <div 
                    key={d} 
                    onClick={() => handleDateClick(d)} 
                    className={`h-6 flex items-center justify-center text-[12px] rounded-full cursor-pointer transition-colors ${
                      active ? 'bg-[#002B36] text-white' : 
                      mid ? 'bg-[#EFF2F2]' : 
                      'hover:bg-gray-100'
                    }`}
                  >
                    {d}
                  </div>
                );
              })}
            </div>

            {mode === 'range' && (
              <div className="flex gap-2 mt-4 border-t pt-4">
                <button 
                  type="button"
                  onClick={() => { 
                    onSelect({ start: "", end: "" }); 
                    setIsOpen(false); 
                  }} 
                  className="flex-1 py-2 text-[12px] border rounded-[8px] hover:bg-gray-50"
                >
                  Reset
                </button>
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)} 
                  className="flex-1 py-2 text-[12px] bg-[#002B36] text-white rounded-[8px] hover:bg-[#003d4d]"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomCalendar;
