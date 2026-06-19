/**
 * DOB Certificate preview — printable date-of-birth certificate (Figma 6620:276389).
 */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CertificateDocumentShell from "./shared/CertificateDocumentShell";
import CertificatePreviewLayout, {
  CertificateLoadingState,
  downloadCertificatePdf,
} from "./shared/CertificatePreviewLayout";
import {
  getCertificateHonorifics,
  loadCertificateStudent,
} from "./shared/certificateStudentUtils";

const BACK_PATH = "/certificate/dob_Certificate";

function DobCertificatePreview() {
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
      navigate(BACK_PATH, { replace: true });
      return;
    }

    let isActive = true;

    async function fetchStudent() {
      try {
        setLoading(true);
        const data = await loadCertificateStudent(id, location.state);
        if (isActive) setStudentData(data);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load student");
        navigate(BACK_PATH, { replace: true });
      } finally {
        if (isActive) setLoading(false);
      }
    }

    fetchStudent();
    return () => {
      isActive = false;
    };
  }, [id, navigate, location.state]);

  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    try {
      await downloadCertificatePdf(
        certificateRef.current,
        `DOB-Certificate-${studentData?.studentId || studentData?.fullName || "Student"}.pdf`
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

  if (loading) return <CertificateLoadingState />;
  if (!studentData) return null;

  const { honorific, parentRelation, pronounPossessive } =
    getCertificateHonorifics(studentData.gender);

  return (
    <CertificatePreviewLayout
      backPath={BACK_PATH}
      certificateRef={certificateRef}
      isDownloading={isDownloading}
      onDownload={handleDownloadPDF}
      onPrint={handlePrint}
    >
      <CertificateDocumentShell title="Date of Birth Certificate" issueDate={issueDate}>
        <p>
          This is to Certify that {honorific}{" "}
          <span className="font-semibold italic">{studentData.fullName}</span>{" "}
          {parentRelation} Mr.{" "}
          <span className="font-semibold italic">{studentData.fatherName}</span>{" "}
          bearing admission no.{" "}
          <span className="font-semibold italic">
            {studentData.admissionNumber}
          </span>{" "}
          roll no.{" "}
          <span className="font-semibold italic">{studentData.rollNumber}</span>{" "}
          is a student of class{" "}
          <span className="font-semibold italic">{studentData.currentClass}</span>{" "}
          during the academic year{" "}
          <span className="font-semibold italic">{studentData.academicYear}</span>
          . {pronounPossessive} date of birth as per school record is{" "}
          <span className="font-semibold italic">{studentData.dateOfBirth}</span>{" "}
          as per the record produced to us.
        </p>
      </CertificateDocumentShell>
    </CertificatePreviewLayout>
  );
}

export default DobCertificatePreview;
