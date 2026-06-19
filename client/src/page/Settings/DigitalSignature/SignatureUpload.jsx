import React, { useRef, useState, useCallback } from "react";
import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

function SignatureUpload({ onFileSelect, error }) {
  const [preview, setPreview] = useState(null);
  const [localError, setLocalError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const displayError = error || localError;

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only PNG and JPEG files are allowed";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 2MB";
    }
    return null;
  };

  const handleFile = useCallback(
    (file) => {
      if (!file) return;

      setLocalError("");

      const validationError = validateFile(file);
      if (validationError) {
        setLocalError(validationError);
        setPreview(null);
        onFileSelect(null);
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleRemovePreview = () => {
    setPreview(null);
    setLocalError("");
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      {/* Drop zone / Upload area */}
      {!preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full rounded-md border-4 border-dashed px-4 py-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragging
              ? "border-[#0B3142] bg-[#F0F9FF]"
              : "border-[#118AB2] bg-white"
          }`}
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#118AB2]">
            <FiUpload size={28} />
          </div>

          {/* Text */}
          <p className="text-[16px] text-[#1c1c1c] mt-2 font-medium">
            Drag & Drop to upload or{" "}
            <span className="text-[#0B3142] font-semibold">Browse</span>
          </p>

          <p className="text-[14px] text-[#696969] mt-1">
            Only PNG and JPEG files are allowed (Max 2MB)
          </p>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={handleInputChange}
          />
        </div>
      ) : (
        /* Image preview */
        <div className="w-full border border-[#E6E6E6] rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[14px] text-[#1c1c1c] font-medium">
              Signature Preview
            </p>
            <button
              type="button"
              onClick={handleRemovePreview}
              className="text-[#DC2626] hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
              title="Remove"
            >
              <IoClose size={20} />
            </button>
          </div>
          <div className="flex items-center justify-center bg-[#F9FAFB] rounded-md p-4 border border-[#E6E6E6]">
            <img
              src={preview}
              alt="Signature preview"
              className="max-h-[120px] w-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* Error message */}
      {displayError && (
        <p className="text-[14px] text-[#DC2626] mt-2">{displayError}</p>
      )}
    </div>
  );
}

export default SignatureUpload;
