import React from "react";
import {
  tcFormControlWrapClass,
  tcFormLabelClass,
  tcFormLabelWrapClass,
  tcFormRowClass,
} from "../shared/certificateStyles";

/**
 * Label-left form row — label vertically centered with 48px field (Figma 275924).
 */
function TransferCertificateFormRow({ label, children }) {
  return (
    <div className={tcFormRowClass}>
      <div className={tcFormLabelWrapClass}>
        <p className={tcFormLabelClass}>{label}</p>
      </div>
      <div className={tcFormControlWrapClass}>{children}</div>
    </div>
  );
}

export default TransferCertificateFormRow;
