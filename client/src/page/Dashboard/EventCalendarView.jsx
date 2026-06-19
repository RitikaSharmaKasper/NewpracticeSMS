import React from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from "react-router-dom";

const EventCalendarView = () => {
    const navigate = useNavigate();
      const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
            {/* Back Button */}
              <div
                onClick={handleClick}
                htmlFor=""
                className="text-[20px] sm:text-[20px] md:text-[25px] lg:text-[24px]"
                style={{
                  color: "#696969",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "400",
                  cursor: "pointer",
                  marginBottom: "20px",
                }}
              >
                <MdKeyboardArrowLeft/> Back
              </div>
    </div>
  )
}

export default EventCalendarView