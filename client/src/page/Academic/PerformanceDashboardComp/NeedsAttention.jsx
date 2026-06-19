import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
const needsAttention = [
  {
    id: 1,
    name: "Aarav Sharma",
    studentClass: "Nursery A",
    score: "30.5%",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Aarav Sharma",
    studentClass: "Nursery A",
    score: "30.5%",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Aarav Sharma",
    studentClass: "Nursery A",
    score: "30.5%",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    name: "Aarav Sharma",
    studentClass: "Class 4 B",
    score: "30.5%",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 5,
    name: "Aarav Sharma",
    studentClass: "Class 9 D",
    score: "30.5%",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const NeedsAttention = () => {
  const [showExamTypeDropdown, setShowExamTypeDropdown] = useState(false);
const [selectedExamType, setSelectedExamType] = useState("UT 1");
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-xl">Needs Attention</h2>
          <span className="text-sm text-[#9C9C9C]">
            Students with below 35%
          </span>
        </div>
        <div>
  <div className="relative inline-block">
    <button
      onClick={() => setShowExamTypeDropdown(!showExamTypeDropdown)}
      className="bg-[#EEF4F2] px-4 py-2 rounded-md text-sm outline-none flex items-center justify-between gap-4 min-w-[120px]"
    >
      <span>{selectedExamType}</span>
      <svg
        className={`w-4 h-4 transition-transform duration-200 ${showExamTypeDropdown ? "" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    {showExamTypeDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-md shadow-lg overflow-hidden">
        <button
          onClick={() => {
            setSelectedExamType("UT 1");
            setShowExamTypeDropdown(false);
          }}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F7F7] cursor-pointer ${
            selectedExamType === "UT 1" ? "bg-[#F5F7F7] font-medium" : ""
          }`}
        >
          UT 1
        </button>
        <button
          onClick={() => {
            setSelectedExamType("UT 2");
            setShowExamTypeDropdown(false);
          }}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F7F7] cursor-pointer ${
            selectedExamType === "UT 2" ? "bg-[#F5F7F7] font-medium" : ""
          }`}
        >
          UT 2
        </button>
        <button
          onClick={() => {
            setSelectedExamType("Mid- Term");
            setShowExamTypeDropdown(false);
          }}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F7F7] cursor-pointer ${
            selectedExamType === "Mid- Term" ? "bg-[#F5F7F7] font-medium" : ""
          }`}
        >
          Mid- Term
        </button>
        <button
          onClick={() => {
            setSelectedExamType("UT 3");
            setShowExamTypeDropdown(false);
          }}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F7F7] cursor-pointer ${
            selectedExamType === "UT 3" ? "bg-[#F5F7F7] font-medium" : ""
          }`}
        >
          UT 3
        </button>
        <button
          onClick={() => {
            setSelectedExamType("UT 4");
            setShowExamTypeDropdown(false);
          }}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F7F7] cursor-pointer ${
            selectedExamType === "UT 4" ? "bg-[#F5F7F7] font-medium" : ""
          }`}
        >
          UT 4
        </button>
        <button
          onClick={() => {
            setSelectedExamType("Final Term");
            setShowExamTypeDropdown(false);
          }}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F7F7] cursor-pointer ${
            selectedExamType === "Final Term" ? "bg-[#F5F7F7] font-medium" : ""
          }`}
        >
          Final Term
        </button>
      </div>
    )}
  </div>
</div>
      </div>
      {needsAttention.map((student) => (
        <div
          key={student.id}
          className="flex justify-between items-center p-4 border-b"
        >
          <div className="flex items-center gap-3">
            <img
              src={student.image}
              alt={student.name}
              className="w-10 h-10 rounded-full"
            />

            <div>
              <h3>{student.name}</h3>
              <p className="text-gray-500 text-sm">{student.studentClass}</p>
            </div>
          </div>

          <span className=" text-[#E60E12]">{student.score}</span>
        </div>
      ))}

      <div className="flex items-center justify-end gap-2 p-2">
        <button className="text-[#118AB2]">View All </button>
        <MdKeyboardArrowRight className="text-[#118AB2] w-5 h-5" />
      </div>
    </div>
  );
};

export default NeedsAttention;
