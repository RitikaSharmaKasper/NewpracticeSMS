import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { Plus } from "lucide-react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { Pencil, Trash2, Eye, Award } from "lucide-react";
import PaginationAll from "../../components/PaginationAll"

{
  /* <==========------- Img -------============> */
}
import nezuko from "../../assets/images/nezuko.jpg";
import gwene from "../../assets/images/stacy.jpeg";
import megan from "../../assets/images/fox.jpg";

import langford from "../../assets/images/mother.jpg";

/* ================= CUSTOM SELECT ================= */
const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* SELECT BOX */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="border border-[#D9D9D9] rounded-lg px-3 py-2 flex justify-between items-center cursor-pointer bg-white"
      >
        <span className={value ? "text-black" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <MdOutlineArrowDropDown size={22} />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow z-50 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer rounded-md ${
                value === opt
                  ? "bg-[#92D5FF] text-[#007AFF]  border-l-4 border-[#007AFF]"
                  : "bg-white hover:bg-linear-to-r hover:from-[#F1F5F9] hover:to-[#92D5FF] hover:text-[#696969] hover:border-l-4 hover:border-[#007AFF]"
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function Settings() {
  const [academicYear, setAcademicYear] = useState("");
  const [selectClass, setSelectClass] = useState("");
  const [section, setSection] = useState("");
  const [test, setTest] = useState("");
  const [showResult, setShowResult] = useState(false);

  const resultTableData = [
    {
      rank: 1,
      studentName: "Kathrine Langford",
      studentId: "STU001",
      totalMarks: 85,
      percentage: "85%",
      grade: "A",
      status: "Pass",
      duration: "30 min",
      img: langford,
    },
    {
      rank: 2,
      studentName: "Nezuko Kamado",
      studentId: "STU004",
      totalMarks: 95,
      percentage: "95%",
      grade: "A+",
      status: "Pass",
      duration: "30 min",
      img: nezuko,
    },
    {
      rank: 3,
      studentName: "Gwene Stacy",
      studentId: "STU002",
      totalMarks: 90,
      percentage: "90%",
      grade: "A+",
      status: "Pass",
      duration: "30 min",
      img: gwene,
    },
    {
      rank: 4,
      studentName: "Megan Fox",
      studentId: "STU001",
      totalMarks: 85,
      percentage: "85%",
      grade: "A",
      status: "Pass",
      duration: "30 min",
      img: megan,
    },
  ];

  const getAwardColor = (rank) => {
    switch (rank) {
      case 1:
        return "text-[#F0B100]";
      case 2:
        return "text-[#99A1AF]";
      case 3:
        return "text-[#F54900]";
      default:
        return "";
    }
  };

  return (
    <div className="mt-6 bg-white rounded-xl shadow p-4">
      {/* select */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* CLASS */}
        <div>
          <label className="text-sm text-gray-600">Academic Year</label>
          <CustomSelect
            options={["10th", "11th", "12th"]}
            value={academicYear}
            onChange={setAcademicYear}
            placeholder="Select Academic Year"
          />
        </div>

        {/* STREAM */}
        <div>
          <label className="text-sm text-gray-600">Class</label>
          <CustomSelect
            options={["Science", "Commerce", "Arts"]}
            value={selectClass}
            onChange={setSelectClass}
            placeholder="Select Class"
          />
        </div>

        {/* SUBJECT */}
        <div>
          <label className="text-sm text-gray-600">Subject</label>
          <CustomSelect
            options={["Math", "Physics", "Chemistry"]}
            value={section}
            onChange={setSection}
            placeholder="Select Subject"
          />
        </div>

        {/* CHAPTER */}
        <div>
          <label className="text-sm text-gray-600">Chapter</label>
          <CustomSelect
            options={["Chapter 1", "Chapter 2", "Chapter 3"]}
            value={test}
            onChange={setTest}
            placeholder="Select Chapter"
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          className="flex gap-2 border items-center px-6 py-3 rounded-lg border-none bg-[#0B3142] text-white"
          onClick={() => setShowResult(true)}
        >
          <span>
            <IoSearchOutline size={16} />
          </span>
          <span className="text-[16px] font-semibold">Search</span>
        </button>
      </div>

      {/* RESULT TABLE */}
      {showResult && (
        <div className="mt-6 overflow-x-auto">
          <div className="border border-[#E6E6E6] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FFFFFF] border-b border-[#E6E6E6] text-[14px] font-semibold text-[#1C1C1C]">
                  <th className="px-4 py-2 text-left">Rank</th>
                  <th className="px-4 py-2 text-left">Student Name</th>
                  <th className="px-4 py-2 text-left">Total Marks</th>
                  <th className="px-4 py-2 text-left">Percentage</th>
                  <th className="px-4 py-2 text-left">Grade</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              {resultTableData.map((student) => (
                <tbody>
                  <tr className="hover:bg-[#F9FAFC] items-center border-b border-[#E6E6E6]">
                    <td className="px-4 py-2 flex items-center gap-1">
                      {student.rank <= 3 ? (
                        <Award
                          size={20}
                          className={getAwardColor(student.rank)}
                        />
                      ) : (
                        <span>#</span>
                      )}
                      {student.rank}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={student.img}
                            alt={student.studentName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#12516E] font-semibold text-[14px]">
                            {student.studentName}
                          </span>
                          <span className="text-[14px] text-[#9C9C9C] font-regular">
                            {student.studentId}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-[14px] text-[#1C1C1C] font-regular">
                      {student.totalMarks}
                    </td>
                    <td className="px-4 py-2 text-[14px] text-[#1C1C1C] font-regular">
                      {student.percentage}
                    </td>
                    <td className="px-4 py-2 text-[14px] font-regular">
                      <div className="flex items-center px-3 py-1 rounded-md text-white bg-red-500 w-full justify-center">
                        {student.grade}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-[14px] font-Semibold">
                      <div className="flex items-center px-3 py-1 rounded-md text-[#009638] bg-[#D4EDDA] w-full justify-center">
                        {student.status}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-[14px] font-regular text-[#1C1C1C]">
                      {student.duration}
                    </td>
                    <td className="px-4 py-2">
                      <Link to={"/test-question"}>
                      <Eye
                        size={18}
                        className="text-[#007AFF] cursor-pointer"
                      />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <PaginationAll />
        </div>
      )}
    </div>
  );
}

export default Settings;
