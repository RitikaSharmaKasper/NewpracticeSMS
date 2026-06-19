import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import dummyData from "../../../data/data.json";
import Back from "../../../assets/images/Back.png";
import api from '../../../config/axiosInstance';
import { toast } from 'react-toastify';


const EditClass = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const fromPath = location.state?.from || '/schedule-class';

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
    startDate: '',
    tillDate: '',
    startTime: '',
    endTime: '',
  });


  const fetchClassById = async () => {
    try {
      const response = await api.get(`/onlineclass/${id}`);

      const cls = response.data.data;

      setFormData({
        classTitle: cls.classTitle || "",
        className: cls.className || "",
        section: cls.section || "",
        subject: cls.subject || "",
        meetingLink: cls.meetingLink || "",
        description: cls.description || "",
        startDate: cls.startDate?.split("T")[0] || "",
        tillDate: cls.tillDate?.split("T")[0] || "",
        startTime: cls.startTime || "",
        endTime: cls.endTime || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClassById();
  }, [id]);

  // Dynamic Subjects mapping based on class
  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes");
      setClassOptions(response.data?.data || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

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

  useEffect(() => {
  if (formData.className && classOptions.length) {
    const sections = classOptions
      .filter((cls) => cls.className === formData.className)
      .map((cls) => cls.section);

    setSectionOptions(sections);
  }
}, [formData.className, classOptions]);

  // useEffect(() => {
  //   const saved = localStorage.getItem('sms_classes_data_v2');
  //   const localData = saved ? JSON.parse(saved) : [];

  //   // Find class in local storage or dummy data using robust ID comparison
  //   let cls = localData.find(c => String(c.id) === String(id));
  //   if (!cls) {
  //     cls = dummyData.find(c => String(c.id) === String(id));
  //   }

  //   if (cls) {
  //     // Helper to convert "11:00 AM" to "11:00" (24h format for input type="time")
  //     const formatTimeForInput = (timeStr) => {
  //       if (!timeStr) return '';
  //       // Handle cases like "11:00 AM" or "23:30 PM"
  //       if (timeStr.includes('AM') || timeStr.includes('PM')) {
  //         const parts = timeStr.trim().split(/\s+/);
  //         const time = parts[0];
  //         const modifier = parts[1];
  //         let [hours, minutes] = time.split(':').map(Number);

  //         if (modifier === 'PM' && hours < 12) hours += 12;
  //         if (modifier === 'AM' && hours === 12) hours = 0;

  //         // Ensure hours are within 0-23
  //         hours = hours % 24;

  //         return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  //       }
  //       return timeStr; // Already in 24h format "HH:mm"
  //     };

  //     setFormData({
  //       classTitle: cls.classTitle || '',
  //       className: cls.className || '',
  //       section: cls.section || '',
  //       subject: cls.subject || '',
  //       meetingLink: cls.meetingLink || '',
  //       description: cls.description || '',
  //       startDate: cls.startDate || '',
  //       tillDate: cls.tillDate || '',
  //       startTime: formatTimeForInput(cls.startTime),
  //       endTime: formatTimeForInput(cls.endTime),
  //     });
  //   }
  // }, [id]);

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
    if (name === "section") {
      setFormData((prev) => ({
        ...prev,
        section: value,
        subject: "",
      }));
      return;
    }

    if (name === "className") {
      const sections = classOptions
        .filter((cls) => cls.className === value)
        .map((cls) => cls.section);

      setSectionOptions(sections);

      setFormData((prev) => ({
        ...prev,
        className: value,
        section: sections[0] || "",
        subject: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.put(
      `/onlineclass/${id}`,
      formData
    );

    toast.success(
      response?.data?.message || "Class updated successfully"
    );

    navigate(fromPath);
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Failed to update class"
    );

    console.error(error);
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
        <main className="flex-1 bg-white border border-black/10 shadow-[0_5px_10px_rgb(0,0,0,0.15)] rounded-[16px] p-1 lg:p-6 overflow-hidden">
          <div className="p-2 lg:p-1 min-h-screen">
            {/* Back Button */}


            {/* Header Section */}
            <div className="mb-5 ">
              <h2 className="text-[20px] font-[600] font-semibold text-[#1C1C1C] mt-0">Edit Class</h2>
              <p className="text-[16px] text-[#9C9C9C] font-normal mt-0">Modify details for your online class</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Class Title */}
              <div>
                <label className={labelStyle}>Class Title *</label>
                <input
                  required
                  name="classTitle"
                  type="text"
                  placeholder="e.g., Mathematics - Algebra Basics"
                  className={inputStyle}
                  value={formData.classTitle}
                  onChange={handleChange}
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
                    {classOptions.map((cls) => (
                      <option key={cls._id} value={cls.className}>
                        {cls.className}
                      </option>
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
                    disabled={!formData.className || !formData.section}
                  >
                    <option value="" disabled>
                      {formData.className && formData.section
                        ? "Select subject"
                        : "Select class & section first"}
                    </option>

                    {filteredSubjects.map((sub) => (
                      <option key={sub._id} value={sub.subjectName}>
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
                  required
                  type="url"
                  placeholder="https://meetinglink.com"
                  className={inputStyle}
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelStyle}>Description (Optional)</label>
                <textarea
                  placeholder="Enter description..."
                  rows="3"
                  className={`${inputStyle} resize-none`}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Schedule Section */}
              <div className="pt-2 border-t border-[#E8E8E8]">
                <h3 className="text-[18px] font-bold text-[#1C1C1C]">Schedule</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Start Date</label>
                  <input
                    type="date"
                    className={inputStyle}
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyle}>Till Date (Optional)</label>
                  <input
                    type="date"
                    className={inputStyle}
                    value={formData.tillDate}
                    min={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, tillDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Start Time</label>
                  <input
                    type="time"
                    className={inputStyle}
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyle}>End Time (Optional)</label>
                  <input
                    type="time"
                    className={inputStyle}
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-10 py-2 text-[#5F5F5F] font-semibold text-[15px] transition-colors border border-[#9C9C9C] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0B3142] text-white px-7 py-2 rounded-lg font-semibold text-[15px] hover:bg-[#15465c] transition-all shadow-sm"
                >
                  Update Class
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>    </>
  );
};

export default EditClass;
