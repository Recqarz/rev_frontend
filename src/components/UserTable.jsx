import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
// import '../index.css'
import { MdOutlineEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'

const UserTable = ({ allUser }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filteredData, setFilteredData] = useState(allUser || [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const lowerCaseQuery = searchQuery.toLowerCase()

      // Filter data based on search query and selected role
      const filtered = (allUser ?? []).filter((user) => {
        const matchesSearch =
          user.firstName.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery) ||
          user.userCode.toLowerCase().includes(lowerCaseQuery) ||
          user.role.toLowerCase().includes(lowerCaseQuery)
        const matchesRole = filterRole ? user.role === filterRole : true

        return matchesSearch && matchesRole
      })

      console.log('Filtered Data:', filtered)
      setFilteredData(filtered)
    }, 300) // 300ms debounce

    return () => clearTimeout(timer) // Cleanup on searchQuery or filterRole change
  }, [searchQuery, filterRole, allUser])

  const handleResetFilters = () => {
    setSearchQuery('')
    setFilterRole('')
    setFilteredData(allUser || []) // Reset the table to original data
  }
  const handleUpdateStatusFunc = (item) => {
    console.log(item)
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
              {/* Filter Dropdown */}
              <select
                className="px-4 py-2 border rounded-lg text-sm bg-white focus:ring-cyan-600 focus:border-cyan-600"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="">Filter by Role</option>
                <option value="admin">Admin</option>
                <option value="fieldExecutive">Filed Executive</option>
                <option value="coordinator">Co ordinator</option>
                <option value="auditor">Auditor</option>
                <option value="supervisor">Supervisor</option>
              </select>

              <button
                onClick={handleResetFilters}
                disabled={!searchQuery && !filterRole} // Disable button if no filters are applied
                className={`px-6 py-2 text-sm rounded-lg font-medium ${
                  searchQuery || filterRole
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
        {/* -----------------------------------------------custom-scrollbar */}
        <div className="shadow-lg rounded-lg mx-4 overflow-x-auto custom-scrollbar ">
          <table className="min-w-full  divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#073c4e] text-white">
                <th className="w-1/7 py-2 px-6 text-left text-xs">ID</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">NAME</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">USER CODE</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">EMAIL</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">MOBILE</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">ROLE</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">STATUS</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredData?.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer hover:shadow-md"
                >
                  <td className="py-3 px-6 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {row.firstName}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-sm">
                    {row.userCode}
                  </td>
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
        <div className="shadow-lg mt-4 mx-4 py-1 flex justify-center lg:justify-end rounded-bl-lg rounded-br-lg bg-[#073c4e] text-white font-medium">
          <div className="flex flex-col gap-1.5 md:flex-row md:gap-14 justify-center items-center">
            {/* <div>Rows per page: {rowsPerPage}</div> */}
            {/* <div>
              {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, data.length)} of{" "}
              {data.length}
            </div> */}
            <div className="flex gap-4 lg:mr-6">
              {/* <button
                onClick={handlePrevious}
                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
              >
                &lt;
              </button> */}
              {/* <button
                onClick={handleNext}
                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
              >
                &gt;
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserTable
