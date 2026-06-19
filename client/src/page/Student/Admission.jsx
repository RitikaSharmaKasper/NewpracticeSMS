import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaHashtag } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineSchool } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { CiLock } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { BsFillKeyFill } from "react-icons/bs";
import { BsFillShieldLockFill } from "react-icons/bs";
import { IoPrintOutline } from "react-icons/io5";
import { GrDownload } from "react-icons/gr";
import { toast } from "react-toastify";
import api from "../../config/axiosInstance";
import logo from "../../assets/images/logo.png";
import top from "../../assets/images/top.png";
import bottom from "../../assets/images/bottom.png";

function Admission() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [studentPhoto, setStudentPhoto] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const admissionRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.studentData) {
      setStudentData(location.state.studentData);
      setLoading(false);
    } 
    else if (id) {
      fetchStudentById(id);
    }
    else {
      toast.error("No student data found. Please register first.");
      setTimeout(() => {
        navigate("/addStudent");
      }, 2000);
      setLoading(false);
    }
  }, [location, id, navigate]);

  const fetchStudentById = async (studentId) => {
    try {
      setLoading(true);
      const response = await api.get(`/users/student/${studentId}`);
      const user = response.data;
      
      const formattedData = {
        _id: user._id,
        studentId: user.studentInfo?.studentId,
        admissionNumber: user.studentInfo?.admissionNumber,
        fullName: user.studentInfo?.personalInfo?.fullName,
        email: user.account?.email,
        phone: user.account?.phone,
        currentClass: user.studentInfo?.academicInfo?.currentClass,
        section: user.studentInfo?.academicInfo?.section,
        admissionDate: user.studentInfo?.admissionDate 
          ? new Date(user.studentInfo.admissionDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })
          : new Date().toLocaleDateString(),
        username: user.account?.username,
        password: user.account?.plainPassword,
        profileImage: user.account?.profileImage?.url,
        status: user.account?.status,
        fatherName: user.studentInfo?.parentInfo?.father?.fullName,
        motherName: user.studentInfo?.parentInfo?.mother?.fullName,
        gender: user.studentInfo?.personalInfo?.gender,
        dateOfBirth: user.studentInfo?.personalInfo?.dateOfBirth,
        bloodGroup: user.studentInfo?.personalInfo?.bloodGroup,
        category: user.studentInfo?.personalInfo?.category,
        religion: user.studentInfo?.personalInfo?.religion,
        nationality: user.studentInfo?.personalInfo?.nationality
      };
      
      setStudentData(formattedData);
      
      if (user.studentInfo?.documents?.studentDocuments) {
        const studentPhotoDoc = user.studentInfo.documents.studentDocuments.find(
          doc => doc.documentType === "Student Photo"
        );
        if (studentPhotoDoc) {
          setStudentPhoto(studentPhotoDoc.fileUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching student:", error);
      toast.error(error.response?.data?.message || "Failed to load student data");
      setTimeout(() => {
        navigate("/students");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!admissionRef.current) return;
    setIsDownloading(true);

    try {
      const { default: jsPDF } = await import("jspdf");
      const html2canvas = await import("html2canvas");

      const element = admissionRef.current;

      const canvas = await html2canvas.default(element, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        windowWidth: element.scrollWidth,
      });

      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }
      
      pdf.save(`Admission-Letter-${studentData?.studentId || studentData?.fullName || "Student"}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error(error?.message || "Failed to generate PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admission letter...</p>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return null;
  }

  return (
    <div className="print-container">
      <div className="flex flex-wrap items-center gap-2 print:hidden">
        <span className="text-[#696969] text-[18px] sm:text-[20px] md:text-[24px] font-semibold">
          All Student
        </span>
        <span className="text-[#696969]">
          <IoIosArrowForward size={18} />
        </span>
        <span className="text-[#1c1c1c] text-[18px] sm:text-[20px] md:text-[24px] font-semibold">
          Admission Letter
        </span>
      </div>

      <div className="w-full">
        <div className="flex justify-around mt-8 print:mt-0">
          <div className="pt-3 bg-linear-to-r from-[#0F4057] via-[#118AB2] to-[#0077B6] w-[80%] rounded-4xl relative print:w-full print:shadow-none print:bg-none">
            <img src={bottom} alt="logo" className="absolute top-5 left-0 print:hidden" />
            <img src={top} alt="" className="absolute bottom-0 right-0 print:hidden" />

            <div className="bg-white mt-2 p-6 w-full rounded-4xl print:p-4" ref={admissionRef}>
              {/* Header */}
              <div className="flex flex-wrap justify-between p-4 border-b-2 border-dashed border-[#9C9C9C] mb-8">
                <div className="w-63 h-40 overflow-hidden">
                  <img src={logo} alt="School Logo" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-[#000000] text-[24px] font-semibold text-center">
                    <span>Kasper Infotech Private Limited</span>
                  </div>
                  <div className="text-center text-[16px] font-normal text-[#000000]">
                    <span>123, Education Avenue, Springfield, IL 62710</span>
                  </div>
                  <div className="text-center text-[16px] font-normal text-[#000000]">
                    <span>Phone:- +91 620 212 4896 | Email:- info@greenwood.edu</span>
                  </div>
                </div>
                <div className="print:hidden">
                  <button className="px-3 py-2 bg-[#B5FFD1] border border-[#5BCB85] rounded-md font-semibold text-[#009638] text-[16px]">
                    • {studentData.status || "Active"}
                  </button>
                </div>
              </div>

              {/* ID & Login Section */}
              <div className="mt-7 p-4 flex gap-12 w-full print:flex-col print:gap-4">
                {/* ID Card Preview */}
                <div
                  className="p-8 w-[25%] rounded-lg bg-linear-to-r from-[#F9FAFB] to-[#ffffff] print:w-full print:mb-4"
                  style={{ boxShadow: `0px 0px 8px 0px rgba(0, 0, 0, 0.15)` }}
                >
                  <div className="flex flex-col gap-2 items-center w-full">
                    <div
                      className="h-64 w-60 rounded-lg"
                      style={{
                        boxShadow: `2px 2px 12px rgba(255, 126, 249, 0.5), -2px -2px 12px rgba(100, 192, 233, 0.69)`,
                      }}
                    >
                      {studentPhoto || studentData.profileImage ? (
                        <img
                          src={studentPhoto || studentData.profileImage}
                          alt="Student"
                          className="h-full w-full rounded-lg object-cover border-2 border-white"
                          crossOrigin="anonymous"
                        />
                      ) : (
                        <div className="h-full w-full rounded-lg bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-center p-2">No Photo</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-center px-8 py-4 border-b border-[#E6E6E6] w-full">
                      <span className="text-[18px] text-[#000000] font-semibold">
                        {studentData.fullName || "Student Name"}
                      </span>
                      <span className="text-[16px] text-[#9C9C9C] font-semibold">
                        {studentData.studentId || "STU-XXXX"}
                      </span>
                    </div>

                    <div className="flex gap-3 border border-[#E6E6E6] px-3 py-4 w-full rounded-lg items-center">
                      <span className="text-[#155DFC] bg-[#D2E9FE] rounded-lg p-2"><FaHashtag size={30} /></span>
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-normal text-[#696969]">Admission Number</span>
                        <span className="font-semibold text-[#1C1C1C] text-[16px]">
                          {studentData.admissionNumber || "ADM-XXXX"}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 border border-[#E6E6E6] px-3 py-4 w-full rounded-lg items-center">
                      <span className="text-[#9810FA] bg-[#E6E8FF] rounded-lg p-2"><MdOutlineSchool size={30} /></span>
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-normal text-[#696969]">Class</span>
                        <span className="font-semibold text-[#1C1C1C] text-[16px]">
                          {studentData.currentClass || "Class"} {studentData.section ? `- ${studentData.section}` : ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 border border-[#E6E6E6] px-3 py-4 w-full rounded-lg items-center">
                      <span className="text-[#E60076] bg-[#FEE5EB] rounded-lg p-2"><SlCalender size={30} /></span>
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-normal text-[#696969]">Admission Date</span>
                        <span className="font-semibold text-[#1C1C1C] text-[16px]">{studentData.admissionDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Login Credentials */}
                <div className="w-[75%] print:w-full">
                  <div
                    className="p-8 rounded-lg bg-linear-to-r from-[#F9FAFB] to-[#ffffff] w-full"
                    style={{ boxShadow: `0px 0px 8px 0px rgba(0, 0, 0, 0.15)` }}
                  >
                    <div className="flex gap-3 px-3 py-4 w-full rounded-lg items-center">
                      <span className="bg-linear-to-r from-[#0F4057] to-[#118AB2] rounded-lg p-2">
                        <CiLock size={20} style={{ color: "white" }} />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[16px] font-semibold text-[#1c1c1c]">Access Credential</span>
                        <span className="font-normal text-[#696969] text-[14px]">Use these to log into your account</span>
                      </div>
                    </div>

                    {/* Username */}
                    <div className="flex gap-3 border border-[#E6E6E6] px-6 py-4 w-full rounded-lg items-center mt-3">
                      <div className="flex justify-between p-2 w-full">
                        <div className="flex gap-6">
                          <span className="bg-linear-to-r from-[#2B7FFF] to-[#00B8DB] rounded-lg p-2">
                            <FaUser size={30} style={{ color: "#FFFFFF" }} />
                          </span>
                          <div className="flex flex-col">
                            <span className="text-[16px] font-normal text-[#696969]">Username</span>
                            <span className="font-semibold text-[#1C1C1C] text-[16px]">
                              {studentData.username || studentData.email || "Not available"}
                            </span>
                          </div>
                        </div>
                        <div className="print:hidden">
                          <button onClick={() => copyToClipboard(studentData.username || studentData.email, "Username")} className="hover:opacity-70">
                            <FaRegCopy size={20} style={{ color: "#9C9C9C" }} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="flex gap-3 border border-[#E6E6E6] px-6 py-4 w-full rounded-lg items-center mt-3">
                      <div className="flex justify-between p-2 w-full">
                        <div className="flex gap-6">
                          <span className="bg-linear-to-r from-[#0F4057] to-[#11B2AA] rounded-lg p-2">
                            <BsFillKeyFill size={30} style={{ color: "#FFFFFF" }} />
                          </span>
                          <div className="flex flex-col">
                            <span className="text-[16px] font-normal text-[#696969]">Password</span>
                            <span className="font-semibold text-[#1C1C1C] text-[16px]">
                              {showPassword ? studentData.password : "••••••••••••"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 print:hidden">
                          <button onClick={() => setShowPassword(!showPassword)} className="hover:opacity-70">
                            <FiEye size={20} style={{ color: "#9C9C9C" }} />
                          </button>
                          <button onClick={() => copyToClipboard(studentData.password, "Password")} className="hover:opacity-70">
                            <FaRegCopy size={20} style={{ color: "#9C9C9C" }} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="flex gap-3 border border-[#FEE685] px-6 py-4 w-full rounded-lg items-center mt-3 bg-linear-to-r from-[#FFFBEB] to-[#FFF7ED]">
                      <span className="bg-linear-to-r from-[#C4523D] to-[#B29A11] rounded-lg p-2">
                        <BsFillShieldLockFill size={30} style={{ color: "white" }} />
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="text-[16px] font-semibold text-[#894B00]">Important Security Notice</span>
                        <span className="font-normal text-[#BB4D00] text-[14px]">
                          Please change your password immediately after your first login to keep your account secure
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-6 mt-8 print:hidden">
                    <button
                      onClick={handlePrint}
                      className="w-full flex items-center bg-[#0B3142] justify-center p-2 gap-4 rounded text-[#ffffff] text-[18px] font-semibold hover:opacity-90 transition"
                    >
                      <IoPrintOutline /> Print Letter
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isDownloading}
                      className="w-full flex items-center bg-[#e6e6e6] border-2 border-[#E6E6E6] text-[#696969] justify-center p-2 gap-4 rounded text-[18px] font-semibold hover:bg-[#d4d4d4] transition disabled:opacity-50"
                    >
                      <GrDownload />
                      {isDownloading ? "Downloading..." : "Download PDF"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .print-container { margin: 0; padding: 0; }
          .print\\:w-full { width: 100% !important; }
          .print\\:flex-col { flex-direction: column !important; }
          .print\\:gap-4 { gap: 1rem !important; }
          .print\\:mb-4 { margin-bottom: 1rem !important; }
          .print\\:p-4 { padding: 1rem !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:mt-0 { margin-top: 0 !important; }
          .print\\:bg-none { background: none !important; }
          .print\\:hidden { display: none !important; }
          body { padding: 0; margin: 0; }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </div>
  );
}

export default Admission;
// import React from "react";
// import { FaHashtag } from "react-icons/fa";
// import { IoIosArrowForward } from "react-icons/io";
// import { MdOutlineSchool } from "react-icons/md";
// import { SlCalender } from "react-icons/sl";
// import { CiLock } from "react-icons/ci";
// import { FaRegCopy } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
// import { FiEye } from "react-icons/fi";
// import { BsFillKeyFill } from "react-icons/bs";
// import { BsFillShieldLockFill } from "react-icons/bs";
// import { IoPrintOutline } from "react-icons/io5";
// import { GrDownload } from "react-icons/gr";
// import logo from "../../assets/images/logo.png";
// import baker from "../../assets/images/kathrine.jpg";
// import top from "../../assets/images/top.png";
// import bottom from "../../assets/images/bottom.png";

// function Admission() {
//   return (
//     <div>
//       <div className="flex flex-wrap items-center gap-2">
//         <span className="text-[#696969] text-[18px] sm:text-[20px] md:text-[24px] font-semibold">
//           All Student
//         </span>

//         <span className="text-[#696969]">
//           <IoIosArrowForward size={18} />
//         </span>

//         <span className="text-[#1c1c1c] text-[18px] sm:text-[20px] md:text-[24px] font-semibold">
//           Admission Letter
//         </span>
//       </div>

//       <div className="w-full">
//         <div className="flex justify-around mt-8 ">
//           <div className="pt-3 bg-linear-to-r from-[#0F4057] via-[#118AB2] to-[#0077B6] w-[80%] rounded-4xl relative">
//             <img src={bottom} alt="logo" className="absolute top-5 left-0" />
//             <img src={top} alt="" className="absolute bottom-0 right-0" />

//             <div className="bg-white mt-2 p-6 w-full rounded-4xl">
//               <div className="flex flex-wrap justify-between p-4 border-b-2 border-dashed border-[#9C9C9C] mb-8">
//                 <div className="w-63 h-40 overflow-hidden">
//                   <img src={logo} alt="" />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <div className="text-[#000000] text-[24px] font-semibold">
//                     <span>Kasper Infotech Private Limited</span>
//                   </div>
//                   <div className="flex justify-center text-[16px] font-normal text-[#000000]">
//                     <span>123, Education Avenue, springfield, IL 62710</span>
//                   </div>
//                   <div className="flex justify-center text-[16px] font-normal text-[#000000]">
//                     <span>
//                       Phone:- +91 620 212 4896 | Email:- info@greenwood.edu
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <button className="px-3 py-2 bg-[#B5FFD1] border border-[#5BCB85] rounded-md font-semibold text-[#009638] text-[16px]">
//                     • Active
//                   </button>
//                 </div>
//               </div>
//               {/* <<--------------------------------------- id & login ----------------------------------->> */}
//               <div className="mt-7 p-4 flex gap-12 w-full">
//                 {/* <<=========================== id card preview ===========================>> */}
//                 <div
//                   className="p-8 w-[25%] rounded-lg bg-linear-to-r from-[#F9FAFB] to-[#ffffff]"
//                   style={{
//                     boxShadow: `0px 0px 8px 0px rgba(0, 0, 0, 0.15)`,
//                   }}
//                 >
//                   <div className="flex flex-col gap-2 items-center w-full">
//                     <div
//                       className="h-64 w-60 rounded-lg"
//                       style={{
//                         boxShadow: `2px 2px 12px rgba(255, 126, 249, 0.5),
//                                    -2px -2px 12px rgba(100, 192, 233, 0.69)`,
//                       }}
//                     >
//                       <img
//                         src={baker}
//                         alt="baker"
//                         className="h-full w-full rounded-lg object-cover border-2 border-white"
//                       />
//                     </div>
//                     <div className="flex flex-col gap-1 justify-center items-center px-8 py-4 border-b border-[#E6E6E6] w-full">
//                       <span className="text-[18px] text-[#000000] font-semibold">
//                         Varsha Singh
//                       </span>
//                       <span className="text-[16px] text-[#9C9C9C] font-semibold">
//                         STUD-1234
//                       </span>
//                     </div>

//                     <div className="flex gap-3 border border-[#E6E6E6] px-3 py-4 w-full rounded-lg items-center">
//                       <span className="text-[#155DFC] bg-[#D2E9FE] rounded-lg p-2">
//                         <FaHashtag size={30} />
//                       </span>
//                       <div className="flex flex-col gap-1">
//                         <span className="text-[14px] font-normal text-[#696969]">
//                           Admission Number
//                         </span>
//                         <span className="font-semibold text-[#1C1C1C] text-[16px]">
//                           12345678
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex gap-3 border border-[#E6E6E6] px-3 py-4 w-full rounded-lg items-center">
//                       <span className="text-[#9810FA] bg-[#E6E8FF] rounded-lg p-2">
//                         <MdOutlineSchool size={30} />
//                       </span>
//                       <div className="flex flex-col gap-1">
//                         <span className="text-[14px] font-normal text-[#696969]">
//                           Class
//                         </span>
//                         <span className="font-semibold text-[#1C1C1C] text-[16px]">
//                           12 A
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex gap-3 border border-[#E6E6E6] px-3 py-4 w-full rounded-lg items-center">
//                       <span className="text-[#E60076] bg-[#FEE5EB] rounded-lg p-2">
//                         <SlCalender size={30} />
//                       </span>
//                       <div className="flex flex-col gap-1">
//                         <span className="text-[14px] font-normal text-[#696969]">
//                           Admission Date
//                         </span>
//                         <span className="font-semibold text-[#1C1C1C] text-[16px]">
//                           13 November, 2025
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* <<=========================== login id & password ===========================>> */}
//                 <div className="w-[75%]">
//                   <div
//                     className="p-8 rounded-lg bg-linear-to-r from-[#F9FAFB] to-[#ffffff] w-full"
//                     style={{
//                       boxShadow: `0px 0px 8px 0px rgba(0, 0, 0, 0.15)`,
//                     }}
//                   >
//                     <div className="flex gap-3 px-3 py-4 w-full rounded-lg items-center">
//                       <span className="bg-linear-to-r from-[#0F4057] to-[#118AB2] rounded-lg p-2">
//                         <CiLock size={20} style={{ color: "white" }} />
//                       </span>
//                       <div className="flex flex-col">
//                         <span className="text-[16px] font-semibold text-[#1c1c1c]">
//                           Access Credential
//                         </span>
//                         <span className="font-normal text-[#696969] text-[14px]">
//                           Use these to log into your account
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex gap-3 border border-[#E6E6E6] px-6 py-4 w-full rounded-lg items-center mt-3">
//                       <div className="flex justify-between p-2 w-full">
//                         <div className="flex gap-6">
//                           <span className="bg-linear-to-r from-[#2B7FFF] to-[#00B8DB] rounded-lg p-2">
//                             <FaUser size={30} style={{ color: "#FFFFFF" }} />
//                           </span>
//                           <div className="flex flex-col">
//                             <span className="text-[16px] font-normal text-[#696969]">
//                               User Name
//                             </span>
//                             <span className="font-semibold text-[#1C1C1C] text-[16px]">
//                               Langford@99gmail.com
//                             </span>
//                           </div>
//                         </div>
//                         <div>
//                           <span>
//                             <FaRegCopy size={20} style={{ color: "#9C9C9C" }} />
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex gap-3 border border-[#E6E6E6] px-6 py-4 w-full rounded-lg items-center mt-3">
//                       <div className="flex justify-between p-2 w-full">
//                         <div className="flex gap-6">
//                           <span className="bg-linear-to-r from-[#0F4057] to-[#11B2AA] rounded-lg p-2">
//                             <BsFillKeyFill
//                               size={30}
//                               style={{ color: "#FFFFFF" }}
//                             />
//                           </span>
//                           <div className="flex flex-col">
//                             <span className="text-[16px] font-normal text-[#696969]">
//                               User Name
//                             </span>
//                             <span className="font-semibold text-[#1C1C1C] text-[16px]">
//                               Langford@99gmail.com
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <span>
//                             <FiEye size={20} style={{ color: "#9C9C9C" }} />
//                           </span>
//                           <span>
//                             <FaRegCopy size={20} style={{ color: "#9C9C9C" }} />
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex gap-3 border border-[#FEE685] px-6 py-4 w-full rounded-lg items-center mt-3 bg-linear-to-r from-[#FFFBEB] to-[#FFF7ED]">
//                       <span className="bg-linear-to-r from-[#C4523D] to-[#B29A11] rounded-lg p-2">
//                         <BsFillShieldLockFill
//                           size={30}
//                           style={{ color: "white" }}
//                         />
//                       </span>
//                       <div className="flex flex-col gap-1">
//                         <span className="text-[16px] font-semibold text-[#894B00]">
//                           Important Security Notice
//                         </span>
//                         <span className="font-normal text-[#BB4D00] text-[14px]">
//                           Please Change your password immediately after your
//                           first login to keep your account secure
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex gap-6 mt-8">
//                     <button className="w-full flex items-center bg-[#0B3142] justify-center p-2 gap-4 rounded text-[#ffffff] text-[18px] font-semibold">
//                       <IoPrintOutline /> Print Letter
//                     </button>
//                     <button className="w-full flex items-center bg-[#e6e6e6] border-2 border-[#E6E6E6] text-[#696969] justify-center p-2 gap-4 rounded text-[18px] font-semibold relative">
//                       <GrDownload />
//                       Download Pdf
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Admission;
