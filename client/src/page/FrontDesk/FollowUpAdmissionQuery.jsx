import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Back from "../../assets/images/Back.png";
import CustomCalendar from '../../components/utils/CustomCalendar';

import visitorData from "../../data/frontdesk.json";

// Reuse assets from AdmissionEnquiries
import phoneIcon from "../../assets/images/meeting.png";
import userIcon from "../../assets/images/usericon.png";
import calendarIcon from "../../assets/images/calendar-icon.png";
import sourceIcon from "../../assets/images/purpose.png";

const FollowUpAdmissionQuery = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [followUpList, setFollowUpList] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    followUpType: '',
    nextFollowUpDate: '',
    status: 'Active',
    response: ''
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "--";
    const date = dateStr.includes('/') ? 
      new Date(dateStr.split('/').reverse().join('-')) : 
      new Date(dateStr);
    
    if (isNaN(date.getTime())) return dateStr;

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const savedEnquiries = localStorage.getItem('sms_admission_enquiries');
    const enquiries = savedEnquiries ? JSON.parse(savedEnquiries) : visitorData;
    const found = enquiries.find(e => e.id === parseInt(id));
    if (found) {
      setEnquiry(found);
      let allFollowUps = [];
      enquiries.forEach(enq => {
        if (enq.followUps && enq.followUps.length > 0) {
          allFollowUps = [...allFollowUps, ...enq.followUps];
        } else {
          allFollowUps.push({
            date: enq.lastFollowUpDate || enq.date,
            followUpBy: enq.followUpBy || 'Admin',
            empId: enq.empId || 'EMP001',
            type: enq.type || 'Call',
            response: enq.response || 'No follow-up response yet',
            status: enq.status || 'Active'
          });
        }
      });
      const parseDate = (dateStr) => {
        if (!dateStr) return new Date(0);
        if (dateStr.includes(',')) return new Date(dateStr);
        const [d, m, y] = dateStr.split('/');
        return new Date(`${y}-${m}-${d}`);
      };
      setFollowUpList(allFollowUps.sort((a, b) => parseDate(b.date) - parseDate(a.date)));
    }
  }, [id]);

  const handleSave = () => {
    if (!enquiry) return;
    const newFollowUp = {
      date: formatDate(formData.date),
      followUpBy: 'Admin',
      empId: 'EMP001',
      type: formData.followUpType,
      response: formData.response,
      status: formData.status
    };
    const updatedFollowUpList = [newFollowUp, ...followUpList];
    setFollowUpList(updatedFollowUpList);
    const savedEnquiries = localStorage.getItem('sms_admission_enquiries');
    let enquiries = savedEnquiries ? JSON.parse(savedEnquiries) : visitorData;
    const index = enquiries.findIndex(e => e.id === parseInt(id));
    if (index !== -1) {
      enquiries[index] = {
        ...enquiries[index],
        lastFollowUpDate: newFollowUp.date,
        nextFollowUp: formData.nextFollowUpDate ? formatDate(formData.nextFollowUpDate) : '',
        followUps: [newFollowUp, ...(enquiries[index].followUps || [])],
        status: formData.status
      };
      localStorage.setItem('sms_admission_enquiries', JSON.stringify(enquiries));
      setEnquiry(enquiries[index]);
    }
    setFormData({
      date: new Date().toISOString().split('T')[0],
      followUpType: '',
      nextFollowUpDate: '',
      status: 'Active',
      response: ''
    });
  };

  if (!enquiry) return <div className="p-4">Loading...</div>;

  const labelStyle = "block text-[14px] font-normal font-[400] text-[#1C1C1C] mb-1";
  const inputStyle = "w-full px-4 py-2.5 bg-white border border-[#E6E6E6] rounded-[12px] font-[400] font-normal text-[14px] text-[#696969] focus:outline-none  transition-colors mb-3";

  return (
    <div className="px-1 py-2 max-w-[1600px] mx-auto  min-h-screen font-sans scroll-smooth">
   <button 
           onClick={() => navigate(-1)} 
           className="flex items-center text-[#696969]  text-[20px] font-semibold mb-7  transition-colors"
         >
           <span className="mr-3">
             <img src={Back} alt="Back" className="h-3 w-3 object-contain" />
           </span> 
           Back
         </button>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_580px] gap-4 items-start pb-5">

        {/* Left Side: Form and History */}
        <div className="space-y-4 min-w-0">
          {/* Form Card */}
          <div className="bg-white p-3 rounded-[16px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] overflow-visible">
            <h2 className="text-[16px] font-[600]  font-semibold text-[#1C1C1C] mb-4">Follow Up Admission Query</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2 mb-1">
              <div>
                <label className={labelStyle}>Date</label>
                <CustomCalendar
                  mode="single"
                  selectedDate={formData.date}
                  onSelect={(date) => setFormData({...formData, date})}
                />
              </div>
              <div>
                <label className={labelStyle}>Follow Up Type</label>
                <div className="relative">
                  <select 
                    className={`${inputStyle} appearance-none pr-10 cursor-pointer`}
                    value={formData.followUpType}
                    onChange={(e) => setFormData({...formData, followUpType: e.target.value})}
                  >
                    <option value="">Select type</option>
                    <option value="Call">Call</option>
                    <option value="Visit">Visit</option>
                    <option value="Email">Email</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#696969]">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
      <div className={formData.status === 'Inactive' ? 'pointer-events-none opacity-60' : ''}>
                <label className={labelStyle}>Next Follow Up Date</label>
                <CustomCalendar
                  mode="single"
                  selectedDate={formData.status === 'Inactive' ? '' : formData.nextFollowUpDate}
                  onSelect={(date) => {
                    if (formData.status !== 'Inactive') {
                      setFormData({...formData, nextFollowUpDate: date});
                    }
                  }}
                  placeholder={formData.status === 'Inactive' ? "Not Applicable" : "Select Date"}
                  disabled={formData.status === 'Inactive'} 
                />
              </div>
              <div>
                <label className={labelStyle}>Status</label>
                <div className="relative">
                  <select 
                    className={`${inputStyle} appearance-none pr-10 cursor-pointer`}
                    value={formData.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setFormData({
                        ...formData, 
                        status: newStatus,
                        nextFollowUpDate: newStatus === 'Inactive' ? '' : formData.nextFollowUpDate
                      });
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Converted">Converted</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#696969]">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>Response</label>
                <textarea 
                  placeholder="Type Here..."
                  rows="5"
                  className={`${inputStyle} resize-none`}
                  value={formData.response}
                  onChange={(e) => setFormData({...formData, response: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 mb-2 mr-2">
              <button 
                onClick={handleSave}
                className="bg-[#002B36] text-white px-7 py-3 rounded-[8px] text-[14px]  font-[600] font-semibold transition-all shadow-md"
              >
                Save
              </button>
            </div>
          </div>

          {/* Follow Up History Table */}
          <div className="bg-[#FFFFFF] p-4  rounded-[16px] border border-[#E6E6E6]">
            <h2 className="text-[18px] font-[600]  font-semibold text-[#1C1C1C] mb-7 pr-5 ">Follow Up History</h2>
            <div className="max-h-[249px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="overflow-x-auto rounded-[12px] border border-[#E6E6E6] mt-1 pt-4 pb-1 pl-0">
                <table className="w-full text-left min-w-[750px]">

                <thead className="text-[14px] text-[#1C1C1C] border-b sticky top-0 bg-white z-10 w-full">
                  <tr>
                    <th className="pb-5 font-[600] font-semibold text-[14px] pl-2">Date</th>
                    <th className="pb-5 font-[600] font-semibold text-[14px] pl-5">Follow Up By</th>
                    <th className="pb-5 font-[600] font-semibold text-[14px] pl-3">Follow Up Type</th>
                    <th className="pb-5 font-[600] font-semibold text-[14px] pl-5">Response</th>
                    <th className="pb-5 font-[600] font-semibold text-[14px] pr-15 text-center">Status</th>
                  </tr>
                </thead>
                {/* <tbody className="text-[14px]">
                  {followUpList.map((item, idx) => (
                    <tr key={idx} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-6 pl-2 text-[#1C1C1C] font-[400] font-[normal]">{formatDate(item.date)}</td>
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#F3F4F6] overflow-hidden border border-[#E5E7EB]">
                            <img src={userIcon} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="text-[#12516E] font-semibold text-[14px] font-[600] ">{item.followUpBy}</div>
                            <div className="text-[#9C9C9C] text-[14px] font-normal">{item.empId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 text-[#1C1C1C] font-medium">{item.type}</td>
                      <td className="py-6">
                        <div className="bg-[#F9FAFB] border border-[#EEEEEE] rounded-[10px] px-4 py-2 text-[#696969] max-w-[280px] text-[13px] leading-relaxed">
                          {item.response}
                        </div>
                      </td>
                      <td className="py-6 text-center pr-2">
                        <span className={`px-4 py-1 rounded-full text-[12px] font-bold ${
                          item.status === 'Active' ? 'bg-[#DCFCE7] text-[#006045]' : 'bg-[#EEEEEE] text-[#696969]'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
<tbody className="text-[14px] bg-[#FAFBFF] ">
      {followUpList.map((item, idx) => (
        <tr 
          key={idx} 
          className="border-b last:border-0  transition-colors pl-1"
        >
          {/* Date Column */}
          <td className="py-4 pl-4 text-[#1C1C1C] font-normal">
            {formatDate(item.date)}
          </td>

          {/* User Profile Column */}
          <td className="py-4 px-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F3F4F6] overflow-hidden border border-[#E5E7EB] shrink-0">
                <img src={userIcon} alt="user" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-[#12516E] font-semibold text-[14px]">
                  {item.followUpBy}
                </div>
                <div className="text-[#9C9C9C] text-[14px] font-normal">
                  {item.empId}
                </div>
              </div>
            </div>
          </td>

          {/* Type Column */}
          <td className="py-4 px-4 text-[#1C1C1C] font-semibold font-[400]">
            {item.type}
          </td>

          {/* Response/Comment Column */}
          <td className="py-4 px-4">
            <div className="bg-[#FAFBFF] border border-[#E6E6E6] rounded-[4px] px-4 py-2 text-[#696969] max-w-[280px] max-h-[80px] overflow-y-auto custom-scrollbar text-[14px] leading-relaxed">
              {item.response}
            </div>
          </td>

          {/* Status Column */}
          <td className="py-4 pr-4 text-center">
            <span className={`px-8 py-1 rounded-[4px] text-[12px] font-semibold inline-block min-w-[80px] ${
              item.status === 'Active' 
                ? 'bg-[#D4EDDA] text-[#009638]' 
                : item.status === 'Converted'
                ? 'bg-[#E1EFFF] text-[#0055D4]'
                : 'bg-[#DEDEDE] text-[#696969]'
            }`}>
              {item.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>



              </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Details Sidebar */}
        <div className="w-full">
          <div className="bg-[#FFFFFF] p-6 rounded-[16px]  border border-[#E6E6E6]">
            <h2 className="text-[18px] font-semibold font-[600] text-[#1C1C1C] mb-2">Details</h2>
            
            <div className="space-y-0">
              <DetailRow label="Created By:" value={enquiry.createdBy || "Admin"} />
              <DetailRow label="Enquiry Date:" value={formatDate(enquiry.enquiryDate || enquiry.date)} />
              <DetailRow label="last follow up date:" value={formatDate(formData.date)} />
              <DetailRow label="next follow up date:" value={formData.status === 'Inactive' ? "Not Applicable" : formatDate(formData.nextFollowUpDate)}/>
              
              <DetailRow label="Name:" value={enquiry.name} />
              <DetailRow label="Phone:" value={enquiry.phone} />
              <DetailRow label="Address:" value={enquiry.address || "--"} />
              <DetailRow label="Email:" value={enquiry.email || "--"} />
              <DetailRow label="Class:" value={enquiry.class || "--"} />
              <DetailRow label="Number of child:" value={enquiry.noOfPerson || enquiry.numberOfChild || "--"} />
              <DetailRow label="Source:" value={enquiry.source || "Walk-in"} />
              <DetailRow label="Note:" value={enquiry.note || "--"} isLast />
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }.hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

      `}} />
    </div>
  );
};

const DetailRow = ({ label, value, highlight, isLast }) => (
  <div className={`grid grid-cols-2 py-5 ${!isLast ? 'border-b border-[#F0F0F0]' : ''}`}>
    <span className="text-[14px] text-[#1C1C1C] font-semibold">{label}</span>
    <span className={`text-[14px] font-medium ${highlight ? 'text-[#696969]' : 'text-[#696969]'} text-center`}>
      {value}
    </span>
  </div>
);

export default FollowUpAdmissionQuery;
