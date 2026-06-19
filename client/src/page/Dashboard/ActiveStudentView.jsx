import React,{useState} from "react";
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

const activeStudent = [
  {
    profileIcon: profile,
    student: "Akash Bhau",
    section: "STUD-1234",
    class: "Nursery C",
    parentsGurdian: "Mr Sharma",
    number: "+ 91 000000000",
    status: "Active",
  },
  {
    profileIcon: udefine_profile,
    student: "Golu",
    section: "STUD-1234",
    class: "LKG",
    parentsGurdian: "Mr Sharma",
    number: "+ 91 000000000",
    status: "Active",
  },
   {
    profileIcon: udefine_profile,
    student: "Golu",
    section: "STUD-1234",
    class: "LKG",
    parentsGurdian: "Mr Sharma",
    number: "+ 91 000000000",
    status: "Active",
  },
   {
    profileIcon: udefine_profile,
    student: "Golu",
    section: "STUD-1234",
    class: "LKG",
    parentsGurdian: "Mr Sharma",
    number: "+ 91 000000000",
    status: "Active",
  },
   {
    profileIcon: udefine_profile,
    student: "Golu",
    section: "STUD-1234",
    class: "LKG",
    parentsGurdian: "Mr Sharma",
    number: "+ 91 000000000",
    status: "Active",
  },

   {
    profileIcon: profile,
    student: "Kasim Developer",
    section: "STUD-1234",
    class: "Nursery C",
    parentsGurdian: "Mr Sharma",
    number: "+ 91 000000000",
    status: "Active",
  },
];

const ActiveStudentView = () => {
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
                <option value="Class">Class</option>
                <option value="Nursery">Nursery</option>
                <option value="UKG">UKG</option>
                <option value="Class 1">Class 1</option>
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
                <option value="Section">Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
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
                <option value="Status">Export As</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
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
                  <span style={{ display: "flex",
                    alignItems: "center",
                    gap: "5px",}}><BsArrowDownUp color="#9C9C9C" /> Student</span>
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                    fontSize: "14px",
                   
                  }}
                >
                   <span style={{ display:"flex",
                    alignItems:"center",
                    gap:"5px"}}><BsArrowDownUp color="#9C9C9C" /> Class</span>
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Parent/Guardian
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {activeStudent.map((item, key) => (
                <tr
                
                key={key} 
                  onMouseEnter={() => setHoverIndex(key)}
                  onMouseLeave={() => setHoverIndex(null)}
                style={{ textAlign: "left" ,borderBottom: "1px solid #EEEEEE",fontSize:"14px",
                    backgroundColor: hoverIndex === key ? "#F5F7F9" : "transparent",
                }}>
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
                        alignItems:"center"
                      }}
                    >
                      <img src={item.profileIcon} alt="profile" />
                    </span>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ color: "#12516E",fontWeight:"600" }}>{item.student}</span>
                      <span style={{ color: "#9C9C9C" }}>{item.section}</span>
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "4px 15px",
                      fontWeight: "400",
                      
                    }}
                  >
                    <span>{item.class}</span>
                  </td>
                  <td
                    style={{
                      padding: "4px 15px",
                      fontWeight: "400",
                      
                    }}
                  >
                    <span>{item.parentsGurdian}</span>
                  </td>
                  <td
                    style={{
                      padding: "4px 15px",
                      fontWeight: "400",
                     
                    }}
                  >
                    <span>{item.number}</span>
                  </td>
                  <td
                    style={{
                      padding: "4px 15px",
                      fontWeight: "400",
                     
                    }}
                  >
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
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <PaginationAll/>
      </div>
    </div>
  );
};

export default ActiveStudentView;
