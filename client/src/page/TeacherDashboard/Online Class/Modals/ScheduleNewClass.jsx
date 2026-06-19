import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Back from "../../../assets/images/Back.png";
import { toast } from 'react-toastify';
import api from '../../../config/axiosInstance';
api

const ScheduleNewClass = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from || '/schedule-class';

  // Format current date and time for defaults
  const today = new Date();
  const todayDateStr = today.toISOString().split('T')[0];
  const currentTimeStr = `${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`;

  const [classOptions, setClassOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [formData, setFormData] = useState({
    classTitle: '',
    className: '',
    section: '',
    subject: '',
    meetingLink: '',
    description: '',
    startDate: todayDateStr,
    tillDate: '',
    startTime: currentTimeStr,
    endTime: '',
  });

  // Dynamic Subjects mapping based on class
  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes");
      setClassOptions(response.data?.data || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= FETCH SUBJECTS =================
  const fetchSubjects = async () => {
    try {
      const response = await api.get("/subjects/AllSubjects");
      setSubjectOptions(response.data?.data || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  // ================= FILTER SUBJECTS =================
  const filteredSubjects = subjectOptions.filter((subject) =>
    subject.applicableClasses?.some(
      (cls) =>
        cls.className === formData.className &&
        cls.section === formData.section
    )
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "classTitle") {
      setFormData((prev) => ({
        ...prev,
        classTitle:
          value.length > 0
            ? value.charAt(0).toUpperCase() + value.slice(1)
            : value,
      }));
      return;
    }

    if (name === "className") {
      const selectedClass = classOptions.find(
        (cls) => cls.className === value
      );

      if (selectedClass) {
        setSectionOptions([selectedClass.section]);

        setFormData((prev) => ({
          ...prev,
          className: value,
          section: selectedClass.section,
          subject: "",
        }));

        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/onlineclass", formData);

    toast.success(
      response?.data?.message || "Online class added successfully"
    );

    navigate(fromPath);
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Online class creation failed"
    );
  }
};

  const labelStyle = "block text-[15px] font-[400] text-[#0A0A0A] mb-0";
  const inputStyle = "w-full border border-[#E8E8E8] rounded-lg p-3 text-[14px] text-[#696969] placeholder:text-[#9C9C9C] focus:outline-none focus:border-[#4F39F6] transition-colors bg-transparent relative z-10";
  const selectStyle = "w-full border border-[#E8E8E8] rounded-lg p-3 text-[14px] text-[#1C1C1C] bg-white appearance-none cursor-pointer focus:outline-none focus:border-[#4F39F6] transition-colors";

  return (




    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#696969] hover:text-[##696969] text-[24px]  mr-5 font-semibold mb-4 transition-colors"
      >
        <span className="mr-3 mx-3 mt-2">  <img
          src={Back}
          alt="Info"
          className="h-3 w-3 object-contain"
        /></span> Back
      </button>

      <div className="online-class-dashboard-container">
        <main className="flex-1 bg-white border border-black/10 shadow-[0_5px_10px_rgb(0,0,0,0.15)] rounded-[16px] p-1 lg:p-5 overflow-hidden">

          <div className="p-2 lg:p-1 min-h-screen">
            {/* Back Button */}


            {/* Header Section */}
            <div className="mb-5">
              <h2 className="text-[18px] font-[600] font-semibold text-[#1C1C1C] mt-0">Schedule New Class</h2>
              <p className="text-[16px] text-[#9C9C9C]  font-[400] mt-0">Quick setup for your online class</p>
            </div>


            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Class Title */}
              <div>
                <label className={labelStyle}>Class Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Mathematics - Algebra Basics"
                  className={inputStyle}
                  value={formData.classTitle}
                  onChange={(e) => {
                    const value = e.target.value;
                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
                    setFormData({ ...formData, classTitle: capitalized });
                  }}
                />
              </div>

              {/* Dropdowns Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <label className={labelStyle}>Class</label>
                  <select
                    name="className"
                    className={selectStyle}
                    value={formData.className}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select class</option>
                    {classOptions.map(cls => (
                      <option key={cls._id} value={cls.className}>{cls.className}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-[42px] pointer-events-none text-gray-400 text-xs">▼</div>
                </div>

                <div className="relative">
                  <label className={labelStyle}>Section</label>
                  <select
                    name="section"
                    className={selectStyle}
                    value={formData.section}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select section</option>
                    {sectionOptions.map((sec, i) => (
                      <option key={i} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-[42px] pointer-events-none text-gray-400 text-xs">▼</div>
                </div>

                <div className="relative">
                  <label className={labelStyle}>Subject</label>
                  <select
                    name="subject"
                    className={selectStyle}
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={
                      !formData.className ||
                      !formData.section
                    }
                  >
                    <option value="">
                      {!formData.className
                        ? "Select class first"
                        : !formData.section
                          ? "Select section first"
                          : "Select subject"}
                    </option>

                    {filteredSubjects.map((sub) => (
                      <option
                        key={sub._id}
                        value={sub.subjectName}
                      >
                        {sub.subjectName}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-[42px] pointer-events-none text-gray-400 text-xs">▼</div>
                </div>
              </div>

              {/* Meeting Link */}
              <div>
                <label className={labelStyle}>Meeting Link *</label>
                <input
                  name="meetingLink"
                  required
                  type="url"
                  placeholder="https://meetinglink.com"
                  className={inputStyle}
                  value={formData.meetingLink}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelStyle}>Description (Optional)</label>
                <textarea
                  name="description"
                  placeholder="Enter the purpose for this certificate.."
                  rows="3"
                  className={`${inputStyle} resize-none`}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Schedule Sub-Header */}
              <div className="pt-2 border-t border-[#E8E8E8]">
                <h3 className="text-[18px] font-semibold font-[600] text-[#1C1C1C]">Schedule</h3>
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Start Date</label>
                  <input
                    name="startDate"
                    type="date"
                    className={inputStyle}
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyle}>Till Date (Optional)</label>
                  <input
                    name="tillDate"
                    type="date"
                    className={inputStyle}
                    value={formData.tillDate}
                    min={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Times Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelStyle}>Start Time</label>
                  <input
                    name="startTime"
                    type="time"
                    className={inputStyle}
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyle}>End Time (Optional)</label>
                  <input
                    name="endTime"
                    type="time"
                    className={inputStyle}
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-[#E0E7FF] border border-[#E0E7FF] rounded-xl p-4 flex items-start sm:items-center gap-4">
                <div className="w-6 h-6 border border-[#7f8cb6] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#4F39F6] text-[12px]">✓</span>
                </div>
                <div>
                  <p className="text-[#364153] font-semibold  font-[600] text-[15px]">Quick Setup Complete</p>
                  <p className="text-[#364153]   font-[400] text-[15px] opacity-80 mt-0.5">
                    A meeting link will be generated automatically. Students will receive notifications before the class starts.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-4 pt-5">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-10 py-2 text-[#5F5F5F] font-semibold text-[15px]  transition-colors border border-[#9C9C9C] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0B3142] text-white px-7 py-2 rounded-lg font-semibold text-[15px] hover:bg-[#0B3142] transition-all shadow-sm"
                >
                  Schedule Class
                </button>
              </div>
            </form>

          </div> </main></div></>
  );
};

export default ScheduleNewClass;