import React, { useEffect, useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  resetForm,
  useFormik,
} from "formik";
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
import GeolocationAutoComplete from "../../components/google-map/GeolocationAutoComplete";
import visitDateValidation from "../../utils/visitDateValidation";

const AddCases = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("caseId");
  const [isClientGeolocation, setClientGeolocation] = useState({
    longitude: "",
    latitude: "",
  });
  const { accessToken } = useSelector((store) => store?.authReducer);
  const { data: caseData } = useSelector((state) => state.caseReducer);

  console.log("caseData==>", caseData?.visitDate);

  const { isLoading, isError, data } = useSelector(
    (state) => state.allBankReducer
  );
  const { banks } = data;

  const onSelect = (val) => {
    setClientGeolocation({
      longitude: val.longitude,
      latitude: val.latitude,
    });
  };

  useEffect(() => {
    if (caseId) {
      dispatch(getCaseById(caseId));
    }
    dispatch(getAllBankData());
  }, [dispatch, caseId]);

  const AddCaseSchema = [
    {
      key: 1,
      label: "Bank Name",
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
        .transform((value) => value.replace(/^0+/, ""))
        .matches(/^\d{10}$/, "Contact no. must be 10 digits & non-negative")
        .required("Contact no. is required"),
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
      // validation: visitDateValidation,
      validation: visitDateValidation(caseData?.visitDate), // Pass `isUpdate`,
      initialValue:
        caseData && caseData?.visitDate
          ? formattedDate(caseData?.visitDate)
          : "",
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
      type: "number",
      id: "pincode",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Pin code",
      validation: Yup.string()
        .transform((value) => value.replace(/^0+/, ""))
        .matches(/^\d{6}$/, "pincode must be 6 digits & non-negative")
        .required("pincode is required"),
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

  const validationSchema = Yup.object({
    ...AddCaseSchema.reduce((schema, field) => {
      if (field.validation) {
        schema[field.name] = field.validation;
      }
      return schema;
    }, {}),
    clientGeoFormattedAddress: Yup.string().required("Geo address is required"),
    clientGeolocation: Yup.object({
      longitude: Yup.mixed()
        .test("is-valid-number", "Invalid longitude", (value) => {
          if (value === undefined || value === null || value === "")
            return false;
          return /^-?\d+(\.\d+)?$/.test(value.toString()); // Checks if it's a valid number
        })
        .required("Longitude is required"),

      latitude: Yup.mixed()
        .test("is-valid-number", "Invalid latitude", (value) => {
          if (value === undefined || value === null || value === "")
            return false;
          return /^-?\d+(\.\d+)?$/.test(value.toString()); // Checks if it's a valid number
        })
        .required("Latitude is required"),
    }),
  });

  const initialValues = {
    ...AddCaseSchema.reduce((values, field) => {
      values[field.name] = field.initialValue || "";
      return values;
    }, {}),
    clientGeoFormattedAddress: caseData?.clientGeoFormattedAddress || "",
    clientGeolocation: {
      longitude: caseData?.clientGeolocation?.coordinates?.length
        ? caseData?.clientGeolocation?.coordinates[0]
        : "",
      latitude: caseData?.clientGeolocation?.coordinates?.length
        ? caseData?.clientGeolocation?.coordinates[1]
        : "",
    }, // Add geoLocation manually
  };

  const handleSubmit = async (values, { resetForm }) => {
    // console.log("values==>", values);
    const formattedValues = {
      bankId: values.workForBank,
      bankRefNo: values.bankRefNo,
      clientName: values.clientName,
      BOV_ReportNo: values.BOV_ReportNo,
      clientGeoFormattedAddress: values.clientGeoFormattedAddress,
      clientGeolocation: values.clientGeolocation,
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
    // console.log("formattedValues==>", formattedValues);
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
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <h3 className="text-xl font-semibold">
          {caseId ? "Update Case" : "Add Case"}
        </h3>
      </div>

      <div className="bg-white border-2 rounded-lg shadow border-gray-300">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          // context={{ isUpdate: !!caseData }} // Pass context
        >
          {({
            isSubmitting,
            resetForm,
            dirty,
            formik,
            values,
            setFieldValue,
            errors,
            touched,
            handleReset,
          }) => {
            {
              {
                {
                  /* console.log("errors==>", errors); */
                }
              }
            }
            return (
              <Form>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4 m-4 ">
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
                        ) : item?.type === "date" ? (
                          <Field
                            type={item?.type}
                            name={item?.name}
                            id={item?.id}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder={item?.placeholder}
                            // min={new Date().toISOString().split("T")[0]} //for date picker, can only pick today and future dates.
                            // min={
                            //   caseData?.visitDate
                            //     ? new Date(caseData?.visitDate)
                            //         .toISOString()
                            //         .split("T")[0]
                            //     : new Date().toISOString().split("T")[0]
                            // }
                            min={
                              caseData?.visitDate &&
                              new Date(caseData?.visitDate) < new Date()
                                ? new Date(caseData?.visitDate)
                                    .toISOString()
                                    .split("T")[0]
                                : // Use previous date if exists
                                  new Date().toISOString().split("T")[0] // Otherwise, today
                            }
                          />
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
                  <div className="col-span-4">
                    <GeolocationAutoComplete
                      existingClientGeoFormattedAddress={
                        caseData && caseData?.clientGeoFormattedAddress
                          ? caseData?.clientGeoFormattedAddress
                          : ""
                      }
                      onSelect={(val) => {
                        setFieldValue("clientGeoFormattedAddress", val.address); // Set formatted address
                        setFieldValue("clientGeolocation", {
                          longitude: val.longitude,
                          latitude: val.latitude,
                        });
                      }}
                    />
                    {/* {errors.clientGeoFormattedAddress &&
                      touched.clientGeoFormattedAddress && (
                        <span className="text-red-500">
                          {errors.clientGeoFormattedAddress}
                        </span>
                      )} */}
                    <ErrorMessage
                      name="clientGeoFormattedAddress"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-4 justify-center md:justify-end m-4">
                  <button
                    type="button" // Use type="button" to prevent triggering form submission
                    className={`hover:bg-red-500 text-white px-4 py-2 rounded-lg  ${
                      dirty
                        ? "bg-red-400 cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() => {
                      resetForm();
                    }}
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
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddCases;
