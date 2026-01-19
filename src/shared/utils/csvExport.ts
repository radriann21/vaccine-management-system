export const generateCSV = <T extends Record<string, unknown>>(
  data: T[],
  headers: { key: keyof T; label: string }[]
): string => {
  const headerRow = headers.map((h) => h.label).join(",");
  
  const dataRows = data.map((item) => {
    return headers
      .map((header) => {
        const value = item[header.key];
        const stringValue = value !== null && value !== undefined ? String(value) : "";
        return `"${stringValue.replace(/"/g, '""')}"`;
      })
      .join(",");
  });

  return [headerRow, ...dataRows].join("\n");
};

export const downloadCSV = (content: string, filename: string): void => {
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatDateForExport = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-VE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return dateString;
  }
};
