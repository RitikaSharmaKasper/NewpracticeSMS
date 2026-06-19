import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { PiArrowsDownUpThin } from "react-icons/pi";

/* Generate dates till 31 Dec */
const generateDecemberDates = () => {
  const dates = [];
  for (let i = 1; i <= 31; i++) {
    dates.push(`${i} Dec`);
  }
  return dates;
};

const days = generateDecemberDates();

/* Dummy staff data */
const staffData = [
  {
    name: "Anushka Sharma",
    id: "EP123456",
    avatar: "https://i.pravatar.cc/40?img=47",
    attendance: ["P", "P", "P", "P", "P", "P"],
  },
  {
    name: "Ranveer Singh",
    id: "EP123459",
    avatar: "https://i.pravatar.cc/40?img=12",
    attendance: ["P", "A", "P", "P", "P", "P"],
  },
  {
    name: "Kareena Kapoor",
    id: "EP123460",
    avatar: "https://i.pravatar.cc/40?img=32",
    attendance: ["A", "P", "L", "P", "P", "P"],
  },
  {
    name: "Shraddha Kapoor",
    id: "EP123457",
    avatar: "https://i.pravatar.cc/40?img=22",
    attendance: ["P", "P", "P", "P", "P", "L"],
  },
  {
    name: "Hrithik Roshan",
    id: "EP123462",
    avatar: "",
    attendance: ["P", "P", "P", "P", "A", "P"],
  },
];

const badgeStyle = {
  P: "bg-green-600 text-white",
  A: "bg-red-500 text-white",
  L: "bg-orange-500 text-white",
  H: "bg-teal-500 text-white",
};

/* Dummy Missing Employee Details */
const missingEmpDet = [
  {
    id: "01",
    employeeName: "Jay",
    employeeId: "KASP0001",
    missingFields: ["UAN Number"],
  },
  {
    id: "02",
    employeeName: "Veeru",
    employeeId: "KASP0002",
    missingFields: ["PAN Number", "UAN Number", "Bank Account", "Bank IFSC"],
  },
  {
    id: "03",
    employeeName: "Basanti",
    employeeId: "KASP0003",
    missingFields: ["UAN Number"],
  },
  {
    id: "04",
    employeeName: "Rahul",
    employeeId: "KASP0004",
    missingFields: ["PAN Number", "Bank Account"],
  },
  {
    id: "05",
    employeeName: "Simran",
    employeeId: "KASP0005",
    missingFields: ["UAN Number", "Bank IFSC"],
  },
  {
    id: "06",
    employeeName: "Simran",
    employeeId: "KASP0005",
    missingFields: ["UAN Number", "Bank IFSC"],
  },
  {
    id: "07",
    employeeName: "Simran",
    employeeId: "KASP0005",
    missingFields: ["UAN Number", "Bank IFSC"],
  },
];

function Staff_Attendance() {
  const [search, setSearch] = useState("");
  const [missingEmpDetails, setMissingEmpDetails] = useState(false);

  const filteredStaff = staffData.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white relative rounded-xl border shadow-sm border-[#E6E6E6] p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Attendance Summary
          </h2>
          <p className="text-sm text-gray-500">
            View all staff attendance here
          </p>
        </div>
        <div>
          <button
            onClick={() => setMissingEmpDetails(true)}
            className="px-6 py-2 bg-[#009638] text-white rounded-lg text-sm cursor-pointer"
          >
            Process Attendance
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex  items-center gap-4 mb-4">
        <div className="relative basis-[80%]  ">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff by name or staff id..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 basis-[20%] justify-end">
          <select className="px-3 py-2 bg-gray-100 rounded-md text-sm">
            <option>2025</option>
          </select>
          <select className="px-3 py-2 bg-gray-100 rounded-md text-sm">
            <option>December</option>
          </select>
        </div>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto border border-[#E6E6E6] rounded-lg">
        <table className="min-w-600 w-full text-sm">
          {/* Table Head */}
          <thead className="bg-gray-50 border-b border-[#E6E6E6]">
            <tr>
              <th className="sticky left-0 z-20 bg-gray-50 px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-1">
                  <span className="text-[#9C9C9C]">
                    <PiArrowsDownUpThin />
                  </span>
                  <span>Staff</span>
                </div>
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="px-3 py-3 text-center font-medium whitespace-nowrap"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredStaff.map((staff, i) => (
              <tr key={i} className="border-b border-[#E6E6E6] last:border-0">
                {/* Sticky Staff Column */}
                <td className="sticky left-0 z-10 bg-white px-4 py-3">
                  <div className="flex items-center gap-3">
                    {staff.avatar ? (
                      <img
                        src={staff.avatar}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
                        👤
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-[#12516E]">{staff.name}</p>
                      <p className="text-xs text-gray-500">{staff.id}</p>
                    </div>
                  </div>
                </td>

                {/* Attendance Cells */}
                {days.map((_, idx) => {
                  const status = staff.attendance[idx];
                  return (
                    <td key={idx} className="px-4 py-3 text-center">
                      {status ? (
                        <span
                          className={`inline-flex w-8.5 h-10 items-center justify-center rounded-md text-base font-semibold ${badgeStyle[status]}`}
                        >
                          {status}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-6">
        <span className="text-base">Abbreviation</span>
        <div className="grid grid-cols-1 md:grid-cols-9 gap-2 mt-2">
          <Legend
            label="Absent"
            badge="A"
            bg="bg-[#DB1F1F]"
            badgeBg="bg-[#DB1F1F]"
          />
          <Legend
            label="Present"
            badge="P"
            bg="bg-[#1ABC9C]"
            badgeBg="bg-[#1ABC9C]"
          />
          <Legend
            label="Late"
            badge="L"
            bg="bg-[#58A4D6]"
            badgeBg="bg-[#58A4D6]"
          />
          <Legend
            label="Half Day"
            badge="H"
            bg="bg-[#F39C12]"
            badgeBg="bg-[#F39C12]"
          />
          <Legend
            label="Week Off"
            badge="W"
            bg="bg-[#9B59B6]"
            badgeBg="bg-[#9B59B6]"
          />
          <Legend
            label="Paid Full"
            badge="VF"
            bg="bg-[#03C988]"
            badgeBg="bg-[#03C988]"
          />
          <Legend
            label="Paid Half"
            badge="VF"
            bg="bg-[#85A947]"
            badgeBg="bg-[#85A947]"
          />
          <Legend
            label="Unpaid Full"
            badge="VF"
            bg="bg-[#AF1740]"
            badgeBg="bg-[#AF1740]"
          />
          <Legend
            label="Unpaid Half"
            badge="UF"
            bg="bg-[#DE7C7D]"
            badgeBg="bg-[#DE7C7D]"
          />
          <Legend
            label="Holiday"
            badge="O"
            bg="bg-[#3F9DE9]"
            badgeBg="bg-[#3F9DE9]"
          />
          <Legend
            label="Sandwich"
            badge="S"
            bg="bg-[#F4D03F]"
            badgeBg="bg-[#F4D03F]"
          />
          <Legend
            label="Forced Absent"
            badge="FA"
            bg="bg-[#FF0303]"
            badgeBg="bg-[#FF0303]"
          />
          <Legend
            label="NCNS"
            badge="N"
            bg="bg-[#F20303]"
            badgeBg="bg-[#F20303]"
          />
        </div>
      </div>

      {/* notes */}

      <div className="flex flex-col items-start justify-center mt-6">
        <p className="font-semibold text-base">Notes</p>
        <span className="text-[#696969] text-sm font-normal">
          . Weekly off ( W ) is considered part of an employee's present status,
          meaning it is not deducted from their attendance.
        </span>
        <span className="text-[#696969] text-sm font-normal">
          . Being late mark ( L ) is used to identify whether employees are
          arriving on time, but it is still counted as part of their present
          status.
        </span>
      </div>

      {missingEmpDetails ? (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
          <div className="fixed inset-0 z-50 top-1/2 left-4/12  -translate-y-1/2 w-[850px] h-[470px] bg-[#FFF3CD] p-4 rounded-2xl">
            <div className="flex flex-col items-start text-[#664D03] mb-6">
              <span className="font-medium">Missing Employee Details</span>
              <span>The following employees are missing required details:</span>
            </div>
            <div className="border border-[#E6E6E6] rounded-lg max-h-[300px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-[#EEEEEE] sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Employee Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Employee ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Missing Fields
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {missingEmpDet.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#e6e6e6] hover:bg-[#EEEEEE]"
                    >
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-md">{item.id}</span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-md">
                          {item.employeeName}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-md">
                          {item.employeeId}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-md text-[#DC3575]">
                          {Array.isArray(item.missingFields)
                            ? item.missingFields.join(", ")
                            : item.missingFields}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setMissingEmpDetails(false)}
              className="px-6 py-2 bg-[#009638] text-white rounded-lg text-sm cursor-pointer mt-6"
            >
              Okay I Understand
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

/* Legend Card */
function Legend({ label, badge, bg, text, badgeBg }) {
  return (
    <div
      className={`flex flex-col justify-between items-center text-white w-full ${bg}`}
    >
      <span className={`text-sm px-4 py-2 text-center ${text} w-36`}>
        {label}
      </span>
      <span
        className={`flex items-center justify-center  px-4 py-3 w-30 border-t border-white text-sm font-medium ${badgeBg}`}
      >
        {badge}
      </span>
    </div>
  );
}

export default Staff_Attendance;
