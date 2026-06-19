/**
 * Shared preview chrome — Back link, Download/Print actions, loading state.
 */
import React from "react";
import { Link } from "react-router-dom";
import { IoChevronBack, IoPrintOutline } from "react-icons/io5";
import { GrDownload } from "react-icons/gr";

export default function CertificatePreviewLayout({
  backPath,
  backState,
  certificateRef,
  isDownloading,
  onDownload,
  onPrint,
  children,
}) {
  return (
    <div className="print-container flex flex-col gap-4 w-full">
      <Link
        to={backPath}
        state={backState}
        className="certificate-preview-chrome flex items-center gap-2 text-[#696969] text-[24px] font-semibold leading-none print:hidden w-fit"
      >
        <IoChevronBack size={24} />
        Back
      </Link>

      <div className="bg-white rounded-[16px] p-4 shadow-[0px_0px_4px_rgba(0,0,0,0.15)] flex flex-col gap-4 items-center w-full print:shadow-none print:p-0 print:bg-transparent">
        <div className="certificate-preview-chrome flex gap-6 w-full print:hidden">
          <button
            type="button"
            onClick={onDownload}
            disabled={isDownloading}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0B3142] text-white rounded-[8px] text-[16px] font-semibold leading-none disabled:opacity-50"
          >
            <GrDownload size={16} />
            {isDownloading ? "Downloading..." : "Download"}
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#9C9C9C] text-[#696969] rounded-[8px] text-[16px] font-semibold leading-none"
          >
            <IoPrintOutline size={16} />
            Print
          </button>
        </div>

        <div
          ref={certificateRef}
          className="certificate-pdf-root bg-white rounded-[16px] shadow-[0px_0px_8px_rgba(0,0,0,0.15)] w-full max-w-[920px] print:shadow-none"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function CertificateLoadingState() {
  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B3142] mx-auto" />
        <p className="mt-4 text-[#696969]">Loading certificate...</p>
      </div>
    </div>
  );
}

async function waitForImage(img) {
  if (img.complete && img.naturalWidth > 0) return;
  await new Promise((resolve) => {
    img.onload = resolve;
    img.onerror = resolve;
  });
}

/** Inline watermark as data URL so html2canvas always paints it in PDF */
async function inlineWatermarkForCapture(element) {
  const img = element.querySelector(".certificate-watermark-layer img");
  if (!img) return () => {};

  const originalSrc = img.getAttribute("src") || img.src;
  await waitForImage(img);

  try {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d").drawImage(img, 0, 0);
    img.src = canvas.toDataURL("image/png");
  } catch {
    // keep bundled asset src
  }

  return () => {
    img.src = originalSrc;
  };
}

function measureWatermarkBox(root) {
  const layer = root.querySelector(".certificate-watermark-layer");
  if (!layer) return null;

  const rootRect = root.getBoundingClientRect();
  const layerRect = layer.getBoundingClientRect();

  return {
    top: layerRect.top - rootRect.top,
    left: layerRect.left - rootRect.left,
    width: layerRect.width,
    height: layerRect.height,
  };
}

function applyWatermarkBox(layer, box) {
  if (!layer || !box) return;

  layer.style.position = "absolute";
  layer.style.top = `${box.top}px`;
  layer.style.left = `${box.left}px`;
  layer.style.width = `${box.width}px`;
  layer.style.height = `${box.height}px`;
  layer.style.right = "auto";
  layer.style.bottom = "auto";
  layer.style.display = "flex";
  layer.style.alignItems = "center";
  layer.style.justifyContent = "center";
  layer.style.zIndex = "0";
  layer.style.overflow = "visible";
}

function getContainedImageSize(box, naturalWidth, naturalHeight) {
  if (!naturalWidth || !naturalHeight) {
    return { width: box.width, height: box.height };
  }

  const scale = Math.min(box.width / naturalWidth, box.height / naturalHeight);
  return {
    width: Math.round(naturalWidth * scale),
    height: Math.round(naturalHeight * scale),
  };
}

function backupInlineStyles(el) {
  return {
    width: el.style.width,
    height: el.style.height,
    maxWidth: el.style.maxWidth,
    maxHeight: el.style.maxHeight,
    objectFit: el.style.objectFit,
    opacity: el.style.opacity,
    filter: el.style.filter,
    display: el.style.display,
    flexShrink: el.style.flexShrink,
  };
}

