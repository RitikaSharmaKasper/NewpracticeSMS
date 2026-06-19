import React from "react";
import { Link, useLocation } from "react-router-dom";

function AccountReview() {
  const location = useLocation();
  const trackingNo = location.state?.trackingNo || "#INV-YNM728343";

  return (
    <div className="bg-white min-h-screen w-full flex items-center justify-center px-6">
      <div className="bg-white shadow-[0px_8px_12px_rgba(0,0,0,0.12)] rounded-3xl p-16 lg:p-20 max-w-[770px] w-full flex items-center justify-center">
        <div className="flex flex-col gap-16 items-center max-w-[602px] w-full">

          {/* Top Section - Illustration + Text */}
          <div className="flex flex-col gap-9 items-center w-full">
            <div className="flex flex-col gap-6 items-center">
              {/* Illustration */}
              <div className="w-[280px] h-[210px] flex items-center justify-center">
                <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="80" r="60" fill="#EFF6FF" />
                  <path d="M80 80L95 95L125 65" stroke="#055BDA" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="100" cy="80" r="50" stroke="#055BDA" strokeWidth="3" fill="none" />
                  <circle cx="40" cy="40" r="8" fill="#DBEAFE" />
                  <circle cx="160" cy="50" r="6" fill="#DBEAFE" />
                  <circle cx="150" cy="130" r="10" fill="#EFF6FF" />
                  <circle cx="50" cy="120" r="5" fill="#DBEAFE" />
                </svg>
              </div>

              {/* Title + Tracking */}
              <div className="flex flex-col gap-6 items-center">
                <h1 className="text-[#0F172A] font-semibold text-[36px] text-center">Account Under Review</h1>
                <div className="flex items-center gap-3">
                  <span className="text-[#64748B] font-semibold text-[18px]">Tracking No :</span>
                  <span className="text-[#055BDA] font-semibold text-[18px]">{trackingNo}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-9 items-center w-full text-center">
              <p className="text-[#64748B] font-semibold text-[24px] leading-[1.2]">
                Your school account is currently being reviewed. We'll notify you once it's approved
              </p>
              <p className="text-[#94A3B8] font-semibold text-[18px] leading-[1.2]">
                This usually takes 24-48 hours. If you have any questions, feel free to contact our support team.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 w-full max-w-[478px]">
            <Link
              to="/contact-support"
              className="border border-[#CBD5E1] text-[#475569] font-medium text-[14px] h-12 flex items-center justify-center rounded-[10px] hover:bg-gray-50 transition-colors w-full"
            >
              Contact Support
            </Link>
            <Link
              to="/login"
              className="bg-[#055BDA] text-white font-semibold text-[16px] h-12 flex items-center justify-center rounded-xl hover:bg-[#044a9e] transition-colors w-full"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountReview;
