import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";




const data = [
  { grade: "A+", students: 5, color: "#22C55E" },
  { grade: "A", students: 13, color: "#34C38F" },
  { grade: "B", students: 15, color: "#5B5CE6" },
  { grade: "C", students: 9, color: "#163A5F" },
  { grade: "D", students: 18, color: "#F59E2E" },
  { grade: "F", students: 0, color: "#FF2D3D" },
];

const totalStudents = data.reduce(
  (sum, item) => sum + item.students,
  0
);

const GradeDistribution = () => {

  const [showUTDropdown, setShowUTDropdown] = useState(false);

const [selectedUT, setSelectedUT] = useState("UT 1");
  return (
    <div className="border rounded-2xl p-5">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-2xl">
            Grade Distribution
          </h2>
          <p className="text-gray-400">
            {totalStudents} students total
          </p>
        </div>

     <div className="relative inline-block">
  <button
    onClick={() => setShowUTDropdown(!showUTDropdown)}
    className="border rounded-lg px-3 py-1 outline-none flex items-center justify-between gap-4 min-w-[80px] bg-white"
  >
    <span>{selectedUT}</span>
    <svg
      className={`w-3 h-3 transition-transform duration-200 ${showUTDropdown ? "rotate-180" : ""}`}
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

  {showUTDropdown && (
    <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={() => {
          setSelectedUT("UT 1");
          setShowUTDropdown(false);
        }}
        className={`w-full text-left px-3 py-1.5 text-sm hover:bg-[#F5F7F7] cursor-pointer ${
          selectedUT === "UT 1" ? "bg-[#F5F7F7] font-medium" : ""
        }`}
      >
        UT 1
      </button>
      <button
        onClick={() => {
          setSelectedUT("UT 2");
          setShowUTDropdown(false);
        }}
        className={`w-full text-left px-3 py-1.5 text-sm hover:bg-[#F5F7F7] cursor-pointer ${
          selectedUT === "UT 2" ? "bg-[#F5F7F7] font-medium" : ""
        }`}
      >
        UT 2
      </button>
    </div>
  )}
</div>
      </div>

      {/* Chart + Legend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center mt-6">

        {/* Donut Chart */}
        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="students"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={6}
                cornerRadius={11}
              >
                {data.map((item, index) => (
                  <Cell
                    key={index}
                    fill={item.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

        </div>

        {/* Legend */}
        <div className="space-y-4">

          {data.map((item) => {
            const percentage = (
              (item.students / totalStudents) *
              100
            ).toFixed(0);

            return (
              <div
                key={item.grade}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">

                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <span>{item.grade}</span>
                </div>

                <span className="text-gray-500">
                  {item.students} ({percentage}%)
                </span>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
};

export default GradeDistribution;