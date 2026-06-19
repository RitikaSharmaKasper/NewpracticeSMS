import React, { useRef, useEffect } from 'react';
import { useReactToPrint } from "react-to-print";
import logo from "../../../assets/images/treelogo.png";

const PrintGatePass = ({ open, onClose, studentData, autoPrint }) => {
  const printRef = useRef();

  // ─── Only thing changed: window.open() instead of window.print() ───
  // This prints ONLY the gate pass in a clean window — no blank pages.
  const handlePrint = useReactToPrint({
  contentRef: printRef,
  documentTitle: "Gate Pass",
});

  useEffect(() => {
    if (open && studentData && autoPrint) {
      const timer = setTimeout(() => {
        handlePrint();
        onClose();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open, studentData, autoPrint]);

  if (!open || !studentData) return null;

  // ─── YOUR ORIGINAL JSX — untouched ───
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/20 backdrop-blur-[0.5px] p-4 print:p-0 print:static print:bg-transparent"
      onClick={onClose}
    >
      <div
        id="gate-pass-print-area"
        className="bg-white rounded-[18px] shadow-2xl w-full max-w-[90%] md:max-w-[42rem] lg:max-w-[72rem] max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={printRef} className="bg-white">
          {/* Blue Header Section */}
          <div className="bg-[linear-gradient(to_right,#E0EAFC,#CFDEF3)] pt-12 pb-4 px-6 text-center">
            <img
              src={logo}
              alt="School Logo"
              className="h-18 w-18 mx-auto mb-2 object-contain"
            />
            <h1 className="text-[30px] font-bold font-[700] text-[#1C1C1C] ">School name</h1>
            <p className="text-[#1C1C1C] font-[400] text-[16px] mt-0">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
            <p className="text-[#1C1C1C] font-[400] text-[16px]">Phone: +91-22-1234-5678 | Email: info@greenwood.edu.in</p>
          </div>

          {/* Body Section */}
          <div className="px-9 py-8 text-center">
            <h2 className="text-[30px] font-[600] font-semibold text-[#1C1C1C] mb-7">Gate Pass</h2>
            
            <p className="text-[16px] text-[#333333]  text-left pl-[101px] pr-[54px] mt-9 mb-2 w-[63rem] leading-relaxed">
              This is to certify that <span className="font-semibold font-[600] text-[16px] text-[#1C1C1C]">{studentData.name}</span>, 
              student of Class <span className="font-semibold font-[600] text-[16px] text-[#1C1C1C]">{studentData.class || 'Class 10'}</span> – 
              Section <span className="font-semibold font-[600] text-[16px] text-[#1C1C1C]">{studentData.section || 'A'}</span>, 
              is permitted for Exit from the school premises at <span className="font-semibold font-[600] text-[16px] text-[#1C1C1C]">{studentData.issuedAt || '11:15 AM '}</span> 
               on <span className="font-semibold font-[600] text-[16px] text-[#1C1C1C]">{studentData.date || '13-05-2026'}</span> 
              due to <span className="font-semibold font-[600] text-[#1C1C1C]">{studentData.reason}</span>.
            </p>
          </div>

          {/* Signature Grid Section */}
          <div className="grid grid-cols-4 border-t border-[#E6E6E6] mt-1">
            <div className="text-left pt-14 pl-4 pb-4 ">
              <span className="italic text-[14px] text-[#9C9C9C] block mb-1 ">[Signature]</span>
              <div className="text-[14px] font-normal text-[#1C1C1C]">Student</div>
            </div>
            <div className="text-center pt-14 pb-4 ">
              <span className="italic text-[14px] text-[#9C9C9C] block mb-1">[Signature]</span>
              <div className="text-[14px] font-normal text-[#1C1C1C]">Security In-charge</div>
            </div>
            <div className="text-center pt-14  pb-4">
              <span className="italic text-[14px] text-[#9C9C9C] block mb-1">[Signature]</span>
              <div className="text-[14px] font-normal text-[#1C1C1C]">Class Teacher</div>
            </div>
            <div className="text-right pt-14 pb-4 pr-4">
              <span className="italic text-[14px] text-[#9C9C9C] block mb-1">[Signature]</span>
              <div className="text-[14px] font-normal text-[#1C1C1C]">Approved By</div>
            </div>
          </div>
        </div>

        {/* Print button inside modal (View mode) */}
       

      </div>
    </div>
  );
};

export default PrintGatePass;