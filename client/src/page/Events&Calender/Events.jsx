import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import timeicon from "../../assets/images/time-icon.png";
import calendar_big from "../../assets/images/calendar-icon.png";
import schedulenew from "../../assets/images/sechedulenew.png";
import {
  fetchAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  buildEventFormData,
  getApiErrorMessage,
} from "../../services/eventApi";
import location from "../../assets/images/location.png";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import DeleteEventModal from "./DeleteEventModal";
import editted from "../../assets/images/editted.png";
import deleteIcon from "../../assets/images/delete.png";
import backarrow from "../../assets/images/backarrow.png";
import nodata_foundIcon from "../../assets/images/absence.png"
const COVER_IMAGES = {
  exam: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
  sports: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=80",
  holiday: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=800&auto=format&fit=crop&q=80",
  celebration: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop&q=80",
  meeting: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
  academic: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
  event: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",    
  pdfPlaceholder: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&auto=format&fit=crop&q=80",
  other: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80" 
};

const formatTo12Hour = (timeStr) => {
  if (!timeStr) return "All Day";
  try {
    const [hours, minutes] = timeStr.split(":");
    const hr = parseInt(hours, 10);
    const ampm = hr >= 12 ? "PM" : "AM";
    const formattedHr = hr % 12 || 12;
    return `${formattedHr}:${minutes} ${ampm}`;
  } catch (e) {
    return timeStr;
  }
};
// Date Parsing Helper Utilities for Sidebar Display
const getDayNumber = (dateStr) => {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "" : d.getDate();
};

const getMonthShort = (dateStr) => {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { month: "short" });
};

