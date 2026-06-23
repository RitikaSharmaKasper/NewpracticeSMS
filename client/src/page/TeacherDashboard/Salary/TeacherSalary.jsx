import React from "react";
import { GoDownload } from "react-icons/go";
import { FaRegEye } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Pagination from "../../../components/Pagination";

const TeacherSalary = () => {
  const salarySlips = [
    {
      id: 1,
      year: 2026,
      month: "June",
      totalPayableDays: 31,
      actualTotalSalary: 22000,
      bonusAmount: 1000,
      incentiveAmount: 500,
      arrearAmountPay: 0,
      advanceAmountPay: 0,
      esiDeduction: 200,
      pfDeduction: 1800,
      tdsDeduction: 0,
      reimbursementApproved: 1000,
      salaryAfterReimbursement: 22500,
      status: "Paid",
    },
    {
      id: 2,
      year: 2026,
      month: "June",
      totalPayableDays: 31,
      actualTotalSalary: 22000,
      bonusAmount: 1000,
      incentiveAmount: 500,
      arrearAmountPay: 0,
      advanceAmountPay: 0,
      esiDeduction: 200,
      pfDeduction: 1800,
      tdsDeduction: 0,
      reimbursementApproved: 1000,
      salaryAfterReimbursement: 22500,
      status: "Processed",
    },
    {
      id: 2,
      year: 2026,
      month: "June",
      totalPayableDays: 31,
      actualTotalSalary: 22000,
      bonusAmount: 1000,
      incentiveAmount: 500,
      arrearAmountPay: 0,
      advanceAmountPay: 0,
      esiDeduction: 200,
      pfDeduction: 1800,
      tdsDeduction: 0,
      reimbursementApproved: 1000,
      salaryAfterReimbursement: 22500,
      status: "Processed",
    },
    {
      id: 2,
      year: 2026,
      month: "June",
      totalPayableDays: 31,
      actualTotalSalary: 22000,
      bonusAmount: 1000,
      incentiveAmount: 500,
      arrearAmountPay: 0,
      advanceAmountPay: 0,
      esiDeduction: 200,
      pfDeduction: 1800,
      tdsDeduction: 0,
      reimbursementApproved: 1000,
      salaryAfterReimbursement: 22500,
      status: "Processed",
    },
    {
      id: 2,
      year: 2026,
      month: "June",
      totalPayableDays: 31,
      actualTotalSalary: 22000,
      bonusAmount: 1000,
      incentiveAmount: 500,
      arrearAmountPay: 0,
      advanceAmountPay: 0,
      esiDeduction: 200,
      pfDeduction: 1800,
      tdsDeduction: 0,
      reimbursementApproved: 1000,
      salaryAfterReimbursement: 22500,
      status: "Processed",
    },
    {
      id: 2,
      year: 2026,
      month: "June",
      totalPayableDays: 31,
      actualTotalSalary: 22000,
      bonusAmount: 1000,
      incentiveAmount: 500,
      arrearAmountPay: 0,
      advanceAmountPay: 0,
      esiDeduction: 200,
      pfDeduction: 1800,
      tdsDeduction: 0,
      reimbursementApproved: 1000,
      salaryAfterReimbursement: 22500,
      status: "Processed",
    },
    {
      id: 2,
      year: 2026,
      month: "June",
      totalPayableDays: 31,
      actualTotalSalary: 22000,
      bonusAmount: 1000,
      incentiveAmount: 500,
      arrearAmountPay: 0,
      advanceAmountPay: 0,
      esiDeduction: 200,
      pfDeduction: 1800,
      tdsDeduction: 0,
      reimbursementApproved: 1000,
      salaryAfterReimbursement: 22500,
      status: "Processed",
    },
  ];

  return (
    <div className="box-shadow bg-white rounded-2xl p-4">
      <h1 className="text-[18px] font-semibold text-[#1C1C1C]">Salary Slips</h1>
      <p className="text-[14px] sm:text-[16px] text-[#9C9C9C]">
        View and manage salary slips for all employees
      </p>

      <div className="border border-[#E6E6E6] rounded-[12px] w-full overflow-auto pt-4 pb-4 pl-4 pr-4 md:px-2 mx-0 md:mt-2 ml-0 mr-3 mb-2 ">
        <div className="overflow-x-auto">
          <table className="min-w-full  whitespace-nowrap">
            <thead className="text-[12px] md:text-[14px]">
              <tr className=" text-sm font-semibold text-gray-700 border-b border-[#d6dadd] gap-2">
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]  ">
                  Year
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                  Month
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                  Total Payable Days
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                  Actual Salary
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                  Bonus Amount
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                  Incentive Amount
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                  Arrear Amount Pay
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                  Advance Amount Pay
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                  ESI Deduction
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                  PF Deduction
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                  TDS Deduction
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                  Reimbursement Approved
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                  Salary After Reimbursement
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px] ">
                  Status
                </th>
                <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px] ">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {salarySlips.map((slip) => (
                <tr
                  key={slip.id}
                  className="border-b border-[#d6dadd] hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 text-[14px]">{slip.year}</td>
                  <td className="px-4 py-2 text-[14px]">{slip.month}</td>
                  <td className="px-4 py-2 text-[14px]">
                    {slip.totalPayableDays}
                  </td>
                  <td className="px-4 py-2 text-[14px]">
                    ₹{slip.actualTotalSalary}
                  </td>
                  <td className="px-4 py-2 text-[14px]">₹{slip.bonusAmount}</td>
                  <td className="px-4 py-2 text-[14px]">
                    ₹{slip.incentiveAmount}
                  </td>
                  <td className="px-4 py-2 text-[14px]">
                    ₹{slip.arrearAmountPay}
                  </td>
                  <td className="px-4 py-2 text-[14px]">
                    ₹{slip.advanceAmountPay}
                  </td>
                  <td className="px-4 py-2 text-[14px]">
                    ₹{slip.esiDeduction}
                  </td>
                  <td className="px-4 py-2 text-[14px]">₹{slip.pfDeduction}</td>
                  <td className="px-4 py-2 text-[14px]">
                    ₹{slip.tdsDeduction}
                  </td>
                  <td className="px-4 py-2 text-[14px]">
                    ₹{slip.reimbursementApproved}
                  </td>
                  <td className="px-4 py-2 text-[14px]">
                    ₹{slip.salaryAfterReimbursement}
                  </td>

                  <td className="px-4 py-2">
                    <span
                      className={` px-5 py-0.25 rounded-4px text-center inline-block font-semibold  w-[80px] h-[20px] text-xs font-semibold ${
                        slip.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : slip.status === "Processed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {slip.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <button className="flex items-center  px-4 py-2 gap-3 text-gray-500">
                      <FaRegEye size={18} />
                      <GoDownload size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default TeacherSalary;
