import React from "react";

const TotalStudentGraph = () => {
  const size = 250;
  const strokeWidth = 37;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = [
      { value: 18, color: "#90E0EF" },
      { value: 38, color: "#00B4D8" },
    { value: 32, color: "#0096C7" },
  ];

  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const gap = 40; // gap between 3 segments
  const totalGap = gap * segments.length;
  const adjustedCircumference = circumference - totalGap;

  let cumulative = 0;

  return (
    <div
      style={{
        width: `${size}px`,
        // height: `${size}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((segment, index) => {
          const segmentLength =
            (segment.value / total) * adjustedCircumference;

          const dashArray = `${segmentLength} ${circumference}`;
          const dashOffset = -cumulative;

          cumulative += segmentLength + gap;

          return (
            
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          textAlign: "center",
          lineHeight: "1.2",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#696969",
          }}
        >
          Total Students
        </div>
        <div
          style={{
            fontSize: "23px",
            fontWeight: 700,
            color: "#12516E",
            marginTop: "4px",
          }}
        >
          500
        </div>
      </div>
    </div>
  );
};

export default TotalStudentGraph;