import { fetchCertificateStudent } from "../certificateApi";

function displayOrEmpty(value) {
  if (value == null || String(value).trim() === "") return "";
  return String(value).trim();
}

/** Map real API student response to the shape used by certificate templates */
export function mapApiStudentToPreview(user, locationState) {
  if (user.fullName || user.studentId) {
    return {
      fullName: displayOrEmpty(user.fullName),
      studentId: displayOrEmpty(user.studentId || user.id),
      admissionNumber: displayOrEmpty(user.admissionNumber),
      rollNumber: displayOrEmpty(user.rollNumber),
      currentClass: displayOrEmpty(user.currentClass || user.class),
      section: displayOrEmpty(user.section),
      academicYear: displayOrEmpty(locationState?.academicYear || user.academicYear),
      fatherName: displayOrEmpty(user.fatherName),
      motherName: displayOrEmpty(user.motherName),
      gender: String(user.gender || "").toLowerCase(),
      dateOfBirth: displayOrEmpty(user.dateOfBirth),
      transferReason: displayOrEmpty(locationState?.transferReason),
      transferToSchool: displayOrEmpty(locationState?.transferToSchool),
      dateOfLeaving: displayOrEmpty(locationState?.dateOfLeaving),
      conduct: displayOrEmpty(locationState?.conduct),
    };
  }

  const gender = user.studentInfo?.personalInfo?.gender?.toLowerCase() || "";

  return {
    fullName: displayOrEmpty(user.studentInfo?.personalInfo?.fullName),
    studentId: displayOrEmpty(user.studentInfo?.studentId),
    admissionNumber: displayOrEmpty(user.studentInfo?.admissionNumber),
    rollNumber: displayOrEmpty(user.studentInfo?.rollNumber),
    currentClass: displayOrEmpty(user.studentInfo?.academicInfo?.currentClass),
    section: displayOrEmpty(user.studentInfo?.academicInfo?.section),
    academicYear: displayOrEmpty(
      locationState?.academicYear || user.studentInfo?.academicInfo?.academicYear
    ),
    fatherName: displayOrEmpty(user.studentInfo?.parentInfo?.father?.fullName),
    gender,
    dateOfBirth: user.studentInfo?.personalInfo?.dateOfBirth
      ? new Date(user.studentInfo.personalInfo.dateOfBirth).toLocaleDateString(
          "en-GB",
          { day: "2-digit", month: "long", year: "numeric" }
        )
      : "",
    transferReason: displayOrEmpty(
      locationState?.transferReason ||
        user.studentInfo?.previousSchool?.transferReason
    ),
    transferToSchool: displayOrEmpty(locationState?.transferToSchool),
    dateOfLeaving: displayOrEmpty(locationState?.dateOfLeaving),
    conduct: displayOrEmpty(locationState?.conduct),
  };
}

/** Load student for certificate preview from backend API */
export async function loadCertificateStudent(studentId, locationState) {
  const apiStudent = await fetchCertificateStudent(studentId);
  return mapApiStudentToPreview(apiStudent, locationState);
}

export function getCertificateHonorifics(gender) {
  const isFemale = gender === "female";
  const isMale = gender === "male";

  return {
    honorific: isFemale ? "Ms." : isMale ? "Mr." : "Mr./Ms.",
    parentRelation: isFemale ? "D/o" : isMale ? "S/o" : "S/o D/o",
    pronounSubject: isFemale ? "She" : isMale ? "He" : "He/She",
    pronounObject: isFemale ? "her" : isMale ? "him" : "him/her",
    pronounPossessive: isFemale ? "Her" : isMale ? "His" : "His/Her",
  };
}
