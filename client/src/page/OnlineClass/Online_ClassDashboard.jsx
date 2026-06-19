import React, { useState, useEffect } from 'react';
import ClassCard from './ClassCard';
import dummyData from "../../data/data.json"
import ConnectionTips from './ConnectionTips';
import schedulenew from "../../assets/images/sechedulenew.png"
import { useNavigate } from 'react-router-dom';

import nodata_foundIcon from "../../assets/images/absence.png"
import api from '../../config/axiosInstance';
const Online_ClassDashboard = () => {
  const navigate = useNavigate();
  const [allClasses, setAllClasses] = useState([]);
  const [liveNow, setLiveNow] = useState([]);
  const [upcomingToday, setUpcomingToday] = useState([]);

  const loadData = async() => {
    // const saved = localStorage.getItem('sms_classes_data_v2');
    // const localData = saved ? JSON.parse(saved) : [];
    
    // const classesById = {};
    
    // // 1. Load dummy data first
    // dummyData.forEach(d => {
    //   classesById[String(d.id)] = d;
    // });

    // // 2. Overwrite with local data
    // localData.forEach(l => {
    //   const idStr = String(l.id);
    //   if (l.isEdited || !classesById[idStr]) {
    //     classesById[idStr] = l;
    //   }
    // });

    // const merged = Object.values(classesById);

    // // Filter out classes hidden in THIS session
    // const hiddenIds = JSON.parse(localStorage.getItem('sms_hidden_classes') || '[]');
    // const visibleClasses = merged.filter(c => !hiddenIds.includes(c.id));
    
    const response = api.get('/onlineclass')

    setAllClasses((await response).data.data);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('focus', loadData);
    return () => window.removeEventListener('focus', loadData);
  }, []);

  useEffect(() => {
    const now = new Date();
    setLiveNow(allClasses.filter((ele)=>ele.status === "Live"))
    setUpcomingToday(allClasses.filter((ele)=>ele.status === "Scheduled"))
    
    // const parseDateStr = (dateStr, timeStr) => {
    //   if (!dateStr) return null;
    //   let hours = 0, minutes = 0;
    //   if (timeStr) {
    //     if (timeStr.includes('AM') || timeStr.includes('PM')) {
    //       const [time, modifier] = timeStr.split(' ');
    //       let [h, m] = time.split(':').map(Number);
    //       if (h === 12) h = 0;
    //       if (modifier === 'PM') h += 12;
    //       hours = h; minutes = m;
    //     } else {
    //       const [h, m] = timeStr.split(':').map(Number);
    //       hours = h; minutes = m;
    //     }
    //   }
    //   const parts = dateStr.split('-');
    //   if (parts.length !== 3) return null;
    //   let year, month, day;
    //   if (parts[0].length === 4) {
    //     [year, month, day] = parts.map(Number);
    //   } else {
    //     [day, month, year] = parts.map(Number);
    //   }
    //   return new Date(year, month - 1, day, hours, minutes, 0);
    // };

    // let live = [];
    // let upcoming = [];

    // allClasses.forEach(c => {
    //   const startDateTime = parseDateStr(c.startDate, c.startTime);
    //   if (!startDateTime) return;
      
    //   let endDateTime;
    //   if (c.endTime) {
    //     const eDate = c.tillDate || c.startDate;
    //     endDateTime = parseDateStr(eDate, c.endTime);
    //   } else {
    //     // User Logic: If no end time, stay Live/Scheduled for 24 hours from start
    //     endDateTime = new Date(startDateTime?.getTime() + 24 * 60 * 60 * 1000);
    //   }

    //   let status = "Scheduled";
    //   if (startDateTime && now < startDateTime) {
    //     status = "Scheduled";
    //   } else if (startDateTime && now >= startDateTime && now <= endDateTime) {
    //     status = "Live";
    //   } else if (endDateTime && now > endDateTime) {
    //     status = "Past";
    //   }

    //   if (status === "Live") {
    //     live.push({...c, currentStatus: "Live"});
    //   } else if (status === "Scheduled") {
    //     const isToday = startDateTime?.toDateString() === now.toDateString();
    //     if (isToday) {
    //       upcoming.push({...c, currentStatus: "Scheduled"});
    //     }
    //   }
    // });

    // setLiveNow(live);
    
    // const sortedUpcoming = [...upcoming].sort((a, b) => b.id - a.id);
    // setUpcomingToday(sortedUpcoming);
  }, [allClasses]);

  return (
    <div className="online-class-dashboard-container">
      <main className="flex-1 bg-white border border-black/10 shadow-[0_5px_10px_rgb(0,0,0,0.15)] rounded-2xl p-4 lg:p-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-[20px] font-semibold text-[#1C1C1C]">Live Classes</h2>
            <p className="text-[16px] text-[#9C9C9C] mt-1">Manage and join your live classes</p>
          </div>
          <button 
            onClick={() => navigate('/add-schedule-class', { state: { from: '/online-class-dashbord' } })} 
            className="bg-[#0B3142] text-white px-5 py-3 rounded-lg text-[16px] font-semibold flex items-center gap-2 transition hover:bg-[#2c4b56]"
          >
            <img src={schedulenew} alt="Schedule Icon" className="h-4 w-5 object-contain" /> 
            Schedule New Class
          </button>
        </header>

        <ConnectionTips />

        {liveNow.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2 ">
              <span className="text-[#DC2626] text-[30px]">•</span>
              <h3 className="font-semibold text-[16px] text-[#1C1C1C] pl-1">Live Now</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-1 py-1">
              {liveNow.map(cls => (
                <ClassCard key={cls.id} data={cls} isLive={true} fromPath="/online-class-dashbord" />
              ))}
            </div>
          </div>
        )}

        {upcomingToday.length > 0 && (
          <div>
            <h3 className="font-semibold text-[18px] text-[#1C1C1C] mb-4">Upcoming Today</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingToday.map(cls => (
                <ClassCard key={cls.id} data={cls} isLive={false} fromPath="/online-class-dashbord" />
              ))}
            </div>
          </div>
        )}

        {liveNow.length === 0 && upcomingToday.length === 0 && (
        


<div className=" border border-[#E5E7EB] rounded-[14px] p-8 flex flex-col items-center justify-center gap-[15px] text-center">
          
            <img
              className="w-[80px] opacity-[50%]"
              src={nodata_foundIcon}
              alt="nodata"
            />
          
              <h3 className="text-[16px] font-semibold text-[#364153] mb-0 mt-[16px]">    No class is there at the moment.</h3>
               
           
          </div>




        )}
      </main>
    </div>
  );
};

export default Online_ClassDashboard;
