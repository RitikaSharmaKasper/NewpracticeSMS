import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import presetBooks from "../../data/books.json";
import { HiSearch, HiX } from 'react-icons/hi';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import plusIcon from "../../assets/images/plus.png";
import checked from "../../assets/images/check.png";
import scancode from "../../assets/images/scancode.png";
import scancode_2 from "../../assets/images/scancode-2.png";
import { QrCode, X, Camera } from "lucide-react";

// ─── QR Camera Modal ──────────────────────────────────────────────────────────
const QRScannerModal = ({ onClose, onScan }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const jsQRRef = useRef(null);
  const [status, setStatus] = useState("Initializing camera…");
  const [error, setError] = useState(null);
  const [torchOn, setTorchOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [scanned, setScanned] = useState(false);

  // Load jsQR dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";
    script.async = true;
    script.onload = () => {
      jsQRRef.current = window.jsQR;
      startCamera();
    };
    script.onerror = () => setError("Failed to load QR library.");
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const startCamera = async () => {
    try {
      setStatus("Opening camera…");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Check torch support
      const track = stream.getVideoTracks()[0];
      const caps = track.getCapabilities?.() || {};
      if (caps.torch) setTorchSupported(true);

      setStatus("Scanning — point at a QR code");
      requestAnimationFrame(tick);
    } catch (err) {
      if (err.name === "NotAllowedError") {
        setError(
          "Camera permission denied. Please allow camera access and try again.",
        );
      } else if (err.name === "NotFoundError") {
        setError("No camera found on this device.");
      } else {
        setError("Could not start camera: " + err.message);
      }
    }
  };

  const tick = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !jsQRRef.current) {
      animFrameRef.current = requestAnimationFrame(tick);
      return;
    }
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      animFrameRef.current = requestAnimationFrame(tick);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const code = jsQRRef.current(
      imageData.data,
      imageData.width,
      imageData.height,
      {
        inversionAttempts: "dontInvert",
      },
    );

    if (code && !scanned) {
      setScanned(true);
      handleScanned(code.data);
      return;
    }

    animFrameRef.current = requestAnimationFrame(tick);
  }, [scanned]);

  const handleScanned = (data) => {
    setStatus("✅ QR Code scanned!");
    stopCamera();
    setTimeout(() => {
      onScan(data);
      onClose();
    }, 400);
  };

  const stopCamera = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    const newState = !torchOn;
    try {
      await track.applyConstraints({ advanced: [{ torch: newState }] });
      setTorchOn(newState);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(480px, 95vw)",
          background: "#0E101A",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <QrCode size={20} color="#60A5FA" />
            <span
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Scan QR Code
            </span>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: 8,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Camera view */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4/3",
            background: "#000",
          }}
        >
          {error ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                gap: 12,
              }}
            >
              <Camera size={40} color="#EF4444" />
              <p
                style={{
                  color: "#EF4444",
                  textAlign: "center",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                }}
              >
                {error}
              </p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                playsInline
                muted
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />

              {/* Scan overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                }}
              >
                {/* Dark corners */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.35)",
                  }}
                />

                {/* Scan frame */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 200,
                    height: 200,
                  }}
                >
                  {/* Corner brackets */}
                  {[
                    {
                      top: 0,
                      left: 0,
                      borderTop: "3px solid #60A5FA",
                      borderLeft: "3px solid #60A5FA",
                      borderRadius: "8px 0 0 0",
                    },
                    {
                      top: 0,
                      right: 0,
                      borderTop: "3px solid #60A5FA",
                      borderRight: "3px solid #60A5FA",
                      borderRadius: "0 8px 0 0",
                    },
                    {
                      bottom: 0,
                      left: 0,
                      borderBottom: "3px solid #60A5FA",
                      borderLeft: "3px solid #60A5FA",
                      borderRadius: "0 0 0 8px",
                    },
                    {
                      bottom: 0,
                      right: 0,
                      borderBottom: "3px solid #60A5FA",
                      borderRight: "3px solid #60A5FA",
                      borderRadius: "0 0 8px 0",
                    },
                  ].map((style, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        width: 28,
                        height: 28,
                        ...style,
                      }}
                    />
                  ))}

                  {/* Scan line animation */}
                  <div
                    style={{
                      position: "absolute",
                      left: 6,
                      right: 6,
                      height: 2,
                      background:
                        "linear-gradient(90deg, transparent, #60A5FA, transparent)",
                      animation: "scanLine 2s linear infinite",
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#0E101A",
          }}
        >
          <p
            style={{
              color: scanned ? "#34D399" : "#9CA3AF",
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
              margin: 0,
              transition: "color 0.3s",
            }}
          >
            {status}
          </p>
          {torchSupported && !error && (
            <button
              onClick={toggleTorch}
              title="Toggle flashlight"
              style={{
                background: torchOn ? "#60A5FA" : "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: 8,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: torchOn ? "#0E101A" : "#fff",
                transition: "all 0.2s",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6l-6 6" />
                <path d="M15 3l6 6-6.343 6.343A8 8 0 1 1 8.657 8.657L15 3z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scanLine {
          0% { top: 6px; opacity: 1; }
          90% { opacity: 1; }
          100% { top: calc(100% - 8px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const CustomDropdown = ({ label, options, value, onChange, placeholder, customLabel, hasScannerIcon = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption = options.find(opt => opt.value === value);







  return (
    <div className="relative" ref={dropdownRef}>
      {customLabel ? customLabel : (
        label && <label className="block text-[14px] font-normal text-[#1C1C1C] font-[600] mb-1">{label}</label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-[14px] bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center"
        >
          <span className={currentOption ? "text-[#696969]" : "text-[#9C9C9C]"}>
            {currentOption ? currentOption.label : placeholder}
          </span>
          <div className="flex items-center gap-2">
            <svg
              className={`w-4 h-4 text-[#9C9C9C] transition-transform duration-200 ${isOpen ? "" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            {hasScannerIcon && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 ml-1">
                <path d="M4 7V4h3"></path>
                <path d="M20 7V4h-3"></path>
                <path d="M4 17v3h3"></path>
                <path d="M20 17v3h-3"></path>
                <path d="M7 10h10"></path>
                <path d="M7 14h10"></path>
              </svg>
            )}
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[12px] shadow-lg overflow-hidden py-1 max-h-[200px] overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-[16px] transition-colors block
                  ${value === option.value 
                    ? "bg-[#F5F5F5] text-[#1C1C1C] font-normal" 
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
  );
};


// Add this new component before the IssueReturnBook component
const MultiSelectDropdown = ({ label, options, value, onChange, placeholder, customLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    const currentValues = value || [];
    if (currentValues.includes(optionValue)) {
      onChange(currentValues.filter(v => v !== optionValue));
    } else {
      onChange([...currentValues, optionValue]);
    }
  };

  const removeSelected = (optionValue, e) => {
    e.stopPropagation();
    onChange((value || []).filter(v => v !== optionValue));
  };

  const selectedOptions = options.filter(opt => (value || []).includes(opt.value));
  
  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {customLabel ? customLabel : (
        label && <label className="block text-[14px] font-normal text-[#9C9C9C] font-[600] mb-1">{label}</label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-[14px] bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center min-h-[50px]"
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {selectedOptions.length > 0 ? (
              selectedOptions.map(opt => (
                <span key={opt.value} className="bg-[#EFF2F2] px-2 py-1 rounded-[6px] text-[12px] text-[#1C1C1C] flex items-center gap-1">
                  {opt.label}
                  <button
                    type="button"
                    onClick={(e) => removeSelected(opt.value, e)}
                    className="hover:text-[#C92131] ml-1 text-[16px]"
                  >
                    ×
                  </button>
                </span>
              ))
            ) : (
              <span className="text-[#9C9C9C]">{placeholder}</span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg
              className={`w-4 h-4 text-[#9C9C9C] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[12px] shadow-lg overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-[#E6E6E6]">
              <input
                type="text"
                ref={searchRef}
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-[14px] border border-[#E6E6E6] rounded-[8px] outline-none "
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            {/* Options List */}
            <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`w-full text-left px-4 py-3 text-[14px] transition-colors block
                      ${(value || []).includes(option.value)
                        ? "bg-[#F5F5F5] text-[#1C1C1C] font-normal" 
                        : "text-[#4A4A4A] hover:bg-[#F9F9F9] hover:text-[#1C1C1C]"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.label}</span>
                      {(value || []).includes(option.value) && (
                        <svg 
                          className="w-5 h-5 text-blue-500" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-[14px] text-[#9C9C9C] text-center">
                  No books found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



const CustomCalendar = ({ label, value, onChange, placeholder, popDirection = "down" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectDay = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dayString = String(day).padStart(2, "0");
    onChange(`${dayString}/${month}/${year}`);
    setIsOpen(false);
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const monthString = String(month + 1).padStart(2, "0");
      const dayString = String(day).padStart(2, "0");
      const combined = `${dayString}/${monthString}/${year}`;
      const isSelected = value === combined;

      days.push(
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
    return days;
  };

  return (
    <div className="relative" ref={calendarRef}>
      <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-[16px] bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center"
        >
          <span className={value ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
            {value ? value : placeholder}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5 text-[#9C9C9C]">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h40v-40h80v40h320v-40h80v40h40q33 0 56.5 23.5T840-760v560q0-33-23.5 33.5T760-120H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
          </svg>
        </button>

        {isOpen && (
          <div className={`absolute right-0 z-50 bg-white border border-[#E6E6E6] rounded-[16px] shadow-xl p-4 w-[280px] ${popDirection === "up" ? "bottom-full mb-2" : "top-full mt-1"}`}>
            <div className="flex justify-between items-center mb-3">
              <button type="button" onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm">&lt;</button>
              <span className="text-sm font-semibold text-[#1C1C1C]">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
              <button type="button" onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {daysOfWeek.map(day => (
                <span key={day} className="text-[11px] font-semibold text-[#9C9C9C] uppercase">{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {renderDays()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DUMMY_MEMBERS = [
  { id: "mem1", name: "Rahul Sharma", code: "STU-0042" },
  { id: "mem2", name: "Anjali Desai", code: "STU-0043" },
  { id: "mem3", name: "Vikram Singh", code: "STU-0044" },
  { id: "mem4", name: "Priya Patel", code: "STU-0045" },
  { id: "mem5", name: "Rohan Gupta", code: "STU-0046" },
  { id: "mem6", name: "Neha Verma", code: "STU-0047" },
  { id: "mem7", name: "Amit Kumar", code: "STU-0048" },
  { id: "mem8", name: "Sneha Reddy", code: "STU-0049" },
  { id: "mem9", name: "Aditya Jain", code: "STU-0050" },
  { id: "mem10", name: "Kavya Iyer", code: "STU-0051" }
];

const STORAGE_KEY = "sms_library_books_v1";
  const calculateDaysOverdue = (dueDateStr) => {
    // Handle both DD/MM/YYYY and ISO/other formats
    let due;
    if (dueDateStr && dueDateStr.includes('/')) {
      const parts = dueDateStr.split('/');
      if (parts.length === 3 && parts[0].length <= 2) {
        // DD/MM/YYYY format
        due = new Date(`${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`);
      } else {
        due = new Date(dueDateStr);
      }
    } else {
      due = new Date(dueDateStr);
    }
    const today = new Date();
    today.setHours(0,0,0,0);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

const IssueReturnBook = () => {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { return presetBooks; }
    }
    return presetBooks;
  });
  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);

  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  const [memberSearchTerm, setMemberSearchTerm] = useState("");
  const [isGeneralReturn, setIsGeneralReturn] = useState(false);
  
  // Return form state
  const [bookCondition, setBookCondition] = useState("Good");
  const [remarks, setRemarks] = useState("");
  const [selectedBooksToReturn, setSelectedBooksToReturn] = useState([]);

  // Issue form state
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issueRole, setIssueRole] = useState("");
  const [issueClass, setIssueClass] = useState("");
  const [issueSection, setIssueSection] = useState("");
  const [issueMember, setIssueMember] = useState("");
const [issueBook, setIssueBook] = useState([]);
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [issueRemarks, setIssueRemarks] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Category");
  const [isCatFilterOpen, setIsCatFilterOpen] = useState(false);

  // QR Scanner state
  const [showScanner, setShowScanner] = useState(false);
  const [scannerTarget, setScannerTarget] = useState(""); // "issue" | "return"

  const handleQRScanned = (scannedValue) => {
    if (scannerTarget === "issue") {
      try {
        const parsed = JSON.parse(scannedValue);
        if (parsed.role) setIssueRole(parsed.role);
        if (parsed.class) setIssueClass(parsed.class);
        if (parsed.section) setIssueSection(parsed.section);
        
        const memberIdOrCode = parsed.memberId || parsed.code || "";
        const found = DUMMY_MEMBERS.find(m => m.id === memberIdOrCode || m.code === memberIdOrCode || (parsed.name && m.name.toLowerCase() === parsed.name.toLowerCase()));
        if (found) {
          setIssueMember(found.id);
        } else if (memberIdOrCode) {
          setIssueMember(memberIdOrCode);
        }
      } catch (e) {
        const found = DUMMY_MEMBERS.find(m => m.code === scannedValue || m.id === scannedValue || m.name.toLowerCase() === scannedValue.toLowerCase());
        if (found) {
          setIssueMember(found.id);
          setIssueRole("Student");
          setIssueClass("Class 1");
          setIssueSection("A");
        } else {
          setIssueMember(scannedValue);
        }
      }
    } else if (scannerTarget === "return") {
      let memberIdOrName = scannedValue;
      try {
        const parsed = JSON.parse(scannedValue);
        memberIdOrName = parsed.memberId || parsed.code || parsed.name || scannedValue;
      } catch (e) {
        // plain string
      }
      setMemberSearchTerm(memberIdOrName);
      
      const matchingRecords = issuedRecords.filter(r => 
        r.loanStatus !== "Returned" && 
        (r.memberId.toLowerCase() === memberIdOrName.toLowerCase() || 
         r.memberName.toLowerCase().includes(memberIdOrName.toLowerCase()) ||
         r.memberId.toLowerCase().includes(memberIdOrName.toLowerCase()))
      );
      if (matchingRecords.length > 0) {
        setSelectedBooksToReturn(matchingRecords);
      }
    }
  };

  const saveBooks = (updated) => {
    setBooks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const catFilterRef = useRef(null);
const categories = ["All Category", "Active" , "Overdue", "Returned"];
useEffect(() => {
    const handler = (e) => {
      if (catFilterRef.current && !catFilterRef.current.contains(e.target)) setIsCatFilterOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);



  
  // Flatten borrowers
  const issuedRecords = useMemo(() => {
    const records = [];
    books.forEach(book => {
      if (book.borrowers) {
        book.borrowers.forEach(b => {
          records.push({
            ...b,
            bookId: book.id,
            bookTitle: book.title,
            bookAuthor: book.author,
            bookCover: book.coverImage,
            bookIsbn: book.isbn,
          });
        });
      }
    });
    return records;
  }, [books]);


const filteredRecords = useMemo(() => {
  return issuedRecords.filter(record => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      record.memberName.toLowerCase().includes(term) ||
      record.memberId.toLowerCase().includes(term) ||
      record.bookTitle.toLowerCase().includes(term);

    const isReturned = record.loanStatus === "Returned";
    const isLate = !isReturned && calculateDaysOverdue(record.dueDate) > 0;
    const derivedStatus = isReturned ? "Returned" : isLate ? "Overdue" : "Active";

    const matchCategory =
      categoryFilter === "All Category" || derivedStatus === categoryFilter;

    return matchSearch && matchCategory;
  });
}, [issuedRecords, searchTerm, categoryFilter]);


  const totalItems = filteredRecords.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredRecords.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getStatusBadge = (status) => {
    if (status === "Active") {
      return (
        <span className="inline-flex items-center justify-center gap-1.5 w-[100px] py-0.25 rounded-[4px] bg-[#D4EDDA] text-[12px] font-semibold font-[600]  text-[#009638]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#009638] shrink-0"></span>
          Active
        </span>
      );
    } else if (status === "Overdue") {
      return (
        <span className="inline-flex items-center justify-center gap-1.5 w-[100px] py-0.25 rounded-[4px] bg-[#F8D7DA] text-[12px] font-semibold font-[600]  text-[#C92131]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C92131] shrink-0"></span>
          Overdue
        </span>
      );
    } else if (status === "Returned") {
      return (
        <span className="inline-flex items-center justify-center gap-1.5 w-[100px] py-0.25 rounded-[4px]  bg-[#E2E3E5] text-[12px] font-semibold font-[600]  text-[#383D41]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#383D41] shrink-0"></span>
          Returned
        </span>
      );
    }
    return null;
  };

  const openReturnModal = (record) => {
    setSelectedRecord(record);
    setIsGeneralReturn(false);
    setIsReturnModalOpen(true);
    setBookCondition("Good");
    setRemarks("");
  };

  const openGeneralReturnModal = () => {
    setSelectedRecord(null);
    setIsGeneralReturn(true);
    setIsReturnModalOpen(true);
    setMemberSearchTerm("");
    setSelectedBooksToReturn([]);
    setBookCondition("Good");
    setRemarks("");
  };

  const openIssueModal = () => {
    setIsIssueModalOpen(true);
    setIssueRole("");
    setIssueClass("");
    setIssueSection("");
    setIssueMember("");
    setIssueBook([]);
    setIssueDate("");
    setDueDate("");
    setIssueRemarks("");
  };

  const processReturn = () => {
    let updatedBooks = [...books];
    let recordsToProcess = [];

    if (isGeneralReturn) {
      recordsToProcess = selectedBooksToReturn;
    } else {
      if (selectedRecord) {
        recordsToProcess = [selectedRecord];
      }
    }

    recordsToProcess.forEach(recordToReturn => {
      updatedBooks = updatedBooks.map(book => {
        if (book.id === recordToReturn.bookId) {
          const updatedBorrowers = (book.borrowers || []).map(b => {
            if (b.memberId === recordToReturn.memberId && b.issueDate === recordToReturn.issueDate && b.loanStatus !== "Returned") {
              return { ...b, loanStatus: "Returned" };
            }
            return b;
          });
          
          // Re-calculate issued and available based on returned
          const newIssued = updatedBorrowers.filter(b => b.loanStatus !== "Returned").length;
          return {
            ...book,
            borrowers: updatedBorrowers,
            issued: newIssued,
            available: book.totalCopies - newIssued,
            status: (book.totalCopies - newIssued) > 0 ? "Available" : "Unavailable"
          };
        }
        return book;
      });
    });

    saveBooks(updatedBooks);
    setIsReturnModalOpen(false);
  };

  // Compute late fee (10 rs per day overdue)

  const renderModalContent = () => {
    if (isGeneralReturn) {
      // Find members matching memberSearchTerm or show all if empty
      const term = memberSearchTerm.toLowerCase();
      const memberRecords = term.length > 0 
        ? issuedRecords.filter(r => r.loanStatus !== "Returned" && (r.memberId.toLowerCase().includes(term) || r.memberName.toLowerCase().includes(term))) 
        : issuedRecords.filter(r => r.loanStatus !== "Returned");
      
      let totalLateFee = 0;
      let hasLateBooks = false;
      let totalDaysOverdue = 0;
      if (selectedBooksToReturn.length > 0) {
        selectedBooksToReturn.forEach(b => {
          const daysOverdue = calculateDaysOverdue(b.dueDate);
          if (daysOverdue > 0) {
            hasLateBooks = true;
            totalDaysOverdue = Math.max(totalDaysOverdue, daysOverdue);
            totalLateFee += daysOverdue * 10;
          }
        });
      }

      return (
        <>
          

<div className="w-full">
  
  <div className="mb-4">
    <label className="block text-[14px] text-[#1C1C1C]  font-[600] font-semibold mb-1">Member ID</label>
    <div className="flex gap-2">
      <input 
        type="text" 
        placeholder="Enter ID Number or Name" 
        className="w-full border border-[#E8E8E8] rounded-[8px] p-2.5 text-[14px] outline-none"
        value={memberSearchTerm}
        onChange={e => setMemberSearchTerm(e.target.value)}
      />
      <button
        type="button"
        className="flex items-center justify-center w-6 h-6 border border-[#E8E8E8]  mt-3 rounded-[4px] text-[#6B7280] hover:text-[#1C1C1C] hover:bg-[#F5F5F5] transition-colors flex-shrink-0"
        onClick={() => { setScannerTarget("return"); setShowScanner(true); }}
        title="Scan barcode"
      >
          <img src={scancode_2} alt="calendar" className="h-4 w-4" />
      </button>
    </div>
  </div>

<div className="pt-3 pr-3 pl-3 pb-1 border border-[#E8E8E8] rounded-[12px] ">
  {/* Horizontal + vertical scroll on table only */}
 {/* Outer: vertical scroll only */}
{memberRecords.length > 0 && (
  <div className="mb-4 border border-[#E8E8E8] rounded-[12px]">
    <div className="overflow-x-auto overflow-y-auto max-h-[160px] custom-scrollbar">
      <table className="text-left text-[14px] whitespace-nowrap" style={{ minWidth: '54rem', borderCollapse: 'collapse' }}>
        <thead className=" border-b border-[#E8E8E8] last:border-0">
          <tr>
            <th className="p-3 text-left font-semibold text-[#1C1C1C] w-16 ">Copies</th>
            <th className="p-3 text-left font-semibold text-[#1C1C1C] ">ISBN</th>
            <th className="p-3 text-left font-semibold text-[#1C1C1C] ">Title</th>
            <th className="p-3 text-left font-semibold text-[#1C1C1C] ">Author</th>
          </tr>
        </thead>
        <tbody>
          {memberRecords.map((r, i) => (
            <tr
              key={i}
              className="border-b border-[#E8E8E8] last:border-0 cursor-pointer "
              onClick={() => {
                const isSelected = selectedBooksToReturn.some(sel => sel.bookId === r.bookId && sel.memberId === r.memberId);
                if (isSelected) {
                  setSelectedBooksToReturn(selectedBooksToReturn.filter(sel => !(sel.bookId === r.bookId && sel.memberId === r.memberId)));
                } else {
                  setSelectedBooksToReturn([...selectedBooksToReturn, r]);
                }
              }}
            >
              <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedBooksToReturn.some(sel => sel.bookId === r.bookId && sel.memberId === r.memberId)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedBooksToReturn([...selectedBooksToReturn, r]);
                    } else {
                      setSelectedBooksToReturn(selectedBooksToReturn.filter(sel => !(sel.bookId === r.bookId && sel.memberId === r.memberId)));
                    }
                  }}
                />
              </td>
              <td className="p-3 text-[#1C1C1C]">{r.bookIsbn}</td>
              <td className="p-3 text-[#1C1C1C]">{r.bookTitle}</td>
              <td className="p-3 text-[#696969]">{r.bookAuthor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
 
)}
</div>
          {selectedBooksToReturn.length > 0 && (
            <>
              <div className="mb-5 pt-4 pr-3 pl-3 pb-4  bg-[#F9F9F9] rounded-[12px] mt-4 border border-[#E8E8E8]" >
                <h4 className="font-semibold text-[#1C1C1C] text-[16px] mb-1">Issue Details</h4>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[14px] text-[#696969]">Book:</span>
                  <span className="text-[14px] text-[#1C1C1C] font-medium text-right w-[70%] truncate" title={selectedBooksToReturn.map(b=>b.bookTitle).join(", ")}>{selectedBooksToReturn.map(b=>b.bookTitle).join(", ")}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[14px] text-[#696969]">Currently Issued:</span>
                  <span className="text-[14px] text-[#1C1C1C] font-medium">{selectedBooksToReturn[0]?.memberName} ({selectedBooksToReturn[0]?.memberId})</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[14px] text-[#696969]">Issue Date:</span>
                  <span className="text-[14px] text-[#1C1C1C] font-medium">{new Date(selectedBooksToReturn[0]?.issueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[14px] text-[#696969]">Due Date:</span>
                  <span className={`text-[14px] font-semibold font-[600]  ${hasLateBooks ? 'text-[#DC2626]' : 'text-[#1C1C1C]'}`}>
                    {new Date(selectedBooksToReturn[0]?.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                {hasLateBooks && (
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] text-[#696969]">Days Overdue:</span>
                  
                    <span className="text-[14px] text-[#DC2626] font-bold font-[700] ">{totalDaysOverdue} days</span>
                  </div>
                )}
              </div>

              {hasLateBooks && (
                <div className="mb-5 p-3 rounded-[10px] border border-[#D4183D] bg-[#FEF2F2] flex justify-between items-center mt-2 ">
                  <div>
                    <h4 className="font-semibold text-[#1C1C1C] text-[14px] mb-0">Late Fee:</h4>
                    <p className="text-[12px] text-[#717182] font-[400] mb-0">₹10 per day × {totalDaysOverdue} days
</p>
                  </div>
                  <div className="text-[18px] font-bold text-[#C92131]">₹{totalLateFee}</div>
                </div>
              )}

              <div className="mb-3">
                <CustomDropdown
                  label="Book Condition"
                  placeholder="Select condition"
                  value={bookCondition}
                  onChange={(val) => setBookCondition(val)}
                  options={[
                    { value: "Good", label: "Good" },
                    { value: "Fair", label: "Fair" },
                    { value: "Poor", label: "Poor" },
                    { value: "Lost", label: "Lost" }
                  ]}
                />
              </div>

              <div className="mb-4">
                <label className="block text-[14px] text-[#1C1C1C] font-semibold mb-1">Remarks (Optional)</label>
                <textarea 
                  rows={3} 
                  placeholder="Any special notes" 
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                  className="w-full border border-[#E8E8E8] rounded-[8px] p-2.5 text-[14px] outline-none resize-none"
                ></textarea>
              </div>
            </>
          )}
     </div>    </>
      );
    } else if (selectedRecord) {
      const daysOverdue = calculateDaysOverdue(selectedRecord.dueDate);
      const lateFee = daysOverdue * 10;
      
      const isLate = daysOverdue > 0;

      return (
        <>
          <div className="mb-5 p-4 bg-[#F9FAFB] rounded-[8px] flex justify-between items-start">
            <div className="w-full">
              <h4 className="font-semibold text-[#1C1C1C] text-[14px] mb-3">Issue Details</h4>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[13px] text-[#696969]">Book:</span>
                <span className="text-[13px] text-[#1C1C1C] font-medium text-right w-[60%] truncate" title={selectedRecord.bookTitle}>{selectedRecord.bookTitle}</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[13px] text-[#696969]">Currently Issued:</span>
                <span className="text-[13px] text-[#1C1C1C] font-medium">{selectedRecord.memberName} ({selectedRecord.memberId})</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[13px] text-[#696969]">Issue Date:</span>
                <span className="text-[13px] text-[#1C1C1C] font-medium">{new Date(selectedRecord.issueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[13px] text-[#696969]">Due Date:</span>
                <span className={`text-[13px] font-medium ${isLate ? 'text-[#C92131]' : 'text-[#1C1C1C]'}`}>
                  {new Date(selectedRecord.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              {isLate && (
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[#696969]">Days Overdue:</span>
                  <span className="text-[13px] text-[#C92131] font-medium">{daysOverdue} days</span>
                </div>
              )}
            </div>
          </div>

          {isLate && (
            <div className="mb-2 p-3 rounded-[8px] border border-[#C92131] bg-[#FFF5F5] flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-[#1C1C1C] text-[14px] mb-1">Late Fee:</h4>
                <p className="text-[12px] text-[#9CA3AF]">₹10 per day * {daysOverdue} days</p>
              </div>
              <div className="text-[18px] font-bold text-[#C92131]">₹{lateFee}</div>
            </div>
          )}

          <div className="mb-2">
            <CustomDropdown
              label="Book Condition"
              placeholder="Select condition"
              value={bookCondition}
              onChange={(val) => setBookCondition(val)}
              options={[
                { value: "Good", label: "Good" },
                { value: "Fair", label: "Fair" },
                { value: "Poor", label: "Poor" },
                { value: "Lost", label: "Lost" }
              ]}
            />
          </div>

          <div className="mb-4">
            <label className="block text-[14px] text-[#1C1C1C] font-semibold mb-2">Remarks (Optional)</label>
            <textarea 
              rows={3} 
              placeholder="Any special notes" 
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              className="w-full border border-[#E8E8E8] rounded-[8px] p-2.5 text-[14px] outline-none resize-none"
            ></textarea>
          </div>
        </>
      );
    }
  };

  return (
    <div className="pt-1 pl-1 pr-1 pb-1" style={{ fontFamily: 'Segoe UI'}}>
      {/* Header */}



        <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 -mt-[4px]">
        <div>
          <h1 className="text-[18px] font-semibold text-[#1C1C1C] font-[600]">Book Issue & Return</h1>
          <p className="text-[16px] text-[#9C9C9C] font-[400] font-normal -mt-[4px] mb-3">Issue books to members and track returns</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button 
            onClick={openGeneralReturnModal}
            className="bg-white border border-[#9C9C9C] text-[#696969] pl-5 pr-2 w-[163px] h-[40px]  h-[40px] rounded-[8px] text-[16px] font-[600]  font-semibold flex items-center gap-2 transition"
          >
            {/* <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.83333 10.5L0 5.66667L4.83333 0.833336L5.8 1.8L2.56667 5H14V6.33333H2.56667L5.8 9.56667L4.83333 10.5Z" fill="#1C1C1C"/>
            </svg> */}

 <img src={checked} alt="checked" className="h-4 w-4 object-contain" />


            Return Book
          </button>
          <button 
            onClick={openIssueModal}
            className="bg-[#0B3142] text-[#FFFFFF] px-5 h-[40px] rounded-[8px] text-[14px] font-[600] flex items-center gap-2 transition hover:bg-[#0a2735]"
          >
            <img src={plusIcon} alt="plus" className="h-4 w-4 object-contain brightness-0 invert" />
            Issue Book
          </button>
        </div>
      </div>



      
        {/* Search + Filter Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 px-1">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) =>{ setSearchTerm(e.target.value);
                  setCurrentPage(1);
              }}
              
              className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-[9px] text-[14px] focus:outline-none"
            />
          </div>




           <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative" ref={catFilterRef}>
              <div 
                 onClick={() => setIsCatFilterOpen(!isCatFilterOpen)}
                className="bg-[#EFF2F2] rounded-[9px] px-4 py-2.5 text-[12px] text-[#1C1C1C] min-w-[130px] cursor-pointer flex items-center justify-between"
              >
                <span>{categoryFilter}</span>
                <span className={`text-[8px] transition-transform ${isCatFilterOpen ? '' : ''}`}>▼</span>
              </div>
              {isCatFilterOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E8E8] rounded-[9px] shadow-lg overflow-hidden">
                  {categories.map((cat) => (
                    <div 
                   key={cat} 
  onClick={() => { 
    setCategoryFilter(cat); 
    setIsCatFilterOpen(false); 
    setCurrentPage(1); 
  }}
                      className="px-4 py-2 text-[13px] hover:bg-[#F3F4F6] cursor-pointer text-[#1C1C1C]"
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-[12px] border border-[#E6E6E6]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#E6E6E6]">
                <th className="px-4 py-3 text-[14px] font-semibold font-[600] text-[#1C1C1C] w-[70px] whitespace-nowrap">S No.</th>
                <th className="px-9  py-3 text-[14px] font-semibold font-[600] text-[#1C1C1C] min-w-[150px]">Books</th>
                <th className="px-3  pr-19 py-3 text-[14px] font-semibold font-[600] text-[#1C1C1C] min-w-[150px]">Members</th>
                <th className="px-4 py-3 pr-14 text-[14px] font-semibold font-[600] text-[#1C1C1C]">Issue Date</th>
                <th className="px-3 py-3 text-[14px] pr-14 font-semibold font-[600] text-[#1C1C1C]">Due Date</th>
                <th className="px-1 py-3 text-[14px]  pr-10 font-semibold font-[600] text-[#1C1C1C] text-center">Status</th>
                <th className="px-7 py-3 text-[14px]  pr-14 font-semibold font-[600] text-[#1C1C1C] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((record, idx) => {
                const issueDateObj = new Date(record.issueDate);
                const dueDateObj = new Date(record.dueDate);
                
                const isReturned = record.loanStatus === "Returned";
                const isLate = !isReturned && calculateDaysOverdue(record.dueDate) > 0;
                const displayStatus = isReturned ? "Returned" : (isLate ? "Overdue" : "Active");

                return (
                  <tr key={`${record.bookId}-${record.memberId}-${idx}`} className="border-b border-[#E1E1E1] transition-colors">
                    <td className="px-4 py-3 text-[14px] text-[#1C1C1C] align-top">{indexOfFirst + idx + 1}</td>
                    <td className="px-9 py-2 align-top ">
                      <div className="flex gap-3 items-start">
                        <img 
                          src={record.bookCover || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=60&auto=format&fit=crop&q=80"}
                          alt={record.bookTitle} 
                          className="w-10 h-14 object-cover rounded shadow-sm border border-gray-200" 
                        />
                        <div>
                          <p className="text-[14px] font-semibold font-[600]  text-[#1C1C1C] leading-tight mb-1 mt-3">{record.bookTitle}</p>
                          <p className="text-[12px] text-[#696969] -mt-[4px]">{record.bookAuthor}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 pr-19 align-top mt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shrink-0">
                           <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(record.memberName)}&background=random`} alt={record.memberName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[14px] font-semibold mt-2 text-[#1C1C1C] leading-tight mb-1 mt-2">{record.memberName}</p>
                          <p className="text-[14px] font-[400] font-normal -mt-[4px]  text-[#9C9C9C]">Student • {record.memberId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 pr-14 text-[14px] text-[#1C1C1C] font-normal align-top ">
                      <p className="text-[14px]  mt-3 font-normal">{issueDateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </td> 
                    <td className="px-3 py-4 align-top  ">
                      <p className={`text-[14px] font-normal   ${isLate && !isReturned ? 'text-[#DC2626] font-semibold font-[600] mt-2' : 'text-[#1C1C1C] mt-3'}`}>
                        {dueDateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      {isLate && !isReturned && (
                        <p className="text-[12px]  font-normal font-[400]  text-[#DC2626] -mt-[2px]">{calculateDaysOverdue(record.dueDate)} days late</p>
                      )}
                    </td>
                    <td className="px-2 py-4   pr-8 text-center align-top">
                     <p className="text-[14px] font-normal mt-3">{getStatusBadge(displayStatus)}</p> 
                    </td>
                    <td className="px-7 py-4   pr-12  text-center align-top">
                      <button 
                        onClick={() => openReturnModal(record)}
                        disabled={isReturned}
                        className={`px-1 py-0 w-[75px] h-[30px]  mt-3 rounded-[6px] font-[Segoe UI]  text-[14px] font-normal font-[600] transition ${
                          isReturned 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-[#118AB2]  text-white cursor-pointer '
                        }`}
                      >
                        {isReturned ? 'Returned' : 'Return'}
                      </button>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-[14px] text-[#696969]">
                    No issued books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 pt-2 text-[#696969] text-[14px]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
                className="w-[70px] px-3 py-1.5 rounded-[6px] bg-[#F9F9F9] border border-gray-200 cursor-pointer flex justify-between items-center"
              >
                <span className="text-[#1C1C1C] font-semibold">{itemsPerPage}</span>
                <span className="text-[10px]">▼</span>
              </div>
              {isItemsPerPageOpen && (
                <div className="absolute bottom-full mb-1 left-0 w-full bg-white border border-[#E8E8E8] rounded shadow-lg z-10">
                  {[5, 10, 20, 50].map(val => (
                    <div 
                      key={val} 
                      className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-center"
                      onClick={() => { setItemsPerPage(val); setIsItemsPerPageOpen(false); setCurrentPage(1); }}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span>
              Showing <span className="text-[#1C1C1C] font-medium">{totalItems === 0 ? 0 : indexOfFirst + 1}</span> - <span className="text-[#1C1C1C] font-medium">{Math.min(indexOfLast, totalItems)}</span> of {totalItems} results
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center text-[#696969] hover:text-[#1C1C1C] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <MdKeyboardArrowLeft size={22} /> Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <span 
                  key={p} 
                  onClick={() => handlePageChange(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded-[6px] cursor-pointer text-[13px] transition ${
                    currentPage === p ? "bg-[#0B3142] text-white" : "hover:bg-gray-100 text-[#1C1C1C]"
                  }`}
                >
                  {p}
                </span>
              ))}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center text-[#696969] hover:text-[#1C1C1C] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next <MdKeyboardArrowRight size={22} />
            </button>
          </div>
        </div>
     
</div>
      {/* Return Book Modal */}
      {isReturnModalOpen && (
        <div className="fixed inset-0 z-50   bg-slate-900/30 backdrop-blur-[0.5px] flex items-center justify-center p-4">
          <div className="bg-white rounded-[12px] shadow-xl w-full  max-w-[48rem] max-h-[62vh]  overflow-hidden flex flex-col mt-9">
            <div className="pt-4 pr-4 pl-5 pb-4 flex justify-between items-start font-Segoe UI">
              <div>
                <h2 className="text-[18px] font-semibold font-[600] text-[#1C1C1C]">Return Book</h2>
                <p className="text-[16px] font-[400] font-normal text-[#9C9C9C] -mt-[1px]">Process book return and calculate fines if applicable</p>
              </div>
              <button 
                onClick={() => setIsReturnModalOpen(false)}
                className="text-[#1C1C1C] transition p-1"
              >
                <HiX size={20} />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
              {renderModalContent()}
            </div>

            <div className="pt-3 pb-5 pr-4 flex justify-end gap-3 bg-gray-50/50">
              <button 
                onClick={() => setIsReturnModalOpen(false)}
                className="px-4 w-[96px] h-[40px] rounded-[8px] border border-[#9C9C9C] text-[#4A5565] text-[16px] font-semibold bg-white transition"
              >
                Cancel
              </button>
              <button 
                onClick={processReturn}
                disabled={isGeneralReturn && selectedBooksToReturn.length === 0}
                className="pl-2 pr-1  w-[156px] h-[40px] rounded-[8px] bg-[#0B3142] text-white text-[16px] font-[600] font-semibold transition "
              >
                Process Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issue Book Modal */}

      {isIssueModalOpen && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[0.5px] flex items-center justify-center p-3 md:p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-[16px] w-full max-w-[48rem] max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-[#E6E6E6] relative animate-scaleUp mt-15">
            {/* Header */}
            <div className="bg-white text-slate-800 pt-4 pb-1 px-5 relative flex justify-between items-center select-none">
              <div>
                <h3 className="text-[18px] font-semibold font-[600] text-[#1C1C1C] ">Issue Book</h3>
                <p className="text-[16px] text-[#9C9C9C] font-normal -mt-[2px]">Issue a book to a student or staff member</p>
              </div>
              <button type="button" onClick={() => setIsIssueModalOpen(false)} className="text-[#1C1C1C] -pt-[2px] pr-3 mt-0 rounded-full transition cursor-pointer flex items-center justify-center font-bold" title="Close">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto overflow-x-visible pt-5 pr-5 pl-5 pb-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-30">
                <div>
                  <CustomDropdown
                    label="Role"
                    placeholder="Select role"
                    value={issueRole}
                    onChange={(val) => setIssueRole(val)}
                    options={[
                      { value: "Student", label: "Student" },
                      { value: "Staff", label: "Staff" }
                    ]}
                  />
                </div>
                <div>
                  <CustomDropdown
                    customLabel={<label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Class </label>}
                    placeholder="Select class"
                    value={issueClass}
                    onChange={(val) => setIssueClass(val)}
                    options={[
                      { value: "Class 1", label: "Class 1" },
                      { value: "Class 2", label: "Class 2" }
                    ]}
                  />
                </div>
                <div>
                  <CustomDropdown
                    customLabel={<label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Section </label>}
                    placeholder="Select section"
                    value={issueSection}
                    onChange={(val) => setIssueSection(val)}
                    options={[
                      { value: "A", label: "A" },
                      { value: "B", label: "B" }
                    ]}
                  />
                </div>
              </div>
<div className="flex items-end gap-3 w-full">
  {/* Column 1: The Dropdown (Flex-grow makes it take up all available space) */}
  <div className="flex-1">
    <CustomDropdown
      label="Member"
      placeholder="Select member"
      value={issueMember}
      onChange={(val) => setIssueMember(val)}
      options={DUMMY_MEMBERS.map(m => ({ value: m.id, label: `${m.name} (${m.code})` }))}
    />
  </div>

  {/* Column 2: The Scanner Button (Fixed width, separated column) */}
  <div className="flex-shrink-0">
    <button 
      type="button"
      onClick={() => { setScannerTarget("issue"); setShowScanner(true); }}
      className="flex items-center justify-center h-[42px] w-[42px] mt-4 "
      title="Scan Member QR/Barcode"
    >
       <img src={scancode} alt="calendar" className="h-5 w-5" />
    </button>
  </div>
</div>{/* Replace the existing Book dropdown section */}
<div className="relative z-10">
  <MultiSelectDropdown
    customLabel={
      <div className="flex justify-between items-center mb-1">
        <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600]">Book</label>
      </div>
    }
    placeholder="Select book(s)"
    value={issueBook}
    onChange={(val) => setIssueBook(val)}
    options={books.map(b => ({ value: b.id, label: b.title }))}
  />
</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-0">
                <CustomCalendar 
                  label="Issue Date" 
                  placeholder="DD/MM/YYYY" 
                  value={issueDate} 
                  onChange={setIssueDate}
                  popDirection="down"
                />
                <CustomCalendar 
                  label="Due Date" 
                  placeholder="DD/MM/YYYY" 
                  value={dueDate} 
                  onChange={setDueDate}
                  popDirection="down"
                />
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Remarks (Optional)</label>
                <textarea 
                  rows={3} 
                  placeholder="Any special notes" 
                  value={issueRemarks}
                  onChange={e => setIssueRemarks(e.target.value)}
                  className="w-full px-4 py-2 text-[14px] bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#1C1C1C] font-[400] resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 pb-5 pr-5">
              <button 
                type="button"
                onClick={() => setIsIssueModalOpen(false)}
                className="py-2 h-[38px] min-w-[90px] rounded-[8px] border border-[#9C9C9C] bg-white px-4 text-[16px] font-semibold text-[#696969] transition cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button"
                disabled={!issueMember || !issueBook || issueBook.length === 0 || !issueDate || !dueDate}
                onClick={() => {
                  // Find the selected member
                  const member = DUMMY_MEMBERS.find(m => m.id === issueMember);
                  if (!member || !issueBook || issueBook.length === 0 || !issueDate || !dueDate) return;

                  // Parse DD/MM/YYYY → YYYY-MM-DD for storage
                  const parseDate = (ddmmyyyy) => {
                    const [d, m, y] = ddmmyyyy.split('/');
                    return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
                  };
                  const issueDateISO = parseDate(issueDate);
                  const dueDateISO = parseDate(dueDate);

                  // Build new borrower record for each selected book
                  const updatedBooks = books.map(book => {
                    if (issueBook.includes(book.id)) {
                      const newBorrower = {
                        memberId: member.code,
                        memberName: member.name,
                        issueDate: issueDateISO,
                        dueDate: dueDateISO,
                        loanStatus: 'Active',
                        role: issueRole || 'Student',
                        class: issueClass || '',
                        section: issueSection || '',
                        remarks: issueRemarks || ''
                      };
                      const prevBorrowers = book.borrowers || [];
                      const newIssued = prevBorrowers.filter(b => b.loanStatus !== 'Returned').length + 1;
                      return {
                        ...book,
                        borrowers: [...prevBorrowers, newBorrower],
                        issued: newIssued,
                        available: Math.max(0, (book.totalCopies || 1) - newIssued),
                        status: (Math.max(0, (book.totalCopies || 1) - newIssued)) > 0 ? 'Available' : 'Unavailable'
                      };
                    }
                    return book;
                  });

                  saveBooks(updatedBooks);
                  setIsIssueModalOpen(false);
                  // Reset form
                  setIssueRole('');
                  setIssueClass('');
                  setIssueSection('');
                  setIssueMember('');
                  setIssueBook([]);
                  setIssueDate('');
                  setDueDate('');
                  setIssueRemarks('');
                }}
                className="h-[38px] min-w-[100px] rounded-[8px] bg-[#0B3142] px-5 text-[16px] font-semibold text-white hover:bg-[#15465c] transition cursor-pointer font-[Segoe UI] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Issue Book
              </button>
            </div>
          </div>
        </div>
      )}
      {showScanner && (
        <QRScannerModal
          onClose={() => setShowScanner(false)}
          onScan={handleQRScanned}
        />
      )}
    </div>
  );
};

export default IssueReturnBook;
