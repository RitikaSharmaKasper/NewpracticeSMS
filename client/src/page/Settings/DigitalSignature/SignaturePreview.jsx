import React, { useState } from "react";
import { Trash2, RefreshCw, Loader2 } from "lucide-react";

const SignaturePreview = ({ signature, onDelete, onReplace, isDeleting, isSaving }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const isLoading = isDeleting || isSaving;

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirm(false);
    onDelete();
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="w-full">
      {/* Signature image preview */}
      <div className="border border-[#E6E6E6] rounded-lg p-4 bg-white">
        <p className="text-[14px] text-[#1c1c1c] font-medium mb-3">
          Current Signature
        </p>
        <div className="flex items-center justify-center bg-[#F9FAFB] rounded-md p-6 border border-[#E6E6E6]">
          <img
            src={signature?.imageUrl}
            alt="Saved signature"
            className="max-h-[120px] w-auto object-contain"
          />
        </div>
        {signature?.updatedAt && (
          <p className="text-[12px] text-[#696969] mt-2">
            Last updated: {new Date(signature.updatedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={onReplace}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#0B3142] rounded-lg hover:bg-[#0a2935] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <RefreshCw size={16} />
          )}
          Replace
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#DC2626] rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Trash2 size={16} />
          )}
          Delete
        </button>
      </div>

      {/* Delete confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-999">
          <div className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-[#1C1C1C]">
              Delete Signature
            </h3>
            <p className="text-[14px] text-[#696969]">
              Are you sure you want to delete the saved signature? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-[#9C9C9C] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-[#DC2626] rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignaturePreview;
