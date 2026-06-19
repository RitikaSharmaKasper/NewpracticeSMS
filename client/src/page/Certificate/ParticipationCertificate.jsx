/**
 * Participation Certificate create flow — Figma 6620.
 * Step 1: Search (Academic Year, Class, Section, Student)
 * Step 2: Select Design templates + Content textarea + Generate
 *
 * After Generate → navigates to ParticipationCertificatePreview for print/download.
 */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CertificateBackLink from "./components/CertificateBackLink";
import { useCertificateMeta } from "./shared/useCertificateMeta";
import CertificateDropdown from "./components/CertificateDropdown";
import { CertificateTemplate1Thumbnail } from "./components/ParticipationCertificateThumbnails";
import {
  certificateCardClass,
  certificatePrimaryButtonClass,
  labelStyle,
  tcGenerateFullWidthClass,
} from "./shared/certificateStyles";
import {
  createCertificate,
  fetchCertificateStudents,
  getCertificateApiError,
} from "./certificateApi";
import { DEFAULT_PARTICIPATION_CERTIFICATE_CONTENT } from "./shared/participationCertificateDefaults";

const templates = [
  { id: "t1", Thumbnail: CertificateTemplate1Thumbnail },
];

const noop = () => {};

function ParticipationCertificate({
  certificateType = "participation",
  pageTitle = "Participation Certificate",
  previewPath = "/certificate/participation_Certificate",
  certificateSubtitle = "OF PARTICIPATION",
  defaultContentText = DEFAULT_PARTICIPATION_CERTIFICATE_CONTENT,
}) {
  const navigate = useNavigate();
  const { academicYears, classes, sections, isLoading: isLoadingMeta } =
    useCertificateMeta();

  const [step, setStep] = useState(1);
  const [academicYear, setAcademicYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);
  const [content, setContent] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const defaultContent = defaultContentText;

  const moveToTemplateStep = () => {
    if (!academicYear || !selectedClass || !selectedSection || !selectedStudentId) {
      toast.error("Please select Academic Year, Class, Section, and Student.");
      return;
    }

    setSelectedTemplateId(templates[0].id);
    setContent("");
    setStep(2);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    // Empty textarea uses the Figma placeholder suggestion as generated content.
    const certificateContent = content.trim() || defaultContent;
    if (!certificateContent.trim()) {
      toast.error("Please enter content text.");
      return;
    }

    setIsSaving(true);
    try {
      const saved = await createCertificate({
        certificateType,
        studentId: selectedStudentId,
        academicYear,
        className: selectedClass,
        section: selectedSection,
        templateId: selectedTemplateId,
        subtitle: certificateSubtitle,
        content: certificateContent,
      });

      navigate(`${previewPath}/${selectedStudentId}`, {
        state: {
          certificateId: saved?.id,
          academicYear,
          class: selectedClass,
          section: selectedSection,
          templateId: selectedTemplateId,
          content: saved?.content || certificateContent,
        },
      });
    } catch (error) {
      if (error.response?.status === 409 && error.response?.data?.data) {
        const existing = error.response.data.data;
        toast.info("Certificate already exists. Opening preview.");
        navigate(`${previewPath}/${existing.studentId}`, {
          state: {
            certificateId: existing.id,
            academicYear: existing.academicYear,
            class: existing.className,
            section: existing.section,
            templateId: existing.templateId,
            content: existing.content,
          },
        });
        return;
      }
      toast.error(getCertificateApiError(error, "Could not generate certificate"));
    } finally {
      setIsSaving(false);
    }
  };

  if (step === 2) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <CertificateBackLink
          onClick={() => {
            setStep(1);
          }}
        />

        {/* Box 1: selected student filters (readonly) */}
        <div className={certificateCardClass}>
          <h2 className="text-[18px] font-semibold text-[#1C1C1C] leading-none">
            {pageTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
            <div className="flex flex-col gap-2 min-w-0">
              <label className={labelStyle}>Academic Year</label>
              <CertificateDropdown
                value={academicYear}
                options={academicYears}
                placeholder="Select academic year"
                onChange={noop}
                disabled
              />
            </div>

            <div className="flex flex-col gap-2 min-w-0">
              <label className={labelStyle}>Class</label>
              <CertificateDropdown
                value={selectedClass}
                options={classes}
                placeholder="Select class"
                onChange={noop}
                disabled
              />
            </div>

            <div className="flex flex-col gap-2 min-w-0">
              <label className={labelStyle}>Section</label>
              <CertificateDropdown
                value={selectedSection}
                options={sections}
                placeholder="Select section"
                onChange={noop}
                disabled
              />
            </div>

            <div className="flex flex-col gap-2 min-w-0">
              <label className={labelStyle}>Student</label>
              <CertificateDropdown
                value={selectedStudentId}
                options={filteredStudents}
                placeholder="Select student"
                onChange={noop}
                disabled
                getOptionLabel={(student) => student.fullName}
                getOptionValue={(student) => student.id}
              />
            </div>
          </div>
        </div>

        {/* Box 2: Select Design + Content + Generate */}
        <div className={certificateCardClass}>
          <form onSubmit={handleGenerate} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-3">
              <p className="text-[14px] font-semibold text-[#1C1C1C] m-0">
                Select Design
              </p>

              <div className="flex flex-row gap-6 items-start">
                {templates.map((t) => {
                  const active = t.id === selectedTemplateId;
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setSelectedTemplateId(t.id)}
                      className="flex flex-col items-center gap-2 w-[190px] sm:w-[210px]"
                    >
                      <div
                        className={`w-full rounded-[10px] border transition-colors overflow-hidden ${
                          active ? "border-[#0B3142]" : "border-[#E6E6E6]"
                        }`}
                        style={{ aspectRatio: "1.6 / 1" }}
                      >
                        <t.Thumbnail subtitle={certificateSubtitle} />
                      </div>

                      {/* radio indicator under the template */}
                      <div className="w-full flex items-center justify-center">
                        <span
                          className={`size-4 rounded-full border-2 flex items-center justify-center ${
                            active ? "border-[#0B3142]" : "border-[#D9D9D9]"
                          }`}
                          aria-hidden="true"
                        >
                          {active && (
                            <span className="size-2 rounded-full bg-[#0B3142]" />
                          )}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-semibold text-[#1C1C1C] m-0">Content</p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[84px] border border-[#E6E6E6] rounded-[12px] bg-white px-4 py-3 text-[14px] font-normal text-[#1C1C1C] outline-none focus:border-[#0B3142] resize-y"
                placeholder={defaultContent || "Enter certificate content"}
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className={tcGenerateFullWidthClass}
            >
              {isSaving ? "Generating..." : "Generate"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className={certificateCardClass}>
        <h2 className="text-[18px] font-semibold text-[#1C1C1C] leading-none">
          {pageTitle}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            moveToTemplateStep();
          }}
          className="flex flex-col gap-9 w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
            <div className="flex flex-col gap-2 min-w-0">
              <label className={labelStyle}>Academic Year</label>
              <CertificateDropdown
                value={academicYear}
                options={academicYears}
                placeholder={
                  isLoadingMeta ? "Loading academic years..." : "Select academic year"
                }
                onChange={(value) => {
                  setAcademicYear(value);
                  setSelectedClass("");
                  setSelectedSection("");
                  setSelectedStudentId("");
                }}
                disabled={isLoadingMeta}
              />
            </div>

            <div className="flex flex-col gap-2 min-w-0">
              <label className={labelStyle}>Class</label>
              <CertificateDropdown
                value={selectedClass}
                options={classes}
                placeholder="Select class"
                onChange={(value) => {
                  setSelectedClass(value);
                  setSelectedSection("");
                  setSelectedStudentId("");
                }}
                disabled={!academicYear || isLoadingMeta}
              />
            </div>

            <div className="flex flex-col gap-2 min-w-0">
              <label className={labelStyle}>Section</label>
              <CertificateDropdown
                value={selectedSection}
                options={sections}
                placeholder="Select section"
                onChange={(value) => {
                  setSelectedSection(value);
                  setSelectedStudentId("");
                }}
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
                getOptionValue={(student) => student.id}
              />
            </div>
          </div>

          <div className="flex items-start">
            <button
              type="submit"
              disabled={
                !academicYear || !selectedClass || !selectedSection || !selectedStudentId
              }
              className={`${certificatePrimaryButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ParticipationCertificate;

