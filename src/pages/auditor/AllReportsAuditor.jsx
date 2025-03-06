import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAssignCaseByAudior } from "../../redux/auditor/auditorAction";
import { highlightMatch } from "../../utils/highlightMatch";
import Pagination from "../../components/Pagination";
import SearchFilterAddSection from "../../components/SearchFilterAddSection";
import { Link } from "react-router-dom";
import { FaWhatsappSquare } from "react-icons/fa";
import {
  MdOutlineCancelPresentation,
  MdOutlineEmail,
  MdOutlineWhatsapp,
} from "react-icons/md";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const AllReportsAuditor = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store?.authReducer);
  const { data: isAuditorData, isLoading: isLoadingAuditor } = useSelector(
    (store) => store?.auditorReducer
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    verifiedByFieldExecutive: "",
    verifiedBySupervisor: "",
  });

  const [limit, setLimit] = useState(10);
  const [currentPageState, setCurrentPageState] = useState(
    isAuditorData?.pagination?.currentPage
  );

  // console.log(isAuditorData, "data===>");
  const [modalState, setModalState] = useState({
    isWhatsAppModalOpen: false,
    isEmailModalOpen: false,
  });
  console.log("modalState wp==>", modalState?.isWhatsAppModalOpen);
  console.log("modalState email==>", modalState?.isEmailModalOpen);
  useEffect(() => {
    dispatch(
      getAllAssignCaseByAudior(
        accessToken,
        `limit=${limit}&page=${currentPageState}&search=${searchQuery}&status=${filters.status}&verifiedByFieldExecutive=${filters.verifiedByFieldExecutive}&verifiedBySupervisor=${filters.verifiedBySupervisor}`
      )
    );
  }, [
    limit,
    currentPageState,
    searchQuery,
    filters.status,
    filters.verifiedByFieldExecutive,
    filters.verifiedBySupervisor,
  ]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const filterOptions = [
    {
      name: "status",
      value: filters.status,
      placeholder: "Filter by Status",
      options: [
        { label: "Process", value: "process" },
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "verifiedByFieldExecutive",
      value: filters.verifiedByFieldExecutive,
      placeholder: "Verified by Field Executive",
      options: [
        {
          label: "Yes",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ],
    },
    {
      name: "verifiedBySupervisor",
      value: filters.verifiedBySupervisor,
      placeholder: "Verified by Supervisor",
      options: [
        {
          label: "Yes",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ],
    },
  ];

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({
      status: "",
      verifiedByFieldExecutive: "",
      verifiedBySupervisor: "",
    });

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = ""; // Reset input value
  };

  const handleLimit = (val) => {
    setLimit(val);
    setCurrentPageState(1);
  };

  const handleCurrentPageState = (val) => {
    setCurrentPageState((prev) => prev + val);
  };

  const openWhatsAppModal = (rowData) => {
    console.log("rowData whatsapp", rowData);
    setModalState({ ...modalState, isWhatsAppModalOpen: true });
  };
  const closeWhatsAppModal = () => {
    console.log("object");
    setModalState({ ...modalState, isWhatsAppModalOpen: false });
  };
  const openEmailModal = (rowData) => {
    console.log("object email", rowData);
    setModalState({ ...modalState, isEmailModalOpen: true });
  };
  const closeEmailModal = () => {
    console.log("object");
    setModalState({ ...modalState, isEmailModalOpen: false });
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-5 w-[100%]">
        <SearchFilterAddSection
          setSearchQuery={setSearchQuery}
          setCurrentPageState={setCurrentPageState}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
          disabledReset={
            !searchQuery &&
            !filters.status &&
            !filters.verifiedByFieldExecutive &&
            !filters.verifiedBySupervisor
          }
          enableReset={
            searchQuery ||
            filters.status ||
            filters.verifiedByFieldExecutive ||
            filters.verifiedBySupervisor
          }
          // goToPageLink={"/coordinator/all/cases/add"} // new form page link
          addBtnEnable={false} // new form page link for btn enable/disable
        />

        {/* Table Section */}
        <div className="shadow-lg rounded-lg overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#073c4e] text-white">
                <th className="w-1/5 py-2 px-6 text-left text-xs">Case Code</th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">
                  Client Name
                </th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">
                  Client Contact
                </th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">
                  Field Executive
                </th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">
                  Verified By
                </th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">
                  PDF/MS Report
                </th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoadingAuditor ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-10 text-center text-gray-400 text-lg"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                    </div>{" "}
                  </td>
                </tr>
              ) : isAuditorData?.cases?.length > 0 ? (
                isAuditorData?.cases?.map((row, i) => (
                  <tr
                    key={row?._id}
                    className="hover:bg-gray-100 hover:shadow-md border-b border-gray-200 truncate text-sm"
                  >
                    <td className="py-2 px-6 ">
                      {highlightMatch(row?.caseCode, searchQuery)}
                    </td>
                    <td className="py-2 px-6 ">
                      {highlightMatch(row?.clientName, searchQuery)}
                    </td>
                    <td className="py-2 px-6 ">
                      {highlightMatch(row?.contactNo, searchQuery)}
                    </td>
                    <td className="py-2 px-6 ">
                      {highlightMatch(
                        `${row?.fieldExecutiveId?.firstName} ${row?.fieldExecutiveId?.lastName}`,
                        searchQuery
                      )}
                    </td>
                    <td className="py-2 px-6">
                      <div className="flex gap-2">
                        <div className="flex flex-col text-center">
                          <h1
                            className={`${
                              row?.verifiedBy?.fieldExecutive === true
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            FE
                          </h1>
                          <div className={`px-0.5`}>
                            {row?.verifiedBy?.fieldExecutive === true
                              ? "✅"
                              : "❌"}
                          </div>
                        </div>
                        <div className="flex flex-col text-center">
                          <h1
                            className={`${
                              row?.verifiedBy?.supervisor === true
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            SP
                          </h1>
                          <div className="px-0.5">
                            {row?.verifiedBy?.supervisor === true ? "✅" : "❌"}
                          </div>
                        </div>
                        <div className="flex flex-col text-center">
                          <h1
                            className={`${
                              row?.verifiedBy?.auditor === true
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            AU
                          </h1>
                          <div className="px-0.5">
                            {row?.verifiedBy?.auditor === true ? "✅" : "❌"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-6 ">
                      {row?.verifiedBy?.fieldExecutive === true &&
                        row?.verifiedBy?.supervisor === true &&
                        row?.verifiedBy?.auditor === true && (
                          <div className="rounded-sm px-3 py-2 bg-gray-200 shadow-sm text-gray-400 flex flex-row gap-3">
                            <button
                              className=""
                              onClick={() => openWhatsAppModal(row)}
                            >
                              <MdOutlineWhatsapp className="text-xl text-green-500" />
                            </button>
                            <button
                              className=""
                              onClick={() => openEmailModal(row)}
                            >
                              <MdOutlineEmail className="text-xl text-red-500" />
                            </button>
                          </div>
                        )}
                    </td>
                    <td className="py-2 px-6 ">
                      {row?.verifiedBy?.fieldExecutive === true &&
                      row?.verifiedBy?.supervisor === true ? (
                        <div className="rounded-sm bg-[#66d0b4] px-3 py-2 hover:bg-[#208369] hover:text-white shadow-sm shadow-[#073b4c]">
                          <Link
                            to={`/auditor/reportDetails?caseId=${row?._id}`}
                          >
                            <button>Compare</button>
                          </Link>
                        </div>
                      ) : (
                        <div className="rounded-sm px-3 py-2 bg-gray-200 shadow-sm text-gray-400">
                          <button className="cursor-not-allowed">
                            Compare
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="py-10 text-center text-gray-400 text-lg"
                  >
                    No Data Found !
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <Pagination
          currentPage={isAuditorData?.pagination?.currentPage}
          totalPages={isAuditorData?.pagination?.totalPages}
          totalData={isAuditorData?.pagination?.totalCases}
          limit={limit}
          handleLimit={handleLimit}
          handleCurrentPageState={handleCurrentPageState}
        />
      </div>

      {/* Modal for Whatsapp Image */}
      {modalState?.isWhatsAppModalOpen && (
        <WhatsAppModal closeWhatsAppModal={closeWhatsAppModal} />
      )}
      {/* Modal for Email Image */}
      {modalState?.isEmailModalOpen && (
        <div
          className="fixed inset-0 md:left-44 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={closeEmailModal}
        >
          <div className="relative bg-white p-0.5 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-2xl bg-white text-gray-500 hover:text-red-600 rounded-sm"
              onClick={closeEmailModal}
            >
              <MdOutlineCancelPresentation />
            </button>
            <div className="h-[25rem] w-[30rem] mt-5 p-4"> Email</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReportsAuditor;
const WhatsAppModal = ({ closeWhatsAppModal }) => {
  const validationSchema = Yup.object().shape({
    whatsAppNumbers: Yup.array()
      .of(
        Yup.string()
          .transform((value) => value.replace(/^0+/, "")) // Remove leading zeros
          .matches(/^\d{10}$/, "WhatsApp No. must be exactly 10 digits") // Only 10-digit numbers allowed
          .required("WhatsApp No. is required")
      )
      .min(1, "At least one number is required"),
  });

  // Initial Form Values
  const initialValues = {
    whatsAppNumbers: [""],
  };

  // Handle form submission
  const handleSubmit = (values) => {
    console.log("Values==>", values);
    closeWhatsAppModal(); // Close modal after submission
  };
  return (
    <div
      className="fixed inset-0 md:left-44 flex items-center justify-center bg-black bg-opacity-70 z-50"
      onClick={closeWhatsAppModal}
    >
      <div
        className="relative bg-white p-4 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-2xl bg-white text-gray-500 hover:text-red-600 rounded-sm"
          onClick={closeWhatsAppModal}
        >
          <MdOutlineCancelPresentation />
        </button>

        {/* Form with Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            validateForm,
            resetForm,
            dirty,
            isSubmitting,
          }) => (
            <Form className="h-auto w-[20rem] mt-5 p-4">
              <h2 className="text-xl font-bold mb-4">Enter WhatsApp Numbers</h2>

              <FieldArray name="whatsAppNumbers">
                {({ push, remove }) => (
                  <div>
                    <div
                      className={` ${
                        values.whatsAppNumbers?.length > 3
                          ? "h-40 overflow-y-auto custom-scrollbar"
                          : ""
                      } `}
                    >
                      {values.whatsAppNumbers.map((_, index) => (
                        <div key={index} className="flex flex-col mb-3">
                          <div className="flex items-center">
                            <Field
                              name={`whatsAppNumbers.${index}`}
                              type="number"
                              placeholder="Enter WhatsApp number"
                              className="w-full px-2 py-1 border rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="ml-2 text-red-600 hover:text-red-800"
                              disabled={values.whatsAppNumbers.length === 1} // Prevent removing last input
                            >
                              ✖
                            </button>
                          </div>
                          <ErrorMessage
                            name={`whatsAppNumbers.${index}`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Add More Button - Prevent adding if errors exist */}
                    <div className="flex flex-row gap-4 mt-3">
                      <button
                        type="button"
                        className={`w-[50%] p-2 rounded-md mb-3 hover:bg-red-500 text-white  ${
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
                        type="button"
                        onClick={async () => {
                          const errors = await validateForm(); // Validate form before adding
                          if (!errors.whatsAppNumbers) {
                            push("");
                          }
                        }}
                        className={`w-full p-2 rounded-md mb-3 ${
                          errors.whatsAppNumbers
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-300 text-black"
                        }`}
                        disabled={!!errors.whatsAppNumbers} // Disable if errors exist
                      >
                        + Add Another
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>

              <div className="flex flex-row gap-4 justify-center ">
                <button className="">PDF</button>
                <button className="">MS</button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded-md"
              >
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
