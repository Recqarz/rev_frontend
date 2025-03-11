import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addBankData, bankDataUpdate } from "../redux/banks/bankAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const AddBankForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const bankId = searchParams.get("bankId");
  // console.log("bankId==>", bankId);
  const { accessToken } = useSelector((store) => store?.authReducer);

  // useEffect(() => {
  //   if (bankId) {
  //     dispatch(getBankById(bankId));
  //   }
  // }, [bankId]);

  const handleSubmit = async (values, { resetForm }) => {
    // console.log("handleSubmit values", values);
    const formattedValues = {
      bankName: values?.bankName,
      branchName: values?.branchName,
      city: values?.city,
      businessVertical: values?.businessVertical,
      gstNumber: values?.gstNumber,
      contactPerson: {
        name: values?.contactPersonName,
        email: values?.contactPersonEmail,
        mobileNumber: values?.contactPersonNumber,
        designation: values?.contactPersonDesignation,
      },
      managerRelationshipOne: {
        name: values?.managerNameOne,
        email: values?.managerEmailOne,
        mobileNumber: values?.managerContactOne,
        designation: values?.managerDesignationOne,
      },
      managerRelationshipTwo: {
        name: values?.managerNameTwo,
        email: values?.managerEmailTwo,
        mobileNumber: values?.managerContactTwo,
        designation: values?.managerDesignationTwo,
      },
    };

    // console.log("formattedValues==>", formattedValues);

    if (bankId) {
      // Show confirmation dialog for updating case
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update this bank?",
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
        dispatch(bankDataUpdate(formattedValues, accessToken, bankId));
      }
    } else {
      dispatch(addBankData(formattedValues, accessToken, navigate));
    }
    resetForm();
  };

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="text-xl font-semibold">
          {bankId ? "Update Bank" : "Add Bank"}
        </h3>
      </div>

      <div className="m-5 bg-white border-2 rounded-lg shadow border-gray-300 p-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, resetForm, dirty, values }) => {
            {
              {
                /* console.log("values===>", values); */
              }
            }
            return (
              <Form>
                {/* ===== Bank Details Section ===== */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-700 mb-4">
                    🏦 Bank Details
                  </h4>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {AddBankFormSchema?.bankDetails?.map((item) => (
                      <FormField key={item.key} item={item} />
                    ))}
                  </div>
                </div>

                {/* ===== Contact Person Section ===== */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-700 mb-4">
                    📞 Contact Person Details
                  </h4>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {AddBankFormSchema?.contactPerson?.map((item) => (
                      <FormField key={item.key} item={item} />
                    ))}
                  </div>
                </div>

                {/* ===== Manager Relationship One Section ===== */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-700 mb-4">
                    👨‍💼 Manager Relationship One
                  </h4>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {AddBankFormSchema?.managerRelationshipOne?.map((item) => (
                      <FormField key={item.key} item={item} />
                    ))}
                  </div>
                </div>

                {/* ===== Manager Relationship Two Section ===== */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-700 mb-4">
                    👩‍💼 Manager Relationship Two
                  </h4>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {AddBankFormSchema?.managerRelationshipTwo?.map((item) => (
                      <FormField key={item.key} item={item} />
                    ))}
                  </div>
                </div>

                {/* ===== Form Buttons ===== */}
                <div className="flex gap-4 justify-center md:justify-end mt-6">
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
                    {bankId ? "Update Bank" : "Add Bank"}
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

// Reusable Form Field Component
const FormField = ({ item }) => {
  // console.log("FormField item==>", item);
  return (
    <div className={item.mainDivClassname}>
      <label
        htmlFor={item.htmlFor}
        className="text-sm font-medium text-gray-900 block mb-2"
      >
        {item.label}
      </label>
      <Field
        type={item.type}
        name={item.name}
        id={item.id}
        className={item.inputFieldClassName}
        placeholder={item.placeholder}
      />
      <ErrorMessage
        name={item.name}
        component="p"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default AddBankForm;

// Section-wise Schema
const AddBankFormSchema = {
  bankDetails: [
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
      id: "city",
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
      id: "businessVertical",
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
      id: "gstNumber",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter GST No.",
      validation: Yup.string().required("GST No. is required"),
      initialValue: "",
    },
  ],

  contactPerson: [
    {
      key: 6,
      label: "Contact Person Name",
      htmlFor: "contactPersonName",
      name: "contactPersonName",
      type: "text",
      id: "contactPersonName",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Contact Person Name",
      validation: Yup.string().required("Contact Person Name is required"),
      initialValue: "",
    },
    {
      key: 7,
      label: "Contact Person Number",
      htmlFor: "contactPersonNumber",
      name: "contactPersonNumber",
      type: "number",
      id: "contactPersonNumber",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Contact Person Number",
      validation: Yup.string()
        .transform((value) => value.replace(/^0+/, ""))
        .matches(/^\d{10}$/, "Contact no. must be 10 digits & non-negative")
        .required("Contact Person Number is required"),
      initialValue: "",
    },
    {
      key: 8,
      label: "Contact Person Email",
      htmlFor: "contactPersonEmail",
      name: "contactPersonEmail",
      type: "email",
      id: "contactPersonEmail",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Contact Person Email",
      validation: Yup.string()
        .email("Invalid email format")
        .required("Contact Person Email is required"),
      initialValue: "",
    },
    {
      key: 9,
      label: "Contact Person Designation",
      htmlFor: "contactPersonDesignation",
      name: "contactPersonDesignation",
      type: "text",
      id: "contactPersonDesignation",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Contact Person Designation",
      validation: Yup.string().required(
        "Contact Person Designation is required"
      ),
      initialValue: "",
    },
  ],

  managerRelationshipOne: [
    {
      key: 10,
      label: "Manager One Name",
      htmlFor: "managerNameOne",
      name: "managerNameOne",
      type: "text",
      id: "managerNameOne",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Manager Name",
      validation: Yup.string().required("Manager Name is required"),
      initialValue: "",
    },
    {
      key: 11,
      label: "Manager One Contact",
      htmlFor: "managerContactOne",
      name: "managerContactOne",
      type: "number",
      id: "managerContactOne",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Manager Contact",
      validation: Yup.string()
        .transform((value) => value.replace(/^0+/, ""))
        .matches(/^\d{10}$/, "Contact no. must be 10 digits & non-negative")
        .required("Manager Contact is required"),
      initialValue: "",
    },
    {
      key: 12,
      label: "Manager One Email",
      htmlFor: "managerEmailOne",
      name: "managerEmailOne",
      type: "email",
      id: "managerEmailOne",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Manager Email",
      validation: Yup.string()
        .email("Invalid email format")
        .required("Manager Email is required"),
      initialValue: "",
    },
    {
      key: 13,
      label: "Manager Designation",
      htmlFor: "managerDesignationOne",
      name: "managerDesignationOne",
      type: "text",
      id: "managerDesignationOne",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Contact Person Designation",
      validation: Yup.string().required("Manager Designation is required"),
      initialValue: "",
    },
  ],

  managerRelationshipTwo: [
    {
      key: 14,
      label: "Manager Two Name",
      htmlFor: "managerNameTwo",
      name: "managerNameTwo",
      type: "text",
      id: "managerNameTwo",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Manager Name",
      validation: Yup.string().required("Manager Name is required"),
      initialValue: "",
    },
    {
      key: 15,
      label: "Manager Two Contact",
      htmlFor: "managerContactTwo",
      name: "managerContactTwo",
      type: "number",
      id: "managerContactTwo",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Manager Contact",
      validation: Yup.string()
        .transform((value) => value.replace(/^0+/, ""))
        .matches(/^\d{10}$/, "Contact no. must be 10 digits & non-negative")
        .required("Manager Contact is required"),
      initialValue: "",
    },
    {
      key: 16,
      label: "Manager Two Email",
      htmlFor: "managerEmailTwo",
      name: "managerEmailTwo",
      type: "email",
      id: "managerEmailTwo",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Manager Email",
      validation: Yup.string()
        .email("Invalid email format")
        .required("Manager Email is required"),
      initialValue: "",
    },
    {
      key: 17,
      label: "Manager Designation",
      htmlFor: "managerDesignationTwo",
      name: "managerDesignationTwo",
      type: "text",
      id: "managerDesignationTwo",
      mainDivClassname: "col-span-4",
      inputFieldClassName:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5",
      placeholder: "Enter Contact Person Designation",
      validation: Yup.string().required("Manager Designation is required"),
      initialValue: "",
    },
  ],
};

// Generate validation schema dynamically
const validationSchema = Yup.object(
  Object.values(AddBankFormSchema)
    .flat()
    .reduce((schema, field) => {
      if (field.validation) {
        schema[field.name] = field.validation;
      }
      return schema;
    }, {})
);

// Generate initial values dynamically
const initialValues = Object.values(AddBankFormSchema)
  .flat()
  .reduce((values, field) => {
    values[field.name] = field.initialValue || "";
    return values;
  }, {});
