import React, { useState, useEffect, useRef } from 'react';
import ClassCard from './ClassCard';
import CancelClassModal from './Modals/CancelClassModal';
import dummyData from "../../data/data.json"
import { useNavigate } from 'react-router-dom';
import { HiDotsVertical, HiSearch } from 'react-icons/hi';
import youtube from "../../assets/images/youtube.png";
import schedulenew from "../../assets/images/sechedulenew.png"
import usericon from "../../assets/images/usericon.png";
import timeicon from "../../assets/images/time-icon.png"
import calendaricon from "../../assets/images/calendar-icon.png"
import editted from "../../assets/images/editted.png"
import copy from "../../assets/images/copy.png"
import cancel from "../../assets/images/cancel.png"
import nodata_foundIcon from "../../assets/images/absence.png"
import api from '../../config/axiosInstance';
import { toast } from 'react-toastify';
const ScheduleClasses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [allClasses, setAllClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [showMenuId, setShowMenuId] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [classToCancel, setClassToCancel] = useState(null);
  const menuRef = useRef(null);

  const loadData = async () => {
    try {
      const status = activeTab === "All" ? "" : activeTab;
      const response = await api.get(
        `/onlineclass/?search=${searchQuery}&status=${status}`
      );

      const sortedData = [...response.data.data].sort((a, b) => {
        if (a.status === "Live" && b.status !== "Live") return -1;
        if (a.status !== "Live" && b.status === "Live") return 1;
        return 0;
      });

      setAllClasses(sortedData);
    } catch (error) {
      toast.error(error?.message || "onlineclass data fetching")

    }

  };

  useEffect(() => {
    loadData();
  }, [activeTab, searchQuery]);

  useEffect(() => {
    loadData();
    window.addEventListener('focus', loadData);
    return () => window.removeEventListener('focus', loadData);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action, classId) => {
    if (action === 'Cancel') {
      const cls = allClasses.find(c => c._id === classId);
      if (cls) {
        setClassToCancel(cls);
        setIsCancelModalOpen(true);
      }
    }
    setShowMenuId(null);
  };

  // useEffect(() => {
  //   const now = new Date();
  //   const parseDateStr = (dateStr, timeStr) => {
  //     if (!dateStr) return null;
  //     let hours = 0, minutes = 0;
  //     try {
  //       if (timeStr) {
  //         if (timeStr.includes('AM') || timeStr.includes('PM')) {
  //           const [time, modifier] = timeStr.split(' ');
  //           let [h, m] = time.split(':').map(Number);
  //           if (h === 12) h = 0;
  //           if (modifier === 'PM') h += 12;
  //           hours = h; minutes = m;
  //         } else {
  //           const [h, m] = timeStr.split(':').map(Number);
  //           hours = h || 0; minutes = m || 0;
  //         }
  //       }
  //       const parts = dateStr.split('-');
  //       if (parts.length !== 3) return null;
  //       let year, month, day;
  //       if (parts[0].length === 4) {
  //         [year, month, day] = parts.map(Number);
  //       } else {
  //         [day, month, year] = parts.map(Number);
  //       }
  //       return new Date(year, month - 1, day, hours, minutes, 0);
  //     } catch (err) {
  //       return null;
  //     }
  //   };

  //   const processed = allClasses.map(c => {
  //     const startDateTime = parseDateStr(c.startDate, c.startTime);
  //     let endDateTime;
  //     if (c.endTime) {
  //       const eDate = c.tillDate || c.startDate;
  //       endDateTime = parseDateStr(eDate, c.endTime);
  //     } else {
  //       // User Logic: If no end time, stay Live/Scheduled for 24 hours from start
  //       endDateTime = new Date(startDateTime?.getTime() + 24 * 60 * 60 * 1000);
  //     }

  //     let status = "Scheduled";
  //     if (startDateTime && now < startDateTime) {
  //       status = "Scheduled";
  //     } else if (startDateTime && now >= startDateTime && now <= endDateTime) {
  //       status = "Live";
  //     } else if (endDateTime && now > endDateTime) {
  //       status = "Past";
  //     }
  //     return { ...c, status: status };
  //   });

  //   const filtered = processed.filter(c => {
  //     const matchesSearch = c.classTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                          (c.subject && c.subject.toLowerCase().includes(searchQuery.toLowerCase()));

  //     if (activeTab === 'All') {
  //       return matchesSearch && (c.status === 'Live' || c.status === 'Scheduled');
  //     }
  //     return matchesSearch && c.status === activeTab;
  //   });

  //   setFilteredClasses(filtered);
  // }, [allClasses, searchQuery, activeTab]);

  return (
    <div className="schedule-classes-page p-2 lg:p-1">
      <main className="flex-1 bg-white border border-black/10 shadow-[0_5px_10px_rgb(0,0,0,0.15)] rounded-[16px] p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 px-2">
          <div className="text-left">
            <h1 className="text-[20px] font-semibold text-[#1C1C1C]">Live Classes</h1>
            <p className="text-[16px] text-[#9C9C9C] mt-1 font-normal font-400">View all scheduled classes</p>
          </div>
          <button
            onClick={() => navigate('/add-schedule-class', { state: { from: '/schedule-class' } })}
            className="flex items-center justify-center gap-2 bg-[#0B3142] text-white px-5 py-2.5 rounded-lg text-[16px] font-semibold transition hover:bg-[#15465c] w-full sm:w-auto"
          >
            <img src={schedulenew} alt="Schedule Icon" className="h-4 w-5 object-contain" />
            Schedule New Class
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-8 px-1">
          <div className="relative flex-1 max-w-[1000px] w-full">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C9C9C] text-[15px]" />
            <input
              type="text"
              placeholder="Search by title, subject, teacher, or class..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-xl text-[#696969] text-[15px] focus:outline-none transition-colors"
            />
          </div>

          <div className="flex bg-[linear-gradient(to_right,#F5F2ED,#F4F5F0,#EDF5F3)] p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar mt-4 md:mt-0">
            {['All', 'Live', 'Scheduled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-6 md:px-12 py-1 rounded-xl text-[15px] font-medium transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#F5F7F7] border border-[#FFFFFF] shadow-md text-[#0B3142]' : 'text-[#6B7280]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {allClasses.length > 0 ? (
            allClasses.map((cls) => (
              <div
                key={cls._id}
                onClick={() => navigate(`/class-details/${cls._id}`, { state: { from: '/schedule-class' } })}
                className={`relative bg-white border ${cls.status === 'Live' ? 'border-[#FF0000]' : 'border-[#E6E6E6]'
                  } rounded-[16px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between transition-all cursor-pointer group`}
              >
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start sm:items-center flex-1 w-full">
                  <div className="min-w-[120px] text-left w-full sm:w-auto">
                    {cls.status === 'Live' ? (
                      <div className="flex flex-col gap-2 mt-0 lg:mt-[-45px]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#E7000B] rounded-full"></span>
                          <span className="text-[#E7000B] text-[14px] font-semibold">Live Now</span>
                        </div>
                        <span className="bg-[#D4183D] text-white text-[12px] px-2 py-1 rounded-[8px] uppercase font-400 w-fit">LIVE</span>
                      </div>
                    ) : cls.status === 'Past' ? (
                      <span className="inline-block bg-[#F3F4F6] text-[#6B7280] text-[14px]  px-2 py-0.5 rounded-[8px]  font-medium border border-[#E5E7EB] w-fit mt-0 lg:mt-[-25px]">
                        Past
                      </span>
                    ) : (
                      <span className="inline-block bg-[#EEF2FF] text-[#4F39F6] text-[14px]  px-2 py-0.5 rounded-[8px]  font-medium border border-[#E0E7FF] w-fit mt-0 lg:mt-[-25px]">
                        Scheduled
                      </span>
                    )}
                  </div>

                  <div className="flex-1 text-left w-full">
                    <h3 className="font-semibold text-[#101828] text-[18px] mb-0">
                      {cls.classTitle}
                    </h3>
                    <p className="text-[14px] text-[#4A5565] font-[400] mb-4 line-clamp-2">{cls.description}</p>

                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <span className="text-[12px] bg-[#EEEEEE] text-[#696969] px-3 py-1 rounded-[9px] font-semibold">{cls.subject}</span>
                      <span className="text-[11px] bg-white text-[#696969] px-3 py-0 rounded-[9px] border border-[#9C9C9C] font-medium uppercase tracking-tight">{cls.className} - {cls.section}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-4 gap-x-10 lg:gap-x-20 text-[14px] text-[#4A5565] font-[400] font-normal">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <img src={usericon} alt="User" className="h-3.5 w-4 object-contain opacity-70" /> {cls.teacher}
                      </div>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <img src={calendaricon} alt="Calendar" className="h-3.5 w-4 object-contain opacity-70" /> {cls.startDate}
                      </div>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <img src={timeicon} alt="Time" className="h-3.5 w-4 object-contain opacity-70" /> {cls.startTime} - {cls.endTime || 'Ongoing'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-6 min-w-[200px] mt-8 lg:mt-0 w-full lg:w-auto border-t lg:border-t-0 pt-6 lg:pt-0">
                  <div className="relative self-end order-2 lg:order-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenuId(showMenuId === cls._id ? null : cls._id);
                      }}
                      className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors text-[#1C1C1C]"
                    >
                      <HiDotsVertical className="text-xl" />
                    </button>

                    {showMenuId === cls._id && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 bottom-full lg:bottom-auto lg:top-10 w-52 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-2 overflow-hidden mb-2 lg:mb-0"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/edit-schedule-class/${cls._id}`, { state: { from: '/schedule-class' } });
                          }}
                          className="w-full text-left px-4 py-2 text-[16px] text-[#696969] font-semibold flex items-center gap-3 hover:bg-gray-50"
                        >
                          <img src={editted} alt="Edit" className="h-4 w-4 object-contain" /> Edit Class
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(cls.meetingLink);
                            alert("Link copied!");
                            setShowMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-[16px] text-[#696969] font-semibold flex items-center gap-3 hover:bg-gray-50"
                        >
                          <img src={copy} alt="Copy" className="h-4 w-4 object-contain" /> Copy Meeting Link
                        </button>
                        {cls.status === "Scheduled" && <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction('Cancel', cls._id);
                          }}
                          className="w-full text-left px-4 py-2 text-[16px] text-[#DC2626] font-semibold flex items-center gap-3 hover:bg-red-50"
                        >
                          <img src={cancel} alt="Cancel" className="h-4 w-4 object-contain" /> Cancel Class
                        </button>}
                      </div>
                    )}
                  </div>

                  <div className="w-[180px] order-1 lg:order-2">
                    {cls.status === 'Live' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/class-details/${cls._id}`, { state: { from: '/schedule-class' } });
                        }}
                        className="w-full py-5 px-[14px] rounded-lg font-semibold text-[16px] flex items-center justify-center gap-4 transition-colors bg-[#DC2626] text-white"
                      >
                        <img src={youtube} alt="Join" className="h-4 w-4 object-contain" /> Join Now
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/class-details/${cls._id}`, { state: { from: '/schedule-class' } });
                        }}
                        className="w-full py-5 px-[14px] rounded-lg font-semibold text-[16px] flex items-center justify-center transition-colors bg-[#0B3142] text-white"
                      >
                        View Detail
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-[14px] p-17 text-center  flex flex-col items-center justify-center gap-[8px] ">
              <img
                className="w-[5%]" // Replaces style={{ width: "5%" }}
                src={nodata_foundIcon}
                alt="nodata"
              />
              <h3 className="text-xl font-semibold text-[#1C1C1C]">No classes found</h3>
              <p className="text-[#6B7280]">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>

      <CancelClassModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        classTitle={classToCancel?.classTitle}
        onConfirm={async () => {
          try {
            const response = await api.delete(`/onlineclass/${classToCancel?._id}`);
            toast.success("delete successfully")
            setIsCancelModalOpen(false)
          } catch (error) {
            toast.error(error?.message || "delete failed")
          }
          loadData();
        }}
      />
    </div>
  );
};

export default ScheduleClasses;
