/**
 * Participation Certificate preview — generated from create flow.
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CertificatePreviewLayout, {
  CertificateLoadingState,
  downloadCertificatePdf,
} from "./shared/CertificatePreviewLayout";
import ParticipationCertificateDocument from "./components/ParticipationCertificateDocument";
import {
  fetchCertificateById,
  fetchCertificateStudent,
  getCertificateApiError,
} from "./certificateApi";
import api from "../../config/axiosInstance";

function ParticipationCertificatePreview({
  backPath = "/certificate/participation_Certificate",
  certificateLabel = "Participation Certificate",
  certificateSubtitle = "OF PARTICIPATION",
  pdfNamePrefix = "Participation-Certificate",
}) {
  const { studentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [certificateContent, setCertificateContent] = useState("");

  const { data: signatureData } = useQuery({
    queryKey: ["digital-signature"],
    queryFn: async () => {
      const res = await api.get("/digital-signature");
      return res.data.data;
    },
  });

  const state = location.state || {};

  const backState = useMemo(() => {
    return {
      academicYear: state.academicYear || "",
      class: state.class || "",
      section: state.section || "",
      studentId,
    };
  }, [state, studentId]);

  useEffect(() => {
    if (!studentId) {
      toast.error(`Invalid ${certificateLabel.toLowerCase()} data.`, {
        toastId: `${pdfNamePrefix}-invalid-student`,
      });
      navigate(backPath, { replace: true });
      return;
    }

    let isActive = true;
    async function loadPreview() {
      try {
        setLoading(true);
        if (state.certificateId) {
          const certificate = await fetchCertificateById(state.certificateId);
          if (!isActive) return;
          setStudent({
            id: certificate.studentId,
            fullName: certificate.studentName,
            fatherName: certificate.fatherName,
            class: certificate.className,
          });
          setCertificateContent(certificate.content || state.content || "");
          return;
        }

        const apiStudent = await fetchCertificateStudent(studentId);
        if (!isActive) return;
        setStudent({
          id: apiStudent.studentId || apiStudent.id,
          fullName: apiStudent.fullName,
          fatherName: apiStudent.fatherName,
          class: apiStudent.currentClass || apiStudent.class,
        });
        setCertificateContent(state.content || "");
      } catch (error) {
        toast.error(getCertificateApiError(error, `Invalid ${certificateLabel.toLowerCase()} data.`));
        navigate(backPath, { replace: true });
      } finally {
        if (isActive) setLoading(false);
      }
    }

    loadPreview();
    return () => {
      isActive = false;
    };
  }, [
    backPath,
    certificateLabel,
    navigate,
    pdfNamePrefix,
    state.certificateId,
    state.content,
    studentId,
  ]);

  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    try {
      await downloadCertificatePdf(
        certificateRef.current,
        `${pdfNamePrefix}-${student.id || studentId}.pdf`
      );
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Failed to generate PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) return <CertificateLoadingState />;
  if (!student) return null;

  return (
    <CertificatePreviewLayout
      backPath={backPath}
      backState={backState}
      certificateRef={certificateRef}
      isDownloading={isDownloading}
      onDownload={handleDownloadPDF}
      onPrint={handlePrint}
    >
      <ParticipationCertificateDocument
        student={student}
        content={certificateContent}
        subtitle={certificateSubtitle}
        signatureUrl={signatureData?.imageUrl || null}
      />
    </CertificatePreviewLayout>
  );
}

export default ParticipationCertificatePreview;

