import React, { useState, useEffect } from "react";
import "../../CSS/Style.css";
import "../../CSS/Room.css";
import styled from "styled-components";

import { HiSearch, HiOutlineExclamationCircle } from 'react-icons/hi';
import { useQuery, useMutation } from "@tanstack/react-query";
{
  /* <----------------------------------------------- GIF ----------------------------------------------------> */
}
import staff_add from "../../assets/images/staff_Add.png";
import Teamwork from "../../assets/images/TeamWork.gif";
import calender from "../../assets/images/calender.gif";
import worker from "../../assets/images/worker.gif";
import teacher from "../../assets/images/teacher.gif";

{
  /* <---------------------------------------------- icon -----------------------------------------------------> */
}
import { TbFileImport } from "react-icons/tb";
import { GrUserAdd } from "react-icons/gr";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiArrowsDownUpThin } from "react-icons/pi";
import { FiEdit, FiSearch } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import deleteIcon from "../../assets/images/delete-2.png";
/* <----------------------------------------------- img -------------------------------------------------------> */
import everdeen from "../../assets/images/katnis.jpg";
import goku from "../../assets/images/goku.jpg";
import langford from "../../assets/images/langford.jpg";
import homelander from "../../assets/images/homelander.jpg";
import thanos from "../../assets/images/thanos.jpg";
import Joffrey from "../../assets/images/Joffrey.jpg";
import doll from "../../assets/images/bella.jpg";
import prime from "../../assets/images/prime.jpg";
import peter from "../../assets/images/lord.jpg";
import gamora from "../../assets/images/gamora.jpg";
import meave from "../../assets/images/meave.jpg";
import Pagination from "../../components/Pagination";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PaginationAll from "../../components/PaginationAll";
import { LuFileInput } from "react-icons/lu";
import api from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";

const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  }
 
