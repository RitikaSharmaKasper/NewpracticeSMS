import React, { useRef, useState } from "react";
/* <----------------------------------------------- Import gif -------------------------------------------------------> */
import task from "../../assets/images/task.gif";
import rejected from "../../assets/images/rejected.gif";
import file from "../../assets/images/file.gif";
import id from "../../assets/images/idcard.gif";

/* <----------------------------------------------- Import icons -------------------------------------------------------> */
import { IoAdd } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { PiArrowsDownUpThin } from "react-icons/pi";
import { format } from "date-fns";
import { LuCalendarDays } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { IoIosMale } from "react-icons/io";
import { IoFemaleOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FiMessageSquare } from "react-icons/fi";
import { DayPicker } from "react-day-picker";

/* <----------------------------------------------- img -------------------------------------------------------> */
import everdeen from "../../assets/images/katnis.jpg";
import goku from "../../assets/images/goku.jpg";
import langford from "../../assets/images/langford.jpg";
import homelander from "../../assets/images/homelander.jpg";
import thanos from "../../assets/images/thanos.jpg";
import Joffrey from "../../assets/images/Joffrey.jpg";
import doll from "../../assets/images/bella.jpg";
import prime from "../../assets/images/prime.jpg";
import gamora from "../../assets/images/gamora.jpg";
import meave from "../../assets/images/meave.jpg";
import baker from "../../assets/images/kathrine.jpg";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";

