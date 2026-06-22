import React from "react";

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
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Salary Slips</h1>
      <p className="mt-1 text-gray-600">
        View and manage salary slips for all employees
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Month</th>
              <th className="p-3 text-left">Payable Days</th>
              <th className="p-3 text-left">Salary</th>
              <th className="p-3 text-left">Bonus</th>
              <th className="p-3 text-left">Incentive</th>
              <th className="p-3 text-left">Arrear Pay</th>
              <th className="p-3 text-left">Advance Pay</th>
              <th className="p-3 text-left">ESI</th>
              <th className="p-3 text-left">PF</th>
              <th className="p-3 text-left">TDS</th>
              <th className="p-3 text-left">Reimbursement</th>
              <th className="p-3 text-left">Final Salary</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {salarySlips.map((slip) => (
              <tr
                key={slip.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{slip.year}</td>
                <td className="p-3">{slip.month}</td>
                <td className="p-3">{slip.totalPayableDays}</td>
                <td className="p-3">₹{slip.actualTotalSalary}</td>
                <td className="p-3">₹{slip.bonusAmount}</td>
                <td className="p-3">₹{slip.incentiveAmount}</td>
                <td className="p-3">₹{slip.arrearAmountPay}</td>
                <td className="p-3">₹{slip.advanceAmountPay}</td>
                <td className="p-3">₹{slip.esiDeduction}</td>
                <td className="p-3">₹{slip.pfDeduction}</td>
                <td className="p-3">₹{slip.tdsDeduction}</td>
                <td className="p-3">₹{slip.reimbursementApproved}</td>
                <td className="p-3">
                  ₹{slip.salaryAfterReimbursement}
                </td>

                <td className="p-3">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {slip.status}
                  </span>
                </td>

                <td className="p-3">
                  <button className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherSalary;