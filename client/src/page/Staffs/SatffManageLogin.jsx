import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
{
  /* <---------------------------------------------- icon -----------------------------------------------------> */
}
import { CiMail } from "react-icons/ci";
import { PiArrowsDownUpThin } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoMdSave } from "react-icons/io";
import { HiSearch, HiOutlineExclamationCircle } from 'react-icons/hi';
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

{
  /* <----------------------------------------------- GIF ----------------------------------------------------> */
}
import Teamwork from "../../assets/images/TeamWork.gif";
import calender from "../../assets/images/calender.gif";
import worker from "../../assets/images/worker.gif";
import teacher from "../../assets/images/teacher.gif";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import api from "../../config/axiosInstance";

const SatffManageLogin = () => {
  const [toggleState, setToggleState] = useState({});
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [debouncedSerch] = useDebounce(search, 500);

  // get the list of staff from the server using react query
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
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
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSerch, role]);

  const staffData = data?.data || [];
  const pagination = data?.pagination;

  // console.log(staffData);

  const handleToggle = async (staffId, currentValue) => {
    try {
      await api.patch(`/staff/update-login-permission/${staffId}`, {
        loginPermission: !currentValue,
      });

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

   const roles = [
    "Teacher",
    "Accountant",
    "Receptionist",
    "Librarian",
    "Driver",
    "Cleaner",
  ];

  return (
    <div>
      <div className="box-shadow  bg-white rounded-md">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="flex flex-col">
              <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold">
                Login Access Management
              </span>
              <span className="text-sm text-[#696969]">
                View and manage student login details
              </span>
            </p>
          </div>
        </div>

        {/* <-------------------------------------- search & filter ------------------------------> */}
     
         <div className="flex flex-col md:flex-row gap-4 mb-6 px-4">   
                   
                     <div className="relative flex-1">
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

        {/* <------------------------------------------ Table ---------------------------------------> */}
        <div className="p-4">
          <div className="w-full overflow-x-auto border border-[#e6e6e6] rounded-2xl">
            <table className="w-full">
              <thead className="border-b border-[#e6e6e6]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Staff</span>
                    </div>
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Role</span>
                    </div>
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Mobile Number
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Email
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Login Permission
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    User Name
                  </th>

                  {/* <th className="px-4 py-3 text-left text-sm font-semibold">
                    Password
                  </th> */}

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {staffData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#e6e6e6] hover:bg-[#FAFBFF]"
                  >
                    <td className="px-4 py-3 text-left text-sm font-semibold flex gap-3 items-center">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={item?.profilePhoto?.url}
                            alt={item?.profilePhoto?.publicId}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Name + ID */}
                        <div className="flex flex-col leading-tight">
                          <span className="text-[#12516E] font-semibold">
                            {item?.personalInfo?.staffName}
                          </span>
                          <span className="text-sm text-[#9c9c9c] font-semibold">
                            {item?.staffId}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-left text-sm  font-semibold">
                      {/* <Link to="/staffDetails"> */}
                        <span
                          className={`border  px-8  rounded-md ${
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
                    <td className="px-4 py-3 text-left text-sm font-semibold">
                      {item?.contactInfo?.mobileNumber}
                    </td>
                    <td className="px-4 py-3 text-left text-[14px] font-normal text-[#1C1C1C]">
                      {item?.contactInfo?.email}
                    </td>
                    <td className="px-4 py-3 text-left">
                    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
  <div className="relative">
    <input
      type="checkbox"
      className="sr-only"
      checked={item?.loginPermission}
      onChange={() => handleToggle(item?._id, item?.loginPermission)}
    />
    <div 
      className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center ${
        item?.loginPermission ? "bg-[#0B5D7A]" : "bg-gray-300"
      }`}
    >
      <div 
        className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 transform ${
          item?.loginPermission ? "translate-x-7" : "translate-x-1"
        }`} 
      />
    </div>
  </div>
  <span
    className={`text-xs font-medium ${
      item?.loginPermission === true ? "text-green-600" : "text-red-600"
    }`}
  >
    {item?.loginPermission === true ? "Active" : "Inactive"}
  </span>
</label>
                    </td>

                    <td className="px-4 py-3 text-left text-[14px] font-normal text-[#696969]">
                      <div className="flex items-center justify-between gap-2 w-full  border border-[#d9d9d9] px-4 py-2 rounded-md text-sm">
                        {/* Icon */}
                        <FaUser className=" text-[#9C9C9C] text-[14px]" />

                        {/* Input */}
                        <input
                          type="text"
                          value={item?.username}
                          readOnly
                          className="w-full text-sm outline-none focus:outline-none"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button className={{}}>
                        <CiMail size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <------------------------------------------- pagination ---------------------------------> */}
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
  );
};

export default SatffManageLogin;
