import React from "react";
import { IoBookOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { FaRegCalendarCheck, FaMapPin } from "react-icons/fa";

const Myclass = () => {
  const classes = [
    {
      id: 1,
      className: "Class 10-A",
      subject: "Mathematics",
      students: 42,
      schedule: "Mon, Wed, Fri - Period 1",
      timing: "08:00 AM - 08:45 AM",
      room: "101",
    },
    {
      id: 2,
      className: "Class 9-B",
      subject: "Science",
      students: 38,
      schedule: "Tue, Thu - Period 2",
      timing: "09:00 AM - 09:45 AM",
      room: "102",
    },
    {
      id: 3,
      className: "Class 8-C",
      subject: "English",
      students: 40,
      schedule: "Mon, Wed - Period 3",
      timing: "10:00 AM - 10:45 AM",
      room: "103",
    },
    {
      id: 4,
      className: "Class 7-D",
      subject: "Social Studies",
      students: 35,
      schedule: "Fri - Period 4",
      timing: "11:00 AM - 11:45 AM",
      room: "104",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
        <p className="text-gray-500">Manage your assigned classes</p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-5">
        {classes.map((item) => (
          <div
            key={item.id}
            className="w-full md:w-[48%] bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          >
            {/* Top */}
            <div className="flex items-start justify-between  border-b-1 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {item.className}
                </h2>
                <p className="text-sm text-gray-500">{item.subject}</p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <IoBookOutline className="text-xl text-blue-600" />
              </div>
            </div>

            {/* Details */}
            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <PiStudent className="text-lg text-blue-600 shrink-0" />
                <span>{item.students} Students</span>
              </div>

              <div className="flex items-start gap-2">
                <FaRegCalendarCheck className="text-green-600 mt-1 shrink-0" />
                <span>{item.schedule}</span>
              </div>

              <div className="flex items-start gap-2">
                <FaRegCalendarCheck className="text-green-600 mt-1 shrink-0" />
                <span>{item.timing}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaMapPin className="text-red-600 shrink-0" />
                <span>Room No: {item.room}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-5">
              <h3 className="font-medium text-gray-800 mb-3">
                Quick Actions
              </h3>

              <div className="flex flex-wrap gap-3">
                <button className="w-full sm:w-[48%] border border-gray-500 rounded-lg p-3 text-sm hover:bg-gray-50">
                  Attendance
                </button>

                <button className="w-full sm:w-[48%] border border-gray-500 rounded-lg p-3 text-sm hover:bg-gray-50">
                  Students
                </button>

                <button className="w-full sm:w-[48%] border border-gray-500 rounded-lg p-3 text-sm hover:bg-gray-50">
                  Assignments
                </button>

                <button className="w-full sm:w-[48%] border border-gray-500 rounded-lg p-3 text-sm hover:bg-gray-50">
                  Reports
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myclass;