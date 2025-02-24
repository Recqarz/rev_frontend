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
import LocationSearch from "../../components/location/LocationSearch";
import {
  getAllDistricts,
  getAllStates,
  getAllZones,
} from "../../redux/location/locationAction";
import { getAllFieldExecutiveData } from "../../redux/fieldExecutive/fieldExecutiveAction";
import LocationFields from "../../components/location/LocationFields";
import { FaCopy } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

const AddCases = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("caseId");
  const [isManual, isSetManual] = useState("");
  const [copied, setCopied] = useState(false);
  const { accessToken } = useSelector((store) => store?.authReducer);
  const { data: caseData } = useSelector((state) => state.caseReducer);
  // console.log("caseData==>", caseData);
  const { isLoading, isError, data } = useSelector(
    (state) => state.allBankReducer
  );
  const { banks } = data;
  const locationData = useSelector((store) => store.locationReducer);
  // console.log("locationData==>>", locationData);

  const { data: isDataFieldExecutive } = useSelector(
    (state) => state.allFieldExecutiveReducer
  );
  const { fieldExecutives } = isDataFieldExecutive;
  // console.log("fieldExecutives==>", fieldExecutives);

  useEffect(() => {
    dispatch(getAllStates(accessToken));
    dispatch(getAllFieldExecutiveData(`limit=${Infinity}`));
    if (caseId) {
      dispatch(getCaseById(caseId));
    }
    dispatch(getAllBankData(`limit=${Infinity}`));
    if (caseData?.state) {
      dispatch(getAllDistricts(caseData?.state, accessToken));
    }
    if (caseData?.district) {
      dispatch(getAllZones(caseData?.district, accessToken));
    }
  }, [dispatch, caseId, caseData?.state, caseData?.district]);

  const changeState = (stateId) => {
    // console.log("stateId==>", stateId);
    stateId && dispatch(getAllDistricts(stateId, accessToken));
  };

  const changeDistrict = (distId) => {
    // console.log(distId);
    distId && dispatch(getAllZones(distId, accessToken));
  };

  const AddCaseSchema = [
    {
      key: 1,
      label: "Bank Name",
      htmlFor: "workForBank",
      as: "select",
      name: "workForBank",
      id: "workForBank",
      mainDivClassname: "col-span-4",
      inputFieldClassName: "",
      placeholder: "Enter Bank Name",

      options: [
        { key: 0, value: "", label: "Select Bank" },
        ...(banks ?? [])?.map((bank, index) => ({
          key: index + 1,
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
      inputFieldClassName: "",
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
      inputFieldClassName: "",
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
      inputFieldClassName: "",
      placeholder: "Enter BOV Report No.",
      validation: Yup.string()
        .required("BOV Report No. is required")
        .nullable(),
      initialValue: caseData?.BOV_ReportNo || "",
    },
    ,
    {
      key: 6,
      label: "Contact No.",
      htmlFor: "contactNo",
      name: "contactNo",
      type: "number",
      id: "contactNo",
      mainDivClassname: "col-span-4 md:col-span-4",
      inputFieldClassName: "",
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
      inputFieldClassName: "",
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
      inputFieldClassName: "",
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
      inputFieldClassName: "",
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
      inputFieldClassName: "",
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
      inputFieldClassName: "",
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
      inputFieldClassName: "",
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
      inputFieldClassName: "",
      placeholder: "Enter Pin code",
      validation: Yup.string()
        .transform((value) => value.replace(/^0+/, ""))
        .matches(/^\d{6}$/, "pincode must be 6 digits & non-negative")
        .required("pincode is required"),
      initialValue: caseData?.clientAddress?.pincode || "",
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
    stateId: Yup.string().required("State name is required"),
    districtId: Yup.string().required("District name is required"),
    zoneId: Yup.string().required("Zone name is required"),
    // assignType: Yup.string().required("Assign type is required"),
    ...(isManual &&
      isManual === "manual" && {
        fieldExecutiveId: Yup.string().required("Field executive is required"),
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
    },
    assignType: "auto", // Add geoLocation manually
    fieldExecutiveId: caseData?.fieldExecutiveId ?? "",
    stateId: caseData?.state ?? "",
    districtId: caseData?.district ?? "",
    zoneId: caseData?.zone ?? "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    // console.log("values cases add==>", values);
    const formattedValues = {
      bankId: values.workForBank,
      bankRefNo: values.bankRefNo,
      clientName: values.clientName,
      BOV_ReportNo: values.BOV_ReportNo,
      contactNo: values.contactNo,
      visitDate: new Date(values?.visitDate).toISOString(), // Converts the date to ISO format
      clientGeoFormattedAddress: values.clientGeoFormattedAddress,
      clientGeolocation: values.clientGeolocation,
      clientAddress: {
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        plotNumber: values.plotNumber,
        streetName: values.streetName,
        landMark: values.landMark,
        pincode: values.pincode,
      },
      ...(caseId && caseData //while create & update for different key name
        ? {
            state: values?.stateId,
            district: values?.districtId,
            zone: values.zoneId,
          }
        : {
            stateId: values?.stateId,
            districtId: values?.districtId,
            zoneId: values.zoneId,
          }),
      ...((values?.assignType === "manual" ||
        (caseId && caseData && caseData?.fieldExecutiveId)) && {
        fieldExecutiveId: values?.fieldExecutiveId,
      }),
      // ...(values?.assignType === "manual" ||
      //   (caseData?.fieldExecutiveId && {
      //     fieldExecutiveId: values?.fieldExecutiveId,
      //   })),
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
            popup: "small-swal",
          },
        });

        if (result.isConfirmed) {
          dispatch(updateCaseDataId(formattedValues, accessToken, caseId));
        }
      } else {
        dispatch(addCaseData(formattedValues, accessToken, navigate));
        resetForm();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(caseData?.caseCode);
    setCopied(true);

    // Hide the "Copied" message after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        {caseId ? (
          <div className="flex items-center justify-center space-x-2">
            <h3 className="text-xl font-semibold">Update Case</h3>
            {caseData?.caseCode && (
              <div
                className={`flex items-center space-x-2 rounded-md py-1 px-2 shadow-md shadow-[#073b4c]`}
              >
                <span className="text-gray-600">{caseData?.caseCode}</span>
                <button
                  onClick={handleCopy}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaCopy
                    className={`rounded-sm text-sm ${
                      copied ? "text-green-500" : "text-[#073b4c]"
                    }`}
                  />
                </button>
              </div>
            )}

            <span
              className={`text-green-500 ml-2 text-sm ${
                copied ? "opacity-100" : "opacity-0"
              }`}
            >
              Copied!
            </span>
          </div>
        ) : (
          <h3 className="text-xl font-semibold">Add Case</h3>
        )}
      </div>

      <div className="bg-white border-2 rounded-lg shadow border-gray-300">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, resetForm, dirty, values, setFieldValue }) => {
            {
              {
                /* console.log("values==>123==>", values); */
              }
            }

            return (
              <Form>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4 m-4 ">
                  {AddCaseSchema?.map((item, i) => (
                    <div key={i + 1} className={item?.mainDivClassname}>
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
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
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
                  <div key="clientGeoFormattedAddress" className="col-span-4">
                    <GeolocationAutoComplete
                      existingClientGeoFormattedAddress={
                        caseData && caseData?.clientGeoFormattedAddress
                          ? caseData?.clientGeoFormattedAddress
                          : ""
                      }
                      onSelect={(val) => {
                        setFieldValue("clientGeoFormattedAddress", val.address);
                        setFieldValue("clientGeolocation", {
                          longitude: val.longitude,
                          latitude: val.latitude,
                        });
                      }}
                    />
                    <ErrorMessage
                      name="clientGeoFormattedAddress"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div key={"stateId"} className="col-span-4">
                    <LocationFields
                      data={locationData?.data?.states}
                      label={"State"}
                      selectTagName={"stateId"}
                      changeLocation={(id) => {
                        setFieldValue("stateId", id);
                        changeState(id);
                      }}
                    />
                  </div>
                  <div key="districtId" className="col-span-4">
                    <LocationFields
                      data={locationData?.data?.districts}
                      label={"District"}
                      selectTagName={"districtId"}
                      changeLocation={(id) => {
                        setFieldValue("districtId", id);
                        changeDistrict(id);
                      }}
                    />
                  </div>
                  <div key="zoneId" className="col-span-4">
                    <LocationFields
                      data={locationData?.data?.zones}
                      label={"Zone"}
                      selectTagName={"zoneId"}
                      changeLocation={(id) => {
                        setFieldValue("zoneId", id);
                      }}
                    />
                  </div>

                  {caseId && caseData?.fieldExecutiveId ? (
                    <div key="fieldExecutiveId" className="col-span-4">
                      <div>
                        <label
                          htmlFor="fieldExecutiveId"
                          className="text-sm font-medium text-gray-900 block mb-2"
                        >
                          Select Field Executive
                        </label>
                        <Field
                          as="select"
                          name="fieldExecutiveId"
                          id="fieldExecutiveId"
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Select Field Executive</option>
                          {fieldExecutives?.map((executive) => (
                            <option key={executive.id} value={executive._id}>
                              {`${executive.firstName} ${executive.lastName}`}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="fieldExecutiveId"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      key="assignType"
                      className="col-span-4 flex flex-col gap-2"
                    >
                      <div className="flex gap-4">
                        <label className="block text-sm font-medium text-[#67cfb3ff]">
                          Assign Field Executive :
                        </label>

                        {/* Radio Buttons */}
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2">
                            <Field
                              type="radio"
                              name="assignType"
                              value="auto"
                              onChange={() => {
                                setFieldValue("assignType", "auto");
                                isSetManual("auto");
                              }}
                            />
                            <span>Auto</span>
                          </label>

                          <label className="flex items-center space-x-2">
                            <Field
                              type="radio"
                              name="assignType"
                              value="manual"
                              onChange={() => {
                                setFieldValue("assignType", "manual");
                                isSetManual("manual");
                              }}
                            />
                            <span>Manual</span>
                          </label>
                        </div>
                      </div>

                      {values.assignType === "manual" && (
                        <div>
                          <label className="text-sm font-medium text-gray-900 block mb-2">
                            Select Field Executive
                          </label>
                          <Field
                            as="select"
                            name="fieldExecutiveId"
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="">Select Field Executive</option>
                            {fieldExecutives?.map((executive) => (
                              <option key={executive.id} value={executive._id}>
                                {`${executive.firstName} ${executive.lastName}`}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="fieldExecutiveId"
                            component="p"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-4 justify-center md:justify-end m-4">
                  <button
                    type="button"
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
