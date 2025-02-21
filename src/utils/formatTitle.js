export const formatTitle = (text) => {
  if (!text) return "Not Provided";
  return text
    .replace(/([A-Z])/g, " $1") // Insert space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};

const data = "fieldExecutive";
// console.log(formatTitle(data)); // Output: "Field Executive"
