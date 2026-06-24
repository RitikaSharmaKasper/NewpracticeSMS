import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

function QuestionReview() {
  const questions = [
    {
      id: 1,
      question: "What is Pythagoras Theorem?",
      type: "MCQ",
      subject: "Mathematics",
      marks: 5,
      options: ["Apple", "Banana", "Guava", "Mango"],
    },
    {
      id: 2,
      question: "What is Algebra?",
      type: "MCQ",
      subject: "Mathematics",
      marks: 10,
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
  ];

  return (
    <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[18px] font-semibold text-[#1C1C1C]">
            Mathematics Test
          </h1>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-[16px] font-semibold text-[#696969]">
              Class 10 A
            </span>
            <span className="text-[#696969]">•</span>
            <span className="text-[16px] font-semibold text-[#696969]">
              Mathematics
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-[#696969]">
            <FiEdit size={18} />
            Edit
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border border-[#DC2626] rounded-md text-[#DC2626]">
            <RiDeleteBin6Line size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* Test Details */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-6 md:gap-16 mt-9 border-b border-[#EEEEEE] pb-6">
        <div className="w-full sm:w-[30%] md:w-[20%]">
          <p className="text-[16px] text-[#696969]">Total Questions</p>
          <h3 className="text-[16px] font-semibold text-[#1C1C1C]">100</h3>
        </div>

        <div className="w-full sm:w-[30%] md:w-[20%]">
          <p className="text-[16px] text-[#696969]">Total Marks</p>
          <h3 className="text-[16px] font-semibold text-[#1C1C1C]">120</h3>
        </div>

        <div className="w-full sm:w-[30%] md:w-[20%]">
          <p className="text-[16px] text-[#696969]">Test Date</p>
          <h3 className="text-[16px] font-semibold text-[#1C1C1C]">
            Jan 5, 2025
          </h3>
        </div>

        <div className="w-full sm:w-[30%] md:w-[20%]">
          <p className="text-[16px] text-[#696969]">Start Time</p>
          <h3 className="text-[16px] font-semibold text-[#1C1C1C]">
            08:00 AM
          </h3>
        </div>

        <div className="w-full sm:w-[30%] md:w-[20%]">
          <p className="text-[16px] text-[#696969]">Duration</p>
          <h3 className="text-[16px] font-semibold text-[#1C1C1C]">
            120 min
          </h3>
        </div>
      </div>

      {/* Questions */}
      <div className="mt-10">
        <h2 className="text-[18px] font-semibold text-[#1C1C1C] mb-6">
          Questions
        </h2>

        {questions.map((item, index) => (
          <div
            key={item.id}
            className={`pt-6 ${
              index !== questions.length - 1
                ? "border-b border-[#EEEEEE] pb-6"
                : ""
            }`}
          >
            {/* Question Header */}
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#DBEAFE] text-[#1447E6] text-sm font-semibold">
                  {index + 1}
                </span>

                <p className="text-[16px] font-medium text-[#12516E]">
                  {item.question}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-[#696969]">
                <span className="bg-[#EEEEEE] rounded border py-1 px-2 text-[#696969]">
                  {item.type}
                </span>

                <span className="bg-[#BEDBFF] border py-1 px-2 text-[#1447E6]">
                  {item.subject}
                </span>

                <span className="text-[#696969]">
                  {item.marks} Marks
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="mt-4 ml-11 space-y-2 text-[16px] text-[#1C1C1C]">
              {item.options.map((option, optionIndex) => (
                <p key={optionIndex}>
                  ({String.fromCharCode(65 + optionIndex)}) {option}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionReview;