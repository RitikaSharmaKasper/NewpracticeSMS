import React from 'react';
import { IoClose } from 'react-icons/io5';
import { HiOutlineUserCircle } from 'react-icons/hi';
import userIcon from "../../../assets/images/usericon.png";

const ViewEnquiryModal = ({ isOpen, onClose, enquiry, followUpList }) => {
  if (!isOpen || !enquiry) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/20 backdrop-blur-[0.5px] overflow-hidden">
      <div className="bg-white w-full max-w-[50rem] rounded-[10px] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        {/* Main Header Container */}
<div className="p-5 pb-2">
  
  {/* Top Row: Icon, Heading, and Close Button */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      {/* Icon */}
      <img src={userIcon} alt="user Icon" className="h-5 w-5 object-contain" />
      
      {/* Heading */}
      <h2 className="text-[18px] font-semibold font-[600] text-[#0A0A0A] ">
        Admission Enquiry Details
      </h2>
    </div>

    {/* Close Button */}
    <button 
      onClick={onClose}
      className="p-1  rounded-full transition-colors text-[#1F1F1F]"
    >
      <IoClose size={22} />
    </button>
  </div>

  {/* Description: This now starts from the absolute left, aligned with the Icon */}
  <div className="mt-0">
    <p className="text-[16px] font-normal text-[#717182] font-[400] mt-0">
      Complete information about this Enquiry
    </p>
  </div>
</div>

        {/* Content */}
        <div className="px-6 pb-8 overflow-y-auto hide-scrollbar max-h-[85vh]">
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-x-7 gap-y-4 mb-2 pt-4 ">
            <DetailItem label="Enquiry Date:" value={enquiry.date} />
            <DetailItem label="last follow up date:" value={enquiry.lastFollowUpDate || enquiry.date} />
            <DetailItem label="Name" value={enquiry.name} />
            <DetailItem label="Mobile Number" value={enquiry.phone} />
            <DetailItem label="Email" value={enquiry.email || "--"} />
            <DetailItem label="Address" value={enquiry.address || "--"} />
            <DetailItem label="Class" value={enquiry.class || "--"} />
            <DetailItem label="No. of Person" value={enquiry.noOfPerson || enquiry.numberOfChild || "1"} />
            <DetailItem label="Source" value={enquiry.source || "--"} />
            <DetailItem label="Status" value={enquiry.status} />
          </div>

          {/* Follow Up History */}
          <div>
            <h3 className="text-[18px] font-semibold text-[#1C1C1C] mb-4 mt-7">Follow Up History</h3>
            <div className="border border-[#F0F0F0] rounded-[16px] overflow-hidden">
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead className="text-[14px] text-[#1C1C1C] font-medium font-[600]  border-b border-[#F0F0F0] ">
                    <tr>
                      <th className="py-3 px-6 font-medium">Date</th>
                      <th className="py-3 px-6 font-medium">Follow Up By</th>
                      <th className="py-3 px-6 font-medium pl-1">Follow Up Type</th>
                      <th className="py-3 px-6 font-medium">Response</th>
                      <th className="py-3 px-6 text-center font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px]">
                    {followUpList && followUpList.length > 0 ? (
                      followUpList.map((item, idx) => (
                        <tr key={idx} className="border-b border-[#F0F0F0] last:border-0">
                          <td className="py-3 px-4 text-[#1C1C1C] font-normal">{item.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#F3F4F6] overflow-hidden">
                                <img src={userIcon} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="text-[#12516E] font-normal font-[400] ">{item.followUpBy}</div>
                                <div className="text-[#9C9C9C] text-[12px]">{item.empId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-[#1C1C1C] font-normal font-[400] ">{item.type}</td>
                          <td className="py-3 px-4">
                            {/* <div className="bg-[#FAFBFF] border border-[#E6E6E6] rounded-[4px] px-4 py-2 text-[#696969] min-w-[50px] max-h-[80px] overflow-y-auto custom-scrollbar leading-relaxed">
                              {item.response}
                            </div> */}
                            <div className="bg-[#FAFBFF] border border-[#E6E6E6] rounded-[4px] px-4 py-2 text-[#696969] max-w-[260px] max-h-[80px] overflow-y-auto overflow-x-hidden break-words whitespace-pre-wrap custom-scrollbar text-[13px] leading-relaxed">
    {item.response}
  </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-4 py-1 rounded-[4px] text-[12px] font-semibold font-[600] ${
                              item.status === 'Active' ? 'bg-[#D4EDDA] text-[#009638]' : 
                              item.status === 'Converted' ? 'bg-[#E1EFFF] text-[#0055D4]' :
                              'bg-[#DEDEDE] text-[#696969]'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-10 text-centert text-[#696969]">No follow up history</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
       <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F1F1F1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CCCCCC;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #AAAAAA;
        }
      `}} />
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[14px] font-[400] text-[#9C9C9C] font-normal">{label}</span>
    <span className="text-[16px] text-[#1C1C1C] font-semibold">{value}</span>
  </div>
);

export default ViewEnquiryModal;
