import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { LuPlus, LuMinus } from "react-icons/lu";
import {
  PiExam,
  PiExamDuotone,
  PiMoneyWavy,
  PiMoneyWavyDuotone,
  PiStudent,
} from "react-icons/pi";
import {
  IoDesktopOutline,
  IoHomeOutline,
  IoLibraryOutline,
} from "react-icons/io5";
import {
  MdManageAccounts,
  MdOutlineAccountTree,
  MdOutlineEmojiTransportation,
  MdOutlineGroups3,
  MdOutlineHolidayVillage,
  MdOutlineInventory2,
  MdOutlinePayments,
} from "react-icons/md";
import { FaSchool } from "react-icons/fa6";
import { PiMoneyWavyThin } from "react-icons/pi";
import { RiMoneyRupeeCircleLine, RiShapesLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbCalendarEvent } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiChats } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { GrLogout } from "react-icons/gr";
import { FaRegNewspaper } from "react-icons/fa6";
import munc_logo from "../../assets/images/munc-logo.png";
import { GiBookAura } from "react-icons/gi";
import { LuNotebook } from "react-icons/lu";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { RiVideoOnLine } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiCertificateLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import api from "../../config/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { MdOutlineKey } from "react-icons/md";
import { BookSearch } from "lucide-react";
import { BsJournalCheck } from "react-icons/bs";
import { CiBank } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { canAccess, canSubAction } from "../../utils/permissions.js";

