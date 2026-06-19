import React from "react";
import { certificatePrimaryButtonClass } from "../shared/certificateStyles";

function TransferCertificateListHeader({ onCreate }) {
  return (
    <div className="flex items-start justify-between gap-4 w-full">
      <div className="flex flex-1 flex-col items-start min-w-0">
        <h2 className="text-[18px] font-semibold text-[#1C1C1C] leading-none">
          Transfer Certificates
        </h2>
        <p className="text-[14px] text-[#9C9C9C] mt-2 leading-normal">
          View and create transfer certificate for students
        </p>
      </div>

      <button type="button" onClick={onCreate} className={certificatePrimaryButtonClass}>
        <span className="text-[20px] font-normal leading-none -mt-px">+</span>
        Transfer Certificate
      </button>
    </div>
  );
}

export default TransferCertificateListHeader;
