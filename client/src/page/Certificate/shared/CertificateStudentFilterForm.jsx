/**
 * Reusable certificate form — Academic Year, Class, Section, Student, then Generate.
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CertificateDropdown from "../components/CertificateDropdown";
import { labelStyle } from "./certificateStyles";
import { useCertificateMeta } from "./useCertificateMeta";
import {
  createCertificate,
  fetchCertificateByStudent,
  fetchCertificateStudents,
  getCertificateApiError,
} from "../certificateApi";

export default function CertificateStudentFilterForm({
  title,
  routeBase,
  certificateType = null,
  submitLabel = "Generate",
  extraFields = null,
  buildNavigateState,
  initialFilters = null,
}) {
  const navigate = useNavigate();
  const { academicYears, classes, sections, isLoading: isLoadingMeta } =
    useCertificateMeta();

  const [academicYear, setAcademicYear] = useState(initialFilters?.academicYear || "");
  const [selectedClass, setSelectedClass] = useState(initialFilters?.class || "");
  const [selectedSection, setSelectedSection] = useState(initialFilters?.section || "");
  const [selectedStudentId, setSelectedStudentId] = useState(
    initialFilters?.studentId || ""
  );
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!academicYear || !selectedClass || !selectedSection) {
      setFilteredStudents([]);
      return;
    }

    let isActive = true;
    async function loadStudents() {
      setIsLoadingStudents(true);
      try {
        const students = await fetchCertificateStudents({
          academicYear,
          className: selectedClass,
          section: selectedSection,
        });
        if (isActive) setFilteredStudents(students);
      } catch (error) {
        if (!isActive) return;
        setFilteredStudents([]);
        toast.error(getCertificateApiError(error, "Failed to load students"));
      } finally {
        if (isActive) setIsLoadingStudents(false);
      }
    }

    loadStudents();
    return () => {
      isActive = false;
    };
  }, [academicYear, selectedClass, selectedSection]);

  const handleAcademicYearChange = (value) => {
    setAcademicYear(value);
    setSelectedClass("");
    setSelectedSection("");
    setSelectedStudentId("");
  };

  const handleClassChange = (value) => {
    setSelectedClass(value);
    setSelectedSection("");
    setSelectedStudentId("");
  };

  const handleSectionChange = (value) => {
    setSelectedSection(value);
    setSelectedStudentId("");
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (isGenerating) return;
    if (!academicYear || !selectedClass || !selectedSection || !selectedStudentId) {
      toast.error("Please fill all fields before generating the certificate.");
      return;
    }
    let baseState = {
      academicYear,
      class: selectedClass,
      section: selectedSection,
    };
    if (certificateType) {
      setIsGenerating(true);
      try {
        const existing = await fetchCertificateByStudent(selectedStudentId, {
          certificateType,
          academicYear,
          className: selectedClass,
          section: selectedSection,
        });
        if (existing) {
          toast.info("Certificate already exists. Opening preview.");
          navigate(`/certificate/${routeBase}/${existing.studentId}`, {
            state: {
              certificateId: existing._id || existing.id,
              academicYear: existing.academicYear,
              class: existing.className,
              section: existing.section,
            },
          });
          return;
        }

        const saved = await createCertificate({
          certificateType,
          studentId: selectedStudentId,
          academicYear,
          className: selectedClass,
          section: selectedSection,
        });
        baseState = { ...baseState, certificateId: saved?._id || saved?.id };
      } catch (error) {
        if (error.response?.status === 409 && error.response?.data?.data) {
          const existing = error.response.data.data;
          toast.info("Certificate already exists. Opening preview.");
          navigate(`/certificate/${routeBase}/${existing.studentId}`, {
            state: {
              certificateId: existing._id || existing.id,
              academicYear: existing.academicYear,
              class: existing.className,
              section: existing.section,
            },
          });
          return;
        }
        toast.error(getCertificateApiError(error, "Could not generate certificate"));
        return;
      } finally {
        setIsGenerating(false);
      }
    }
    const navigateState = buildNavigateState
      ? buildNavigateState(baseState)
      : baseState;
    if (buildNavigateState && navigateState === null) return;

    navigate(`/certificate/${routeBase}/${selectedStudentId}`, {
      state: navigateState,
    });
  };

  return (
    <div className="bg-white rounded-[16px] p-4 shadow-[0px_0px_4px_rgba(0,0,0,0.15)] flex flex-col gap-9 w-full">
      <h2 className="text-[18px] font-semibold text-[#1C1C1C] leading-none">
        {title}
      </h2>

      <form onSubmit={handleGenerate} className="flex flex-col gap-9 w-full">
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
              value={selectedClass}
              options={classes}
              placeholder="Select class"
              onChange={handleClassChange}
              disabled={!academicYear || isLoadingMeta}
            />
          </div>

          <div className="flex flex-col gap-2 min-w-0">
            <label className={labelStyle}>Section</label>
            <CertificateDropdown
              value={selectedSection}
              options={sections}
              placeholder="Select section"
              onChange={handleSectionChange}
              disabled={!selectedClass || isLoadingMeta}
            />
          </div>

          <div className="flex flex-col gap-2 min-w-0">
            <label className={labelStyle}>Student</label>
            <CertificateDropdown
              value={selectedStudentId}
              options={filteredStudents}
              placeholder={
                isLoadingStudents
                  ? "Loading students..."
                  : selectedSection && !filteredStudents.length
                  ? "No students found"
                  : "Select student"
              }
              onChange={setSelectedStudentId}
              disabled={!selectedSection}
              getOptionLabel={(student) => student.fullName}
              getOptionValue={(student) => student.studentId || student.id}
            />
          </div>
        </div>

        {extraFields}

        <div className="flex items-start">
          <button
            type="submit"
            disabled={
              !academicYear ||
              !selectedClass ||
              !selectedSection ||
              !selectedStudentId ||
              isGenerating
            }
            className="min-w-[124px] px-6 py-3 bg-[#0B3142] text-white rounded-[8px] text-[16px] font-semibold leading-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#15465c] transition-colors"
          >
            {isGenerating ? "Generating..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
