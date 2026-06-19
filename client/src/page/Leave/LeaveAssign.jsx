import React from "react";

const LeaveAssign = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1C1C1C]">
         Assign Leave Form
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Assign leave to one or multiple employees
        </p>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Role
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>Select class</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Staff
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>Select Section</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Sick Leave
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>0</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Paid Leave
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>0</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Casual Leave
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>0</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Paternity Leave
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>0</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Maternity Leave
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>0</option>
          </select>
        </div>
      </div>

      

      {/* Button */}
      <div className="flex justify-start mt-8">
        <button className="bg-[#0B3142] hover:bg-[#0b3145] text-white px-4 py-2 rounded-lg font-medium cursor-pointer">
         Submit
        </button>
      </div>
    </div>
  );
};

export default LeaveAssign;
