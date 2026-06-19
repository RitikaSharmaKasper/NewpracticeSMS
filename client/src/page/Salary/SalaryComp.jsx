import React, { useState } from "react";
// import Pagination from "../../../components/Pagination";
{
  /* <<========================------- icons -------==========================>> */
}
import { IoMdAdd } from "react-icons/io";
import { RxCaretSort } from "react-icons/rx";
import { IoEyeOutline } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine, RiFileExcel2Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

{
  /* <================================== img ================================> */
}
// import iron from "../../../assets/images/iron-man.jpg";
// import spy from "../../../assets/images/spider-man.jpeg";
// import thor from "../../../assets/images/thor.jpg";
// import captain from "../../../assets/images/captain.jpg";
// import king from "../../../assets/images/king.jpg";
// import hulk from "../../../assets/images/hulk.jpeg";
// import batman from "../../../assets/images/batman.jpg";
// import flash from "../../../assets/images/flash.jpg";
// import diana from "../../../assets/images/wonder-women.jpg";
// import superman from "../../../assets/images/super.jpg";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

function SalaryComp() {
  const [showAddSalarySturctureType, setShowAddSalarySturctureType] =
    useState(false);

  const conscessiondata = [
    {
      id: 1,
      studentName: "Iron Man",
      studId: "HERO-001",
      role: "Teacher",
      department: "Mathematics",
      basic: 35000,
      hra: 8000,
      deduction: 2000,
      allowances: 3000,
      netSalary: 44000,
      // img: iron,
    },
    {
      id: 2,
      studentName: "Spider Man",
      studId: "HERO-002",
      role: "Accountant",
      department: "Finance",
      basic: 42000,
      hra: 9000,
      deduction: 2500,
      allowances: 3500,
      netSalary: 52000,
      // img: spy,
    },
    {
      id: 3,
      studentName: "Thor",
      studId: "HERO-003",
      role: "Admin",
      department: "Administration",
      basic: 38000,
      hra: 8500,
      deduction: 2200,
      allowances: 2800,
      // img: thor,
    },
    {
      id: 4,
      studentName: "Hulk",
      studId: "HERO-004",
      role: "Sports Coach",
      department: "Physical Education",
      basic: 32000,
      hra: 7200,
      deduction: 1600,
      allowances: 2500,
      netSalary: 40100,
      // img: hulk,
    },
    {
      id: 5,
      studentName: "Captain America",
      studId: "HERO-005",
      role: "Admin",
      department: "Administration",
      basic: 38000,
      hra: 8500,
      deduction: 2200,
      allowances: 2800,
      // img: captain,
    },
    {
      id: 6,
      studentName: "Black Panther",
      studId: "HERO-006",
      role: "Sports Coach",
      department: "Physical Education",
      basic: 32000,
      hra: 7200,
      deduction: 1600,
      allowances: 2500,
      netSalary: 40100,
      // img: king,
    },
    {
      id: 7,
      studentName: "Flash",
      studId: "HERO-007",
      role: "Sports Coach",
      department: "Physical Education",
      basic: 32000,
      hra: 7200,
      deduction: 1600,
      allowances: 2500,
      netSalary: 40100,
      // img: flash,
    },
    {
      id: 8,
      studentName: "Batman",
      studId: "HERO-008",
      role: "Sports Coach",
      department: "Physical Education",
      basic: 32000,
      hra: 7200,
      deduction: 1600,
      allowances: 2500,
      netSalary: 40100,
      // img: batman,
    },
    {
      id: 9,
      studentName: "Superman",
      studId: "HERO-009",
      role: "Sports Coach",
      department: "Physical Education",
      basic: 32000,
      hra: 7200,
      deduction: 1600,
      allowances: 2500,
      netSalary: 40100,
      // img: superman,
    },
    {
      id: 10,
      studentName: "Wonder Woman",
      studId: "HERO-010",
      role: "Sports Coach",
      department: "Physical Education",
      basic: 32000,
      hra: 7200,
      deduction: 1600,
      allowances: 2500,
      netSalary: 40100,
      // img: diana,
    },
  ];

  return (
    <div className="">
      {/* <-------------====== Header ------------=======> */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="flex flex-col">
              <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold">
                Salary Details
              </span>
              <span className="text-sm text-[#696969]">
                You can view or create employees salary here.
              </span>
            </p>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex gap-3">
            {/* <Link to="/allowance">
              <button className="flex items-center gap-2 px-6 py-3 text-[#696969] font-semibold text-[16px] border border-[#9c9c9c] rounded-lg">
                <IoMdAdd size={20} />
                Add allowance head
              </button>
            </Link> */}
            <button
              className="flex items-center gap-2 px-5 py-2 bg-[#0B3142] text-white font-semibold text-[16px] border border-[#0B3142] rounded-lg"
              onClick={() => setShowAddSalarySturctureType(true)}
            >
              <IoMdAdd size={20} />
              Add Salary
            </button>
          </div>
        </div>

        {/* <-------------------------------------- search & filter ------------------------------> */}
        <div className="mt-6 flex items-center gap-28">
          {/* SEARCH */}
          <div className="flex-1">
            <span></span>
            <input
              type="search"
              placeholder="🔎︎ Search Student by name or admission Number..."
              className="w-full bg-[#EEEEEE] rounded-lg px-4 py-2"
            />
          </div>

          {/* FILTER BUTTONS */}
          <div className="inline-flex items-center gap-2">
            <div className="flex justify-between">
              <label htmlFor="Role" className=""></label>
              <div className="bg-[#EFF2F2] rounded-lg px-2 py-2">
               <button className="flex items-center gap-2 cursor-pointer">Excel <RiFileExcel2Line /></button>
              </div>
            </div>
          </div>
        </div>

        {/* <============================ Table ============================> */}
        <div className="mt-8 border border-[#e6e6e6] rounded-lg overflow-x-auto">
          <table className="min-w-[1000px] w-full">
            {/* ================= HEADER ================= */}
            <thead>
              <tr className="border-b border-[#e6e6e6]">
                <th className="px-3 py-2 sm:px-5 sm:py-4 text-left text-[12px] sm:text-[14px] font-semibold text-[#1c1c1c]">
                  <div className="flex justify-between items-center">
                    <span>Staff</span>
                    {/* <RxCaretSort /> */}
                  </div>
                </th>

                {/* Hide on small screens */}
                <th className="hidden sm:table-cell px-3 py-2 sm:px-5 sm:py-4 text-left text-[14px] font-semibold text-[#1c1c1c]">
                  Role
                </th>

                <th className="px-3 py-2 sm:px-5 sm:py-4 text-left text-[12px] sm:text-[14px] font-semibold text-[#1c1c1c]">
                  Basic Salary
                </th>

                {/* Hide on small screens */}
                <th className="hidden sm:table-cell px-3 py-2 sm:px-5 sm:py-4 text-left text-[14px] font-semibold text-[#1c1c1c]">
                  HRA
                </th>

                <th className="px-3 py-2 sm:px-5 sm:py-4 text-left text-[12px] sm:text-[14px] font-semibold text-[#1c1c1c]">
                  Conveyance
                </th>

                {/* Hide on small screens */}
                <th className="hidden sm:table-cell px-3 py-2 sm:px-5 sm:py-4 text-left text-[14px] font-semibold text-[#1c1c1c]">
                  Other Allowances
                </th>

                <th className="px-3 py-2 sm:px-5 sm:py-4 text-left text-[12px] sm:text-[14px] font-semibold bg-[#D3E5F8] text-[#1c1c1c]">
                  Total Salary
                </th>

                <th className="px-3 py-2 sm:px-5 sm:py-4 text-center text-[12px] sm:text-[14px] font-semibold  text-[#1c1c1c]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {conscessiondata.map((item, index) => (
                <tr key={index} className="border-b border-[#e6e6e6]">
                  {/* STUDENT */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                        <img
                          src={item.img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col leading-tight">
                        <span className="text-[#12516E] font-semibold text-[12px] sm:text-[14px]">
                          {item.studentName}
                        </span>
                        <span className="text-[10px] sm:text-sm text-[#9c9c9c] font-semibold">
                          {item.studId}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3">
                    <span className="inline-flex w-full items-center justify-center px-2 py-0.5 text-[10px] sm:text-sm font-medium border border-[#007AFF] text-[#007AFF] rounded-md">
                      {item.role}
                    </span>
                  </td>

                  {/* BASIC */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 text-[12px] sm:text-[14px]">
                    ₹ {item.basic}
                  </td>

                  {/* HRA */}
                  <td className="hidden sm:table-cell px-4 py-3 text-[14px]">
                    ₹ {item.hra}
                  </td>

                  {/* DEDUCTION */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 text-[12px] sm:text-[14px] text-[#DC2626]">
                    ₹ {item.deduction}
                  </td>

                  {/* ALLOWANCES */}
                  <td className="hidden sm:table-cell px-4 py-3 text-[14px]">
                    ₹ {item.allowances}
                  </td>

                  {/* NET SALARY */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 text-[12px] sm:text-[14px] font-semibold bg-[#EDF4FB]">
                    ₹ {item.netSalary}
                  </td>

                  {/* ACTION */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3">
                    <div className="flex items-center justify-center gap-3 text-[#9C9C9C]">
                      {/* <IoEyeOutline className="text-[16px] sm:text-[18px] cursor-pointer hover:text-[#007AFF]" /> */}
                      <FiEdit className="text-[16px] sm:text-[18px] cursor-pointer hover:text-green-600" />
                      <RiDeleteBinLine className="text-[16px] sm:text-[18px] cursor-pointer hover:text-red-500 text-[#DC2626]" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>

      {showAddSalarySturctureType && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-6"
          onClick={() => setShowAddSalarySturctureType(false)}
        >
          <div
            className="bg-white w-full max-w-lg sm:max-w-2xl lg:max-w-4xl rounded-xl shadow-lg relative p-4 sm:p-6 max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2 sm:gap-1">
                <span className="text-[#1C1C1C] sm:text-[14px] text-18px font-semibold">
                  Add Salary Details
                </span>
                <span className="text-[#9C9C9C] sm:text-[14px] text-16px">
                  You can add salary details of the employee.
                </span>
              </div>
              <div>
                <button
                  onClick={() => setShowAddSalarySturctureType(false)}
                  className="text-xl cursor-pointer"
                >
                  <IoClose size={28} />
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-3 mt-6">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label
                    htmlFor="selecteBloodGroup"
                    className="text-[#1C1C1C] font-medium text-[14px] "
                  >
                    Role
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <div className="border border-[#E6E6E6] rounded-xl px-3 py-2">
                  <select
                    name="selecteBloodGroup"
                    id="selecteBloodGroup"
                    className="w-full border-none outline-none"
                    defaultValue="Applied Class"
                  >
                    <option value="">Select Role</option>
                    <option value="">Admin</option>
                    <option value="">Staff</option>
                    <option value="">Teacher</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label
                    htmlFor="selecteBloodGroup"
                    className="text-[#1C1C1C] font-medium text-[14px] "
                  >
                    Staff
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <div className="border border-[#E6E6E6] rounded-xl px-3 py-2">
                  <select
                    name="selecteBloodGroup"
                    id="selecteBloodGroup"
                    className="w-full border-none outline-none"
                    defaultValue="Applied Class"
                  >
                    <option value="">Select Staff</option>
                    <option value="">A+</option>
                    <option value="">B+</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-[#1C1C1C] font-medium text-[14px] ">
                    Basic Salary
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g ₹ 1000"
                  className="w-full border border-[#E6E6E6] rounded-xl px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-[#1C1C1C] font-medium text-[14px] ">
                    House Rent Allowance (H.R.A.)
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g ₹ 500"
                  className="w-full border border-[#E6E6E6] rounded-xl px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-[#1C1C1C] font-medium text-[14px] ">
                    Transport Allowance
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g ₹ 500"
                  className="w-full border border-[#E6E6E6] rounded-xl px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-[#1C1C1C] font-medium text-[14px] ">
                    Medical Allowance
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g ₹ 500"
                  className="w-full border border-[#E6E6E6] rounded-xl px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-[#1C1C1C] font-medium text-[14px] ">
                    Special Allowance
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g ₹ 500"
                  className="w-full border border-[#E6E6E6] rounded-xl px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2 justify-end">
              {/* Cancel Button */}
              <button
                onClick={() => setShowAddSalarySturctureType(false)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 text-[12px] sm:text-[14px] lg:text-[16px] text-[#1C1C1C] font-semibold border border-[#9C9C9C] rounded-lg cursor-pointer"
              >
                Cancel
              </button>

              {/* Create Button */}
              <button
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-[12px] sm:text-[14px] lg:text-[16px] 
                bg-[#0B3142] text-white font-semibold border border-[#0B3142] rounded-lg cursor-pointer"
              >
                Create Structure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalaryComp;
