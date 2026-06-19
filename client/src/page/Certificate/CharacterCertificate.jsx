/**
 * Character Certificate form — filter students then open preview.
 */
import React from "react";
import CertificateStudentFilterForm from "./shared/CertificateStudentFilterForm";

function CharacterCertificate() {
  return (
    <CertificateStudentFilterForm
      title="Character Certificate"
      routeBase="character_Certificate"
      certificateType="character"
    />
  );
}

export default CharacterCertificate;
