import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../config/axiosInstance";
import CertificateSchoolHeader from "../shared/CertificateSchoolHeader";
import TransferCertificatePreviewBody from "./TransferCertificatePreviewBody";
import { tcPreviewFooterClass } from "../shared/certificateStyles";

/**
 * Transfer Certificate printable document — Figma 6620:276630.
 * White header: logo left, school block centered, no colored band.
 */
function TransferCertificateDocument({ admissionNumber, rows }) {
  const [imgError, setImgError] = useState(false);

  const { data: signature } = useQuery({
    queryKey: ["digital-signature"],
    queryFn: async () => {
      const res = await api.get("/digital-signature");
      return res.data.data;
    },
  });

  const signatureUrl = signature?.imageUrl;
  const showSignatureImage = signatureUrl && !imgError;

  return (
    <div className="relative flex flex-col w-full overflow-hidden bg-white">
      <div className="relative z-10 w-full bg-white px-6 sm:px-10 pt-8 pb-6">
        <CertificateSchoolHeader variant="transfer" />
      </div>

      <div className="relative flex flex-col w-full max-w-[1026px] mx-auto px-6 sm:px-10 pb-10 gap-0">
        <div className="w-full border-b border-[#E6E6E6]" />

        <div className="flex flex-col gap-3">
          <h2 className="text-[22px] sm:text-[26px] font-bold text-[#1C1C1C] text-center leading-tight m-0">
            Transfer Certificate
          </h2>

          <p className="text-[14px] sm:text-[16px] m-0 text-left">
            <span className="text-[#696969] font-normal">Admission No. </span>
            <span className="font-bold text-[#1C1C1C]">
              {admissionNumber || "—"}
            </span>
          </p>
        </div>

        <TransferCertificatePreviewBody rows={rows} />

        <div className={tcPreviewFooterClass}>
          <p className="text-[14px] sm:text-[16px] font-bold text-[#1C1C1C] m-0 text-left">
            Prepared By
          </p>
          <p className="text-[14px] sm:text-[16px] font-bold text-[#1C1C1C] m-0 text-center">
            Checked By
          </p>
          <div className="flex flex-col items-end text-right">
            {showSignatureImage && (
              <img
                src={signatureUrl}
                alt="Signature"
                crossOrigin="anonymous"
                style={{ maxHeight: "70px", width: "auto", marginBottom: "-25px" }}
                onError={() => setImgError(true)}
              />
            )}
            <p className="text-[14px] sm:text-[16px] font-bold text-[#1C1C1C] m-0">
              Signature of Principal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferCertificateDocument;
