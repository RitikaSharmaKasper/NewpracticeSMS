/** Shared dropdown styles for certificate filter forms (matches Figma 6620:275619). */

export const labelStyle =
  "block text-[14px] font-normal font-[400] text-[#1C1C1C] mb-1";

export const inputStyle =
  "w-full h-full border-0 outline-none bg-transparent text-[14px] text-[#1C1C1C] placeholder:text-[#696969]";

/** White content card — Figma 6620:275622 */
export const certificateCardClass =
  "bg-white rounded-[16px] p-4 shadow-[0px_0px_4px_rgba(0,0,0,0.15)] flex flex-col gap-9 w-full";

/** Primary action button — Figma Component 211 / 275657 */
export const certificatePrimaryButtonClass =
  "flex items-center justify-center gap-2 px-6 py-3 bg-[#0B3142] text-white rounded-[8px] text-[16px] font-semibold leading-none whitespace-nowrap shrink-0 hover:bg-[#15465c] transition-colors";

/**
 * Transfer Certificate create form — Figma 6620:275924
 * Snapshot rules:
 * - Labels ~30% width, fields ~70%
 * - Pupil static rows: gray fill, gray text, not editable
 * - Editable text/dropdowns: white fill + #E6E6E6 border (user can type)
 * - Readonly pupil rows only: gray fill, pointer-events none
 */
export const tcFormRowClass =
  "flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-x-8 py-2.5 w-full";
export const tcFormLabelWrapClass =
  "lg:w-[30%] shrink-0 min-h-[48px] flex items-center";
export const tcFormLabelClass =
  "m-0 p-0 text-[14px] font-normal text-[#1C1C1C] leading-normal w-full lg:pr-2";
export const tcFormControlWrapClass =
  "flex-1 min-w-0 min-h-[48px] flex items-center w-full";

/** Static pupil data — gray, no focus, no cursor (Name of Pupil, Mother, etc.) */
export const tcFormReadonlyClass =
  "w-full max-w-full h-[48px] min-h-[48px] rounded-[10px] bg-[#F5F5F5] px-4 text-[14px] font-normal text-[#696969] flex items-center pointer-events-none cursor-not-allowed select-none";

/** Editable text — white box so user knows they can type (not gray like readonly) */
export const tcFormTextInputClass =
  "w-full max-w-full h-[48px] min-h-[48px] rounded-[10px] bg-white border border-[#E6E6E6] px-4 text-[14px] font-normal text-[#1C1C1C] placeholder:text-[#696969] outline-none focus:border-[#0B3142] focus:ring-0 [color-scheme:light]";

export const tcGenerateFullWidthClass =
  "w-full py-3 mt-2 bg-[#0B3142] text-white rounded-[8px] text-[16px] font-semibold leading-none hover:bg-[#15465c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

/** Transfer Certificate preview list — Figma 6620:276630 */
export const tcPreviewRowGridClass =
  "grid w-full grid-cols-[28px_minmax(0,1fr)_minmax(150px,40%)] sm:grid-cols-[28px_minmax(0,1fr)_minmax(180px,42%)] gap-x-2 sm:gap-x-4 items-start";
export const tcPreviewNumberColClass = "tabular-nums text-left";
export const tcPreviewLabelColClass = "min-w-0 m-0";
export const tcPreviewValueColClass = "min-w-0 m-0 font-bold break-words text-left";
export const tcPreviewRowSpacingClass = "py-[10px]";
export const tcPreviewFooterClass =
  "grid grid-cols-3 items-end w-full border-t border-[#E6E6E6] pt-2 pb-4 mt-4";

/** Printable letter certificates — Bonafide, DOB, Character */
export const certDocHeaderClass =
  "relative z-10 w-full h-[214px] bg-linear-to-r from-[#E0EAFC] to-[#CFDEF3] px-5 sm:px-8 py-6 flex flex-col items-center justify-center";
export const certDocBodyClass =
  "relative z-10 flex flex-col items-center w-full gap-8 px-5 sm:px-8 pt-6 pb-10";
export const certDocBodyTextClass =
  "relative z-10 w-full text-justify text-[18px] italic text-[#1C1C1C] leading-[1.75]";
export const certDocFooterClass =
  "relative z-10 flex w-full items-end justify-between px-5 sm:px-8 pt-6 pb-8 text-black leading-none";
/** Shell-level watermark — fixed px for html2canvas; spans body + footer white zone */
export const certDocWatermarkWrapClass =
  "certificate-watermark-layer pointer-events-none absolute left-5 right-5 sm:left-8 sm:right-8 top-[238px] bottom-[100px] z-0 flex items-center justify-center select-none";
export const certDocWatermarkImgClass =
  "max-h-full max-w-full h-auto w-auto opacity-[0.11] grayscale shrink-0";
