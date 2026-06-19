/**
 * Bonafide Certificate form — filter students then open preview.
 */
import React from "react";
import CertificateStudentFilterForm from "./shared/CertificateStudentFilterForm";

function BonafideCertificate() {
  return (
    <CertificateStudentFilterForm
      title="Bonafide Certificate"
      routeBase="bonafide"
      certificateType="bonafide"
    />
  );
}

export default BonafideCertificate;
