import React from 'react';

const DeleteBookModal = ({ isOpen, onClose, onConfirm, bookTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
        <div className="flex justify-between items-center p-4 pb-1 border-gray-100">
          <h2 className="text-[20px] font-semibold text-[#1C1C1C]">Delete Book</h2>
        </div>
        <div className="p-3 pr-2">
          <p className="text-[16px] text-[#696969] font-normal text-start">
            Are You Sure You Want to Delete the Book <span className="font-semibold text-[#1C1C1C]">{bookTitle}</span>?
          </p>
        </div>
        <div className="flex justify-end gap-3 p-6 pt-1">
          <button onClick={onClose}
            className="px-6 py-2 rounded-lg border border-[#9C9C9C] bg-[#FFFFFF] text-[16px] font-semibold text-[#1C1C1C] hover:bg-gray-50 transition-colors cursor-pointer">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-[#D62626] text-white text-[16px] font-normal hover:bg-red-600 transition-colors cursor-pointer">
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookModal;