function restoreInlineStyles(el, backup) {
  if (!el || !backup) return;
  Object.entries(backup).forEach(([key, value]) => {
    el.style[key] = value;
  });
}

/** html2canvas ignores object-fit — set exact px size to keep aspect ratio */
function applyWatermarkImageStyles(img, box, naturalWidth, naturalHeight) {
  if (!img || !box) return;

  const nw = naturalWidth || img.naturalWidth;
  const nh = naturalHeight || img.naturalHeight;
  const { width, height } = getContainedImageSize(box, nw, nh);

  img.style.width = `${width}px`;
  img.style.height = `${height}px`;
  img.style.maxWidth = "none";
  img.style.maxHeight = "none";
  img.style.objectFit = "fill";
  img.style.opacity = "0.11";
  img.style.filter = "grayscale(100%)";
  img.style.display = "block";
  img.style.flexShrink = "0";
}

function lockWatermarkLayout(root) {
  const layer = root.querySelector(".certificate-watermark-layer");
  const img = layer?.querySelector("img");
  const box = measureWatermarkBox(root);
  if (!layer || !box) return { box: null, restore: () => {} };

  const layerBackup = {
    top: layer.style.top,
    right: layer.style.right,
    bottom: layer.style.bottom,
    left: layer.style.left,
    width: layer.style.width,
    height: layer.style.height,
    display: layer.style.display,
    alignItems: layer.style.alignItems,
    justifyContent: layer.style.justifyContent,
    overflow: layer.style.overflow,
  };
  const imgBackup = img ? backupInlineStyles(img) : null;
  const naturalWidth = img?.naturalWidth || 0;
  const naturalHeight = img?.naturalHeight || 0;

  applyWatermarkBox(layer, box);
  if (img) applyWatermarkImageStyles(img, box, naturalWidth, naturalHeight);

  return {
    box,
    naturalWidth,
    naturalHeight,
    restore: () => {
      Object.entries(layerBackup).forEach(([key, value]) => {
        layer.style[key] = value;
      });
      restoreInlineStyles(img, imgBackup);
    },
  };
}

function syncClonedWatermark(clonedRoot, sourceRoot, box, naturalWidth, naturalHeight) {
  const clonedLayer = clonedRoot.querySelector(".certificate-watermark-layer");
  if (!clonedLayer || !box) return;

  applyWatermarkBox(clonedLayer, box);

  const sourceImg = sourceRoot.querySelector(".certificate-watermark-layer img");
  const clonedImg = clonedLayer.querySelector("img");
  if (!clonedImg) return;

  if (sourceImg?.src) clonedImg.src = sourceImg.src;
  applyWatermarkImageStyles(clonedImg, box, naturalWidth, naturalHeight);
}

/** Hide preview chrome while capturing PDF; always restore it if capture fails. */
export async function downloadCertificatePdf(element, fileName) {
  const { default: jsPDF } = await import("jspdf");
  const html2canvas = await import("html2canvas");
  const hideEls = document.querySelectorAll(
    ".certificate-preview-chrome, .bonafide-preview-chrome"
  );
  hideEls.forEach((el) => {
    el.style.visibility = "hidden";
  });

  const prevOverflow = element.style.overflow;
  element.style.overflow = "visible";

  let canvas;
  try {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const restoreWatermark = await inlineWatermarkForCapture(element);
    const { box, naturalWidth, naturalHeight, restore: restoreLayout } =
      lockWatermarkLayout(element);
    const captureWidth = element.offsetWidth;
    const captureHeight = element.offsetHeight;

    try {
      canvas = await html2canvas.default(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        onclone: (_clonedDoc, clonedElement) => {
          clonedElement.style.overflow = "visible";
          syncClonedWatermark(
            clonedElement,
            element,
            box,
            naturalWidth,
            naturalHeight
          );
        },
      });
    } finally {
      restoreLayout();
      restoreWatermark();
    }
  } finally {
    hideEls.forEach((el) => {
      el.style.visibility = "";
    });
    element.style.overflow = prevOverflow;
  }

  const imgData = canvas.toDataURL("image/png");
  const pdfWidthMm = 210;
  const pdfHeightMm = (canvas.height * pdfWidthMm) / canvas.width;
  const pdf = new jsPDF({
    orientation: pdfWidthMm > pdfHeightMm ? "landscape" : "portrait",
    unit: "mm",
    format: [pdfWidthMm, pdfHeightMm],
  });
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidthMm, pdfHeightMm, undefined, "FAST");
  pdf.save(fileName);
}
