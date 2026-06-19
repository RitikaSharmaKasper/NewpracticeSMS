import React from 'react';

const ConfirmCheckOutModal = ({ visitor, onClose, onConfirm }) => {
  if (!visitor) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">

      <div className="bg-[#FFFFFF] rounded-[10px] shadow-lg w-full max-w-xl overflow-hidden p-6">
        <h2 className="text-[18px] font-semibold text-[#0A0A0A] front-[600] flex items-center gap-2 mb-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg> 
          Confirm Check Out
        </h2>
        <p className="text-[14px] text-[#717182] font-[400]  font-normal mb-7">Are you sure you want to check out this visitor?</p>
        
        <div className="bg-[#ECECF0] rounded-[10px] pr-4 pl-4 pt-3 pb-3 mb-5 ">
          <p className="text-[16px]  font-[600] font-semibold text-[#0A0A0A]">{visitor.name}</p>
          <p className="text-[14px] text-[#717182] font-[400]  mt-1">Check-in time: {visitor.checkInTime}</p>
          <p className="text-[14px] text-[#717182] font-[400]  mt-1">Purpose: {visitor.purpose}</p>
        </div>

        <div className="flex justify-end items-center gap-3">
          <button 
            onClick={onClose}
            className="py-2 px-7 border border-[#9C9C9C] rounded-[8px] text-[16px] font-semibold text-[#1C1C1C] bg-[#FFFFFF]  transition-colors font-[600]"
          >
            Cancel
          </button>
          <button 
            onClick={() => onConfirm(visitor)}
            className="bg-[#0B3142] text-white py-2 px-7 rounded-[8px] text-[16px] font-semibold transition-colors"
          >
            Confirm Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCheckOutModal;
