import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllCaseData } from "../../redux/case/caseAction";
import { MdKeyboardArrowRight, MdOutlineEdit } from "react-icons/md";
import { debounce } from "../../utils/halper";
import Pagination from "../../components/Pagination";
import SearchFilterAddSection from "../../components/SearchFilterAddSection";
import { highlightMatch } from "../../utils/highlightMatch";
import {
  formattedDate,
  formatToDDMMYYYY,
  formatToYYYYMMDD,
} from "../../utils/formattedDate";
import {
  getAllDistricts,
  getAllStates,
  getAllZones,
} from "../../redux/location/locationAction";

const AllCases = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((store) => store?.authReducer);
  const { accessToken } = useSelector((store) => store?.authReducer);
  const {
    isLoading: isLoadingCases,
    isError,
    data,
  } = useSelector((state) => state.caseReducer);
  // console.log("isLoading cases:==>", isLoadingCases);
  const { message, totalPages, currentPage, totalCase, cases } = data;
  // const currentPage = 1;
  const [currentPageState, setCurrentPageState] = useState(
    currentPage === null ? 1 : currentPage
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    state: "",
    district: "",
    zone: "",
  });
  const [limit, setLimit] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);
  const locationData = useSelector((store) => store.locationReducer);

  const fetchData = useCallback(() => {
    dispatch(getAllStates(accessToken));
    dispatch(
      getAllCaseData(
        `limit=${limit}&page=${currentPageState}&search=${searchQuery}&status=${filters.status}&state=${filters.state}&district=${filters.district}&zone=${filters.zone}`,
        accessToken
      )
    );
  }, [accessToken, dispatch, limit, currentPageState, searchQuery, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({ status: "", state: "", district: "", zone: "" });

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = ""; // Reset input value
  };

  const changeState = (stateId) => {
    stateId && dispatch(getAllDistricts(stateId, accessToken));
  };

  const changeDistrict = (distId) => {
    // console.log(distId);
    distId && dispatch(getAllZones(distId, accessToken));
  };
  const handleFilterChange = useCallback((filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
      ...(filterName === "state" ? { district: "", zone: "" } : {}), // Reset district & zone while switching to state repeatedly
      ...(filterName === "district" ? { zone: "" } : {}), // Reset zone while switching to district repeatedly
    }));
    if (filterName === "state") {
      changeState(value);
    }
    if (filterName === "district") {
      changeDistrict(value);
    }
  }, []);

  const filterOptions = useMemo(
    () => [
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
        name: "state",
        value: filters.state,
        placeholder: "Filter by State",
        options:
          locationData?.data?.states?.map((state) => ({
            label: state.name,
            value: state._id,
          })) || [],
      },
      {
        name: "district",
        value: filters.district,
        placeholder: "Filter by District",
        options:
          filters.state && locationData?.data?.districts
            ? locationData.data.districts.map((dist) => ({
                label: dist.name,
                value: dist._id,
              }))
            : [],
      },
      {
        name: "zone",
        value: filters.zone,
        placeholder: "Filter by Zone",
        options:
          filters.state && filters.district && locationData?.data?.zones
            ? locationData.data.zones.map((zone) => ({
                label: zone.name,
                value: zone._id,
              }))
            : [],
      },
    ],
    [filters, locationData]
  );

  const handleLimit = useCallback((val) => {
    setLimit(val);
    setCurrentPageState(1);
  }, []);

  const handleCurrentPageState = useCallback((val) => {
    setCurrentPageState((prev) => prev + val);
  }, []);

  const toggleDetails = useCallback((index) => {
    setExpandedRow((prev) => (prev === index ? null : index)); // Toggle row expansion
  }, []);

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
          disabledReset={
            !searchQuery &&
            !filters.status &&
            !filters.state &&
            !filters.district &&
            !filters.zone
          }
          enableReset={
            searchQuery ||
            filters.status ||
            filters.state ||
            filters.district ||
            filters.zone
          }
          goToPageLink={`/${role}/all/cases/add`} // new form page link
          addBtnEnable={true}
          // addBtnEnable={role === "coordinator" ? true : false} // new form page link for btn enable/disable
        />

        {/* Table Section */}
        <div className="shadow-lg rounded-lg overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#073c4e] text-white text-xs text-left">
                <th className=" py-2 px-2">Case Code</th>
                <th className=" py-2 px-2">Client Name</th>
                <th className=" py-2 px-2">Bank Name</th>
                <th className=" py-2 px-2">Branch Name</th>
                <th className=" py-2 px-2">Field Executive</th>
                <th className=" py-2 px-2">Status</th>
                <th className=" py-2 px-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {isLoadingCases ? (
                <tr>
                  <td
                    colSpan="8"
                    className="py-10 text-center text-gray-400 text-lg"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                    </div>{" "}
                  </td>
                </tr>
              ) : cases && cases?.length > 0 ? (
                cases?.map((row, index) => (
                  <React.Fragment key={index}>
                    {/* Main Row */}
                    <tr
                      className="hover:bg-gray-200 cursor-pointer hover:shadow-md text-sm"
                      // onClick={() => toggleDetails(index)}
                    >
                      <td className="py-2 px-2 border-b border-gray-200">
                        {highlightMatch(row?.caseCode, searchQuery)}
                      </td>

                      <td className="py-2 px-2 border-b border-gray-200">
                        <div className="truncate w-[7rem] overflow-hidden">
                          {highlightMatch(row?.clientName, searchQuery)}
                        </div>
                      </td>
                      {/* <td className="py-2 px-2 border-b border-gray-200">
                        <div className="truncate w-[12rem] overflow-hidden">
                          {highlightMatch(`${row?.BOV_ReportNo}`, searchQuery)}
                        </div>
                      </td>
                      <td className="py-2 px-2 border-b border-gray-200">
                        {highlightMatch(row?.bankRefNo || "N/A", searchQuery)}
                      </td> */}

                      <td className="py-2 px-2 border-b border-gray-200">
                        {highlightMatch(row?.bankId?.bankName, searchQuery)}
                      </td>
                      <td className="py-2 px-2 border-b border-gray-200">
                        {highlightMatch(row?.bankId?.branchName, searchQuery)}
                      </td>
                      <td className="py-2 px-2 border-b border-gray-200">
                        <div className="truncate w-[7rem] overflow-hidden">
                          {highlightMatch(
                            `${row?.fieldExecutiveId?.firstName} ${row?.fieldExecutiveId?.lastName}` ||
                              "N/A",
                            searchQuery
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-2 border-b border-gray-200">
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
                        className={`py-2 px-2 border-b border-gray-200 hover:bg-blue-50 ${
                          expandedRow === index ? "bg-blue-50" : ""
                        }`}
                        onClick={() => toggleDetails(index)}
                      >
                        <div className="flex gap-2 items-center">
                          {((role && role === "coordinator") ||
                            role === "admin") && (
                            <Link
                              to={`/${role}/all/case/update?caseId=${row?._id}`}
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
                    {/* Details Row*/}
                    {expandedRow === index && (
                      <tr className="bg-blue-50">
                        <td
                          colSpan={8}
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
                                <span className="underline">
                                  Case Bank Details
                                </span>
                              </h1>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Bank Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.bankId?.bankName || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Branch Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.bankId?.branchName || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">
                                    Bank Ref No.
                                  </h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.bankRefNo || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">
                                    BOV_Report No.
                                  </h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.BOV_ReportNo || "N/A"}
                                </div>
                              </div>
                            </div>

                            {/* Right Column - Contact Person */}
                            <div className="flex flex-col gap-0.5">
                              <h1 className="uppercase font-semibold">
                                📞{" "}
                                <span className="underline">
                                  Case Assigned To Field Executive
                                </span>
                              </h1>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {`${row?.fieldExecutiveId?.firstName} ${row?.fieldExecutiveId?.lastName}` ||
                                    "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Email</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.fieldExecutiveId?.email || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Phone</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.fieldExecutiveId?.mobile || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">User Code</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.fieldExecutiveId?.userCode || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Visit Date</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {formatToDDMMYYYY(row?.visitDate)} {""}
                                  {"(dd/mm/yyyy)"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Case Status</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  <div
                                    className={`w-[30%] pt-0.5 pb-1 text-center rounded-md text-white ${
                                      row.status === "pending"
                                        ? "bg-orange-500"
                                        : row.status === "process"
                                        ? "bg-blue-500"
                                        : row.status === "completed"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    }`}
                                  >
                                    {row?.status}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Client Address */}
                          <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-5">
                            {/* Left Column */}
                            <div className="flex flex-col gap-0.5">
                              <h1 className="uppercase font-semibold">
                                👨‍💼{" "}
                                <span className="underline">
                                  Case Client Address
                                </span>
                              </h1>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.clientName || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Phone</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.contactNo || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">
                                    Address Line1
                                  </h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.clientAddress?.addressLine1 || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">
                                    Address Line2
                                  </h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.clientAddress?.addressLine2 || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Plot Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.clientAddress?.plotNumber || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">
                                    Sector/Street Name
                                  </h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.clientAddress?.streetName || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Land Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.clientAddress?.landMark || "N/A"}
                                </div>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-0.5">
                              <h1 className="uppercase font-semibold">
                                👨‍💼
                                <span className="underline">
                                  Case Client Geo Location
                                </span>
                              </h1>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">
                                    Geo Location
                                  </h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.clientGeoFormattedAddress || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">State</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.state || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">District</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.district || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Zone</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.zone || "N/A"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full font-normal">
                                <div className="flex justify-between w-[30%]">
                                  <h1 className="font-semibold">Pin Code</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex w-[70%]">
                                  {row?.clientAddress?.pincode || "N/A"}
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
                    colSpan="8"
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
