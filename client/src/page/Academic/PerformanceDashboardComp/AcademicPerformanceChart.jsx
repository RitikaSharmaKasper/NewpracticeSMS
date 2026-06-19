import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
const chartData = [
  { month: "Sep", attendance: 0, marks: 45 },
  { month: "Oct", attendance: 18, marks: 55 },
  { month: "Nov", attendance: 20, marks: 68 },
  { month: "Dec", attendance: 16, marks: 62 },
  { month: "Jan", attendance: 58, marks: 76 },
  { month: "Feb", attendance: 70, marks: 83 },
];

const AcademicPerformanceChart = () => {
  const [activeTab, setActiveTab] = useState("attendance");
const [showMonthDropdown, setShowMonthDropdown] = useState(false);

const [selectedMonth, setSelectedMonth] = useState("last 6 month");
  return (
    <div className="w-full bg-white border border-[#E6E6E6] rounded-2xl p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-[20px] font-semibold text-[#1C1C1C]">
            Academic Performance Trends
          </h2>
          <p className="text-[14px] text-[#9C9C9C]">
            Track average scores and attendance
          </p>
        </div>

        <div className="flex bg-[#EEF4F2] rounded-full p-1">
          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-6 py-2 rounded-full text-sm font-semibold ${
              activeTab === "attendance"
                ? "bg-white text-[#0F4057] shadow-md"
                : "text-[#9C9C9C]"
            }`}
          >
            Attendance
          </button>

          <button
            onClick={() => setActiveTab("marks")}
            className={`px-6 py-2 rounded-full text-sm font-semibold ${
              activeTab === "marks"
                ? "bg-white text-[#0F4057] shadow-md"
                : "text-[#9C9C9C]"
            }`}
          >
            Marks
          </button>
        </div>
      </div>

     <div className="relative inline-block mb-8">
  <button
    onClick={() => setShowMonthDropdown(!showMonthDropdown)}
    className="bg-[#EEF4F2] px-4 py-2 rounded-md text-sm outline-none flex items-center justify-between gap-4 min-w-[140px]"
  >
    <span>{selectedMonth}</span>
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${showMonthDropdown ? "" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
{/* htis  */}
  {showMonthDropdown && (
    <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-md shadow-lg overflow-hidden">
      <button
        onClick={() => {
          setSelectedMonth("last 6 month");
          setShowMonthDropdown(false);
        }}
        className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F7F7] cursor-pointer ${
          selectedMonth === "last 6 month" ? "bg-[#F5F7F7] font-medium" : ""
        }`}
      >
        last 6 month
      </button>
      <button
        onClick={() => {
          setSelectedMonth("last 12 month");
          setShowMonthDropdown(false);
        }}
        className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F7F7] cursor-pointer ${
          selectedMonth === "last 12 month" ? "bg-[#F5F7F7] font-medium" : ""
        }`}
      >
        last 12 month
      </button>
    </div>
  )}
</div>

      <div className="w-full h-[270px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#118AB2" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#118AB2" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey={activeTab}
              stroke="#118AB2"
              strokeWidth={4}
              fill="url(#chartColor)"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AcademicPerformanceChart;




