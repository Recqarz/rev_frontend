import React, { useMemo } from "react";
import { FaBars, FaTimes, FaUsers } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoBriefcase, IoBriefcaseSharp, IoLogOut } from "react-icons/io5";
import { BsBank2 } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { FaClipboardUser } from "react-icons/fa6";
import REV_logo_2 from "../assets/image/REV_logo_2.png";
import Swal from "sweetalert2";
import { toastError } from "../utils/react-toastify/ReactToastiry";
import { AiOutlineMenuFold } from "react-icons/ai";

const roleBasedMenu = {
  admin: [
    { name: "Dashboard", icon: <MdDashboard />, path: "/admin/dashboard" },
    { name: "Users", icon: <FaUsers />, path: "/admin/dashboard/all/users" },
    { name: "Banks", icon: <BsBank2 />, path: "/admin/dashboard/all/banks" },
    { name: "Cases", icon: <IoBriefcase />, path: "/admin/dashboard/cases" },
  ],
  coordinator: [
    {
      name: "Dashboard",
      icon: <MdDashboard />,
      path: "/coordinator/dashboard",
    },
    {
      name: "Cases",
      icon: <IoBriefcaseSharp />,
      path: "/coordinator/all/cases",
    },
    {
      name: "Field Executives",
      icon: <FaUsers />,
      path: "/coordinator/all/fieldexecutives",
    },
    // { name: 'Cases', icon: <IoBriefcase />, path: '/coordinator/cases' },
  ],
  fieldExecutive: [
    {
      name: "Dashboard",
      icon: <MdDashboard />,
      path: "/fieldexecutive/dashboard",
    },
    { name: "Tasks", icon: <IoBriefcase />, path: "/fieldexecutive/tasks" },
  ],
  supervisor: [
    { name: "Dashboard", icon: <MdDashboard />, path: "/supervisor/dashboard" },
    { name: "Reports", icon: <IoBriefcase />, path: "/supervisor/reports" },
  ],
  auditor: [
    { name: "Dashboard", icon: <MdDashboard />, path: "/auditor/dashboard" },
    { name: "Audits", icon: <IoBriefcase />, path: "/auditor/audits" },
  ],
};

const Sidebar = ({ isOpen, toggleSidebar, profileData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { role } = useSelector((store) => store.authReducer); // Fetch role from Redux
  // const menuItems = roleBasedMenu[role] || [];
  const menuItems = useMemo(() => roleBasedMenu[role] || [], [role]);
  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    // toggleSidebar(false);
  };

  const handleLogout = async () => {
    try {
      // Show confirmation dialog for updating case
      const result = await Swal.fire({
        title: "",
        text: "Are you sure want to logout !",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout",
        customClass: {
          popup: "small-swal", // Apply custom class to the popup
        },
      });

      if (result.isConfirmed) {
        dispatch({ type: "USER_LOGOUT_SUCCESS" });
        navigate("/");
      }
    } catch (error) {
      // Handle errors and show appropriate feedback
      toastError("Something went wrong !");
      console.error("Error:", error);
    }
  };

  return (
    <aside
      className={`z-[9999]  fixed inset-y-0 left-0 px-4 pt-1 pb-2 bg-white text-white shadow-lg rounded-sm transform transition-transform duration-300 ease-in-out ${
        isOpen
          ? "-translate-x-full md:-translate-x-full lg:-translate-x-full"
          : "md:translate-x-0  lg:translate-x-0 "
      } md:static lg:static !w-[70%] md:!w-[22%] lg:!w-[18%]`}
    >
      <div className="flex flex-col gap-2 h-full">
        {/* Header */}
        <div className="flex items-center">
          {/* <div
            onClick={toggleSidebar}
            className="text-gray-500 text-xl lg:hidden hover:bg-gray-300 rounded-full p-2 hover:cursor-pointer"
          >
            <FaTimes />
          </div> */}
          <div className=" flex justify-center items-center w-full ">
            {/* <h1 className="text-lg font-medium text-[#51677E]">REV</h1> */}
            <Link to={`/${role}/dashboard`}>
              <img
                className=" h-[60px]"
                src={REV_logo_2}
                alt="company_logo"
              ></img>
            </Link>
          </div>
          <div
            onClick={toggleSidebar}
            className="lg:hidden hover:bg-gray-300 rounded-sm p-2 hover:cursor-pointer"
          >
            {/* <AiOutlineMenuFold className="text-2xl text-[#0d3d53] font-extrabold" /> */}
            <FaBars className="text-xl text-[#0d3d53] font-extrabold" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="uppercase font-semibold flex items-center px-4 py-2 text-[14px] text-gray-500 border-b border-[#51677E]">
            <span className="mr-3">
              <FaClipboardUser />
            </span>
            {profileData?.role}
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col justify-between h-full">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`cursor-pointer flex items-center px-4 py-2 text-[14px] text-gray-500 hover:bg-[#51677E] hover:!text-white rounded-lg transition-colors ${
                  isActive(item.path) ? "bg-[#51677E] !text-white" : ""
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center px-4 py-2 text-[14px] text-gray-500 hover:bg-[#51677E] hover:!text-white rounded-lg transition-colors"
        >
          <IoLogOut className="mr-3 text-[20px]" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
