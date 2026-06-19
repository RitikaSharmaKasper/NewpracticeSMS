import React from 'react';
import connection from "../../../assets/images/connection.png"
const ConnectionTips = () => (
  <div className="bg-[#EEF2FF] border border-[#E0E7FF] rounded-xl p-4 flex items-start gap-4 mb-8">
    <div className="bg-[#4F39F6] rounded-[14px] p-2 flex items-center justify-center shrink-0">
     <img 
      src={connection} 
      alt="Info" 
      className="h-6 w-6 object-contain" 
    />
    </div>
    <div>
      <h4 className="text-[#1C1C1C] font-[600] text-[16px]">Connection Tips</h4>
      <p className="text-[#696969] text-[14px] font-[400] leading-relaxed opacity-80">
        For the best experience, join classes from a quiet location with stable internet. 
        Test your camera and microphone before joining. Join 5 minutes early if possible.
      </p>
    </div>
  </div>
);

export default ConnectionTips;