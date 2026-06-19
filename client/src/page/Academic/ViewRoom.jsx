import React, { useState } from "react";
import cross_icon from "../../assets/images/cross.svg";
import AddRoom from "./AddRoom";
// import { useNavigate } from "react-router-dom";

const ViewRoom = ({ onClose, data, onEdit   }) => {
   // View Fetch
    const fetchRoomById = async (id) => {
    const res = await api.get(`/api/rooms/${id}`);
    setViewRoom(res.data.data);
  };  
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
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          maxWidth: "836px",
          height: "100%",
          maxHeight: "624px",
          overflow: "auto",
        }}
      >
        {/* Header Cross-btn */}
        <div
          style={{
            background: "linear-gradient(90deg, #B993D6 0%, #8CA6DB 100%)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            padding: "24px",
          }}
        >
          <label
            htmlFor=""
            style={{
              color: "#FFFFFF",
              fontWeight: "600",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
             {data?.roomName}
            <span
              style={{
                background: "#E6F4EA",
                color: "#1E8E3E",

                padding: "2px 5px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                justifyContent: "center",
                maxWidth: "100px",
                fontSize: "14px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  background: "#1E8E3E",

                  borderRadius: "50%",
                }}
              ></span>
             {data?.status}
            </span>
          </label>
          <img onClick={onClose} src={cross_icon} alt="cross_icon" />
        </div>

        <div
          style={{
            border: "1px solid #E6E6E6",
            borderRadius: "12px",
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              columnGap: "50px",
            }}
          >
            <label
              htmlFor=""
              style={{
                color: "#1C1C1C",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Room Information
            </label>
            <label
              htmlFor=""
              style={{
                color: "#1C1C1C",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Assign Information
            </label>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              columnGap: "50px",
              fontSize: "14px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label htmlFor="" style={{ color: "#696969", fontWeight: "400" }}>
                Type
              </label>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
               {data?.roomType}
              </label>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label htmlFor="" style={{ color: "#696969", fontWeight: "400" }}>
                Assigned To
              </label>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
               Class 1-A
              </label>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              columnGap: "50px",
              fontSize: "14px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label htmlFor="" style={{ color: "#696969", fontWeight: "400" }}>
                Location
              </label>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
                <span>{data?.location}, {data?.floor}</span>
              </label>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label htmlFor="" style={{ color: "#696969", fontWeight: "400" }}>
                Class Teacher
              </label>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
                Sarah Johnson
              </label>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              fontSize: "14px",
              rowGap: "10px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label htmlFor="" style={{ color: "#696969", fontWeight: "400" }}>
                Area
              </label>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
                {data?.area}
              </label>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label htmlFor="" style={{ color: "#696969", fontWeight: "400" }}>
                Capacity
              </label>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
                {data?.capacity}
              </label>
            </div>
          </div>
        </div>

        <div
          style={{
            border: "1px solid #E6E6E6",
            borderRadius: "12px",
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <label
            htmlFor=""
            style={{
              color: "#1C1C1C",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Facilities
          </label>
         <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
  {data?.facilities?.map((item, i) => (
    <label key={i} style={{
      backgroundColor: "#007AFF26",
      color: "#007AFF",
      padding: "8px 12px",
      borderRadius: "8px",
      fontWeight: "600"
    }}>
      {item}
    </label>
  ))}
</div>
        </div>

        <div  style={{
            border: "1px solid #E6E6E6",
            borderRadius: "12px",
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
              <label
            htmlFor=""
            style={{
              color: "#1C1C1C",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Furniture
          </label>

           <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              columnGap: "50px",
              fontSize: "14px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label htmlFor="" style={{ color: "#696969", fontWeight: "400" }}>
                Desks
              </label>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
                {data?.furniture?.desks ?? 0}
              </label>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label htmlFor="" style={{ color: "#696969", fontWeight: "400" }}>
                Chair
              </label>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
                {data?.furniture?.chairs ?? 0}
              </label>
            </div>
             <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label htmlFor="" style={{ color: "#696969", fontWeight: "400" }}>
                Teacher Table
              </label>
              <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
                {data?.furniture?.teacherTable ?? 0}
              </label>
            </div>
          </div>

        </div>

         <div style={{display:"flex", justifyContent:"end", gap:"18px"}}>
                <button onClick={onClose} style={{border:"1px solid #9C9C9C", fontSize:"16px", fontWeight:"600", color:"#696969", padding:"12px 16px", borderRadius:"12px"}}>Cancel</button>
                <button 
                onClick={() => onEdit(data)}
                 style={{fontSize:"16px", fontWeight:"600", color:"#FFFFFF", backgroundColor:"#0B3142", padding:"12px 16px", borderRadius:"12px"}}>Edit Room</button>
            </div>
      </div>
    </div>
  );
};

export default ViewRoom;
