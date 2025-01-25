import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, resetForm } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllBankData } from "../../redux/banks/bankAction";
import {
  addCaseData,
  getAllCaseData,
  getCaseById,
  updateCaseDataId,
} from "../../redux/case/caseAction";
import { formattedDate } from "../../utils/formattedDate";
import Swal from "sweetalert2";

const AddCases = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("caseId");

  const { data: caseData } = useSelector((state) => state.caseReducer);
  console.log(
    "caseData clientAddress?.state==>",
    caseData?.clientAddress?.state
  );
  //get banks
  const { accessToken } = useSelector((store) => store?.authReducer);
  const { isLoading, isError, data } = useSelector(
    (state) => state.allBankReducer
  );
  const { banks } = data;
  useEffect(() => {
    if (caseId) {
      dispatch(getCaseById(caseId));
    }
    dispatch(getAllBankData());
  }, [dispatch, caseId]);

  const AddCaseSchema = [
    {
      key: 1,
      label: "Work for bank",
      htmlFor: "workForBank",
      as: "select",
      name: "workForBank",
      // type: 'workForBank',
      id: "workForBank",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Bank Name",

      options: [
        { key: 0, value: "", label: "Select Bank" }, // Default empty value
        ...(banks ?? [])?.map((bank, index) => ({
          key: index + 1, // Adjust index to avoid conflict with the default option key
          value: bank?._id,
          label: `${bank?.bankName} (${bank?.branchName})`,
        })),
      ],
      validation: Yup.string().required("Bank Name is required"),
      initialValue: caseData?.bankId || "",
    },
    {
      key: 2,
      label: "Bank Ref No.",
      htmlFor: "bankRefNo",
      name: "bankRefNo",
      type: "text",
      id: "bankRefNo",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Bank Ref No.",
      validation: Yup.string().required("Bank Ref No. is required"),
      initialValue: caseData?.bankRefNo || "",
    },
    {
      key: 3,
      label: "Client Name",
      htmlFor: "clientName",
      name: "clientName",
      type: "text",
      id: "clientName",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Client Name",
      validation: Yup.string().required("Client Name is required"),
      initialValue: caseData?.clientName || "",
    },
    {
      key: 4,
      label: "BOV Report No.",
      htmlFor: "BOV_ReportNo",
      name: "BOV_ReportNo",
      type: "text",
      id: "BOV_ReportNo",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter BOV Report No.",
      validation: Yup.string()
        .required("BOV Report No. is required")
        .nullable(),
      initialValue: caseData?.BOV_ReportNo || "",
    },
    {
      key: 5,
      label: "Zone",
      htmlFor: "zone",
      as: "select",
      name: "zone",
      // type: 'zone',
      id: "zone",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Select Zone",

      options: [
        { key: 0, value: "", label: "Select Zone" }, // Default empty value
        { key: 1, value: "east", label: "East" },
        { key: 2, value: "west", label: "West" },
        { key: 3, value: "north", label: "North" },
        { key: 4, value: "south", label: "South" },
      ],
      validation: Yup.string().required("Zone is required"),
      initialValue: caseData?.zone || "",
    },
    {
      key: 6,
      label: "Contact No.",
      htmlFor: "contactNo",
      name: "contactNo",
      type: "number",
      id: "contactNo",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter phone number",
      validation: Yup.string()
        .transform((value) => value.replace(/^0+/, "")) // Remove leading zeros
        .matches(/^\d{10}$/, "Phone number must be 10 digits") // Validate 10-digit number
        .required("Contact No. is required")
        .nullable(),
      initialValue: caseData?.contactNo || "",
    },
    {
      key: 7,
      label: "Visit Date (MM/DD/YYYY)",
      htmlFor: "visitDate",
      name: "visitDate",
      type: "date",
      id: "visitDate",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Visit Date",
      validation: Yup.string().required("Visit Date. is required").nullable(),
      initialValue: formattedDate(caseData?.visitDate) || "",
    },
    {
      key: 8,
      label: "Client Address (Address Line1)",
      htmlFor: "addressLine1",
      name: "addressLine1",
      type: "text",
      id: "addressLine1",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Address Line1",
      validation: Yup.string().required("Address Line1 is required").nullable(),
      initialValue: caseData?.clientAddress?.addressLine1 || "",
    },
    {
      key: 9,
      label: "Address Line2",
      htmlFor: "addressLine2",
      name: "addressLine2",
      type: "text",
      id: "addressLine2",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Address Line2",
      validation: Yup.string().required("Address Line2 is required").nullable(),
      initialValue: caseData?.clientAddress?.addressLine2 || "",
    },
    {
      key: 10,
      label: "Plot No.",
      htmlFor: "plotNumber",
      name: "plotNumber",
      type: "text",
      id: "plotNumber",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Plot No.",
      validation: Yup.string().required("Plot No. is required").nullable(),
      initialValue: caseData?.clientAddress?.plotNumber || "",
    },
    {
      key: 11,
      label: "Street Name",
      htmlFor: "streetName",
      name: "streetName",
      type: "text",
      id: "streetName",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Street Name",
      validation: Yup.string().required("Street Name is required").nullable(),
      initialValue: caseData?.clientAddress?.streetName || "",
    },
    {
      key: 12,
      label: "Land Mark",
      htmlFor: "landMark",
      name: "landMark",
      type: "text",
      id: "landMark",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Land Mark",
      validation: Yup.string().required("Land Mark is required").nullable(),
      initialValue: caseData?.clientAddress?.landMark || "",
    },
    {
      key: 13,
      label: "Pin code",
      htmlFor: "pincode",
      name: "pincode",
      type: "text",
      id: "pincode",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Pin code",
      validation: Yup.string().required("Pin code is required").nullable(),
      initialValue: caseData?.clientAddress?.pincode || "",
    },
    {
      key: 14,
      label: "City",
      htmlFor: "city",
      name: "city",
      type: "text",
      id: "city",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter City",
      validation: Yup.string().required("City is required").nullable(),
      initialValue: caseData?.clientAddress?.city || "",
    },
    {
      key: 15,
      label: "State",
      htmlFor: "state",
      as: "select",
      name: "state",
      // type: 'state',
      id: "state",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Select State",

      options: [
        { key: 0, value: "", label: "Select State" }, // Default empty value
        { key: 1, value: "Delhi", label: "Delhi" },
        { key: 2, value: "Uttar Pradesh", label: "Uttar Pradesh" },
      ],
      validation: Yup.string().required("State is required"),
      initialValue: caseData?.clientAddress?.state || "",
    },
  ];
  const validationSchema = Yup.object(
    AddCaseSchema.reduce((schema, field) => {
      if (field.validation) {
        schema[field.name] = field.validation;
      }
      return schema;
    }, {})
  );

  const initialValues = AddCaseSchema.reduce((values, field) => {
    values[field.name] = field.initialValue || ""; // Use defaultValue or fallback to an empty string
    return values;
  }, {});

  // const handleSubmit = (values, { resetForm }) => {
  //   const formattedValues = {
  //     bankId: values.workForBank,
  //     bankRefNo: values.bankRefNo,
  //     clientName: values.clientName,
  //     BOV_ReportNo: values.BOV_ReportNo,
  //     clientAddress: {
  //       addressLine1: values.addressLine1,
  //       addressLine2: values.addressLine2,
  //       plotNumber: values.plotNumber,
  //       streetName: values.streetName,
  //       landMark: values.landMark,
  //       pincode: values.pincode,
  //       city: values.city,
  //       state: values.state,
  //     },
  //     zone: values.zone,
  //     contactNo: values.contactNo,
  //     visitDate: new Date(values?.visitDate).toISOString(), // Converts the date to timestamp
  //   };

  //   if (caseId) {
  //     dispatch(updateCaseDataId(formattedValues, accessToken, caseId));
  //   } else {
  //     dispatch(addCaseData(formattedValues, accessToken, navigate));
  //     resetForm();
  //   }
  // };

  const handleSubmit = async (values, { resetForm }) => {
    const formattedValues = {
      bankId: values.workForBank,
      bankRefNo: values.bankRefNo,
      clientName: values.clientName,
      BOV_ReportNo: values.BOV_ReportNo,
      clientAddress: {
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        plotNumber: values.plotNumber,
        streetName: values.streetName,
        landMark: values.landMark,
        pincode: values.pincode,
        city: values.city,
        state: values.state,
      },
      zone: values.zone,
      contactNo: values.contactNo,
      visitDate: new Date(values?.visitDate).toISOString(), // Converts the date to ISO format
    };

    try {
      if (caseId) {
        // Show confirmation dialog for updating case
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to update this case?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update it!",
          customClass: {
            popup: "small-swal", // Apply custom class to the popup
          },
        });

        if (result.isConfirmed) {
          dispatch(updateCaseDataId(formattedValues, accessToken, caseId));
        }
      } else {
        // Add a new case
        dispatch(addCaseData(formattedValues, accessToken, navigate));
        resetForm(); // Reset the form after successful submission
      }
    } catch (error) {
      // Handle errors and show appropriate feedback
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="text-xl font-semibold">
          {caseId ? "Update Case" : "Add Case"}
        </h3>
      </div>

      <div className="m-5 bg-white border-2 rounded-lg shadow border-gray-300">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, resetForm, dirty }) => (
            <Form>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 m-4">
                {AddCaseSchema?.map((item) => (
                  <div key={item?.key} className={item?.mainDivClassname}>
                    <div>
                      <label
                        htmlFor={item?.htmlFor}
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        {item?.label}
                      </label>
                      {item?.as === "select" ? (
                        <Field
                          as="select"
                          name={item?.name}
                          id={item?.id}
                          className={item?.inputFieldClassName}
                        >
                          {item?.options?.map((option) => (
                            <option key={option?.key} value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </Field>
                      ) : (
                        <Field
                          type={item?.type}
                          name={item?.name}
                          id={item?.id}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                          placeholder={item?.placeholder}
                        />
                      )}
                      <ErrorMessage
                        name={item?.name}
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-center md:justify-end m-4">
                <button
                  type="button" // Use type="button" to prevent triggering form submission
                  className={`hover:bg-red-500 text-white px-4 py-2 rounded-lg  ${
                    dirty
                      ? "bg-red-400 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => resetForm()}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className={`hover:bg-[#104e3d] text-white px-4 py-2 rounded-lg  ${
                    dirty
                      ? "bg-[#1f6c57] cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!dirty || isSubmitting}
                >
                  {caseId ? "Update Case" : "Add Case"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCases;
