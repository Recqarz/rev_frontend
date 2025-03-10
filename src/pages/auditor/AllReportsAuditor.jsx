import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  caseDataIdByAuditor,
  getAllAssignCaseByAuditor,
} from "../../redux/auditor/auditorAction";
import { highlightMatch } from "../../utils/highlightMatch";
import Pagination from "../../components/Pagination";
import SearchFilterAddSection from "../../components/SearchFilterAddSection";
import { Link } from "react-router-dom";
import {
  FaCopy,
  FaRegFilePdf,
  FaRegFileWord,
  FaWhatsappSquare,
} from "react-icons/fa";
import {
  MdOutlineCancelPresentation,
  MdOutlineEmail,
  MdOutlineWhatsapp,
} from "react-icons/md";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TiTick } from "react-icons/ti";
import {
  emailMSWordReportSender,
  emailPdfReportSender,
  whatsappPdfReportSender,
} from "../../redux/sendReport/sendReportAction";
import { getCaseById, updateCaseDataId } from "../../redux/case/caseAction";

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

  const [modalState, setModalState] = useState({
    isWhatsAppModalOpen: false,
    isEmailModalOpen: false,
    rowData: {},
  });
  const [isFetch, setIsFetch] = useState(false);

  useEffect(() => {
    dispatch(
      getAllAssignCaseByAuditor(
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
    isFetch,
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
    setModalState({
      ...modalState,
      isWhatsAppModalOpen: true,
      rowData: rowData,
    });
  };
  const closeWhatsAppModal = () => {
    setModalState({ ...modalState, isWhatsAppModalOpen: false });
  };
  const openEmailModal = (rowData) => {
    setModalState({ ...modalState, isEmailModalOpen: true, rowData: rowData });
  };
  const closeEmailModal = () => {
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
                      row?.verifiedBy?.auditor === true ? (
                        <div className="rounded-sm px-3 py-2 bg-sky-200 shadow-sm text-gray-400 flex flex-row gap-3">
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
                      ) : (
                        <div className="rounded-sm px-3 py-2 bg-gray-200 shadow-sm text-gray-400 flex flex-row gap-3 cursor-not-allowed">
                          <button
                            className="cursor-not-allowed"
                            // onClick={() => openWhatsAppModal(row)}
                          >
                            <MdOutlineWhatsapp className="text-xl text-green-300" />
                          </button>
                          <button
                            className="cursor-not-allowed"
                            // onClick={() => openEmailModal(row)}
                          >
                            <MdOutlineEmail className="text-xl text-red-300" />
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
        <WhatsAppModal
          closeWhatsAppModal={closeWhatsAppModal}
          modalState={modalState}
          accessToken={accessToken}
          setIsFetch={setIsFetch}
        />
      )}
      {/* Modal for Email Image */}
      {modalState?.isEmailModalOpen && (
        <EmailModal
          closeEmailModal={closeEmailModal}
          modalState={modalState}
          accessToken={accessToken}
          setIsFetch={setIsFetch}
        />
      )}
    </div>
  );
};

export default AllReportsAuditor;

const WhatsAppModal = ({
  closeWhatsAppModal,
  modalState,
  accessToken,
  setIsFetch,
}) => {
  const wpUserLists =
    modalState?.rowData?.reportDelivery?.whatsAppStatus?.pdf?.wpUserLists;

  const dispatch = useDispatch();

  const [copied, setCopied] = useState({
    caseCodeCopied: false,
    wpNumberCopied: false,
    emailAddressCopied: false,
  });

  const [reportState, setReportSate] = useState({
    pdfFormat: false,
    msWordFormat: false,
    setErrorMessage: "",
  });
  const validationSchema = Yup.object().shape({
    whatsAppNumbers: Yup.array()
      .of(
        Yup.string()
          .trim()
          .transform((value) => value.replace(/^0+/, "")) // Remove leading zeros
          .matches(/^\d{10}$/, "WhatsApp No. must be exactly 10 digits") // Only 10-digit numbers allowed
          .required("WhatsApp No. is required")
      )
      .min(1, "At least one whatsapp number is required"),
  });

  // Initial Form Values
  const initialValues = {
    whatsAppNumbers: [""],
  };

  const pdfFunc = () => {
    setReportSate((prevState) => ({
      ...prevState,
      pdfFormat: !prevState.pdfFormat,
      setErrorMessage: "",
    }));
  };

  const msWordFunc = () => {
    setReportSate((prevState) => ({
      ...prevState,
      msWordFormat: !prevState.msWordFormat,
      setErrorMessage: "",
    }));
  };
  const handleCopy = useCallback((copyItem, itemName) => {
    if (!copyItem) return;
    navigator.clipboard.writeText(copyItem);
    setCopied((prev) => ({ ...prev, [itemName]: true }));

    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [itemName]: false }));
    }, 3000);
  }, []);

  // Handle form submission
  const handleSubmit = async (values) => {
    if (!reportState.pdfFormat) {
      setReportSate({
        ...reportState,
        setErrorMessage: "Please select PDF format to send.",
      });
      return;
    }
    setReportSate({ ...reportState, setErrorMessage: "" });

    const formattedValues = {
      whatsAppNumbers: values?.whatsAppNumbers,
    };

    try {
      const promises = [];
      if (reportState.pdfFormat) {
        promises.push(
          dispatch(
            whatsappPdfReportSender(
              modalState?.rowData?._id,
              accessToken,
              formattedValues
            )
          )
        );
      }

      await Promise.all(promises);
      await setIsFetch(true);
    } catch (error) {
      console.error("Error sending reports:", error);
    } finally {
      setIsFetch(false);
      closeWhatsAppModal();
    }
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
        {/* CaseCode header section */}
        <div className="flex items-center justify-center space-x-2">
          <h3 className="font-semibold">CASE CODE :</h3>
          {modalState?.rowData?.caseCode && (
            <div
              className={`flex items-center space-x-2 rounded-sm px-2 shadow-sm shadow-[#073b4c]`}
            >
              <span className="text-gray-600">
                {modalState?.rowData?.caseCode}
              </span>
              <button
                onClick={() =>
                  handleCopy(modalState?.rowData?.caseCode, "caseCodeCopied")
                }
                className="text-blue-500 hover:text-blue-700"
              >
                {copied?.caseCodeCopied ? (
                  <TiTick className={`rounded-sm text-sm text-green-500`} />
                ) : (
                  <FaCopy className={`rounded-sm text-sm  text-[#073b4c] `} />
                )}
              </button>
            </div>
          )}

          <span
            className={`text-green-500 ml-2 text-sm ${
              copied?.caseCodeCopied ? "opacity-100" : "opacity-0"
            }`}
          >
            Copied!
          </span>
        </div>
        {/* Whatsapp User Lists */}
        {wpUserLists && wpUserLists?.length > 0 && (
          <div className="h-auto w-[17rem] md:w-[32rem] mt-1 px-4 py-2 space-y-1">
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-medium text-sm">WhatsApp User Lists :</h1>
              <div
                className={`flex flex-row justify-center items-center text-green-500  text-sm ${
                  copied?.wpNumberCopied ? "opacity-100" : "opacity-0"
                }`}
              >
                <TiTick />
                <span>Number Copied!</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 p-1 border border-[#6aceb4] rounded-sm max-h-32 overflow-y-auto custom-scrollbar">
              {wpUserLists &&
                wpUserLists?.length &&
                wpUserLists?.map((item, i) => (
                  <p
                    key={i + 1}
                    className="text-sm rounded-md px-1 text-white bg-green-500 cursor-pointer"
                    onClick={() => handleCopy(item, "wpNumberCopied")}
                  >
                    {item}
                  </p>
                ))}
            </div>
          </div>
        )}

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
            <Form className="h-auto w-[17rem] md:w-[32rem]  p-4 ">
              <h2 className="text-lg font-bold">Enter WhatsApp Numbers</h2>

              <FieldArray name="whatsAppNumbers">
                {({ push, remove }) => (
                  <div>
                    <div
                      className={` flex flex-wrap gap-2
                        max-h-40 overflow-y-auto custom-scrollbar `}
                    >
                      {values.whatsAppNumbers.map((_, index) => (
                        <div key={index} className="flex flex-col gap-1">
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
                              className="ml-1 text-red-600 hover:text-red-800"
                              disabled={values.whatsAppNumbers.length === 1} // Prevent removing last input
                            >
                              ✖
                            </button>
                          </div>
                          <ErrorMessage
                            name={`whatsAppNumbers.${index}`}
                            component="div"
                            className="text-red-500 text-sm"
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
                            : "bg-gray-300 cursor-not-allowed"
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
              {/* PDF/WORD/SEND Button */}
              <div className="flex flex-row gap-4 mt-3">
                <div className="flex flex-row gap-4">
                  <button
                    type="button"
                    className={` px-4 py-3 rounded-lg mb-3 bg-gray-300 text-red-700 text-md ${
                      reportState?.pdfFormat ? "bg-green-500" : ""
                    } `}
                    onClick={pdfFunc}
                  >
                    <FaRegFilePdf />
                  </button>
                </div>
                <button
                  type="submit"
                  className={`w-full p-2 bg-green-500 text-white rounded-md mb-3 }`}
                >
                  Send
                </button>
              </div>
              {reportState?.setErrorMessage && (
                <div className="text-red-500 text-sm mb-2">
                  {reportState?.setErrorMessage}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const EmailModal = ({
  closeEmailModal,
  modalState,
  accessToken,
  setIsFetch,
}) => {
  const msWordEmailUserLists =
    modalState?.rowData?.reportDelivery?.emailStatus?.msWord?.emailUserLists;
  const pdfEmailUserLists =
    modalState?.rowData?.reportDelivery?.emailStatus?.pdf?.emailUserLists;

  const dispatch = useDispatch();

  const [copied, setCopied] = useState({
    caseCodeCopied: false,
    pdfEmailAddressCopied: false,
    wordEmailAddressCopied: false,
  });
  const [reportState, setReportSate] = useState({
    emailPdfFormat: false,
    emailMsWordFormat: false,
    setErrorMessage: "",
  });
  const validationSchema = Yup.object().shape({
    emails: Yup.array()
      .of(
        Yup.string().email("Invalid email format").required("Email is required")
      )
      .min(1, "At least one email is required"),
  });

  // Initial Form Values
  const initialValues = {
    emails: [""],
  };

  const pdfFunc = () => {
    setReportSate((prevState) => ({
      ...prevState,
      emailPdfFormat: !prevState.emailPdfFormat,
      setErrorMessage: "",
    }));
  };

  const msWordFunc = () => {
    setReportSate((prevState) => ({
      ...prevState,
      emailMsWordFormat: !prevState.emailMsWordFormat,
      setErrorMessage: "",
    }));
  };
  const handleCopy = useCallback((copyItem, itemName) => {
    if (!copyItem) return;
    navigator.clipboard.writeText(copyItem);
    setCopied((prev) => ({ ...prev, [itemName]: true }));

    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [itemName]: false }));
    }, 3000);
  }, []);

  const handleSubmit = async (values) => {
    // Check if no format is selected
    if (!reportState.emailPdfFormat && !reportState.emailMsWordFormat) {
      setReportSate({
        ...reportState,
        setErrorMessage: "Please select PDF or MS Word or both format to send.",
      });
      return;
    }

    setReportSate({
      ...reportState,
      setErrorMessage: "",
    }); // Clear error if formats are selected

    const formattedValues = {
      emails: values?.emails,
    };

    try {
      const promises = [];

      if (reportState?.emailPdfFormat) {
        promises.push(
          dispatch(
            emailPdfReportSender(
              modalState?.rowData?._id,
              accessToken,
              formattedValues
            )
          )
        );
      }

      if (reportState?.emailMsWordFormat) {
        promises.push(
          dispatch(
            emailMSWordReportSender(
              modalState?.rowData?._id,
              accessToken,
              formattedValues
            )
          )
        );
      }

      // Execute all dispatch calls concurrently
      await Promise.all(promises);
      await setIsFetch(true);
    } catch (error) {
      console.error("Error sending reports:", error);
    } finally {
      setIsFetch(false);
      closeEmailModal();
    }
  };

  return (
    <div
      className="fixed inset-0 md:left-44 flex items-center justify-center bg-black bg-opacity-70 z-50"
      onClick={closeEmailModal}
    >
      <div
        className="relative bg-white p-4 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-2xl bg-white text-gray-500 hover:text-red-600 rounded-sm"
          onClick={closeEmailModal}
        >
          <MdOutlineCancelPresentation />
        </button>
        <div className="flex items-center justify-center space-x-2 uppercase">
          <h3 className="font-semibold">Case Code :</h3>
          {modalState?.rowData?.caseCode && (
            <div
              className={`flex items-center space-x-2 rounded-sm px-2 shadow-sm shadow-[#073b4c]`}
            >
              <span className="text-gray-600">
                {modalState?.rowData?.caseCode}
              </span>
              <button
                onClick={() =>
                  handleCopy(modalState?.rowData?.caseCode, "caseCodeCopied")
                }
                className="text-blue-500 hover:text-blue-700"
              >
                {copied?.caseCodeCopied ? (
                  <TiTick className={`rounded-sm text-sm text-green-500`} />
                ) : (
                  <FaCopy className={`rounded-sm text-sm  text-[#073b4c] `} />
                )}
              </button>
            </div>
          )}

          <span
            className={`text-green-500 ml-2 text-sm ${
              copied?.caseCodeCopied ? "opacity-100" : "opacity-0"
            }`}
          >
            Copied!
          </span>
        </div>
        {(pdfEmailUserLists || msWordEmailUserLists) && (
          <div className="flex flex-col">
            {pdfEmailUserLists && pdfEmailUserLists?.length && (
              <div className="h-auto w-[17rem] md:w-[32rem] mt-1 px-4">
                <div className="flex flex-row justify-between items-center">
                  <h1 className="font-medium text-sm">
                    Email PDF User Lists :
                  </h1>
                  <div
                    className={`flex flex-row justify-center items-center text-green-500  text-sm ${
                      copied?.pdfEmailAddressCopied
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <TiTick />
                    <span>Email Copied!</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 p-1 border border-[#6aceb4] rounded-sm max-h-16 overflow-y-auto custom-scrollbar">
                  {pdfEmailUserLists &&
                    pdfEmailUserLists?.length &&
                    pdfEmailUserLists?.map((item, i) => (
                      <p
                        key={i + 1}
                        className="text-sm rounded-md px-1 text-white bg-green-500 cursor-pointer"
                        onClick={() =>
                          handleCopy(item, "pdfEmailAddressCopied")
                        }
                      >
                        {item}
                      </p>
                    ))}
                </div>
              </div>
            )}
            {msWordEmailUserLists && msWordEmailUserLists?.length > 0 && (
              <div className="h-auto w-[17rem] md:w-[32rem] mt-1 px-4">
                <div className="flex flex-row justify-between items-center">
                  <h1 className="font-medium text-sm">
                    Email MsWord User Lists :
                  </h1>
                  <div
                    className={`flex flex-row justify-center items-center text-green-500 text-sm ${
                      copied?.wordEmailAddressCopied
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {" "}
                    <TiTick />
                    <span>Email Copied!</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 p-1 border border-[#6aceb4] rounded-sm max-h-16 overflow-y-auto custom-scrollbar">
                  {msWordEmailUserLists &&
                    msWordEmailUserLists?.length &&
                    msWordEmailUserLists?.map((item, i) => (
                      <p
                        key={i + 1}
                        className="text-sm rounded-md px-1 text-white bg-green-500 cursor-pointer"
                        onClick={() =>
                          handleCopy(item, "wordEmailAddressCopied")
                        }
                      >
                        {item}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

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
            <Form className="h-auto w-[17rem] md:w-[32rem] px-4 py-1">
              <h2 className="text-lg font-bold ">Enter Emails</h2>

              <FieldArray name="emails">
                {({ push, remove }) => (
                  <div>
                    <div
                      className={` flex flex-wrap gap-2
                      max-h-32 overflow-y-auto custom-scrollbar} `}
                    >
                      {values.emails.map((_, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-1 w-full md:w-auto"
                        >
                          <div className="flex items-center">
                            <Field
                              name={`emails.${index}`}
                              type="email"
                              placeholder="Enter Email Address"
                              className="w-full px-2 py-1 border rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="ml-1 text-red-600 hover:text-red-800"
                              disabled={values.emails.length === 1} // Prevent removing last input
                            >
                              ✖
                            </button>
                          </div>
                          <ErrorMessage
                            name={`emails.${index}`}
                            component="div"
                            className="text-red-500 text-sm"
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
                            : "bg-gray-300 cursor-not-allowed"
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
                          if (!errors.emails) {
                            push("");
                          }
                        }}
                        className={`w-full p-2 rounded-md mb-3 ${
                          errors.emails
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-300 text-black"
                        }`}
                        disabled={!!errors.emails} // Disable if errors exist
                      >
                        + Add Another
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
              {/* PDF/WORD/SEND Button */}
              <div className="flex flex-row gap-4 mt-3">
                <div className="flex flex-row gap-4">
                  <button
                    type="button"
                    className={` px-4 py-3 rounded-lg mb-3 bg-gray-300 text-red-700 text-md ${
                      reportState?.emailPdfFormat ? "bg-green-500" : ""
                    } `}
                    onClick={pdfFunc}
                  >
                    <FaRegFilePdf />
                  </button>
                  <button
                    type="button"
                    className={` px-4 py-3 rounded-lg mb-3 bg-gray-300 text-violet-700 text-md ${
                      reportState?.emailMsWordFormat ? "bg-green-500" : ""
                    }`}
                    onClick={msWordFunc}
                  >
                    <FaRegFileWord />
                  </button>
                </div>
                <button
                  type="submit"
                  className={`w-full p-2 bg-green-500 text-white rounded-md mb-3 }`}
                >
                  Send
                </button>
              </div>
              {reportState?.setErrorMessage && (
                <div className="text-red-500 text-sm mb-2">
                  {reportState?.setErrorMessage}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
