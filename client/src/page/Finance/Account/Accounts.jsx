import React, { useState } from "react";
import Pagination from "../../../components/Pagination";
import "react-day-picker/dist/style.css";
{
  /* <<========================------- icons -------==========================>> */
}

import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa6";
import { LuFolderClosed } from "react-icons/lu";
import { RiFileExcel2Line } from "react-icons/ri";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { IoPrintSharp } from "react-icons/io5";

/* <--------------------------------------------------- calender -----------------------------------------------> */
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { LuCalendarDays } from "react-icons/lu";

function Accounts() {
  const [showAddExpensesType, setShowAddExpensesType] = useState(false);
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState();

  const expensesData = [
    {
      id: 1,
      date: "12 Jan, 2026",
      details: "Iron Man Suit Repair",
      debit: 50000,
      credit: 0,
      balance: 450000,
    },
    {
      id: 2,
      date: "13 Jan, 2026",
      details: "Web Shooter Fluid Sale",
      debit: 0,
      credit: 15000,
      balance: 465000,
    },
    {
      id: 3,
      date: "14 Jan, 2026",
      details: "Mjolnir Maintenance",
      debit: 75000,
      credit: 0,
      balance: 390000,
    },
    {
      id: 4,
      date: "15 Jan, 2026",
      details: "Shield Training Revenue",
      debit: 0,
      credit: 20000,
      balance: 410000,
    },
    {
      id: 5,
      date: "16 Jan, 2026",
      details: "Batmobile Upgrade",
      debit: 90000,
      credit: 0,
      balance: 320000,
    },
    {
      id: 6,
      date: "17 Jan, 2026",
      details: "Ninja Mission Reward",
      debit: 0,
      credit: 50000,
      balance: 370000,
    },
    {
      id: 7,
      date: "18 Jan, 2026",
      details: "Nichirin Sword Forging",
      debit: 30000,
      credit: 0,
      balance: 340000,
    },
    {
      id: 8,
      date: "19 Jan, 2026",
      details: "Titan Defense Reward",
      debit: 0,
      credit: 70000,
      balance: 410000,
    },
    {
      id: 9,
      date: "20 Jan, 2026",
      details: "ODM Gear Repair",
      debit: 40000,
      credit: 0,
      balance: 370000,
    },
    {
      id: 10,
      date: "21 Jan, 2026",
      details: "Jujutsu Mission Income",
      debit: 0,
      credit: 110000,
      balance: 480000,
    },
  ];

  return (
    <div className="">
      {/* <-------------====== Header ------------=======> */}
      <div className="bg-white mt-4 p-4 rounded-lg shadow-lg">
        {/* CALENDAR */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-fit">
            {/* BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 bg-[#244B5A] text-white px-4 py-2 rounded-lg"
            >
              <LuCalendarDays />
              <span>
                {range?.from && range?.to
                  ? `${format(range.from, "MMM dd, yyyy")} - ${format(range.to, "MMM dd, yyyy")}`
                  : "Select Date Range"}
              </span>
            </button>

            {/* CALENDAR */}
            {open && (
              <div className="absolute mt-2 bg-white p-4 rounded-xl shadow-xl z-50">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={1}
                  classNames={{
                    caption: "flex justify-between items-center mb-3",
                    caption_label: "font-semibold text-[16px]",
                    nav_button:
                      "h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-gray-100",
                    head_cell: "text-[12px] text-gray-500",
                    day: "h-9 w-9 rounded-full hover:bg-gray-100",
                    day_selected: "bg-[#244B5A] text-white hover:bg-[#244B5A]",
                    day_range_middle: "bg-[#cfe3ea]",
                    day_range_start: "bg-[#244B5A] text-white rounded-full",
                    day_range_end: "bg-[#244B5A] text-white rounded-full",
                  }}
                />
              </div>
            )}
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
          <div className="flex justify-between items-center gap-2">
            <div className="border border-[#949494] px-3 py-1.5 rounded-md">
              <span className="flex items-center gap-2 font-semibold lg:text-[14px] md:[12px] text-[10px] text-[#949494]">
                <FaRegCopy />
                Copy
              </span>
            </div>
            <div className="border border-[#A6DA95] px-3 py-1.5 rounded-md">
              <span className="font-semibold lg:text-[14px] md:[12px] text-[10px] flex items-center gap-2 text-[#A6DA95]">
                <LuFolderClosed />
                CSV
              </span>
            </div>
            <div className="border border-[#20744A] px-3 py-1.5 rounded-md">
              <span className="font-semibold lg:text-[14px] md:[12px] text-[10px] flex items-center gap-2 text-[#20744A]">
                <RiFileExcel2Line />
                Excel
              </span>
            </div>
            <div className="border border-[#EF5350] px-3 py-1.5 rounded-md">
              <span className="font-semibold lg:text-[14px] md:[12px] text-[10px] flex items-center gap-2 text-[#EF5350]">
                <BsFillFileEarmarkPdfFill />
                Pdf
              </span>
            </div>
            <div className="border border-[#007AFF] px-3 py-1.5 rounded-md">
              <span className="font-semibold lg:text-[14px] md:[12px] text-[10px] flex items-center gap-2 text-[#007AFF]">
                <IoPrintSharp />
                Print
              </span>
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
                <th className="hidden sm:table-cell px-3 py-2 sm:px-5 sm:py-4 text-left text-[14px] font-semibold text-[#1c1c1c] w-[40%]">
                  Details
                </th>

                <th className="px-3 py-2 sm:px-5 sm:py-4 text-left text-[12px] sm:text-[14px] font-semibold text-[#1c1c1c]">
                  Debt
                </th>

                <th className="px-3 py-2 sm:px-5 sm:py-4 text-left text-[12px] sm:text-[14px] font-semibold text-[#1c1c1c]">
                  Credit
                </th>

                <th className="px-3 py-2 sm:px-5 sm:py-4 text-left text-[12px] sm:text-[14px] font-semibold text-[#1c1c1c]">
                  Net Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {expensesData.map((item, index) => (
                <tr key={index} className="border-b border-[#e6e6e6]">
                  <td className="px-3 py-2 sm:px-4 sm:py-3 text-[#1c1c1c] lg:text-[14px] md:text-[12px] text-[10px] font-normal">
                    {item.date}
                  </td>

                  {/* BASIC */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 text-[12px] sm:text-[14px] text-[#1c1c1c] lg:text-[14px] md:text-[12px] text-[10px] font-normal">
                    {item.details}
                  </td>

                  {/* HRA */}
                  <td className="hidden sm:table-cell px-4 py-3 text-[14px] text-[#1c1c1c] lg:text-[14px] md:text-[12px] text-[10px] font-normal">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[#DC2626]">- ₹</span>
                      <span>{item.debit}</span>
                    </div>
                  </td>

                  {/* DEDUCTION */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 text-[12px] sm:text-[14px] text-[#1c1c1c] lg:text-[14px] md:text-[12px] text-[10px] font-normal">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[#009638]">+ ₹</span>
                      <span>{item.credit}</span>
                    </div>
                  </td>

                  {/* NET SALARY */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 text-[12px] sm:text-[14px] font-semibold text-[#118AB2] lg:text-[14px] md:text-[12px] text-[10px] font-normal">
                    ₹ {item.balance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>

      {showAddExpensesType && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-6"
          onClick={() => setShowAddExpensesType(false)}
        >
          <div
            className="bg-white w-full max-w-lg sm:max-w-2xl lg:max-w-4xl rounded-xl shadow-lg relative p-4 sm:p-6 max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2 sm:gap-1">
                <span className="text-[#1C1C1C] sm:text-[14px] text-18px font-semibold">
                  Record New Expenses
                </span>
                <span className="text-[#9C9C9C] sm:text-[14px] text-16px font-semibold">
                  Add a new expenses transaction to the system
                </span>
              </div>
              <div>
                <button
                  onClick={() => setShowAddExpensesType(false)}
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
                    Expenses Head
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
                    <option value="">Select Expense Head</option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-[#696969] font-medium text-[14px] ">
                    Expenses Name
                  </label>
                  <span className="text-[#DC2626] text-[14px]">*</span>
                </div>
                <input
                  type="text"
                  placeholder="Salary"
                  className="w-full border border-[#9C9C9C] rounded-md px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5 outline-none focus:ring-[#9C9C9C]"
                />
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
                onClick={() => setShowAddExpensesType(false)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-[12px] sm:text-[14px] lg:text-[16px] text-[#696969] font-semibold border border-[#9C9C9C] rounded-lg"
              >
                Cancel
              </button>

              {/* Create Button */}
              <button
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-[12px] sm:text-[14px] lg:text-[16px] 
                bg-[#0B3142] text-white font-semibold border border-[#0B3142] rounded-lg"
              >
                Add Expenses
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accounts;
