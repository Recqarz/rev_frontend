export const formattedDate = (dateString) => {
  const date = new Date(dateString);

  // Extract year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  // Return formatted date
  return `${year}-${month}-${day}`;
};

// Convert YYYY-MM-DD -> DD/MM/YYYY (For UI Display)
// Convert ISO/Date object/YYY-MM-DD -> DD/MM/YYYY
export const formatToDDMMYYYY = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr); // Converts to Date object
  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit format
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// Convert DD/MM/YYYY -> YYYY-MM-DD (For <input type="date">)
// Convert ISO/Date object -> YYYY/MM/DD
export const formatToYYYYMMDD = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr); // Converts to Date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month
  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day

  return `${year}/${month}/${day}`;
};
