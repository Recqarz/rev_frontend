import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllCaseData } from "../../redux/case/caseAction";
import { MdKeyboardArrowRight, MdOutlineEdit } from "react-icons/md";
import { debounce } from "../../utils/halper";
import Pagination from "../../components/Pagination";
import SearchFilterAddSection from "../../components/SearchFilterAddSection";
import { highlightMatch } from "../../utils/highlightMatch";

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
  const [filters, setFilters] = useState({
    status: "",
    zone: "",
  });
  const [limit, setLimit] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    dispatch(
      getAllCaseData(
        `limit=${limit}&page=${currentPageState}&search=${searchQuery}&status=${filters.status}&zone=${filters.zone}`,
        accessToken
      )
    );
  }, [limit, currentPageState, searchQuery, filters.status, filters.zone]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({ status: "", zone: "" });
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const filterOptions = [
    {
      name: "zone",
      value: filters.zone,
      placeholder: "Filter by Zone",
      options: [
        { label: "East", value: "east" },
        { label: "West", value: "west" },
        { label: "North", value: "north" },
        { label: "South", value: "south" },
      ],
    },
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
  ];

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

  // Highlight matching text function

  return (
    <div className="w-full">
      <div className=" flex flex-col gap-5">
        {/* Search, Filter Section & add section*/}
        <SearchFilterAddSection
          setSearchQuery={setSearchQuery}
          setCurrentPageState={setCurrentPageState}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
          disabledReset={!searchQuery && !filters.zone && !filters.status}
          enableReset={searchQuery || filters.zone || filters.status}
          goToPageLink={"/coordinator/all/cases/add"}
          addBtnEnable={role === "coordinator" ? true : false}
        />

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
                  <tr
                    className="hover:bg-gray-200 cursor-pointer hover:shadow-md text-sm"
                    onClick={() => toggleDetails(index)}
                  >
                    <td className="py-3 px-6 border-b border-gray-200">
                      {row?.caseCode}
                    </td>

                    <td className="py-3 px-6 border-b border-gray-200">
                      {highlightMatch(row?.clientName, searchQuery)}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200 truncate">
                      {highlightMatch(row?.BOV_ReportNo, searchQuery)}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200">
                      {highlightMatch(row?.bankRefNo, searchQuery)}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200">
                      {highlightMatch(row?.bankId?.bankName, searchQuery)}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200">
                      {highlightMatch(row?.bankId?.branchName, searchQuery)}
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
                          // onClick={() => toggleDetails(index)} // Toggle the details panel
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

        {/* Pagination Section */}
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
