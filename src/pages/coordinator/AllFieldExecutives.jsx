import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCaseData } from "../../redux/case/caseAction";
import { MdKeyboardArrowRight, MdOutlineEdit } from "react-icons/md";
import { debounce } from "../../utils/halper";
import Pagination from "../../components/Pagination";
import { getAllFieldExecutiveData } from "../../redux/fieldExecutive/fieldExecutiveAction";
import SearchFilterAddSection from "../../components/SearchFilterAddSection";
import { highlightMatch } from "../../utils/highlightMatch";

const AllFieldExecutives = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector(
    (state) => state.allFieldExecutiveReducer
  );
  const { message, currentPage, totalPages, totalUser, fieldExecutives } = data;
  console.log("fieldExecutives==>", fieldExecutives);
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
  });
  const [limit, setLimit] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleSearch = (val) => {
    setSearchQuery(val);
    // setCurrentPageState(1)
  };

  useEffect(() => {
    dispatch(
      getAllFieldExecutiveData(
        `limit=${limit}&page=${currentPageState}&search=${searchQuery}&status=${filters.status}`
      )
    );
  }, [limit, currentPageState, searchQuery, filters.status]);

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
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };
  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({ status: "" });
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
      <div className="flex flex-col gap-5">
        <SearchFilterAddSection
          setSearchQuery={setSearchQuery}
          setCurrentPageState={setCurrentPageState}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
          disabledReset={!searchQuery && !filters.status}
          enableReset={searchQuery || filters.status}
          goToPageLink={"/coordinator/all/fieldexecutives"}
          addBtnEnable={true}
        />

        {/* Table Section */}
        <div className="shadow-lg rounded-lg overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#073c4e] text-white text-sm">
                <th className="w-1/7 py-2 px-6 text-left text-xs">User Code</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">Name</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">Email</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">Mobile</th>

                <th className="w-1/4 py-2 px-6 text-left text-xs">Status</th>

                <th className="w-1/4 py-2 px-6 text-left text-xs">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {fieldExecutives?.map((row, index) => (
                <React.Fragment key={index}>
                  <tr
                    key={index}
                    onClick={() => toggleDetails(index)} // Toggle the details panel
                    className="hover:bg-gray-100 cursor-pointer hover:shadow-md text-sm"
                  >
                    <td className="py-3 px-6 border-b border-gray-200">
                      {highlightMatch(row?.userCode, searchQuery)}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200">
                      {highlightMatch(row?.firstName, searchQuery)}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200 truncate">
                      {highlightMatch(row?.email, searchQuery)}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200">
                      {highlightMatch(row?.mobile, searchQuery)}
                    </td>

                    <td className="py-3 px-6 border-b border-gray-200">
                      <span
                        className={`text-white py-1 px-2 rounded-full text-xs 
                      ${row.isActive === true ? "bg-green-500" : "bg-red-500"}
                      `}
                      >
                        {row.isActive === true ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td
                      className={`py-3 px-6 border-b border-gray-200 hover:bg-blue-50 ${
                        expandedRow === index ? "bg-blue-50" : ""
                      }`}
                    >
                      <div
                        className=" flex gap-2 items-center"
                        // onClick={() => handleEditUser(row)}
                      >
                        <div className="text-2xl p-1 text-[#3fb597] rounded-full hover:bg-gray-300">
                          <MdOutlineEdit />
                        </div>
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

                  {expandedRow === index && (
                    <tr className="bg-blue-50 text-sm">
                      <td colSpan={8} className="p-4 border-b border-gray-200">
                        <h1 className="uppercase font-semibold mb-1">
                          Field Executive:
                        </h1>
                        <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">Address Line1 :</div>
                              <div className="w-[70%]">a</div>
                            </div>
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">Address Line2 :</div>
                              <div className="w-[70%]">b</div>
                            </div>
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">Land Mark :</div>
                              <div className="w-[70%]">c</div>
                            </div>
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">Plot No. :</div>
                              <div className="w-[70%]">d</div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">Street Name :</div>
                              <div className="w-[70%]">e</div>
                            </div>
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">State :</div>
                              <div className="w-[70%]">5</div>
                            </div>
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">City :</div>
                              <div className="w-[70%]">6</div>
                            </div>
                            <div className="flex w-full font-normal">
                              <div className="w-[30%]">Pin code :</div>
                              <div className="w-[70%]">7</div>
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
          totalData={totalUser}
          limit={limit}
          handleLimit={handleLimit}
          handleCurrentPageState={handleCurrentPageState}
        />
      </div>
    </div>
  );
};

export default AllFieldExecutives;
