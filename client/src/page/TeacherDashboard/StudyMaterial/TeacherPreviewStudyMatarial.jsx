import React, { useState } from "react";
import {
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const TeacherPreviewStudyMaterial = ({ data, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  if (!data) return null;

  // SUPPORT SINGLE + MULTIPLE FILES
  const files =
    data.files && data.files.length > 0
      ? data.files
      : data.url
        ? [
          {
            url: data?.files?.[0]?.url || "link",
            name: data.title,
          },
        ]
        : [];

  const currentFile = files[currentFileIndex];

  const hasPrevFile = currentFileIndex > 0;
  const hasNextFile = currentFileIndex < files.length - 1;

  // DOWNLOAD
  // const handleDownload = () => {
  //   if (data.type === "Link") {
  //     window.open(data.url, "_blank");
  //     return;
  //   }

  //   files.forEach((file) => {
  //     const link = document.createElement("a");

  //     link.href = file.url;
  //     link.download = file.name || "file";

  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   });
  // };
  const handleDownload = async (fileUrl, fileName) => {
    // console.log(fileUrl,fileName)
  try {
    const response = await fetch(fileUrl);

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = fileName || "download";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

  const typeConfig = {
    Document: {
      label: "Document",
      icon: <FileText className="text-[#1447E6]" size={20} />,
      badge:
        "flex items-center justify-center w-[74px] h-[22px] gap-[4px] px-[8px] py-[4px] rounded-[8px] border border-[#1447E6]/25 bg-[#1447E6]/15 text-[#1447E6] text-[10px] font-medium",
    },

    Image: {
      label: "Image",
      icon: <ImageIcon className="text-green-600" size={20} />,
      badge:
        "bg-[#00823626] text-[#008236] border border-[#00823640] rounded-[12px] px-2 py-1 text-[10px] font-normal",
    },

    "Link": {
      label: "Link",
      icon: <ExternalLink className="text-[#8200DB]" size={20} />,
      badge:
        "flex items-center justify-center w-[85px] h-[22px] gap-[4px] px-[8px] py-[4px] rounded-[8px] border border-[#8200DB]/25 bg-[#8200DB]/15 text-[#8200DB] text-[10px] font-medium",
    },
  };

  const currentType = typeConfig[data.type];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/30"
      onClick={onClose}
    >
      {/* PANEL */}
      <div
        className="w-full sm:w-[520px] md:w-[650px] h-full bg-white shadow-xl p-6 overflow-y-auto scrollbar-hide flex flex-col transform translate-x-0 transition-transform duration-500 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
     <div className=" overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {/* HEADER */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#F9FAFB]">
            {currentType?.icon}
          </div>

          <div className="flex-1">
            <h2 className="text-[18px] font-semibold text-[#101828]">
              {data.title}
            </h2>

            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-1 text-xs rounded-md font-medium ${currentType?.badge}`}
              >
                {currentType?.label}
              </span>

              <span className="text-[#6A7282] font-normal text-[14px]">
                {data.class} • {data.subject}
              </span>
            </div>
          </div>
        </div>

        {/* DOWNLOAD BUTTON */}
        {data.type !== "Link" && (
          <button
            onClick={()=>handleDownload(data?.files?.[currentFileIndex]?.url,data?.files?.[currentFileIndex].fileName)}
            className="flex items-center justify-center w-29 h-7 gap-2 px-4 py-2 bg-[#0B3142] text-white text-[14px] font-semibold rounded-[6px] transition-all hover:bg-[#082633] mb-6"
          >
            <Download size={22} />

            <span className="leading-none font-semibold text-[14px]">
              Download
            </span>
          </button>
        )}

        {/* DESCRIPTION */}
        <div className="mb-5">
          <h3 className="font-semibold text-[14px] boarder-t text-[#364153] mb-1">
            Description
          </h3>

          <p className="text-[14px] pl-2 font-normal text-[#4A5565]">
            {data.description}
          </p>
        </div>

        {/* PREVIEW */}
        <div className="mb-6">
          <h3 className="font-semibold text-[14px] text-[#364153] mb-2">
            Preview
          </h3>

          {/* IMAGE */}
          {data.type === "Image" && currentFile && (
            <div className="relative border rounded-lg overflow-hidden flex items-center justify-center bg-[#F8F9FB] min-h-[400px]">

              {/* LEFT ARROW */}
              {files.length > 1 && hasPrevFile && (
                <button
                  onClick={() => {
                    setCurrentFileIndex((prev) => prev - 1);
                    setZoom(1);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-[#1C1C1C] rounded-full shadow-md transition-all"
                >
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </button>
              )}

              {/* IMAGE */}
              <img
                src={currentFile.url}
                alt="preview"
                style={{ transform: `scale(${zoom})` }}
                className="w-full h-full object-contain transition-transform duration-300"
              />

              {/* RIGHT ARROW */}
              {files.length > 1 && hasNextFile && (
                <button
                  onClick={() => {
                    setCurrentFileIndex((prev) => prev + 1);
                    setZoom(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-[#1C1C1C] rounded-full shadow-md transition-all"
                >
                  <ChevronRight size={22} strokeWidth={2.5} />
                </button>
              )}
            </div>
          )}
          {/* DOCUMENT */}
          {data.type === "Document" && currentFile && (
            <div className="mt-4">
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-[#E6E6E6] bg-[#F3F4F6]">

                {/* LEFT ARROW */}
                {/* LEFT ARROW */}
                {files.length > 1 && hasPrevFile && (
                  <button
                    onClick={() =>
                      setCurrentFileIndex((prev) => prev - 1)
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-[#1C1C1C] rounded-full shadow-md transition-all"
                  >
                    <ChevronLeft size={22} strokeWidth={2.5} />
                  </button>
                )}

                {/* PDF */}
                <iframe
                  src={`${currentFile.url}#toolbar=0&navpanes=0&scrollbar=0`}
                  title="pdf-preview"
                  className="w-full h-full blur-[1px] opacity-40 pointer-events-none scale-105"
                />

                {/* CENTER BUTTON */}
                <div
                  onClick={() =>
                    window.open(currentFile.url, "_blank")
                  }
                  className="absolute inset-0 flex items-center justify-center bg-black/5 cursor-pointer group"
                >
                  <div
                    className="flex items-center gap-2 bg-white shadow-lg border border-[#E6E6E6] transform transition-transform group-hover:scale-110"
                    style={{
                      width: "150px",
                      height: "32px",
                      borderRadius: "8px",
                      padding: "5px 11px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ZoomIn
                      size={16}
                      className="text-[#101828]"
                    />

                    <span className="text-[14px] font-normal text-[#1C1C1C]">
                      Open Full View
                    </span>
                  </div>
                </div>

                {/* RIGHT ARROW */}
             
                {files.length > 1 && hasNextFile && (
                  <button
                    onClick={() =>
                      setCurrentFileIndex((prev) => prev + 1)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-[#1C1C1C] rounded-full shadow-md transition-all"
                  >
                    <ChevronRight size={22} strokeWidth={2.5} />
                  </button>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-white/80 to-transparent pointer-events-none"></div>
              </div>
            </div>
          )}

          {/* EXTERNAL LINK */}
          {data.type === "Link" && (
            <div className="w-full p-6 border border-[#E5E7EB] rounded-[10px] bg-[linear-gradient(to_right,#FAF5FF,#EFF6FF)] flex gap-4">
              <div className="flex-shrink:0 w-12 h-12 flex items-center justify-center bg-[#F5F0FF] rounded-lg">
                <ExternalLink className="text-[#8200DB]" size={24} />
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-[16px] text-[#101828]">
                  External Resource
                </h2>

                <p className="text-[14px] text-[#4A5565] font-normal mb-3">
                  {data.files?.[0]?.url}
                </p>

                <button
                  onClick={() =>
                    window.open(data.files?.[0]?.url, "_blank")
                  }
                  className="flex items-center justify-center gap-2 w-fit px-5 py-2.5 bg-[#0B3142] text-white rounded-lg font-semibold transition-all hover:opacity-90"
                >
                  <ExternalLink size={18} />
                  Open in New Tab
                </button>
              </div>
            </div>
          )}

          {/* ZOOM BUTTONS */}
          <div className="flex gap-3 mt-3">
            {data.type === "Image" && (
              <>
                <button
                  onClick={() =>
                    setZoom(Math.min(zoom + 0.1, 2))
                  }
                  className={`w-1/2 flex items-center justify-center gap-2 border py-2 rounded-md transition-colors ${zoom >= 2
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-50"
                    }`}
                  disabled={zoom >= 2}
                >
                  <ZoomIn size={16} />
                  Zoom In
                </button>

                <button
                  onClick={() =>
                    setZoom(Math.max(1, zoom - 0.1))
                  }
                  className={`w-1/2 flex items-center justify-center gap-2 border py-2 rounded-md transition-colors ${zoom <= 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-50"
                    }`}
                  disabled={zoom <= 1}
                >
                  <ZoomOut size={16} />
                  Zoom Out
                </button>
              </>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-2 mt-2">
          <div className="flex justify-between">
            <span className="text-[#696969] font-normal text-[14px]">
              Uploaded By
            </span>

            <span className="text-[14px] font-normal text-[#1C1C1C]">
              {data.uploadedBy}
            </span>
          </div>

          <div className="flex justify-between mt-1">
            <span className="text-[#696969] font-normal text-[14px]">
              Upload Date
            </span>

            <span className="text-[14px] font-normal text-[#1C1C1C]">
              {data.uploadDate}
            </span>
          </div>

          <div className="flex justify-between mt-1">
            <span className="text-[#696969] font-normal text-[14px]">
              File Size
            </span>

            <span className="text-[14px] font-normal text-[#1C1C1C]">
              {data?.files?.[currentFileIndex].fileSize}
            </span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPreviewStudyMaterial;