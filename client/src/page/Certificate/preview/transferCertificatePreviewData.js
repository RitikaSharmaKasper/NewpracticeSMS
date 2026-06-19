/**
 * Transfer Certificate printable preview — field list (Figma 6620:276630).
 * Order matches create form 6620:275924.
 */
import { formatStudentForTransferForm } from "../shared/certificateFormatters";

function displayValue(value, emptyFallback = "—") {
  if (value == null || String(value).trim() === "") return emptyFallback;
  return String(value).trim();
}

const ONES = [
  "",
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
  "Ninth",
  "Tenth",
  "Eleventh",
  "Twelfth",
  "Thirteenth",
  "Fourteenth",
  "Fifteenth",
  "Sixteenth",
  "Seventeenth",
  "Eighteenth",
  "Nineteenth",
];
const TENS = ["", "", "Twenty", "Thirty"];

function numberToWordsUnder100(n) {
  if (n < 20) return ONES[n];
  const ten = Math.floor(n / 10);
  const one = n % 10;
  return one ? `${TENS[ten]} ${ONES[one]}` : TENS[ten];
}

function yearToWords(year) {
  if (year >= 2000 && year < 2100) {
    const rest = year - 2000;
    if (rest === 0) return "Two Thousand";
    return `Two Thousand ${numberToWordsUnder100(rest)}`;
  }
  if (year >= 1900 && year < 2000) {
    const rest = year - 1900;
    return `Nineteen ${numberToWordsUnder100(rest)}`;
  }
  return String(year);
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** DOB in words for Figma row 4 sub-line */
export function formatDobInWords(dateStr) {
  if (!dateStr) return "—";

  const slashMatch = String(dateStr).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    const day = parseInt(slashMatch[1], 10);
    const month = parseInt(slashMatch[2], 10);
    const year = parseInt(slashMatch[3], 10);
    const monthName = MONTH_NAMES[month - 1] || "January";
    return `(${numberToWordsUnder100(day)} – ${monthName} – ${yearToWords(year)})`;
  }

  const parsed = new Date(dateStr);
  if (!Number.isNaN(parsed.getTime())) {
    const day = parsed.getDate();
    const monthName = MONTH_NAMES[parsed.getMonth()];
    const year = parsed.getFullYear();
    return `(${numberToWordsUnder100(day)} – ${monthName} – ${yearToWords(year)})`;
  }

  return "—";
}

/** Rows for numbered preview list */
export function buildTransferCertificatePreviewRows(student, tcFormData = {}) {
  const readonly = formatStudentForTransferForm(student) || {};
  const tc = tcFormData || {};
  const qualified = tc.qualifiedForPromotion;
  const promotionTarget = tc.promotionTargetClass;

  const rows = [
    { label: "Name of Pupil", value: displayValue(readonly.pupilName) },
    { label: "Mother's Name", value: displayValue(readonly.motherName) },
    { label: "Father's Name", value: displayValue(readonly.fatherName) },
    {
      label:
        "Date of Birth (in Christian Era) according to Admission Register (In Fig):",
      value: displayValue(readonly.dateOfBirth),
      subLine: {
        label: "In Words:",
        value: formatDobInWords(readonly.dateOfBirth),
      },
    },
    { label: "Nationality", value: displayValue(readonly.nationality) },
    {
      label:
        "Whether the candidate belongs to Scheduled Caste / Scheduled Tribe / OBC:",
      value: displayValue(readonly.casteCategory),
    },
    {
      label: "Date of first admission in the school with class",
      value: displayValue(tc.dateOfFirstAdmission),
    },
    {
      label: "Class in which the pupil last studied",
      value: displayValue(tc.lastClassStudied || student?.class),
    },
    {
      label: "School/Board Annual Examination last taken with result",
      value: displayValue(tc.annualExamResult),
    },
    {
      label: "Whether failed, if so once/twice in the same class",
      value: displayValue(tc.failedInClass),
    },
    { label: "Subject Studied", value: displayValue(tc.subjectsStudied) },
    {
      label: "Whether qualified for promotion to the higher class",
      value: displayValue(qualified),
      subLine: {
        label: "If so, to which class:",
        value: displayValue(promotionTarget || "N/A"),
      },
    },
    {
      label: "Month Upto Which The (Pupil Has Paid) School Dues Paid",
      value: displayValue(tc.schoolDuesPaidUpto),
    },
    {
      label:
        "Any Fee Concession Availed Of: If So, The Nature Of Such Concession",
      value: displayValue(tc.feeConcession),
    },
    {
      label: "Total No. of working days in the academic session",
      value: displayValue(tc.workingDaysInSession),
    },
    {
      label: "Total No. of working days pupil present in the school",
      value: displayValue(tc.workingDaysPresent),
    },
    {
      label: "Whether NCC Cadet/Boy Scout/Girl Guide (details may be given)",
      value: displayValue(tc.nccCadetScoutGuide),
    },
    {
      label:
        "Games played or extra curricular activities in which the pupil usually took part",
      value: displayValue(tc.gamesExtracurricular),
    },
    { label: "General Conduct", value: displayValue(tc.generalConduct) },
    {
      label: "Date of application for certificate",
      value: displayValue(tc.dateOfApplication),
    },
    {
      label: "Date of issue of certificate",
      value: displayValue(tc.dateOfIssue),
    },
    {
      label: "Reason for leaving the school",
      value: displayValue(tc.reasonForLeaving),
    },
    {
      label: "Any other remarks",
      value: displayValue(tc.otherRemarks, "Nil"),
    },
  ];

  return rows.map((row, index) => ({ index: index + 1, ...row }));
}

export function resolveTransferCertificateIssueDate(tcFormData, locationState = {}) {
  const raw =
    tcFormData?.dateOfIssue ||
    locationState?.dateOfLeaving ||
    locationState?.issuedDate ||
    "";

  if (!raw) {
    return new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return String(raw);
}
