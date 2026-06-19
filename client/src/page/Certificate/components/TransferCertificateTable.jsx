import React from "react";
import Pagination from "../../../components/Pagination";
import TransferCertificateTableRow from "./TransferCertificateTableRow";

function TransferCertificateTable({
  rows,
  total,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  onView,
  onEdit,
  onDelete,
}) {
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  return (
    <div className="w-full border border-[#E6E6E6] rounded-lg overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[960px]">
          <thead className="bg-[#F5F7F7] border-b border-[#E6E6E6]">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#1C1C1C]">
                T C No.
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#1C1C1C]">
                Student
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#1C1C1C]">
                Father Name
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#1C1C1C]">
                Last Studies Class
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#1C1C1C]">
                Issue Date
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#1C1C1C]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TransferCertificateTableRow
                  key={row.id}
                  row={row}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-[14px] text-[#696969]"
                >
                  No transfer certificates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {total > 0 && (
        <Pagination
          currentPage={currentPage}
          total={total}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) =>
            onPageChange(Math.min(Math.max(1, page), totalPages))
          }
          onItemsPerPageChange={onItemsPerPageChange}
        />
      )}
    </div>
  );
}

export default TransferCertificateTable;
