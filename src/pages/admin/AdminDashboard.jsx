import React, { useEffect } from "react";
import { BsBank2 } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";
import { Link } from "react-router-dom";
import CaseChart from "../../components/Analytics/CaseChart";
import UserChart from "../../components/Analytics/UserChart";
import { getAdminListData } from "../../redux/dashboard/admin/adminAction";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store?.authReducer);
  const { isLoading, isError, data } = useSelector(
    (state) => state.adminReducer
  );
  const { message, currentPage, totalPages, totalCase, allList } = data;
  console.log("allList==>", allList);

  useEffect(() => {
    dispatch(getAdminListData(accessToken));
  }, []);
  const alladminDashboardData = [
    {
      id: 1,
      name: "Users",
      count: allList?.users?.totalUsers || 0,
      icon: <FaUsers className="text-4xl text-white" />,
      bgColor: "bg-[#38b6ffff]",
      shadowClass: "!shadow-[#38b6ffff]",
      link: "/admin/dashboard/all/users",
    },

    {
      id: 5,
      name: "Cases",
      count: allList?.cases?.totalCases || 0,
      icon: <IoBriefcase className="text-4xl text-white" />,
      bgColor: "bg-green-400",
      shadowClass: "!shadow-green-400",
      link: "",
    },
    {
      id: 6,
      name: "Banks",
      count: allList?.banks?.totalBanks,
      icon: <BsBank2 className="text-4xl text-white" />,
      bgColor: "bg-[#004badff]",
      shadowClass: "!shadow-[#004badff]",
      link: "/admin/dashboard/all/banks",
    },
  ];

  const total = alladminDashboardData.reduce(
    (acc, item) => acc + item.count,
    0
  ); // Calculate total count

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {alladminDashboardData?.map((item) => (
          <Link key={item?.id} to={item?.link}>
            <div
              className={`grid grid-cols-2 gap-4 rounded-md shadow-md ${item?.shadowClass} border-2 border-gray-200 p-4 bg-gray-100 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}
            >
              <div
                className={`flex justify-center items-center ${item?.bgColor} rounded-md`}
              >
                {item?.icon}
              </div>
              <div className="flex justify-center items-center text-center p-2">
                <div>
                  <h1 className="font-bold text-green-700">{item?.count}</h1>
                  <h1 className="font-medium text-md text-gray-400 w-full">
                    {item?.name}
                  </h1>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* user chart */}
        <div className="flex items-center">
          <UserChart allList={allList} />
        </div>

        {/* case chart */}
        <div className=" rounded-lg p-5">
          <div>
            <CaseChart allList={allList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
