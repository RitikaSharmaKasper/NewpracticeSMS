/**
 * Transfer Certificate search — Figma 6620:275880.
 * Route: /certificate/transfer_Certificate/search
 * studentId lives in nav state only; preview uses route param :studentId.
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CertificateBackLink from "./components/CertificateBackLink";
import TransferCertificateFilterRow from "./components/TransferCertificateFilterRow";
import { mapCertificateApiStudent } from "./create/transferCertificateCreateData";
import {
  buildPrefillFormValues,
  buildTransferNavState,
  formValuesFromRecord,
  validateTransferFilters,
} from "./transferCertificateFlow";
import {
  certificateCardClass,
  certificatePrimaryButtonClass,
} from "./shared/certificateStyles";
import {
  fetchCertificateByStudent,
  fetchCertificateStudent,
  getCertificateApiError,
} from "./certificateApi";

const LIST_PATH = "/certificate/transfer_Certificate";
const CREATE_PATH = "/certificate/transfer_Certificate/create";

function TransferCertificateSearch() {
  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState({
    academicYear: "",
    className: "",
    section: "",
    studentId: "",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [existingCertificate, setExistingCertificate] = useState(null);

  const filtersComplete =
    filterValues.academicYear &&
    filterValues.className &&
    filterValues.section &&
    filterValues.studentId;

  useEffect(() => {
    if (!filtersComplete) {
      setExistingCertificate(null);
      return;
    }

    let isActive = true;
    async function checkExistingCertificate() {
      try {
        const certificate = await fetchCertificateByStudent(filterValues.studentId, {
          certificateType: "transfer",
          academicYear: filterValues.academicYear,
          className: filterValues.className,
          section: filterValues.section,
        });
        if (isActive) setExistingCertificate(certificate);
      } catch {
        if (isActive) setExistingCertificate(null);
      }
    }

    checkExistingCertificate();
    return () => {
      isActive = false;
    };
  }, [filterValues, filtersComplete]);

  const handleSearchClick = async (e) => {
    e.preventDefault();
    if (isSearching) return;

    const validation = validateTransferFilters(filterValues);
    if (!validation.ok) {
      toast.error(validation.message);
      return;
    }

    setIsSearching(true);
    try {
      const apiStudent = await fetchCertificateStudent(filterValues.studentId);
      const student = mapCertificateApiStudent(apiStudent);
      if (!student) {
        toast.error("Student not found for the selected filters.");
        return;
      }

      const studentId = student.studentId || student.id;
      const certificate = await fetchCertificateByStudent(studentId, {
        certificateType: "transfer",
        academicYear: filterValues.academicYear,
        className: filterValues.className,
        section: filterValues.section,
      });
      const tcFormData = certificate
        ? formValuesFromRecord(certificate)
        : buildPrefillFormValues(student, filterValues);

      const navState = buildTransferNavState({
        ...filterValues,
        studentId,
        certificateId: certificate?._id || certificate?.id || null,
        mode: certificate ? "view" : "create",
        tcFormData,
      });

      if (certificate) {
        toast.info("Transfer certificate already exists. Opening preview.");
        navigate(`/certificate/transfer_Certificate/${studentId}`, { state: navState });
        return;
      }

      toast.success("No certificate found. Opening create form.");
      navigate(CREATE_PATH, { state: navState });
    } catch (error) {
      toast.error(getCertificateApiError(error, "Could not search certificate"));
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <CertificateBackLink to={LIST_PATH} />

      <div className={certificateCardClass}>
        <h2 className="text-[18px] font-semibold text-[#1C1C1C] leading-none">
          Generate Transfer Certificate
        </h2>

        <form onSubmit={handleSearchClick} className="flex flex-col gap-9 w-full">
          <TransferCertificateFilterRow
            filterValues={filterValues}
            onFilterChange={setFilterValues}
            showCertificateStatus
          />

          {filtersComplete && (
            <p
              className={`text-[14px] leading-snug m-0 ${
                existingCertificate ? "text-[#0B3142]" : "text-[#696969]"
              }`}
            >
              {existingCertificate
                ? "Transfer certificate already exists for this student. Search will open preview."
                : "No transfer certificate yet for this student. Search will open the create form."}
            </p>
          )}

          <div className="flex items-start">
            <button
              type="submit"
              disabled={!filtersComplete || isSearching}
              className={`${certificatePrimaryButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransferCertificateSearch;
