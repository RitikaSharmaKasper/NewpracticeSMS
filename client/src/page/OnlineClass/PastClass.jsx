import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiSearch, HiEye } from 'react-icons/hi';
import dummyData from "../../data/data.json";
import usericon from "../../assets/images/usericon.png";
import timeicon from "../../assets/images/time-icon.png";
import calendar_big from "../../assets/images/calendar-icon.png"; // We can reuse or use a generic one
import eye from "../.././assets/images/eye.png";
import nodata_foundIcon from "../../assets/images/absence.png";
import api from '../../config/axiosInstance';
import { toast } from 'react-toastify';
const PastClass = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [pastClasses, setPastClasses] = useState([]);

  useEffect(() => {
    const loadData = async() => {
     try {
      const responce = await api.get(`/onlineclass/?search=${searchQuery}&status=Past`)
      setPastClasses(responce.data?.data)
     } catch (error) {
      toast.error(error?.message || "something went worg")
     }
    };

    loadData();
    window.addEventListener('focus', loadData);
    return () => window.removeEventListener('focus', loadData);
  }, [searchQuery]);


  // const formatDateLabel = (dateStr) => {
  //   if (!dateStr) return { month: '', day: '', year: '' };
  //   try {
  //     const parts = dateStr.split(' ');
  //     let year, month, day;
  //     if (parts[0].length === 3) {
  //       [year, month, day] = parts.map(Number);
  //     } else {
  //       [day, month, year] = parts.map(Number);
  //     }
  //     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //     return {
  //       month: months[month - 1],
  //       day: day,
  //       year: year
  //     };
  //   } catch {
  //     return { month: '', day: '', year: '' };
  //   }
  // };

  const formatDateLabel = (dateStr) => {
  if (!dateStr) return { month: "", day: "", year: "" };

  try {
    const [day, month, year] = dateStr.split(" ");

    return {
      month,
      day,
      year,
    };
  } catch {
    return { month: "", day: "", year: "" };
  }
};

  return (
    <div className="p-2 lg:p-1">
      <main className="flex-1 bg-white border border-black/10 shadow-[0_5px_10px_rgb(0,0,0,0.15)] rounded-[16px] p-4 lg:p-6">
        <div className="mb-8 px-2 text-left">
          <h1 className="text-[20px] font-semibold text-[#1C1C1C]">Past Classes</h1>
          <p className="text-[16px] text-[#9C9C9C] mt-1">View past classes and recordings</p>
        </div>

        <div className="relative mb-8 px-1">
          <HiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-[#9C9C9C] text-[18px]" />
          <input
            type="text"
            placeholder="Search by title, subject, teacher, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-3 bg-[#F3F4F6] border border-[#E8E8E8] rounded-xl text-[#696969] text-[14px] focus:outline-none"
          />
        </div>

        <div className="space-y-6">
          {pastClasses.length > 0 ? (
            pastClasses.map((cls) => {
              const dateInfo = formatDateLabel(cls.startDate);
              return (
                <div
                  key={cls.id}
                  className="bg-white border border-[#E6E6E6] rounded-[16px] p-6 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 transition-all "
                >
                  {/* Left Calendar Part */}
                  <div className="flex flex-col items-start lg:items-center min-w-[100px] lg:pr-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      className="h-5 w-5 mb-2"
                    >
                      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h40v-40h80v40h320v-40h80v40h40q33 0 56.5 23.5T840-760v560q0-33-23.5 33.5T760-120H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                    </svg>
                    <div className="text-left lg:text-center">
                      <p className="font-medium text-[#101828] text-[14px]">{dateInfo.month} {dateInfo.day}</p>
                      <p className="text-[12px] text-[#4A5565]">{dateInfo.year}</p>
                    </div>
                    <span className="mt-2 bg-[#D5EBDD] border border-[#A0D5B4]  text-[#009638] rounded-xl text-[12px] px-3 py-0.5 rounded-full font-medium">Completed</span>
                  </div>

                  {/* Middle Content Part */}
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-[#101828] text-[18px] mb-1">{cls.classTitle}</h3>
                    <p className="text-[14px] text-[#4A5565] mb-4 line-clamp-1">{cls.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[12px] bg-[#EEEEEE] text-[#696969] px-3 py-1 rounded-[9px] font-semibold">{cls.subject}</span>
                      <span className="text-[11px] bg-white text-[#696969] px-3 py-0 rounded-[9px] border border-[#9C9C9C] font-medium uppercase tracking-tight">{cls.className} - {cls.section}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-3 gap-x-20 text-[14px] text-[#4A5565] font-normal">
                      <div className="flex items-center gap-2">
                        <img src={usericon} alt="User" className="h-4 w-4 opacity-70" /> {cls.teacher}
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={timeicon} alt="Time" className="h-4 w-4 opacity-70" /> {cls.startTime} - {cls.endTime || 'Ongoing'}
                      </div>
                      {/* <div className="flex items-center gap-2 text-[#4A5565]">
                        <img src={usericon} alt="User" className="h-4 w-4 opacity-70" /> 32 students attended
                      </div> */}
                    </div>
                  </div>

                  {/* Right Button Part */}
                  <div className="w-full lg:w-auto lg:min-w-[150px] flex justify-start lg:justify-end">
                    <button
                      onClick={() => navigate(`/class-details/${cls._id}`, { state: { from: '/past-class' } })}
                      className="w-full lg:w-auto flex items-center justify-center gap-2 px-9 py-3 bg-white border border-[#E8E8E8] text-[#1C1C1C] rounded-[9px] font-normal text-[16px] hover:bg-gray-50 transition-colors"
                    >
                      <div className="h-5 w-5 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          className="h-4 w-4 object-contain"
                        >
                          <path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-56q-47 0-80.5-33.5T366-480q0-47 33.5-80.5T480-594q47 0 80.5 33.5T594-480q0 47-33.5 80.5T480-368Zm0 224q-154 0-281.5-85.5T38-480q71-143 198.5-228.5T480-794q154 0 281.5 85.5T922-480q-71 143-198.5 228.5T480-144Zm0-60q130 0 238.5-70T862-480q-54-134-162.5-204T480-738q-130 0-238.5 70T98-480q54 134 162.5 204T480-204Zm0-276Z" />
                        </svg>
                      </div> View Details
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-[14px]  text-center ] p-17   flex flex-col items-center justify-center gap-[8px]">
              <img
                className="w-[5%]" // Replaces style={{ width: "5%" }}
                src={nodata_foundIcon}
                alt="nodata"
              />
              <h3 className="text-xl font-semibold text-[#1C1C1C]">No past classes found</h3>
              <p className="text-[#6B7280]">When a class ends, it will appear here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PastClass;
