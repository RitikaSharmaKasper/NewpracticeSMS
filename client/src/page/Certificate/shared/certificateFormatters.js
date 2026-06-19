function formatDobForTransferForm(dateOfBirth) {
  if (!dateOfBirth) return "";
  const parsed = new Date(dateOfBirth);
  if (!Number.isNaN(parsed.getTime())) {
    const day = String(parsed.getDate()).padStart(2, "0");
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const year = parsed.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const parts = String(dateOfBirth).trim().split(/\s+/);
  if (parts.length >= 3) {
    const months = {
      january: "01",
      february: "02",
      march: "03",
      april: "04",
      may: "05",
      june: "06",
      july: "07",
      august: "08",
      september: "09",
      october: "10",
      november: "11",
      december: "12",
    };
    const month = months[parts[1]?.toLowerCase()] || "01";
    const day = String(parts[0]).padStart(2, "0");
    return `${day}/${month}/${parts[2]}`;
  }
  return dateOfBirth;
}

/** Readonly student block on Transfer Certificate create form (Figma 275924) */
export function formatStudentForTransferForm(student) {
  if (!student) return null;
  const category = student.category || "";
  const casteLabel = !category
    ? ""
    : category === "General"
      ? category
      : `Yes - ${category}`;
  return {
    pupilName: student.fullName || "",
    motherName: student.motherName || "",
    fatherName: student.fatherName || "",
    dateOfBirth: formatDobForTransferForm(student.dateOfBirth),
    nationality: student.nationality || "",
    casteCategory: casteLabel,
    fullName: student.fullName || "",
    category: casteLabel,
  };
}
