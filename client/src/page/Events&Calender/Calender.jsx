import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  fetchAllEvents,
  createEvent,
  buildEventFormData,
  getApiErrorMessage,
} from "../../services/eventApi";
import {
  LuChevronLeft,
  LuChevronRight,
  LuPlus,
  LuClock,
  LuTrash2,
  LuCalendar,
  LuX
} from "react-icons/lu";

// Badge & styling themes for event categories matching the design spec
const CATEGORY_THEMES = {
  exam: {
    badge: "bg-[#FFF0E6] text-[#F54900] border-[#F5490033]",
    card: " border-l-[#F54900]",
    label: "Exam"
  },
  event: {
    badge: "bg-[#00A63E1A] text-[#00A63E] border-[#00A63E33]",
    card: " border-l-[#00A63E33] ",
    label: "Event"
  },
  celebration: {
    badge: "bg-[#AD46FF1A] text-[#9333EA] border-[#AD46FF33]",
    card: "border-l-5 border-l-[#AD46FF33]",
    label: "Celebration"
  },
  holiday: {
    badge: "bg-[#FB2C361A] text-[#E7000B] border-[#FB2C3633]",
    card: "border-l-5 border-l-[#E11D48]",
    label: "Holiday"
  },
  meeting: {
    badge: "bg-[#155DFC1A] text-[#155DFC] border-[#155DFC33]",
    card: "border-l-5 border-l-[#2563EB]",
    label: "Meeting"
  },
  sports: {
    badge: "bg-[#00A63E1A] text-[#00A63E] border-[#00A63E33]",
    card: "border-l-5 border-l-[#00A63E]",
    label: "Sports"
  },
  academic: {
    badge: "bg-[#155DFC1A] text-[#155DFC] border-[#155DFC33]",
    card: "border-l-5 border-l-[#2563EB]",
    label: "Academic"
  },
  other: {
    badge: "bg-[#F8FAFC] text-[#475569] border-[#475569]",
    card: "border-l-5 border-l-[#475569]",
    label: "Other"
  }
};

