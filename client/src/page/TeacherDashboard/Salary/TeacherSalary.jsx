import React from "react";
import { GoDownload } from "react-icons/go";
import { FaRegEye } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import pagination from "../../../components/Pagination";
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
  ];

  return (
    <div className="box-shadow bg-white rounded-2xl p-4">
      <h1 className="text-[18px] font-semibold text-[#1C1C1C]">Salary Slips</h1>
      <p className="text-[14px] sm:text-[16px] text-[#9C9C9C]">
        View and manage salary slips for all employees
      </p>

      <div className="mt-6 rounded-lg border border-gray-200 ">
        <div className="overflow-x-auto">
        <table className="min-w-full  whitespace-nowrap">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr className="text-sm font-semibold text-gray-700">
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">Year</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">Month</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">Total Payable Days</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">Actual Salary</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">Bonus Amount</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">Incentive Amount</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">Arrear Amount Pay</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">Advance Amount Pay</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">ESI Deduction</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">PF Deduction</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">TDS Deduction</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">Reimbursement Approved</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px]">
                Salary After Reimbursement
              </th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px] ">Status</th>
              <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px] ">Action</th>
            </tr>
          </thead>

          <tbody>
            {salarySlips.map((slip) => (
              <tr
                key={slip.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{slip.year}</td>
                <td className="px-4 py-2">{slip.month}</td>
                <td className="px-4 py-2">{slip.totalPayableDays}</td>
                <td className="px-4 py-2">₹{slip.actualTotalSalary}</td>
                <td className="px-4 py-2">₹{slip.bonusAmount}</td>
                <td className="px-4 py-2">₹{slip.incentiveAmount}</td>
                <td className="px-4 py-2">₹{slip.arrearAmountPay}</td>
                <td className="px-4 py-2">₹{slip.advanceAmountPay}</td>
                <td className="px-4 py-2">₹{slip.esiDeduction}</td>
                <td className="px-4 py-2">₹{slip.pfDeduction}</td>
                <td className="px-4 py-2">₹{slip.tdsDeduction}</td>
                <td className="px-4 py-2">₹{slip.reimbursementApproved}</td>
                <td className="px-4 py-2">₹{slip.salaryAfterReimbursement}</td>

                <td className="px-4 py-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
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
                  <button className="flex items-center gap-3 text-gray-500">
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
        <Pagination/>
      </div>
    </div>
  );
};

export default TeacherSalary;
