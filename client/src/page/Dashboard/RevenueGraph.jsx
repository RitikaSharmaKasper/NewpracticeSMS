import React from "react";

const RevenueGraph = () => {
  const data = [
    { month: "Jan", value: 10 },
    { month: "Feb", value: 17 },
    { month: "Mar", value: 10 },
    { month: "Apr", value: 14.5 },
    { month: "May", value: 21 },
    { month: "Jun", value: 15.5 },
  ];

  // 👉 BASE SIZE (for calculation only)
  const chartWidth = 400;
  const chartHeight = 340;

  const leftSpace = 70;
  const bottomSpace = 45;
  const topSpace = 15;
  const rightSpace = 20;

  const graphHeight = chartHeight - bottomSpace - topSpace;
  const graphWidth = chartWidth - leftSpace - rightSpace;
  const maxValue = 20;

  const barWidth = 38;
  const gap = (graphWidth - data.length * barWidth) / (data.length + 1);

  const yLabels = [0, 5, 10, 15, 20];
  const radius = 12;

  return (
    <div
      style={{
        width: "100%",   // ✅ auto width
        maxWidth: "100%", // full stretch
        overflow:'auto'
        
      }}
    >
      <svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`} // ✅ scaling magic
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Y Grid + Labels */}
        {yLabels.map((label, index) => {
          const y =
            topSpace + graphHeight - (label / maxValue) * graphHeight;

          return (
            <g key={index}>
              <line
                x1={leftSpace}
                y1={y}
                x2={chartWidth - rightSpace}
                y2={y}
                stroke="#d7d7d7"
                strokeDasharray="2,2"
              />
              <text
                x={leftSpace - 18}
                y={y + 5}
                textAnchor="end"
                fontSize="14"
                fill="#2f2f2f"
              >
                {label === 0 ? "0" : `${label} Lakh`}
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line
          x1={leftSpace}
          y1={topSpace}
          x2={leftSpace}
          y2={chartHeight - bottomSpace}
          stroke="#d9d9d9"
        />

        <line
          x1={leftSpace}
          y1={chartHeight - bottomSpace}
          x2={chartWidth - rightSpace}
          y2={chartHeight - bottomSpace}
          stroke="#d9d9d9"
        />

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * graphHeight;
          const x = leftSpace + gap + index * (barWidth + gap);
          const y = topSpace + graphHeight - barHeight;

          const r = Math.min(radius, barHeight / 2, barWidth / 2);

          const path = `
            M ${x} ${y + r}
            Q ${x} ${y} ${x + r} ${y}
            L ${x + barWidth - r} ${y}
            Q ${x + barWidth} ${y} ${x + barWidth} ${y + r}
            L ${x + barWidth} ${y + barHeight}
            L ${x} ${y + barHeight}
            Z
          `;

          return (
            <g key={index}>
              <path d={path} fill="#0096C7" />
              <text
                x={x + barWidth / 2}
                y={chartHeight - 8}
                textAnchor="middle"
                fontSize="16"
                fill="#2f2f2f"
              >
                {item.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default RevenueGraph;