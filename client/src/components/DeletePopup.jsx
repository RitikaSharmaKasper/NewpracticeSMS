import React from "react";

const DeletePopup = ({ Cancel, onConfirm, title, data, nameKey = "name" }) => {
  console.log('jkjk', title);
  
  return (
    <div
      style={{
        fontFamily: "Segoe UI",
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
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "10px",
          width: "100%",
          maxWidth: "579px",
          //   height:"182px"
        }}
      >
        <h2 style={{ color: "#1C1C1C", fontSize: "16px", fontWeight: "600" }}>
         {title}
        </h2>
        <p style={{ color: "#696969", fontSize: "14px" }}>
          Are You Sure You Want to Delete{" "}
          <span style={{ fontWeight: "600" }}>
           <span>"{data?.[nameKey] || "this item"}"</span>
          </span>
        </p>
        <div style={{ display: "flex", justifyContent: "end", gap: "12px" }}>
          <button
            onClick={Cancel}
            style={{
              border: "1px solid #9C9C9C",
              borderRadius: "8px",
              padding: "12px 24px",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              borderRadius: "8px",
              padding: "12px 24px",
              color: "#FFFFFF",
              backgroundColor: "#DC2626",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