function Sidebar({ onLogoutClick }) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  console.log("SIDEBAR USER", user);
  console.log("CAN STUDENTS", canAccess(user, "Students"));
  console.log(
    "CAN ALL STUDENTS VIEW",
    canSubAction(user, "Students", "AllStudents", "view"),
  );
  console.log(
    "CAN MANAGE LOGIN VIEW",
    canSubAction(user, "Students", "ManageLogin", "view"),
  );

  console.log(
    user?.account?.role?.modulePermissions?.Students?.subPermissions
      ?.ManageLogin,
  );

  const [openStudents, setOpenStudents] = useState(false);
  const [openStaffs, setOpenStaffs] = useState(false);
  const [openAcademic, setOpenAcademic] = useState(false);
  const [openFinance, setOpenFinance] = useState(false);
  const [openFrontDesk, setOpenFrontDesk] = useState(false);

  const [openHomeWork, setOpenHomeWork] = useState(false);
  const [openOnlinetest, setOpenOnlinetest] = useState(false);
  const [openOnlineClass, setOpenOnlineClass] = useState(false);
  const [openAdmission, setOpenAdmission] = useState(false);
  // const [openResources, setOpenResources] = useState(false);
  const [openEventCalender, setOpenEventCalender] = useState(false);
  const [openManagementUnit, setOpenManagementUnit] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [openFee, setOpenFee] = useState(false);
  const [openLibrary, setOpenLibrary] = useState(false);
  const [opentransport, setOpentransport] = useState(false);
  const [openExamunation, setopenExamunation] = useState(false);
  const [openResult, setopenResult] = useState(false);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [openShift, setOpenShift] = useState(false);
  const [openLeave, setopenLeave] = useState(false);
  const [openPayroll, setOpenPayroll] = useState(false);
  // account
  const [openAccounts, setOpenAccounts] = useState(false);
  // Management Unit
  const [openManagement, setOpenManagement] = useState(false);
  // cerificate
  const [openCerifiacte, setopenCerifiacte] = useState(false);
  // setting
  const [openSetting, setopenSetting] = useState(false);
  // Teacher
  const [openTeacher, setOpenTeacher] = useState(false);
  const openSection = (section) => {
    setOpenStudents((prev) => (section === "students" ? !prev : false));
    setOpenStaffs((prev) => (section === "staffs" ? !prev : false));
    setOpenAcademic((prev) => (section === "academic" ? !prev : false));
    setOpenFinance((prev) => (section === "finance" ? !prev : false));
    setOpenFrontDesk((prev) => (section === "frontdesk" ? !prev : false));
    setOpenHomeWork((prev) => (section === "homework" ? !prev : false));
    setOpenOnlinetest((prev) => (section === "online-test" ? !prev : false));
    setOpenOnlineClass((prev) => (section === "online-class" ? !prev : false));
    setOpenAdmission((prev) => (section === "admission" ? !prev : false));
    // setOpenResources((prev) => (section === "resources" ? !prev : false));
    setOpenEventCalender((prev) => (section === "calendar" ? !prev : false));
    setOpenFee((prev) => (section === "fee" ? !prev : false));
    setOpenLibrary((prev) => (section === "library" ? !prev : false));
    setOpentransport((prev) => (section === "transport" ? !prev : false));
    setopenExamunation((prev) => (section === "examination" ? !prev : false));
    setopenResult((prev) => (section === "result" ? !prev : false));
    setOpenAttendance((prev) => (section === "attendance" ? !prev : false));
    setOpenShift((prev) => (section === "shift" ? !prev : false));
    setopenLeave((prev) => (section === "leave" ? !prev : false));
    setOpenPayroll((prev) => (section === "payroll" ? !prev : false));
    setOpenAccounts((prev) => (section === "accounts" ? !prev : false));
    setOpenManagement((prev) => (section === "management" ? !prev : false));
    setopenCerifiacte((prev) => (section === "certificate" ? !prev : false));
    setopenSetting((prev) => (section === "settings" ? !prev : false));
    setOpenTeacher((prev) => (section === "teacher" ? !prev : false));
  };

  return (
    <aside className="w-65 h-screen text-slate-900 bg-white  flex flex-col">
      {/* Logo */}
      <div className=" w-50 h-10  flex  items-center mt-5 ml-4 mb-5">
        <img src={Logo} alt="Logo" className="" />
      </div>

      <div className="border-t text-[#E6E6E6]" />

      {/* Menu */}
      <nav className="px-4 py-3 text-sm text-gray-700 mt-3  flex-1 overflow-y-auto scrollbar-hide">
        <p className="text-xs mb-3 ml-1">Overview</p>

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <IoHomeOutline />
          Dashboard
        </NavLink>

        {/* Dashboard 1 */}
        <NavLink
          to="/student"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <IoHomeOutline />
          Student-Dashboard
        </NavLink>

        {/* Dashboard 2 */}
        <NavLink
          to="/teacher"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <IoHomeOutline />
          Teacher-Dashboard
        </NavLink>

        {/* Students (Expanded) */}

        <p className="text-xs pt-3 ml-1">Administration</p>
        {/* Academic (Expanded) */}
        <button
          onClick={() => openSection("academic")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openAcademic
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <FaSchool />
            Academic
          </span>
          {openAcademic ? <LuMinus /> : <LuPlus />}
        </button>

        {openAcademic && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5    top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/academic-rooms" label="Rooms" />
            <SubMenuItem to="/class-section" label="Class" />
            <SubMenuItem to="/academic-subject" label="Subject" />
            <SubMenuItem to="/academic-timetable" label="Timetable" />
            <SubMenuItem to="/academic-performace" label="Performance" />
          </div>
        )}

        <NavLink
          to="/study-material"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <GiBookAura />
          Study Material
        </NavLink>

        {/* Front Dek(Expanded) */}
        <button
          onClick={() => openSection("frontdesk")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openFrontDesk
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <IoDesktopOutline />
            Front Desk
          </span>
          {openFrontDesk ? <LuMinus /> : <LuPlus />}
        </button>

        {openFrontDesk && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5 top-0 bottom-0 w-px bg-gray-300" />

            {/* Added "frontdesk/" to the paths */}
            <SubMenuItem
              to="/frontdesk/visitor_register"
              label="Visitor Register"
            />
            <SubMenuItem
              to="/frontdesk/admission_enquiries"
              label="Admission Enquiries"
            />
            <SubMenuItem to="/frontdesk/gate_pass" label="Gate Pass" />
          </div>
        )}

        {/* <NavLink
          to="/certificate"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <PiCertificateLight />
          Certificates
        </NavLink> */}
        {/* certificate */}
        <button
          onClick={() => openSection("certificate")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openCerifiacte
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <IoDesktopOutline />
            Certificate
          </span>
          {openCerifiacte ? <LuMinus /> : <LuPlus />}
        </button>

        {openCerifiacte && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5 top-0 bottom-0 w-px bg-gray-300" />

            {/* Added "frontdesk/" to the paths */}
            <SubMenuItem
              to="/certificate/bonafide"
              label="Bonafide Certificate"
            />
            <SubMenuItem
              to="/certificate/dob_Certificate"
              label="DOB Certificate"
            />
            <SubMenuItem
              to="/certificate/character_Certificate"
              label="Character Certificate"
            />
            <SubMenuItem
              to="/certificate/transfer_Certificate"
              label="Transfer Certificate"
            />

            <SubMenuItem
              to="/certificate/participation_Certificate"
              label="Participation Certificate"
            />
            <SubMenuItem
              to="/certificate/appreciation_Certificate"
              label="Appreciation Certificate"
            />
            <SubMenuItem
              to="/certificate/achievement_Certificate"
              label="Achievement Certificate"
            />
          </div>
        )}


        <p className="text-xs mt-3 mb-3 ml-2">Student</p>

        <button
          onClick={() => openSection("students")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base
  transition-colors duration-300
  ${
    openStudents
      ? "bg-slate-800 text-white"
      : "bg-white text-gray-600 hover:bg-gray-100"
  }`}
        >
          <span className="flex items-center gap-3 ">
            <span className="scale-x-[-1]">
              {" "}
              <PiStudent />
            </span>
            Students
          </span>
          {openStudents ? <LuMinus /> : <LuPlus />}
        </button>

        {openStudents && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5  top-0 bottom-0 w-px bg-gray-300" />

            {canSubAction(user, "Students", "AllStudents", "view") && (
              <SubMenuItem to="/students" label="All Students" />
            )}
            <SubMenuItem to="/attendance" label="Attendance" />
            <SubMenuItem to="/leave_request" label="Leave Request" />
            <SubMenuItem to="/perfromances" label="Performance" />
            <SubMenuItem to="/id-card" label="Id Card" />
            {canSubAction(user, "Students", "ManageLogin", "view") && (
              <SubMenuItem to="/manage-login" label="Manage Login" />
           )}
            <SubMenuItem to="/promote" label="Promote" />
          </div>
        )}

        {/* HomeWork (Expanded) */}
        <button
          onClick={() => openSection("homework")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openHomeWork
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <LuNotebook />
            HomeWork
          </span>
          {openHomeWork ? <LuMinus /> : <LuPlus />}
        </button>

        {openHomeWork && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5    top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/add-homework" label="Add Homework" />
            <SubMenuItem to="/homework-list" label="Homework List" />
            {/* <SubMenuItem to="/homework-report" label="Homework Report" /> */}
          </div>
        )}

        {/* Online Class (Expanded) */}
        <button
          onClick={() => openSection("online-class")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openOnlineClass
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <RiVideoOnLine />
            Online Class
          </span>
          {openOnlineClass ? <LuMinus /> : <LuPlus />}
        </button>

        {openOnlineClass && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5    top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/online-class-dashbord" label="Dashboard" />
            <SubMenuItem to="/schedule-class" label="Schedule Classes" />
            <SubMenuItem to="/past-class" label="Past Class" />
          </div>
        )}

        {/* Fee  */}
        <button
          onClick={() => openSection("fee")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openFee
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <RiMoneyRupeeCircleLine />
            Fee
          </span>
          {openFee ? <LuMinus /> : <LuPlus />}
        </button>

        {openFee && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5    top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/collectdFee" label="Collect Fee" />
            <SubMenuItem to="/fee-Receipt" label="Fee Receipt" />
            <SubMenuItem to="/pending-fee" label="Pending Fees" />
            <SubMenuItem to="/fee-particular" label="Fee Partculars" />
            <SubMenuItem to="/fee-structure" label="Fee structure" />
            <SubMenuItem to="/transport-fare" label="Transport Fare" />
            <SubMenuItem to="/fee-discount" label="Fee Discount" />
          </div>
        )}

        {/* Library  */}
        <button
          onClick={() => openSection("library")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openLibrary
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <IoLibraryOutline />
            Library
          </span>
          {openLibrary ? <LuMinus /> : <LuPlus />}
        </button>

        {openLibrary && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5    top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/book_list" label="Book List" />
            <SubMenuItem to="/issue/return_book" label="Issue/Return Book" />
            <SubMenuItem
              to="/pending_return_book"
              label="Pending Return Book"
            />
            <SubMenuItem to="/library_card" label="Library Card" />
            <SubMenuItem to="/book_fine" label="Book Fine" />
          </div>
        )}
        {/* transport  */}
        <button
          onClick={() => openSection("transport")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            opentransport
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <MdOutlineEmojiTransportation />
            Transport
          </span>
          {opentransport ? <LuMinus /> : <LuPlus />}
        </button>

        {opentransport && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5    top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/vehicle" label="Vehicle" />
            <SubMenuItem to="/routes" label="Routes" />
            <SubMenuItem to="/bus_stop" label="Bus Stop" />
            <SubMenuItem to="/assign_staff" label="Assign staff" />
            <SubMenuItem to="/assign_students" label="Assign Students" />
            <SubMenuItem to="/attendence" label="Attendance" />
            <SubMenuItem to="/live_status" label="Live Status" />
          </div>
        )}

        {/* Admission (Expanded) */}
        {/* <button
           onClick={() => openSection("admission")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
      openAdmission
        ? "bg-slate-800 text-white"     // CLICKED (expanded)
        : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
    }`}
        >
          <span className="flex items-center gap-3">
          <IoDocumentTextOutline />
            Admission
          </span>
          {openAdmission ? <LuMinus /> : <LuPlus />}
        </button>

        {openAdmission && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            
            <div className="absolute -left-0.5    top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/admission-allStudent" label="All Students"/>
            <SubMenuItem to="/admission-attendance" label="Attendance"/>
            <SubMenuItem to="/admission-leave-request" label="Leave Request"/>
            <SubMenuItem to="/admission-performance" label="Performance"/>
            <SubMenuItem to="/admission-id-card" label="Id Card"/>
            <SubMenuItem to="/admission-manage-login" label="Manage Login"/>
            <SubMenuItem to="/admission-promote" label="Promote"/>
          </div>
        )} */}
        {/* Resources (Expanded) */}
        {/* <button
          onClick={() => openSection("resources")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openResources
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <RiShapesLine />
            Resources
          </span>
          {openResources ? <LuMinus /> : <LuPlus />}
        </button>

        {openResources && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            <div className="absolute -left-0.5   top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/library" label="Library" />
            <SubMenuItem to="/transport" label="Transport" />
            <SubMenuItem to="/facility" label="Facility" />
          </div>
        )} */}

        <p className="text-xs mt-3 mb-3 ml-2">Exam</p>

        {/* Examination */}
        <button
          onClick={() => openSection("examination")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openExamunation
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <PiExam />
            Examination
          </span>
          {openExamunation ? <LuMinus /> : <LuPlus />}
        </button>

        {openExamunation && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5   top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/create_exam" label="Create Exam" />
            <SubMenuItem to="/manage_exam" label="Manage Exam" />
            <SubMenuItem to="/schedule" label="Schedule" />
            <SubMenuItem to="/date_sheet" label="Date Sheet" />
            <SubMenuItem to="/seat_plan" label="Seat Plan" />
            <SubMenuItem to="/adit_card" label="Admit Card" />
          </div>
        )}

        {/* Result */}
        <button
          onClick={() => openSection("result")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openResult
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <BookSearch className="h-4 w-4" />
            Result
          </span>
          {openResult ? <LuMinus /> : <LuPlus />}
        </button>

        {openResult && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5   top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/marks_entry" label="Marks Entry" />
            <SubMenuItem to="/view_result" label="View Result" />
            <SubMenuItem to="/report_card" label="Report Card" />
          </div>
        )}

        {/* Online Test (Expanded) */}
        <button
          onClick={() => openSection("online-test")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openOnlinetest
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <PiExamDuotone />
            Online Test
          </span>
          {openOnlinetest ? <LuMinus /> : <LuPlus />}
        </button>

        {openOnlinetest && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5    top-0 bottom-0 w-px bg-gray-300" />
            {/* 
            <SubMenuItem to="/exam-scheduled" label="Exam Scheduled" />
            <SubMenuItem to="/exam-paper" label="Exam Paper" /> */}
            <SubMenuItem to="/test-paper" label="Test Paper" />
            <SubMenuItem to="/result" label="Result" />
          </div>
        )}
        <p className="text-xs mt-3 mb-3 ml-2">HR</p>

        {/* Staff (Expanded) */}
        <button
          onClick={() => openSection("staffs")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openStaffs
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <MdOutlineGroups3 />
            Staffs
          </span>
          {openStaffs ? <LuMinus /> : <LuPlus />}
        </button>

        {openStaffs && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5   top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/all-staffs" label="All Staff" />
            <SubMenuItem to="/staff-attendance" label="Attendance old" />
            <SubMenuItem to="/staffLeave-request" label="Leave Request old" />
            <SubMenuItem to="/staff-id" label="Id Card" />
            <SubMenuItem to="/staff-manageLogin" label="Manage Login" />
          </div>
        )}

        {/*Attendance */}
        <button
          onClick={() => openSection("attendance")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openAttendance
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <BsJournalCheck />
            Attendance
          </span>
          {openAttendance ? <LuMinus /> : <LuPlus />}
        </button>

        {openAttendance && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5   top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/my_attendance" label="My Attendance" />
            <SubMenuItem to="/todays-attendance" label="Todays Attendance" />
            <SubMenuItem to="/view_attendance" label="View Attendance" />
            <SubMenuItem
              to="/attendance_register"
              label="Attendance Register"
            />
            <SubMenuItem to="/update-attendance" label="Update Attendance" />
            <SubMenuItem to="/NCNS_&_sandwich" label="NCNS & Sandwich" />
          </div>
        )}

        {/*   Shift */}
        <button
          onClick={() => openSection("shift")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openShift
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <PiMoneyWavy />
            Shift
          </span>
          {openShift ? <LuMinus /> : <LuPlus />}
        </button>

        {openShift && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5   top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/shift_management" label="Shift Management" />
            <SubMenuItem to="/schedule_shift" label="Schedule Shift" />
            <SubMenuItem
              to="/employee_shift_history"
              label="Employee Shift History"
            />
            <SubMenuItem
              to="/Schedule_Shift_List"
              label="Schedule Shift List"
            />
          </div>
        )}

        {/* Leave */}

        <button
          onClick={() => openSection("leave")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openLeave
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <MdOutlineHolidayVillage />
            Leave
          </span>
          {openLeave ? <LuMinus /> : <LuPlus />}
        </button>

        {openLeave && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5   top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/leave_request" label="Leave Request" />
            <SubMenuItem to="/approved-leaves" label="Approved Leaves" />
            <SubMenuItem to="/rejected_Leaves" label="Rejected Leaves" />
            <SubMenuItem to="/leave_register" label="Leave Register" />
            <SubMenuItem to="/update_leave" label="Update Leave" />
            <SubMenuItem to="/leave_assign" label="Leave Assign" />
          </div>
        )}

        <NavLink
          to="/salary"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 mt-1 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <PiMoneyWavyDuotone />
          Salary
        </NavLink>

        {/* payroll */}
        <button
          onClick={() => openSection("payroll")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openPayroll
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <MdOutlinePayments />
            Payroll
          </span>
          {openPayroll ? <LuMinus /> : <LuPlus />}
        </button>

        {openPayroll && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5   top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/payroll_dashoard" label="Payroll Dashoard" />
            <SubMenuItem to="/run_payroll" label="Run Payroll" />
            <SubMenuItem
              to="/employee_salary_slip"
              label="Employee Salary Slip"
            />
            <SubMenuItem to="/my_salary_slip" label="My Salary Slip" />
          </div>
        )}

        {/* Account */}
        <p className="text-xs mt-3 mb-3 ml-2">Account</p>

        {/*Account  */}
        <button
          onClick={() => openSection("accounts")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openAccounts
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <CiBank />
            Accounts
          </span>
          {openAccounts ? <LuMinus /> : <LuPlus />}
        </button>

        {openAccounts && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5   top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/revenue" label="Revenue" />
            <SubMenuItem to="/expenses" label="Expenses" />
            <SubMenuItem to="/account_statement" label="Account Statement" />
          </div>
        )}

        {/* Inventory */}
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 mt-1 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <MdOutlineInventory2 />
          Inventory
        </NavLink>
        <p className="text-xs mt-3 mb-3 ml-2">Communication</p>

        {/* Events & Calendar (Expanded) */}
        <button
          onClick={() => openSection("calendar")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openEventCalender
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <TbCalendarEvent />
            Events & Calendar
          </span>
          {openEventCalender ? <LuMinus /> : <LuPlus />}
        </button>

        {openEventCalender && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5   top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/calender" label="Calendar" />
            <SubMenuItem to="/events" label="Events" />
            <SubMenuItem to="/upcoming-events" label="Upcoming Events" />
          </div>
        )}

        {/* Notice */}
        <NavLink
          to="/notice"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 mt-1 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <IoNotificationsOutline />
          Notice
        </NavLink>

        {/* Messages */}
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md mt-1 text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <PiChats />
          Messages
        </NavLink>

        <p className="text-xs mt-3 mb-3 ml-2">Report</p>

        {/* Finance (Expanded) */}
        <button
          onClick={() => openSection("finance")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openFinance
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <PiMoneyWavyThin />
            old Finance remove it
          </span>
          {openFinance ? <LuMinus /> : <LuPlus />}
        </button>

        {openFinance && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5    top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/fee-management" label="Fee" />
            <SubMenuItem to="/payroll" label="Payroll" />
            <SubMenuItem to="/account-statement" label="Account" />
          </div>
        )}

        <NavLink
          to="/report"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <HiOutlineDocumentReport />
          Reports
        </NavLink>

        <p className="text-xs mt-3 mb-3 ml-2">System & Access</p>

        {/* Management Unit */}
        <button
          onClick={() => openSection("management")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openManagement
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <MdManageAccounts />
            Management Unit
          </span>
          {openManagement ? <LuMinus /> : <LuPlus />}
        </button>

        {openManagement && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5    top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/management_unit/user&role" label="User & Role" />
            <SubMenuItem
              to="/management_unit/designation"
              label="Designation"
            />
            <SubMenuItem to="/management_unit/department" label="Department" />
          </div>
        )}

        {/* setting */}
        <button
          onClick={() => openSection("settings")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base  transition-colors duration-300 ${
            openSetting
              ? "bg-slate-800 text-white" // CLICKED (expanded)
              : "bg-white text-gray-600 hover:bg-gray-100" // DEFAULT + HOVER
          }`}
        >
          <span className="flex items-center gap-3">
            <IoSettingsOutline />
            Settings
          </span>
          {openSetting ? <LuMinus /> : <LuPlus />}
        </button>

        {openSetting && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            {/* Vertical line */}
            <div className="absolute -left-0.5    top-0 bottom-0 w-px bg-gray-300" />

            <SubMenuItem to="/settings/user&role" label="School Setting" />
            <SubMenuItem to="/settings/bank_account" label="Bank Account" />
            <SubMenuItem
              to="/settings/student_setting"
              label="Student Settings"
            />
            <SubMenuItem to="/settings/exam_settings" label="Exam Settings" />
            <SubMenuItem to="/settings/staff_settings" label="Staff Settings" />
            <SubMenuItem to="/settings/fee_settings" label="Fee Settings" />
            <SubMenuItem
              to="/settings/sms&mail_settings"
              label="SMS & Mail Settings"
            />
            <SubMenuItem to="/settings/academic_year" label="Academic Year" />
            <SubMenuItem to="/settings/audit_logs" label="Audit logs" />
            <SubMenuItem
              to="/settings/digital_signature"
              label="Digital Signature"
            />
          </div>
        )}

        {/* Settings */}
        {/* <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 mt-1 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <IoSettingsOutline />
          Settings
        </NavLink> */}

        {/* Reports & Analytics */}
        <NavLink
          to="/Subscription"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <FaRegNewspaper />
          Subscription
        </NavLink>

        {/* Users role */}
        {/* <NavLink
          to="/roles"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          <FaUser />
          User Role
        </NavLink> */}

        <p className="text-xs mt-3 mb-3 ml-2">Support</p>
        {/* option1 */}
        <NavLink
          to="/option1"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          {/* <FaUser /> */}
          Option 2
        </NavLink>
        {/* option1 */}
        <NavLink
          to="/option2"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          {/* <FaUser /> */}
          Option 2
        </NavLink>
        {/* option3 */}
        <NavLink
          to="/option3"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-base
             ${isActive ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`
          }
        >
          {/* <FaUser /> */}
          Option 3
        </NavLink>

        {/* Logout */}
        {/* <button
          onClick={onLogoutClick}
          className="flex items-center gap-3 px-3 py-2 rounded-md mt-1 text-base text-gray-600 hover:bg-gray-100 w-full"
        >
          <GrLogout />
          Logout
        </button> */}


        {/* ==================== TEACHER SECTION (AT THE END) ==================== */}

        <p className="text-xs mt-3 mb-3 ml-2">Teacher</p>

        <button
          onClick={() => openSection("teacher")}
          className={`w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md text-base transition-colors duration-300 ${
            openTeacher
              ? "bg-slate-800 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          <span className="flex items-center gap-3">
            <FaChalkboardTeacher />
            Teacher Section
          </span>
          {openTeacher ? <LuMinus /> : <LuPlus />}
        </button>

        {openTeacher && (
          <div className="relative ml-7 mt-3 pl-4 text-base">
            <div className="absolute -left-0.5 top-0 bottom-0 w-px bg-gray-300" />

            {/* Teacher Homework - Header only, not clickable */}
            <div className="relative">
              <div className="flex items-center py-2 text-[14px]">
                <LuNotebook className="mr-2 text-[16px] text-slate-800" />
                <span className="font-medium text-slate-800">Homework</span>
              </div>
              <div className="relative ml-7 mt-1 pl-4 text-base">
                <div className="absolute -left-0.5 top-0 bottom-0 w-px bg-gray-300" />
                <SubMenuItem to="/teacher-homework/add" label="Add Homework" />
                <SubMenuItem
                  to="/teacher-homework-list"
                  label="Homework List"
                />
              </div>
            </div>

            {/* Teacher Online Class - Header only, not clickable */}

            {/* Teacher Attendance - Header only, not clickable */}
            <div className="relative mt-1">
              <div className="flex items-center py-2 text-[14px]">
                <BsJournalCheck className="mr-2 text-[16px] text-slate-800" />
                <span className="font-medium text-slate-800">Attendance</span>
              </div>
              <div className="relative ml-7 mt-1 pl-4 text-base">
                <div className="absolute -left-0.5 top-0 bottom-0 w-px bg-gray-300" />
                <SubMenuItem
                  to="/teacher-attendance/my"
                  label="My Attendance"
                />
                <SubMenuItem
                  to="/teacher-attendance/student"
                  label="Student Attendance"
                />
                <SubMenuItem
                  to="/teacher-attendance/view"
                  label="View Attendance"
                />
              </div>
            </div>

            <div className="relative mt-1">
              <Link
                to="/teacher-mystudents"
                className="flex items-center py-2 text-[14px] cursor-pointer hover:opacity-70 transition-opacity"
              >
                <RiVideoOnLine className="mr-2 text-[16px] text-slate-800" />
                <span className="font-medium text-slate-800">My Students</span>
              </Link>
            </div>

            {/* Events and Calendar */}
            <div className="relative">
              <div className="flex items-center py-2 text-[14px]">
                <LuNotebook className="mr-2 text-[16px] text-slate-800" />
                <span className="font-medium text-slate-800">Online Class</span>
              </div>
              <div className="relative ml-7 mt-1 pl-4 text-base">
                <div className="absolute -left-0.5 top-0 bottom-0 w-px bg-gray-300" />
                <SubMenuItem
                  to="/teacher-onlineclassdashboard"
                  label="Dashboard"
                />
                <SubMenuItem to="/teacher-scheduleclass" label="Schedule Class" />
                <SubMenuItem to="/teacher-pastclass" label="Past Class" />
              </div>
            </div>

    {/* Teacher Attendance - Header only, not clickable */}
    <div className="relative mt-1">
      <div className="flex items-center py-2 text-[14px]">
        <BsJournalCheck className="mr-2 text-[16px] text-slate-800" />
        <span className="font-medium text-slate-800">Attendance</span>
      </div>
      <div className="relative ml-7 mt-1 pl-4 text-base">
        <div className="absolute -left-0.5 top-0 bottom-0 w-px bg-gray-300" />
        <SubMenuItem to="/teacher-attendance/my" label="My Attendance" />
        <SubMenuItem to="/teacher-attendance/student" label="Student Attendance" />
     
      </div>
    </div>
            {/* Events and Calendar */}
            <div className="relative">
              <div className="flex items-center py-2 text-[14px]">
                <LuNotebook className="mr-2 text-[16px] text-slate-800" />
                <span className="font-medium text-slate-800">
                  Events and Calendar
                </span>
              </div>
              <div className="relative ml-7 mt-1 pl-4 text-base">
                <div className="absolute -left-0.5 top-0 bottom-0 w-px bg-gray-300" />
                <SubMenuItem to="/teacher-calender" label="Calendar" />
                <SubMenuItem to="/teacher-events" label="Events" />
                <SubMenuItem
                  to="/teacher-upcoming-events"
                  label="Upcoming Events"
                />
              </div>
            </div>

            {/* Teacher Leave Request - Header only, not clickable */}
              <div className="relative mt-1">
              <div className="flex items-center py-2 text-[14px]">
                <MdOutlineHolidayVillage className="mr-2 text-[16px] text-slate-800" />
                <span className="font-medium text-slate-800">
                  Leave Request
                </span>
              </div>
              <div className="relative ml-7 mt-1 pl-4 text-base">
                <div className="absolute -left-0.5 top-0 bottom-0 w-px bg-gray-300" />
                <SubMenuItem to="/teacher-studentleave" label="Student Leave Request" />
                <SubMenuItem
                  to="/teacher-myLeave-Request"
                  label="My Leave Request"
                />
             
              </div>
            </div>


  <div className="relative mt-1">
              <Link
                to="/teacher-myclass"
                className="flex items-center py-2 text-[14px] cursor-pointer hover:opacity-70 transition-opacity"
              >
                <RiVideoOnLine className="mr-2 text-[16px] text-slate-800" />
                <span className="font-medium text-slate-800">My Class</span>
              </Link>
            </div>




          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4">
        {" "}
        <img src={munc_logo} alt="logo" />
      </div>
    </aside>
  );
}

function SubMenuItem({ label, to }) {
  return (
    <NavLink
      to={to || "#"}
      className={({ isActive }) =>
        `group relative flex items-center py-2 text-[14px]
         ${
           isActive
             ? "text-slate-800 font-medium"
             : "text-gray-400 hover:text-slate-800"
         }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Dot */}
          <span
            className={`
              absolute -left-5.5 w-2 h-2 rounded-full bg-slate-700
              transition-transform
              ${isActive ? "scale-100" : "scale-0 group-hover:scale-100"}
            `}
          />

          {label}
        </>
      )}
    </NavLink>
  );
}
function SidebarItem({ icon, label }) {
  return (
    <button className="w-full flex items-center justify-between px-3 py-2 mt-2 rounded-md hover:bg-gray-100">
      <span className="flex items-center gap-3">
        {icon}
        {label}
      </span>
      <span className="text-gray-400">+</span>
    </button>
  );
}

export default Sidebar;
