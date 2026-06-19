import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

function TransferCertificateDeleteModal({
  isOpen,
  tcNo,
  studentName,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-[400px] rounded-[20px] bg-white px-8 py-10 shadow-[0px_8px_32px_rgba(0,0,0,0.12)] flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tc-delete-title"
      >
        <div className="relative mb-6 flex items-center justify-center">
          <span className="absolute -left-3 -top-1 size-1.5 rounded-full bg-[#D1D5DB]" />
          <span className="absolute -right-2 top-0 size-1 rounded-full bg-[#E5E7EB]" />
          <span className="absolute right-4 -top-3 size-1.5 rounded-full bg-[#D1D5DB]" />
          <span className="absolute -left-4 top-2 size-1 rounded-full bg-[#E5E7EB]" />
          <RiDeleteBin5Line
            className="text-[#EF4444]"
            size={56}
            aria-hidden="true"
          />
        </div>

        <h2
          id="tc-delete-title"
          className="text-[18px] sm:text-[20px] font-bold text-[#1C1C1C] leading-snug m-0 mb-3"
        >
          Confirm Transfer Certificate Deletion?
        </h2>

        <p className="text-[14px] sm:text-[15px] font-normal text-[#696969] leading-relaxed m-0 mb-8 max-w-[320px]">
          Are you sure you want to delete transfer certificate #{tcNo} for{" "}
          <span className="font-semibold text-[#1C1C1C]">{studentName}</span>?
          This action cannot be undone.
        </p>

        <div className="flex w-full items-center justify-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="min-w-[120px] flex-1 max-w-[150px] py-3 px-6 rounded-full border border-[#EF4444] bg-white text-[#EF4444] text-[15px] font-semibold leading-none hover:bg-red-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-w-[120px] flex-1 max-w-[150px] py-3 px-6 rounded-full bg-[#EF4444] text-white text-[15px] font-semibold leading-none hover:bg-[#DC2626] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransferCertificateDeleteModal;
