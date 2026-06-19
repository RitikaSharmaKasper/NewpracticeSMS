import React from "react";
import {
  tcPreviewLabelColClass,
  tcPreviewNumberColClass,
  tcPreviewRowGridClass,
  tcPreviewRowSpacingClass,
  tcPreviewValueColClass,
} from "../shared/certificateStyles";

const labelTextClass =
  "text-[14px] sm:text-[15px] font-normal text-[#1C1C1C] leading-snug";
const valueTextClass =
  "text-[14px] sm:text-[15px] font-bold text-[#1C1C1C] leading-snug";

/**
 * Numbered particulars list — Figma 6620:276630.
 * Grid: number | label | bold value (no overlap on long labels).
 */
function TransferCertificatePreviewBody({ rows }) {
  return (
    <div className="w-full flex flex-col">
      {rows.map((row) => (
        <div key={row.index} className={tcPreviewRowSpacingClass}>
          <div className={tcPreviewRowGridClass}>
            <span className={`${tcPreviewNumberColClass} ${labelTextClass}`}>
              {row.index}.
            </span>
            <p className={`${tcPreviewLabelColClass} ${labelTextClass}`}>
              {row.label}
            </p>
            <p className={`${tcPreviewValueColClass} ${valueTextClass}`}>
              {row.value}
            </p>
          </div>

          {row.subLine && (
            <div className={`${tcPreviewRowGridClass} mt-1`}>
              <span className={tcPreviewNumberColClass} aria-hidden="true" />
              <p className={`${tcPreviewLabelColClass} ${labelTextClass}`}>
                {row.subLine.label}
              </p>
              <p className={`${tcPreviewValueColClass} ${valueTextClass}`}>
                {row.subLine.value}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TransferCertificatePreviewBody;
