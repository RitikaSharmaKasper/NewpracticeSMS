import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { HiArrowLeft, HiCalendar, HiClock, HiUser, HiLink, HiPencil, HiXCircle } from 'react-icons/hi';
import dummyData from "../../../data/data.json";
import usericon from "../../../assets/images/usericon.png";
import calendaricon from "../../../assets/images/calendar-icon.png";
import timeicon from "../../../assets/images/time-icon.png";
import EditClass from './EditClass';
import detail_date from "../../../assets/images/Detail-Date.png";
import detail_time from "../../../assets/images/Detail-Time.png";
import detail_user from  "../../../assets/images/Detail-Teacher.png";
import detail_class from "../../../assets/images/Detail-Class.png";
import beforeyoujoin from "../../../assets/images/beforeyoujoin.png";
import youtube from "../../../assets/images/youtube.png";
import editted from "../../../assets/images/editted.png"
import copy from "../../../assets/images/copy.png";
import cancel from "../../../assets/images/cancel.png"
import CancelClassModal from './CancelClassModal';
import Back from "../../../assets/images/Back.png";
import api from '../../../config/axiosInstance';
import { toast } from 'react-toastify';
import { formatDate, formatTime } from '../../../utils/CommonFunctions';



const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from || '/schedule-class';
  const [classData, setClassData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // useEffect(() => {
  //   const saved = localStorage.getItem('sms_classes_data_v2');
  //   const localData = saved ? JSON.parse(saved) : [];
    
  //   const classesById = {};
    
  //   // 1. Load dummy data first
  //   dummyData.forEach(d => {
  //     classesById[String(d.id)] = d;
  //   });

  //   // 2. Overwrite with local data
  //   localData.forEach(l => {
  //     const idStr = String(l.id);
  //     if (l.isEdited || !classesById[idStr]) {
  //       classesById[idStr] = l;
  //     }
  //   });

  //   const merged = Object.values(classesById);

  //   const cls = merged.find(c => String(c.id) === String(id));
  //   if (cls) {
  //     // Determine status
  //     const now = new Date();
  //     const parseDateStr = (dateStr, timeStr) => {
  //       if (!dateStr) return null;
  //       let hours = 0, minutes = 0;
  //       if (timeStr) {
  //         if (timeStr.includes('AM') || timeStr.includes('PM')) {
  //           const [time, modifier] = timeStr.split(' ');
  //           let [h, m] = time.split(':').map(Number);
  //           if (h === 12) h = 0;
  //           if (modifier === 'PM') h += 12;
  //           hours = h;
  //           minutes = m;
  //         } else {
  //           const [h, m] = timeStr.split(':').map(Number);
  //           hours = h;
  //           minutes = m;
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
  //     };

  //     const startDateTime = parseDateStr(cls.startDate, cls.startTime);
  //     let endDateTime;
  //     if (cls.endTime) {
  //       const eDate = cls.tillDate || cls.startDate;
  //       endDateTime = parseDateStr(eDate, cls.endTime);
  //     } else {
  //       // User Logic: Stay live for 24h if no end time
  //       endDateTime = new Date(startDateTime?.getTime() + 24 * 60 * 60 * 1000);
  //     }

  //     let status = "Scheduled";
  //     if (startDateTime && now < startDateTime) {
  //       status = "Scheduled";
  //     } else if (startDateTime && now >= startDateTime && now <= endDateTime) {
  //       status = "Live";
  //     } else if (endDateTime && now > endDateTime) {
  //       status = "Completed";
  //     }
      
  //     setClassData({ ...cls, status: status });
  //   }
  // }, [id]);

// Add this inside the ClassDetails component, before the return statement

const loadData = async () => {
  try {
    const response = await api.get(`/onlineclass/${id}`)
     await setClassData(response.data?.data)
  
  } catch (error) {
    toast.error(error.message || "somethingwent wrong ")
  }
}

useEffect(()=>{
loadData()
},[])

const handleCancel = async () => {
  try {
    await api.delete(`/onlineclass/${id}`);

    setIsCancelModalOpen(false);
    navigate(fromPath);
  } catch (error) {
    toast.error("Failed to delete online class:", error);
    // Optional: show toast/error message
  }
};

  
  if (!classData) return <div className="p-8">Loading...</div>;

  const isLive = classData.status === 'Live';

  return (

    <>
    
     <button 
            onClick={() => navigate(fromPath)} 
            className="flex items-center text-[#696969] hover:text-[##696969] text-[24px]  mr-5  font-semibold mb-4 transition-colors"
      >
        <span className="mr-3 mx-3 mt-2">  <img 
              src={Back} 
              alt="Info" 
              className="h-3 w-3 object-contain" 
            /></span> Back
          </button>
      <div className="schedule-classes-page p-3 lg:p-1">
          <div className="p-3 lg:p-1">
      {/* Top Header */}
    

      {/* Status Banner */}
    {classData.status==='Live' ?(
  <div className="bg-[#FFF1F2] border border-[#FECDD3] rounded-xl p-3 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-500">
    <div>
      <p className="text-[#82181A] font-semibold font-[600] text-[18px]">Class is Live Now!</p>
      <p className="text-[#C10007] text-[16px] font-[400] ">Click 'Join Now' to enter the class.</p>
    </div>
  </div>
): classData.status==='Past'?(<div className="bg-[#D5EBDD] border border-[#A0D5B4] rounded-xl p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-500">
    <div>
      <p className="text-[#009638] font-semibold font-[600] text-[18px]">Class Completed</p>
      <p className="text-[#009638] text-[16px] font-[400] ">This class has ended. Recording is available below.</p>
    </div>
  </div>):null}

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Main Content Area */}
        <div className="flex-1 space-y-5">
          {/* Class Info Card */}
          <div className="bg-white border border-[#E8E8E8] rounded-xl p-4 lg:p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-[20px] lg:text-[18px]  font-[600] font-semibold text-[#101828] ">{classData.classTitle}</h1>
              <span className={`px-2 py-0 rounded-[10px] text-[12px]  ${
                isLive ? "bg-[#FB2C36] text-white" : "border border-[#A3B3FF] text-[#432DD7]"
              }`}>
                {classData.status}
              </span>
            </div>
            <p className="text-[#4A5565] text-[16px] font-[400]  mb-4 mt-[-0.75rem] leading-relaxed">{classData.description}</p>
            
            <div className="inline-block bg-[#EEEEEE] text-[#696969] text-[13px] px-2 py-1 rounded-[12px] mb-8">
              {classData.subject}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center">
                  <img src={detail_user} alt="Teacher" className="w-9 h-9 object-contain opacity-70" />
                </div>
                <div>
                  <p className="text-[#696969] text-[14px]">Teacher</p>
                  <p className="text-[#1C1C1C] font-semibold text-[16px] font-[600] ">{classData.teacher || "Sarah Johnson"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center">
                  <img src={detail_date} alt="Date" className="w-9 h-9 object-contain opacity-70" />
                </div>
                <div>
                  <p className="text-[#696969] text-[14px]">Date</p>
                  <p className="text-[#1C1C1C] font-semibold text-[16px] font-[600]">{formatDate(classData.startDate)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center">
                  <img src={detail_time} alt="Time" className="w-9 h-9 object-contain opacity-70" />
                </div>
                <div>
                  <p className="text-[#696969] text-[14px]">Time</p>
                  <p className="text-[#1C1C1C] font-semibold text-[15px]">{formatTime(classData.startTime)} - {formatTime(classData.endTime) || "TBD"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center">
                <img src={detail_class} alt="Time" className="w-9 h-9 object-contain opacity-70" />
                </div>
                <div>
                  <p className="text-[#696969] text-[14px]">Class</p>
                  <p className="text-[#1C1C1C] font-semibold text-[16px] font-[600]">{classData.className} - {classData.section}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Before You Join Section */}
          {/* <div className="bg-[#EEF2FF] border border-[#C6D2FF] rounded-[14px] p-5 lg:p-5 ">
            <h3 className=" text-[#101828] font-semibold text-[18px] font-[600] mb-2 flex items-center gap-2">
                 <img src={beforeyoujoin} alt="Schedule Icon" className="h-5 w-6 object-contain" />  Before You Join
            </h3>
            <ul className="space-y-1">
              {[
                "Make sure you have a stable internet connection",
                "Test your camera and microphone",
                "Find a quiet place with good lighting",
                "Join 5 minutes early for the best experience"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#4A5565] font-[400] text-[14px]">
                  <span className="text-[#4A5565] mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* Sidebar Actions */}
        {classData.status !== 'Past' && (
          <div className="w-full lg:w-[400px] space-y-2">
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-5 shadow-sm sticky top-8">
              <h3 className="text-[18px] font-semibold text-[#101828] mb-5">Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => window.open(classData.meetingLink, '_blank')}
                  className={`w-full py-2 rounded-lg font-semibold font-[400] text-[14px] flex items-center justify-center gap-2 transition-all ${
                    isLive 
                      ? "bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-md shadow-red-100" 
                      : "bg-[#12516E] text-white hover:bg-[#12516E]"
                  }`}
                >
                    <img src={youtube} alt="Join" className="h-4 w-4 object-contain" /> Join Now
                </button>
                
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(classData.meetingLink);
                    alert("Link copied!");
                  }}
                  className="w-full py-2 bg-white border border-[#E8E8E8] text-[#1C1C1C] rounded-lg font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                <img src={copy} alt="Join" className="h-4 w-4 object-contain" />Copy Meeting Link
                </button>

                {!isLive && <button 
                  onClick={() => navigate(`/edit-schedule-class/${classData._id}`, { state: { from: location.pathname } })}
                  className="w-full py-2 bg-white border border-[#E8E8E8] text-[#1C1C1C] rounded-lg font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <img src={editted} alt="Join" className="h-4 w-4 object-contain" /> Edit Class
                </button>}

                {classData.status == "Scheduled" && <button onClick={() => setIsCancelModalOpen(true)}
                  className="w-full py-2 bg-white border border-[#FECDD3] text-[#DC2626] rounded-lg font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                >
                  <img src={cancel} alt="Join" className="h-4 w-4 object-contain" />  Cancel Class
                </button>}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
      
      </div>

      <CancelClassModal 
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        classTitle={classData?.classTitle}
        onConfirm={handleCancel}
      />
    </>
  );
};

export default ClassDetails;
