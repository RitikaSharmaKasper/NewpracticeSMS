import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import backarrow from "../../assets/images/backarrow.png";
import nodata_foundIcon from "../../assets/images/absence.png"
import {
  fetchUpcomingEvents,
  getApiErrorMessage,
} from "../../services/eventApi";
const COVER_IMAGES = {
  exam: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
  sports: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=80",
  holiday: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=800&auto=format&fit=crop&q=80",
  celebration: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop&q=80",
  meeting: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
  academic: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
  event: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
  pdfPlaceholder: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&auto=format&fit=crop&q=80",
  other: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80"
};

const CUSTOM_IMAGE_MAP = {
  "gandhi jayanti": "https://images.unsplash.com/photo-1601342602183-bf9c9d5ecdc1?w=800&auto=format&fit=crop&q=80",
  "dussehra": "https://images.unsplash.com/photo-1605713488210-91fc4c944358?w=800&auto=format&fit=crop&q=80",
  "diwali": "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800&auto=format&fit=crop&q=80",
  "guru nanak": "https://images.unsplash.com/photo-1590075865003-e48277afd558?w=800&auto=format&fit=crop&q=80",
  "rhythm fest": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
  "bhaiya dooj": "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?w=800&auto=format&fit=crop&q=80",
  "chhath puja": "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=800&auto=format&fit=crop&q=80",
  "children's day": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80"
};

const formatDateString = (dateStr) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long"
  });
};

const getDayName = (dateStr) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { weekday: "long" });
};

const getDayNumber = (dateStr) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { day: "2-digit" });
};

const getMonthShort = (dateStr) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short" });
};

