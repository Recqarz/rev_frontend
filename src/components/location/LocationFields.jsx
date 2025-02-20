import React from "react";
import { ErrorMessage, Field } from "formik";

const LocationFields = ({
  data = [],
  label,
  selectTagName,
  changeLocation,
}) => {
  return (
    <div>
      <label
        htmlFor={selectTagName}
        className="text-sm font-medium text-gray-900 block mb-2"
      >
        Select {label}
      </label>

      <Field
        as="select"
        name={selectTagName}
        id={selectTagName}
        onChange={(e) => {
          changeLocation(e.target.value);
        }}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
      >
        <option value={""}>Select {label}</option>
        {data?.map((location, index) => (
          <option key={index + 1} value={location?._id}>
            {location?.name}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={selectTagName}
        component="p"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default LocationFields;
