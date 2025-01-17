import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { MdOutlineEdit } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllUserData } from '../redux/users/userAction'

const UserTable = () => {
  const { isLoading, isError, data } = useSelector(
    (state) => state.allUserReducer
  )
  const { message, currentPage, totalPages, totalUser, users } = data

  const [searchQuery, setSearchQuery] = useState('')
  const [limit, setLimit] = useState(5)
  const [filterRole, setFilterRole] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [currentPageState, setCurrentPageState] = useState(currentPage)
  const [debouncedFilters, setDebouncedFilters] = useState({
    search: '',
    role: '',
    isActive: '',
  })

  const dispatch = useDispatch()

  // Debounce logic for filters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters({
        search: searchQuery,
        role: filterRole,
        isActive: filterStatus,
      })
    }, 500) // 500ms debounce delay

    return () => clearTimeout(timer) // Cleanup debounce timer
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

  const handleUpdateStatusFunc = (item) => {
    console.log(item)
  }

  const handleNextPage = () => {
    if (currentPageState < totalPages) {
      setCurrentPageState((prev) => prev + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPageState > 1) {
      setCurrentPageState((prev) => prev - 1)
    }
  }

  return (
    <div className="">
      <div className="flex flex-col gap-5 mt-24">
        <div className="flex justify-between gap-2 items-center mx-4">
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
                <option value="">Filter by Role</option>
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
          {/* <div className="flex flex-col space-y-2 max-w-sm">
            <label htmlFor="page-limit" className="text-gray-800 font-medium">
              Page Limit
            </label>
            <select
              id="page-limit"
              className="p-3 border border-gray-300 rounded-md bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-gray-100 cursor-pointer"
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div> */}
          <Link to="/admin/dashboard/all/users/add">
            <div className="rounded-md px-6 bg-[#073c4e] py-2 text-white font-semibold">
              ADD
            </div>
          </Link>
        </div>

        {/* Table Section */}
        <div className="shadow-lg rounded-lg mx-4 overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#073c4e] text-white">
                <th className="w-1/7 py-2 px-6 text-left text-xs">ID</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">NAME</th>
                {/* <th className="w-1/4 py-2 px-6 text-left text-xs">USER CODE</th> */}
                <th className="w-1/4 py-2 px-6 text-left text-xs">EMAIL</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">MOBILE</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">ROLE</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">STATUS</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {users?.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer hover:shadow-md"
                >
                  <td className="py-3 px-6 border-b border-gray-200">
                    {row?.userCode}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {row.firstName}
                  </td>
                  {/* <td className="py-3 px-6 border-b border-gray-200 text-sm">
                    {row.userCode}
                  </td> */}
                  <td className="py-3 px-6 border-b border-gray-200 truncate">
                    {row.email}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {row.mobile}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {row.role}
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
                      onClick={() => handleUpdateStatusFunc(row)}
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
        <div className="shadow-lg  mx-4 py-2 flex justify-center gap-2 items-center rounded-bl-lg rounded-br-lg bg-[#073c4e] text-white font-medium">
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
        </div>
      </div>
    </div>
  )
}

export default UserTable
