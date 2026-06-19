/** Transfer Certificate ID helpers shared by route/state code. */
export function normalizeStudentId(rawId) {
  if (!rawId || typeof rawId !== "string") return "";
  const studMatch = rawId.match(/^STUD-(\d+)$/i);
  if (studMatch) {
    return `STU${String(parseInt(studMatch[1], 10)).padStart(3, "0")}`;
  }
  return rawId.trim();
}
