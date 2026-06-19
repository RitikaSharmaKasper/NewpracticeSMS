import React, { useState, useRef, useEffect } from "react";

const EditNoticeModal = ({ isOpen, onClose, onSubmit, noticeData }) => {
  const calendarRef = useRef(null);
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [previewUrl, setPreviewUrl] = useState("");
  const roleDropdownRef = useRef(null);
  const [editedNotice, setEditedNotice] = useState({
    title: "",
    description: "",
    venue: "",
    publishDate: "",
    publishTime: "",
    messageTo: [],
    uploadedFile: null,
    uploadedFileName: "",
    uploadedFileType: "",
  });
 const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const roles = [
   "All","Student",
    "Super Admin", "Teacher", 

  ];

  // Populate form when noticeData changes or modal opens
  useEffect(() => {
    if (isOpen && noticeData) {
      // Extract existing attachment if any
      const existingAttachment = noticeData.attachments?.[0] || null;
      const savedRoles = Array.isArray(noticeData.messageFor)
        ? noticeData.messageFor.filter(r => roles.includes(r))
        : [];
 
      setEditedNotice({
        title: noticeData.title || "",
        description: noticeData.description || "",
        venue: noticeData.venue || "",
        publishDate: noticeData.publishDate || "",
        publishTime: noticeData.publishTime || "",
           messageTo: savedRoles,
        uploadedFile: existingAttachment?.url || null,
        uploadedFileName: existingAttachment?.fileName || "",
        uploadedFileType: existingAttachment?.fileType || "",
      });

      setPreviewUrl("");
      setUploadError("");
      setIsCalendarOpen(false);

      // Set calendar to the notice's publish date month if available
      if (noticeData.publishDate) {
        const d = new Date(noticeData.publishDate + "T00:00:00");
        if (!isNaN(d.getTime())) setCurrentCalendarDate(d);
        else setCurrentCalendarDate(new Date());
      } else {
        setCurrentCalendarDate(new Date());
      }
    }
  }, [isOpen, noticeData]);

 

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
        if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setIsRoleDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

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
    setEditedNotice({ ...editedNotice, publishDate: `${year}-${month}-${dayString}` });
    setIsCalendarOpen(false);
  };

  const renderCalendarDays = () => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const dayButtons = [];

    for (let i = 0; i < firstDayIndex; i++) {
      dayButtons.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const monthString = String(month + 1).padStart(2, "0");
      const dayString = String(day).padStart(2, "0");
      const combinedTargetString = `${year}-${monthString}-${dayString}`;
      const isSelected = editedNotice.publishDate === combinedTargetString;

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

  const processUploadedFile = (file) => {
    if (!file) return;
    setUploadError("");

    const isImage = file.type.startsWith("image/");
    const isPDF = file.type === "application/pdf";

    if (!isImage && !isPDF) {
      setUploadError("Only images and PDF files are allowed.");
      return;
    }

    const MIN_SIZE = 10 * 1024;
    const MAX_SIZE = 5 * 1024 * 1024;

    if (file.size < MIN_SIZE) {
      setUploadError("File is too small! Must be at least 10 KB.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setUploadError("File is too large! Must be under 5 MB.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(isImage ? URL.createObjectURL(file) : "");
    setEditedNotice(prev => ({
      ...prev,
      uploadedFile: file,
      uploadedFileName: file.name,
      uploadedFileType: isImage ? "image" : "pdf",
    }));
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
      e.target.value = "";
    }
  };

  const handleRoleToggle = (role) => {
    setEditedNotice(prev => {
      if (prev.messageTo.includes(role)) {
        return { ...prev, messageTo: prev.messageTo.filter(r => r !== role) };
      } else {
        return { ...prev, messageTo: [...prev.messageTo, role] };
      }
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!editedNotice.title || !editedNotice.description || !editedNotice.publishDate || !editedNotice.publishTime) {
      alert("Please fill in all required fields: Title, Notice, Publish Date, and Publish Time.");
      return;
    }

    onSubmit({
      ...noticeData, // preserve original id, publishOn, etc.
      ...editedNotice,
      messageFor: editedNotice.messageTo.length > 0 ? editedNotice.messageTo : ["All"],
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[0.5px] flex items-center justify-center p-4 md:p-6 z-50 animate-fadeIn">
      <div className="bg-white rounded-[16px] w-full max-w-[52rem] max-h-[70vh] sm:max-h-[50vh] md:max-h-[80vh] flex flex-col overflow-hidden shadow-2xl border border-[#E6E6E6] relative animate-scaleUp">

        {/* Header */}
        <div className="bg-white text-slate-800 pt-5 pb-0 px-6 relative flex justify-between items-center select-none">
          <div>
            <h3 className="text-[18px] font-semibold font-[600] text-[#1C1C1C]">Edit Notice</h3>
            <p className="text-[16px] text-[#9C9C9C] font-normal">Update the notice details below</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#1C1C1C] p-1 rounded-full transition cursor-pointer flex items-center justify-center font-bold"
            title="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmitForm} className="flex-1 overflow-y-auto overflow-x-visible p-7 space-y-3">

          {/* Admin sender badge */}
        
          {/* Title */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
              Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Annual Sports Day Celebration"
              value={editedNotice.title}
              onChange={(e) => {
                const value = e.target.value;
                const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                setEditedNotice({ ...editedNotice, title: capitalizedValue });
              }}
              className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#1C1C1C] font-[400]"
            />
          </div>

          {/* Notice / Description */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
              Notice
            </label>
            <textarea
              rows={4}
              placeholder="Brief description of the notice"
              value={editedNotice.description}
              onChange={(e) => {
                const value = e.target.value;
                const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                setEditedNotice({ ...editedNotice, description: capitalizedValue });
              }}
              className="w-full px-4 py-2 text-[14px] bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#1C1C1C] font-[400] resize-none"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 gap-3 relative z-30">
            <div className="relative" ref={calendarRef}>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                Publish Date
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center"
                >
                  <span className={editedNotice.publishDate ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
                    {editedNotice.publishDate ? editedNotice.publishDate : "mm/dd/yyyy"}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-4 h-4 text-[#9C9C9C]">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h40v-40h80v40h320v-40h80v40h40q33 0 56.5 23.5T840-760v560q0-33-23.5 33.5T760-120H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                  </svg>
                </button>

                {isCalendarOpen && (
                  <div className="absolute left-0 z-50 mt-1 bg-white border border-[#E6E6E6] rounded-[16px] shadow-xl p-4 w-[280px]">
                    <div className="flex justify-between items-center mb-3">
                      <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm">&lt;</button>
                      <span className="text-sm font-semibold text-[#1C1C1C]">
                        {months[currentCalendarDate.getMonth()]} {currentCalendarDate.getFullYear()}
                      </span>
                      <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm">&gt;</button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center mb-1">
                      {daysOfWeek.map(day => (
                        <span key={day} className="text-[11px] font-semibold text-[#9C9C9C] uppercase">{day}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {renderCalendarDays()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                Publish Time
              </label>
              <input
                type="time"
                value={editedNotice.publishTime}
                onChange={(e) => setEditedNotice({ ...editedNotice, publishTime: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition text-[#1C1C1C] font-[400]"
              />
            </div>
          </div>

          {/* Message To */}
         <div>
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
              Message For
            </label>
            <div className="relative" ref={roleDropdownRef}>
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center"
              >
                {/* Shows selected role names fetched from createdBy.role */}
                <span className={editedNotice.messageTo.length > 0 ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
                {editedNotice.messageTo.length > 0
          ? editedNotice.messageTo.join(", ")
          : "Select roles"}
                </span>
                <svg
                  className={`w-4 h-4 text-[#9C9C9C] transition-transform duration-200 ${isRoleDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
 
              {isRoleDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[12px] shadow-lg overflow-hidden py-1">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleToggle(role)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors flex justify-between items-center
                        ${editedNotice.messageTo.includes(role)
                          ? "bg-[#F5F5F5] text-[#1C1C1C] font-medium"
                          : "text-[#4A4A4A] hover:bg-[#F9F9F9] hover:text-[#1C1C1C]"
                        }`}
                    >
                      {role}
                      {editedNotice.messageTo.includes(role) && (
                        <svg className="w-4 h-4 text-[#0B3142]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Attachments */}
          <div className="relative z-0">
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
              Attachments
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-[12px] p-4 text-center transition cursor-pointer flex flex-col items-center justify-center min-h-[110px] select-none ${
                dragActive
                  ? "border-[#118AB2]"
                  : editedNotice.uploadedFile
                    ? "border-green-400 bg-green-50/10"
                    : "border-[#BFDBFE]"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                className="hidden"
              />

              {editedNotice.uploadedFile ? (
                <div className="flex flex-col items-center justify-center">
                  {editedNotice.uploadedFileType === "image" ? (
                    <img
                      src={previewUrl || editedNotice.uploadedFile}
                      alt="Preview"
                      className="max-h-20 object-contain rounded-[8px] border border-gray-200 mb-1 shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-red-600 font-bold">PDF</span>
                    </div>
                  )}
                  <p className="text-[14px] font-semibold text-green-600">File Selected Successfully!</p>
                  {editedNotice.uploadedFileName && (
                    <p className="text-[12px] text-slate-500 mt-0 max-w-sm truncate mx-auto font-medium">
                      {editedNotice.uploadedFileName}
                    </p>
                  )}
                  <p className="text-[11px] text-[#9C9C9C] mt-1">Click to replace file</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-[15px] text-[#1C1C1C] font-normal">
                    Drag & Drop to upload or <span className="text-[#118AB2] underline">Browse</span>
                  </p>
                  <p className="text-[13px] text-[#696969] mt-0 font-normal">
                    Only Image and PDF files are allowed.
                  </p>
                </div>
              )}
            </div>
            {uploadError && (
              <p className="text-red-500 text-xs mt-1 font-semibold text-center select-none">{uploadError}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 relative z-0">
            <button
              type="button"
              onClick={onClose}
              className="px-7 py-2 h-[40px] border border-[#9C9C9C] bg-[#FFFFFF] text-[#696969] rounded-[8px] font-[600] text-[16px] font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2 h-[40px] bg-[#0B3142] text-white rounded-[8px] text-[16px] font-semibold transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoticeModal;
