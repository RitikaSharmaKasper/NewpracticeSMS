import React from "react";
import Batman from "../../../assets/images/batman.jpg";
import { IoMdSearch } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FcDisapprove } from "react-icons/fc";

const MyLeaveRequest = () => {
  const leaveRequests = [
    {
      id: 1,
      name: "Rahul Kumar",
      admissionNo: "LR0001",
      class: "10-A",
      startDate: "19 Jun 2025",
      endDate: "20 Jun 2025",
      createdDate: "19 Jun 2026",
      createdTime: "01:00 PM",
      leaveType: "Medical",
      reason: "Fever and flu symptoms",
      status: "Pending",
      image: Batman,
    },
    {
      id: 2,
      name: "Aman Sharma",
      admissionNo: "LR0002",
      class: "9-B",
      startDate: "21 Jun 2025",
      endDate: "22 Jun 2025",
      createdDate: "20 Jun 2026",
      createdTime: "10:30 AM",
      leaveType: "Personal",
      reason: "Family Function",
      status: "Approved",
      image: Batman,
    },
    {
      id: 3,
      name: "Aditya Sharma",
      admissionNo: "LR0002",
      class: "9-B",
      startDate: "21 Jun 2025",
      endDate: "22 Jun 2025",
      createdDate: "20 Jun 2026",
      createdTime: "10:30 AM",
      leaveType: "Personal",
      reason: "Family Function",
      status: "Approved",
      image: Batman,
    },

    {
      id: 2,
      name: "Diwakar yadav",
      admissionNo: "LR0002",
      class: "9-B",
      startDate: "21 Jun 2025",
      endDate: "22 Jun 2025",
      createdDate: "20 Jun 2026",
      createdTime: "10:30 AM",
      leaveType: "Personal",
      reason: "Family Function",
      status: "Approved",
      image: Batman,
    },
  ];
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Leave Requests</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage student leave requests
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

          <input
            type="text"
            placeholder="Search by student name or admission number"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option>Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Student
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Class
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Leave Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Reason
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {leaveRequests.map((student) => (
              <tr
                key={student.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-medium text-gray-800 whitespace-nowrap">
                        {student.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {student.admissionNo}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">{student.class}</td>

                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <span className="text-green-600 text-[10px] font-semibold">{student.startDate}</span>
                    <span className="text-red-500 text-[10px] font-semibold">{student.endDate}</span>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <p>{student.createdDate}</p>
                  <p className="text-xs text-gray-500">{student.createdTime}</p>
                </td>

                <td className="px-4 py-4">{student.leaveType}</td>

                <td className="px-4 py-4">{student.reason}</td>

                <td className="px-4 py-4">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                    {student.status}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-green-100">
                      <FaRegCircleCheck className="text-green-600" />
                    </button>

                    <button className="p-2 rounded-lg bg-red-100">
                      <FcDisapprove />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* { Pagenation } */}

        <div className="flex items-center justify-between px-4 py-4 border-t bg-white">
  <p className="text-sm text-gray-500">
    Showing 1 to 10 of 50 entries
  </p>

  <div className="flex items-center gap-2">
    <button className="px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
      Previous
    </button>

    <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg">
      1
    </button>

    <button className="px-3 py-2 border rounded-lg hover:bg-gray-100">
      2
    </button>

    <button className="px-3 py-2 border rounded-lg hover:bg-gray-100">
      3
    </button>

    <button className="px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
      Next
    </button>
  </div>
</div>
      </div>
    </div>
  );
};

export default MyLeaveRequest;
