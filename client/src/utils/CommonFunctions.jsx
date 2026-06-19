export const getTotalFileSize = (files = []) => {
  const totalKB = files.reduce((total, file) => {
    const sizeStr = file?.fileSize || "0 KB";
    const [value, unit] = sizeStr.split(" ");
    const numericValue = parseFloat(value) || 0;

    if (unit === "MB") {
      return total + numericValue * 1024;
    }

    // default KB
    return total + numericValue;
  }, 0);

  if (totalKB >= 1024) {
    return `${(totalKB / 1024).toFixed(2)} MB`;
  }

  return `${totalKB.toFixed(2)} KB`;
};



export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");

  return new Date(
    2026,
    0,
    1,
    Number(hours),
    Number(minutes)
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};