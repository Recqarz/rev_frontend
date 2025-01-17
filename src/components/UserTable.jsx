import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { MdOutlineEdit } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllUserData, updateUserData } from '../redux/users/userAction'
import Pagination from './Pagination'

const UserTable = () => {
  const dispatch = useDispatch()
  const { isLoading, isError, data } = useSelector(
    (state) => state.allUserReducer
  )
  const { message, currentPage, totalPages, totalUser, users } = data
  const [changeStatusModal, setChangeStatusModal] = useState(false)
  const [userId, setUserId] = useState('')
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userCode: '',
    mobile: '',
    role: '',
    isActive: '',
  })
  const accessToken = useSelector((store) => store.authReducer.accessToken)
  const [searchQuery, setSearchQuery] = useState('')
  const [limit, setLimit] = useState(10)
  console.log('table limit--->', limit)
  const [filterRole, setFilterRole] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [currentPageState, setCurrentPageState] = useState(currentPage)
  const [debouncedFilters, setDebouncedFilters] = useState({
    search: '',
    role: '',
    isActive: '',
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters({
        search: searchQuery,
        role: filterRole,
        isActive: filterStatus,
      })
    }, 500) // 500ms debounce delay

    return () => clearTimeout(timer)
  }, [searchQuery, filterRole, filterStatus])

  // Fetch data when debounced filters or current page changes
  useEffect(() => {
    const { search, role, isActive } = debouncedFilters
    const filters = {
      search,
      role,
      isActive,
      page: currentPageState,
      limit,
    }
    // Remove undefined or empty filter values
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    )
    const queryString = new URLSearchParams(cleanedFilters).toString()
    dispatch(getAllUserData(queryString))
  }, [debouncedFilters, currentPageState, dispatch, limit])

  const handleResetFilters = () => {
    setSearchQuery('')
    setFilterRole('')
    setFilterStatus('')
    setCurrentPageState(1) // Reset to the first page
  }

  const handleLimit = (val) => {
    setLimit(val)
  }

  const handleEditUser = (item) => {
    setChangeStatusModal(true)
    setUserId(item._id)
    setUserData({
      firstName: item?.firstName,
      lastName: item?.lastName,
      email: item?.email,
      userCode: item?.userCode,
      mobile: item?.mobile,
      role: item?.role,
      isActive: item.isActive,
    })
  }

  const handleChangeUserData = (e) => {
    const { name, value } = e.target
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: name === 'isActive' ? value === 'true' : value, // Update the specific field dynamically
    }))
  }

  const handleUpdateFunc = (e) => {
    e.preventDefault()
    // console.log("user", userData);
    dispatch(updateUserData(userData, accessToken, userId))
    setChangeStatusModal(false)
  }

  const handleCurrentPageState = (val) => {
    setCurrentPageState((prev) => prev + val)
  }

  return (
    <div className="">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between gap-2 items-center">
          <div className="flex items-center">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative">
                <span className="absolute inset-y-0 left-3 top-1 flex items-center text-gray-400 text-md">
                  <IoMdSearch />
                </span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Search here . . ."
                  className="px-10 py-2 w-64 border rounded-lg text-sm focus:ring-cyan-600 focus:border-cyan-600"
                />
              </div>

              {/* Filter Role Dropdown */}
              <select
                className="px-4 py-2 border rounded-lg text-sm bg-white focus:ring-cyan-600 focus:border-cyan-600"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="">All Role</option>
                <option value="admin">Admin</option>
                <option value="fieldExecutive">Field Executive</option>
                <option value="coordinator">Coordinator</option>
                <option value="auditor">Auditor</option>
                <option value="supervisor">Supervisor</option>
              </select>

              {/* Filter Status Dropdown */}
              <select
                className="px-4 py-2 border rounded-lg text-sm bg-white focus:ring-cyan-600 focus:border-cyan-600"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Filter by Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>

              <button
                onClick={handleResetFilters}
                disabled={!searchQuery && !filterRole && !filterStatus} // Disable button if no filters are applied
                className={`px-6 py-2 text-sm rounded-lg font-medium ${
                  searchQuery || filterRole || filterStatus
                    ? 'bg-red-400 text-white hover:bg-red-500'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Reset
              </button>
            </div>
          </div>
          <Link to="/admin/dashboard/all/users/add">
            <div className="rounded-md px-6 bg-[#073c4e] py-2 text-white font-semibold">
              ADD
            </div>
          </Link>
        </div>

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
              {users?.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer hover:shadow-md text-sm"
                >
                  <td className="py-3 px-6 border-b border-gray-200">
                    {row?.userCode}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {row?.firstName}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 truncate">
                    {row?.email}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {row?.mobile}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {row?.role}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    <span
                      className={`text-white py-1 px-2 rounded-full text-xs 
                      ${row.isActive === true ? 'bg-green-500' : 'bg-red-500'}
                      `}
                    >
                      {row.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td className="py-3 px-6 border-b border-gray-200 hover:bg-blue-50 flex gap-2">
                    <div
                      className="rounded-full hover:bg-gray-300 py-1 px-1"
                      onClick={() => handleEditUser(row)}
                    >
                      <MdOutlineEdit className="text-xl text-[#3fb597]" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {/* <div className="shadow-lg  mx-4  flex justify-center gap-2 items-center rounded-bl-lg rounded-br-lg bg-[#073c4e] text-white font-medium">
          <button
            onClick={handlePreviousPage}
            disabled={currentPageState === 1}
            className={`px-3 py-1 rounded hover:bg-gray-600 ${
              currentPageState === 1 && 'cursor-not-allowed opacity-50'
            }`}
          >
            {'<'}
          </button>
          <span>
            {currentPage * limit - limit + 1}-
            {totalUser <= currentPage * limit ? totalUser : currentPage * limit}{' '}
            of {totalUser}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPageState === totalPages}
            className={`px-3 py-1 rounded hover:bg-gray-600 ${
              currentPageState === totalPages && 'cursor-not-allowed opacity-50'
            }`}
          >
            {'>'}
          </button>
          <select
            className=" border border-gray-500 rounded-md bg-[#073c4e] shadow-sm focus:outline-none cursor-pointer"
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div> */}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalData={totalUser}
          limit={limit}
          handleLimit={handleLimit}
          handleCurrentPageState={handleCurrentPageState}
        />

        {/* Edit Modal Section */}
        {changeStatusModal && (
          <div
            id="authentication-modal"
            aria-hidden="true"
            className={`${
              changeStatusModal ? 'flex' : 'hidden'
            } overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center backdrop-blur-sm`}
          >
            <div className="relative w-full max-w-md px-0 h-full md:h-auto">
              <div className="rounded-lg shadow relative dark:bg-gray-700 bg-gray-100">
                <div className="flex justify-end p-0">
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={() => setChangeStatusModal(false)}
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
                  onSubmit={handleUpdateFunc}
                >
                  <h5 className="text-xl font-medium mb-4">
                    Update The User Data
                  </h5>
                  <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first name"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChangeUserData}
                        className="border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium text-sm mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last name"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChangeUserData}
                        className="border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium text-sm mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChangeUserData}
                        className="border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium text-sm mb-2"
                      >
                        User Code
                      </label>
                      <input
                        type="text"
                        id="user code"
                        name="userCode"
                        defaultValue={userData.userCode}
                        className="bg-gray-200 border border-gray-400 p-1 w-full rounded-lg text-gray-400 cursor-not-allowed focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="contact number"
                        className="block text-gray-700 font-medium text-sm mb-2"
                      >
                        Contact Number
                      </label>
                      <input
                        type="number"
                        id="mobile"
                        name="mobile"
                        value={userData.mobile}
                        onChange={handleChangeUserData}
                        className="border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="role"
                        className="block text-gray-700 font-medium text-sm mb-2"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        defaultValue={userData.role}
                        className="bg-gray-200 border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400 cursor-not-allowed text-gray-400"
                        required
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="status"
                        className="block text-gray-700 font-medium text-sm mb-2"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        name="isActive"
                        value={userData.isActive}
                        onChange={handleChangeUserData}
                        className="border border-gray-400 p-1 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </select>
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
  )
}

export default UserTable
