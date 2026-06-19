import React from "react";

const UpdateLeave = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1C1C1C]">
          Update Staff Leave
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          View and update staff leaves
        </p>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-normal text-gray-700">
            Role
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>Select class</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-normal text-gray-700">
            Staff
          </label>

          <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
            <option>Select Section</option>
          </select>
        </div>
      </div>

      {/* Row 2 */}
      <div>
        <p className="text-md mt-1 font-semibold mt-6">Total Leaves</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div>
            <label className="block mb-2 text-sm font-normal text-gray-700">
              Total Sick Leave
            </label>

            <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
              <option>0</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-normal text-gray-700">
              Total Paid Leave
            </label>

            <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
              <option>0</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-normal text-gray-700">
              Total Maternity Leave
            </label>

            <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
              <option>0</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-normal text-gray-700">
              Total Casual Leave
            </label>

            <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
              <option>0</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-normal text-gray-700">
              Total Paternity Leave
            </label>

            <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
              <option>0</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-md mt-1 font-semibold">Balance Leaves</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div>
            <label className="block mb-2 text-sm font-normal text-gray-700">
              Sick Leave
            </label>

            <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
              <option>Select class</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-normal text-gray-700">
              Paid Leave
            </label>

            <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
              <option>Select Section</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-normal text-gray-700">
              Maternity Leave
            </label>

            <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
              <option>0</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-normal text-gray-700">
              Casual Leave
            </label>

            <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
              <option>0</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-normal text-gray-700">
              Paternity Leave
            </label>

            <select className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none text-gray-500">
              <option>0</option>
            </select>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-start mt-8">
        <button className="bg-[#0B3142] hover:bg-[#0b3145] text-white px-4 py-2 rounded-lg cursor-pointer font-normal">
          Update Leave
        </button>
      </div>
    </div>
  );
};

export default UpdateLeave;
