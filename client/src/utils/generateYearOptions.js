/** Builds academic year strings like "2024-2025" for dropdowns */
export function generateYearOptions(startYear, endYear) {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(`${year}-${year + 1}`);
  }
  return years;
}
