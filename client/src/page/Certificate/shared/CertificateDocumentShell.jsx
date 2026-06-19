import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CertificateSchoolHeader from "./CertificateSchoolHeader";
import CertificateWatermark from "./CertificateWatermark";
import {
  certDocBodyClass,
  certDocBodyTextClass,
  certDocFooterClass,
  certDocHeaderClass,
} from "./certificateStyles";
import api from "../../../config/axiosInstance";

/** Shared certificate header, watermark, and footer — body content passed as children */
export default function CertificateDocumentShell({ title, issueDate, children }) {
  const [imgError, setImgError] = useState(false);

  const { data: signature } = useQuery({
    queryKey: ["digital-signature"],
    queryFn: async () => {
      const res = await api.get("/digital-signature");
      return res.data.data;
    },
  });

  const signatureUrl = signature?.imageUrl;

  return (
    <div className="relative flex flex-col items-center w-full bg-white">
      <CertificateWatermark />

      <div className={certDocHeaderClass}>
        <CertificateSchoolHeader />
      </div>

      <div className={certDocBodyClass}>
        <h3 className="relative z-10 text-[30px] font-semibold text-[#1C1C1C] text-center underline decoration-solid underline-offset-[6px] w-full leading-none">
          {title}
        </h3>

        <div className={certDocBodyTextClass}>{children}</div>
      </div>

      <div className={certDocFooterClass}>
        <div className="flex flex-col gap-2 w-[119px]">
          <p className="text-[14px] font-normal">Issue Date</p>
          <p className="text-[16px] font-semibold">{issueDate}</p>
        </div>
        <div className="flex flex-col gap-1 items-end text-right text-[14px]">
          {signatureUrl && !imgError ? (
            <img
              src={signatureUrl}
              alt="Signature"
              crossOrigin="anonymous"
              style={{ maxHeight: "50px", width: "auto", marginBottom: "2px", marginLeft: "auto" }}
              onError={() => setImgError(true)}
            />
          ) : (
            <p className="italic text-[#9C9C9C]">[Signature]</p>
          )}
          <p className="font-normal text-black">Auth. Signatory</p>
        </div>
      </div>
    </div>
  );
}