const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":");
  const h = parseInt(hour, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const formattedHour = h % 12 || 12;
  return `${formattedHour}:${minute} ${ampm}`;
};

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUpcomingEvents = useCallback(async () => {
    setLoading(true);
    try {
      const { events: list } = await fetchUpcomingEvents({ limit: 100 });
      setEvents(list);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to load upcoming events"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUpcomingEvents();
  }, [loadUpcomingEvents]);

  const getEventImageAndLabel = (evt) => {
    let label = "EVENT";
    if (evt.type === "holiday") label = "HOLIDAY";
    if (evt.type === "exam") label = "EXAM";
    if (evt.type === "sports") label = "SPORTS";
    if (evt.type === "academic") label = "ACADEMIC";
    if (evt.type === "celebration") label = "CULTURAL";

    const imageUrl = evt.uploadedImage || evt.image;
    if (imageUrl) {
      return { image: imageUrl, label };
    }
    // If event has a PDF document uploaded, use PDF book cover image
    if (evt.uploadedPdf) {
      return { image: COVER_IMAGES.pdfPlaceholder, label };
    }

    const titleLower = evt.title.toLowerCase();
    let image = COVER_IMAGES[evt.type] || COVER_IMAGES.other;
    
    Object.keys(CUSTOM_IMAGE_MAP).forEach((key) => {
      if (titleLower.includes(key)) {
        image = CUSTOM_IMAGE_MAP[key];
      }
    });

    return { image, label };
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto -my-[10px] flex flex-col gap-10 relative overflow-hidden">
      <div className="mb-1">
        <h2 className="text-[24px] font-semibold text-[#1C1C1C] pl-1">
          Upcoming Events
        </h2>
      </div>

   
{loading ? (
  <p className="text-center text-[#6A7282] py-10">Loading upcoming events...</p>
) : events.length === 0 ? (
  <div className="border border-[#E5E7EB]  bg-white rounded-[14px] p-8 flex flex-col items-center justify-center gap-[15px] text-center w-full max-w-[1500px] mx-auto">
    <img
      className="w-[80px] opacity-[50%]"
      src={nodata_foundIcon}
      alt="nodata"
    />
    <h3 className="text-[16px] font-semibold text-[#364153] mb-0 mt-[16px]">No Events Listed</h3>
    <p className="text-[#6B7280] text-[14px] font-medium -mt-[8px]">
     
    </p>
  </div>
) :(
      <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-x-7 gap-y-6 w-full max-w-[1500px] justify-items-center mx-auto">
        {events.map((evt) => {
          const { image } = getEventImageAndLabel(evt);
          const venue = evt.venue || evt.location || null;

          return (
            <div
              key={evt.id}
              onClick={() => setSelectedEvent(evt)}
              className="bg-[#FFFFFF] rounded-[8px] border border-[#0000001A] shadow-[1px_0_4px_1px_rgba(0,0,0,0.11),-1px_0_10px_-2px_rgba(0,0,0,0.11)] hover:shadow-[1px_0_10px_-2px_rgba(0,0,0,0.2),-16px_0_24px_-4px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row h-auto sm:min-h-[180px] sm:max-h-[180px] w-full max-w-[470px] min-w-0 cursor-pointer"
            >
              <div className="relative w-full sm:w-[70px]  md:w-[100px] xl:w-[170px] lg:w-[110px] h-[130px]  sm:h-full shrink-0 overflow-hidden">
                <img
                  src={image}
                  alt={evt.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="pt-2 pl-3 pr-3 pb-2 flex flex-col justify-between flex-grow min-w-0">
                <div className="min-w-0">
                  <h3 className="text-[16px] font-semibold text-[#1C1C1C]" title={evt.title}>
                    {evt.title}
                  </h3>
                  <p className="text-[12px] text-[#9C9C9C] font-normal mt-1 line-clamp-4">
                    {evt.description || "No event description provided. Please verify parameters inside dashboard config tools."}
                  </p>
                </div>

          
<div className="sm:mt-0 flex flex-col justify-between min-w-0 pb-3 lg:pt-0 pb-4 xl:pt-6 sm:pb-3 md:pt-0">
  <div className="flex flex-col gap-0 min-w-0">
    {venue ? (
      <div className="text-[12px] text-[#696969] font-normal font-[400]">
        <span className="text-[14px] font-normal font-[400] text-[#000000]">Venue:</span> {venue}
      </div>
    ) : (
      /* Invisible placeholder line that takes up the exact height of a venue row to prevent cutting or shifting */
      <div className="text-[12px] h-[18px] select-none pointer-events-none" aria-hidden="true">&nbsp;</div>
    )}
    <div className="text-[12px] text-[#696969] font-normal font-[400]">
      <span className="text-[14px] font-normal font-[400] text-[#000000]">Date:</span>{" "}
      <span>
        {formatDateString(evt.date)}
        {evt.startTime && ` • ${formatTime(evt.startTime)}`}
      </span>
    </div>
  </div>
</div>
              </div>
            </div>
          );
        })}
      </div>
      )}

      {selectedEvent && (

<>
    {/* Background Overlay with Blur */}
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-[0.5px] z-[9999] animate-in fade-in duration-300"
      onClick={() => setSelectedEvent(null)} // Clicking the blurred background closes the sidebar
    />

       <div 
  className="fixed top-0 right-0 h-[calc(200vh-39px)] w-full max-w-[450px] bg-[#FFFFFF] shadow-[-8px_0_24px_rgba(0,0,0,0.15)] border-l border-[#0000001A] rounded-[12px] flex flex-col z-[9999] animate-in slide-in-from-right duration-300 overflow-hidden"
  onClick={(e) => e.stopPropagation()}
>
          <div className="relative w-full h-[355px] shrink-0  px-6 py-19 pb-0">
           
            <img
              src={getEventImageAndLabel(selectedEvent).image}
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
                {selectedEvent.venue || selectedEvent.location || "School Campus"}
              </p>
            </div>

            <div>
              <h4 className="text-[18px] font-semibold text-[#1C1C1C]">Timing</h4>
              <p className="text-[14px] text-[#696969] font-normal font-[400]">
                {selectedEvent.startTime ? formatTime(selectedEvent.startTime) : "7:00 PM"} 
                {selectedEvent.endTime ? ` - ${formatTime(selectedEvent.endTime)}` : " - 11:00 PM"}
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

export default UpcomingEvents;