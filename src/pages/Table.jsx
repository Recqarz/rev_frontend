import React, { useState } from 'react';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';

const Table = () => {
  const data = [
    { id: '1A', name: 'John Doe', email: 'johndoe@gmail.com', contact: '555-555-5555', status: 'Active' },
    { id: '2B', name: 'Jane Smith', email: 'janesmith@gmail.com', contact: '555-555-5556', status: 'Inactive' },
    { id: '3C', name: 'Jack Black', email: 'jackblack@gmail.com', contact: '555-555-5557', status: 'Pending' },
    { id: '4D', name: 'Alice White', email: 'alicewhite@gmail.com', contact: '555-555-5558', status: 'Active' },
    { id: '5E', name: 'Bob Green', email: 'bobgreen@gmail.com', contact: '555-555-5559', status: 'Inactive' },
    { id: '6F', name: 'Charlie Blue', email: 'charlieblue@gmail.com', contact: '555-555-5560', status: 'Active' },
    { id: '7G', name: 'Diana Yellow', email: 'dianayellow@gmail.com', contact: '555-555-5561', status: 'Pending' },
    { id: '8H', name: 'Eve Brown', email: 'evebrown@gmail.com', contact: '555-555-5562', status: 'Active' },
    { id: '9I', name: 'Frank Red', email: 'frankred@gmail.com', contact: '555-555-5563', status: 'Inactive' },
    { id: '10J', name: 'Grace Pink', email: 'gracepink@gmail.com', contact: '555-555-5564', status: 'Active' },
    { id: '11K', name: 'Harry Orange', email: 'harryorange@gmail.com', contact: '555-555-5565', status: 'Pending' },
    { id: '12L', name: 'Ivy Violet', email: 'ivyviolet@gmail.com', contact: '555-555-5566', status: 'Inactive' },
    { id: '13M', name: 'Jack White', email: 'jackwhite@gmail.com', contact: '555-555-5567', status: 'Active' },
    { id: '14N', name: 'Kim Gray', email: 'kimgray@gmail.com', contact: '555-555-5568', status: 'Pending' },
    { id: '15O', name: 'Liam Silver', email: 'liamsilver@gmail.com', contact: '555-555-5569', status: 'Active' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handleNext = () => {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5 mt-6">
        <div className="flex justify-end mx-4 md:mx-10">
          <button className="rounded-md px-6 bg-[#073c4e] py-1 text-[#3fb597] font-medium">ADD</button>
        </div>
        <div className="shadow-lg rounded-lg mx-4 md:mx-10 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#073c4e] text-white">
                <th className="w-1/12 py-2 px-6 text-left">S.No</th>
                <th className="w-1/7 py-2 px-6 text-left">ID</th>
                <th className="w-1/4 py-2 px-6 text-left">NAME</th>
                <th className="w-1/4 py-2 px-6 text-left">EMAIL</th>
                <th className="w-1/4 py-2 px-6 text-left">CONTACT NO.</th>
                <th className="w-1/4 py-2 px-6 text-left">STATUS</th>
                <th className="w-1/4 py-2 px-6 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentRows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100 cursor-pointer hover:shadow-md">
                  <td className="py-3 px-6 border-b border-gray-200">{indexOfFirstRow + index + 1}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{row.id}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{row.name}</td>
                  <td className="py-3 px-6 border-b border-gray-200 truncate">{row.email}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{row.contact}</td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    <span
                      className={`text-white py-1 px-2 rounded-full text-xs ${
                        row.status === 'Active' ? 'bg-green-500' : row.status === 'Inactive' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 hover:bg-blue-50 flex gap-2">
                    <div
                      className="rounded-full hover:bg-gray-300 py-1 px-1"
                      onClick={() => console.log('rowData==>', row)}
                    >
                      <MdOutlineEdit className="text-xl text-[#3fb597]" />
                    </div>
                    <div className="rounded-full hover:bg-gray-300 py-1 px-1">
                      <MdDeleteOutline className="text-xl text-red-500" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="shadow-lg mt-4 mx-4 md:mx-10 py-1 flex justify-center lg:justify-end rounded-bl-lg rounded-br-lg bg-[#073c4e] text-white font-medium">
          <div className="flex flex-col gap-1.5 md:flex-row md:gap-14 justify-center items-center">
            <div>Rows per page: {rowsPerPage}</div>
            <div>
              {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, data.length)} of {data.length}
            </div>
            <div className="flex gap-4 lg:mr-6">
              <button onClick={handlePrevious} className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
                &lt;
              </button>
              <button onClick={handleNext} className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
