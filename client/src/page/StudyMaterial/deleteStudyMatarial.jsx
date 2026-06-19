import React from "react";


function deleteStudyMatarial({ title, nameKey, Cancel, onConfirm, data }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 pb-1  border-gray-100">
          <h2 className="text-[20px] font-semibold text-[#1C1C1C]">
            {title || "Delete Confirmation"}
          </h2>
          
        </div>

        {/* Content */}
        <div className="p-3  pr-2">
          <p className="text-[16px] text-[#696969] font-normal text-start">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#1C1C1C]">
              {data?.[nameKey] || "this item"}
            </span>
       
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 pt-0">
          <button
            onClick={Cancel}
            className="px-6 py-2 rounded-lg border border-[#9C9C9C] bg-[#FFFFFF] text-[16px] font-semibold text-[#1C1C1C] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={()=>onConfirm(data)}
            className="px-6 py-2 rounded-lg bg-[#D62626] text-white text-[16px] font-normal hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default deleteStudyMatarial;