// import * as Yup from "yup";

// const todayOnly = new Date();
// todayOnly.setDate(todayOnly.getDate()); // Set ==>todayOnly.getDate() + 1==> increase or decrease for getting day and date
// todayOnly.setHours(0, 0, 0, 0); // Remove time

// const visitDateValidation = Yup.date()
//   .transform((value, originalValue) => {
//     return originalValue ? new Date(originalValue) : null; // check or compare & Convert string to Date
//   })
//   .min(todayOnly, "Visit date must be today or later") // Min date is todayOnly
//   .required("Visit date is required");
// export default visitDateValidation;

// import * as Yup from "yup";

// const todayOnly = new Date();
// todayOnly.setDate(todayOnly.getDate()); // Set ==>todayOnly.getDate() + 1==> increase or decrease for getting day and date
// todayOnly.setHours(0, 0, 0, 0); // Remove time

// const visitDateValidation =(existingVisitDate)=>{
//      ///existingVisitDate= "2025-02-06T00:00:00.000Z"
// }
// export default visitDateValidation;

import * as Yup from "yup";

const todayOnly = new Date();
todayOnly.setHours(0, 0, 0, 0); // Reset time to start of today

const visitDateValidation = (existingVisitDate) => {
  return Yup.date()
    .transform((value, originalValue) => {
      return originalValue ? new Date(originalValue) : null; // Convert string to Date
    })
    .test(
      "is-valid-visit-date",
      "Visit date must be today or later",
      function (value) {
        if (!value) return false; // Ensure a date is provided

        const selectedDate = new Date(value);
        selectedDate.setHours(0, 0, 0, 0); // Remove time for accurate comparison

        // If updating and existingVisitDate is in the past, allow it
        if (existingVisitDate) {
          const pastVisitDate = new Date(existingVisitDate);
          pastVisitDate.setHours(0, 0, 0, 0);

          if (selectedDate.getTime() === pastVisitDate.getTime()) {
            return true; // Allow the existing past date
          }
        }

        return selectedDate >= todayOnly; // Enforce today or later
      }
    )
    .required("Visit date is required");
};

export default visitDateValidation;
