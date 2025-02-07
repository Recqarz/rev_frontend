import React, { useEffect, useState } from "react";
// import '../index.css'
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
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
  const [bankUpdate, setBankUpdate] = useState(false);
  const [bankUpdateData, setBankUpdateData] = useState({
    bankName: "",
    branchName: "",
    IFSC: "",
  });
  const accessToken = useSelector((store) => store.authReducer.accessToken);

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
          setCurrentPageState={setCurrentPageState}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
          disabledReset={!searchQuery}
          enableReset={searchQuery}
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
              {banks && banks?.length > 0 ? (
                banks?.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 cursor-pointer hover:shadow-md"
                  >
                    <td className="py-3 px-6 border-b border-gray-200 truncate text-sm">
                      {index + 1}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200 truncate text-sm">
                      {highlightMatch(row?.bankName, searchQuery)}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200 text-sm truncate">
                      {highlightMatch(row?.branchName, searchQuery)}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200 truncate text-sm">
                      {highlightMatch(row?.IFSC, searchQuery)}
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
                    <div className="flex flex-col gap-1">
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
                        className="bg-gray-200 border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400 cursor-not-allowed text-gray-400"
                        required
                        disabled
                      />
                    </div>

                    <div className="flex flex-col gap-1">
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
                        className="border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1">
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
                        className="border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400"
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
