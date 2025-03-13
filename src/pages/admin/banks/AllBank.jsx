import React, { useCallback, useEffect, useMemo, useState } from "react";
// import '../index.css'
import {
  MdDeleteOutline,
  MdKeyboardArrowRight,
  MdOutlineEdit,
} from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  bankDataUpdate,
  getAllBankData,
} from "../../../redux/banks/bankAction";
import SearchFilterAddSection from "../../../components/SearchFilterAddSection";
import Pagination from "../../../components/Pagination";
import { highlightMatch } from "../../../utils/highlightMatch";
import { IoCloseCircleOutline } from "react-icons/io5";

const AllBank = () => {
  const dispatch = useDispatch();
  const {
    isLoading: isLoadingBank,
    isError,
    data,
  } = useSelector((state) => state.allBankReducer);
  const { message, currentPage, totalPages, totalBank, banks } = data;
  // console.log("banks==>", banks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ sortOrder: "" });
  const [limit, setLimit] = useState(10);
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const [debouncedFilters, setDebouncedFilters] = useState({
    search: "",
  });
  const [bankId, setBankId] = useState("");
  const [bankUpdate, setBankUpdate] = useState(false);
  const [bankUpdateData, setBankUpdateData] = useState({
    bankName: "",
    branchName: "",
    IFSC: "",
  });
  const [expandedRow, setExpandedRow] = useState(null);

  const accessToken = useSelector((store) => store.authReducer.accessToken);

  useEffect(() => {
    dispatch(
      getAllBankData(
        `limit=${limit}&page=${currentPageState}&search=${searchQuery}&sortOrder=${filters.sortOrder}`
      )
    );
  }, [limit, currentPageState, searchQuery, filters]);

  const filterOptions = useMemo(
    () => [
      {
        name: "sortOrder",
        value: filters.sortOrder,
        placeholder: "Filter by Alphabetically",
        options: [
          { label: "A to Z", value: "asc" },
          { label: "Z to A", value: "desc" },
        ],
      },
    ],
    [filters]
  );
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleUpdateStatusFunc = (item) => {
    setBankId(item._id);
    setBankUpdate(true);
    setBankUpdateData({
      bankName: item.bankName,
      branchName: item.branchName,
      IFSC: item.IFSC,
    });
  };

  const handleChangeBankData = (e) => {
    const { name, value } = e.target;
    setBankUpdateData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleUpdateBankFunc = (e) => {
    e.preventDefault();
    dispatch(bankDataUpdate(bankUpdateData, accessToken, bankId));
    setBankUpdate(false);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({ sortOrder: "" });

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = ""; // Reset input value
  };

  const handleLimit = (val) => {
    setLimit(val);
  };

  const handleCurrentPageState = (val) => {
    setCurrentPageState((prev) => prev + val);
  };
  const toggleDetails = useCallback((index) => {
    setExpandedRow((prev) => (prev === index ? null : index)); // Toggle row expansion
  }, []);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-5 w-[100%]">
        {/* Search, Filter Section & add section*/}
        <SearchFilterAddSection
          setSearchQuery={setSearchQuery}
          setCurrentPageState={setCurrentPageState}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
          disabledReset={!searchQuery && !filters.sortOrder}
          enableReset={searchQuery || filters.sortOrder}
          goToPageLink={"/admin/bank/add"}
          addBtnEnable={true}
        />
        {/* Table section */}
        <div className="shadow-lg rounded-lg overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#073c4e] text-white text-xs text-left">
                <th className="p-2">Sl No.</th>
                <th className="p-2">Bank Name</th>
                <th className="p-2">Branch Name</th>
                <th className="p-2">City</th>
                <th className="p-2">GST No.</th>
                <th className="p-2">Contact Person</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoadingBank ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-10 text-center text-gray-400 text-lg"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                    </div>{" "}
                  </td>
                </tr>
              ) : banks && banks?.length > 0 ? (
                banks?.map((row, index) => (
                  <React.Fragment key={index}>
                    {/* Main Row */}
                    <tr className="hover:bg-gray-100 cursor-pointer hover:shadow-md">
                      <td className="py-2.5 px-2 border-b border-gray-200 truncate text-sm">
                        {index + 1}
                      </td>
                      <td className="py-2.5 px-2 border-b border-gray-200 truncate text-sm">
                        {highlightMatch(row?.bankName, searchQuery)}
                      </td>
                      <td className="py-2.5 px-2 border-b border-gray-200 text-sm truncate">
                        {highlightMatch(row?.branchName, searchQuery)}
                      </td>
                      <td className="py-2.5 px-2 border-b border-gray-200 text-sm truncate">
                        {highlightMatch(row?.city || "N/A", searchQuery)}
                      </td>
                      <td className="py-2.5 px-2 border-b border-gray-200 truncate text-sm">
                        {highlightMatch(row?.gstNumber || "N/A", searchQuery)}
                      </td>
                      <td className="py-2.5 px-2 border-b border-gray-200 truncate text-sm">
                        {highlightMatch(
                          row?.contactPerson?.mobileNumber || "N/A",
                          searchQuery
                        )}
                      </td>

                      <td
                        className={`py-2.5 px-2 border-b border-gray-200 hover:bg-blue-50 ${
                          expandedRow === index ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex gap-2 items-center">
                          <Link to={`/admin/bank/update?bankId=${row?._id}`}>
                            <div className="rounded-full hover:bg-gray-300 py-1 px-1">
                              <MdOutlineEdit className="text-xl text-[#3fb597]" />
                            </div>
                          </Link>
                          <div
                            className="text-2xl p-1 text-[#3fb597] rounded-full hover:bg-gray-300"
                            onClick={() => toggleDetails(index)} // Toggle the details panel
                          >
                            <MdKeyboardArrowRight
                              className={`transform transition-transform duration-300 ease-in-out
                             ${expandedRow === index ? "rotate-90" : ""}
                            `}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* Details Row */}

                    {expandedRow === index && (
                      <tr className="bg-blue-50">
                        <td
                          colSpan={7}
                          className="p-4 border-b border-gray-200"
                        >
                          {/* <h1 className="uppercase font-semibold mb-1">
                            Bank Details:
                          </h1> */}
                          <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="flex flex-col gap-0.5">
                              <h1 className="uppercase font-semibold">
                                🏦{" "}
                                <span className="underline">Bank Details</span>
                              </h1>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Bank Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.bankName || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Branch Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.branchName || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">City</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.city || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">
                                    Business Vertical
                                  </h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.businessVertical || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">GST No.</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.gstNumber || "N/A"}
                                </div>
                              </div>
                            </div>

                            {/* Right Column - Contact Person */}
                            <div className="flex flex-col gap-0.5">
                              <h1 className="uppercase font-semibold">
                                📞{" "}
                                <span className="underline">
                                  Contact Person
                                </span>
                              </h1>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.contactPerson?.name || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Email</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.contactPerson?.email || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Phone</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.contactPerson?.mobileNumber || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Designation</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.contactPerson?.designation || "N/A"}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Relationship Managers */}
                          <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            {/* Left Column */}
                            <div className="flex flex-col gap-0.5">
                              <h1 className="uppercase font-semibold">
                                👨‍💼{" "}
                                <span className="underline">
                                  Relationship Manager 1
                                </span>
                              </h1>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.managerRelationshipOne?.name || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Email</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.managerRelationshipOne?.email || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Phone</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.managerRelationshipOne?.mobileNumber ||
                                    "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Designation</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.managerRelationshipOne?.designation ||
                                    "N/A"}
                                </div>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-0.5">
                              <h1 className="uppercase font-semibold">
                                👨‍💼
                                <span className="underline">
                                  Relationship Manager 2
                                </span>
                              </h1>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.managerRelationshipTwo?.name || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Email</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.managerRelationshipTwo?.email || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Phone</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.managerRelationshipTwo?.mobileNumber ||
                                    "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Designation</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[70%]">
                                  {row?.managerRelationshipTwo?.designation ||
                                    "N/A"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-10 text-center text-gray-400 text-lg"
                  >
                    No Banks Found !
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalData={totalBank}
          limit={limit}
          handleLimit={handleLimit}
          handleCurrentPageState={handleCurrentPageState}
        />

        {bankUpdate && (
          <div
            id="authentication-modal"
            aria-hidden="true"
            onClick={() => setBankUpdate(false)}
            className={`${
              bankUpdate ? "flex" : "hidden"
            } fixed inset-0 z-50 justify-center items-center backdrop-blur-sm w-[100%]`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative  max-w-md px-0 h-full md:h-auto !w-[100%]"
            >
              <div className="rounded-lg shadow relative bg-gray-100 dark:bg-gray-700">
                <div className="flex justify-between items-center p-4">
                  <div></div>
                  <div>
                    <h1 className="text-xl font-medium text-[#073d4fff]">
                      Update Bank
                    </h1>
                  </div>
                  <button
                    type="button"
                    className="text-black hover:text-red-600 hover:bg-gray-400 hover:rounded-full p-1"
                    onClick={() => setBankUpdate(false)}
                  >
                    <IoCloseCircleOutline className="text-2xl font-semibold" />
                  </button>
                </div>
                <form
                  className="bg-gray-200 border rounded-lg p-3 flex flex-col gap-5"
                  onSubmit={handleUpdateBankFunc}
                >
                  <div className=" border rounded-lg p-6 flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="bankName"
                        className="block text-gray-700 text-sm font-medium"
                      >
                        Bank Name
                      </label>
                      <input
                        type="text"
                        id="bankName"
                        name="bankName"
                        value={bankUpdateData.bankName}
                        onChange={handleChangeBankData}
                        className="bg-gray-200 border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400 cursor-not-allowed text-gray-400"
                        required
                        disabled
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="branchName"
                        className="block text-gray-700 font-medium text-sm"
                      >
                        Branch Name
                      </label>
                      <input
                        type="text"
                        id="branchName"
                        name="branchName"
                        value={bankUpdateData.branchName}
                        onChange={handleChangeBankData}
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="IFSC"
                        className="block text-gray-700 font-medium text-sm"
                      >
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        id="IFSC"
                        name="IFSC"
                        value={bankUpdateData.IFSC}
                        onChange={handleChangeBankData}
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>

                    <div className="flex justify-center">
                      <div className="flex gap-4">
                        <div>
                          <button
                            onClick={() => setBankUpdate(false)}
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                          >
                            Close
                          </button>
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBank;