const CATEGORY_IMAGES = {
  exam: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80",         // Person taking a test/studying
  event: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=80",        // Conference/Corporate event
  celebration: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=80",  // Sparklers and party celebration
  holiday: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80",      // Relaxing tropical beach holiday
  meeting: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=80",      // Team collaborating in a meeting
  sports: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&auto=format&fit=crop&q=80",       // Stadium/Running track sports theme
  academic: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=80",
  other: "https://images.unsplash.com/photo-1484480974693-2ca0a72f311a?w=500&auto=format&fit=crop&q=80"         // Clean notebook/checklist for miscellaneous items
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

const Calender = () => {
const [viewDate, setViewDate] = useState(new Date());
const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "event",
    date: "",
    startTime: "09:00",
    endTime: "17:00",
    description: "",
    isHoliday: false
  });

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const loadMonthEvents = useCallback(async () => {
    setLoading(true);
    try {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth() + 1;
      const { events: list } = await fetchAllEvents({ year, month, limit: 100 });
      setEvents(list);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to load calendar events"));
    } finally {
      setLoading(false);
    }
  }, [viewDate]);

  useEffect(() => {
    loadMonthEvents();
  }, [loadMonthEvents]);

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const formatKey = (y, m, d) => {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayIndex = getFirstDayOfMonth(year, month);
  const totalDays = getDaysInMonth(year, month);

  const calendarCells = [];
  
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push({ isBlank: true });
  }

  for (let d = 1; d <= totalDays; d++) {
    const cellDate = new Date(year, month, d);
    const dateKey = formatKey(year, month, d);
    const dayEvents = events.filter((evt) => evt.date === dateKey);
    calendarCells.push({
      isBlank: false,
      dayNum: d,
      date: cellDate,
      dateKey,
      events: dayEvents
    });
  }

  const remaining = calendarCells.length % 7;
  if (remaining > 0) {
    for (let i = 0; i < 7 - remaining; i++) {
      calendarCells.push({ isBlank: true });
    }
  }

  const selectedDateKey = selectedDate
    ? formatKey(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    : null;
  const selectedDateEvents = events.filter((evt) => evt.date === selectedDateKey);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title.trim() || !newEvent.date) return;

    try {
      const formData = buildEventFormData({
        title: newEvent.title.trim(),
        description: newEvent.description?.trim() || "School calendar event",
        date: newEvent.date,
        type: newEvent.type,
        location: newEvent.venue || newEvent.location || "",
        organizer: "Administration",
        startTime: newEvent.startTime,
        endTime: newEvent.endTime,
        isHoliday: newEvent.type === "holiday" || newEvent.isHoliday,
      });

      await createEvent(formData);
      toast.success("Event created successfully");

      setNewEvent({
        title: "",
        type: "event",
        date: "",
        startTime: "09:00",
        endTime: "17:00",
        description: "",
        isHoliday: false,
      });
      setIsModalOpen(false);
      await loadMonthEvents();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to create event"));
    }
  };

  const handleDayClick = (cell) => {
    if (cell.isBlank) return;
    
    if (isSidebarOpen && isSameDay(selectedDate, cell.date)) {
      setIsSidebarOpen(false);
    } else {
      setSelectedDate(cell.date);
      setIsSidebarOpen(true);
    }
  };

  return (
    /* SINGLE SHARED CONTAINER FOR BOTH COLUMNS */
    <div className="box-shadow bg-white rounded-2xl p-4 w-full">
      <div className="flex justify-center items-center gap-4 sm:gap-5 mb-11">
            <button
              onClick={handlePrevMonth}
              className="w-9 h-9 flex items-center justify-center border border-[#E6E6E6] rounded-[6px] transition shadow-sm bg-[#FFFFFF]"
              title="Previous Month"
            >
              <LuChevronLeft className="text-[#1F1F1F] text-[27px] font-semibold" />
            </button>

            <h2 className="lg:text-[18px] sm:text-[15px] md:text-[18px] font-semibold text-[#1C1C1C] min-w-[50px] text-center font-[600] flex flex-col items-center mt-2 select-none">
              <span>{viewDate.toLocaleString("default", { month: "long" })}</span>
              <span>{viewDate.toLocaleString("default", { year: "numeric" })}</span>
            </h2>
            
            <button
              onClick={handleNextMonth}
              className="w-9 h-9 flex items-center justify-center border border-[#E6E6E6] rounded-[6px] transition shadow-sm bg-[#FFFFFF]"
              title="Next Month"
            >
              <LuChevronRight className="text-[#1F1F1F] text-[27px] font-semibold" />
            </button>
          </div>
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-start">
        
        {/* LEFT PART: THE CALENDAR GRID */}
        <div className={`transition-all duration-300 ${
          isSidebarOpen ? "xl:col-span-7 lg:col-span-11" : "xl:col-span-11 lg:col-span-11"
        }`}>
          
          {/* MONTH & NAV HEADER */}
          

          {/* MAIN CALENDAR TABLE CONTAINER */}
          <div className="flex flex-col border border-[#E6E6E6] rounded-[12px] overflow-hidden shadow-sm bg-[#FFFFFF]">
            
            {/* WEEKDAY ROW NAMES */}
            <div className="grid grid-cols-7 border-b border-[#E6E6E6]">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="py-4 text-center text-[#1C1C1C] px-2 text-[18px] sm:text-[15px] md:text-[18px] font-semibold font-[600] select-none border-r border-[#E6E6E6] last:border-r-0"
                >
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{day.charAt(0)}</span>
                </div>
              ))}
            </div>

            {/* MONTH DAYS GRID */}
            <div className="grid grid-cols-7 bg-[#F9F9F9]">
              {calendarCells.map((cell, idx) => {
                if (cell.isBlank) {
                  const isStartBlank = idx < firstDayIndex;
                  return (
                    <div
                      key={`blank-${idx}`}
                      className={`w-full border-b border-[#E6E6E6] min-h-[80px] sm:min-h-[80px] md:min-h-[100px] lg:min-h-[110px] ${
                        isStartBlank ? "bg-[#F9F9F9] border-r" : "bg-[#FFFFFF] border-r"
                      }`}
                    />
                  );
                }

                const isToday = isSameDay(cell.date, new Date());
                const isSelected = isSameDay(cell.date, selectedDate);
                const hasEvents = cell.events.length > 0;

                return (
                  <div
                    key={cell.dateKey}
                    onClick={() => handleDayClick(cell)}
                    className={`relative flex flex-col justify-between p-2 min-h-[110px] sm:min-h-[100px] md:min-h-[110px] lg:min-h-[110px]  cursor-pointer transition-all duration-100 text-[#1C1C1C] text-[18px] font-[400] font-normal ${
                      isSelected 
                        ? "bg-[#FFFFFF] border-[2px] border-[#3995F6] z-10 shadow-sm animate-pulseOnce" 
                        : "bg-[#FFFFFF] border-r border-b border-[#E6E6E6]"
                    }`}
                  >
                    {/* NUMBER + DOT INDICATOR */}
                    <div className="flex items-start justify-between w-full pt-1">
                      {isSelected ? (
                        <div className=" ">
                          {cell.dayNum}
                        </div>
                      ) : (
                        <div
                          className={`w-8 h-8 flex rounded-[15px] select-none box-border ${
                            isToday
                              ?" w-8 h-8 rounded-full bg-[linear-gradient(to_right,#0B3142,#1C7DA8)] flex items-center justify-center text-[18px] sm:text-[15px] md:text-[18px] font-normal font-[400] text-[#FFFFFF] shadow transform scale-100 transition-all select-none"
                              : "items-center justify-center text-[#1C1C1C] group-hover:text-slate-800 text-[18px] sm:text-[15px] md:text-[18px] font-normal "
                          }`}
                        >
                          {cell.dayNum}
                        </div>
                      )}

                      {hasEvents && !isSelected && (
                        <div className="w-3.5 h-3.5 bg-[linear-gradient(to_right,#25277B,#3995F6)] rounded-full border-2 border-white shadow-sm mr-2 mt-1" />
                      )}
                    </div>

                    {/* DYNAMIC STACKED PILLS */}
                    <div className="mt-[5px] pb-1 flex flex-col gap-1 w-full items-start justify-end px-2 overflow-hidden">
                      {cell.events.map((evt) => {
                        const theme = CATEGORY_THEMES[evt.type] || CATEGORY_THEMES.other;
                        return (
                          <div
                            key={evt.id}
                            title={`${theme.label}: ${evt.title}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isSidebarOpen && isSameDay(selectedDate, cell.date)) {
                                setIsSidebarOpen(false);
                              } else {
                                setSelectedDate(cell.date);
                                setIsSidebarOpen(true);
                              }
                            }}
                            className={`text-[14px] sm:text-[12px] font-normal  px-2.5 py-0.25 rounded-[8px] border-[1.5px] border-solid box-border truncate max-w-[95%] text-left inline-block w-auto select-none transition-all duration-150 cursor-pointer hover:scale-105 hover:shadow-sm ${theme.badge}`}
                          >
                            {evt.title}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT PART: SIDEBAR PREVIEW (OPENS ONLY WHEN TRUE) */}
        {isSidebarOpen && (
          <div className="xl:col-span-4 lg:col-span-11 flex flex-col bg-white border border-[#E6E6E6] rounded-[12px] shadow-sm overflow-hidden w-full select-none animate-slideInRight animate-duration-300 ">
            
            {/* SLATE-BLUE HEADER BLOCK */}
            <div className="bg-[linear-gradient(to_right,#16222A,#3A6073)] text-[#FFFFFF] pt-5 pb-5 px-5 relative">
              <h3 className="text-[18px] sm:text-[1px] md:text-[18px] font-semibold font-[600]">
                {selectedDate ? selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                }) : "Select a Date"}
              </h3>
              <p className=" text-[#FFFFFF] mt-1 font-normal font-[400] text-[16px] tracking-wide">
                {selectedDateEvents.length} {selectedDateEvents.length === 1 ? "event" : "events"} scheduled
              </p>
            </div>

            {/* CARD LIST */}
            <div className="pt-5 pr-4 pl-4 pb-6 flex flex-col gap-4 max-h-[500px] overflow-y-auto scrollbar-thin">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((evt) => {
                  const theme = CATEGORY_THEMES[evt.type] || CATEGORY_THEMES.other;
                  // API image pehle (Cloudinary/default), phir static fallback
                  const coverImage =
                    evt.uploadedImage ||
                    evt.image ||
                    CATEGORY_IMAGES[evt.type] ||
                    CATEGORY_IMAGES.other;

                  return (
                    <div
                      key={evt.id}
                      className="flex gap-5  border  border-[#E6E6E6] rounded-[8px] bg-[#FFFFFF] transition duration-150 transform hover:shadow-sm"
                    >
                      <img
                        src={coverImage}
                        alt={evt.title}
                        className="w-[200px] h-[140px] sm:w-[120px] sm:h-[140px] md:w-[180px] md:h-[140px] object-cover shrink-0 rounded-l-[8px] "
                      />

                      <div className="flex flex-col justify-center gap-2 min-w-0 flex-1">
                        <div>
                          <h4 className="text-[16px] sm:text-[14px] md:text-[16px] font-normal font-[400] text-[#000000] leading-snug truncate">
                            {evt.title}
                          </h4>
                          
                          <div className="mt-3 flex">
                            <span
                              className={`inline-block text-[12px] sm:text-[10px] md:text-[12px] uppercase font-normal  px-3.5 py-0.125 rounded-[9px] border-[1.5px] border-solid box-border ${theme.badge}`}
                            >
                              {theme.label}
                            </span>
                          </div>
                        </div>

                        {evt.startTime && (
                          <div className="text-[14px] sm:text-[12px] md:text-[14px] text-[#000000] -mt-[4px] font-[400] font-normal">
                            {formatTo12Hour(evt.startTime)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-16 text-center text-[#7C7C7C] border border-[#E6E6E6] border-dashed rounded-[18px] bg-white">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-2.5 border border-slate-150">
                    <LuCalendar className="text-base" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-700">No Events Scheduled</h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Click any calendar cell with events to preview.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* POPUP SCHEDULER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-[1px] flex items-center justify-center p-4 z-50 animate-fadeIn">
          
        </div>
      )}
    </div>
  );
};

export default Calender;