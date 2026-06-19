import React from "react";
import { useCertificateMeta } from "../shared/useCertificateMeta";
import {
  tcFormReadonlyClass,
  tcFormTextInputClass,
} from "../shared/certificateStyles";
import {
  EMPTY_READONLY_STUDENT,
  transferCertificateWritablePlaceholders,
} from "../create/transferCertificateCreateData";
import CertificateDropdown from "./CertificateDropdown";
import TransferCertificateFormRow from "./TransferCertificateFormRow";

/**
 * Writable: lastClassStudied, annualExamResult, promotion, NCC, games,
 * generalConduct, dates, reasonForLeaving, otherRemarks.
 * All other rows are readonly (gray, no cursor).
 */

/** Static pupil data — gray box only; cannot focus or type */
function ReadonlyField({ value }) {
  return (
    <div className={tcFormReadonlyClass} aria-readonly="true" tabIndex={-1}>
      <span className="truncate w-full pointer-events-none">{value || ""}</span>
    </div>
  );
}

/** Editable text — white box (cursor allowed) */
function TextField({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      className={tcFormTextInputClass}
      value={value ?? ""}
      placeholder={placeholder}
      autoComplete="off"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function SelectField({ value, onChange, options, placeholder = "Select" }) {
  return (
    <CertificateDropdown
      value={value}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      getOptionLabel={(option) => option.label ?? option}
      getOptionValue={(option) => option.value ?? option}
    />
  );
}

function TransferCertificateCreateForm({
  readonlyStudent,
  formValues,
  onFormChange,
}) {
  const { classes } = useCertificateMeta();
  const readonly = readonlyStudent || EMPTY_READONLY_STUDENT;

  const update = (field, value) => {
    onFormChange({ ...formValues, [field]: value });
  };

  const yesNoOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const classOptions = classes.map((cls) => ({
    value: cls,
    label: cls,
  }));

  const promotionClassOptions = [
    { value: "N/A", label: "N/A" },
    ...classOptions,
  ];

  return (
    <div className="flex flex-col w-full max-w-full">
      <TransferCertificateFormRow label="Name of Pupil">
        <ReadonlyField value={readonly.pupilName} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Mother's Name">
        <ReadonlyField value={readonly.motherName} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Father's Name">
        <ReadonlyField value={readonly.fatherName} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Date of Birth">
        <ReadonlyField value={readonly.dateOfBirth} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Nationality">
        <ReadonlyField value={readonly.nationality} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Whether the candidate belongs to Scheduled Caste / Scheduled Tribe / OBC">
        <ReadonlyField value={readonly.casteCategory} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Date of first admission in the school with class">
        <ReadonlyField value={formValues.dateOfFirstAdmission} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Class in which the pupil last studied">
        <SelectField
          value={formValues.lastClassStudied}
          onChange={(v) => update("lastClassStudied", v)}
          options={classOptions}
          placeholder="Select class"
        />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="School/Board Annual Examination last taken with result">
        <TextField
          value={formValues.annualExamResult}
          onChange={(v) => update("annualExamResult", v)}
          placeholder={transferCertificateWritablePlaceholders.annualExamResult}
        />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Whether failed, if so once/twice in the same class">
        <ReadonlyField value={formValues.failedInClass} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Subject Studied">
        <ReadonlyField value={formValues.subjectsStudied} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Whether qualified for promotion to the higher class: If so, to which class">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="flex-1 min-w-0">
            <SelectField
              value={formValues.qualifiedForPromotion}
              onChange={(v) => update("qualifiedForPromotion", v)}
              options={yesNoOptions}
              placeholder="Select"
            />
          </div>
          <div className="flex-1 min-w-0">
            <SelectField
              value={formValues.promotionTargetClass}
              onChange={(v) => update("promotionTargetClass", v)}
              options={promotionClassOptions}
              placeholder="Select class"
            />
          </div>
        </div>
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Month Upto Which The (Pupil Has Paid) School Dues Paid">
        <ReadonlyField value={formValues.schoolDuesPaidUpto} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Any Fee Concession Availed Of: If So, The Nature Of Such Concession">
        <ReadonlyField value={formValues.feeConcession} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Total No. of working days in the academic session">
        <ReadonlyField value={formValues.workingDaysInSession} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Total No. of working days pupil present in the school">
        <ReadonlyField value={formValues.workingDaysPresent} />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Whether NCC Cadet/Boy Scout/Girl Guide (details may be given)">
        <SelectField
          value={formValues.nccCadetScoutGuide}
          onChange={(v) => update("nccCadetScoutGuide", v)}
          options={yesNoOptions}
          placeholder="Select"
        />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Games played or extra curricular activities in which the pupil usually took part">
        <SelectField
          value={formValues.gamesExtracurricular}
          onChange={(v) => update("gamesExtracurricular", v)}
          options={yesNoOptions}
          placeholder="Select"
        />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="General Conduct">
        <TextField
          value={formValues.generalConduct}
          onChange={(v) => update("generalConduct", v)}
          placeholder={transferCertificateWritablePlaceholders.generalConduct}
        />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Date of application for certificate">
        <TextField
          type="date"
          value={formValues.dateOfApplication}
          onChange={(v) => update("dateOfApplication", v)}
          placeholder={transferCertificateWritablePlaceholders.dateOfApplication}
        />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Date of issue of certificate">
        <TextField
          type="date"
          value={formValues.dateOfIssue}
          onChange={(v) => update("dateOfIssue", v)}
          placeholder={transferCertificateWritablePlaceholders.dateOfIssue}
        />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Reason for leaving the school">
        <TextField
          value={formValues.reasonForLeaving}
          onChange={(v) => update("reasonForLeaving", v)}
          placeholder={transferCertificateWritablePlaceholders.reasonForLeaving}
        />
      </TransferCertificateFormRow>

      <TransferCertificateFormRow label="Any other remarks">
        <TextField
          value={formValues.otherRemarks}
          onChange={(v) => update("otherRemarks", v)}
          placeholder={transferCertificateWritablePlaceholders.otherRemarks}
        />
      </TransferCertificateFormRow>
    </div>
  );
}

export default TransferCertificateCreateForm;
