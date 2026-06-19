import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsArrowDown, BsArrowDownUp, BsDot } from "react-icons/bs";
import profile from "../../assets/images/profile.png";
import udefine_profile from "../../assets/images/nul-profile.svg";
import PaginationAll from "../../components/PaginationAll";

// styled css + dataArrayMap
const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  }
 
`;

const activeEmployee = [
  {
    profileIcon: profile,
    name: "Anushka Sharma",
    empId: "EMP123456",
    role: "Teacher",
    roleColor: "#0B6EFA",
    department: "Academics",
    phone: "+91 00000 00000",
    email: "abc@example.com",
    attendance: "100%",
  },
  {
    profileIcon: profile,
    name: "Ranveer Singh",
    empId: "EMP123459",
    role: "Accountant",
    roleColor: "#A15C07",
    department: "Finance Department",
    phone: "+91 00000 00000",
    email: "abc@example.com",
    attendance: "99%",
  },
  {
    profileIcon: profile,
    name: "Kareena Kapoor",
    empId: "EMP123460",
    role: "Receptionist",
    roleColor: "#C11574",
    department: "Front Office",
    phone: "+91 00000 00000",
    email: "abc@example.com",
    attendance: "70%",
  },
  {
    profileIcon: profile,
    name: "Shraddha Kapoor",
    empId: "EMP123457",
    role: "Teacher",
    roleColor: "#0B6EFA",
    department: "Academics",
    phone: "+91 00000 00000",
    email: "abc@example.com",
    attendance: "95%",
  },
  {
    profileIcon: udefine_profile,
    name: "Hrithik Roshan",
    empId: "EMP123462",
    role: "Librarian",
    roleColor: "#3A9D23",
    department: "Library Department",
    phone: "+91 00000 00000",
    email: "abc@example.com",
    attendance: "100%",
  },
];

const ActiveEmployeeView = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div style={{ fontFamily: "Segoe UI" }}>
        {/* Back Button */}
      <div
        onClick={handleClick}
        htmlFor=""
        className="text-[20px] sm:text-[20px] md:text-[25px] lg:text-[24px]"
        style={{
          color: "#696969",
          display: "flex",
          alignItems: "center",
          fontWeight: "400",
          cursor: "pointer",
          marginBottom: "20px",
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
        {/* Search + Filter */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "100px",
          }}
        >
          <div
            style={{
              backgroundColor: "#EEEEEE",
              borderRadius: "8px",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <input
              style={{ border: "none", outline: "none", width: "100%" }}
              type="search"
              placeholder="Search students by name or admission number..."
            />
          </div>
          {/* Select filter Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",

              cursor: "pointer",
              gap: "10px",
              fontSize: "14px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                position: "relative",
                backgroundColor: "#EFF2F2",
                borderRadius: "6px",
              }}
            >
              <Select
                name=""
                id=""
                style={{
                  width: "90px",
                  outline: "none",
                  color: "#1C1C1C",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  paddingLeft: "4px",
                  paddingRight: "10px",
                }}
              >
                <option value="Class">All</option>
                <option value="Nursery">Staff</option>
              </Select>
              {/* Custom Icon */}

              <div
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#1C1C1C",
                  fontSize: "8px",
                  fontWeight: "200",
                }}
              >
                ▼
              </div>
            </div>
            <div
              style={{
                display: "inline-block",
                position: "relative",
                backgroundColor: "#EFF2F2",
                borderRadius: "6px",
                width: "90px",
              }}
            >
              <Select
                name=""
                id=""
                style={{
                  width: "90px",
                  outline: "none",
                  color: "#1C1C1C",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  paddingLeft: "4px",
                  paddingRight: "10px",
                }}
              >
                <option value="Section">Role</option>
                <option value="A">Teacher</option>
                <option value="B">Driver</option>
              </Select>
              {/* Custom Icon */}

              <div
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#1C1C1C",
                  fontSize: "8px",
                  fontWeight: "200",
                }}
              >
                ▼
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            border: "1px solid #EEEEEE",
            borderRadius: "8px",
            width: "100%",
          }}
        >
          <table style={{ width: "100%" }}>
            <thead style={{ borderBottom: "1px solid #EEEEEE" }}>
              <tr style={{ textAlign: "left" }}>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",

                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <BsArrowDownUp color="#9C9C9C" /> Staff
                  </span>
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Role
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Department
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Mobile number
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",

                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <BsArrowDownUp color="#9C9C9C" /> Attendance%
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {activeEmployee.map((item, key) => (
                <tr
                  key={key}
                  onMouseEnter={() => setHoverIndex(key)}
                  onMouseLeave={() => setHoverIndex(null)}
                  style={{
                    textAlign: "left",
                    borderBottom: "1px solid #EEEEEE",
                    fontSize: "14px",
                    backgroundColor:
                      hoverIndex === key ? "#F5F7F9" : "transparent",
                  }}
                >
                  <td
                    style={{
                      padding: "4px 15px",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#C9D5DA",
                        borderRadius: "50%",
                        height: "40px",
                        width: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src={item.profileIcon} alt="profile" />
                    </span>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ color: "#12516E", fontWeight: "600" }}>
                        {" "}
                        {item.name}
                      </span>
                      <span style={{ color: "#9C9C9C" }}>{item.empId}</span>
                    </span>
                  </td>
                  <td style={{ padding: "4px 15px", fontWeight: "400" }}>
                    <span
                      style={{
                        border: `1px solid ${item.roleColor}`,
                        color: item.roleColor,
                        padding: "2px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        display: "inline-block",
                        minWidth: "90px",
                        textAlign: "center",
                      }}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "4px 15px",
                      fontWeight: "400",
                    }}
                  >
                    <span>{item.department}</span>
                  </td>
                  <td
                    style={{
                      padding: "4px 15px",
                      fontWeight: "400",
                    }}
                  >
                    <span>{item.phone}</span>
                  </td>
                  <td
                    style={{
                      padding: "4px 15px",
                      fontWeight: "400",
                    }}
                  >
                   
                      {item.email}
                   
                  </td>
                  <td
                    style={{
                      padding: "4px 15px",
                      fontWeight: "400",
                    }}
                  >
                    <span
                      style={{
                        color: item.attendance === "70%" ? "red" : "#1E8E3E",
                        fontWeight: "500",
                      }}
                    >
                      {item.attendance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationAll />
      </div>
    </div>
  );
};

export default ActiveEmployeeView;