const getDayName = (dateStr) => {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { weekday: "long" });
};
const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showMenuId, setShowMenuId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEventToEdit, setSelectedEventToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEventToDelete, setSelectedEventToDelete] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const { events: list } = await fetchAllEvents({ limit: 100 });
      setEvents(list);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to load events"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleEditEventSubmit = async (updatedEventData) => {
    try {
      const formData = buildEventFormData(
        {
          title: updatedEventData.title,
          description: updatedEventData.description,
          date: updatedEventData.date,
          type: updatedEventData.type,
          location: updatedEventData.location,
          organizer: updatedEventData.organizer,
          startTime: updatedEventData.startTime,
          endTime: updatedEventData.endTime,
          isHoliday: updatedEventData.isHoliday,
        },
        updatedEventData.imageFile || null
      );

      const saved = await updateEvent(updatedEventData.id, formData);
      toast.success("Event updated successfully");
      setIsEditModalOpen(false);
      setSelectedEventToEdit(null);
      if (selectedEvent && selectedEvent.id === updatedEventData.id) {
        setSelectedEvent(saved);
      }
      await loadEvents();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update event"));
    }
  };

  const handleDeleteEventConfirm = async () => {
    if (!selectedEventToDelete) return;
    try {
      await deleteEvent(selectedEventToDelete.id);
      toast.success("Event deleted successfully");
      setIsDeleteModalOpen(false);
      if (selectedEvent && selectedEvent.id === selectedEventToDelete.id) {
        setSelectedEvent(null);
      }
      setSelectedEventToDelete(null);
      await loadEvents();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete event"));
    }
  };

  // Dynamic live system date (normalized to midnight)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDateString = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // SMART CUSTOM SORTING: 
  // Pinned Custom Upcoming events ALWAYS show at the very top (first!)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    dateA.setHours(0, 0, 0, 0);
    const dateB = new Date(b.date);
    dateB.setHours(0, 0, 0, 0);

    const isUpcomingA = dateA >= today;
    const isUpcomingB = dateB >= today;
    
    // Upcoming events first
    if (isUpcomingA && !isUpcomingB) return -1;
    if (!isUpcomingA && isUpcomingB) return 1;

    // 4. Fallback chronological sorting for completed events
    return dateA - dateB;
  });

  // REAL-TIME AUTO CALCULATION
  const totalCount = sortedEvents.length;
  
  const completedCount = sortedEvents.filter(evt => {
    const eventDate = new Date(evt.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < today; // Happened before today
  }).length;

  const upcomingCount = sortedEvents.filter(evt => {
    const eventDate = new Date(evt.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today; // Happens today or in the future
  }).length;

  const handleAddEventSubmit = async (newEventData) => {
    try {
      const formData = buildEventFormData(
        {
          title: newEventData.title,
          description: newEventData.description || "No description provided",
          date: newEventData.date,
          type: newEventData.type,
          location: newEventData.location,
          organizer: newEventData.organizer || "Administration",
          startTime: newEventData.startTime,
          endTime: newEventData.endTime,
          isHoliday: newEventData.isHoliday,
        },
        newEventData.imageFile || null
      );

      await createEvent(formData);
      toast.success("Event created successfully");
      setIsAddModalOpen(false);
      await loadEvents();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to create event"));
    }
  };

  const getCategoryDetails = (evt) => {
    const imageUrl = evt.uploadedImage || evt.image;
    if (imageUrl) {
      return { label: (evt.type || "event").toUpperCase(), image: imageUrl };
    }
   

    switch (evt.type) {
      case "exam": return { label: "EXAM", image: COVER_IMAGES.exam };
      case "sports": return { label: "SPORTS", image: COVER_IMAGES.sports };
      case "holiday": return { label: "HOLIDAY", image: COVER_IMAGES.holiday };
      case "celebration": return { label: "CULTURAL", image: COVER_IMAGES.celebration };
      case "meeting": return { label: "MEETING", image: COVER_IMAGES.meeting };
      case "event": return { label: "EVENT", image: COVER_IMAGES.event };
      default: return { label: "ACADEMIC", image: COVER_IMAGES.academic };
    }
  };

  return (
    <div className="flex flex-col box-shadow bg-white rounded-2xl p-4">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-7">
        <div>
          <h1 className="text-[18px] font-semibold text-[#0B3142] font-[600] mt-0 ">Events Management</h1>
          <p className="text-[16px] text-[#9C9C9C] font-[400]  font-normal -mt-[2px] ">Create, organize, and track all school events</p>
        </div>
        <div className="flex gap-3">
          
          <button
            onClick={() => setIsAddModalOpen(true)}
           className="bg-[#0B3142] text-[#FFFFFF] px-6 py-2 rounded-[8px] text-[16px] font-[Segoe UI] font-[600] font-semibold flex items-center gap-2 transition hover:bg-[#2c4b56] cursor-pointer"
          >     <img src={schedulenew} alt="Schedule Icon" className="h-4 w-5 object-contain" /> 
            Add Event
          </button>
        </div>
      </div>

      {/* AUTOMATIC METRIC CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-[16px] border border-[#E6E6E6] pl-6 pt-3 pr-6 pb-4  sm:max-h-[100px] flex justify-between items-center ">
          <div>
            <p className="text-[15px] font-normal text-[#6A7282] font-[400] ">Total Events</p>
            <h3 className="text-[22px] font-bold text-[#101828] font-[700] mt-0 ">{totalCount}</h3>
          </div>
          <div className="w-11 h-10 rounded-[16px] bg-[linear-gradient(to_right,#E0E7FF,#F3E8FF)] flex items-center justify-center text-purple-500 font-bold">  
         <div className="h-5 w-5 flex items-center justify-center">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 -960 960 960" 
    className="h-6 w-6 fill-[#155DFC]"
  >
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h40v-40h80v40h320v-40h80v40h40q33 0 56.5 23.5T840-760v560q0-33-23.5 33.5T760-120H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
  </svg>
</div>
  
</div>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E6E6E6] pl-6 pt-3 pr-6 pb-4   sm:max-h-[100px] flex justify-between items-center ">
          <div>
            <p className="text-[15px] font-normal text-[#6A7282] font-[400]">Completed (Past)</p>
            <h3 className="text-[22px] font-bold text-[#101828] font-[700] mt-0 ">{completedCount}</h3>
          </div>
          <div className="w-11 h-10 rounded-[16px] bg-[linear-gradient(to_right,#DCFCE7,#D0FAE5)] flex items-center justify-center text-purple-500 font-bold">   

<div className="h-5 w-5 flex items-center justify-center">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 -960 960 960" 
    className="h-6 w-6 fill-[#00A63E]"
  >
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h40v-40h80v40h320v-40h80v40h40q33 0 56.5 23.5T840-760v560q0-33-23.5 33.5T760-120H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
  </svg>
</div>
  
</div>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E6E6E6] pl-6 pt-3 pr-6 pb-4   sm:max-h-[100px] flex justify-between items-center ">
          <div>
            <p className="text-[15px] font-normal text-[#6A7282] font-[400]">Upcoming & Today</p>
            <h3 className="text-[22px] font-bold text-[#101828] font-[700] mt-0">{upcomingCount}</h3>
          </div>
          <div className="w-11 h-10 rounded-[16px] bg-[linear-gradient(to_right,#DBEAFE,#CEFAFE)] flex items-center justify-center text-purple-500 font-bold">
     
     
         <div className="h-5 w-5 flex items-center justify-center">
 <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 -960 960 960" 
    className="h-5 w-5 fill-[#155DFC]"
  >
    <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127q54.5-54 127.5-85.5T480-880q83 0 156 31.5t127 85.5q54 54 85.5 127T880-480q0 82-31.5 155t-85.5 127.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99.5-241T480-820q-142 0-241 99.5T140-480q0 142 99.5 241T480-140Zm35-364 167 100-28 48-174-104v-220h60v176Zm-35 24Z"/>
  </svg>
</div>
      

  
</div>
        </div>
      </div>

      {/* EVENTS CARD GRID */}
      {loading ? (
        <p className="text-center text-[#6A7282] py-10">Loading events...</p>
      ) : sortedEvents.length > 0 ? (
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5 w-full ">
  {/* Your event cards go here */}

          {sortedEvents.map((evt) => {
            const catDetails = getCategoryDetails(evt);
            
            // Evaluates state context against live date directly
            const eventDate = new Date(evt.date);
            eventDate.setHours(0, 0, 0, 0);
            const isEventCompleted = eventDate < today;

            return (
              <div
                key={evt.id}
                className="bg-white rounded-[12px] border border-[#E6E6E6] shadow-sm overflow-hidden flex flex-col  transition-all duration-200"
              >
                {/* Event Cover Image */}
                <div className="relative h-[190px] md: h-[160px] w-full overflow-hidden shrink-0 bg-slate-100 border-b border-[#F0F0F0]">
                  <img
                    src={catDetails.image}
                    alt={evt.title}
                    className="h-full w-full object-cover"
                  />
                 
                    <span className="absolute bottom-5 left-5 bg-[#FFFFFFD9]  text-[#1C1C1C] text-[12px] font-semibold  px-1.75 py-0.25 rounded-[8px] uppercase font-[600]">
                    {catDetails.label}
                  </span>
                </div>

                {/* Event Card Content Body */}
                <div className="p-4 flex flex-col justify-between flex-grow min-h-[32px] md:min-h-[20px]">
                  <div>
                    <div className="flex justify-between items-start relative">
                      <h3 
                        className="text-[18px] font-semibold font-[600]  text-[#101828] leading-snug line-clamp-1"
                        title={evt.title}
                      >
                        {evt.title}
                      </h3>
                      <button className="text-[#1F1F1F]  text-xl font-bold p-0.25 transition rounded-full  cursor-pointer"
                       onClick={(e) => {
                        e.stopPropagation();
                        setShowMenuId(showMenuId === evt.id ? null : evt.id);
                      }}
                      >
                        ⋮
                      </button>

                      {showMenuId === evt.id && (
                        <div 
                          ref={menuRef}
                          className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-1 overflow-hidden"
                        >
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEventToEdit(evt);
                              setIsEditModalOpen(true);
                              setShowMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-[14px] text-[#696969] font-semibold flex items-center gap-3 hover:bg-gray-50 cursor-pointer"
                          >
                            <img src={editted} alt="Edit" className="h-4 w-4 object-contain" /> Edit Event
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEventToDelete(evt);
                              setIsDeleteModalOpen(true);
                              setShowMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-[14px] text-[#DC2626] font-semibold flex items-center gap-3 hover:bg-red-50 cursor-pointer"
                          >
                            <img src={deleteIcon} alt="Delete" className="h-4 w-4 object-contain" /> Delete Event
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Auto-Updating Live Status Badge */}
                    <div className="mt-0">
                      {isEventCompleted ? (
                        <span className="inline-block text-[14px] font-normal px-2 py-0.25 rounded-[8px] bg-[#EEFDF3] text-[#16A34A] border border-[#00000000]">
                          completed
                        </span>
                      ) : (
                        <span className="inline-block text-[14px] font-normal  px-2 py-0.25 rounded-[8px] bg-[#DBEAFE] text-[#1447E6] border border-[#00000000]">
                          upcoming
                        </span>
                      )}
                    </div>

                   <div>
  {/* The text clamps safely here */}
  <p className="text-[14px] font-normal text-[#4A5565] mt-3 line-clamp-2">
    {evt.description || "No description provided."}
  </p>
  
  {/* The button stays safely visible out here */}
  <span 
    onClick={() => setSelectedEvent(evt)} 
    className="text-[#1447E6] text-[12px] font-semibold mt-0 mb-2 cursor-pointer hover:underline inline-block"
  >
    Read More
  </span>
</div>
                  </div>

                  {/* Metadata Rows Segment */}
                  <div className="pt-0 mt-0 space-y-2 mb-2">
                    <div className="flex items-center gap-2 mb-0 text-[14px] text-[#364153] font-[400] font-normal">
                      <span className="w-9 h-9 rounded-[10px] bg-[#F3F4F6] flex items-center justify-center text-purple-500 font-bold">
                         <img src={calendar_big} alt="Time" className="h-4 w-4 opacity-70" />
                      </span>
                      {formatDateString(evt.date)}
                    </div>
                    <div className="flex items-center gap-2 text-[14px] text-[#364153] font-[400] font-normal">
                      <span className="w-9 h-9 rounded-[10px] bg-[#F3F4F6] flex items-center justify-center text-purple-500 font-bold">
                         <img src={calendar_big} alt="Time" className="h-4 w-4 opacity-70" />  </span> {evt.isHoliday 
                          ? "All Day" 
                          : `${formatTo12Hour(evt.startTime)} - ${formatTo12Hour(evt.endTime)}`}
                    
                    </div>
                    <div className="flex items-center gap-2 text-[14px] text-[#364153] font-[400] font-normal">
                      <span className="w-9 h-9 rounded-[10px] bg-[#F3F4F6] flex items-center justify-center text-purple-500 font-bold">
                         <img src={location} alt="Time" className="h-4 w-4 opacity-70" /></span>  {evt.location || "N/A"}
                    </div>
                  </div>

                
                  

                  <div className="mt-2 pt-3 border-t border-[#F1F5F9] text-[14px] text-[#6A7282] flex justify-between items-center">
                    <span>
                      Organized by: <strong className="font-bold font-[700] text-[12px] text-[#364153]">{evt.organizer || "Administration"}</strong>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        
        // <div className="bg-white rounded-[12px] border border-[#E6E6E6] p-16 text-center shadow-sm">
        //   <h3 className="text-lg font-bold text-[#364153] mb-1">No Events Listed</h3>
        //   <p className="text-[14px]  text-[#6A7282] max-w-sm mx-auto leading-normal">
        //     <img
        //                   className="w-[80px]"
        //                   src={nodata_foundIcon}
        //                   alt="nodata"
        //                 />
        //     Click "Add Event" above to add something to your schedule timeline.
        //   </p>
        // </div>

         <div className=" border border-[#E5E7EB] rounded-[14px] p-8 flex flex-col items-center justify-center gap-[15px] text-center">
          
            <img
              className="w-[80px] opacity-[50%]"
              src={nodata_foundIcon}
              alt="nodata"
            />
          
              <h3 className="text-[16px] font-semibold text-[#364153] mb-0 mt-[16px]">No Events Listed</h3>
                <p className="text-[#6B7280] text-[14px] font-medium -mt-[8px]">
                Click "Add Event" above to add events in the timeline.
            </p>
           
          </div>
      )}

      <AddEventModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSubmit={handleAddEventSubmit} 
      />

      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedEventToEdit(null);
        }}
        onSubmit={handleEditEventSubmit}
        eventData={selectedEventToEdit}
      />

      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedEventToDelete(null);
        }}
        onConfirm={handleDeleteEventConfirm}
        eventName={selectedEventToDelete ? selectedEventToDelete.title : ""}
      />
{/* DYNAMIC SIDEBAR PREVIEW CONTAINER */}
     
           {selectedEvent && (
     
     <>
         {/* Background Overlay with Blur */}
         <div 
           className="fixed inset-0 bg-black/30 backdrop-blur-[0.5px] z-[9999] animate-in fade-in duration-300"
           onClick={() => setSelectedEvent(null)} // Clicking the blurred background closes the sidebar
         />
     
            <div 
       className="fixed top-0 right-0 h-[calc(200vh-39px)] w-full max-w-[450px] bg-[#FFFFFF] shadow-[-8px_0_24px_rgba(0,0,0,0.15)] border-l border-[#0000001A] rounded-[12px] flex flex-col z-[9999] animate-in slide-in-from-right duration-300 overflow-hidden"
       onClick={(e) => e.stopPropagation()}
     >
               <div className="relative w-full h-[355px] shrink-0  px-6 py-19 pb-0">
                
                 <img
                   src={getCategoryDetails(selectedEvent).image}
                   alt={selectedEvent.title}
                   className="w-full h-full object-cover rounded-[8px] "
                 />
                 <button
                   onClick={() => setSelectedEvent(null)}
                   className="absolute top-4 left-4    pr-2 pl-2 pt-2 pb-1 transition-all duration-200  flex items-center justify-center "
                 >
                   <img src={backarrow} alt="arrow" className="h-6 w-6" />
                 </button>
               </div>
     
               <div className="pt-3  pb-5 pl-7 pl-5 flex flex-col gap-5 overflow-y-auto flex-grow min-w-0">
                 <div>
                   <h3 className="text-[20px] font-bold text-[rgba(28, 28, 28, 1)] leading-snug font-[700] mt-2 ">
                     {selectedEvent.title}
                   </h3>
                 </div>
     
                 <div className="flex items-center gap-7 pt-0 ">
                   <div className="flex flex-col items-center justify-center  border border-[#666666] rounded-[8px] w-[44px] h-[58px] shrink-0 shadow-sm">
                       <span className="text-[18px] font-semibold text-[rgba(28, 28, 28, 1)]  ">
                       {getDayNumber(selectedEvent.date)}
                     </span>
                     <span className="text-[14px] font-normal text-[rgba(105, 105, 105, 1)] mt-1 ">
                       {getMonthShort(selectedEvent.date)}
                     </span>
                  
                   </div>
                   <div className="flex flex-col ">
                     <span className="text-[18px] font-semibold text-[rgba(28, 28, 28, 1)] font-[600] ">
                       {getDayName(selectedEvent.date)}
                     </span>
                     <span className="text-[14px] text-[#696969] mt-0.5 font-normal font-[400]">
                       On-School
                     </span>
                   </div>
                 
                 </div>
     
                 <div>
                   <h4 className="text-[18px] font-semibold text-[#1C1C1C]  ">Venue</h4>
                   <p className="text-[14px] text-[#696969] font-normal font-[400]">
                     {selectedEvent.title.toLowerCase().includes("fest") || selectedEvent.type === "sports" || selectedEvent.title.toLowerCase().includes("celebration")
                       ? "School Auditorium" 
                       : (selectedEvent.venue || "School Campus")}
                   </p>
                 </div>
     
                 <div>
                   <h4 className="text-[18px] font-semibold text-[#1C1C1C]">Timing</h4>
                   <p className="text-[14px] text-[#696969] font-normal font-[400]">
                   {selectedEvent.isHoliday ? "All Day" : `${formatTo12Hour(selectedEvent.startTime)} - ${formatTo12Hour(selectedEvent.endTime)}`}
                   </p>
                 </div>
     
                 <div>
                   <h4 className="text-[18px] font-semibold text-[#1C1C1C] mb-0">Description</h4>
                   <p className="text-[14px] text-[#1C1C1C]  font-normal  mr-7">
                     {selectedEvent.description || "Get ready to groove and celebrate the power of music at our grand School Music Fest! Experience an unforgettable evening filled with beats, energy, and inspiration as Guru Randhawa lights up the stage with his chart-topping hits."}
                   </p>
                 </div>
               </div>
             </div>
     
     
             </>
           )}
    </div>
  );
};

export default Events;