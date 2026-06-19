import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from "../../assets/images/Back.png";
import CustomCalendar from '../../components/utils/CustomCalendar';


const AddVisitor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date().toLocaleDateString('en-GB'), // DD/MM/YYYY
    name: '',
    phone: '',
    purpose: '',
    idProofNumber: '',
    noOfPerson: '1',
    note: '',
    visitorType: 'Parent'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const newVisitor = {
      ...formData,
      id: Date.now(),
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      checkOutTime: '',
      status: 'Inside',
      department: 'General',
      personToMeet: 'Front Desk'
    };

    // Save to localStorage so VisitorRegister can pick it up
    const saved = localStorage.getItem('sms_visitors_data_v2');
    let visitors = saved ? JSON.parse(saved) : [];
   
    visitors.unshift(newVisitor);
    localStorage.setItem('sms_visitors_data_v2', JSON.stringify(visitors));

    navigate('/frontdesk/visitor_register');
  };

  const labelStyle = "block text-[14px] font-normal font-[400] text-[#1C1C1C] mb-1";
  const inputStyle = "w-full px-4 py-2.5 bg-[#FFFFFF]  border border-[#E6E6E6] rounded-[9px] text-[14px] text[#696969]  focus:outline-none transition-colors";
const capitalizeName = (value) => {
  return value
    .replace(/[^a-zA-Z\s]/g, "") // Remove numbers and special chars
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
  return (
    <div className="p-1 md:p-3">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-[#696969]  text-[20px] font-semibold mb-7  transition-colors"
      >
        <span className="mr-3">
          <img src={Back} alt="Back" className="h-3 w-3 object-contain" />
        </span> 
        Back
      </button>

      <div className="bg-white p-3 rounded-xl shadow-[0px_0px_15px_0px_rgba(0,0,0,0.15)] overflow-visible">
        <div className="p-4 md:pt-0 pl-2 pr-2">
          <div className="mb-5">
            <h2 className="text-[18px] font-semibold font-[600] text-[#1C1C1C]">Add Visitor Detail</h2>
            <p className="text-[16px] text-[#9C9C9C]  font-[400] font-normal">Record visitor entry details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {/* Date */}
<div>
  <label className={labelStyle}>Date</label>
  <CustomCalendar
    mode="single"
    selectedDate={formData.date}
    onSelect={(date) => setFormData({ ...formData, date })}
    placeholder="Select Date"
  />
</div>

{/* Visitor Name */}
<div>
  <label className={labelStyle}>Visitor Name <span className="text-red-500">*</span></label>
  <input
    required
    type="text"
    placeholder="Enter full name"
    className={inputStyle}
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: capitalizeName(e.target.value) })}
  />
</div>

{/* Mobile Number */}
<div>
  <label className={labelStyle}>Mobile Number <span className="text-red-500">*</span></label>
  <input
    required
    type="tel"
    placeholder="9876543210"
    className={inputStyle}
    value={formData.phone}
    onChange={(e) => {
      const val = e.target.value.replace(/\D/g, ""); // Keep only numbers
      if (val.length <= 10) setFormData({ ...formData, phone: val });
    }}
  />
</div>

{/* Purpose of Visit - Added back with Validation */}
<div>
  <label className={labelStyle}>Purpose of Visit <span className="text-red-500">*</span></label>
  <input
    required
    type="text"
    placeholder="Purpose"
    className={inputStyle}
    value={formData.purpose}
    onChange={(e) => {
      const val = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Letters only
      if (val.length <= 50) setFormData({ ...formData, purpose: val });
    }}
  />
</div>

{/* ID Proof Number */}
<div>
  <label className={labelStyle}>ID Proof Number</label>
  <input
    type="text"
    placeholder="Enter ID number"
    className={inputStyle}
    value={formData.idProofNumber}
    onChange={(e) => {
      if (e.target.value.length <= 12) {
        setFormData({ ...formData, idProofNumber: e.target.value });
      }
    }}
  />
</div>

{/* No. of Person */}
<div>
  <label className={labelStyle}>No. of Person</label>
  <input
    type="number"
    min="1"
    className={inputStyle}
    value={formData.noOfPerson}
    onChange={(e) => setFormData({ ...formData, noOfPerson: e.target.value })}
  />
</div>

{/* Note */}
<div className="md:col-span-2">
  <label className={labelStyle}>
    Note 
  </label>
  
  <textarea 
  
    placeholder="Type Here..."
    rows="4"
    className={`${inputStyle} resize-none`}
    value={formData.note}
    onChange={(e) => {
      const words = e.target.value.trim().split(/\s+/);
      if (words.length <= 100 || e.target.value.length < formData.note.length) {
        setFormData({ ...formData, note: e.target.value });
      }
    }}
  /> 
  <div className="flex justify-end">
  <span className="text-[14px] text-[#9C9C9C]">100 words</span>
</div>
</div>

             
              

              

           


             

              {/* Note */}
             
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-7 py-2 border border-[#9C9C9C] rounded-[9px] text-[16px] font-semibold text-[#696969] font-[600] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-7 py-2 bg-[#0B3142] text-white rounded-[9px] text-[16px] font-[600]  font-semibold ] transition-all shadow-sm"
              >
                Check In Visitor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVisitor;
