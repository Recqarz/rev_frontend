import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBankData } from "../../../redux/banks/bankAction";
import { addUserData } from "../../../redux/users/userAction";
import GeolocationAutoComplete from "../../../components/google-map/GeolocationAutoComplete";
import LocationSearch from "../../../components/location/LocationSearch";
import {
  getAllDistricts,
  getAllStates,
  getAllZones,
} from "../../../redux/location/locationAction";
import LocationFields from "../../../components/location/LocationFields";
import { IoIosCloseCircle } from "react-icons/io";
// import GeolocationAutoComplete from "./google-map/GeolocationAutoComplete";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get banks
  const { accessToken } = useSelector((store) => store?.authReducer);
  const { isLoading, isError, data } = useSelector(
    (state) => state.allBankReducer
  );
  const { banks } = data;
  const locationData = useSelector((store) => store.locationReducer);
  // console.log("locationData*", locationData);
  useEffect(() => {
    dispatch(getAllBankData());
    dispatch(getAllStates(accessToken));
  }, [dispatch]);

  const AddUserFormSchema = [
    {
      key: 1,
      label: "First Name",
      htmlFor: "firstName",
      name: "firstName",
      type: "text",
      id: "firstName",
      mainDivClassname: "col-span-4 md:col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter first name",
      validation: Yup.string().required("First Name is required"),
      initialValue: "",
    },
    {
      key: 2,
      label: "Last Name",
      htmlFor: "lastName",
      name: "lastName",
      type: "text",
      id: "lastName",
      mainDivClassname: "col-span-4 md:col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter last name",
      validation: Yup.string().required("Last Name is required"),
      initialValue: "",
    },
    {
      key: 3,
      label: "Email",
      htmlFor: "email",
      name: "email",
      type: "email",
      id: "email",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter email",
      validation: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      initialValue: "",
    },
    {
      key: 5,
      label: "Mobile Code",
      htmlFor: "mobileCode",
      as: "select",
      name: "mobileCode",
      // type: 'mobileCode',
      id: "mobileCode",
      mainDivClassname: "col-span-4 md:col-span-1",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter phone code",
      options: [
        // { key: 1, value: '', label: 'Select Code' }, // Default empty value
        { key: 2, value: "+91", label: "+91" },
      ],
      validation: Yup.string().required("Mobile Code is required"),
      initialValue: "+91",
    },
    {
      key: 6,
      label: "Mobile No.",
      htmlFor: "mobile",
      name: "mobile",
      type: "tel",
      id: "mobile",
      mainDivClassname: "col-span-4 md:col-span-3",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter phone number",
      validation: Yup.string()
        .matches(
          /^[1-9]\d{9}$/,
          "Mobile number cannot start with 0 and must be 10 digits long"
        )
        .required("Mobile number is required"),
      initialValue: "",
    },
    {
      key: 9,
      label: "Role",
      htmlFor: "role",
      // as: "select",
      name: "role",
      type: "select",
      id: "role",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter country name",
      options: [
        { key: 1, value: "", label: "Select Role" }, // Default empty value
        { key: 5, value: "auditor", label: "Auditor" },
        { key: 4, value: "coordinator", label: "Coordinator" },
        { key: 3, value: "fieldExecutive", label: "Field Executive" },
        { key: 6, value: "supervisor", label: "Supervisor" },
      ],
      validation: Yup.string().required("Role is required"),
      initialValue: "",
    },
    {
      key: 8,
      label: "Work for bank",
      htmlFor: "workForBank",
      // as: "select",
      name: "workForBank",
      type: "select",
      id: "workForBank",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter country name",

      options: [
        // { key: 0, value: "", label: "Select Bank" }, // Default empty value
        ...(banks ?? [])?.map((bank, index) => ({
          key: index + 1,
          value: bank?._id,
          label: `${bank?.bankName} (${bank?.branchName})`,
        })),
      ],
      // validation: Yup.string().required("Bank Name is required"),
      validation: Yup.array().when("role", {
        is: "supervisor",
        then: (schema) =>
          schema
            .min(1, "At least one bank is required")
            .required("Bank Name is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      initialValue: [],
    },
  ];
  const validationSchema = Yup.object({
    ...AddUserFormSchema.reduce((schema, field) => {
      if (field.validation) {
        schema[field.name] = field.validation;
      }
      return schema;
    }, {}),
    geoLocation: Yup.object().when("role", {
      is: "fieldExecutive",
      then: () =>
        Yup.object().shape({
          longitude: Yup.number()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            ) // Convert empty string to null
            .typeError("Longitude must be a number")
            .required("Longitude is required"),

          latitude: Yup.number()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            ) // Convert empty string to null
            .typeError("Latitude must be a number")
            .required("Latitude is required"),

          formattedAddress: Yup.string()
            .trim() // Remove unnecessary spaces
            .required("Geo address is required")
            .test(
              "is-not-empty",
              "Geo address is required",
              (value) => value && value.trim() !== ""
            ),
        }),
      otherwise: () => Yup.object().nullable().notRequired(),
    }),
    ...["state", "district", "zone"].reduce(
      (acc, field) => ({
        ...acc,
        [field]: Yup.string().when("role", {
          is: "fieldExecutive",
          then: (schema) =>
            schema.required(
              `${
                field.charAt(0).toUpperCase() + field.slice(1)
              } zone name is required`
            ),
          otherwise: (schema) => schema.notRequired(),
        }),
      }),
      {}
    ),
  });

  const initialValues = {
    ...AddUserFormSchema.reduce((values, field) => {
      values[field.name] = field.initialValue || "";
      return values;
    }, {}),
    geoLocation: {
      longitude: "",
      latitude: "",
      formattedAddress: "",
    },
    state: "",
    district: "",
    zone: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    // console.log("Form data===>", values);
    const formattedValues = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      mobileCode: values?.mobileCode,
      mobile: values?.mobile,
      role: values?.role,
      // if role is supervisor only
      ...(values?.role === "supervisor" && {
        workForBank: values?.workForBank,
      }),
      // if role is fieldExecutive only
      ...(values?.role === "fieldExecutive" && {
        address: {
          state: values?.state,
          district: values?.district,
          zone: values?.zone,
        },
      }),
      ...(values?.role === "fieldExecutive" &&
        values.geoLocation && {
          geoLocation: values.geoLocation ?? {
            longitude: "",
            latitude: "",
            formattedAddress: "",
          },
        }),
      // ...(values?.role === "fieldExecutive" && values?.geoLocation
      //   ? {
      //       geoLocation: values.geoLocation,
      //     }
      //   : {
      //       geoLocation: { longitude: "", latitude: "", formattedAddress: "" },
      //     }),
    };

    // console.log("formattedValues==>", formattedValues);
    dispatch(addUserData(formattedValues, accessToken, navigate));
    resetForm();
  };

  const changeState = (stateId) => {
    stateId && dispatch(getAllDistricts(stateId, accessToken));
  };

  const changeDistrict = (distId) => {
    // console.log(distId);
    distId && dispatch(getAllZones(distId, accessToken));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <h3 className="text-xl font-semibold">Add User</h3>
      </div>

      <div className=" bg-white border-2 rounded-lg shadow border-gray-300">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, resetForm, values, setFieldValue, dirty }) => {
            {
              console.log("values==>", values);
            }

            {
              return (
                <Form>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4 m-4">
                    {AddUserFormSchema?.map((item) => {
                      if (
                        item?.name === "workForBank" &&
                        values?.role !== "supervisor"
                      ) {
                        return null; // Hide workForBank field if role is not supervisor
                      }
                      return (
                        <div key={item?.key} className={item?.mainDivClassname}>
                          <div>
                            <label
                              htmlFor={item?.htmlFor}
                              className="text-sm font-medium text-gray-900 block mb-2"
                            >
                              {item?.label}
                            </label>
                            {item?.type === "select" &&
                            item?.name === "workForBank" ? (
                              <div className="space-y-2">
                                {/* Chips Display for Selected Banks */}
                                {values.workForBank.length > 0 && (
                                  <div className="flex flex-wrap gap-2 border border-gray-300 p-2 rounded-lg bg-gray-100 h-30 overflow-y-auto custom-scrollbar">
                                    {values.workForBank.map((selectedBank) => {
                                      const bankLabel =
                                        item?.options.find(
                                          (opt) => opt.value === selectedBank
                                        )?.label || selectedBank;

                                      return (
                                        <div
                                          key={selectedBank}
                                          className="flex items-center justify-center gap-1 p-1.5 bg-blue-100 text-blue-900 rounded-xl text-sm"
                                        >
                                          <span>{bankLabel}</span>
                                          <button
                                            type="button"
                                            className="text-gray-500 hover:text-red-700 text-lg text-center"
                                            onClick={() => {
                                              setFieldValue(
                                                "workForBank",
                                                values.workForBank.filter(
                                                  (val) => val !== selectedBank
                                                )
                                              );
                                            }}
                                          >
                                            <IoIosCloseCircle />
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                                <div className=" flex flex-col gap-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 h-30 overflow-y-auto custom-scrollbar">
                                  <div className="">
                                    <label className="flex items-center gap-2 font-normal">
                                      <input
                                        type="checkbox"
                                        checked={
                                          values.workForBank.length ===
                                          item?.options?.length
                                        }
                                        onChange={() => {
                                          if (
                                            values.workForBank.length ===
                                            item?.options?.length
                                          ) {
                                            setFieldValue("workForBank", []); // Unselect all
                                          } else {
                                            setFieldValue(
                                              "workForBank",
                                              item?.options?.map(
                                                (option) => option.value
                                              )
                                            ); // Select all
                                          }
                                        }}
                                      />
                                      Select/ Unselect All Bank
                                    </label>
                                  </div>
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
                                    {/* Select All / Unselect All */}

                                    {/* Individual Checkboxes */}
                                    {item?.options?.map((option) => (
                                      <label
                                        key={option.key}
                                        className="flex items-center gap-2"
                                      >
                                        <input
                                          type="checkbox"
                                          value={option.value}
                                          checked={values.workForBank.includes(
                                            option.value
                                          )}
                                          onChange={(event) => {
                                            const selectedValues =
                                              values.workForBank || [];
                                            if (event.target.checked) {
                                              setFieldValue("workForBank", [
                                                ...selectedValues,
                                                option.value,
                                              ]);
                                            } else {
                                              setFieldValue(
                                                "workForBank",
                                                selectedValues.filter(
                                                  (val) => val !== option.value
                                                )
                                              );
                                            }
                                          }}
                                        />
                                        {option.label}
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : item?.type === "select" ? (
                              <Field
                                as="select"
                                name={item?.name}
                                id={item?.id}
                                className={item?.inputFieldClassName}
                              >
                                {item?.options?.map((option) => (
                                  <option
                                    key={option?.key}
                                    value={option?.value}
                                  >
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
                      );
                    })}
                    {/* {values?.role === "fieldExecutive" && (
                      <div className="col-span-4">
                        <GeolocationAutoComplete
                          existingUserGeoFormattedAddress={""}
                          onSelect={(val) => {
                            setFieldValue("geoLocation", {
                              longitude: val?.longitude,
                              latitude: val?.latitude,
                              formattedAddress: val?.address,
                            });
                          }}
                        />
                        <ErrorMessage
                          name="geoLocation.formattedAddress"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    )} */}
                  </div>
                  {values?.role === "fieldExecutive" && (
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-4 m-4">
                      <div className="col-span-4">
                        <GeolocationAutoComplete
                          existingUserGeoFormattedAddress={""}
                          onSelect={(val) => {
                            setFieldValue("geoLocation", {
                              longitude: val?.longitude,
                              latitude: val?.latitude,
                              formattedAddress: val?.address,
                            });
                          }}
                        />
                        <ErrorMessage
                          name="geoLocation.formattedAddress"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="col-span-4">
                        <LocationFields
                          data={locationData?.data?.states}
                          label={"State"}
                          selectTagName={"state"}
                          changeLocation={(id) => {
                            setFieldValue("state", id);
                            changeState(id);
                          }}
                        />
                      </div>
                      <div className="col-span-4">
                        <LocationFields
                          data={locationData?.data?.districts}
                          label={"District"}
                          selectTagName={"district"}
                          changeLocation={(id) => {
                            setFieldValue("district", id);
                            changeDistrict(id);
                          }}
                        />
                      </div>{" "}
                      <div className="col-span-4">
                        <LocationFields
                          data={locationData?.data?.zones}
                          label={"Zone"}
                          selectTagName={"zone"}
                          changeLocation={(id) => {
                            setFieldValue("zone", id);
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 justify-center md:justify-end m-4">
                    <button
                      type="button"
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
                      Submit
                    </button>
                  </div>
                </Form>
              );
            }
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;
