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
  console.log("locationData**************>", locationData);
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
      type: "number",
      id: "mobile",
      mainDivClassname: "col-span-4 md:col-span-3",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter phone number",
      validation: Yup.string()
        .transform((value) => value.replace(/^0+/, "")) // Remove leading zeros
        .matches(/^\d{10}$/, "Phone number must be 10 digits") // Validate 10-digit number
        .required("Mobile No. is required")
        .nullable(),
      initialValue: "",
    },
    {
      key: 8,
      label: "Role",
      htmlFor: "role",
      as: "select",
      name: "role",
      // type: 'role',
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
      key: 9,
      label: "Work for bank",
      htmlFor: "workForBank",
      as: "select",
      name: "workForBank",
      // type: 'workForBank',
      id: "workForBank",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter country name",

      options: [
        { key: 0, value: "", label: "Select Bank" }, // Default empty value
        ...(banks ?? [])?.map((bank, index) => ({
          key: index + 1,
          value: bank?._id,
          label: `${bank?.bankName} (${bank?.branchName})`,
        })),
      ],
      validation: Yup.string().required("Bank Name is required"),
      initialValue: "",
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
      workForBank: values?.workForBank,
      ...(values?.role === "fieldExecutive" && {
        address: {
          state: values?.state,
          district: values?.district,
          zone: values?.zones,
        },
      }),
      geoLocation:
        values?.role === "fieldExecutive" && values?.geoLocation
          ? values.geoLocation
          : { longitude: "", latitude: "", formattedAddress: "" },
    };

    console.log("formattedValues==>", formattedValues);
    dispatch(addUserData(formattedValues, accessToken, navigate));
    resetForm();
  };

  const changeState = (stateId) => {
    stateId && dispatch(getAllDistricts(stateId, accessToken));
  };

  const changeDistrict = (distId) => {
    console.log(distId);
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
            return (
              <Form>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4 m-4">
                  {AddUserFormSchema?.map((item) => (
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
                  {values?.role === "fieldExecutive" && (
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
                      <div className="flex flex-wrap">
                        <LocationSearch
                          data={locationData?.data?.states}
                          name={"State"}
                          changeLocation={(id) => {
                            setFieldValue("state", id);
                            changeState(id);
                          }}
                        />
                        <LocationSearch
                          data={locationData?.data?.districts}
                          name={"District"}
                          changeLocation={(id) => {
                            setFieldValue("district", id);
                            changeDistrict(id);
                          }}
                        />
                        <LocationSearch
                          data={locationData?.data?.zones}
                          name={"Zones"}
                          changeLocation={(id) => {
                            setFieldValue("zones", id);
                          }}
                        />
                      </div>
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
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;
