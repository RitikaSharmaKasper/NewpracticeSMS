import React from "react";
import { FiEye, FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { transferCertificateAvatars } from "./transferCertificateAvatars";

function TransferCertificateTableRow({ row, onView, onEdit, onDelete }) {
  const avatarSrc =
    row.avatar || transferCertificateAvatars[row.avatarIndex ?? 0];
  return (
    <tr className="border-b border-[#E6E6E6] last:border-b-0 hover:bg-[#FAFAFA]">
      <td className="px-5 py-4 text-left text-sm font-semibold text-[#1C1C1C]">
        {row.tcNo}
      </td>
      <td className="px-5 py-4 text-left text-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#E6E6E6]">
            <img
              src={avatarSrc}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="font-semibold text-[#12516E]">{row.studentName}</span>
            <span className="text-[12px] text-[#696969] mt-1">{row.studentId}</span>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 text-left text-sm font-semibold text-[#1C1C1C]">
        {row.fatherName}
      </td>
      <td className="px-5 py-4 text-left text-sm font-semibold text-[#1C1C1C]">
        {row.lastStudiesClass}
      </td>
      <td className="px-5 py-4 text-left text-sm font-semibold text-[#1C1C1C]">
        {row.issuedDate}
      </td>
      <td className="px-5 py-4 text-left text-sm font-semibold">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onView(row)}
            className="text-[#9C9C9C] hover:text-[#0B3142] transition-colors"
            title="View"
          >
            <FiEye size={22} />
          </button>
          <button
            type="button"
            onClick={() => onEdit(row)}
            className="text-[#9C9C9C] hover:text-[#0B3142] transition-colors"
            title="Edit"
          >
            <FiEdit size={22} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(row)}
            className="text-[#FF4B4B] hover:text-red-700 transition-colors"
            title="Delete"
          >
            <RiDeleteBin5Line size={22} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TransferCertificateTableRow;
