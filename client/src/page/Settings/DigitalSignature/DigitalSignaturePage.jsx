import React, { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Upload, Pencil, Loader2, Save } from "lucide-react";
import api from "../../../config/axiosInstance";
import SignatureUpload from "./SignatureUpload";
import SignatureCanvas from "./SignatureCanvas";
import SignaturePreview from "./SignaturePreview";

const DigitalSignaturePage = () => {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState("upload"); // "upload" or "draw"
  const [isReplacing, setIsReplacing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const canvasRef = useRef(null);

  // Fetch current signature
  const { data: signature, isLoading } = useQuery({
    queryKey: ["digital-signature"],
    queryFn: async () => {
      const res = await api.get("/digital-signature");
      return res.data.data;
    },
  });

  // Save signature mutation
  const saveMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("signature", file);
      const res = await api.post("/digital-signature", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Signature saved successfully");
      queryClient.invalidateQueries({ queryKey: ["digital-signature"] });
      setIsReplacing(false);
      setSelectedFile(null);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to upload signature. Please try again."
      );
    },
  });

  // Delete signature mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await api.delete("/digital-signature");
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Signature deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["digital-signature"] });
      setIsReplacing(false);
      setSelectedFile(null);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete signature. Please try again."
      );
    },
  });

  const handleSave = async () => {
    if (mode === "upload") {
      if (!selectedFile) {
        toast.error("Please draw a signature or upload a file before saving.");
        return;
      }
      saveMutation.mutate(selectedFile);
    } else {
      // Draw mode — get blob from canvas ref
      try {
        const blob = await canvasRef.current.getBlob();
        saveMutation.mutate(blob);
      } catch {
        // Error is already handled inside getBlob (shows toast)
      }
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleReplace = () => {
    setIsReplacing(true);
  };

  const handleCancelReplace = () => {
    setIsReplacing(false);
    setSelectedFile(null);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const isSaving = saveMutation.isPending;

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="mt-6 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#1C1C1C] mb-4">
          Digital Signature
        </h2>
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-8 h-8 animate-spin text-[#007AFF]" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold text-[#1C1C1C] mb-4">
        Digital Signature
      </h2>

      {signature && !isReplacing ? (
        // Show preview when signature exists and not replacing
        <SignaturePreview
          signature={signature}
          onDelete={handleDelete}
          onReplace={handleReplace}
          isDeleting={deleteMutation.isPending}
          isSaving={isSaving}
        />
      ) : (
        // Show upload/draw UI when no signature exists or replacing
        <div>
          {/* Cancel replace button */}
          {isReplacing && (
            <button
              onClick={handleCancelReplace}
              className="mb-4 text-sm text-[#696969] hover:text-[#1C1C1C] transition-colors"
            >
              ← Back to preview
            </button>
          )}
          {/* Mode toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode("upload")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "upload"
                  ? "bg-[#0B3142] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Upload size={16} />
              Upload
            </button>
            <button
              onClick={() => setMode("draw")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "draw"
                  ? "bg-[#0B3142] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Pencil size={16} />
              Draw
            </button>
          </div>

          {/* Content based on mode */}
          {mode === "upload" ? (
            <SignatureUpload
              onFileSelect={handleFileSelect}
            />
          ) : (
            <SignatureCanvas
              ref={canvasRef}
            />
          )}

          {/* Save button */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#0B3142] rounded-lg hover:bg-[#0a2935] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalSignaturePage;
