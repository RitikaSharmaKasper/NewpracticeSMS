import React, { useState, useEffect, useRef } from "react";
import upload from "../../assets/images/upload.png";
import CustomCalendar from "../../components/utils/CustomCalendar";
const EditEventModal = ({ isOpen, onClose, onSubmit, eventData }) => {
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const calendarRef = useRef(null); // Added for the custom calendar container link
  
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Added calendar visibility state

  // Tracking date for month switching navigation inside custom calendar view
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  // Form fields for Edit Event
  const [eventState, setEventState] = useState({
    title: "",
    type: "academic",
    date: "",
    startTime: "09:00",
    endTime: "14:00",
    description: "",
    location: "",
    organizer: "",
    isHoliday: false,
    uploadedImage: null,  // Base64 Image
    uploadedFileName: ""  // Saved File Name
  });

  const dropdownOptions = [
    { value: "academic", label: "Academic" },
    { value: "sports", label: "Sports" },
    { value: "holiday", label: "Holiday" },
    { value: "celebration", label: "Cultural" }
  ];

  // Initialize and populate form fields cleanly whenever eventData loads/changes
  useEffect(() => {
    if (isOpen && eventData) {
      setEventState({
        title: eventData.title || "",
        type: eventData.type || "academic",
        date: eventData.date || "",
        startTime: eventData.startTime || "09:00",
        endTime: eventData.endTime || "14:00",
        description: eventData.description || "",
        location: eventData.location || eventData.venue || "",
        organizer: eventData.organizer || "",
        isHoliday: eventData.isHoliday || false,
        uploadedImage: eventData.uploadedImage || eventData.image || null,
        uploadedFileName: eventData.uploadedFileName || eventData.imageFileName || "",
      });
      setImageFile(null);
      setUploadError(""); // Clear errors on opening fresh

      // Initialize calendar focus year/month to match the active event date if present
      if (eventData.date) {
        const parsedDate = new Date(eventData.date);
        if (!isNaN(parsedDate.getTime())) {
          setCurrentCalendarDate(parsedDate);
        }
      } else {
        setCurrentCalendarDate(new Date());
      }
    }
  }, [isOpen, eventData]);

  // Global click tracker: dismisses the dropdown menus cleanly if clicked externally
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTypeDropdownOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const currentSelectedOption = dropdownOptions.find(opt => opt.value === eventState.type);

  // Custom Calendar Engine Helper Metrics
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleSelectDay = (day) => {
    const year = currentCalendarDate.getFullYear();
    const month = String(currentCalendarDate.getMonth() + 1).padStart(2, "0");
    const dayString = String(day).padStart(2, "0");
    
    // Updates object into standard HTML date tracking format syntax: YYYY-MM-DD
    setEventState({ ...eventState, date: `${year}-${month}-${dayString}` });
    setIsCalendarOpen(false);
  };

  const renderCalendarDays = () => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    
    const dayButtons = [];

    // Alignment offsets for initial row layout grid structure
    for (let i = 0; i < firstDayIndex; i++) {
      dayButtons.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    // Active numerical render slots
    for (let day = 1; day <= totalDays; day++) {
      const monthString = String(month + 1).padStart(2, "0");
      const dayString = String(day).padStart(2, "0");
      const combinedTargetString = `${year}-${monthString}-${dayString}`;
      const isSelected = eventState.date === combinedTargetString;

      dayButtons.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={() => handleSelectDay(day)}
          className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-colors cursor-pointer
            ${isSelected 
              ? "bg-[#0B3142] text-white" 
              : "text-[#1C1C1C] hover:bg-slate-100"
            }`}
        >
          {day}
        </button>
      );
    }

    return dayButtons;
  };

  // Convert uploaded files to base64 Data URLs
  const processUploadedFile = (file) => {
    if (!file) return;
    // Reset error on new upload attempt
    setUploadError("");

    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setUploadError("Only PNG, JPEG, or WEBP images are allowed.");
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      setUploadError("Image is too large! Must be under 5 MB.");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setEventState(prev => ({
        ...prev,
        uploadedImage: e.target.result,
        uploadedFileName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragActive(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setDragActive(false); };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
      e.target.value = ""; // Clear file input value to allow re-uploading the same file
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!eventState.title || !eventState.date) return;
    
    // Invoke main save function with the event ID preserved
    onSubmit({
      ...eventState,
      id: eventData.id,
      imageFile,
      isHoliday: eventState.type === "holiday" || eventState.isHoliday,
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[0.5px] flex items-center justify-center p-4 md:p-6 z-50 animate-fadeIn">
      
    <div className="bg-white rounded-[16px] w-full max-w-[52rem] max-h-[75vh] flex flex-col overflow-hidden shadow-2xl border border-[#E6E6E6] relative animate-scaleUp">

       

        {/* Fixed Modal Header */}

        <div className="bg-white text-slate-800 pt-5 pb-1 px-6 relative flex justify-between items-center select-none">

          <div>

            <h3 className="text-[18px] font-semibold font-[600] text-[#1C1C1C]">Edit Event</h3>

            <p className="text-[16px] text-[#9C9C9C] font-normal">Modify the school event details</p>

          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-[#1C1C1C] p-2 rounded-full transition cursor-pointer flex items-center justify-center font-bold"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form Body Container */}
        <form onSubmit={handleSubmitForm} className="flex-1 overflow-y-auto overflow-x-visible p-8 space-y-4">
          
          {/* Event Title */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Mid-Term Examinations"
              value={eventState.title}
              onChange={(e) => {
                const value = e.target.value;
                const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                setEventState({ ...eventState, title: capitalizedValue });
              }}
              className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#1C1C1C] font-[400]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Provide a brief summary of the activity..."
              value={eventState.description}
              onChange={(e) => {
                const value = e.target.value;
                const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                setEventState({ ...eventState, description: capitalizedValue });
              }}
              className="w-full px-4 py-2 text-[14px] bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#1C1C1C] font-[400] resize-none"
            />
          </div>

          {/* Grid: Type & Date */}
          <div className="grid grid-cols-2 gap-5 relative z-30">
            {/* Event Category Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                Event Type *
              </label>
              
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                  className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center"
                >
                  <span className={currentSelectedOption ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
                    {currentSelectedOption ? currentSelectedOption.label : "Select type"}
                  </span>
                  
                  <svg
                    className={`w-4 h-4 text-[#9C9C9C] transition-transform duration-200 ${isTypeDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isTypeDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[12px] shadow-lg overflow-hidden py-1">
                    {dropdownOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setEventState({ ...eventState, type: option.value });
                          setIsTypeDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors block
                          ${eventState.type === option.value 
                            ? "bg-[#F5F5F5] text-[#1C1C1C] font-medium" 
                            : "text-[#4A4A4A] hover:bg-[#F9F9F9] hover:text-[#1C1C1C]"
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Event Custom Calendar Component Dropdown */}
            <div className="relative" ref={calendarRef}>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                Date *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center"
                >
                  <span className={eventState.date ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
                    {eventState.date ? eventState.date : "Select calendar date"}
                  </span>
                      <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 -960 960 960" 
    className="w-4 h-4 text-[#9C9C9C]"
  >
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h40v-40h80v40h320v-40h80v40h40q33 0 56.5 23.5T840-760v560q0-33-23.5 33.5T760-120H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
  </svg>
                </button>

                {/* Floating custom element dashboard popdown */}
                {isCalendarOpen && (
                  <div className="absolute right-0 z-50 mt-1 bg-white border border-[#E6E6E6] rounded-[16px] shadow-xl p-4 w-[280px]">
                    
                    {/* Month Selection controls layout row */}
                    <div className="flex justify-between items-center mb-3">
                      <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm">
                        &lt;
                      </button>
                      <span className="text-sm font-semibold text-[#1C1C1C]">
                        {months[currentCalendarDate.getMonth()]} {currentCalendarDate.getFullYear()}
                      </span>
                      <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm">
                        &gt;
                      </button>
                    </div>

                    {/* Day Headers row labels */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-1">
                      {daysOfWeek.map(day => (
                        <span key={day} className="text-[11px] font-semibold text-[#9C9C9C] uppercase">{day}</span>
                      ))}
                    </div>

                    {/* Numeric Days layout wrapper mapping grids */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {renderCalendarDays()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Grid: Times */}
          <div className="grid grid-cols-2 gap-5 relative z-20">
            {/* Start Time */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                Start Time
              </label>
              <input
                type="time"
                disabled={eventState.type === "holiday"}
                value={eventState.startTime}
                onChange={(e) => setEventState({...eventState, startTime: e.target.value})}
                className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition text-[#1C1C1C] font-[400] disabled:opacity-50"
              />
            </div>

            {/* End Time */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                End Time
              </label>
              <input
                type="time"
                disabled={eventState.type === "holiday"}
                value={eventState.endTime}
                onChange={(e) => setEventState({...eventState, endTime: e.target.value})}
                className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition text-[#1C1C1C] font-[400] disabled:opacity-50"
              />
            </div>
          </div>

          {/* Grid: Location & Organizer */}
          <div className="grid grid-cols-2 gap-5 relative z-10">
            {/* Location */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g., school ground"
                value={eventState.location}
                onChange={(e) => {
                  const value = e.target.value;
                  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                  setEventState({ ...eventState, location: capitalizedValue });
                }}
                className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#1C1C1C] font-[400]"
              />
            </div>

            {/* Organizer */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                Organizer
              </label>
              <input
                type="text"
                placeholder="e.g., Sport Department"
                value={eventState.organizer}
                onChange={(e) => {
                  const value = e.target.value;
                  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                  setEventState({ ...eventState, organizer: capitalizedValue });
                }}
                className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#1C1C1C] font-[400]"
              />
            </div>
          </div>

          {/* Drag & Drop File Upload */}
          <div className="relative z-0">
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
              Upload Image
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-[12px] p-4 text-center transition cursor-pointer flex flex-col items-center justify-center min-h-[110px] select-none ${
                dragActive 
                  ? "border-[#118AB2]" 
                  : eventState.uploadedImage 
                    ? "border-green-400 bg-green-50/10" 
                    : "border-[#BFDBFE]"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              {eventState.uploadedImage ? (
                <div className="flex flex-col items-center justify-center">
                  <img 
                    src={eventState.uploadedImage} 
                    alt="Preview" 
                    className="max-h-20 object-contain rounded-[8px] border border-gray-200 mb-1 shadow-sm"
                  />
                  <p className="text-[14px] font-semibold text-green-600">File Selected Successfully!</p>
                  {eventState.uploadedFileName && (
                    <p className="text-[12px] text-slate-500 mt-0 max-w-sm truncate mx-auto font-medium">
                      {eventState.uploadedFileName}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1">
                    <div className="h-6 w-6 bg-[#118AB2]" 
                      style={{
                        maskImage: `url(${upload})`,
                        WebkitMaskImage: `url(${upload})`,
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain'
                      }}
                    ></div>
                  </div>
                  <p className="text-[15px] text-[#1C1C1C] font-normal">
                    Drag & Drop to upload or <span className="text-[#118AB2] underline">Browse</span>
                  </p>
                  <p className="text-[13px] text-[#696969] mt-0 font-normal">
                    Only images are allowed.
                  </p>
                </div>
              )}
            </div>
            {uploadError && (
              <p className="text-red-500 text-xs mt-1 font-semibold text-center select-none">{uploadError}</p>
            )}
          </div>

          {/* Fixed Footer Actions Area */}
          <div className="flex justify-end gap-3 pt-4 relative z-0">
            <button
              type="button"
              onClick={onClose}
              className="px-7 py-2 border border-[#9C9C9C] bg-[#FFFFFF] text-[#696969] rounded-[8px] font-[600] text-[16px] font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 bg-[#0B3142] text-white rounded-[8px] text-[16px] font-semibold shadow-md transition cursor-pointer font-[Segoe UI]"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditEventModal;