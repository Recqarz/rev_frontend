import React, { useEffect } from "react";
import { TbListDetails } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getSupervisorData } from "../../redux/supervisor/supervisorAction";
import { highlightMatch } from "../../utils/highlightMatch";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const AllReports = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store?.authReducer);
  const {
    isLoading: isLoadingSupervisor,
    isError: isErrorSupervisor,
    data: isSupervisorData,
  } = useSelector((store) => store.supervisorReducer);
  console.log("supervisorData==>", isSupervisorData);
  useEffect(() => {
    dispatch(getSupervisorData(accessToken));
  }, []);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-5 w-[100%]">
        {/* Table Section */}
        <div className="shadow-lg rounded-lg overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#073c4e] text-white">
                <th className="w-1/5 py-2 px-6 text-left text-xs">Case Code</th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">
                  Client Name
                </th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">
                  Client Contact
                </th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">
                  Field Executive Id
                </th>
                <th className="w-1/5 py-2 px-6 text-left text-xs">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoadingSupervisor ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-10 text-center text-gray-400 text-lg"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                      <div className="w-5 h-5 rounded-full animate-pulse bg-[#3f6a7e]"></div>
                    </div>{" "}
                  </td>
                </tr>
              ) : isSupervisorData?.details?.length > 0 ? (
                isSupervisorData?.details?.map((row, i) => (
                  <tr
                    key={i + 1}
                    className="hover:bg-gray-100 cursor-pointer hover:shadow-md"
                  >
                    <td className="py-3 px-6 border-b border-gray-200 truncate text-sm">
                      {highlightMatch(row?.case?.caseCode)}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200 text-sm truncate">
                      {highlightMatch(row?.case?.clientName)}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200 truncate text-sm">
                      {highlightMatch(row?.case?.contactNo)}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200 truncate text-sm">
                      {highlightMatch(row?.case?.fieldExecutiveId)}
                    </td>

                    <td className="py-3 px-6 border-b border-gray-200 hover:bg-blue-50 flex gap-6">
                      <div
                        className="rounded-full hover:bg-gray-300 py-1 px-1 "
                        // onClick={() => handleUpdateStatusFunc(row)}
                      >
                        <MdOutlineEdit className="text-xl text-[#3fb597]" />
                      </div>
                      <Link
                        to="/supervisor/reportDetails"
                        state={{ reportData: row }}
                      >
                        <div
                          className="rounded-full hover:bg-gray-300 py-1 px-1"
                          // onClick={() => handleUpdateStatusFunc(row)}
                        >
                          <TbListDetails className="text-xl text-[#3fb597]" />
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-10 text-center text-gray-400 text-lg"
                  >
                    No Data Found !
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllReports;
