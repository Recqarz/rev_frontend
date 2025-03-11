import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addBankData } from "../redux/banks/bankAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddBankForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get banks
  const { accessToken } = useSelector((store) => store?.authReducer);

  const handleSubmit = (values, { resetForm }) => {
    // console.log('Form data===>', values)
    dispatch(addBankData(values, accessToken, navigate));
    resetForm();
  };

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="text-xl font-semibold">Add Bank</h3>
      </div>

      <div className="m-5 bg-white border-2 rounded-lg shadow border-gray-300">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 m-4">
                {AddBankFormSchema?.map((item) => (
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
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer"
                  onClick={() => resetForm()}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="hover:bg-[#104e3d] text-white px-4 py-2 rounded-lg bg-[#25b992] cursor-pointer"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBankForm;

const AddBankFormSchema = [
  {
    key: 1,
    label: "Bank Name",
    htmlFor: "bankName",
    name: "bankName",
    type: "text",
    id: "bankName",
    mainDivClassname: "col-span-4",
    inputFieldClassName:
      "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
    placeholder: "Enter bank name",
    validation: Yup.string().required("Bank Name is required"),
    initialValue: "",
  },
  {
    key: 2,
    label: "Branch Name",
    htmlFor: "branchName",
    name: "branchName",
    type: "text",
    id: "branchName",
    mainDivClassname: "col-span-4",
    inputFieldClassName:
      "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
    placeholder: "Enter branch name",
    validation: Yup.string().required("Branch Name is required"),
    initialValue: "",
  },
  {
    key: 3,
    label: "City Name",
    htmlFor: "city",
    name: "city",
    type: "text",
    id: "branchName",
    mainDivClassname: "col-span-4",
    inputFieldClassName:
      "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
    placeholder: "Enter city name",
    validation: Yup.string().required("City Name is required"),
    initialValue: "",
  },
  {
    key: 4,
    label: "Business Vertical",
    htmlFor: "businessVertical",
    name: "businessVertical",
    type: "text",
    id: "branchName",
    mainDivClassname: "col-span-4",
    inputFieldClassName:
      "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
    placeholder: "Enter Business Vertical",
    validation: Yup.string().required("Business Vertical is required"),
    initialValue: "",
  },
  {
    key: 5,
    label: "GST Number",
    htmlFor: "gstNumber",
    name: "gstNumber",
    type: "text",
    id: "branchName",
    mainDivClassname: "col-span-4",
    inputFieldClassName:
      "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
    placeholder: "Enter GST No.",
    validation: Yup.string().required("GST No. is required"),
    initialValue: "",
  },
];
const validationSchema = Yup.object(
  AddBankFormSchema.reduce((schema, field) => {
    if (field.validation) {
      schema[field.name] = field.validation;
    }
    return schema;
  }, {})
);

const initialValues = AddBankFormSchema.reduce((values, field) => {
  values[field.name] = field.initialValue || ""; // Use defaultValue or fallback to an empty string
  return values;
}, {});
