import React, { useEffect, useState } from "react";
// import '../index.css'
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bankDataUpdate, getAllBankData } from "../redux/banks/bankAction";
import { IoMdSearch } from "react-icons/io";
import Pagination from "./Pagination";
import { debounce } from "../utils/halper";
import SearchFilterAddSection from "./SearchFilterAddSection";

const BankTable = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector(
    (state) => state.allBankReducer
  );
  const { message, currentPage, totalPages, totalBank, banks } = data;
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [limit, setLimit] = useState(10);
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const [debouncedFilters, setDebouncedFilters] = useState({
    search: "",
  });
  const [bankId, setBankId] = useState("");
  const [updateBankDataStatus, setupdateBankDataStatus] = useState(false);
  const [bankUpdateData, setBankUpdateData] = useState({
    bankName: "",
    branchName: "",
    IFSC: "",
  });
  const accessToken = useSelector((store) => store.authReducer.accessToken);

  const handleSearch = (val) => {
    setSearchQuery(val);
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  const handleSearchInput = (e) => {
    debouncedHandleSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(
      getAllBankData(
        `limit=${limit}&page=${currentPageState}&search=${searchQuery}`
      )
    );
  }, [limit, currentPageState, searchQuery]);

  const filterOptions = [];
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleUpdateStatusFunc = (item) => {
    setBankId(item._id);
    setupdateBankDataStatus(true);
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
    setupdateBankDataStatus(false);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
  };

  const handleLimit = (val) => {
    setLimit(val);
  };

  const handleCurrentPageState = (val) => {
    setCurrentPageState((prev) => prev + val);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-5 w-[100%]">
        {/* Search, Filter Section & add section*/}
        <SearchFilterAddSection
          setSearchQuery={setSearchQuery}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
          disabledReset={!searchQuery && !filters.zone && !filters.status}
          enableReset={searchQuery || filters.zone || filters.status}
          goToPageLink={"/admin/dashboard/all/banks/add"}
          addBtnEnable={true}
        />
        {/* Table section */}
        <div className="shadow-lg rounded-lg overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#073c4e] text-white">
                <th className="w-1/6 py-2 px-6 text-left text-xs">Sl No.</th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">Bank Name</th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">
                  Branch Name
                </th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">IFSC Code</th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {(banks ?? [])?.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer hover:shadow-md"
                >
                  <td className="py-3 px-6 border-b border-gray-200 truncate text-sm">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 truncate text-sm">
                    {row?.bankName}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-sm truncate">
                    {row?.branchName}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 truncate text-sm">
                    {row?.IFSC}
                  </td>

                  <td className="py-3 px-6 border-b border-gray-200 hover:bg-blue-50 flex gap-2">
                    <div
                      className="rounded-full hover:bg-gray-300 py-1 px-1"
                      onClick={() => handleUpdateStatusFunc(row)}
                    >
                      <MdOutlineEdit className="text-xl text-[#3fb597]" />
                    </div>
                  </td>
                </tr>
              ))}
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

        {updateBankDataStatus && (
          <div
            id="authentication-modal"
            aria-hidden="true"
            className={`${
              updateBankDataStatus ? "flex" : "hidden"
            } overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center backdrop-blur-sm`}
          >
            <div className="relative w-full max-w-md px-0 h-full md:h-auto">
              <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                <div className="flex justify-end p-0">
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={() => setupdateBankDataStatus(false)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <form
                  className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8 overflow-y-auto max-h-[80vh]"
                  onSubmit={handleUpdateBankFunc}
                >
                  <h5 className="text-xl font-medium mb-4">
                    Update The Bank Data
                  </h5>
                  <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl">
                    <div className="mb-4">
                      <label
                        htmlFor="bankName"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        Bank Name
                      </label>
                      <input
                        type="text"
                        id="bankName"
                        name="bankName"
                        value={bankUpdateData.bankName}
                        onChange={handleChangeBankData}
                        className="bg-gray-200 border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400 cursor-not-allowed text-gray-400"
                        required
                        disabled
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="branchName"
                        className="block text-gray-700 font-medium text-sm mb-2"
                      >
                        Branch Name
                      </label>
                      <input
                        type="text"
                        id="branchName"
                        name="branchName"
                        value={bankUpdateData.branchName}
                        onChange={handleChangeBankData}
                        className="border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="IFSC"
                        className="block text-gray-700 font-medium text-sm mb-2"
                      >
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        id="IFSC"
                        name="IFSC"
                        value={bankUpdateData.IFSC}
                        onChange={handleChangeBankData}
                        className="border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Update
                      </button>
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

export default BankTable;
