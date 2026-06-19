import React from 'react';
import { useNavigate } from 'react-router-dom';
import youtube from "../../assets/images/youtube.png";
import usericon from "../../assets/images/usericon.png";
import timeicon from "../../assets/images/time-icon.png"

const ClassCard = ({ data, isLive, fromPath = '/online-class-dashbord' }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/class-details/${data._id}`, { state: { from: fromPath } })}
      className={`bg-white border rounded-xl p-8 transition-all w-full border-gray-200 cursor-pointer hover:shadow-md`}
    >
      <div className="flex justify-between items-start mb-5">
        <div className="text-left">
          {isLive && (
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#DC2626] rounded-full"></span>
              <span className="bg-[#DC2626] text-white text-[12px] px-3 py-0.5 rounded-lg uppercase font-400">Live Now</span>
            </div>
          )}
          <h3 className="font-medium text-[#696969] text-[18px]">{data.classTitle}</h3>
          <p className="text-[14px] text-[#4A5565]   mt-0 font-400">{data.subject}</p>
        </div>
        <span className="text-[12px] bg-[#FFFFFF] font-[400] text-[#9C9C9C] px-3 py-0.2 mt-4 rounded-[5px] border border-[#9C9C9C] font-medium whitespace-nowrap">
          {data.className} - {data.section}
        </span>
      </div>

      <div className="flex flex-col items-start gap-2 mb-6">
        <div className="flex items-center text-[14px] bg-[#FFFFFF] font-[400] text-[#1C1C1C] gap-2">
          <img src={usericon} alt="User" className="h-4 w-5 object-contain" />{data.teacher}
        </div>
        <div className="flex items-center text-[14px] text-[#4A5565] text-[400] gap-2 mt-[-6px]">
          <img src={timeicon} alt="Time" className="h-4 w-5 object-contain" />{data.startTime} - {data.endTime || "Ongoing"} ({data?.duration} min)
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();

          isLive
            ? window.open(data.meetingLink, "_blank")
            : navigate(`/class-details/${data._id}`, {
              state: { from: fromPath },
            });
        }}
        className={`w-full py-1.5 rounded-lg font-normal text-[16px] font-400 flex items-center justify-center gap-4 transition-colors ${isLive ? 'bg-[#DC2626] text-white' : 'bg-[#0B3142] text-white'
          }`}
      >
        {isLive ? (
          <>
            <img src={youtube} alt="Join" className="h-4 w-4 object-contain" /> Join Now
          </>
        ) : (
          "View Details"
        )}
      </button>
    </div>
  );
};

export default ClassCard;