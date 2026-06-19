/**
 * Transfer Certificate flow helpers — validation, nav state, student lookup.
 * No localStorage or React here.
 */
import {
  buildTransferCreateFormPrefill,
  pickReadonlyFormFields,
} from "./create/transferCertificateCreateData";
import { normalizeStudentId } from "./transferCertificateStorage";

export { normalizeStudentId };

export function getDefaultTransferFormValues(overrides = {}) {
  return {
    dateOfFirstAdmission: "",
    lastClassStudied: "",
    annualExamResult: "",
    failedInClass: "",
    subjectsStudied: "",
    qualifiedForPromotion: "",
    promotionTargetClass: "",
    schoolDuesPaidUpto: "",
    feeConcession: "",
    workingDaysInSession: "",
    workingDaysPresent: "",
    nccCadetScoutGuide: "",
    gamesExtracurricular: "",
    generalConduct: "",
    dateOfApplication: "",
    dateOfIssue: "",
    reasonForLeaving: "",
    otherRemarks: "",
    ...overrides,
  };
}

/** Map stored row or nav state into full form shape */
export function formValuesFromRecord(row) {
  if (!row) return getDefaultTransferFormValues();
  const stored = row.tcFormData || {};
  const className = row.className || row.lastStudiesClass || "";

  return getDefaultTransferFormValues({
    dateOfFirstAdmission: stored.dateOfFirstAdmission ?? "",
    failedInClass: stored.failedInClass ?? "",
    subjectsStudied: stored.subjectsStudied ?? "",
    schoolDuesPaidUpto: stored.schoolDuesPaidUpto ?? "",
    feeConcession: stored.feeConcession ?? "",
    workingDaysInSession: stored.workingDaysInSession ?? "",
    workingDaysPresent: stored.workingDaysPresent ?? "",
    lastClassStudied: stored.lastClassStudied ?? className,
    annualExamResult: stored.annualExamResult ?? "",
    qualifiedForPromotion: stored.qualifiedForPromotion ?? "",
    promotionTargetClass: stored.promotionTargetClass ?? "",
    nccCadetScoutGuide: stored.nccCadetScoutGuide ?? "",
    gamesExtracurricular: stored.gamesExtracurricular ?? "",
    generalConduct: stored.generalConduct || row.conduct || "",
    dateOfApplication: stored.dateOfApplication ?? "",
    dateOfIssue: stored.dateOfIssue || row.dateOfLeaving || "",
    reasonForLeaving: stored.reasonForLeaving || row.transferReason || "",
    otherRemarks: stored.otherRemarks ?? "",
  });
}

export function buildPrefillFormValues(student, filterValues) {
  return getDefaultTransferFormValues(
    buildTransferCreateFormPrefill(student, filterValues)
  );
}

/** Create mode: readonly prefill only — ignore writable keys from nav/back */
export function mergeCreateModeFormFromNav(navTcFormData, student, filterValues) {
  return getDefaultTransferFormValues({
    ...buildTransferCreateFormPrefill(student, filterValues),
    ...pickReadonlyFormFields(navTcFormData),
  });
}

export function validateTransferFilters(filters) {
  const { academicYear, className, section, studentId } = filters || {};
  if (!academicYear) {
    return { ok: false, message: "Please select an academic year." };
  }
  if (!className) {
    return { ok: false, message: "Please select a class." };
  }
  if (!section) {
    return { ok: false, message: "Please select a section." };
  }
  if (!studentId) {
    return { ok: false, message: "Please select a student." };
  }
  return { ok: true, message: "" };
}

export function validateTransferForm(formValues) {
  if (!formValues?.reasonForLeaving?.trim()) {
    return { ok: false, message: "Please enter reason for leaving the school." };
  }
  return { ok: true, message: "" };
}

export function buildTransferNavState(partial = {}) {
  const className = partial.className || partial.class || "";
  const formValues = partial.tcFormData
    ? getDefaultTransferFormValues(partial.tcFormData)
    : getDefaultTransferFormValues({
        reasonForLeaving: partial.reasonForLeaving ?? partial.transferReason ?? "",
        generalConduct: partial.generalConduct ?? partial.conduct ?? "",
        dateOfIssue: partial.dateOfIssue ?? partial.dateOfLeaving ?? "",
        lastClassStudied: partial.lastClassStudied || className,
      });
  const legacy = legacyFieldsFromForm({
    ...formValues,
    transferToSchool: partial.transferToSchool,
  });

  return {
    academicYear: partial.academicYear || "",
    className,
    section: partial.section || "",
    studentId: normalizeStudentId(partial.studentId) || "",
    certificateId: partial.certificateId ?? null,
    mode: partial.mode || "create",
    tcFormData: formValues,
    ...legacy,
  };
}

export function parseTransferNavState(state) {
  if (!state || typeof state !== "object") return null;

  const studentId = normalizeStudentId(state.studentId);
  if (!studentId) return null;

  const tcForm = state.tcFormData
    ? getDefaultTransferFormValues(state.tcFormData)
    : getDefaultTransferFormValues({
        reasonForLeaving: state.transferReason || state.reasonForLeaving,
        generalConduct: state.conduct || state.generalConduct,
        dateOfIssue: state.dateOfLeaving || state.dateOfIssue,
        lastClassStudied: state.className || state.class,
      });

  return buildTransferNavState({
    ...state,
    className: state.className || state.class,
    studentId,
    tcFormData: tcForm,
  });
}

export function buildTransferNavStateFromListRow(row, mode = "view") {
  if (!row) return null;
  const tcForm = formValuesFromRecord(row);
  return buildTransferNavState({
    academicYear: row.academicYear,
    className: row.className || row.lastStudiesClass,
    section: row.section,
    studentId: row.studentId,
    certificateId: row._id || row.id,
    mode,
    tcFormData: tcForm,
    transferReason: row.transferReason,
    transferToSchool: row.transferToSchool,
    dateOfLeaving: row.dateOfLeaving,
    conduct: row.conduct,
  });
}

/** Merged nav/state for preview load and back links (route studentId is source of truth). */
export function buildPreviewStudentData(routeStudentId, navState) {
  const studentId = normalizeStudentId(routeStudentId);
  if (!studentId) return null;

  const parsedNav = navState ? parseTransferNavState(navState) : null;
  if (parsedNav && normalizeStudentId(parsedNav.studentId) === studentId) {
    return parsedNav;
  }

  return buildTransferNavState({
    studentId,
    mode: "view",
  });
}

function legacyFieldsFromForm(formValues) {
  return {
    transferReason: formValues.reasonForLeaving || "",
    transferToSchool: formValues.transferToSchool || "",
    dateOfLeaving: formValues.dateOfIssue || formValues.dateOfLeaving || "",
    conduct: formValues.generalConduct || "",
  };
}

