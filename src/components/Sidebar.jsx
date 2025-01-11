import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import bildinglogo1 from "../assets/image/buildingdesign.png";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeMenu = () => {
    setIsSidebarOpen(false);
    setIsUsersOpen(false);
  };

  const handleDashboard = () => {
    navigate("/admin/dashboard");
    setIsSidebarOpen(false);
    // setIsUsersOpen(false);
  };

  const handlecoordinator = () => {
    navigate("/admin/coordinator/dashboard");

    setIsSidebarOpen(false);
    // setIsUsersOpen(false);
  };

  const handlefieldexecutive = () => {
    navigate("/admin/field-executive/dashboard");
    setIsSidebarOpen(false);
    // setIsUsersOpen(false);
  };

  const handlesupervisor = () => {
    navigate("/admin/supervisor/dashboard");
    setIsSidebarOpen(false);
    // setIsUsersOpen(false);
  };

  const handleauditorfunc = () => {
    navigate("/admin/auditor/dashboard");

    setIsSidebarOpen(false);
    // setIsUsersOpen(false);
  };

  const handleLogoutFunc = () => {
    navigate("/");
  };

  return (
    <>
      {/* Hamburger Menu Button - Improved mobile responsiveness */}
      <button
        className="z-50 fixed top-5 left-3 p-2 rounded-lg bg-blue-50 shadow-lg md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Menu"
      >
        {isSidebarOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      {/* Overlay for mobile menu */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <div className="z-40 flex flex-col h-screen">
        <div className="flex flex-1 overflow-y-auto">
          <aside
            className={`
              fixed md:static top-0 left-0 w-[200px] shadow-lg  bg-blue-100 flex flex-col justify-between h-full rounded-sm
              transition-transform duration-300 ease-in-out z-40 custom-scroll
              ${
                isSidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              }
            `}
          >
            <div className="flex-1 overflow-y-auto">
              <Link to="/admin/dashboard">
                <h1
                  className="px-6 mt-5 ml-7 md:ml-5 mb-6 cursor-pointer text-center md:text-left"
                  onClick={closeMenu}
                >
                  <img className="h-[70%] w-[70%]" src={bildinglogo1} alt="" />
                </h1>
              </Link>

              <ul className="px-4 pb-4 space-y-1">
                <li
                  onClick={handleDashboard}
                  className="flex items-center px-4 py-[6px] text-black text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors"
                >
                  <span className="mr-3">
                    <RxDashboard className="text-[20px]" />
                  </span>
                  Dashboard
                </li>

                <li
                  className="flex items-center justify-between px-4 py-[6px] text-black text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg cursor-pointer transition-colors"
                  onClick={() => setIsUsersOpen(!isUsersOpen)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <FaUsers className="text-[20px]" />
                    </span>
                    Users
                  </div>
                </li>

                {isUsersOpen && (
                  <div className="ml-8 space-y-1">
                    <li
                      onClick={handlecoordinator}
                      className="flex items-center px-4 py-[6px] cursor-pointer text-sm text-black text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors"
                    >
                      Co-ordinator
                    </li>
                    <li
                      onClick={handlefieldexecutive}
                      className="flex items-center px-4 py-[6px] text-sm text-black text-[14px] hover:bg-[#51677E] rounded-lg transition-colors hover:text-white"
                    >
                      Field Executive
                    </li>

                    <li
                      onClick={handlesupervisor}
                      className="flex items-center px-4 py-[6px] text-sm text-black text-[14px] hover:bg-[#51677E] rounded-lg transition-colors hover:text-white"
                    >
                      Supervisor
                    </li>
                    <li
                      onClick={handleauditorfunc}
                      className="flex items-center px-4 py-[6px] text-sm text-black text-[14px] hover:bg-[#51677E] rounded-lg transition-colors hover:text-white"
                    >
                      Auditor
                    </li>
                  </div>
                )}

                <Link to="/admin/dashboard">
                  <li
                    onClick={closeMenu}
                    className="flex items-center px-4 py-[6px] text-black text-[14px] hover:bg-[#51677E] rounded-lg transition-colors hover:text-white"
                  >
                    <span className="mr-4">
                      <IoBriefcase className="text-[20px]" />
                    </span>
                    Cases
                  </li>
                </Link>
              </ul>
            </div>

            {/* Bottom Section */}
            <div className="px-4 py-2 border-t border-blue-100">
              <ul className="space-y-2">
                <li
                  className="flex items-center px-4 py-[9px] text-black text-[14px] hover:bg-[#51677E] rounded-lg transition-colors cursor-pointer hover:text-white"
                  onClick={handleLogoutFunc}
                >
                  <span className="mr-3">
                    <IoLogOut className="text-[22px]" />
                  </span>
                  Log out
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
