import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllCaseData } from "../../redux/case/caseAction";
import { MdKeyboardArrowRight, MdOutlineEdit } from "react-icons/md";
import { debounce } from "../../utils/halper";
import Pagination from "../../components/Pagination";

const AllCases = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((store) => store?.authReducer);
  const { accessToken } = useSelector((store) => store?.authReducer);
  const { isLoading, isError, data } = useSelector(
    (state) => state.caseReducer
  );
  const { message, currentPage, totalPages, totalCase, cases } = data;
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterZone, setFilterZone] = useState("");
  const [limit, setLimit] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleSearch = (val) => {
    setSearchQuery(val);
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  const handleSearchInput = (e) => {
    debouncedHandleSearch(e.target.value);
  };
  useEffect(() => {
    dispatch(
      getAllCaseData(
        `limit=${limit}&page=${currentPageState}&search=${searchQuery}&status=${filterStatus}&zone=${filterZone}`,
        accessToken
      )
    );
  }, [limit, currentPageState, searchQuery, filterStatus, filterZone]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterZone("");
    setFilterStatus("");
  };

  const handleLimit = (val) => {
    setLimit(val);
    setCurrentPageState(1);
  };

  const handleCurrentPageState = (val) => {
    setCurrentPageState((prev) => prev + val);
  };

  const toggleDetails = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index)); // Toggle row expansion
  };

  return (
    <div className="w-full">
      <div className=" flex flex-col gap-5">
        {/* all Search & Filter Section */}
        <div className="w-full flex gap-3 flex-col-reverse lg:flex-row lg:justify-between lg:gap-4">
          <div className="flex lg:gap-5 flex-wrap md:!flex-wrap gap-4 lg:justify-normal">
            {/* Search Bar */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 top-1 flex items-center text-gray-400 text-md">
                <IoMdSearch />
              </span>
              <input
                onChange={handleSearchInput}
                type="text"
                placeholder="Search here . . ."
                className="pl-7 md:px-10 py-2 w-64 border rounded-lg text-sm focus:ring-cyan-600 focus:border-cyan-600"
              />
            </div>

            {/* Filter Role Dropdown */}
            <select
              className="px-4 py-2 border rounded-lg text-sm bg-white focus:ring-cyan-600 focus:border-cyan-600"
              value={filterZone}
              onChange={(e) => setFilterZone(e.target.value)}
            >
              <option value="">Filter by Zone</option>
              <option value="east">East</option>
              <option value="west">West</option>
              <option value="north">North</option>
              <option value="south">South</option>{" "}
            </select>

            {/* Filter Status Dropdown */}
            <select
              className="px-4 py-2 border rounded-lg text-sm bg-white focus:ring-cyan-600 focus:border-cyan-600"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Filter by Status</option>
              <option value="process">Process</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* Reset All Filter */}
            <button
              onClick={handleResetFilters}
              disabled={!searchQuery && !filterStatus && !filterZone} // Disable button if no filters are applied
              className={`px-6 py-2 text-sm rounded-lg font-medium ${
                searchQuery || filterStatus || filterZone
                  ? "bg-red-400 text-white hover:bg-red-500"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Reset
            </button>
          </div>

          {/* Add Case Section only access to coordinator */}
          {role && role === "coordinator" ? (
            <div className="flex justify-end lg:justify-normal">
              <Link to="/coordinator/all/cases/add">
                <div className="rounded-md px-6 bg-[#073c4e] py-2 text-white font-semibold">
                  ADD
                </div>
              </Link>
            </div>
          ) : null}
        </div>

        {/* Table Section */}
        <div className="shadow-lg rounded-lg overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#073c4e] text-white text-sm">
                <th className="w-1/7 py-2 px-6 text-left text-xs">Case Code</th>

                <th className="w-1/4 py-2 px-6 text-left text-xs">
                  Client Name
                </th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">
                  BOV Report No.
                </th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">
                  Bank Ref No.
                </th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">Bank Name</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">
                  Branch Name
                </th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">Status</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {cases?.map((row, index) => (
                <React.Fragment key={index}>
                  {/* Main Row */}
                  <tr className="hover:bg-gray-100 cursor-pointer hover:shadow-md text-sm">
                    <td className="py-3 px-6 border-b border-gray-200">
                      {row?.caseCode}
                    </td>

                    <td className="py-3 px-6 border-b border-gray-200">
                      {row?.clientName}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200 truncate">
                      {row?.BOV_ReportNo}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200">
                      {row?.bankRefNo}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200">
                      {row?.bankId?.bankName}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200">
                      {row?.bankId?.branchName}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200">
                      <span
                        className={`text-white py-1 px-2 rounded-full text-xs 
                      ${
                        row.status === "pending"
                          ? "bg-orange-500"
                          : row.status === "process"
                          ? "bg-blue-500"
                          : row.status === "completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }
                      `}
                      >
                        {row.status === "pending"
                          ? "Pending"
                          : row.status === "process"
                          ? "Process"
                          : row.status === "completed"
                          ? "Completed"
                          : "Rejected"}
                      </span>
                    </td>
                    <td
                      className={`py-3 px-6 border-b border-gray-200 hover:bg-blue-50 ${
                        expandedRow === index ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex gap-2 items-center">
                        {role && role === "coordinator" && (
                          <Link
                            to={`/coordinator/all/cases/add?caseId=${row?._id}`}
                          >
                            <div className="text-2xl p-1 text-[#3fb597] rounded-full hover:bg-gray-300">
                              <MdOutlineEdit />
                            </div>
                          </Link>
                        )}
                        <div
                          className="text-2xl p-1 text-[#3fb597] rounded-full hover:bg-gray-300"
                          onClick={() => toggleDetails(index)} // Toggle the details panel
                        >
                          <MdKeyboardArrowRight
                            className={`transform transition-transform duration-300 ease-in-out ${
                              expandedRow === index ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Details Row */}
                  {expandedRow === index && (
                    <tr className="bg-blue-50">
                      <td colSpan={8} className="p-4 border-b border-gray-200">
                        <h1 className="uppercase font-semibold mb-1">
                          Client Address:
                        </h1>
                        <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">Address Line1 :</div>
                              <div className="w-[70%]">
                                {row?.clientAddress?.addressLine1}
                              </div>
                            </div>
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">Address Line2 :</div>
                              <div className="w-[70%]">
                                {row?.clientAddress?.addressLine2}
                              </div>
                            </div>
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">Land Mark :</div>
                              <div className="w-[70%]">
                                {row?.clientAddress?.landMark}
                              </div>
                            </div>
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">Plot No. :</div>
                              <div className="w-[70%]">
                                {row?.clientAddress?.plotNumber}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">Street Name :</div>
                              <div className="w-[70%]">
                                {row?.clientAddress?.streetName}
                              </div>
                            </div>
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">State :</div>
                              <div className="w-[70%]">
                                {row?.clientAddress?.state}
                              </div>
                            </div>
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">City :</div>
                              <div className="w-[70%]">
                                {row?.clientAddress?.city}
                              </div>
                            </div>
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">Pin code :</div>
                              <div className="w-[70%]">
                                {row?.clientAddress?.pincode}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalData={totalCase}
          limit={limit}
          handleLimit={handleLimit}
          handleCurrentPageState={handleCurrentPageState}
        />
      </div>
    </div>
  );
};

export default AllCases;
