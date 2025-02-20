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
  getAllZones,
  getLocationAll,
} from "../../../redux/location/locationAction";

const AddLocation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stateName, setStateName] = useState(""); // state to hold selected state name
  const [stateId, setStateId] = useState(""); // state to hold selected stateId
  const [districtId, setDistrictId] = useState(""); // state to hold selected stateId
  const [district, setDistrict] = useState([]);

  const { accessToken } = useSelector((store) => store?.authReducer);
  const { isLoading, isError, data } = useSelector(
    (store) => store.locationReducer
  );
  const { message, states, districts, zones, locationAll } = data;
  useEffect(() => {
    locationAll?.states?.map((ele, i) => {
      if (ele.name?.toLowerCase() === stateName) {
        setDistrict(ele.districts);
      }
    });
  }, [stateName]);
  useEffect(() => {
    dispatch(getLocationAll(accessToken));
    dispatch(getAllStates(accessToken));

    if (stateId) {
      dispatch(getAllDistricts(stateId, accessToken)); // Pass stateId to get state wise districts
    }
    if (districtId) {
      dispatch(getAllZones(districtId, accessToken)); // Pass districtId to get districts
    }
  }, [stateId, districtId]);

  const handleSubmitState = (values, { resetForm }) => {
    // console.log("state values==>", values);
    dispatch(addState(values, accessToken));
    resetForm();
  };
  const handleSubmitDistrict = (values, { resetForm }) => {
    dispatch(addDistrict(values, accessToken));
    resetForm();
  };
  const handleSubmitCity = (values, { resetForm }) => {
    resetForm();
  };
  const handleSubmitZone = (values, { resetForm }) => {
    const formattedValues = {
      // stateId: values.stateId, //not needed so that make formattedValues object
      districtId: values.districtId,
      name: values.name,
    };
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
      as: "select",
      // type: "text",
      id: "name",
      mainDivClassname: "col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter state name",
      options: [
        { key: 0, value: "", label: "Select State" }, // Default empty value
        ...(locationAll?.states ?? [])?.map((state, index) => {
          const isExisting = new Set(
            states?.map((el) => el?.name.toLowerCase()) ?? []
          ).has(state.name.toLowerCase());
          return {
            key: index + 1,
            value: state?.name,
            label: `${index + 1}. ${state?.name}${
              isExisting ? " (already exist)" : ""
            }`,
            disabled: isExisting,
          };
        }),
      ],

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
      id: "stateId",
      mainDivClassname: "col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Select State name",

      options: [
        { key: 0, value: "", label: "Select State" }, // Default empty value
        ...(states ?? [])?.map((state, index) => ({
          key: index + 1,
          value: state?._id,
          label: `${state?.name}`,
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
      as: "select",
      // type: "text",
      id: "name",
      mainDivClassname: "col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter district name",
      options: [
        { key: 0, value: "", label: "Select District" },
        ...(district ?? [])?.map((dist, index) => {
          const isExisting = new Set(
            districts?.map((el) => el?.name.toLowerCase()) ?? []
          ).has(dist.toLowerCase());
          return {
            key: index + 1,
            value: dist,
            label: `${index + 1}. ${dist}${
              isExisting ? " (already exist)" : ""
            }`,
            disabled: isExisting,
          };
        }),
      ],
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
      id: "stateId",
      mainDivClassname: "col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Select State name",

      options: [
        { key: 0, value: "", label: "Select State" }, // Default empty value
        ...(states ?? [])?.map((state, index) => ({
          key: index + 1,
          value: state?._id,
          label: `${index + 1}. ${state?.name}`,
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
          key: index + 1,
          value: district?._id,
          label: `${index + 1}. ${district?.name}`,
        })),
      ],
      validation: Yup.string().required("District is required"),
      initialValue: "",
    },
    {
      key: 3,
      label: "Zone",
      htmlFor: "name",
      as: "select",
      name: "name",
      id: "name",
      mainDivClassname: "col-span-2",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter City name",
      options: [
        { key: 0, value: "", label: "Select Zone", disabled: false }, // Default empty option
        ...["east", "west", "north", "south"].map((zone, index) => {
          const isExisting = new Set(
            zones?.map((zone) => zone?.name.toLowerCase()) ?? []
          ).has(zone);
          return {
            key: index + 1,
            value: zone,
            label: `${index + 1}. ${zone}${
              isExisting ? " (already exist)" : ""
            }`,
            disabled: isExisting,
          };
        }),
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
          <div className="pl-2 pb-4 ">
            <h1 className="font-medium underline text-[#6bccb3]"> Add State</h1>
          </div>

          <Formik
            initialValues={stateInitialValues}
            validationSchema={stateValidationSchema}
            onSubmit={handleSubmitState}
          >
            {({ setFieldValue, isSubmitting, dirty, resetForm }) => (
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
                            onChange={(e) => {
                              setFieldValue(item?.name, e.target.value);
                            }}
                          >
                            {item?.options?.map((option) => (
                              <option
                                key={option?.key}
                                value={option?.value}
                                disabled={option?.disabled}
                                className={`${
                                  option.disabled
                                    ? "text-red-400"
                                    : "text-black"
                                }`}
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
                      className={`hover:bg-[#104e3d] text-white px-4 py-2 rounded-lg  ${
                        dirty
                          ? "bg-[#1f6c57] cursor-pointer"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!dirty || isSubmitting}
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
          <div className="pl-2 pb-4 ">
            <h1 className="font-medium underline text-[#6bccb3]">
              {" "}
              Add District
            </h1>
          </div>
          <Formik
            initialValues={districtInitialValues}
            validationSchema={districtValidationSchema}
            onSubmit={handleSubmitDistrict}
          >
            {({ values, isSubmitting, dirty, resetForm, setFieldValue }) => {
              return (
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
                          {item?.as === "select" && item?.label === "State" ? (
                            <Field
                              as="select"
                              name={item?.name}
                              id={item?.id}
                              className={item?.inputFieldClassName}
                              onChange={(e) => {
                                // onChange is needed when you have make any function, set the data using useState and make sure setFieldValue(key,(e.target.value)) is important to set for getting values
                                const selectedValue = e.target.value;
                                setFieldValue(item?.name, selectedValue);
                                // Find the selected state's name
                                const stateObj = states.find(
                                  (state) => state._id === selectedValue
                                );
                                setStateName(stateObj ? stateObj.name : ""); // Store the name in state
                                setStateId(selectedValue);
                              }}
                            >
                              {item?.options?.map((option) => (
                                <option key={option?.key} value={option?.value}>
                                  {option?.label}
                                </option>
                              ))}
                            </Field>
                          ) : item?.as === "select" &&
                            item?.label === "District" ? (
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
                                  disabled={option?.disabled}
                                  className={`${
                                    option.disabled
                                      ? "text-red-400"
                                      : "text-black"
                                  }`}
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
                    ))}
                  </div>
                  <div className="w-[100%] lg:w-[20%] flex justify-end gap-4 lg:mt-6 text-sm">
                    <div>
                      <button
                        type="button"
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer"
                        onClick={() => {
                          setStateName("");
                          resetForm();
                        }}
                      >
                        Reset
                      </button>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className={`hover:bg-[#104e3d] text-white px-4 py-2 rounded-lg  ${
                          dirty
                            ? "bg-[#1f6c57] cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!dirty || isSubmitting}
                      >
                        Add Dist
                      </button>{" "}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>

        {/* ------------------Add City 3rd ----------------------*/}

        {/* ------------------Add Zone 4th ----------------------*/}
        <div className="border border-gray-200 bg-gray-50 py-4 rounded-md shadow-md">
          <div className="pl-2 pb-4 ">
            <h1 className="font-medium underline text-[#6bccb3]"> Add Zone</h1>
          </div>
          <Formik
            initialValues={zoneInitialValues}
            validationSchema={zoneValidationSchema}
            onSubmit={handleSubmitZone}
          >
            {({ isSubmitting, dirty, resetForm, values, setFieldValue }) => {
              {
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
                          {item?.as === "select" && item?.name === "stateId" ? (
                            <Field
                              as="select"
                              name={item?.name}
                              id={item?.id}
                              className={item?.inputFieldClassName}
                              onChange={(e) => {
                                const getStateId = e.target.value;
                                setFieldValue(item?.name, getStateId);
                                setStateId(getStateId);
                              }}
                            >
                              {item?.options?.map((option) => (
                                <option
                                  key={option?.key}
                                  value={option?.value}
                                  disabled={option.disabled}
                                  className={`${
                                    option.disabled
                                      ? "text-red-400"
                                      : "text-black"
                                  }`}
                                >
                                  {option?.label}
                                </option>
                              ))}
                            </Field>
                          ) : item?.as === "select" &&
                            item?.name === "districtId" ? (
                            <Field
                              as="select"
                              name={item?.name}
                              id={item?.id}
                              className={item?.inputFieldClassName}
                              onChange={(e) => {
                                const getDistrictId = e.target.value;
                                setFieldValue(item?.name, getDistrictId);
                                setDistrictId(getDistrictId);
                              }}
                            >
                              {item?.options?.map((option) => (
                                <option
                                  key={option?.key}
                                  value={option?.value}
                                  disabled={option.disabled}
                                  className={`${
                                    option.disabled
                                      ? "text-red-400"
                                      : "text-black"
                                  }`}
                                >
                                  {option?.label}
                                </option>
                              ))}
                            </Field>
                          ) : item?.as === "select" && item?.name === "name" ? (
                            <Field
                              as="select"
                              name={item?.name}
                              id={item?.id}
                              className={item?.inputFieldClassName}
                              onChange={(e) => {
                                const zoneName = e.target.value;
                                setFieldValue(item?.name, zoneName);
                              }}
                            >
                              {item?.options?.map((option) => (
                                <option
                                  key={option?.key}
                                  value={option?.value}
                                  disabled={option.disabled}
                                  className={`${
                                    option.disabled
                                      ? "text-red-400"
                                      : "text-black"
                                  }`}
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
                        className={`hover:bg-[#104e3d] text-white px-4 py-2 rounded-lg  ${
                          dirty
                            ? "bg-[#1f6c57] cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!dirty || isSubmitting}
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
