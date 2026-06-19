import React, { useState, useRef } from "react";
import { FaHashtag } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdLock, MdOutlineSchool } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { CiLock } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { BsFillKeyFill } from "react-icons/bs";
import { BsFillShieldLockFill } from "react-icons/bs";
import { IoPrintOutline } from "react-icons/io5";
import { GrDownload } from "react-icons/gr";
import logo from "../../assets/images/logo.png";
import idphoto from "../../assets/images/id-photo.png";
import top from "../../assets/images/top.png";
import bottom from "../../assets/images/bottom.png";
import { PiCalendarBlankLight } from "react-icons/pi";
import { LiaSitemapSolid } from "react-icons/lia";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../config/axiosInstance";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import { useRef } from "react";

function JobLetter() {
  const navigate = useNavigate();
  // add pdf and print

  const printRef = useRef();

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    alert("Copied successfully");
  };

  const { id } = useParams();
  const {
    data: oneStaff,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["staff", id],

    queryFn: async () => {
      const res = await api.get(`/staff/${id}`);
      return res.data.data;
    },

    enabled: !!id,
  });

  const [showPassword, setShowPassword] = useState(false);

  // const username = `${
  //   oneStaff?.personalInfo?.staffName || ""
  // }@${oneStaff?.staffId || ""}`;

  
  const username = `${
    oneStaff?.personalInfo?.staffName || ""
  }@${oneStaff?.staffId || ""}`;

  const password = `${oneStaff?.personalInfo?.staffName
    ?.split(" ")[0]
    ?.toLowerCase()}@${oneStaff?.staffId?.slice(-4)?.toLowerCase()}`;

  // console.log(oneStaff);

  // handle print add
  const handlePrint = async () => {
    setShowPassword(true);

    setTimeout(async () => {
      const input = printRef.current;
      const buttons = document.querySelector(".pdf-hide");
      if (buttons) buttons.style.display = "none";

      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        windowWidth: input.scrollWidth,
        windowHeight: input.scrollHeight,
      });

      if (buttons) buttons.style.display = "flex";

      const imgData = canvas.toDataURL("image/png");
      const printWindow = window.open("", "_blank");

      printWindow.document.write(`
      <html>
        <head>
          <title>Job Letter</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 6mm;
            }

            html, body {
              margin: 0;
              padding: 0;
              width: 297mm;
              height: 210mm;
              overflow: hidden;
              background: #ffffff;
            }

            .page {
              width: 285mm;
              height: 198mm;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }

            img {
              max-width: 285mm;
              max-height: 198mm;
              width: auto;
              height: auto;
              object-fit: contain;
              display: block;
            }
          </style>
        </head>

        <body>
          <div class="page">
            <img src="${imgData}" />
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 300);
            };
          </script>
        </body>
      </html>
    `);

      printWindow.document.close();
    }, 300);
  };

  const handleDownloadPDF = async () => {
    setShowPassword(true);

    setTimeout(async () => {
      const input = printRef.current;

      const buttons = document.querySelector(".pdf-hide");
      if (buttons) buttons.style.display = "none";

      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        windowWidth: input.scrollWidth,
        windowHeight: input.scrollHeight,
      });

      if (buttons) buttons.style.display = "flex";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 6;
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;

      const imgRatio = canvas.width / canvas.height;
      const pageRatio = maxWidth / maxHeight;

      let imgWidth;
      let imgHeight;

      if (imgRatio > pageRatio) {
        imgWidth = maxWidth;
        imgHeight = maxWidth / imgRatio;
      } else {
        imgHeight = maxHeight;
        imgWidth = maxHeight * imgRatio;
      }

      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save(
        `${oneStaff?.personalInfo?.staffName || "staff"}-job-letter.pdf`,
      );
    }, 300);
  };
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span
          onClick={() => navigate("/all-staffs")}
          className="text-[#696969] text-[18px] cursor-pointer sm:text-[20px] md:text-[24px] font-semibold"
        >
          All Staff
        </span>

        <span className="text-[#696969]">
          <IoIosArrowForward size={18} />
        </span>

        <span className="text-[#1c1c1c] text-[18px] sm:text-[20px] md:text-[24px] font-semibold">
          Job Letter
        </span>
      </div>

      <div className="w-full px-6 py-8">
        <div className="flex justify-center">
          <div
            ref={printRef}
            className="pt-3 bg-gradient-to-r from-[#0077B6] via-[#118AB2] to-[#0F4057] w-full rounded-[32px] relative overflow-hidden"
          >
            <img
              src={bottom}
              alt="logo"
              className="absolute top-5 left-0 opacity-40"
            />

            <img
              src={top}
              alt=""
              className="absolute bottom-0 right-0 opacity-40"
            />

            <div className="bg-white mt-2 p-6 rounded-[32px] w-full">
              {/* ================= HEADER ================= */}
              <div className="flex flex-wrap justify-between items-center gap-6 p-4 border-b-2 border-dashed border-[#9C9C9C] mb-10">
                <div className="w-[220px] h-[90px] overflow-hidden flex items-center">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col items-center text-center flex-1">
                  <span className="text-[#000000] text-[24px] font-semibold">
                    Kasper Infotech Private Limited
                  </span>

                  <span className="text-[16px] text-[#000000]">
                    123, Education Avenue, Springfield, IL 62710
                  </span>

                  <span className="text-[16px] text-[#000000]">
                    Phone: +91 620 212 4896 | Email: info@greenwood.edu
                  </span>
                </div>

                {/* <button className="h-[38px] px-5 bg-[#B5FFD1] border border-[#5BCB85] rounded-md font-semibold text-[#009638] text-[15px] shadow-sm">
                  • Active
                </button> */}
                {/* <button className="h-[38px] px-5 bg-[#B5FFD1] border border-[#5BCB85] rounded-md font-semibold text-[#009638] text-[15px] shadow-sm">
                  • Send to email
                </button> */}
              </div>

              {/* ================= MAIN CONTENT ================= */}
              <div className="flex flex-col xl:flex-row gap-8 w-full">
                {/* ================= LEFT CARD ================= */}
                <div
                  className="w-full xl:w-[340px] p-6 rounded-2xl bg-gradient-to-r from-[#F9FAFB] to-[#ffffff] shrink-0"
                  style={{
                    boxShadow: `0px 0px 8px rgba(0,0,0,0.15)`,
                  }}
                >
                  <div className="flex flex-col items-center gap-5">
                    <div
                      className="h-[260px] w-[220px] rounded-xl overflow-hidden"
                      style={{
                        boxShadow: `
                    2px 2px 12px rgba(255,126,249,0.5),
                    -2px -2px 12px rgba(100,192,233,0.69)
                  `,
                      }}
                    >
                      <img
                        src={oneStaff?.profilePhoto?.url}
                        alt="idphoto"
                        className="h-full w-full object-cover border-2 border-white rounded-xl"
                      />
                    </div>

                    <div className="flex flex-col items-center border-b border-[#E6E6E6] pb-4 w-full">
                      <span className="text-[20px] font-semibold text-[#000000]">
                        {oneStaff?.personalInfo?.staffName}
                      </span>

                      <span className="text-[15px] text-[#9C9C9C] font-medium">
                        {oneStaff?.staffId}
                      </span>
                    </div>

                    {/* CARD ITEMS */}

                    <div className="flex gap-3 border border-[#E6E6E6] p-4 rounded-xl w-full items-center">
                      <span className="text-[#155DFC] bg-[#D2E9FE] rounded-lg p-2">
                        <PiCalendarBlankLight size={28} />
                      </span>

                      <div className="flex flex-col">
                        <span className="text-[13px] text-[#696969]">Date</span>

                        <span className="font-semibold text-[15px] text-[#1C1C1C]">
                          {oneStaff?.employmentInfo?.dateOfJoining}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 border border-[#E6E6E6] p-4 rounded-xl w-full items-center">
                      <span className="text-[#9810FA] bg-[#E6E8FF] rounded-lg p-2">
                        <MdOutlineSchool size={28} />
                      </span>

                      <div className="flex flex-col">
                        <span className="text-[13px] text-[#696969]">
                          Employee Role
                        </span>

                        <span className="font-semibold text-[15px] text-[#1C1C1C]">
                          {oneStaff?.employmentInfo?.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 border border-[#E6E6E6] p-4 rounded-xl w-full items-center">
                      <span className="text-[#E60076] bg-[#FEE5EB] rounded-lg p-2">
                        <LiaSitemapSolid size={28} />
                      </span>

                      <div className="flex flex-col">
                        <span className="text-[13px] text-[#696969]">
                          Department
                        </span>

                        <span className="font-semibold text-[15px] text-[#1C1C1C]">
                          {oneStaff?.employmentInfo?.department}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className="flex-1">
                  <div
                    className="p-8 rounded-2xl bg-white w-full"
                    style={{
                      boxShadow: `0px 0px 8px rgba(0,0,0,0.15)`,
                    }}
                  >
                    {/* HEADER */}
                    <div className="flex gap-3 items-center mb-6">
                      <span
                        className="inline-flex items-center justify-center w-10 h-10  rounded-lg"
                        style={{
                          background:
                            "linear-gradient(to right, #0F4057, #118AB2)",
                        }}
                      >
                        <MdLock size={20} className="text-white" />
                      </span>

                      <div className="flex flex-col">
                        <span className="text-[18px] font-semibold text-[#1c1c1c]">
                          Access Credential
                        </span>
                        <span className="text-[14px] text-[#696969]">
                          Use these credentials to login
                        </span>
                      </div>
                    </div>

                    {/* USERNAME */}
                    <div className="border border-[#E6E6E6] px-6 py-5 rounded-xl mt-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-5">
                          <span
                            className="rounded-lg p-3"
                            style={{
                              background:
                                "linear-gradient(to right, #2B7FFF, #00B8DB)",
                            }}
                          >
                            <FaUser size={24} style={{ color: "#FFFFFF" }} />
                          </span>

                          <div className="flex flex-col">
                            <span className="text-[14px] text-[#696969]">
                              Username
                            </span>

                            <span className="font-semibold text-[#1C1C1C] text-[16px] break-all">
                              {oneStaff?.username || "N/A"}
                            </span>
                          </div>
                        </div>

                        <FaRegCopy
                          size={20}
                          className="text-[#9C9C9C] cursor-pointer"
                          onClick={() => handleCopy(username)}
                        />
                      </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="border border-[#E6E6E6] px-6 py-5 rounded-xl mt-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-5">
                          <span
                            className=" rounded-lg p-3"
                            style={{
                              background:
                                "linear-gradient(to right, #0F4057, #118AB2)",
                            }}
                          >
                            <BsFillKeyFill
                              size={24}
                              style={{ color: "#FFFFFF" }}
                            />
                          </span>

                          <div className="flex flex-col">
                            <span className="text-[14px] text-[#696969]">
                              Password
                            </span>

                            <span className="font-semibold text-[#1C1C1C] text-[16px] uppercase">
                              {showPassword ? password : "************"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {showPassword ? (
                            <FiEyeOff
                              size={20}
                              className="text-[#9C9C9C] cursor-pointer"
                              onClick={() => setShowPassword(false)}
                            />
                          ) : (
                            <FiEye
                              size={20}
                              className="text-[#9C9C9C] cursor-pointer"
                              onClick={() => setShowPassword(true)}
                            />
                          )}

                          <FaRegCopy
                            size={20}
                            className="text-[#9C9C9C] cursor-pointer"
                            onClick={() => handleCopy(password)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* NOTICE */}
                    <div
                      className="flex gap-4 border border-[#FEE685] px-6 py-5 rounded-xl mt-5 "
                      style={{
                        background:
                          "linear-gradient(to right, #FFFBEB, #FFF7ED)",
                      }}
                    >
                      <span
                        className=" rounded-lg p-3 h-fit"
                        style={{
                          background:
                            "linear-gradient(to right, #C4523D, #B29A11)",
                        }}
                      >
                        <BsFillShieldLockFill
                          size={24}
                          style={{ color: "white" }}
                        />
                      </span>

                      <div className="flex flex-col">
                        <span className="text-[16px] font-semibold text-[#894B00]">
                          Important Security Notice
                        </span>

                        <span className="text-[14px] text-[#BB4D00]">
                          Please change your password after first login.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="pdf-hide flex flex-col sm:flex-row gap-5 mt-8 p-4 rounded-xl">
                    <button
                      onClick={handlePrint}
                      className="flex-1 flex items-center justify-center gap-3 py-3 rounded-xl text-white text-[17px] font-semibold"
                      style={{
                        background:
                          "linear-gradient(to right, #0F4057, #118AB2)",
                      }}
                    >
                      <IoPrintOutline />
                      Print Letter
                    </button>

                    <button
                      onClick={handleDownloadPDF}
                      className="flex-1 flex items-center justify-center gap-3 border-2 border-[#E6E6E6] bg-white py-3 rounded-xl text-[#696969] text-[17px] font-semibold"
                    >
                      <GrDownload />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobLetter;
