import React, { useEffect, useState } from "react";
import { labelStyle } from "../shared/certificateStyles";
import { useCertificateMeta } from "../shared/useCertificateMeta";
import CertificateDropdown from "./CertificateDropdown";
import {
  fetchCertificateByStudent,
  fetchCertificateStudents,
  getCertificateApiError,
} from "../certificateApi";
import { toast } from "react-toastify";

/**
 * Controlled filter row — Academic Year, Class, Section, Student.
 */
function TransferCertificateFilterRow({
  filterValues,
  onFilterChange,
  showCertificateStatus = false,
}) {
  const { academicYear, className, section, studentId } = filterValues;
  const { academicYears, classes, sections, isLoading: isLoadingMeta } =
    useCertificateMeta();
  const [studentsWithStatus, setStudentsWithStatus] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);

  useEffect(() => {
    if (!academicYear || !className || !section) {
      setStudentsWithStatus([]);
      return;
    }

    let isActive = true;
    async function loadStudents() {
      setIsLoadingStudents(true);
      try {
        const students = await fetchCertificateStudents({
          academicYear,
          className,
          section,
        });

        if (!showCertificateStatus) {
          if (isActive) setStudentsWithStatus(students);
          return;
        }

        const statusRows = await Promise.all(
          students.map(async (student) => {
            const studentId = student.studentId || student.id;
            const certificate = await fetchCertificateByStudent(studentId, {
              certificateType: "transfer",
              academicYear,
              className,
              section,
            });
            return { ...student, hasCertificate: Boolean(certificate) };
          })
        );
        if (isActive) setStudentsWithStatus(statusRows);
      } catch (error) {
        if (!isActive) return;
        setStudentsWithStatus([]);
        toast.error(getCertificateApiError(error, "Failed to load students"));
      } finally {
        if (isActive) setIsLoadingStudents(false);
      }
    }

    loadStudents();
    return () => {
      isActive = false;
    };
  }, [academicYear, className, section, showCertificateStatus]);

  const handleAcademicYearChange = (value) => {
    onFilterChange({
      academicYear: value,
      className: "",
      section: "",
      studentId: "",
    });
  };

  const handleClassChange = (value) => {
    onFilterChange({
      ...filterValues,
      className: value,
      section: "",
      studentId: "",
    });
  };

  const handleSectionChange = (value) => {
    onFilterChange({
      ...filterValues,
      section: value,
      studentId: "",
    });
  };

  const handleStudentChange = (value) => {
    onFilterChange({
      ...filterValues,
      studentId: value,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
      <div className="flex flex-col gap-2 min-w-0">
        <label className={labelStyle}>Academic Year</label>
        <CertificateDropdown
          value={academicYear}
          options={academicYears}
          placeholder={
            isLoadingMeta ? "Loading academic years..." : "Select academic year"
          }
          onChange={handleAcademicYearChange}
          disabled={isLoadingMeta}
        />
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <label className={labelStyle}>Class</label>
        <CertificateDropdown
          value={className}
          options={classes}
          placeholder="Select class"
          onChange={handleClassChange}
          disabled={!academicYear || isLoadingMeta}
        />
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <label className={labelStyle}>Section</label>
        <CertificateDropdown
          value={section}
          options={sections}
          placeholder="Select section"
          onChange={handleSectionChange}
          disabled={!className || isLoadingMeta}
        />
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <label className={labelStyle}>Student</label>
        <CertificateDropdown
          value={studentId}
          options={studentsWithStatus}
          placeholder={
            isLoadingStudents
              ? "Loading students..."
              : section && !studentsWithStatus.length
                ? "No students found"
                : "Select student"
          }
          onChange={handleStudentChange}
          disabled={!section}
          getOptionLabel={(student) =>
            `${student.fullName}${
              showCertificateStatus
                ? student.hasCertificate
                  ? " (TC created)"
                  : " (Not created)"
                : ""
            }`
          }
          getOptionValue={(student) => student.studentId || student.id}
        />
      </div>
    </div>
  );
}

export default TransferCertificateFilterRow;