`;

const cardData = [
  {
    des: "Total Staff",
    number: "200",
    left: "195",
    text: "active members",
    gif: Teamwork,
  },
  {
    des: "Total Teaching Staff",
    number: "180",
    left: "3",
    text: "teaching staff are absent",
    gif: teacher,
  },
  {
    des: "Total Other Staff",
    number: "20",
    left: "2",
    text: "other staff are absent",
    gif: worker,
  },
  {
    des: "Attendance Rate",
    number: "94%",
    left: "+2.1%",
    text: "from the last month",
    gif: calender,
  },
];

/* <--------------------------------------------------- student Dummy Data --------------------------------------------> */

const AllStaff = () => {
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);


  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [debouncedSerch] = useDebounce(search, 500);

  // get the list of staff from the server using react query
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["all-staff", page, limit, debouncedSerch, role],
    queryFn: async () => {
      const res = await api.get("/staff/all-staff", {
        params: {
          page,
          limit,
          search: debouncedSerch,
          role,
        },
      });

      return res.data;
    },
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debouncedSerch, role]);

  const storeStaff = data?.data || [];
  const pagination = data?.pagination;

  // console.log(storeStaff);

  // handle delete
  const deleteStaffMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/staff/delete-staff/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Staff deleted successfully");

      // refresh get api automatically
      queryClient.invalidateQueries({
        queryKey: ["all-staff"],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
  const roles = [
    "Teacher",
    "Accountant",
    "Receptionist",
    "Librarian",
    "Driver",
    "Cleaner",
  ];
 const handleclickBulkImport = () => {
    navigate("/bulk-import-room");
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  return (
    <>
      {isFetching && <p className="text-sm text-gray-500">Searching...</p>}
      <div
        style={{
          fontFamily: "Segoe UI",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* <--------------------------------------- Card -----------------------------------> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3">
          {cardData.map((item, index) => (
            <div key={index} className="box-shadow bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between ">
                {/* LEFT CONTENT */}
                <div className="flex flex-col justify-center">
                  <p className="font-normal text-[12px] md:text-[14px] lg:text-[16px] text-[#1C1C1C]">
                    {item.des}
                  </p>

                  <span className="font-bold text-[20px] md:text-[24px] lg:text-[28px] text-[#1c1c1c] mt-5 leading-none">
                    {item.number}
                  </span>

                  <p className="mt-3 flex items-center gap-2 text-[10px] md:text-[12px] lg:text-[14px] font-semibold ">
                    <span
                      className={`${
                        item.text.includes("absent")
                          ? "text-[#FF4B4B]" // red for absent
                          : "text-[#009638]" // green for normal
                      }`}
                    >
                      {item.left}
                    </span>
                    <span className="text-[#696969]">{item.text}</span>
                  </p>
                </div>

                {/* RIGHT ICON / GIF */}
                <div className="flex items-center justify-center w-16 h-16">
                  <img
                    src={item.gif}
                    alt="student"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
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
          {/* Header + Add Button */}
          <div
            className="performance-overview-headerfilter-sms"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "100px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                className="text-[14px] md:text-[16px] lg:text-[18px]"
                style={{ color: "#1C1C1C", fontWeight: "600" }}
              >
                Staff Directory
              </label>
              <label
                className="text-[12px] md:text-[14px] lg:text-[16px]"
                style={{
                  color: "#9C9C9C",
                  fontWeight: "400",
                  fontSize: "14px",
                }}
              >
                View and manage all staff members
              </label>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button      onClick={handleclickBulkImport}
                className="text-[12px] md:text-[14px] lg:text-[16px]"
                style={{
                  color: "#9C9C9C",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "3px",
                  border: "1px solid #9C9C9C",
                }}
              >
                <LuFileInput /> Bulk Import
              </button>
              <button
                onClick={() => navigate("/add-staffs")}
                className="text-[12px] md:text-[14px] lg:text-[16px]"
                style={{
                  backgroundColor: "#0B3142",
                  color: "#FFFFFF",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  height: "40px",
                  display: "flex",
                  gap:"7px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                 <img src={staff_add} alt="plus" className="h-4 w-4 object-contain" /> Add Staff
              </button>
            </div>
          </div>

          {/* <-------------------------------------- search & filter ------------------------------> */}
         
            <div className="flex flex-col md:flex-row gap-4 mb-6 px-0">   
              
                <div className="relative flex-1 px-0">
                        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
                        <input
                          type="text"
                          placeholder="Search visitors..."
                           value={search}
                              onChange={(e) => {
                  setSearch(e.target.value);
                  // setPage(1);
                }}
                          className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-[9px] text-[14px] focus:outline-none"
                        />
                      </div>
          
          
            <div className="relative inline-block">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="bg-[#EFF2F2]  rounded-[9px] px-4 py-2.5 text-[12px] text-[#1C1C1C] min-w-[130px] cursor-pointer flex items-center justify-between"
              >
                <span>{role || "All Roles"}</span>

                <svg
                  className={`w-4 h-4 transition ${
                    showRoleDropdown ? "" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showRoleDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E8E8] rounded-[9px] shadow-lg overflow-hidden">
                  <button
                    onClick={() => {
                      setRole("");
                      setShowRoleDropdown(false);
                    }}
                    className="px-4 py-2 text-[13px] hover:bg-[#F3F4F6] cursor-pointer"
                  >
                    All
                  </button>

                  {roles.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setRole(item);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] ${
                        role === item
                          ? " text-[#1C1C1C] font-normal"
                          : ""
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          
            </div>
            {/* Select filter Button */}
          
       
          {/* <------------------------------------------ Table ---------------------------------------> */}

          <div
            style={{
              border: "1px solid #EEEEEE",
              borderRadius: "8px",
              width: "100%",
              overflow: "auto",
              // maxHeight:"224px"
            }}
          >
            <table style={{ width: "100%" }}>
              <thead
                className="text-[10px] md:text-[12px] lg:text-[14px]"
                style={{ borderBottom: "1px solid #EEEEEE" }}
              >
                <tr style={{ textAlign: "left" }}>
                  <th
                    style={{
                      padding: "10px 20px",
                      color: "#1C1C1C",

                      fontWeight: "600",
                    }}
                  >
                    Staff
                  </th>

                  <th
                    style={{
                      padding: "10px 23px",
                      color: "#1C1C1C",
                      fontWeight: "600",
                    }}
                  >
                    Role
                  </th>

                  <th
                    style={{
                      padding: "10px 15px",
                      color: "#1C1C1C",
                      fontWeight: "600",
                    }}
                  >
                    Department
                  </th>

                  <th
                    style={{
                      padding: "10px 15px",
                      color: "#1C1C1C",
                      fontWeight: "600",
                    }}
                  >
                    Mobile Number
                  </th>

                  <th
                    style={{
                      padding: "10px 15px",
                      color: "#1C1C1C",
                      fontWeight: "600",
                    }}
                  >
                    Email
                  </th>
                  {/* <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                  }}
                >
                  Attendance%
                </th> */}

                  <th
                    style={{
                      padding: "10px 28px",
                      color: "#1C1C1C",
                      fontWeight: "600",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {isFetching ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      Loading staff...
                    </td>
                  </tr>
                ) : storeStaff.length > 0 ? (
                  storeStaff.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => Navigate("/staffDetails")}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
                      style={{
                        textAlign: "left",
                        borderBottom: "1px solid #EEEEEE",
                        fontSize: "14px",
                        backgroundColor:
                          hoverIndex === index ? "#F5F7F9" : "transparent",
                      }}
                    >
                      <td
                        className="text-[10px] md:text-[12px] lg:text-[14px]"
                        style={{
                          padding: "4px 15px",
                          paddingRight:"65px",
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "#f6f9fb",
                            borderRadius: "50%",
                            height: "40px",
                            width: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={item.profilePhoto?.url || everdeen}
                            alt="buildingIcon"
                            style={{
                              borderRadius: "50%",
                              height: "40px",
                              width: "40px",
                            }}
                          />
                        </span>
                        <span
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span style={{ color: "#12516E", fontWeight: "600" }}>
                            {item?.personalInfo?.staffName}
                          </span>
                          <span style={{ color: "#9C9C9C" }}>
                            {item.staffId}
                          </span>
                        </span>
                      </td>

                      <td
                        className="text-[10px] md:text-[12px] lg:text-[14px]"
                        style={{
                          padding: "4px 15px",
                          fontWeight: "400",
                        }}
                      >
                        {/* <Link to="/staffDetails"> */}
                        <span
                          className={`border  px-14  rounded-md ${
                            item?.employmentInfo?.role == "Teacher"
                              ? "border-[#007AFF] text-[#007AFF]"
                              : item?.employmentInfo?.role == "Accountant"
                                ? "border-[#894B00] text-[#894B00]"
                                : item?.employmentInfo?.role == "Receptionist"
                                  ? "border-[#A8038D] text-[#A8038D]"
                                  : item?.employmentInfo?.role == "Librarian"
                                    ? "border-[#4BA803] text-[#4BA803]"
                                    : item?.employmentInfo?.role ==
                                        "Super Admin"
                                      ? "border-[#C1891B] text-[#C1891B]"
                                      : item?.employmentInfo?.role == "Driver"
                                        ? "border-[#00ADAD] text-[#00ADAD]"
                                        : item?.employmentInfo?.role ==
                                            "Cleaner"
                                          ? "border-[#EF476F] text-[#EF476F]"
                                          : ""
                          } `}
                        >
                          {item?.employmentInfo?.role}
                        </span>
                        {/* </Link> */}
                      </td>
                      <td
                        className="text-[10px] md:text-[12px] lg:text-[14px]"
                        style={{
                          padding: "4px 15px",
                          fontWeight: "400",
                        }}
                      >
                        {/* <Link to="/staffDetails"> */}
                        {item?.employmentInfo?.department}
                        {/* </Link> */}
                      </td>
                      <td
                        className="text-[10px] md:text-[12px] lg:text-[14px]"
                        style={{
                          padding: "4px 15px",
                          fontWeight: "400",
                        }}
                      >
                        {/* <Link to="/staffDetails"> */}
                        {item?.contactInfo?.mobileNumber}
                        {/* </Link> */}
                      </td>
                      <td
                        className="text-[10px] md:text-[12px] lg:text-[14px]"
                        style={{
                          padding: "4px 15px",
                          fontWeight: "400",
                        }}
                      >
                        <span>{item?.contactInfo?.email}</span>
                      </td>
                      {/* <td
                   
                      style={{
                        padding: "4px 15px",
                        fontWeight: "400",
                      }}
                    className={`text-[10px] md:text-[12px] lg:text-[14px] text-center ${
                      item.attendance >= "90%"
                        ? "text-[#009638]"
                        : item.attendance >= "75%"
                          ? "text-[#FFAA00]"
                          : "text-[#FF4B4B]"
                    }`}
                  >
                    {item.attendance}
                  </td> */}
                      <td
                        className="text-[10px] md:text-[12px] lg:text-[14px]"
                        style={{
                          padding: "10px 20px 10px 20px",
                          color: "#1C1C1C",

                          fontWeight: "400",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <Link to={`/staffDetails/${item._id}`}>
                            <CgProfile className="w-5 h-5 text-[#9C9C9C]" />
                          </Link>

                          <FiEdit
                            onClick={() => navigate(`/edit-staffs/${item._id}`)}
                            className="w-5 h-5 text-[#9C9C9C] cursor-pointer"
                          />

                          <FaRegFileAlt
                            onClick={() => navigate(`/job-letter/${item._id}`)}
                            className="w-5 h-5 text-[#9C9C9C] cursor-pointer"
                          />
                       
                            <img
                              src={deleteIcon}
                              alt="delete"
                             onClick={() => deleteStaffMutation.mutate(item._id)}
                              className="h-5.5 w-5.5 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                            />
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No staff found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* <------------------------------------------- pagination ---------------------------------> */}
          {/* <Pagination /> */}
          <Pagination
            currentPage={page}
            total={pagination?.totalStaff || 0}
            itemsPerPage={limit}
            onPageChange={setPage}
            onItemsPerPageChange={(value) => {
              setLimit(value);
              setPage(1);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AllStaff;
