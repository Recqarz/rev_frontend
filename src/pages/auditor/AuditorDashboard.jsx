import { BsBank2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import CaseChart from "../../components/Analytics/CaseChart";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react"
import { FaUsers } from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";
import { getAuditorCaseData } from "../../redux/dashboard/auditor/auditor.Action";

const AuditorDashboard = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store?.authReducer);
  const {data, isLoading} = useSelector((store) => store?.auditorDashReducer);

const auditorDashboard = [
    {
      id: 1,
      name: "Field Executive",
      count: data?.allList?.totalFieldExecutive || 0,
      icon: <FaUsers className="text-4xl text-white" />,
      bgColor: "bg-[#38b6ffff]",
      shadowClass: "!shadow-[#38b6ffff]",
      link: "/auditor/dashboard",
    },

    {
      id: 5,
      name: "Cases",
      count: data?.allList?.cases?.totalCases || 0,
      icon: <IoBriefcase className="text-4xl text-white" />,
      bgColor: "bg-green-400",
      shadowClass: "!shadow-green-400",
      link: "/auditor/allReports",
    }
  ];

useEffect(()=>{
  dispatch(getAuditorCaseData(accessToken));
},[accessToken]);




  return (
    <div className="flex flex-col gap-10">
    <div className="grid grid-cols-2 gap-6 md:gap-14 w-auto lg:w-[80%] ml-0 lg:ml-24 ">
      {auditorDashboard?.map((item) => (
        <Link key={item?.id} to={item?.link}>
          <div
            className={`grid grid-cols-2 gap-4 rounded-md shadow-md ${item?.shadowClass} border-2 border-gray-200 p-4 bg-gray-100 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}
          >
            <div
              className={`flex justify-center items-center ${item?.bgColor} rounded-md`}
            >
              <div className="">{item?.icon}</div>
            </div>
            <div className="flex justify-center items-center text-center p-2">
              <div>
                {isLoading ? (
                  <h1 className="h-3 w-7 rounded-md animate-pulse bg-[#8099a2] ml-2"></h1>
                ) : (
                  <h1 className="font-bold text-green-700">{item?.count}</h1>
                )}
                <h1 className="font-medium text-md text-gray-400 w-full">
                  {item?.name}
                </h1>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>

    <div className="flex justify-center">
      {/* case chart */}
      <div className="rounded-lg p-5 border w-full max-w-2xl">
          <CaseChart allList={data?.allList} isLoading={isLoading} />
      </div>
    </div>
  </div>
  )
}

export default AuditorDashboard