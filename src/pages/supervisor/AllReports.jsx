import React, { useEffect, useState } from "react";
import { TbListDetails } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getSupervisorData } from "../../redux/supervisor/supervisorAction";
import { highlightMatch } from "../../utils/highlightMatch";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import SearchFilterAddSection from "../../components/SearchFilterAddSection";

const AllReports = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store?.authReducer);
  const {
    isLoading: isLoadingSupervisor,
    isError: isErrorSupervisor,
    data: isSupervisorData,
  } = useSelector((store) => store.supervisorReducer);
  // console.log("supervisorData==>", isSupervisorData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    verifiedByFieldExecutive: "",
  });
  console.log("filters.status", filters?.status);
  console.log(
    "filters.verifiedByFieldExecutive",
    filters?.verifiedByFieldExecutive
  );
  const [limit, setLimit] = useState(10);
  const [currentPageState, setCurrentPageState] = useState(
    isSupervisorData?.pagination?.currentPage
  );

  useEffect(() => {
    dispatch(
      getSupervisorData(
        accessToken,
        `limit=${limit}&page=${currentPageState}&search=${searchQuery}&status=${filters.status}&verifiedByFieldExecutive=${filters.verifiedByFieldExecutive}`
      )
    );
  }, [
    limit,
    currentPageState,
    searchQuery,
    filters.status,
    filters.verifiedByFieldExecutive,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({ status: "", verifiedByFieldExecutive: "" });

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = ""; // Reset input value
  };

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
    // {
    //   name: "district",
    //   value: filters.district,
    //   placeholder: "Filter by District",
    //   options: [
    //     ...(filters.state && locationData?.data?.districts
    //       ? locationData?.data?.districts.map((dist) => ({
    //           label: dist?.name,
    //           value: dist?._id,
    //         }))
    //       : []),
    //   ],
    // },
    // {
    //   name: "zone",
    //   value: filters.zone,
    //   placeholder: "Filter by Zone",
    //   options: [
    //     ...(filters.state && filters?.district && locationData?.data?.zones
    //       ? locationData?.data?.zones.map((zone) => ({
    //           label: zone?.name,
    //           value: zone?._id,
    //         }))
    //       : []),
    //   ],
    // },
  ];
  const handleLimit = (val) => {
    setLimit(val);
    setCurrentPageState(1);
  };
  const handleCurrentPageState = (val) => {
    setCurrentPageState((prev) => prev + val);
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
            !searchQuery && !filters.status && !filters.verifiedByFieldExecutive
          }
          enableReset={
            searchQuery || filters.status || filters.verifiedByFieldExecutive
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
                <th className="w-1/5 py-2 px-6 text-left text-xs">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoadingSupervisor ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-10 text-center text-gray-400 text-lg"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                    </div>{" "}
                  </td>
                </tr>
              ) : isSupervisorData?.cases?.length > 0 ? (
                isSupervisorData?.cases?.map((row, i) => (
                  <tr
                    key={row?._id}
                    className="hover:bg-gray-100 cursor-pointer hover:shadow-md border-b border-gray-200 truncate text-sm"
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
                      {row?.verifiedBy?.fieldExecutive === true ? (
                        <Link
                          to={`/supervisor/reportDetails?caseId=${row?._id}`}
                        >
                          <div className="rounded-sm bg-[#66d0b4] px-3 py-2 hover:bg-[#208369] hover:text-white shadow-sm shadow-[#073b4c]">
                            <button>Compare</button>
                          </div>
                        </Link>
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
                    colSpan="6"
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
          currentPage={isSupervisorData?.pagination?.currentPage}
          totalPages={isSupervisorData?.pagination?.totalPages}
          totalData={isSupervisorData?.pagination?.totalCases}
          limit={limit}
          handleLimit={handleLimit}
          handleCurrentPageState={handleCurrentPageState}
        />
      </div>
    </div>
  );
};

export default AllReports;
