/**
 * Transfer Certificate preview — Figma 6620:276630.
 * Route param :studentId is the source of truth (e.g. STU001).
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TransferCertificateDocument from "./components/TransferCertificateDocument";
import CertificatePreviewLayout, {
  CertificateLoadingState,
  downloadCertificatePdf,
} from "./shared/CertificatePreviewLayout";
import {
  buildPreviewStudentData,
} from "./transferCertificateFlow";
import { normalizeStudentId } from "./transferCertificateStorage";
import {
  fetchCertificateById,
  fetchCertificateByStudent,
  getCertificateApiError,
} from "./certificateApi";
import { buildTransferCertificatePreviewRows } from "./preview/transferCertificatePreviewData";

const LIST_PATH = "/certificate/transfer_Certificate";
const SEARCH_PATH = "/certificate/transfer_Certificate/search";

function TransferCertificatePreview() {
  const { studentId: routeStudentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const certificateRef = useRef(null);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const studentId = normalizeStudentId(routeStudentId);
  const previewNavState = useMemo(
    () => buildPreviewStudentData(routeStudentId, location.state),
    [routeStudentId, location.state]
  );

  const backState = previewNavState;

  useEffect(() => {
    if (!routeStudentId || !studentId) {
      toast.error("Invalid certificate link.");
      navigate(LIST_PATH, { replace: true });
      return;
    }

    let isActive = true;

    async function fetchStudent() {
      try {
        setLoading(true);
        const certificate = previewNavState?.certificateId
          ? await fetchCertificateById(previewNavState.certificateId)
          : await fetchCertificateByStudent(studentId, {
              certificateType: "transfer",
              academicYear: previewNavState?.academicYear,
              className: previewNavState?.className,
              section: previewNavState?.section,
            });
        if (!isActive) return;
        if (!certificate) {
          toast.error("Transfer certificate not found.");
          navigate(LIST_PATH, { replace: true });
          return;
        }
        const student = {
          fullName: certificate.studentName,
          fatherName: certificate.fatherName,
          motherName: certificate.motherName,
          dateOfBirth: certificate.dateOfBirth,
          nationality: certificate.nationality,
          category: certificate.casteCategory,
          class: certificate.className,
        };
        const data = {
          ...certificate,
          fullName: certificate.studentName,
          rows: buildTransferCertificatePreviewRows(student, certificate.tcFormData),
        };
        setPreviewData(data);
      } catch (error) {
        console.error(error);
        toast.error(getCertificateApiError(error, "Failed to load certificate"));
        navigate(LIST_PATH, { replace: true });
      } finally {
        if (isActive) setLoading(false);
      }
    }

    fetchStudent();
    return () => {
      isActive = false;
    };
  }, [studentId, routeStudentId, navigate, previewNavState]);

  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    try {
      await downloadCertificatePdf(
        certificateRef.current,
        `Transfer-Certificate-${previewData?.studentId || previewData?.fullName || "Student"}.pdf`
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
  if (!previewData?.rows?.length) return null;

  return (
    <CertificatePreviewLayout
      backPath={SEARCH_PATH}
      backState={backState}
      certificateRef={certificateRef}
      isDownloading={isDownloading}
      onDownload={handleDownloadPDF}
      onPrint={handlePrint}
    >
      <TransferCertificateDocument
        admissionNumber={previewData.admissionNumber}
        rows={previewData.rows}
      />
    </CertificatePreviewLayout>
  );
}

export default TransferCertificatePreview;
