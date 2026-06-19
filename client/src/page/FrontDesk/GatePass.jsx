import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiSearch, HiOutlineExclamationCircle } from 'react-icons/hi';

import studentData from "../../data/student.json";
import phone from "../../assets/images/meeting.png"
// Using your specific assets
import usericon from "../../assets/images/usericon.png";
import timeicon from "../../assets/images/time-icon.png";
import nodata_foundIcon from "../../assets/images/absence.png";
import calendar from "../../assets/images/calendar-icon.png"
import purpose from "../../assets/images/purpose.png"

import id from  "../../assets/images/id.png";
import PrintGatePass from './Modals/PrintGatePass';
const GatePass = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [student, setStudents] = useState([]);
const [selectedStudent,setSelectedStudent]=useState(null);

const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
const [autoPrint, setAutoPrint] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('sms_student_data_v3');

    if (saved) {

      const localData = JSON.parse(saved);
      setStudents(localData.filter(s => 
        (s.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (s.phone || "").includes(searchQuery)
      ));

    } else {
      const filtered = studentData.filter(s => 
        (s.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (s.phone || "").includes(searchQuery)
      );

      setStudents(filtered);
      localStorage.setItem('sms_student_data_v3', JSON.stringify(studentData));

    }

  }, [searchQuery, studentData]);

  const [isDateOpen, setIsDateOpen] = useState(false);


  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewDate, setViewDate] = useState(new Date());
  
 




  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);



  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery,  startDate, endDate]);

  // Calendar Helpers
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  
  const handleDateClick = (day) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const year = selected.getFullYear();
    const month = String(selected.getMonth() + 1).padStart(2, '0');
    const d = String(selected.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${d}`;
    
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateStr);
      setEndDate("");
    } else {
      if (new Date(dateStr) < new Date(startDate)) {
        setEndDate(startDate);
        setStartDate(dateStr);
      } else {
        setEndDate(dateStr);
      }
    }
  };

  const filteredStudents = useMemo(() => {
    const parseDateStr = (dateStr) => {
      if (!dateStr) return null;
      const [day, month, year] = dateStr.split('/');
      return new Date(year, month - 1, day);
    };

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(23, 59, 59, 999);

    return student.filter((student) => {
      const isInside = !student.checkOutTime;
    

      let dateMatch = true;
      if (start || end) {
        const vDate = parseDateStr(student.date);
        if (vDate) {
          if (start && vDate < start) dateMatch = false;
          if (end && vDate > end) dateMatch = false;
        } else {
          dateMatch = false;
        }
      }
      return dateMatch;
    });
  }, [startDate, endDate, student]);


  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(start, start + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md overflow-visible">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-7 px-2">
        <div className="text-left">
          <h1 className="text-[18px] font-semibold text-[#1C1C1C]">Gate Pass Management</h1>
          <p className="text-[14px] sm:text-[16px] text-[#9C9C9C]">Issue and manage entry/exit passes</p>
        </div>
        <button 
          onClick={() => navigate('/frontdesk/issue_gate_pass')}
          className="w-full sm:w-auto bg-[#0B3142] text-white px-4 py-3 h-10  rounded-[8px] text-[14px] font-semibold flex items-center justify-center gap-3 transition-all hover:bg-[#15465c]"
        >
          <span className="text-[20px] -mt-[3px] ">+</span>Issue Gate Pass
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 px-0">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
          <input
            type="text"
            placeholder="Search Students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-[9px] text-[14px] focus:outline-none"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
         
          <div className="relative">
            <div 
              onClick={() => setIsDateOpen(!isDateOpen)}
              className="bg-[#EFF2F2]  rounded-[9px]  px-4 py-2.5 text-[12px] text-[#1C1C1C] flex items-center justify-between gap-3 min-w-[160px] cursor-pointer"
            >
              <span>
                {startDate && endDate 
                  ? `${new Date(startDate).toLocaleDateString('en-GB')} - ${new Date(endDate).toLocaleDateString('en-GB')}`
                  : startDate ? `From ${new Date(startDate).toLocaleDateString('en-GB')}` : new Date().toLocaleDateString('en-GB')}
              </span>
              <img src={calendar} alt="calendar" className="h-4 w-4" />
            </div>
            {isDateOpen && (
              <div className="absolute z-50 right-0 mt-2 bg-white border border-[#E6E6E6] rounded-[16px] shadow-2xl p-4 w-[320px]">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))} className="p-1 hover:bg-gray-100 rounded">‹</button>
                    <span className="text-[14px] font-bold">{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))} className="p-1 hover:bg-gray-100 rounded">›</button>
                  </div>
                  <button onClick={() => setIsDateOpen(false)}>✕</button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="text-[11px] font-bold text-[#9C9C9C]">{d}</div>)}
                  {Array.from({ length: getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => <div key={i} />)}
                  {Array.from({ length: getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => {
                    const d = i + 1;
                    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
                    const cur = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
                    const active = cur === startDate || cur === endDate;
                    const mid = startDate && endDate && cur > startDate && cur < endDate;
                    return (
                      <div key={d} onClick={() => handleDateClick(d)} className={`h-8 flex items-center justify-center text-[12px] rounded-full cursor-pointer ${active ? 'bg-[#002B36] text-white' : mid ? 'bg-[#EFF2F2]' : 'hover:bg-gray-100'}`}>
                        {d}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2 mt-4 border-t pt-4">
                  <button onClick={() => { setStartDate(""); setEndDate(""); setIsDateOpen(false); }} className="flex-1 py-2 text-[12px] border rounded-[8px]">Reset</button>
                  <button onClick={() => setIsDateOpen(false)} className="flex-1 py-2 text-[12px] bg-[#002B36] text-white rounded-[8px]">Apply</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {paginatedStudents.length > 0 ? (
          paginatedStudents.map((student) => (
          
            <div key={student.id} className="border border-[#E6E6E6] rounded-[11px] p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <div className="flex flex-col gap-2 mb-2 pl-2 pt-2">
                  <h3 className="font-semibold text-[#0A0A0A] text-[18px]">{student.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[#696969] border border-[#E6E6E6] text-[12px] px-2 py-0.5 rounded-[9px]">{student.studentType}</span>
                   
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 max-w-2xl pl-2">
                  <div className="flex items-center gap-2 text-[14px] text-[#717182]"><img src={id} className="h-4 w-4" />ID: {student.id}</div>
                  <div className="flex items-center gap-2 text-[14px] text-[#717182]"><img src={timeicon} className="h-4 w-4" />Issued: {student.issuedAt|| '-'}</div>
                  <div className="flex items-center gap-2 text-[14px] text-[#717182]"><img src={purpose} className="h-4 w-4" />Reason: {student.reason}</div>
                  <div className="flex items-center gap-2 text-[14px] text-[#717182]"><img src={timeicon} className="h-4 w-4" />Valid till: {student.validTill|| '-'}</div>
                </div>
              </div>
              
                



                <div className="flex flex-col gap-2 mt-6 md:mt-0 min-w-[105px]">
                  <button 
                    onClick={() => { 
                      setSelectedStudent(student); 
                      setAutoPrint(false);
                      setIsPrintModalOpen(true); 
                    }} 
                    className="      py-1.5 border border-[#E6E6E6] rounded-[6px] text-[14px] font-semibold text-[#1C1C1C] hover:bg-gray-50 transition-all"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => { 
                      setSelectedStudent(student); 
                      setAutoPrint(true);
                      setIsPrintModalOpen(true); 
                    }} 
                    className="bg-[#0B3142] text-white py-1.5 rounded-[6px] text-[14px] font-semibold"
                  >
                    Print
                  </button>
                </div>
              
            </div>
          ))
        ) : (
          <div className="py-16 text-center flex flex-col items-center">
            <img src={nodata_foundIcon} className="w-12 mb-3 opacity-20" />
            <p className="text-gray-400 text-sm">No students found</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-[#9C9C9C] px-2 pt-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div 
              onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
              className="flex items-center gap-2 bg-[#F9F9F9] border border-[#E8E8E8] rounded-[8px] px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
            >
              <span className="text-[#1C1C1C] font-bold text-[14px]">{itemsPerPage}</span>
              <span className={`text-[10px] text-[#696969] transition-transform ${isItemsPerPageOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>
            
            {isItemsPerPageOpen && (
              <div className="absolute bottom-full mb-2 left-0 w-20 bg-white border border-[#696969] rounded-[8px] shadow-xl z-50 overflow-hidden">
                {[5, 10, 20, 50].map((val) => (
                  <div 
                    key={val}
                    onClick={() => {
                      setItemsPerPage(val);
                      setIsItemsPerPageOpen(false);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 text-[12px] text-[#696969] hover:bg-[#F3F4F6] cursor-pointer text-center font-normal"
                  >
                    {val}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className="text-[14px] text-[#696969]">Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} results</span>
        </div>
        <div className="flex items-center gap-4">

          <div onClick={() => handlePageChange(currentPage - 1)} className={`cursor-pointer ${currentPage === 1 ? 'opacity-30' : ''}`}>‹ Previous</div>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <span key={p} onClick={() => handlePageChange(p)} className={`w-7 h-7 flex items-center justify-center rounded-[8px] cursor-pointer ${currentPage === p ? 'bg-[#002B36] text-white' : ''}`}>{p}</span>
            ))}
          </div>
          <div onClick={() => handlePageChange(currentPage + 1)} className={`cursor-pointer ${currentPage === totalPages ? 'opacity-30' : ''}`}>Next ›</div>
        </div>
      </div>
      
<PrintGatePass
  open={isPrintModalOpen} 
  onClose={() => setIsPrintModalOpen(false)} 
  studentData={selectedStudent} 
  autoPrint={autoPrint}
/>

    </div>
  );
};

export default GatePass;
