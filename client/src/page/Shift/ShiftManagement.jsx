import React, { useState } from "react";
import { Clock3, Pencil, Trash2 } from "lucide-react";

const ShiftManagement = () => {
  const [form, setForm] = useState({
    shiftName: "",
    startTime: "",
    endTime: "",
    minHour: "",
    minMinute: "",
  });

  const shifts = [
    {
      name: "Shift 1",
      start: "8:00 AM",
      end: "4:00 PM",
      total: "9 hrs 00 min",
      min: "7 hrs 45 min",
    },
    {
      name: "Shift 2",
      start: "8:25 AM",
      end: "4:25 PM",
      total: "9 hrs 00 min",
      min: "7 hrs 45 min",
    },
    {
      name: "Shift 3",
      start: "8:15 AM",
      end: "4:15 PM",
      total: "9 hrs 00 min",
      min: "7 hrs 45 min",
    },
    {
      name: "Shift 4",
      start: "8:10 AM",
      end: "4:10 PM",
      total: "9 hrs 00 min",
      min: "7 hrs 45 min",
    },
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen ">
      {/* Create Shift */}
      <div className="bg-white rounded-xl border border-[#E6E6E6] p-5">
        <h2 className="text-lg font-semibold">Shift Management</h2>

        <p className="text-sm text-gray-400 mb-6">
          You can create and view all shifts here
        </p>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium">Shift Name</label>

            <input
              name="shiftName"
              value={form.shiftName}
              onChange={handleChange}
              placeholder="Enter Shift Name"
              className="w-full mt-2 border border-[#E6E6E6] rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium">Start Time</label>

              <div className="relative mt-2">
                <input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  className="w-full border border-[#E6E6E6] rounded-lg px-4 py-3"
                />

                {/* <Clock3
                  size={18}
                  className="absolute right-4 top-3 text-gray-400"
                /> */}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">End Time</label>

              <div className="relative mt-2">
                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  className="w-full border border-[#E6E6E6]  rounded-lg px-4 py-3"
                />

                {/* <Clock3
                  size={18}
                  className="absolute right-4 top-3 text-gray-400"
                /> */}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium">Minimum Login Hour</label>

              <input
                name="minHour"
                value={form.minHour}
                onChange={handleChange}
                placeholder="Enter minimum login hours"
                className="w-full mt-2 border border-[#E6E6E6] rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Minimum Login Minutes
              </label>

              <input
                name="minMinute"
                value={form.minMinute}
                onChange={handleChange}
                placeholder="Enter minimum login minutes"
                className="w-full mt-2 border border-[#E6E6E6] rounded-lg px-4 py-3"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-2 border border-[#9C9C9C] rounded-lg">
              Reset
            </button>

            <button className="px-5 py-1 rounded-lg bg-[#0B3142] text-white">
              Create Shift
            </button>
          </div>
        </div>
      </div>

      {/* Shift Table */}

      <div className="bg-white rounded-xl border border-[#E6E6E6] mt-5 p-5 shadow-sm">
        <h3 className="font-semibold mb-4">Shift List</h3>

        <div className="overflow-x-auto border border-[#E6E6E6] rounded-2xl p-2">
          <table className="w-full ">
            <thead>
              <tr className="border-b border-[#E6E6E6] text-sm text-[#1C1C1C] ">
                <th className="py-4 text-left">
                  <input type="checkbox" />
                </th>

                <th className="text-left font-medium">Shift Name</th>
                <th className="text-left font-medium">Start Time</th>
                <th className="text-left font-medium">End Time</th>
                <th className="text-left font-medium">Total Login</th>
                <th className="text-left font-medium">Min Login Hours</th>
                <th className="text-center font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {shifts.map((item, index) => (
                <tr key={index} className="border-b border-[#E6E6E6] text-sm">
                  <td className="py-5">
                    <input type="checkbox" />
                  </td>

                  <td>{item.name}</td>
                  <td>{item.start}</td>
                  <td>{item.end}</td>
                  <td>{item.total}</td>
                  <td>{item.min}</td>
                  <td>
                    <div className="flex justify-center gap-3">
                      <button>
                        <Pencil size={18} className="text-gray-500" />
                      </button>

                      <button>
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShiftManagement;
