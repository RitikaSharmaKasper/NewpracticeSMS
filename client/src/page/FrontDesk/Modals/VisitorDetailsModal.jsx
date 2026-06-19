import React from 'react';

const VisitorDetailsModal = ({ visitor, onClose, onCheckOut }) => {
  if (!visitor) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 px-4 py-4">
      <div className="bg-white rounded-[10px] shadow-lg w-full max-w-[52rem] max-h-[95vh] flex flex-col overflow-hidden">

        <div className="flex justify-between items-start p-4 sm:p-5 border-b border-gray-100">
          <div>
            <h2 className="text-[18px] font-semibold text-[#0A0A0A] flex items-center gap-2 font-[600]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg> 
              Visitor Details
            </h2>
            <p className="text-[14px] sm:text-[16px] text-[#717182] mt-0 font-[400] font-regular">Complete information about this visitor</p>
          </div>
          <button onClick={onClose} className="text-[#1F1F1F] font-bold text-lg hover:text-red-500 transition-colors">
            ✕
          </button>
        </div>

        
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 no-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 sm:gap-y-6 gap-x-8">
            <div>
              <p className="text-[13px] sm:text-[14px] text-[#9C9C9C] mb-0">Date</p>
              <p className="text-[15px] sm:text-[16px] font-semibold text-[#1C1C1C]">{visitor.date}</p>
            </div>
            <div>
              <p className="text-[13px] sm:text-[14px] text-[#9C9C9C] mb-0">Check-in Time</p>
              <p className="text-[15px] sm:text-[16px] font-semibold text-[#1C1C1C]">{visitor.checkInTime}</p>
            </div>
            
            <div>
              <p className="text-[13px] sm:text-[14px] text-[#9C9C9C] mb-0">Visitor Name</p>
              <p className="text-[15px] sm:text-[16px] font-semibold text-[#1C1C1C]">{visitor.name}</p>
            </div>
            <div>
              <p className="text-[13px] sm:text-[14px] text-[#9C9C9C] mb-0">Purpose</p>
              <p className="text-[15px] sm:text-[16px] font-semibold text-[#1C1C1C]">{visitor.purpose}</p>
            </div>

            <div>
              <p className="text-[13px] sm:text-[14px] text-[#9C9C9C] mb-0">Mobile Number</p>
              <p className="text-[15px] sm:text-[16px] font-[600] font-semibold text-[#1C1C1C]">{visitor.phone}</p>
            </div>
            <div>
              <p className="text-[13px] sm:text-[14px] text-[#9C9C9C] mb-0">Expected Duration</p>
              <p className="text-[15px] sm:text-[16px] font-[600] font-semibold text-[#1C1C1C]">30 mins</p>
            </div>

            <div>
              <p className="text-[13px] sm:text-[14px] text-[#9C9C9C] mb-0">No. of Person</p>
              <p className="text-[15px] sm:text-[16px] font-[600] font-semibold text-[#1C1C1C]">1</p>
            </div>
            <div>
              <p className="text-[13px] sm:text-[14px] text-[#9C9C9C] mb-0">ID Proof Number</p>
              <p className="text-[15px] sm:text-[16px] font-semibold text-[#1C1C1C]">{visitor.idProofNumber || "XXXX-XXXX-1234"}</p>
            </div>
            
            <div className="sm:col-span-2">
              <p className="text-[13px] sm:text-[14px] text-[#9C9C9C] mb-0">Note</p>
              <p className="text-[15px] sm:text-[16px] font-[600] font-semibold text-[#1C1C1C]">{visitor.note || "—"}</p>
            </div>
          </div>
        </div>


        <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 p-4 sm:p-5 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="order-2 sm:order-1 py-2 sm:py-2.5 px-7 border border-[#9C9C9C] rounded-[8px] text-[14px] sm:text-[16px] font-semibold text-[#696969] bg-[#FFFFFF] transition-colors hover:bg-gray-50"
          >
            Close
          </button>
          {!visitor.checkOutTime && (
            <button 
              onClick={() => onCheckOut(visitor)}
              className="order-1 sm:order-2 bg-[#0B3142] text-[#FFFFFF] py-2 sm:py-2.5 px-8 rounded-[8px] text-[14px] sm:text-[16px] font-semibold transition-colors hover:bg-[#002B36]"
            >
              Check- Out
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default VisitorDetailsModal;
