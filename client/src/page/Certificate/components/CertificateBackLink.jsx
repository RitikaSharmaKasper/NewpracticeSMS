import React from "react";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

/**
 * Back control — Figma 6620:276430 (24px semibold, #696969, chevron gap 8px).
 */
function CertificateBackLink({ to, state, onClick }) {
  const className =
    "flex items-center gap-2 text-[#696969] text-[24px] font-semibold leading-none w-fit hover:text-[#1C1C1C] transition-colors";

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        <IoChevronBack size={24} />
        Back
      </button>
    );
  }

  return (
    <Link to={to} state={state} className={className}>
      <IoChevronBack size={24} />
      Back
    </Link>
  );
}

export default CertificateBackLink;
