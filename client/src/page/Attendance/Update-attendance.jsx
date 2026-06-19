import React from "react";

const Updateattendance = () => {
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
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Date
          </label>

          <input
            type="date"
            className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Login Time
          </label>

          <input
            type="time"
            defaultValue="08:00"
            className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Logout Time
          </label>

          <input
            type="time"
            defaultValue="08:00"
            className="w-full h-12 border border-[#E6E6E6] rounded-xl px-4 outline-none"
          />
        </div>
      </div>

      {/* Remark */}
      <div className="mt-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Remark
        </label>

        <textarea
          rows={4}
          placeholder="Type Here..."
          className="w-full border border-[#E6E6E6] rounded-xl p-4 resize-none outline-none"
        />
      </div>

      {/* Button */}
      <div className="flex justify-end mt-8">
        <button className="bg-[#0E3B53] hover:bg-[#0b3145] text-white px-8 py-2 rounded-xl font-medium">
          Update Attendance
        </button>
      </div>
    </div>
  );
};

export default Updateattendance;
