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
import { formattedDate } from "../../utils/formattedDate";
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
  const { message, currentPage, totalPages, totalCase, cases } = data;
  const [currentPageState, setCurrentPageState] = useState(currentPage);
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

  useEffect(() => {
    dispatch(getAllStates(accessToken));
    dispatch(
      getAllCaseData(
        `limit=${limit}&page=${currentPageState}&search=${searchQuery}&status=${filters.status}&state=${filters.state}&district=${filters.district}&zone=${filters.zone}`,
        accessToken
      )
    );
  }, [
    accessToken,
    dispatch,
    limit,
    currentPageState,
    searchQuery,
    filters.status,
    filters.zone,
    filters.state,
    filters.district,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({ status: "", state: "", district: "", zone: "" });
  };

  const changeState = (stateId) => {
    stateId && dispatch(getAllDistricts(stateId, accessToken));
  };

  const changeDistrict = (distId) => {
    // console.log(distId);
    distId && dispatch(getAllZones(distId, accessToken));
  };
  const handleFilterChange = (filterName, value) => {
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
      name: "state",
      value: filters.state,
      placeholder: "Filter by State",
      options: [
        ...(locationData?.data?.states ?? [])?.map((state) => ({
          label: state?.name,
          value: state?._id,
        })),
      ],
    },
    {
      name: "district",
      value: filters.district,
      placeholder: "Filter by District",
      options: [
        ...(filters.state && locationData?.data?.districts
          ? locationData?.data?.districts.map((dist) => ({
              label: dist?.name,
              value: dist?._id,
            }))
          : []),
      ],
    },
    {
      name: "zone",
      value: filters.zone,
      placeholder: "Filter by Zone",
      options: [
        ...(filters.state && filters?.district && locationData?.data?.zones
          ? locationData?.data?.zones.map((zone) => ({
              label: zone?.name,
              value: zone?._id,
            }))
          : []),
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
          goToPageLink={"/coordinator/all/cases/add"} // new form page link
          addBtnEnable={role === "coordinator" ? true : false} // new form page link for btn enable/disable
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
                      onClick={() => toggleDetails(index)}
                    >
                      <td className="py-3 px-6 border-b border-gray-200">
                        {highlightMatch(row?.caseCode, searchQuery)}
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
                              to={`/coordinator/all/case/update?caseId=${row?._id}`}
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
                        <td
                          colSpan={8}
                          className="p-4 border-b border-gray-200"
                        >
                          <h1 className="uppercase font-semibold mb-1">
                            Client Address:
                          </h1>
                          <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                              <div className="flex w-full font-normal">
                                <div className="w-[30%]">
                                  Field Executive visit date :
                                </div>
                                <div className="w-[70%]">
                                  {/* {formattedDate(row?.visitDate)} */}
                                  {new Date(row?.visitDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "2-digit",
                                      day: "2-digit",
                                      year: "numeric",
                                    }
                                  )}{" "}
                                  {"(MM/DD/YYYY)"}
                                </div>
                              </div>
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
                                  {row?.state?.name}
                                </div>
                              </div>
                              <div className="flex w-full font-normal">
                                <div className="w-[30%]">District :</div>
                                <div className="w-[70%]">
                                  {row?.district?.name}
                                </div>
                              </div>
                              <div className="flex w-full font-normal">
                                <div className="w-[30%]">Zone :</div>
                                <div className="w-[70%]">{row?.zone?.name}</div>
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
