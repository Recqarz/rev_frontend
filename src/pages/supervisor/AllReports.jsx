import React from "react";
import { TbListDetails } from "react-icons/tb";

const AllReports = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-5 w-[100%]">
        {/* Table Section */}
        <div className="shadow-lg rounded-lg overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#073c4e] text-white">
                <th className="w-1/6 py-2 px-6 text-left text-xs">Sl No.</th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">
                  Client Name
                </th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">
                  Client Mobile No
                </th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">
                  Field Executive Name
                </th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr
                // key={index}
                className="hover:bg-gray-100 cursor-pointer hover:shadow-md"
              >
                <td className="py-3 px-6 border-b border-gray-200 truncate text-sm">
                  {/* {index + 1} */} 1
                </td>
                <td className="py-3 px-6 border-b border-gray-200 truncate text-sm">
                  {/* {highlightMatch(row?.bankName, searchQuery)} */} Client 1
                </td>
                <td className="py-3 px-6 border-b border-gray-200 text-sm truncate">
                  {/* {highlightMatch(row?.branchName, searchQuery)} */}{" "}
                  8908099867
                </td>
                <td className="py-3 px-6 border-b border-gray-200 truncate text-sm">
                  {/* {highlightMatch(row?.IFSC, searchQuery)} */} FE_001
                </td>

                <td className="py-3 px-6 border-b border-gray-200 hover:bg-blue-50 flex gap-2">
                  <div
                    className="rounded-full hover:bg-gray-300 py-1 px-1 cursor-not-allowed"
                    // onClick={() => handleUpdateStatusFunc(row)}
                  >
                    <TbListDetails className="text-xl text-[#3fb597]" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllReports;
