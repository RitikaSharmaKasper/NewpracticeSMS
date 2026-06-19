import React, { useState } from "react";
import Pagination from "../../../components/Pagination";
import { Link } from "react-router-dom";
{
  /* <<========================------- icons -------==========================>> */
}
import { IoMdAdd } from "react-icons/io";

import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

function Revenue() {
  const [showAddSalarySturctureType, setShowAddSalarySturctureType] = useState(false);

  const revenueData = [
    {
      id: 1,
      date: "2026-04-01",
      revenueHead: "Tech Consulting",
      details: "AI defense system development",
      vendor: "Stark Industries",
      amount: 120000,
      paymentMode: "Bank Transfer",
      recordedBy: "Tony Stark",
    },
    {
      id: 2,
      date: "2026-04-02",
      revenueHead: "Photography Services",
      details: "Daily Bugle freelance work",
      vendor: "Daily Bugle",
      amount: 15000,
      paymentMode: "Cash",
      recordedBy: "Peter Parker",
    },
    {
      id: 3,
      date: "2026-04-03",
      revenueHead: "Royal Funding",
      details: "Asgard treasury support",
      vendor: "Asgard Kingdom",
      amount: 200000,
      paymentMode: "Bank Transfer",
      recordedBy: "Thor",
    },
    {
      id: 4,
      date: "2026-04-04",
      revenueHead: "Research Grant",
      details: "Gamma radiation research funding",
      vendor: "Global Science Org",
      amount: 95000,
      paymentMode: "UPI",
      recordedBy: "Bruce Banner",
    },
    {
      id: 5,
      date: "2026-04-05",
      revenueHead: "Defense Contract",
      details: "Security tech for Gotham",
      vendor: "Wayne Enterprises",
      amount: 180000,
      paymentMode: "Credit Card",
      recordedBy: "Bruce Wayne",
    },
    {
      id: 6,
      date: "2026-04-06",
      revenueHead: "Training Program",
      details: "Military training sessions",
      vendor: "SHIELD",
      amount: 40000,
      paymentMode: "Cash",
      recordedBy: "Steve Rogers",
    },
    {
      id: 7,
      date: "2026-04-07",
      revenueHead: "Demon Slayer Missions",
      details: "Bounty rewards for demon slaying",
      vendor: "Demon Slayer Corps",
      amount: 60000,
      paymentMode: "UPI",
      recordedBy: "Tanjiro Kamado",
    },
    {
      id: 8,
      date: "2026-04-08",
      revenueHead: "Ninja Missions",
      details: "Village protection assignments",
      vendor: "Hidden Leaf Village",
      amount: 50000,
      paymentMode: "Bank Transfer",
      recordedBy: "Naruto Uzumaki",
    },
    {
      id: 9,
      date: "2026-04-09",
      revenueHead: "Titan Defense Reward",
      details: "Wall protection missions",
      vendor: "Scout Regiment",
      amount: 70000,
      paymentMode: "Cash",
      recordedBy: "Levi Ackerman",
    },
    {
      id: 10,
      date: "2026-04-10",
      revenueHead: "Jujutsu Missions",
      details: "Curse elimination contracts",
      vendor: "Jujutsu High",
      amount: 110000,
      paymentMode: "UPI",
      recordedBy: "Gojo Satoru",
    },
  ];

  return (
    <div className="">
      {/* <-------------====== Header ------------=======> */}
      <div className="bg-white mt-4 p-4 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="flex flex-col">
              <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold">
                Revenue Management
              </span>
              <span className="text-sm text-[#696969]">
                Track all revenue sources and revenue steams
              </span>
            </p>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex gap-3">
            <Link to="/add-revenue" state={{ tab: "Revenue" }}>
              <button className="flex items-center gap-2 px-4 py-2 text-[#696969] font-semibold text-[16px] border border-[#9c9c9c] rounded-lg">
                <IoMdAdd size={20} />
                Add Revenue Head
              </button>
            </Link>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-[#0B3142] text-white font-semibold text-[16px] border border-[#0B3142] rounded-lg"
              onClick={() => setShowAddSalarySturctureType(true)}
            >
              <IoMdAdd size={20} />
              Add Revenue
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
              <div className="bg-[#EFF2F2] rounded px-2 py-2">
                <select name="" id="Role" className="border-0 outline-0">
                  <option value="">All</option>
                  <option value="Admin">Admin</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Principal">Principal</option>
                  <option value="Teacher">Teacher</option>
                </select>
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
                  Date
                </th>

                {/* Hide on small screens */}
                <th className="hidden sm:table-cell px-3 py-2 sm:px-5 sm:py-4 text-left text-[14px] font-semibold text-[#1c1c1c]">
                  Revenue Head
                </th>

                <th className="px-3 py-2 sm:px-5 sm:py-4 text-left text-[12px] sm:text-[14px] font-semibold text-[#1c1c1c]">
                  Details
                </th>

                {/* Hide on small screens */}
                <th className="hidden sm:table-cell px-3 py-2 sm:px-5 sm:py-4 text-left text-[14px] font-semibold text-[#1c1c1c]">
                  Vendor
                </th>

                <th className="px-3 py-2 sm:px-5 sm:py-4 text-left text-[12px] sm:text-[14px] font-semibold text-[#1c1c1c]">
                  Amount
                </th>

                {/* Hide on small screens */}
                <th className="hidden sm:table-cell px-3 py-2 sm:px-5 sm:py-4 text-left text-[14px] font-semibold text-[#1c1c1c]">
                  Payment Mode
                </th>

                <th className="px-3 py-2 sm:px-5 sm:py-4 text-left text-[12px] sm:text-[14px] font-semibold text-[#1c1c1c]">
                  Recorded By
                </th>

                <th className="px-3 py-2 sm:px-5 sm:py-4 text-center text-[12px] sm:text-[14px] font-semibold text-[#1c1c1c]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((item, index) => (
                <tr key={index} className="border-b border-[#e6e6e6]">
                  {/* STUDENT */}

                  {/* ROLE */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 text-[#1c1c1c] lg:text-[14px] md:text-[12px] text-[10px] font-normal">
                    {item.date}
                  </td>

                  {/* DEPARTMENT */}
                  <td className="hidden sm:table-cell px-4 py-3 text-[#1c1c1c] lg:text-[14px] md:text-[12px] text-[10px] font-semibold">
                    {item.revenueHead}
                  </td>

                  {/* BASIC */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 text-[12px] sm:text-[14px] text-[#1c1c1c] lg:text-[14px] md:text-[12px] text-[10px] font-normal">
                    {item.details}
                  </td>

                  {/* HRA */}
                  <td className="hidden sm:table-cell px-4 py-3 text-[14px] text-[#1c1c1c] lg:text-[14px] md:text-[12px] text-[10px] font-normal">
                    {item.vendor}
                  </td>

                  {/* DEDUCTION */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 text-[12px] sm:text-[14px] text-[#1c1c1c] lg:text-[14px] md:text-[12px] text-[10px] font-normal">
                    ₹ {item.amount}
                  </td>

                  {/* ALLOWANCES */}
                  <td className="hidden sm:table-cell px-4 py-3 text-[14px] text-[#1c1c1c] lg:text-[14px] md:text-[12px] text-[10px] font-normal">
                    {item.paymentMode}
                  </td>

                  {/* NET SALARY */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 text-[12px] sm:text-[14px] font-semibold text-[#1c1c1c] lg:text-[14px] md:text-[12px] text-[10px] font-normal">
                    {item.recordedBy}
                  </td>

                  {/* ACTION */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3">
                    <div className="flex items-center justify-center gap-3 text-[#9C9C9C]">
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
                  Record New Income
                </span>
                <span className="text-[#9C9C9C] sm:text-[14px] text-16px font-semibold">
                  Add a new income transaction to the system
                </span>
              </div>
              <div>
                <button
                  onClick={() => setShowAddSalarySturctureType(false)}
                  className="text-xl"
                >
                  <IoClose size={28} />
                </button>
              </div>
            </div>

           <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1 mt-4">
                <div className="flex gap-1">
                  <label className="text-[#696969] font-medium text-[14px] ">
                    Date
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <input
                  type="date"
                  placeholder=""
                  className="w-full border border-[#9C9C9C] rounded-md px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5 outline-none focus:ring-[#9C9C9C]"
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <div className="flex gap-1">
                  <label
                    htmlFor="selecteBloodGroup"
                    className="text-[#696969] font-medium text-[14px] "
                  >
                    Revenue Head
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>

                <div className="border border-[#9C9C9C] rounded-md px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5">
                  <select
                    name="selecteBloodGroup"
                    id="selecteBloodGroup"
                    className="w-full border-none outline-none"
                    defaultValue="Applied Class"
                  >
                    <option value="">Select Revenue Head</option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </div>
              </div> 
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-[#696969] font-medium text-[14px] ">
                    Amount
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g ₹ 500"
                  className="w-full border border-[#9C9C9C] rounded-md px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5 outline-none focus:ring-[#9C9C9C]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-[#696969] font-medium text-[14px] ">
                    Vendor
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <input
                  type="text"
                  placeholder="Vendor Name"
                  className="w-full border border-[#9C9C9C] rounded-md px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5 outline-none focus:ring-[#9C9C9C]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label
                    htmlFor="selecteBloodGroup"
                    className="text-[#696969] font-medium text-[14px] "
                  >
                    Payment Mode
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <div className="border border-[#9C9C9C] rounded-md px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5">
                  <select
                    name="selecteBloodGroup"
                    id="selecteBloodGroup"
                    className="w-full border-none outline-none"
                    defaultValue="Applied Class"
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="">UPI</option>
                    <option value="">Cash</option>
                    <option value="">Credit Card</option>
                    <option value="">Bank Transfer</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-[#696969] font-medium text-[14px] ">
                    details
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <input
                  type="type"
                  placeholder="Type here"
                  className="w-full border border-[#9C9C9C] rounded-md px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5 outline-none focus:ring-[#9C9C9C]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2 justify-end">
              {/* Cancel Button */}
              <button
                onClick={() => setShowAddSalarySturctureType(false)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 text-[12px] sm:text-[14px] lg:text-[16px] text-[#696969] font-semibold border border-[#9C9C9C] rounded-lg"
              >
                Cancel
              </button>

              {/* Create Button */}
              <button
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-[12px] sm:text-[14px] lg:text-[16px] 
                bg-[#0B3142] text-white font-semibold border border-[#0B3142] rounded-lg"
              >
                Add Income
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Revenue;
