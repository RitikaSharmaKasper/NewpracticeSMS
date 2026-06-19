import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

const data = [
  { subject: "Mathematics", marks: 82 },
  { subject: "Science", marks: 102 },
  { subject: "English", marks: 81 },
  { subject: "Hindi", marks: 102 },
  { subject: "Sanskrit", marks: 74 },
  { subject: "Social Studies", marks: 45 },
];

const SubjectWisePerformance = () => {
  return (
    <div className="border border-[#E6E6E6] rounded-xl p-4">

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="font-semibold text-xl">
            Subject-wise Performance
          </h2>

          <p className="text-sm text-[#9C9C9C]">
            Weakest: Hindi (62%)
          </p>
        </div>

        <select className="bg-[#EEF4F2] px-4 py-2 rounded-md text-sm outline-none">
          <option>UT 1</option>
          <option>UT 2</option>
          <option>Mid-Term</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            
            <defs>
              {/* Blue gradient */}
              <linearGradient
                id="blueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#0F97C6" />
                <stop offset="100%" stopColor="#84C5D9" />
              </linearGradient>

              {/* Red gradient */}
              <linearGradient
                id="redGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#FF0000" />
                <stop offset="100%" stopColor="#F4A3A3" />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="subject"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
            />

            <Bar
              dataKey="marks"
              radius={[8, 8, 0, 0]}
              barSize={140}
            >
              {data.map((item, index) => (
                <Cell
                  key={index}
                  fill={
                    item.subject === "Social Studies"
                      ? "url(#redGradient)"
                      : "url(#blueGradient)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default SubjectWisePerformance;