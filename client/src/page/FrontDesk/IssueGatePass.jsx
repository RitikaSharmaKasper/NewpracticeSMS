import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from "../../assets/images/Back.png";

const IssueGatePass = () => {
  const navigate = useNavigate();
  const [isOpenClass, setIsOpenClass] = useState(false);
  const [isOpenSection, setIsOpenSection] = useState(false);
  const [isOpenStudent, setIsOpenStudent] = useState(false);

  const [formData, setFormData] = useState({
    class: '',
    section: '',
    student: '',
    studentId: '',
    reason: '',
    timeout: '',
    validTill: ''
  });

  const classOptions = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
  const sectionOptions = ["A", "B", "C", "D"];

  const capitalizeName = (value) => {
    return value
      .replace(/[^a-zA-Z\s]/g, "") // Remove numbers and special chars
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.student || !formData.timeout || !formData.validTill) return;
const now = new Date();
    const issuedTime = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
    const newGatePass = {
      id: formData.studentId || `STU${Date.now()}`,
      name: formData.student,
      phone: "9876543210", // Default dummy phone
      class: formData.class,
      reason: formData.reason,
      issuedBy: "Admin",
      issuedAt: issuedTime,
      validTill: formData.validTill,
      timeout: formData.timeout,
      date: new Date().toLocaleDateString('en-GB'), // DD/MM/YYYY
      studentType: "Regular"
    };

    // Save to localStorage (using v3 as established in GatePass.jsx)
    const saved = localStorage.getItem('sms_student_data_v3');
    let gatePasses = saved ? JSON.parse(saved) : [];
   
    gatePasses.unshift(newGatePass);
    localStorage.setItem('sms_student_data_v3', JSON.stringify(gatePasses));

    navigate('/frontdesk/gate_pass');
  };

  const labelStyle = "block text-[14px] font-normal font-[400] text-[#1C1C1C] mb-1";
  const inputStyle = "w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#E6E6E6] rounded-[9px] text-[14px] text-[#696969] focus:outline-none transition-colors placeholder:text-[#9C9C9C]";
  const selectStyle = "w-full px-4 py-2.5 bg-[white] border border-[#E6E6E6] rounded-[9px] text-[14px] text-[#1C1C1C] focus:outline-none transition-colors appearance-none bg-[length:10px_10px] bg-[right_1rem_center]";

  return (
    <div className="p-5 md:p-1 mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-[#696969] text-[20px] font-semibold mb-7 transition-colors"
      >
        <span className="mr-3">
          <img src={Back} alt="Back" className="h-3 w-3 object-contain" />
        </span> 
        Back
      </button>

      <div className="bg-white p-3 rounded-xl shadow-[0px_0px_15px_0px_rgba(0,0,0,0.15)] overflow-visible">
        <div className="p-4 md:pt-0 pl-2 pr-2">
          <div className="mb-5">
            <h2 className="text-[18px] font-semibold font-[600] text-[#1C1C1C] mb-0">Issue Gate Pass</h2>
            <p className="text-[16px] text-[#9C9C9C] font-[400] font-normal mt-0">Create entry or exit pass. Fields marked with * are required.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Student Dropdown */}
               <div>
                 <label className={labelStyle}>Student<span className="text-red-500">*</span></label>
            
              <input
                type="text"
                placeholder="Student Name"
                className={inputStyle}
                value={formData.student}
                onChange={(e) => setFormData({ ...formData, student: capitalizeName(e.target.value) })}
              />
            </div>
            {/* Class Dropdown */}
            <div>
  <label className={labelStyle}>
    Class <span className="text-red-500">*</span>
  </label>
  <div className="relative">
    {/* The visible "Select" box */}
    <div 
      onClick={() => setIsOpenClass(!isOpenClass)}
      className={`${selectStyle} flex justify-between items-center cursor-pointer ${!formData.class ? 'text-[#858383]' : 'text-[#1C1C1C]'}`}
    >
      {formData.class || "Select class"}
      
      {/* Icon with rotation logic */}
      <span className={`inline-block transition-transform duration-200 ${isOpenClass ? 'rotate-180' : ''}`}>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M1 1L5 5L9 1" 
            stroke="#696969" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>

    {/* The Custom Options List */}
    {isOpenClass && (
      <>
        {/* Invisible backdrop to close dropdown when clicking outside */}
        <div className="fixed inset-0 z-10" onClick={() => setIsOpenClass(false)}></div>
        
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[9px] shadow-lg z-20 max-h-60 overflow-y-auto">
          {classOptions.map((opt) => (
            <div 
              key={opt}
              onClick={() => {
                setFormData({ ...formData, class: opt });
                setIsOpenClass(false);
              }}
              className="px-4 py-2.5 hover:bg-[#F8F9FA] text-[14px] cursor-pointer text-[#1C1C1C] transition-colors"
            >
              {opt}
            </div>
          ))}
        </div>
      </>
    )}
  </div>
</div>

            {/* Section Dropdown */}
            <div>
              <label className={labelStyle}>Section <span className="text-red-500">*</span></label>
              <div className="relative">
                <div 
                  onClick={() => setIsOpenSection(!isOpenSection)}
                  className={`${selectStyle} flex justify-between items-center cursor-pointer ${!formData.section ? 'text-[#858383]' : 'text-[#1C1C1C]'}`}
                >
                  {formData.section || "Select section"}
                  <span className={`transition-transform duration-200 ${isOpenSection ? 'rotate-180' : ''}`}>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#696969" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                {isOpenSection && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpenSection(false)}></div>
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[9px] shadow-lg z-20 max-h-60 overflow-y-auto">
                      {sectionOptions.map((opt) => (
                        <div key={opt} onClick={() => { setFormData({ ...formData, section: opt }); setIsOpenSection(false); }} className="px-4 py-2.5 hover:bg-[#F8F9FA] text-[14px] cursor-pointer text-[#1C1C1C] transition-colors">{opt}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>


            {/* Reason */}
            <div>
              <label className={labelStyle}>Reason</label>
              <input
                type="text"
                placeholder="e.g., Medical appointment, Official work, Family emergency"
                className={inputStyle}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              />
            </div>

            {/* Time Out & Valid Till */}
           
              <div>
                <label className={labelStyle}>Time Out <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    required
                    type="time"
                    className={inputStyle}
                    value={formData.timeout}
                    onChange={(e) => setFormData({ ...formData, timeout: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className={labelStyle}>Valid Till <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    required
                    type="time"
                    className={inputStyle}
                    value={formData.validTill}
                    onChange={(e) => setFormData({ ...formData, validTill: e.target.value })}
                  />
                </div>
              </div>
           

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-5 mt-5">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-[#9C9C9C] rounded-[8px] text-[16px] font-semibold text-[#696969] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#0B3142] text-white rounded-[8px] text-[16px] font-semibold transition-all shadow-sm"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssueGatePass;
