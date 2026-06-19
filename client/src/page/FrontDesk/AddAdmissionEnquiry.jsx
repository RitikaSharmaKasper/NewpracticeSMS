import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from "../../assets/images/Back.png";
import CustomCalendar from '../../components/utils/CustomCalendar';


const AddAdmissionEnquiry = () => {
  const navigate = useNavigate();
  const [showFollowUpDate, setShowFollowUpDate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSource, setIsOpenSource] = useState(false);
  const [formData, setFormData] = useState({
    date:  new Date().toLocaleDateString('en-GB'), 
    phone: '',
    email: '',
    address: '',
    class: '',
    noOfChild: '1',
    followUpDate: '',
    source: '',
    note: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const newEnquiry = {
      ...formData,
      id: Date.now(),
      status: 'Active',
      visitorType: 'Parent',
      purpose: 'Admission Enquiry',
      enquiryDate: new Date(formData.date).toLocaleDateString('en-GB'), // DD/MM/YYYY
      date: new Date(formData.date).toLocaleDateString('en-GB'),
      nextFollowUp: formData.followUpDate ? new Date(formData.followUpDate).toLocaleDateString('en-GB') : '',
      numberOfChild: parseInt(formData.noOfChild),
      followUps: []
    };

    // Save to localStorage
    const saved = localStorage.getItem('sms_admission_enquiries');
    let enquiries = saved ? JSON.parse(saved) : [];
   
    enquiries.unshift(newEnquiry);
    localStorage.setItem('sms_admission_enquiries', JSON.stringify(enquiries));

    navigate('/frontdesk/admission_enquiries');
  };

  const labelStyle = "block text-[14px] font-normal font-[400] text-[#1C1C1C] mb-1";
  const inputStyle = "w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#E6E6E6] rounded-[9px] text-[14px] text-[#696969] focus:outline-none  transition-colors placeholder:text-[#9C9C9C]";
  const selectStyle = "w-full px-4 py-2.5 bg-[white] border border-[#E6E6E6] rounded-[9px] text-[14px] text-[#1C1C1C] focus:outline-none  transition-colors appearance-none  bg-[length:10px_10px] bg-[right_1rem_center]  bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23696969%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_1rem_center] bg-no-repeat";

  const capitalizeName = (value) => {
    return value
      .replace(/[^a-zA-Z\s]/g, "") // Remove numbers and special chars
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const classOptions = ["Playgroup", "Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
  const sourceOptions = ["Walk-in", "Call", "Email", "Social Media", "Reference", "Website", "Advertisement"];

  return (
    <div className="p-1 md:p-1 mx-auto">

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
            <h2 className="text-[18px] font-semibold font-[600] text-[#1C1C1C] mb-0">Add New Admission Enquiry</h2>
            <p className="text-[16px] text-[#9C9C9C] font-[400] font-normal mt-0">Record admission enquiry details. Fields marked with * are required.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Name */}
              <div>
                <label className={labelStyle}>Name <span className="text-red-500">*</span></label>
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

              {/* Email */}
              <div>
                <label className={labelStyle}>Email</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className={inputStyle}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className={labelStyle}>Address</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  className={inputStyle}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

      

{/* ... inside your return ... */}
<div>
  <label className={labelStyle}>Class</label>
  <div className="relative">
    {/* The visible "Select" box */}
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className={`${selectStyle} flex justify-between items-center cursor-pointer ${!formData.class ? 'text-[#858383]' : 'text-[#1C1C1C]'}`}
    >
      <div className="flex flex-wrap gap-1 max-w-[90%] overflow-hidden">
        {formData.class ? formData.class : "Select classes"}
      </div>
      <span className={`transition-transform duration-200 ${isOpen ? '' : ''}`}>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="#696969" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>

    {/* The Custom Options List */}
    {isOpen && (
      <>
        {/* Invisible backdrop to close dropdown when clicking outside */}
        <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
        
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[9px] shadow-lg z-20 max-h-60 overflow-y-auto">
          {classOptions.map((opt) => {
            const isSelected = formData.class.split(', ').includes(opt);
            return (
              <div 
                key={opt}
                onClick={(e) => {
                  e.stopPropagation();
                  let currentClasses = formData.class ? formData.class.split(', ').filter(c => c !== "") : [];
                  if (isSelected) {
                    currentClasses = currentClasses.filter(c => c !== opt);
                  } else {
                    currentClasses.push(opt);
                  }
                  setFormData({ ...formData, class: currentClasses.join(', ') });
                }}
                className={`px-4 py-2.5 hover:bg-[#F8F9FA] text-[14px] cursor-pointer flex items-center justify-between transition-colors ${isSelected ? 'bg-[#F0F7FF] text-[#0055D4]' : 'text-[#1C1C1C]'}`}
              >
                <span>{opt}</span>
                {isSelected && (
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.5L4.5 8L11 1" stroke="#0055D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </>
    )}
  </div>
</div>

              {/* No. of Child */}
              {/* No. of Child */}
  <div>
    <label className={labelStyle}>No. of Child</label>
    <input
      type="number"
      min="0"
      placeholder="0"
      className={inputStyle}
      value={formData.noOfChild}
      onChange={(e) => setFormData({ ...formData, noOfChild: e.target.value })}
    />
  </div>

  {/* Note - Moved inside grid */}
 
</div>  {/* <-- THIS CLOSES THE GRID */}

{/* Source - Now OUTSIDE the grid, so FULL WIDTH */}
<div className="mt-3">
  <label className={labelStyle}>Source</label>
  <div className="relative">
    <div 
      onClick={() => setIsOpenSource(!isOpenSource)}
      className={`${selectStyle} flex justify-between items-center cursor-pointer ${!formData.source ? 'text-[#9C9C9C]' : 'text-[#1C1C1C]'}`}
    >
      {formData.source || "Select source"}
      <span className={`transition-transform duration-200 ${isOpenSource ? 'rotate-180' : ''}`}>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="#696969" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>

    {isOpenSource && (
      <>
        <div className="fixed inset-0 z-10" onClick={() => setIsOpenSource(false)}></div>
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[9px] shadow-lg z-20 max-h-60 overflow-y-auto">
          {sourceOptions.map((opt) => (
            <div 
              key={opt}
              onClick={() => {
                setFormData({ ...formData, source: opt });
                setIsOpenSource(false);
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

{/* Required Follow up Toggle */}
<div className="flex   mt-4 ">
  <div className="flex items-center justify-between gap-3 mt-2">
    <label className="text-[14px] text-[#696969]">Required Follow up</label>
    <button
      type="button"
      onClick={() => setShowFollowUpDate(!showFollowUpDate)}
      className={`relative w-10 h-5  mt-1 rounded-full transition-colors duration-200 focus:outline-none ${
        showFollowUpDate ? "bg-[#0B3142]" : "bg-[#E6E6E6]"
      }`}
    >
      <span
        className={`absolute top-[2px]  left-[2px] w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
          showFollowUpDate ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
</div>

{/* Follow Up Date - Below toggle, shows only when toggle is true */}
{showFollowUpDate && (
  <div className="mt-3">
    <label className="text-sm text-[#696969] block mb-1">Follow Up Date</label>
    <CustomCalendar
      mode="single"
      selectedDate={formData.followUpDate}
      onSelect={(date) => setFormData({ ...formData, followUpDate: date })}
      placeholder="Select Date"
    />
  </div>
)}

              {/* Source */}
        
        
             

              {/* Note */}
              <div className="md:col-span-2">
                <label className={labelStyle}>Note</label>
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
           

            <div className="flex justify-end gap-3 pt-2 mt-2">
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
                Save Enquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdmissionEnquiry;