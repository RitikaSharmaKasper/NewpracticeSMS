import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import notice_board from "../../assets/images/notice-board-img.svg";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { IoIosExpand } from "react-icons/io";
import "../../CSS/AdminDashboard.css"

const data = [1, 2, 3, 4, 5, 6,];

const NoticeBoardView = () => {
  const navigate = useNavigate();
  const [readMoreCard, setReadMoredCard] = useState(null);

  return (
    <div>
      {/* Back */}
      <div
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          marginBottom: "20px",
          color: "#696969",
          fontSize: "18px",
        }}
      >
        <MdKeyboardArrowLeft /> Back
      </div>
      <div
       className="noticeboard-readmorecard-sms"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          rowGap: "20px",
          columnGap: "20px",
        }}
      >
        {/* CARD */}
        {data.map((item, index) => {
          const isExpanded = readMoreCard === index;
          return (
            <div
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "100%",
                // maxHeight: "250px",
                boxShadow: "0px 0px 8px rgba(0,0,0,0.15)",
                borderRadius: "12px",
                padding: "16px",
                background: "#fff",
                fontFamily: "Segoe UI",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Header */}
              <div
                style={{ display: "flex", gap: "12px", marginBottom: "12px" }}
              >
                <img
                  src={notice_board}
                  alt=""
                  style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                />

                <div>
                  <div style={{ fontWeight: "600", fontSize: "16px" }}>
                    Ravi Singh
                  </div>
                  <div style={{ fontSize: "12px", color: "#696969" }}>
                    Principal • Jan 25th, 2021 • 10:30AM
                  </div>
                </div>
              </div>

              {/* Title */}
              <div style={{ fontWeight: "600", fontSize: "16px" }}>
                Invitation for Republic Day Celebration 2025
              </div>

              {/* Description */}
              <div
                style={{
                  color: "#696969",
                  fontSize: "14px",
                  marginTop: "8px",
                  lineHeight: "1.6",

                  // 🔥 KEY
                  display: "-webkit-box",
                  // WebkitLineClamp: isExpanded  ? "unset" : 4,
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 4,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                Dear Students,
                <br />
                We are delighted to invite you to join us in celebrating the
                76th Republic Day The program will begin at 8:00 AM with the
                Flag Hoisting Ceremony
                <br />
                Jai Hind! 🇮🇳
                <br />
                <br />
                📅 Date: 26th January 2025 <br />
                📍 Venue: School Ground <br />⏰ Time: 8:00 AM onwards
              </div>

              {/* Toggle */}
              <div
                onClick={() => setReadMoredCard(index)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  marginTop: "10px",
                  color: "#000000",
                }}
              >
                <IoIosExpand />
                <span>Read more</span>
              </div>
            </div>
          );
        })}

        {readMoreCard !== null && (
          <div
            onClick={() => setReadMoredCard(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            {/* Modal Content */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "500px",
                maxHeight: "80vh",
                overflowY: "auto",
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                fontFamily: "Segoe UI",
              }}
            >
              {/* Header */}
              <div
                style={{ display: "flex", gap: "12px", marginBottom: "12px" }}
              >
                <img
                  src={notice_board}
                  alt=""
                  style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                />
                <div>
                  <div style={{ fontWeight: "600", fontSize: "16px" }}>
                    Ravi Singh
                  </div>
                  <div style={{ fontSize: "12px", color: "#696969" }}>
                    Principal • Jan 25th, 2021 • 10:30AM
                  </div>
                </div>
              </div>

              {/* Title */}
              <div style={{ fontWeight: "600", fontSize: "16px" }}>
                Invitation for Republic Day Celebration 2025
              </div>

              {/* Full Content */}
              <div
                style={{
                  marginTop: "10px",
                  color: "#696969",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                Dear Students,
                <br />
                We are delighted to invite you to join us in celebrating the
                76th Republic Day...
                <br />
                <br />
                Full content here (no limit)...
              </div>

              {/* Close Button */}
              <div
                onClick={() => setReadMoredCard(null)}
                style={{
                  marginTop: "15px",
                  cursor: "pointer",
                  color: "#000",
                  fontWeight: "500",
                }}
              >
                Close
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeBoardView;
