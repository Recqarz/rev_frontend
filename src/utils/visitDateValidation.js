import * as Yup from "yup";

const todayOnly = new Date();
todayOnly.setDate(todayOnly.getDate()); // Set ==>todayOnly.getDate() + 1==> increase or decrease for getting day and date
todayOnly.setHours(0, 0, 0, 0); // Remove time

const visitDateValidation = Yup.date()
  .transform((value, originalValue) => {
    return originalValue ? new Date(originalValue) : null; // check or compare & Convert string to Date
  })
  .min(todayOnly, "Visit date must be today or later") // Min date is todayOnly
  .required("Visit date is required");
export default visitDateValidation;
