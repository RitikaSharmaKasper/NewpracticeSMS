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

function RejectedLeaves() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [applyLeave, setApplyLeave] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef(null);

  const studentData = [
    {
      student: "Anushka Sharma",
      studentId: "LR0001",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      gender: "Male",
      attendance: 0,
      discipline: 0,
      communication: 0,
      teamwork: 0,
      performance: 0,
    },
    {
      student: "Ranveer Singh",
      studentId: "LR0002",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      gender: "Male",
      attendance: 0,
      discipline: 0,
      communication: 0,
      teamwork: 0,
      performance: 0,
    },
    {
      student: "Kareena Kapoor",
      studentId: "LR0003",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      gender: "Female",
      attendance: 0,
      discipline: 0,
      communication: 0,
      teamwork: 0,
      performance: 0,
    },
    {
      student: "Shraddha Kapoor",
      studentId: "LR0004",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      gender: "Female",
      attendance: 0,
      discipline: 0,
      communication: 0,
      teamwork: 0,
      performance: 0,
    },
    {
      student: "Hrithik Roshan",
      studentId: "LR0005",
      img: "https://randomuser.me/api/portraits/men/75.jpg",
      gender: "Male",
      attendance: 0,
      discipline: 0,
      communication: 0,
      teamwork: 0,
      performance: 0,
    },
    {
      student: "Virat Kohli",
      studentId: "LR0006",
      img: "https://randomuser.me/api/portraits/men/22.jpg",
      gender: "Male",
      attendance: 0,
      discipline: 0,
      communication: 0,
      teamwork: 0,
      performance: 0,
    },
    {
      student: "Alia Bhatt",
      studentId: "LR0007",
      img: "https://randomuser.me/api/portraits/women/25.jpg",
      gender: "Female",
      attendance: 0,
      discipline: 0,
      communication: 0,
      teamwork: 0,
      performance: 0,
    },
  ];

  const statusStyle = {
    Rejected: "bg-[#F8D7DA] text-[#C92131]",
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
                Leave Register
              </span>
              <span className="text-sm text-[#696969]">
                You can see all staff leave records here
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
            <table className="w-full max-w-[12000]">
              <thead className="border-b border-[#e6e6e6]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Staff</span>
                    </div>
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Gender</span>
                    </div>
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Sick Leave
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Maternity Leave
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Paternity Leave
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Casual Leave
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Paid Leave
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
                      {item.gender}
                    </td>

                    <td className="px-4 py-3 text-left text-sm">
                      <div className="flex items-start justify-center gap-2 border border-[#97A3D0] py-2.75 px-4 rounded-xl ">
                        <span>{item.performance}</span>
                        <span>Out of </span>
                        <span>{item.performance}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-left text-sm">
                      <div className="flex items-start justify-center gap-2 border border-[#97A3D0] py-2.75 px-4 rounded-xl ">
                        <span>{item.performance}</span>
                        <span>Out of </span>
                        <span>{item.performance}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-left text-sm">
                      <div className="flex items-start justify-center gap-2 border border-[#97A3D0] py-2.75 px-4 rounded-xl ">
                        <span>{item.performance}</span>
                        <span>Out of </span>
                        <span>{item.performance}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-left text-sm">
                      <div className="flex items-start justify-center gap-2 border border-[#97A3D0] py-2.75 px-4 rounded-xl ">
                        <span>{item.performance}</span>
                        <span>Out of </span>
                        <span>{item.performance}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-left">
                      <div className="flex items-start justify-center gap-2 border border-[#97A3D0] py-2.75 px-4 rounded-xl ">
                        <span>{item.performance}</span>
                        <span>Out of </span>
                        <span>{item.performance}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default RejectedLeaves;