function ApprovedLeaves() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [applyLeave, setApplyLeave] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef(null);

  const leaveCardData = [
    {
      leaveType: "Total Request",
      data: "7",
      gif: task,
      summary: "All Leave Type",
    },
    {
      leaveType: "Pending",
      data: "3",
      gif: file,
      summary: "Awaiting Request",
    },
    {
      leaveType: "Approved",
      data: "3",
      gif: id,
      summary: "Request Approved",
    },
    {
      leaveType: "Rejected",
      data: "1",
      gif: rejected,
      summary: "Request Rejected",
    },
  ];

  const studentData = [
    {
      student: "katniss Everdeen",
      studentId: "001",
      img: everdeen,
      class: "12B",
      parent: "Peeta Mallak",
      number: 620489625,
      status: "Approved",
      appliedDate: "Oct 01, 2026",
      time: "10 : 30 am",
      startDate: "Oct 03, 2026",
      endDate: "Oct 05, 2026",
      totalDays: "2 Days",
      leaveType: "Paid Leave (Full Day)",
      reason: "Family work at home",
    },

    {
      student: "Goku",
      studentId: "002",
      img: goku,
      class: "11B",
      parent: "Bodok",
      number: 620489855,
      status: "Approved",
      appliedDate: "Oct 02, 2026",
      time: "11 : 00 am",
      startDate: "Oct 04, 2026",
      endDate: "Oct 06, 2026",
      totalDays: "2 Days",
      leaveType: "Paid Leave (Full Day)",
      reason: "Going out of station",
    },

    {
      student: "Katniss langford",
      studentId: "010",
      img: langford,
      class: "1B",
      parent: "Jensen",
      number: 620489625,
      status: "Approved",
      appliedDate: "Oct 03, 2026",
      time: "09 : 15 am",
      startDate: "Oct 04, 2026",
      endDate: "Oct 04, 2026",
      totalDays: "1 Day",
      leaveType: "Paid Leave (Full Day)",
      reason: "Urgent home work",
    },

    {
      student: "Homelander",
      img: homelander,
      studentId: "003",
      class: "10C",
      parent: "Soldier Boy",
      number: 620489625,
      status: "Approved",
      appliedDate: "Oct 04, 2026",
      time: "12 : 10 pm",
      startDate: "Oct 06, 2026",
      endDate: "Oct 08, 2026",
      totalDays: "2 Days",
      leaveType: "Paid Leave (Full Day)",
      reason: "Doctor suggested rest",
    },

    {
      student: "Thanos",
      studentId: "004",
      img: thanos,
      class: "9A",
      parent: "A'Lars",
      number: 629639625,
      status: "Approved",
      appliedDate: "Oct 01, 2026",
      time: "02 : 00 pm",
      startDate: "Oct 02, 2026",
      endDate: "Oct 03, 2026",
      totalDays: "1 Day",
      leaveType: "Paid Leave (Full Day)",
      reason: "Personal work",
    },

    {
      student: "Joffrey Baratheon",
      img: Joffrey,
      studentId: "005",
      class: "11A",
      parent: "Robert Baratheon",
      number: 620489625,
      status: "Approved",
      appliedDate: "Oct 05, 2026",
      time: "03 : 40 pm",
      startDate: "Oct 06, 2026",
      endDate: "Oct 06, 2026",
      totalDays: "1 Day",
      leaveType: "Paid Leave (Full Day)",
      reason: "Headache and fever",
    },

    {
      student: "Annembella",
      img: doll,
      studentId: "006",
      class: "11B",
      parent: "Nun",
      number: 600489625,
      status: "Approved",
      appliedDate: "Oct 06, 2026",
      time: "01 : 20 pm",
      startDate: "Oct 08, 2026",
      endDate: "Oct 10, 2026",
      totalDays: "2 Days",
      leaveType: "Paid Leave (Full Day)",
      reason: "Cold and cough",
    },

    {
      student: "optimus Prime",
      img: prime,
      studentId: "007",
      class: "7A",
      parent: "Bumble Bee",
      number: 620489625,
      status: "Approved",
      appliedDate: "Oct 02, 2026",
      time: "09 : 45 am",
      startDate: "Oct 03, 2026",
      endDate: "Oct 04, 2026",
      totalDays: "1 Day",
      leaveType: "Paid Leave (Full Day)",
      reason: "Function at home",
    },

    {
      student: "Gamora ",
      img: gamora,
      studentId: "008",
      class: "12A",
      parent: "Thanos",
      number: 620489625,
      status: "Approved",
      appliedDate: "Oct 03, 2026",
      time: "04 : 10 pm",
      startDate: "Oct 05, 2026",
      endDate: "Oct 06, 2026",
      totalDays: "1 Day",
      leaveType: "Paid Leave (Full Day)",
      reason: "Urgent family issue",
    },

    {
      student: "Meave Wiley",
      img: meave,
      studentId: "009",
      class: "12C",
      parent: "Otis Milburn",
      number: 620489625,
      appliedDate: "Oct 05, 2026",
      time: "13 : 00 pm",
      status: "Approved",
      endDate: "Oct 07, 2026",
      startDate: "Oct 07, 2026",
      totalDays: "1 Day",
      leaveType: "Paid Leave (Full Day)",
      reason: "Fever and Cold",
    },
  ];

  const statusStyle = {
    Pending: "bg-[#FFEDB4] text-[#A14700]",
    Approved:"bg-[#D4EDDA] text-[#009638]"
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const openModal = (item) => {
    setSelectedStudent(item);

    if (item.status === "Approved") {
      setModalType("approved");
    } else if (item.status === "Pending") {
      setModalType("pending");
    } else {
      setModalType(null); // rejected or others
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div>
      <div className="box-shadow bg-white rounded-md">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="flex flex-col">
              <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold">
                Approved Leaves (7)
              </span>
              <span className="text-sm text-[#696969]">
                You can see all approved leave requests here
              </span>
            </p>
          </div>
        
        </div>

        {/* <-------------------------------------- search & filter ------------------------------> */}
        <div className="mt-3 p-4 flex items-center gap-36">
          {/* SEARCH */}
          <div className="flex-1">
            <span></span>
            <input
              type="search"
              placeholder="🔎︎ Search Student by name or admission Number..."
              className="w-full bg-[#EEEEEE] rounded-lg px-4 py-2"
            />
          </div>
        </div>

        {/* <------------------------------------------ Table ---------------------------------------> */}
        <div className="p-4">
          <div className="w-full overflow-x-auto border border-[#e6e6e6] rounded-lg">
            <table className="w-full min-w-[1320px]">
              <thead className="border-b border-[#e6e6e6]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Staff</span>
                    </div>
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Leave Type </span>
                    </div>
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Duration
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Create At
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Remark
                  </th>


                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Approver
                  </th>
                </tr>
              </thead>

              <tbody>
                {studentData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#e6e6e6] hover:bg-[#FAFBFF] cursor-pointer"
                  >
                    {/* Student */}
                    <td className="px-4 py-3 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                          <img
                            src={item.img}
                            alt={item.student}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col leading-tight">
                          <span className="text-[#12516E] text-sm font-semibold whitespace-nowrap">
                            {item.student}
                          </span>
                          <span className="text-xs text-[#9c9c9c] font-semibold">
                            {item.studentId}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-left text-sm font-semibold text-[#4B4B4B]">
                      {item.leaveType}
                    </td>

                    <td className="px-4 py-3 text-left text-sm">
                      <div className="flex gap-2 whitespace-nowrap">
                        <span className="text-[#026C7C]">{item.startDate}</span>
                        <span>|</span>
                        <span className="text-[#B6174B]">{item.endDate}</span>
                      </div>
                      <span className="text-[#9C9C9C] text-xs">
                        {item.totalDays}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-left text-sm">
                      <div className="flex gap-1 whitespace-nowrap">
                        <span className="text-[#1c1c1c]">
                          {item.appliedDate}
                        </span>
                        <span className="text-[#9c9c9c]">• {item.time}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-left">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded text-xs font-semibold ${
                          statusStyle[item.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-left">
                      <textarea
                        value={item.reason}
                        className="w-[220px] resize-none border px-2 py-1 rounded text-[#696969] text-sm font-normal border-[#e6e6e6] bg-transparent outline-none"
                        rows={2}
                        readOnly
                      />
                    </td>

                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-start justify-center">
                        <span className="text-[#12516E] text-sm whitespace-nowrap">
                          Anushka Sharma
                        </span>
                        <span className="text-[#9C9C9C] text-xs">Admin</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>

        {isModalOpen && selectedStudent && modalType === "approved" && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[18px] font-semibold text-[#1C1C1C]">
                    Leave Request Details
                  </span>
                  <span className="text-[16px] font-normal text-[#9c9c9c]">
                    Request ID: LR001
                  </span>
                </div>

                <div>
                  <button
                    onClick={closeModal}
                    className=" text-[#1F1F1F] font-semibold w-6 h-6"
                  >
                    x
                  </button>
                </div>
              </div>

              {/* BODY */}
              <div className="flex justify-between p-6 bg-linear-to-r from-[#C9D6FF] to-[#EBCDCD] rounded-lg mt-6">
                <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img src={baker} alt="" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#12516E] text-[16px] font-semibold flex gap-2">
                      Kathrine Langford <IoFemaleOutline />
                    </span>
                    <span className="text-[#696969] font-normal text-[14px]">
                      Student ID: STU001
                    </span>
                    <div className="flex gap-1">
                      <span className="text-[#12516E]">•</span>
                      <span className="text-[#696969] font-normal text-[14px]">
                        Class:
                      </span>
                      <span className="text-[#1c1c1c] text-[14px] font-semibold">
                        12A
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <span className="text-[#118AB2]">•</span>
                    <span className="text-[16px] text-[#696969] font-normal">
                      {" "}
                      Leave Type
                    </span>
                  </div>
                  <span className="text-[16px] font-semibold text-[#1C1C1C]">
                    Family Event
                  </span>
                </div>
                <div className="">
                  <button className="bg-[#D4EDDA] text-[#009638] font-semibold text-[12px] px-2 py-2 rounded">
                    • Approve
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-5 gap-6">
                <div className="px-3 py-4 border border-[#71B3FF] rounded-lg w-full">
                  <div className="flex gap-2 items-center">
                    <div className="">
                      <SlCalender
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "#1F1F1F",
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] font-normal text-[#1C1C1C]">
                        Start Date
                      </span>
                      <span className="text-[16px] font-semibold text-[#0077B6]">
                        Oct 10, 2025
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-3 py-4 border border-[#71B3FF] rounded-lg w-full">
                  <div className="flex gap-2 items-center">
                    <div className="">
                      <SlCalender
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "#1F1F1F",
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] font-normal text-[#1C1C1C]">
                        End Date
                      </span>
                      <span className="text-[16px] font-semibold text-[#0077B6]">
                        Oct 16, 2025
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-4 bg-linear-to-r from-[#36D1DC] to-[#5B86E5] rounded-lg w-full">
                  <div className="flex gap-2 items-center">
                    <div className="">
                      <SlCalender
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "#ffffff",
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] font-normal text-[#ffffff]">
                        Duration
                      </span>
                      <span className="text-[16px] font-semibold text-[#ffffff]">
                        7 Days
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-[#71B3FF] p-4 rounded-lg mt-6">
                <div className="flex gap-2 items-center">
                  <span className="text-[#0077B6]">
                    <FiMessageSquare />
                  </span>
                  <span className="text-[#0077B6] text-[16px] font-semibold">
                    Reason for leave
                  </span>
                </div>
                <div className="mt-4">
                  <textarea
                    name=""
                    id=""
                    placeholder="Reason You Applied for ........"
                    className="bg-[#FAFBFF] w-full p-2 rounded-lg resize-none h-25 text-[#696969] text-normal text-[14px]"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 border border-[#71B3FF] p-4 rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] text-[#9C9C9C] font-normal">
                    Submitted on
                  </span>
                  <div>
                    <span className="text-[16px] text-[#1c1c1c] font-semibold">
                      Oct, 2025 •{" "}
                    </span>
                    <span className="text-[16px] text-[#9C9C9C] font-semibold">
                      13 : 10 PM
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border border-[#71B3FF] p-4 rounded-lg">
                <div className="flex flex-col gap-1 ">
                  <span className="text-[14px] text-[#9C9C9C] font-normal">
                    Approved By
                  </span>
                  <div className="flex gap-2 items-center">
                    <span className="text-[16px] text-[#1c1c1c] font-semibold">
                      Joginder Yadav
                    </span>
                    <span className="text-[16px] text-[#1c1c1c] font-normal bg-white px-0.5 py-2">
                      Class Teacher
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && selectedStudent && modalType === "pending" && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[18px] font-semibold text-[#1C1C1C]">
                    Leave Request Details
                  </span>
                  <span className="text-[16px] font-normal text-[#9c9c9c]">
                    Request ID: LR001
                  </span>
                </div>

                <div>
                  <button
                    onClick={closeModal}
                    className=" text-[#1F1F1F] font-semibold w-6 h-6"
                  >
                    x
                  </button>
                </div>
              </div>

              {/* BODY */}
              <div className="flex justify-between p-6 bg-linear-to-r from-[#C9D6FF] to-[#EBCDCD] rounded-lg mt-6">
                <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img src={baker} alt="" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#12516E] text-[16px] font-semibold flex gap-2">
                      Kathrine Langford <IoFemaleOutline />
                    </span>
                    <span className="text-[#696969] font-normal text-[14px]">
                      Student ID: STU001
                    </span>
                    <div className="flex gap-1">
                      <span className="text-[#12516E]">•</span>
                      <span className="text-[#696969] font-normal text-[14px]">
                        Class:
                      </span>
                      <span className="text-[#1c1c1c] text-[14px] font-semibold">
                        12A
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <span className="text-[#118AB2]">•</span>
                    <span className="text-[16px] text-[#696969] font-normal">
                      Leave Type
                    </span>
                  </div>
                  <span className="text-[16px] font-semibold text-[#1C1C1C]">
                    Family Event
                  </span>
                </div>
                <div className="">
                  <button className="bg-[#D4EDDA] text-[#009638] font-semibold text-[12px] px-2 py-2 rounded">
                    • Approve
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-5 gap-6">
                <div className="px-3 py-4 border border-[#71B3FF] rounded-lg w-full">
                  <div className="flex gap-2 items-center">
                    <div className="">
                      <SlCalender
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "#1F1F1F",
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] font-normal text-[#1C1C1C]">
                        Start Date
                      </span>
                      <span className="text-[16px] font-semibold text-[#0077B6]">
                        Oct 10, 2025
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-3 py-4 border border-[#71B3FF] rounded-lg w-full">
                  <div className="flex gap-2 items-center">
                    <div className="">
                      <SlCalender
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "#1F1F1F",
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] font-normal text-[#1C1C1C]">
                        End Date
                      </span>
                      <span className="text-[16px] font-semibold text-[#0077B6]">
                        Oct 16, 2025
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-4 bg-linear-to-r from-[#36D1DC] to-[#5B86E5] rounded-lg w-full">
                  <div className="flex gap-2 items-center">
                    <div className="">
                      <SlCalender
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "#ffffff",
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] font-normal text-[#ffffff]">
                        Duration
                      </span>
                      <span className="text-[16px] font-semibold text-[#ffffff]">
                        7 Days
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-[#71B3FF] p-4 rounded-lg mt-6">
                <div className="flex gap-2 items-center">
                  <span className="text-[#0077B6]">
                    <FiMessageSquare />
                  </span>
                  <span className="text-[#0077B6] text-[16px] font-semibold">
                    Reason for leave
                  </span>
                </div>
                <div className="mt-4">
                  <textarea
                    name=""
                    id=""
                    placeholder="Reason You Applied for ........"
                    className="bg-[#FAFBFF] w-full p-2 rounded-lg resize-none h-25 text-[#696969] text-normal text-[14px]"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 border border-[#71B3FF] p-4 rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] text-[#9C9C9C] font-normal">
                    Submitted on
                  </span>
                  <div>
                    <span className="text-[16px] text-[#1c1c1c] font-semibold">
                      Oct, 2025 •{" "}
                    </span>
                    <span className="text-[16px] text-[#9C9C9C] font-semibold">
                      {" "}
                      13 : 10 PM
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border border-[#71B3FF] p-4 rounded-lg">
                <div className="flex flex-col gap-1 ">
                  <span className="text-[14px] text-[#9C9C9C] font-normal">
                    Approved By
                  </span>
                  <div className="flex gap-2 items-center">
                    <span className="text-[16px] text-[#1c1c1c] font-semibold">
                      Joginder Yadav
                    </span>
                    <span className="text-[16px] text-[#1c1c1c] font-normal bg-white px-0.5 py-2">
                      Class Teacher
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApprovedLeaves;
