import React from "react";
import { certificateHeaderLogoUrl } from "../../../data/certificateAssets";
import { useCertificateMeta } from "./useCertificateMeta";

/**
 * School branding header loaded from GET /api/certificates/meta.
 * Logo remains a frontend asset until a backend logo model exists.
 */
export default function CertificateSchoolHeader({ variant = "centered", school: schoolProp }) {
  const { school: metaSchool } = useCertificateMeta();
  const school = schoolProp || metaSchool || {};
  const name = school.name || "";
  const address = school.address || "";
  const contact = school.contact || "";

  if (variant === "transfer") {
    return (
      <div className="flex flex-row items-center w-full max-w-[1026px] mx-auto">
        <img
          src={certificateHeaderLogoUrl}
          alt="School logo"
          className="size-[72px] object-contain shrink-0"
        />
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-1 min-w-0 px-4">
          <p className="text-[24px] sm:text-[30px] font-bold text-[#1C1C1C] leading-tight m-0">
            {name}
          </p>
          <p className="text-[14px] sm:text-[16px] font-normal text-[#696969] leading-snug m-0">
            {address}
          </p>
          <p className="text-[14px] sm:text-[16px] font-normal text-[#696969] leading-snug m-0">
            {contact}
          </p>
        </div>
        <div className="size-[72px] shrink-0 invisible" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 text-center w-full">
      <img
        src={certificateHeaderLogoUrl}
        alt="School logo"
        className="h-[88px] w-[88px] object-contain shrink-0"
      />
      <p className="text-[30px] font-bold text-[#1C1C1C] leading-tight text-center px-4">
        {name}
      </p>
      <div className="flex flex-col items-center gap-2">
        <p className="text-[16px] font-normal text-[#1C1C1C] leading-none text-center">
          {address}
        </p>
        <p className="text-[16px] font-normal text-[#1C1C1C] leading-none text-center">
          {contact}
        </p>
      </div>
    </div>
  );
}
