import React, { useCallback, useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { debounce } from "../../../utils/halper";
import {
  getAllUserData,
  updateUserData,
} from "../../../redux/users/userAction";
import Pagination from "../../../components/Pagination";
import SearchFilterAddSection from "../../../components/SearchFilterAddSection";
import { highlightMatch } from "../../../utils/highlightMatch";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  getAllDistricts,
  getAllStates,
  getAllZones,
} from "../../../redux/location/locationAction";
import GeolocationAutoComplete from "../../../components/google-map/GeolocationAutoComplete";
import { ErrorMessage } from "formik";
const AllUser = () => {
  const dispatch = useDispatch();
  const {
    isLoading: isLoadingUser,
    isError,
    data,
  } = useSelector((state) => state.allUserReducer);
  const { message, currentPage, totalPages, totalUser, users } = data;
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userCode: "",
    mobile: "",
    role: "",
    isActive: "",
    userGeoFormattedAddress: "",
    userGeolocation: "",
  });
  const accessToken = useSelector((store) => store.authReducer.accessToken);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    role: "",
    state: "",
    district: "",
    zone: "",
  });
  const [limit, setLimit] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);
  const locationData = useSelector((store) => store.locationReducer);

  const [currentPageState, setCurrentPageState] = useState(currentPage);

  useEffect(() => {
    dispatch(getAllStates(accessToken));
    dispatch(
      getAllUserData(
        `limit=${limit}&page=${currentPageState}&search=${searchQuery}&role=${filters.role}&isActive=${filters.status}&state=${filters.state}&district=${filters.district}&zone=${filters.zone}`
      )
    );
  }, [
    limit,
    currentPageState,
    searchQuery,
    filters.role,
    filters.status,
    filters.zone,
    filters.state,
    filters.district,
  ]);

  // For Filtration
  const filterOptions = [
    {
      name: "role",
      value: filters.role,
      placeholder: "Filter by Role",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Field Executive", value: "fieldExecutive" },
        { label: "Coordinator", value: "coordinator" },
        { label: "Supervisor", value: "supervisor" },
        { label: "Auditor", value: "auditor" },
      ],
    },
    {
      name: "status",
      value: filters.status,
      placeholder: "Filter by Status",
      options: [
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
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

  const changeState = (stateId) => {
    stateId && dispatch(getAllDistricts(stateId, accessToken));
  };

  const changeDistrict = (distId) => {
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

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({ role: "", status: "", state: "", district: "", zone: "" });
  };

  // For Update Form
  const userUpdateSchema = [
    {
      key: 1,
      htmlFor: "firstName",
      label: "First Name",
      type: "text",
      id: "firstName",
      name: "firstName",
      value: userData?.firstName,
      inputClassName: "",
      required: true,
      disabled: false,
    },
    {
      key: 2,
      htmlFor: "lastName",
      label: "Last Name",
      type: "text",
      id: "lastName",
      name: "lastName",
      value: userData?.lastName,
      inputClassName: "",
      required: true,
      disabled: false,
    },
    {
      key: 3,
      htmlFor: "email",
      label: "Email",
      type: "text",
      id: "email",
      name: "email",
      value: userData?.email,
      inputClassName: "",
      required: true,
      disabled: false,
    },
    {
      key: 4,
      htmlFor: "userCode",
      label: "User Code",
      type: "text",
      id: "userCode",
      name: "userCode",
      value: userData?.userCode,
      inputClassName: "text-gray-400 !bg-gray-200 cursor-not-allowed",
      required: true,
      disabled: true,
    },
    {
      key: 5,
      htmlFor: "mobile",
      label: "Mobile",
      type: "number",
      id: "mobile",
      name: "mobile",
      value: userData?.mobile,
      inputClassName: "",
      required: true,
      disabled: false,
    },
    {
      key: 6,
      htmlFor: "role",
      label: "Role",
      type: "text",
      id: "role",
      name: "role",
      value: userData?.role,
      inputClassName: "text-gray-400 bg-gray-200 cursor-not-allowed",
      required: true,
      disabled: true,
    },
    {
      key: 7,
      htmlFor: "isActive",
      label: "Status",
      type: "select",
      id: "isActive",
      name: "isActive",
      value: userData?.isActive,
      inputClassName: "",
      required: true,
      disabled: false,
      options: [
        // { key: 0, value: "", label: "Select Status" }, //default
        { key: 1, value: true, label: "Active" },
        { key: 2, value: false, label: "Inactive" },
      ],
    },
  ];
  const handleUserRowData = (item) => {
    setChangeStatusModal(true);
    setUserId(item._id);
    setUserData({
      firstName: item?.firstName,
      lastName: item?.lastName,
      email: item?.email,
      userCode: item?.userCode,
      mobile: item?.mobile,
      role: item?.role,
      isActive: item.isActive,
      userGeoFormattedAddress: item?.userGeoFormattedAddress,
      userGeolocation: {
        longitude: item?.userGeolocation?.coordinates?.length
          ? item?.userGeolocation?.coordinates[0]
          : "",
        latitude: item?.userGeolocation?.coordinates?.length
          ? item?.userGeolocation?.coordinates[1]
          : "",
      },
    });
  };

  const handleLocationSelect = (val) => {
    setUserData((prev) => ({
      ...prev,
      userGeoFormattedAddress: val.address,
      userGeolocation: {
        longitude: val.longitude,
        latitude: val.latitude,
      },
    }));
  };

  const handleInputOnchange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: name === "isActive" ? value === "true" : value, // Update the specific field dynamically
    }));
  };

  const handleFormUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUserData(userData, accessToken, userId));
    setChangeStatusModal(false);
  };

  // For PAgination
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
    <div className="">
      <div className="flex flex-col gap-5">
        {/* Filter Section */}
        <SearchFilterAddSection
          setSearchQuery={setSearchQuery}
          setCurrentPageState={setCurrentPageState}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
          disabledReset={
            !searchQuery &&
            !filters.role &&
            !filters.status &&
            !filters.state &&
            !filters.district &&
            !filters.zone
          }
          enableReset={
            searchQuery ||
            filters.role ||
            filters.status ||
            filters.state ||
            filters.district ||
            filters.zone
          }
          goToPageLink={"/admin/dashboard/all/users/add"}
          addBtnEnable={true}
        />

        {/* Table Section */}
        <div className="shadow-lg rounded-lg overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#073c4e] text-white text-sm">
                <th className="w-1/7 py-2 px-6 text-left text-xs">ID</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">Name</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">Email</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">Mobile</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">Role</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">Status</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {isLoadingUser ? (
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
              ) : users && users?.length > 0 ? (
                users?.map((row, index) => (
                  <React.Fragment key={index}>
                    <tr
                      className={`${
                        expandedRow === index ? "bg-blue-50" : ""
                      } hover:bg-gray-100 cursor-pointer hover:shadow-md text-sm`}
                      onClick={() => toggleDetails(index)}
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
                        {highlightMatch(
                          row?.role === "admin"
                            ? "Admin"
                            : row?.role === "supervisor"
                            ? "Supervisor"
                            : row?.role === "coordinator"
                            ? "Coordinator"
                            : row?.role === "fieldExecutive"
                            ? "Field Executive"
                            : row?.role === "auditor"
                            ? "Auditor"
                            : "",
                          searchQuery
                        )}
                      </td>
                      <td className="py-3 px-6 border-b border-gray-200">
                        <span
                          className={`text-white py-1 px-2 rounded-full text-xs 
                      ${row.isActive === true ? "bg-green-500" : "bg-red-500"}
                      `}
                        >
                          {row.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="py-3 px-6 border-b border-gray-200 hover:bg-blue-50 flex gap-2">
                        <div
                          className="rounded-full hover:bg-gray-300 py-1 px-1"
                          onClick={() => handleUserRowData(row)}
                        >
                          <MdOutlineEdit className="text-xl text-[#3fb597]" />
                        </div>
                      </td>
                    </tr>

                    {expandedRow === index && (
                      <tr className="bg-blue-50">
                        <td
                          colSpan={8}
                          className="p-4 border-b border-gray-200"
                        >
                          <h1 className="uppercase font-semibold underline">
                            User Details
                          </h1>
                          <div className="w-[100%] text-sm grid grid-cols-2 gap-4 mt-4">
                            <div className="flex flex-col gap-1 ">
                              <div className="flex gap-8 w-full">
                                <div className="flex justify-between w-[20%]">
                                  <h1>First Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[80%]">
                                  {row?.firstName ?? "Not Provided"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full">
                                <div className="flex justify-between w-[20%]">
                                  <h1>Last Name</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[80%]">
                                  {row?.lastName ?? "Not Provided"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full">
                                <div className="flex justify-between w-[20%]">
                                  <h1>Mobile</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[80%]">
                                  {row?.mobile ?? "Not Provided"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full">
                                <div className="flex justify-between w-[20%]">
                                  <h1>Email</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[80%]">
                                  {row?.email ?? "Not Provided"}
                                </div>
                              </div>
                              {(row?.role === "supervisor" || row?.role === "auditor") && (
                                <div className="flex gap-8 w-full">
                                  <div className="flex justify-between w-[20%]">
                                    <h1>Work for bank</h1>
                                    <h1>:</h1>
                                  </div>

                                  <div className="flex  gap-2 w-[80%] h-[70%] overflow-y-auto overflow-x-auto custom-scrollbar">
                                    {row?.workForBank?.map((item, i) => (
                                      <div
                                        key={i + 1}
                                        className="bg-[#67cfb3ff] flex items-center justify-center p-1 rounded-md text-xs"
                                      >
                                        {`${item?.bankName}
                                        (${item?.branchName})`}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col gap-1">
                              <div className="flex gap-8 w-full">
                                <div className="flex justify-between w-[20%]">
                                  <h1>Role</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[80%]">
                                  {row?.role === "admin"
                                    ? "Admin"
                                    : row?.role === "supervisor"
                                    ? "Supervisor"
                                    : row?.role === "coordinator"
                                    ? "Coordinator"
                                    : row?.role === "fieldExecutive"
                                    ? "Field Executive"
                                    : row?.role === "auditor"
                                    ? "Auditor"
                                    : "Not Provided"}
                                </div>
                              </div>

                              {row?.role === "fieldExecutive" && (
                                <React.Fragment>
                                  <div className="flex gap-8 w-full">
                                    <div className="flex justify-between w-[20%]">
                                      <h1>State</h1>
                                      <h1>:</h1>
                                    </div>
                                    <div className="flex justify-between w-[80%]">
                                      {row?.address?.state?.name ??
                                        "Not Provided"}
                                    </div>
                                  </div>
                                  <div className="flex gap-8 w-full">
                                    <div className="flex justify-between w-[20%]">
                                      <h1>District</h1>
                                      <h1>:</h1>
                                    </div>
                                    <div className="flex justify-between w-[80%]">
                                      {row?.address?.district?.name ??
                                        "Not Provided"}
                                    </div>
                                  </div>
                                  <div className="flex gap-8 w-full">
                                    <div className="flex justify-between w-[20%]">
                                      <h1>Zone</h1>
                                      <h1>:</h1>
                                    </div>
                                    <div className="flex justify-between w-[80%]">
                                      {row?.address?.zone?.name ??
                                        "Not Provided"}
                                    </div>
                                  </div>
                                </React.Fragment>
                              )}
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
                    colSpan="7"
                    className="py-10 text-center text-gray-400 text-lg"
                  >
                    No Users Found !
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
          totalData={totalUser}
          limit={limit}
          handleLimit={handleLimit}
          handleCurrentPageState={handleCurrentPageState}
        />

        {/* Update Modal Section open*/}
        {changeStatusModal && (
          <div
            id="authentication-modal"
            aria-hidden="true"
            onClick={() => setChangeStatusModal(false)}
            className={`${
              changeStatusModal ? "flex" : "hidden"
            } fixed inset-0 z-50 justify-center items-center backdrop-blur-sm w-[100%]`}
          >
            <div
              className="relative max-w-lg px-0 h-full md:h-auto !w-[100%]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-lg shadow relative dark:bg-gray-700 bg-gray-100 w-full lg:w-[700px] ml:10 md:ml-16 lg:ml-0">
                <div className="flex justify-between items-center p-2">
                  <div></div>
                  <div>
                    <h1 className="text-xl font-medium text-[#073d4fff]">
                      Update User
                    </h1>
                  </div>
                  <button
                    type="button"
                    className="text-black hover:bg-gray-400 hover:rounded-full p-1"
                    onClick={() => setChangeStatusModal(false)}
                  >
                    <IoCloseCircleOutline className="text-2xl font-semibold" />
                  </button>
                </div>
                <form
                  className="p-4 overflow-y-auto custom-scrollbar max-h-[90vh]"
                  onSubmit={handleFormUpdateUser}
                >
                  <div className="bg-white border rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                    {userUpdateSchema?.map((item) => (
                      <div className="flex flex-col gap-1" key={item?.key}>
                        <label
                          htmlFor={item?.htmlFor}
                          className="block text-gray-700 text-sm font-medium"
                        >
                          {item?.label}
                        </label>
                        {item?.type === "select" ? (
                          <select
                            type={item?.type}
                            id={item?.id}
                            name={item?.name}
                            value={item?.value}
                            onChange={handleInputOnchange}
                            className={`${item?.inputClassName}border border-gray-400 p-2 w-full lg:w-[260px] rounded-lg focus:outline-none focus:border-blue-400`}
                          >
                            {item?.options?.map((item) => (
                              <option key={item?.key} value={item?.value}>
                                {item?.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={item?.type}
                            id={item?.id}
                            name={item?.name}
                            value={item?.value}
                            onChange={handleInputOnchange}
                            className={`${item?.inputClassName} border border-gray-400 p-2 w-full lg:w-[260px] rounded-lg focus:outline-none focus:border-blue-400`}
                            required={item?.required}
                            disabled={item?.disabled}
                          />
                        )}
                      </div>
                    ))}

                    <div key="userGeoFormattedAddress" className="col-span-2">
                      <GeolocationAutoComplete
                        existingClientGeoFormattedAddress={
                          userData.userGeoFormattedAddress || ""
                        }
                        onSelect={handleLocationSelect} 
                      />
                    </div>

                  </div>
                  <div className="flex justify-center gap-4 mt-5">
                    <div>
                      <button
                        onClick={() => setChangeStatusModal(false)}
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
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUser;
