import React from "react";

const TotalStudentPerGraph = () => {
  const size = 250;
  const strokeWidth = 37;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = [
      { value: 10, color: "#12516E" },    
      { value: 20, color: "#48CAE4" },        
      { value: 15, color: "#0096C7" },
      { value: 35, color: "#FFD166" },
      { value: 100, color: "#EF476F" },
    
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

      
    </div>
  );
};

export default TotalStudentPerGraph;