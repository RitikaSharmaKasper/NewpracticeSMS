import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const CreateRoomType = ({onClose}) => {
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [editRoomType, setEditRoomType] = useState(false)

  return (
    <div
      style={{
        fontFamily: "Segoe Ui",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
      }}
    >
      {/* Back */}
      <div
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          //   marginBottom: "20px",
          color: "#696969",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        <MdKeyboardArrowLeft /> Back
      </div>
      <div
        style={{
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
          borderRadius: "16px",
          padding: "16px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
          Create Room Type
        </label>

        {/* Type Name */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label
            htmlFor=""
            style={{
              color: "#1C1C1C",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Type Name
          </label>
          <input
            type="name"
            name=""
            id=""
            placeholder="e.g., classroom, lab"
            style={{
              border: "1px solid #E6E6E6",
              borderRadius: "12px",
              padding: "12px 16px",
              color: "#9C9C9C",
              fontSize: "16px",
              fontWeight: "400",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "18px" }}>
          <button
            // onClick={onClose}
            style={{
              border: "1px solid #9C9C9C",
              fontSize: "16px",
              fontWeight: "600",
              color: "#696969",
              padding: "12px 16px",
              borderRadius: "12px",
            }}
          >
            Cancel
          </button>
          <button
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#FFFFFF",
              backgroundColor: "#0B3142",
              padding: "12px 16px",
              borderRadius: "12px",
            }}
          >
            Create
          </button>
        </div>
      </div>
      <div
        style={{
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
          borderRadius: "16px",
          padding: "16px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
          Create Room Type
        </label>

        <div
          style={{
            border: "1px solid #EEEEEE",
            borderRadius: "8px",
            width: "100%",
          }}
        >
          <table style={{ width: "100%" }}>
            <thead style={{ borderBottom: "1px solid #EEEEEE" }}>
              <tr style={{ display: "flex", justifyContent: "space-between" }}>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",

                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    padding: "10px 20px 10px 20px",
                    color: "#1C1C1C",

                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody style={{ borderBottom: "1px solid #EEEEEE" }}>
              <tr
                onMouseEnter={() => setHoverIndex(0)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: hoverIndex === 0 ? "#F5F7F9" : "transparent",
                  borderBottom: "1px solid #EEEEEE",
                }}
              >
                <td
                  style={{
                    padding: "10px 15px",
                    color: "#1c1c1c",

                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Class Room
                </td>
                <td
                  style={{
                    padding: "10px 20px 10px 20px",
                    color: "#1C1C1C",

                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <FaRegEdit
                     onClick={() => setEditRoomType(true)}
                    style={{ color: "#9C9C9C", fontSize: "20px" }} />{" "}
                    <RiDeleteBin5Line
                      style={{ color: "#FF4B4B", fontSize: "20px" }}
                    />
                  </span>
                </td>
              </tr>
              <tr
                onMouseEnter={() => setHoverIndex(3)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: hoverIndex === 3 ? "#F5F7F9" : "transparent",
                  borderBottom: "1px solid #EEEEEE",
                }}
              >
                <td
                  style={{
                    padding: "10px 15px",
                    color: "#1c1c1c",

                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Laboratory
                </td>
                <td
                  style={{
                    padding: "10px 20px 10px 20px",
                    color: "#1C1C1C",

                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <FaRegEdit style={{ color: "#9C9C9C", fontSize: "20px" }} />{" "}
                    <RiDeleteBin5Line
                      style={{ color: "#FF4B4B", fontSize: "20px" }}
                    />
                  </span>
                </td>
              </tr>
              <tr
                onMouseEnter={() => setHoverIndex(1)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: hoverIndex === 1 ? "#F5F7F9" : "transparent",
                }}
              >
                <td
                  style={{
                    padding: "10px 15px",
                    color: "#1c1c1c",

                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  computer Lab
                </td>
                <td
                  style={{
                    padding: "10px 20px 10px 20px",
                    color: "#1C1C1C",

                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <FaRegEdit style={{ color: "#9C9C9C", fontSize: "20px" }} />{" "}
                    <RiDeleteBin5Line
                      style={{ color: "#FF4B4B", fontSize: "20px" }}
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* edit create room type */}
      {editRoomType &&
      <div
     onClick={() => setEditRoomType(false)}
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
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
            maxWidth: "836px",
            
            overflow: "auto",
          }}
        >
          {/* Header and cross */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
              Edit Room Type
            </label>

            <RxCross2
               onClick={() => setEditRoomType(false)}
              style={{
                cursor: "pointer",
                color: "#1F1F1F",
                fontSize: "16px",
                fontWeight: "600",
              }}
            />
          </div>
            
            <form  onSubmit={(e) => e.preventDefault()} action="" style={{display:"flex", flexDirection:"column", gap:"16px"}}>
           {/* Type Name */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                htmlFor=""
                style={{
                  color: "#1C1C1C",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Type Name
              </label>
              <input
                type="name"
                name=""
                id=""
                placeholder="Class Room"
                style={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#9C9C9C",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              />
            </div>
            <div style={{display:"flex", justifyContent:"end", gap:"18px"}}>
                <button type="button"  onClick={() => setEditRoomType(false)}  style={{border:"1px solid #9C9C9C", fontSize:"16px", fontWeight:"600", color:"#696969", padding:"12px 16px", borderRadius:"12px"}}>Cancel</button>
                <button style={{fontSize:"16px", fontWeight:"600", color:"#FFFFFF", backgroundColor:"#0B3142", padding:"12px 16px", borderRadius:"12px"}}>Create Room</button>
            </div>
            </form>
        </div>
      </div>
      }

    </div>
  );
};

export default CreateRoomType;
