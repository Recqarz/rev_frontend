import React, { useState } from 'react'
// import '../index.css'
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md'
import { HiUserAdd } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const BankTable = ({ allBank }) => {
  const handleUpdateStatusFunc = (item) => {
    console.log(item)
  }

  return (
    <div className="">
      <div className="flex flex-col gap-5 mt-24">
        <div className="flex justify-end mx-4">
          <Link to="/admin/dashboard/all/banks/add">
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
                <th className="w-1/7 py-2 px-6 text-left text-xs">SL NO.</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">BANK NAME</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">
                  BRANCH NAME
                </th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">IFSC CODE</th>
                {/* <th className="w-1/4 py-2 px-6 text-left text-xs">MOBILE</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">ROLE</th>
                <th className="w-1/4 py-2 px-6 text-left text-xs">STATUS</th> */}
                <th className="w-1/4 py-2 px-6 text-left text-xs">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {(allBank ?? [])?.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer hover:shadow-md"
                >
                  <td className="py-3 px-6 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {row.bankName}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-sm">
                    {row.branchName}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 truncate">
                    {row.IFSC}
                  </td>
                  {/* <td className="py-3 px-6 border-b border-gray-200">
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
                  </td> */}

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

export default BankTable
