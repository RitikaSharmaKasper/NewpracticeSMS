import React, { useState } from "react";

const NCNS_Sandwich = () => {
  const [enabled, setEnabled] = useState(false);
  const [enabled2, setEnabled2] = useState(false);
  const [enabled3, setEnabled3] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1C1C1C]">
          Update Attendance
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          You can update user attendance here
        </p>
      </div>

      <div className="flex items-start justify-start gap-6 mb-6 w-full">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEnabled(!enabled);
              setEnabled2(false);
              setEnabled3(false);
            }}
            className={`relative w-12 h-6 rounded-full transition-all duration-100 ${enabled ? "bg-[#155A7A]" : "bg-[#E9E9E9]"} cursor-pointer`}
          >
            <div
              className={` absolute top-1  left-1 w-4 h-4 bg-white rounded-full shadow
            transition-transform duration-300 ${enabled ? "translate-x-6" : ""}`}
            ></div>
          </button>
          <span>NCNC</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEnabled2(!enabled2);
              setEnabled(false);
              setEnabled3(false);
            }}
            className={`relative w-12 h-6 rounded-full transition-all duration-100 ${enabled2 ? "bg-[#155A7A]" : "bg-[#E9E9E9]"} cursor-pointer`}
          >
            <div
              className={` absolute top-1  left-1 w-4 h-4 bg-white rounded-full shadow
            transition-transform duration-300 ${enabled2 ? "translate-x-6" : ""}`}
            ></div>
          </button>
          <span>Sandwich</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEnabled3(!enabled3);
              setEnabled(false);
              setEnabled2(false);
            }}
            className={`relative w-12 h-6 rounded-full transition-all duration-100 ${enabled3 ? "bg-[#155A7A]" : "bg-[#E9E9E9]"} cursor-pointer`}
          >
            <div
              className={` absolute top-1  left-1 w-4 h-4 bg-white rounded-full shadow
            transition-transform duration-300 ${enabled3 ? "translate-x-6" : ""}`}
            ></div>
          </button>
          <span>Forced Absent</span>
        </div>
        <div>
          <span className="bg-[#F7F9DB] text-[#948D25] text-xs p-1 w-70">
            Only one status can be selected at a time.
          </span>
        </div>
      </div>

      {enabled ? (
        <div className="mb-4">
          <span className="bg-[#FFCBCB] text-[#B20048] rounded-sm text-xs px-2 py-1 w-70">
            NCNS selected: 2 days salary deduction.
          </span>
        </div>
      ) : (
        ""
      )}
      {enabled2 ? (
        <div className="mb-4">
          <span className="bg-[#FFCBCB] text-[#B20048] rounded-sm text-xs px-2 py-1 w-70">
            Sandwich selected: 1 day salary deduction.
          </span>
        </div>
      ) : (
        ""
      )}
      {enabled3 ? (
        <div className="mb-4">
          <span className="bg-[#FFCBCB] text-[#B20048] rounded-sm text-xs px-2 py-1 w-70">
            Forced Absent: Full day unpaid leave.
          </span>
        </div>
      ) : (
        ""
      )}

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Employee
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>Select Employee</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Year
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>Select Year</option>
          </select>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Month
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>Select Month</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Date
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>Select Date</option>
          </select>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end mt-8">
        <button className="bg-[#0E3B53] hover:bg-[#0b3145] text-white px-8 py-2 rounded-xl font-medium">
          Update NCNS/Sandwich/Force Absent
        </button>
      </div>
    </div>
  );
};

export default NCNS_Sandwich;
