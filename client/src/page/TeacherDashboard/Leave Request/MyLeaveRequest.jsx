import React from "react";
import Batman from "../../../assets/images/batman.jpg";
import { IoMdSearch } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
      reason: "Fever",
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
      reason: "pain",
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
                    <span className="text-green-600  font-semibold">
                      {student.startDate}
                    </span>
                    <span className="text-red-500  font-semibold border-l px-2">
                      {student.endDate}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <p>{student.createdDate}</p>
                  <p className="text-xs text-gray-500">{student.createdTime}</p>
                </td>

                <td className="px-4 py-4">{student.leaveType}</td>

                <td className="px-4 py-3 text-left text-[14px] font-normal">
                  <textarea
                    value={student.reason}
                    readOnly
                    rows={2}
                    className="w-full min-w-[200px] p-2 border border-gray-300 rounded-lg resize-none focus:outline-none"
                  />
                </td>

                <td className="px-4 py-4">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                    {student.status}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 ">
                      <FaRegCircleCheck className="text-green-600" />
                    </button>

                    <button className="p-2 ">
                      <IoMdCloseCircleOutline
                        size={20}
                        className=" text-red-400"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* { Pagenation } */}

        {/* <div className="flex gap-15">
          <span className="px-3 py-1 border rounded">1</span>
          <span className="px-3 py-1 border rounded">2</span>
        </div> */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-4 bg-white border-t">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <select className="px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-md border border-gray-200 outline-none cursor-pointer">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>

            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">1-10</span> of
              100 results
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-400">
              <IoIosArrowBack />
              Previous
            </button>

            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-md bg-[#12516E] text-white text-sm">
                1
              </button>

              <button className="w-8 h-8 rounded-md text-gray-700 hover:bg-gray-100 text-sm">
                2
              </button>

              <button className="w-8 h-8 rounded-md text-gray-700 hover:bg-gray-100 text-sm">
                3
              </button>

              <button className="w-8 h-8 rounded-md text-gray-700 hover:bg-gray-100 text-sm">
                4
              </button>
            </div>

            <button className="flex items-center gap-1 text-sm text-gray-700">
              Next
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLeaveRequest;
