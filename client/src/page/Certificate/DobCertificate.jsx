/**
 * DOB Certificate form — filter students then open preview.
 */
import React from "react";
import CertificateStudentFilterForm from "./shared/CertificateStudentFilterForm";

function DobCertificate() {
  return (
    <CertificateStudentFilterForm
      title="DOB Certificate"
      routeBase="dob_Certificate"
      certificateType="dob"
    />
  );
}

export default DobCertificate;
