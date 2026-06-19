import React, { useState } from "react";

const EventCalender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);

  const today = new Date();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // 👉 Add festival / event here
  const events = {
    "2026-04-14": { name: "Ambedkar Jayanti" },
    "2026-04-18": { name: "Birthday", img: "https://i.imgur.com/1X6ZQ6T.png" },
    "2026-04-22": { name: "Conference" },
    "2026-04-25": { name: "Festival Celebration" },
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const formatKey = (d) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(
      2,
      "0"
    )}`;

  // 🔥 UPCOMING EVENT (nearest future)
  const upcomingEventDate = Object.keys(events)
    .map((d) => new Date(d))
    .filter((d) => d >= today)
    .sort((a, b) => a - b)[0];

  const upcomingKey = upcomingEventDate
    ? `${upcomingEventDate.getFullYear()}-${String(
        upcomingEventDate.getMonth() + 1
      ).padStart(2, "0")}-${String(
        upcomingEventDate.getDate()
      ).padStart(2, "0")}`
    : null;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div
      style={{
        width: "100%",
        height:"100%",
        //  height:"280px",
        background: "#FFFFFF",
        borderRadius: "14px",
        padding: "18px",
        border:"1px solid #00000040",
        display:"flex",
        flexDirection:'column',
        justifyContent:'center'
        
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <span onClick={prevMonth} style={{ cursor: "pointer" }}>‹</span>

        <div style={{ fontWeight: 500 }}>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>

        <span onClick={nextMonth} style={{ cursor: "pointer" }}>›</span>
      </div>

      {/* DAYS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: "1px",
        }}
      >
        {days.map((d, i) => {
          const isTodayDay = i === today.getDay();

          return (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: "13px",
                fontWeight: isTodayDay ? "600" : "500",
                color: isTodayDay
                  ? "#0F3D46"
                  : d === "Sun"
                  ? "#FF4D4F"
                  : "#6B7280",
              }}
            >
              {d}
            </div>
          );
        })}
      </div>

      {/* DATES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
        }}
      >
        {calendarDays.map((date, index) => {
          if (!date) return <div key={index}></div>;

          const key = formatKey(date);
          const event = events[key];

          const isToday =
            today.getDate() === date &&
            today.getMonth() === month &&
            today.getFullYear() === year;

          const isUpcoming = key === upcomingKey;

          return (
            <div
              key={date}
              onClick={() => setSelectedDate(date)}
              onMouseEnter={() => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
              style={{
                position: "relative",
                width: "40px",
                height: "40px",
                margin: "auto",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "14px",

                // 🔥 PRIORITY ORDER
                background:
                  selectedDate === date
                    ? "#0F3D46"
                    : isToday
                    ? "#D1FAE5" // today
                    : isUpcoming
                    ? "#FFE9D6" // upcoming festival
                    : event
                    ? "#E6F4F1"
                    : "transparent",

                color:
                  selectedDate === date
                    ? "#fff"
                    : isUpcoming
                    ? "#D97706"
                    : isToday
                    ? "#065F46"
                    : event
                    ? "#0F3D46"
                    : "#111",

                border:
                  isUpcoming
                    ? "2px solid #FB923C"
                    : isToday
                    ? "1px solid #10B981"
                    : event && selectedDate !== date
                    ? "1px solid #0F3D46"
                    : "none",
              }}
            >
              <span style={{ zIndex: 2 }}>{date}</span>

              {/* EVENT IMAGE */}
              {event?.img && (
                <img
                  src={event.img}
                  alt=""
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    opacity: 0.4,
                  }}
                />
              )}

              {/* TOOLTIP */}
              {event && hoveredDate === date && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "50px",
                    background: "#111",
                    color: "#fff",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                  }}
                >
                  {event.name}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalender;