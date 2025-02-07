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
const AllUser = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector(
    (state) => state.allUserReducer
  );
  const { message, currentPage, totalPages, totalUser, users } = data;
  // console.log("users==>", users);
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
  });
  const accessToken = useSelector((store) => store.authReducer.accessToken);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    role: "",
  });
  const [limit, setLimit] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);

  const [currentPageState, setCurrentPageState] = useState(currentPage);

  useEffect(() => {
    dispatch(
      getAllUserData(
        `limit=${limit}&page=${currentPageState}&search=${searchQuery}&role=${filters.role}&isActive=${filters.status}`
      )
    );
  }, [limit, currentPageState, searchQuery, filters.role, filters.status]);

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
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({ role: "", status: "" });
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
    });
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
        <SearchFilterAddSection
          setSearchQuery={setSearchQuery}
          setCurrentPageState={setCurrentPageState}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
          disabledReset={!searchQuery && !filters.role && !filters.status}
          enableReset={searchQuery || filters.role || filters.status}
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
              {users && users?.length > 0 ? (
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
                        {highlightMatch(row?.role, searchQuery)}
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
                            <div className="flex flex-col gap-1">
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
                            </div>

                            <div className="flex flex-col gap-1">
                              <div className="flex gap-8 w-full">
                                <div className="flex justify-between w-[20%]">
                                  <h1>Email</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[80%]">
                                  {row?.email ?? "Not Provided"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full">
                                <div className="flex justify-between w-[20%]">
                                  <h1>Role</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[80%]">
                                  {row?.role ?? "Not Provided"}
                                </div>
                              </div>
                              <div className="flex gap-8 w-full">
                                <div className="flex justify-between w-[20%]">
                                  <h1>Work for bank</h1>
                                  <h1>:</h1>
                                </div>
                                <div className="flex justify-between w-[80%]">
                                  {row?.workForBank ?? "Not Provided"}
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
              className="relative  max-w-md px-0 h-full md:h-auto !w-[100%]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-lg shadow relative dark:bg-gray-700 bg-gray-100">
                <div className="flex justify-between items-center p-2">
                  <div></div>
                  <div>
                    <h1 className="text-xl font-medium text-[#073d4fff]">
                      Update User
                    </h1>
                  </div>
                  <button
                    type="button"
                    className="text-black hover:text-red-600 hover:bg-gray-400 hover:rounded-full p-1"
                    onClick={() => setChangeStatusModal(false)}
                  >
                    <IoCloseCircleOutline className="text-2xl font-semibold" />
                  </button>
                </div>
                <form
                  className="p-4 overflow-y-auto custom-scrollbar max-h-[70vh]"
                  onSubmit={handleFormUpdateUser}
                >
                  <div className="bg-white border rounded-lg p-6 flex flex-col gap-5">
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
                            className={`${item?.inputClassName}border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400 px-2`}
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
                            className={`${item?.inputClassName} border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400 px-2`}
                            required={item?.required}
                            disabled={item?.disabled}
                          />
                        )}
                      </div>
                    ))}
                    <div className="flex justify-center">
                      <div className="flex gap-4">
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

export default AllUser;
