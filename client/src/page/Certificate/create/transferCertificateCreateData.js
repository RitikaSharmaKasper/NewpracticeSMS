/**
 * Transfer Certificate create form data (Figma 6620:275924).
 * Readonly rows: prefilled from backend student API. Writable rows: user fills on create.
 */
import { formatStudentForTransferForm } from "../shared/certificateFormatters";

export const EMPTY_READONLY_STUDENT = {
  pupilName: "",
  motherName: "",
  fatherName: "",
  dateOfBirth: "",
  nationality: "",
  casteCategory: "",
};

/** Keys prefilled on create from backend — writable fields stay empty */
export const transferCertificateReadonlyFormKeys = [
  "dateOfFirstAdmission",
  "failedInClass",
  "subjectsStudied",
  "schoolDuesPaidUpto",
  "feeConcession",
  "workingDaysInSession",
  "workingDaysPresent",
  "lastClassStudied",
];

/** Neutral placeholders for writable inputs */
export const transferCertificateWritablePlaceholders = {
  annualExamResult: "Enter examination result",
  generalConduct: "Enter conduct",
  dateOfApplication: "DD/MM/YYYY",
  dateOfIssue: "DD/MM/YYYY",
  reasonForLeaving: "Enter reason for leaving",
  otherRemarks: "Type here",
};

/** Map certificate student API response for TC create/search flows */
export function mapCertificateApiStudent(apiStudent) {
  if (!apiStudent) return null;
  return {
    studentId: apiStudent.studentId || apiStudent.id,
    id: apiStudent.id || apiStudent.studentId,
    fullName: apiStudent.fullName || "",
    fatherName: apiStudent.fatherName || "",
    motherName: apiStudent.motherName || "",
    dateOfBirth: apiStudent.dateOfBirth || "",
    nationality: apiStudent.nationality || "",
    category: apiStudent.category || "",
    class: apiStudent.currentClass || apiStudent.class || "",
    currentClass: apiStudent.currentClass || apiStudent.class || "",
    dateOfFirstAdmission: apiStudent.dateOfFirstAdmission || "",
    failedInClass: apiStudent.failedInClass || "",
    subjectsStudied: apiStudent.subjectsStudied || "",
    schoolDuesPaidUpto: apiStudent.schoolDuesPaidUpto || "",
    feeConcession: apiStudent.feeConcession || "",
    workingDaysInSession: apiStudent.workingDaysInSession || "",
    workingDaysPresent: apiStudent.workingDaysPresent || "",
    lastClassStudied:
      apiStudent.lastClassStudied ||
      apiStudent.currentClass ||
      apiStudent.class ||
      "",
  };
}

/** Readonly pupil block for create form */
export function getTransferCreateReadonlyStudent(student) {
  const formatted = formatStudentForTransferForm(student);
  if (!formatted) {
    return { ...EMPTY_READONLY_STUDENT };
  }

  return {
    pupilName: formatted.pupilName || "",
    motherName: formatted.motherName || "",
    fatherName: formatted.fatherName || "",
    dateOfBirth: formatted.dateOfBirth || "",
    nationality: formatted.nationality || "",
    casteCategory: formatted.casteCategory || "",
  };
}

export function pickReadonlyFormFields(source = {}) {
  if (!source || typeof source !== "object") return {};
  const picked = {};
  transferCertificateReadonlyFormKeys.forEach((key) => {
    if (source[key] != null && source[key] !== "") {
      picked[key] = source[key];
    }
  });
  return picked;
}

/** Prefill readonly rows from backend student data */
export function buildTransferCreateFormPrefill(student, filters = {}) {
  const className =
    filters.className || filters.class || student?.class || student?.currentClass || "";

  if (!student) {
    return {
      lastClassStudied: className,
    };
  }

  return {
    dateOfFirstAdmission: student.dateOfFirstAdmission || "",
    failedInClass: student.failedInClass || "",
    subjectsStudied: student.subjectsStudied || "",
    schoolDuesPaidUpto: student.schoolDuesPaidUpto || "",
    feeConcession: student.feeConcession || "",
    workingDaysInSession: student.workingDaysInSession || "",
    workingDaysPresent: student.workingDaysPresent || "",
    lastClassStudied: student.lastClassStudied || className,
  };
}
