/**
 * Bonafide Certificate preview — load student, show printable letter, download PDF or print.
 */
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoChevronBack, IoPrintOutline } from "react-icons/io5";
import { GrDownload } from "react-icons/gr";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import CertificateSchoolHeader from "./shared/CertificateSchoolHeader";
import CertificateWatermark from "./shared/CertificateWatermark";
import { downloadCertificatePdf } from "./shared/CertificatePreviewLayout";
import {
  certDocBodyClass,
  certDocBodyTextClass,
  certDocFooterClass,
  certDocHeaderClass,
} from "./shared/certificateStyles";
import { loadCertificateStudent } from "./shared/certificateStudentUtils";
import api from "../../config/axiosInstance";

function BonafideCertificatePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const certificateRef = useRef(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!id) {
      toast.error("No student selected.");
      navigate("/certificate/bonafide", { replace: true });
      return;
    }

    let isActive = true;

    async function loadStudent() {
      try {
        setLoading(true);

        const data = await loadCertificateStudent(id, location.state);
        if (isActive) setStudentData(data);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load student");
        navigate("/certificate/bonafide", { replace: true });
      } finally {
        if (isActive) setLoading(false);
      }
    }

    loadStudent();

    return () => {
      isActive = false;
    };
  }, [id, navigate, location.state]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    try {
      await downloadCertificatePdf(
        certificateRef.current,
        `Bonafide-Certificate-${studentData?.studentId || studentData?.fullName || "Student"}.pdf`
      );
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Failed to generate PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  const issueDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B3142] mx-auto" />
          <p className="mt-4 text-[#696969]">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (!studentData) return null;

  const isFemale = studentData.gender === "female";
  const isMale = studentData.gender === "male";
  const honorific = isFemale ? "Ms." : isMale ? "Mr." : "Mr./Ms.";
  const parentRelation = isFemale ? "D/o" : isMale ? "S/o" : "S/o D/o";

  return (
    <div className="print-container flex flex-col gap-4 w-full">
      <Link
        to="/certificate/bonafide"
        className="bonafide-preview-chrome flex items-center gap-2 text-[#696969] text-[24px] font-semibold leading-none print:hidden w-fit"
      >
        <IoChevronBack size={24} />
        Back
      </Link>

      <div className="bg-white rounded-[16px] p-4 shadow-[0px_0px_4px_rgba(0,0,0,0.15)] flex flex-col gap-4 items-center w-full print:shadow-none print:p-0 print:bg-transparent">
        <div className="bonafide-preview-chrome flex gap-6 w-full print:hidden">
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0B3142] text-white rounded-[8px] text-[16px] font-semibold leading-none disabled:opacity-50"
          >
            <GrDownload size={16} />
            {isDownloading ? "Downloading..." : "Download"}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#9C9C9C] text-[#696969] rounded-[8px] text-[16px] font-semibold leading-none"
          >
            <IoPrintOutline size={16} />
            Print
          </button>
        </div>

        <div
          ref={certificateRef}
          className="certificate-pdf-root bg-white rounded-[16px] shadow-[0px_0px_8px_rgba(0,0,0,0.15)] w-full max-w-[920px] print:shadow-none"
        >
          <CertificateDocument
            studentData={studentData}
            issueDate={issueDate}
            honorific={honorific}
            parentRelation={parentRelation}
          />
        </div>
      </div>
    </div>
  );
}

/** Printable certificate layout (header, body, footer) */
function CertificateDocument({
  studentData,
  issueDate,
  honorific,
  parentRelation,
}) {
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
          Bonafide Certificate
        </h3>

        <p className={certDocBodyTextClass}>
          This is Certify that {honorific}{" "}
          <span className="font-semibold not-italic">{studentData.fullName}</span>{" "}
          {parentRelation} Mr.{" "}
          <span className="font-semibold not-italic">{studentData.fatherName}</span>{" "}
          is a bonafide student of this school/college, qualified/ studying in class{" "}
          <span className="font-semibold not-italic">{studentData.currentClass}</span>{" "}
          admission no.{" "}
          <span className="font-semibold not-italic">{studentData.admissionNumber}</span>{" "}
          roll no.{" "}
          <span className="font-semibold not-italic">{studentData.rollNumber}</span>{" "}
          during the academic year{" "}
          <span className="font-semibold not-italic">{studentData.academicYear}</span>{" "}
          and his/her D.O.B according to school record is{" "}
          <span className="font-semibold not-italic">{studentData.dateOfBirth}</span>{" "}
          as per the record produced to us.
        </p>
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
              style={{ maxHeight: "70px", width: "auto", marginBottom: "-25px", marginRight: "-25px" }}
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

export default BonafideCertificatePreview;
