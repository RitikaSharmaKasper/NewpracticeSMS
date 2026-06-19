/**
 * Transfer Certificate create/edit form — Figma 6620:275924.
 * Route: /certificate/transfer_Certificate/create
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CertificateBackLink from "./components/CertificateBackLink";
import TransferCertificateCreateForm from "./components/TransferCertificateCreateForm";
import TransferCertificateFilterRow from "./components/TransferCertificateFilterRow";
import {
  mapCertificateApiStudent,
  getTransferCreateReadonlyStudent,
} from "./create/transferCertificateCreateData";
import {
  buildPrefillFormValues,
  buildTransferNavState,
  mergeCreateModeFormFromNav,
  formValuesFromRecord,
  getDefaultTransferFormValues,
  parseTransferNavState,
  validateTransferFilters,
  validateTransferForm,
} from "./transferCertificateFlow";
import {
  createCertificate,
  fetchCertificateById,
  fetchCertificateByStudent,
  fetchCertificateStudent,
  getCertificateApiError,
  updateCertificate,
} from "./certificateApi";
import {
  certificateCardClass,
  tcGenerateFullWidthClass,
} from "./shared/certificateStyles";

const SEARCH_PATH = "/certificate/transfer_Certificate/search";

function TransferCertificateCreate() {
  const location = useLocation();
  const navigate = useNavigate();
  const parsedNavState = useMemo(
    () => parseTransferNavState(location.state),
    [location.state]
  );

  const [filterValues, setFilterValues] = useState({
    academicYear: "",
    className: "",
    section: "",
    studentId: "",
  });
  const initialFormValues = useMemo(() => {
    if (!parsedNavState) return getDefaultTransferFormValues();
    if (parsedNavState.mode === "edit" && parsedNavState.certificateId) {
      return getDefaultTransferFormValues();
    }
    if (parsedNavState.tcFormData?.dateOfFirstAdmission) {
      return mergeCreateModeFormFromNav(
        parsedNavState.tcFormData,
        null,
        {
          className: parsedNavState.className,
          section: parsedNavState.section,
        }
      );
    }
    return buildPrefillFormValues(null, {
      className: parsedNavState.className,
      section: parsedNavState.section,
    });
  }, [parsedNavState]);

  const [transferFormValues, setTransferFormValues] = useState(initialFormValues);
  const [selectedStudentDetails, setSelectedStudentDetails] = useState(() => {
    return null;
  });
  const [mode, setMode] = useState("create");
  const [certificateId, setCertificateId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [redirectToList, setRedirectToList] = useState(false);
  const previousStudentIdRef = useRef(null);

  useEffect(() => {
    if (!parsedNavState) {
      toast.error("Please search for a student first.", {
        toastId: "tc-create-guard-search",
      });
      return;
    }

    let isActive = true;

    async function initializeForm() {
      setFilterValues({
        academicYear: parsedNavState.academicYear,
        className: parsedNavState.className,
        section: parsedNavState.section,
        studentId: parsedNavState.studentId,
      });
      setMode(parsedNavState.mode);
      setCertificateId(parsedNavState.certificateId);
      previousStudentIdRef.current = parsedNavState.studentId;

      try {
        if (parsedNavState.mode === "edit" && parsedNavState.certificateId) {
          const stored = await fetchCertificateById(parsedNavState.certificateId);
          if (!isActive) return;
          if (!stored) {
            toast.error("Certificate record not found.", {
              toastId: "tc-create-guard-missing",
            });
            setRedirectToList(true);
            return;
          }
          setTransferFormValues(formValuesFromRecord(stored));
          setSelectedStudentDetails({
            pupilName: stored.studentName,
            motherName: stored.motherName,
            fatherName: stored.fatherName,
            dateOfBirth: stored.dateOfBirth,
            nationality: stored.nationality,
            casteCategory: stored.casteCategory,
          });
          return;
        }

        const existingOnEntry = await fetchCertificateByStudent(parsedNavState.studentId, {
          certificateType: "transfer",
          academicYear: parsedNavState.academicYear,
          className: parsedNavState.className,
          section: parsedNavState.section,
        });
        if (!isActive) return;

        if (parsedNavState.mode === "create" && existingOnEntry) {
          const previewNavState = buildTransferNavState({
            academicYear: parsedNavState.academicYear,
            className: parsedNavState.className,
            section: parsedNavState.section,
            studentId: parsedNavState.studentId,
            certificateId: existingOnEntry._id || existingOnEntry.id,
            mode: "view",
            tcFormData: formValuesFromRecord(existingOnEntry),
          });
          navigate(`/certificate/transfer_Certificate/${parsedNavState.studentId}`, {
            state: previewNavState,
            replace: true,
          });
          return;
        }

        const apiStudent = await fetchCertificateStudent(parsedNavState.studentId);
        if (!isActive) return;
        const student = mapCertificateApiStudent(apiStudent);
        setSelectedStudentDetails(getTransferCreateReadonlyStudent(student));

        if (
          parsedNavState.tcFormData?.dateOfFirstAdmission ||
          parsedNavState.tcFormData?.subjectsStudied
        ) {
          setTransferFormValues(
            mergeCreateModeFormFromNav(parsedNavState.tcFormData, student, {
              className: parsedNavState.className,
              section: parsedNavState.section,
            })
          );
        } else {
          setTransferFormValues(
            buildPrefillFormValues(student, {
              className: parsedNavState.className,
              section: parsedNavState.section,
            })
          );
        }
      } catch (error) {
        toast.error(getCertificateApiError(error, "Could not load certificate form"));
        setRedirectToList(true);
      }
    }

    initializeForm();
    return () => {
      isActive = false;
    };
  }, [parsedNavState, navigate]);

  useEffect(() => {
    if (!filterValues.studentId) {
      setSelectedStudentDetails(null);
      return;
    }

    let isActive = true;

    async function refreshStudentForm() {
      try {
        const apiStudent = await fetchCertificateStudent(filterValues.studentId);
        if (!isActive) return;
        const student = mapCertificateApiStudent(apiStudent);
        setSelectedStudentDetails(getTransferCreateReadonlyStudent(student));

        const studentChanged =
          previousStudentIdRef.current !== filterValues.studentId;
        previousStudentIdRef.current = filterValues.studentId;

        if (!studentChanged) return;

        if (mode === "create") {
          setTransferFormValues(buildPrefillFormValues(student, filterValues));
          return;
        }

        const storedForStudent = await fetchCertificateByStudent(
          filterValues.studentId,
          {
            certificateType: "transfer",
            academicYear: filterValues.academicYear,
            className: filterValues.className,
            section: filterValues.section,
          }
        );
        if (!isActive) return;
        if (storedForStudent) {
          setCertificateId(storedForStudent._id || storedForStudent.id);
          setTransferFormValues(formValuesFromRecord(storedForStudent));
        } else {
          setCertificateId(null);
          setTransferFormValues(buildPrefillFormValues(student, filterValues));
        }
      } catch (error) {
        if (isActive) {
          setSelectedStudentDetails(null);
          toast.error(getCertificateApiError(error, "Could not load student"));
        }
      }
    }

    refreshStudentForm();
    return () => {
      isActive = false;
    };
  }, [
    filterValues.academicYear,
    filterValues.className,
    filterValues.section,
    filterValues.studentId,
    mode,
  ]);

  if (!parsedNavState) {
    return <Navigate to={SEARCH_PATH} replace />;
  }

  if (redirectToList) {
    return <Navigate to="/certificate/transfer_Certificate" replace />;
  }

  const filtersComplete =
    filterValues.academicYear &&
    filterValues.className &&
    filterValues.section &&
    filterValues.studentId;

  const backNavState = buildTransferNavState({
    ...filterValues,
    certificateId,
    mode,
    tcFormData: transferFormValues,
  });

  const handleGenerateClick = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    const filterValidation = validateTransferFilters(filterValues);
    if (!filterValidation.ok) {
      toast.error(filterValidation.message);
      return;
    }

    const formValidation = validateTransferForm(transferFormValues);
    if (!formValidation.ok) {
      toast.error(formValidation.message);
      return;
    }

    setIsSaving(true);
    try {
      const apiStudent = await fetchCertificateStudent(filterValues.studentId);
      const student = mapCertificateApiStudent(apiStudent);
      if (!student) {
        toast.error("Student not found.");
        navigate(SEARCH_PATH, { replace: true });
        return;
      }

      const payload = {
        certificateType: "transfer",
        studentId: student.studentId || student.id,
        academicYear: filterValues.academicYear,
        className: filterValues.className,
        section: filterValues.section,
        tcFormData: transferFormValues,
      };
      const saved =
        mode === "edit" && certificateId
          ? await updateCertificate(certificateId, payload)
          : await createCertificate(payload);
      const wasUpdate = mode === "edit" && certificateId;
      toast.success(
        wasUpdate
          ? "Transfer certificate updated."
          : "Transfer certificate created."
      );

      const previewNavState = buildTransferNavState({
        ...filterValues,
        studentId: student.studentId || student.id,
        certificateId: saved._id || saved.id,
        mode: "view",
        tcFormData: transferFormValues,
      });

      navigate(`/certificate/transfer_Certificate/${student.studentId || student.id}`, {
        state: previewNavState,
      });
    } catch (error) {
      console.error(error);
      if (error.response?.status === 409 && error.response?.data?.data) {
        const existing = error.response.data.data;
        toast.info("Transfer certificate already exists. Opening preview.");
        navigate(`/certificate/transfer_Certificate/${existing.studentId}`, {
          state: buildTransferNavState({
            ...filterValues,
            studentId: existing.studentId,
            certificateId: existing._id || existing.id,
            mode: "view",
            tcFormData: formValuesFromRecord(existing),
          }),
        });
        return;
      }
      toast.error(getCertificateApiError(error, "Could not save transfer certificate"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <CertificateBackLink to={SEARCH_PATH} state={backNavState} />

      <div className={certificateCardClass}>
        <h2 className="text-[18px] font-semibold text-[#1C1C1C] leading-none">
          Transfer Certificate
        </h2>

        <form onSubmit={handleGenerateClick} className="flex flex-col w-full">
          <TransferCertificateFilterRow
            filterValues={filterValues}
            onFilterChange={setFilterValues}
            showCertificateStatus
          />

          <div className="w-full border-t border-[#E6E6E6] pt-6 mt-2">
          <TransferCertificateCreateForm
            readonlyStudent={selectedStudentDetails}
            formValues={transferFormValues}
            onFormChange={setTransferFormValues}
          />
          </div>

          <button
            type="submit"
            disabled={!filtersComplete || isSaving}
            className={tcGenerateFullWidthClass}
          >
            {isSaving ? "Saving..." : "Generate"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TransferCertificateCreate;
