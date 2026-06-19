import React, { useState, useEffect } from "react";
import dummyData from "../../data/data.json";
import schedulenew from "../../assets/images/sechedulenew.png";
import { useNavigate } from "react-router-dom";

import nodata_foundIcon from "../../assets/images/absence.png";
const Substitution = () => {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[#1C1C1C] text-lg font-semibold">
          Teacher Absence & Substitution
        </p>
        <span className="text-md text-[#9C9C9C]">
          Manage teacher absences and assign substitutes
        </span>
      </div>

      <div className="p-12 flex flex-col items-center justify-center gap-3.75 text-center opacity-40">
        <img className="w-20" src={nodata_foundIcon} alt="nodata" />
        <p className="text-[#6B7280] text-[18px] font-medium">
          No teacher absences recorded
        </p>
      </div>
    </div>
  );
};

export default Substitution;
