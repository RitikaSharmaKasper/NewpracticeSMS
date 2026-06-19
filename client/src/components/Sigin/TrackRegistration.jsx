import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiCopy, FiMail, FiBell, FiUsers } from "react-icons/fi";
import { toast } from "react-toastify";
import logo from "../../assets/images/munc-logo.png";
import trackingimg from "../../assets/images/trackingimg.png";
import { CiClock2 } from "react-icons/ci";

function TrackRegistration() {
  const [trackingId, setTrackingId] = useState("");
  const [searched, setSearched] = useState(false);

  // Dummy data
  const applicationData = {
    trackingNo: "INV-YNM728343",
    appliedOn: "24 Apr 2024",
    schoolName: "Samarth Public School",
    status: "Under Review",
    submittedTime: "24 Apr, 10:30 AM",
    reviewTime: "24 Apr, 02:315 PM",
  };

  const handleSearch = () => {
    if (!trackingId.trim()) {
      toast.error("Please enter a Tracking ID");
      return;
    }
    setSearched(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(applicationData.trackingNo);
    toast.success("Tracking ID copied!");
  };

  return (
    <div
      className="w-full bg-[#F8FAFB] flex flex-col"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      {/* Header - Blue gradient */}
      <header className="bg-gradient-to-r from-[#0A3FD1] to-[#1565E8] px-6 sm:px-12 lg:px-20 py-4 flex items-center justify-between shrink-0 sticky top-0 z-50">
        <img src={logo} alt="MUN-C" className="h-10 brightness-0 invert" />
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="bg-white text-[#0F172A] text-[13px] font-medium px-4 h-9 flex items-center rounded-md hover:bg-gray-100 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/register"
            className="border border-white text-white text-[13px] font-medium px-4 h-9 flex items-center rounded-md hover:bg-white/10 transition-colors"
          >
            Register Organization
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-3 sm:px-4 lg:px-5 xl:px-4 lg:w-full py-6">
        <div className="mx-auto flex flex-col gap-6">
          {/* Tracking ID Search */}
          <div>
            <label className="text-[12px] font-semibold text-[#0F172A] mb-1.5 block">
              Tracking ID
            </label>
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="e.g. INV-YNM728343"
                  className="w-full border border-[#E2E2E2] rounded-md px-4 h-[42px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#055BDA] transition-colors placeholder:text-[#94A3B8] bg-white"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <p className="text-[11px] text-[#64748B] mt-1">
                  Reference IDs are usually in the format INV-XXXXXXXXX
                </p>
              </div>
              <button
                onClick={handleSearch}
                className="bg-[#055BDA] text-white text-[14px] font-medium px-5 h-[42px] rounded-md flex items-center gap-2 hover:bg-[#044a9e] transition-colors shrink-0"
              >
                <FiSearch size={15} /> Search
              </button>
            </div>
          </div>

          {/* Results */}
          {searched && (
            <div className="flex flex-col gap-5">
              {/* Track Your Application Card */}
              <div className="bg-white rounded-2xl border border-[#E6E6E6] p-6 sm:p-8">
                <div className="flex justify-between gap-6">

                  <div className="w-full">
                    {/* Tracking your application */}
                    <div>
                      <h2 className="text-[#0F172A] font-bold text-[22px]">
                        Track Your Application
                      </h2>
                      <p className="text-[#64748B] text-[14px] mt-1">
                        Stay updated about your application status and review
                        progress.
                      </p>
                    </div>

                    {/* Info Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 bg-[#F8FAFB] rounded-lg p-4 border border-[#E6E6E6]">
                      <div className="flex flex-col gap-0.5 border-r border-[#E6E6E6] pr-4">
                        <span className="text-[12px] text-[#64748B]">
                          Tracking No.
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[#055BDA] font-bold text-[15px]">
                            {applicationData.trackingNo}
                          </span>
                          <button
                            onClick={handleCopy}
                            className="text-[#64748B] hover:text-[#055BDA]"
                          >
                            <FiCopy size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5 border-r border-[#E6E6E6] pr-4">
                        <span className="text-[12px] text-[#64748B]">
                          Applied On
                        </span>
                        <span className="text-[#0F172A] font-bold text-[15px]">
                          {applicationData.appliedOn}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] text-[#64748B]">
                          School Name
                        </span>
                        <span className="text-[#0F172A] font-bold text-[15px]">
                          {applicationData.schoolName}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* image */}
                  <div>
                    <img
                      src={trackingimg}
                      alt="Track Application"
                      // className="w-full h-auto rounded-lg"
                    />
                  </div>

                </div>


                {/* Application Status Card */}
                <div className="bg-white rounded-2xl border border-[#E6E6E6] p-6 sm:p-8 mb-3 mt-3">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[#0F172A] font-bold text-[18px]">
                      Application Status
                    </h3>
                    <span className="bg-green-50 border border-yellow-200 text-yellow-600 text-[15px] font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <CiClock2 style={{ strokeWidth: 2 }}/> Under Review
                    </span>
                  </div>

                  {/* Progress Steps */}
                  <div className="flex items-start justify-between relative mb-8 px-2">
                    <div className="absolute top-[14px] left-[14px] right-[14px] h-[3px] bg-[#E2E8F0] z-0"></div>
                    <div
                      className="absolute top-[14px] left-[14px] h-[3px] bg-[#055BDA] z-0"
                      style={{ width: "35%" }}
                    ></div>

                    <div className="flex flex-col items-start gap-2 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-[13px]">
                        ✓
                      </div>
                      <span className="text-[#0F172A] font-semibold text-[13px]">
                        Submitted
                      </span>
                      <span className="text-[#64748B] text-[11px]">
                        {applicationData.submittedTime}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-2 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#055BDA] border-4 border-[#DBEAFE]"></div>
                      <span className="text-[#0F172A] font-semibold text-[13px]">
                        Under Review
                      </span>
                      <span className="text-[#64748B] text-[11px]">
                        {applicationData.reviewTime}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-2 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#F1F5F9] border-2 border-[#CBD5E1]"></div>
                      <span className="text-[#64748B] font-medium text-[13px]">
                        Approve
                      </span>
                      <span className="text-[#94A3B8] text-[11px]">
                        Pending
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-2 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#F1F5F9] border-2 border-[#CBD5E1]"></div>
                      <span className="text-[#64748B] font-medium text-[13px]">
                        Account Activated
                      </span>
                      <span className="text-[#94A3B8] font-bold text-[11px]">
                        Pending
                      </span>
                    </div>
                  </div>

                  {/* Info Banner */}
                  <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl px-4 py-3 flex items-start gap-2.5">
                    <span className="text-[#055BDA] text-[16px] mt-0.5">ℹ</span>
                    <div>
                      <p className="text-[#0F172A] font-semibold text-[13px]">
                        Our team is reviewing your application. You'll receive
                        an email once there's an update.
                      </p>
                      <p className="text-[#64748B] text-[12px] mt-0.5">
                        This usually takes a few hours during business days.
                      </p>
                    </div>
                  </div>
                </div>

                {/* What's Next Card */}
                <div className="bg-white rounded-2xl border border-[#E6E6E6] p-6 sm:p-8">
                  <h3 className="text-[#0F172A] font-bold text-[18px] mb-8">
                    What's next?
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                        <FiMail size={20} className="text-[#055BDA]" />
                      </div>
                      <span className="text-[#0F172A] font-bold text-[13px]">
                        Check Your Email
                      </span>
                      <span className="text-[#64748B] text-[11px]">
                        We'll notify you at
                        <br />
                        <span className="text-[#055BDA] underline">
                          abc@samarthpublicschool.edu
                        </span>
                      </span>
                    </div>

                    <span className="text-[#94A3B8] text-xl hidden sm:block">
                      →
                    </span>

                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                        <FiBell size={20} className="text-[#055BDA]" />
                      </div>
                      <span className="text-[#0F172A] font-bold text-[13px]">
                        Get Approval
                      </span>
                      <span className="text-[#64748B] text-[11px]">
                        Once approved, you can
                        <br />
                        complete your school setup.
                      </span>
                    </div>

                    <span className="text-[#94A3B8] text-xl hidden sm:block">
                      →
                    </span>

                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                        <FiUsers size={20} className="text-[#055BDA]" />
                      </div>
                      <span className="text-[#0F172A] font-bold text-[13px]">
                        Get Started
                      </span>
                      <span className="text-[#64748B] text-[11px]">
                        Access your dashboard and
                        <br />
                        explore all features.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="flex flex-col items-center gap-4 py-4">
                  <p className="text-[#64748B] text-[14px] font-medium">
                    Need help? Our support team is here for you.
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/contact-support"
                      className="border border-[#CBD5E1] text-[#475569] font-medium text-[13px] px-5 h-10 flex items-center rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Contact Support
                    </Link>
                    <Link
                      to="/login"
                      className="bg-[#055BDA] text-white font-semibold text-[13px] px-6 h-10 flex items-center rounded-md hover:bg-[#044a9e] transition-colors"
                    >
                      Go to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackRegistration;
