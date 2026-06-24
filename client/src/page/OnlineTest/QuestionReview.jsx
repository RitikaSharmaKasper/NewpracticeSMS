import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

function QuestionReview() {
  return (
    <div className="bg-#FFFFFF p-24px md:p-6 rounded-16px shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[18px] font-semibold text-[#1C1C1C]">
            Mathematics Test
          </h1>
          <p className="text-16px font-Segoe UI text-#696969 mt-1">
            Class 10 A • Mathematics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
            <FiEdit size={18} />
            Edit
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50">
            <RiDeleteBin6Line size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* Test Details */}
      <div className="flex flex-wrap gap-x-16 gap-y-6 mt-8">
        <div>
          <p className="text-sm text-[#696969]">Total Questions</p>

          <h3 className="text-lg font-semibold text-[#1C1C1C]">100</h3>
        </div>

        <div>
          <p className="text-sm text-[#696969]">Total Marks</p>
          <h3 className="text-lg font-semibold text-[#1C1C1C]">120</h3>
        </div>

        <div>
          <p className="text-sm text-[#696969]">Test Date</p>
          <h3 className="text-lg font-semibold text-[#1C1C1C]">Jan 5, 2025</h3>
        </div>

        <div>
          <p className="text-sm text-[#696969]">Start Time</p>
          <h3 className="text-lg font-semibold text-[#1C1C1C]">08:00 AM</h3>
        </div>

        <div>
          <p className="text-sm text-[#696969]">Duration</p>
          <h3 className="text-lg font-semibold text-[#1C1C1C]">120 min</h3>
        </div>
      </div>

      {/* Questions */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Questions</h2>

        <div className=" pt-4">
          <div className="flex flex-col md:flex-row md:justify-between gap-3">
            <p className="font-medium text-gray-900">
              1. What is Pythagoras Theorem?
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>MCQ</span>
              <span>Mathematics</span>
              <span>5 Marks</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4 pl-4 text-gray-700">
            <span>(A) Apple</span>
            <span>(B) Banana</span>
            <span>(C) Guava</span>
            <span>(D) Mango</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionReview;
