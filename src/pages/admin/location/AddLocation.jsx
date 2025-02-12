import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addDistrict,
  addState,
  addZone,
  getAllDistricts,
  getAllStates,
} from "../../../redux/location/locationAction";

const AddLocation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stateId, setStateId] = useState(""); // state to hold selected stateId
  console.log("stateId==>", stateId);

  const { accessToken } = useSelector((store) => store?.authReducer);
  const { isLoading, isError, data } = useSelector(
    (store) => store.locationReducer
  );
  const { message, states, districts, zones } = data;
  console.log("states==>", states);
  console.log("districts==>", districts);

  useEffect(() => {
    dispatch(getAllStates(accessToken));
    if (stateId) {
      console.log("stateId passed to get districts:", stateId);
      dispatch(getAllDistricts(stateId, accessToken)); // Pass stateId to fetch districts
    }
    // dispatch(getAllDistricts(stateId, accessToken));
  }, [stateId]);

  const handleSubmitState = (values, { resetForm }) => {
    console.log("State Form data===>", values);
    dispatch(addState(values, accessToken));
    resetForm();
  };
  const handleSubmitDistrict = (values, { resetForm }) => {
    console.log("Dist Form data===>", values);
    dispatch(addDistrict(values, accessToken));
    resetForm();
  };
  const handleSubmitCity = (values, { resetForm }) => {
    console.log("City Form data===>", values);
    resetForm();
  };
  const handleSubmitZone = (values, { resetForm }) => {
    console.log("Zone Form data===>", values);
    const formattedValues = {
      districtId: values.districtId,
      name: values.name,
    };
    // console.log("formattedValues==>", formattedValues);
    dispatch(addZone(formattedValues, accessToken));
    resetForm();
  };

  // For State
  const AddStateFormSchema = [
    {
      key: 1,
      label: "State",
      htmlFor: "name",
      name: "name",
      type: "text",
      id: "name",
      mainDivClassname: "col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter state name",
      validation: Yup.string().required("State name is required"),
      initialValue: "",
    },
  ];
  const stateValidationSchema = Yup.object(
    AddStateFormSchema.reduce((schema, field) => {
      if (field.validation) {
        schema[field.name] = field.validation;
      }
      return schema;
    }, {})
  );

  const stateInitialValues = AddStateFormSchema.reduce((values, field) => {
    values[field.name] = field.initialValue || ""; // Use defaultValue or fallback to an empty string
    return values;
  }, {});

  // For District
  const AddDistrictFormSchema = [
    {
      key: 1,
      label: "State",
      htmlFor: "stateId",
      as: "select",
      name: "stateId",
      // type: 'workForBank',
      id: "stateId",
      mainDivClassname: "col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Select State name",

      options: [
        { key: 0, value: "", label: "Select State" }, // Default empty value
        ...(states ?? [])?.map((state, index) => ({
          key: index + 1, // Adjust index to avoid conflict with the default option key
          value: state?._id,
          label: `${index + 1}) ${state?.name}`,
        })),
      ],
      validation: Yup.string().required("State is required"),
      initialValue: "",
    },

    {
      key: 2,
      label: "District",
      htmlFor: "name",
      name: "name",
      type: "text",
      id: "name",
      mainDivClassname: "col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter district name",
      validation: Yup.string().required("District name is required"),
      initialValue: "",
    },
  ];

  const districtValidationSchema = Yup.object(
    AddDistrictFormSchema.reduce((schema, field) => {
      if (field.validation) {
        schema[field.name] = field.validation;
      }
      return schema;
    }, {})
  );

  const districtInitialValues = AddDistrictFormSchema.reduce(
    (values, field) => {
      values[field.name] = field.initialValue || ""; // Use defaultValue or fallback to an empty string
      return values;
    },
    {}
  );

  // For Zone
  const addZoneFormSchema = [
    {
      key: 1,
      label: "State",
      htmlFor: "stateId",
      as: "select",
      name: "stateId",
      // type: 'workForBank',
      id: "stateId",
      mainDivClassname: "col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Select State name",

      options: [
        { key: 0, value: "", label: "Select State" }, // Default empty value
        ...(states ?? [])?.map((state, index) => ({
          key: index + 1, // Adjust index to avoid conflict with the default option key
          value: state?._id,
          label: `${index + 1}) ${state?.name}`,
        })),
      ],
      validation: Yup.string().required("State is required"),
      initialValue: "",
    },
    {
      key: 2,
      label: "District",
      htmlFor: "districtId",
      as: "select",
      name: "districtId",
      id: "districtId",
      mainDivClassname: "col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Select District",
      options: [
        { key: 0, value: "", label: "Select District" }, // Default empty value
        ...(districts ?? [])?.map((district, index) => ({
          key: index + 1, // Unique key
          value: district?._id, // District ID
          label: `${index + 1}) ${district?.name}`, // Display district name
        })),
      ],
      validation: Yup.string().required("District is required"),
      initialValue: "",
    },
    // {
    //   key: 3,
    //   label: "City",
    //   htmlFor: "city",
    //   as: "select",
    //   name: "City",
    //   // type: 'workForBank',
    //   id: "City",
    //   mainDivClassname: "col-span-2",
    //   inputFieldClassName:
    //     "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
    //   placeholder: "Enter City name",

    //   options: [
    //     { key: 0, value: "", label: "Select City" }, // Default empty value
    //     { key: 1, value: "City 1", label: "City 1" }, // Default empty value
    //     { key: 2, value: "City 2", label: "City 2" }, // Default empty value
    //   ],
    //   validation: Yup.string().required("City is required"),
    //   initialValue: "",
    // },

    // {
    //   key: 4,
    //   label: "Zone",
    //   htmlFor: "zone",
    //   name: "zone",
    //   type: "text",
    //   id: "zone",
    //   mainDivClassname: "col-span-2",
    //   inputFieldClassName:
    //     "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
    //   placeholder: "Enter Zone name",
    //   validation: Yup.string().required("Zone name is required"),
    //   initialValue: "",
    // },
    {
      key: 3,
      label: "Zone",
      htmlFor: "name",
      as: "select",
      name: "name",
      // type: 'workForBank',
      id: "name",
      mainDivClassname: "col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter City name",

      options: [
        { key: 0, value: "", label: "Select Zone" },
        { key: 1, value: "east", label: "East" },
        { key: 2, value: "west", label: "West" },
        { key: 3, value: "north", label: "North" },
        { key: 4, value: "south", label: "South" },
      ],
      validation: Yup.string().required("Zone is required"),
      initialValue: "",
    },
  ];

  const zoneValidationSchema = Yup.object(
    addZoneFormSchema.reduce((schema, field) => {
      if (field.validation) {
        schema[field.name] = field.validation;
      }
      return schema;
    }, {})
  );

  const zoneInitialValues = addZoneFormSchema.reduce((values, field) => {
    values[field.name] = field.initialValue || ""; // Use defaultValue or fallback to an empty string
    return values;
  }, {});

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="text-xl font-semibold">ADD LOCATION</h3>
      </div>

      <div className=" bg-white border-2 rounded-lg shadow border-gray-300 p-4 flex flex-col gap-3">
        {/* ------------------Add State 1st----------------------*/}
        <div className="border border-gray-200 bg-gray-50 py-4 rounded-md shadow-md">
          <Formik
            initialValues={stateInitialValues}
            validationSchema={stateValidationSchema}
            onSubmit={handleSubmitState}
          >
            {({ isSubmitting, resetForm }) => (
              <Form className="w-full flex flex-col lg:flex-row gap-4 justify-center items-center px-2">
                <div className="w-[100%] lg:w-[80%] grid md:grid-cols-4 lg:grid-cols-8 gap-2">
                  {AddStateFormSchema?.map((item) => (
                    <div key={item?.key} className={item?.mainDivClassname}>
                      <div>
                        <label
                          htmlFor={item?.htmlFor}
                          className="text-sm font-medium text-gray-900 block mb-1"
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
                <div className="w-[100%] lg:w-[20%] flex justify-end gap-4 lg:mt-6 text-sm">
                  <div>
                    <button
                      type="button"
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer"
                      onClick={() => resetForm()}
                    >
                      Reset
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="hover:bg-[#104e3d] text-white px-4 py-2 rounded-lg bg-[#25b992] cursor-pointer"
                      // disabled={isSubmitting}
                    >
                      Add State
                    </button>{" "}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {/* ------------------Add District 2nd ----------------------*/}
        <div className="border border-gray-200 bg-gray-50 py-4 rounded-md shadow-md">
          <Formik
            initialValues={districtInitialValues}
            validationSchema={districtValidationSchema}
            onSubmit={handleSubmitDistrict}
          >
            {({ isSubmitting, resetForm }) => (
              <Form className="w-full flex flex-col lg:flex-row gap-4 justify-center items-center px-2">
                <div className="w-[100%] lg:w-[80%] grid md:grid-cols-4 lg:grid-cols-8 gap-2">
                  {AddDistrictFormSchema?.map((item) => (
                    <div key={item?.key} className={item?.mainDivClassname}>
                      <div>
                        <label
                          htmlFor={item?.htmlFor}
                          className="text-sm font-medium text-gray-900 block mb-1"
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
                <div className="w-[100%] lg:w-[20%] flex justify-end gap-4 lg:mt-6 text-sm">
                  <div>
                    <button
                      type="button"
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer"
                      onClick={() => resetForm()}
                    >
                      Reset
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="hover:bg-[#104e3d] text-white px-4 py-2 rounded-lg bg-[#25b992] cursor-pointer"
                      // disabled={isSubmitting}
                    >
                      Add Dist
                    </button>{" "}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* ------------------Add City 3rd ----------------------*/}

        {/* ------------------Add Zone 4th ----------------------*/}
        <div className="border border-gray-200 bg-gray-50 py-4 rounded-md shadow-md">
          <Formik
            initialValues={zoneInitialValues}
            validationSchema={zoneValidationSchema}
            onSubmit={handleSubmitZone}
          >
            {({ isSubmitting, resetForm, values, setFieldValue }) => {
              {
                /* const handleStateChange = (e) => {
                const selectedStateId = e.target.value;
                setFieldValue("stateId", selectedStateId); // Update Formik value
                setStateId(selectedStateId); // Also update the component state
              }; */
              }
              {
                /* console.log("values==>", values); */
              }
              {
                if (values?.stateId) {
                  setStateId(values?.stateId);
                }
              }

              return (
                <Form className="w-full flex flex-col lg:flex-row gap-4 justify-center items-center px-2">
                  <div className="w-[100%] lg:w-[80%] grid md:grid-cols-4 lg:grid-cols-8 gap-2">
                    {addZoneFormSchema?.map((item) => (
                      <div key={item?.key} className={item?.mainDivClassname}>
                        <div>
                          <label
                            htmlFor={item?.htmlFor}
                            className="text-sm font-medium text-gray-900 block mb-1"
                          >
                            {item?.label}
                          </label>
                          {item?.as === "select" ? (
                            <Field
                              as="select"
                              name={item?.name}
                              id={item?.id}
                              className={item?.inputFieldClassName}
                              // onChange={(e) => setStateId(e.target.value)}
                              // onChange={
                              //   item?.name === "stateId"
                              //     ? handleStateChange
                              //     : undefined
                              // }
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
                  <div className="w-[100%] lg:w-[20%] flex justify-end gap-4 lg:mt-6 text-sm">
                    <div>
                      <button
                        type="button"
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer"
                        onClick={() => resetForm()}
                      >
                        Reset
                      </button>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="hover:bg-[#104e3d] text-white px-4 py-2 rounded-lg bg-[#25b992] cursor-pointer"
                        // disabled={isSubmitting}
                      >
                        Add Zone
                      </button>{" "}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
