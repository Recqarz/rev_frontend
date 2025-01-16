import React, { useState } from 'react';
import { FaBars, FaTimes, FaUsers } from 'react-icons/fa';
import { RxDashboard } from 'react-icons/rx';
import { IoBriefcase, IoLogOut } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER_LOGOUT_SUCCESS } from '../redux/auth/authType';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userPaths = [
    '/admin/coordinator/dashboard',
    '/admin/field-executive/dashboard',
    '/admin/supervisor/dashboard',
    '/admin/auditor/dashboard',
    '/admin/dashboard/all/users',
  ];

  const bankPaths = ['/admin/dashboard/all/banks'];

  const isActive = (path) => location.pathname === path;
  const isParentActive = (paths) => paths.some((path) => isActive(path));

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogoutFunc = () => {
    dispatch({ type: USER_LOGOUT_SUCCESS });
  };

  return (
    <aside
      className={`bg-[#073c4e] shadow-lg h-screen lg:sticky lg:h-[100vh] w-60 p-4 top-0 left-0 fixed z-50 transform transition-transform
        duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:relative md:w-64`}
    >
      <div className="flex gap-10 flex-col h-full">
        <div className="flex gap-4">
          <button
            onClick={toggleSidebar}
            className="text-xl lg:hidden text-white rounded-full hover:bg-black p-1"
          >
            <FaTimes />
          </button>
          <Link to="/admin/dashboard">
            <h1 className="text-lg font-medium text-white">BLACK OLIVE</h1>
          </Link>
        </div>
        <div className="flex flex-col justify-between h-full">
          <ul className="space-y-1">
            <li
              onClick={() => handleNavigation('/admin/dashboard')}
              className={`cursor-pointer flex items-center px-4 py-2 text-[14px] text-white hover:bg-[#51677E] rounded-lg transition-colors ${
                isActive('/admin/dashboard') ? 'bg-[#51677E]' : ''
              }`}
            >
              <span className="mr-3">
                <RxDashboard className="text-[20px]" />
              </span>
              Dashboard
            </li>

            {/* Users Section */}
            <li
              className={`cursor-pointer flex items-center px-4 py-2 text-[14px] text-white hover:bg-[#51677E] rounded-lg transition-colors ${
                isParentActive(userPaths) ? 'bg-[#51677E]' : ''
              }`}
              onClick={() => handleNavigation('/admin/dashboard/all/users')}
            >
              <span className="mr-3">
                <FaUsers className="text-[20px]" />
              </span>
              Users
            </li>

            {/* Banks Section */}
            <li
              className={`cursor-pointer flex items-center px-4 py-2 text-[14px] text-white hover:bg-[#51677E] rounded-lg transition-colors ${
                isParentActive(bankPaths) ? 'bg-[#51677E]' : ''
              }`}
              onClick={() => handleNavigation('/admin/dashboard/all/banks')}
            >
              <span className="mr-3">
                <RxDashboard className="text-[20px]" />
              </span>
              Banks
            </li>

            {/* Cases */}
            <li
              onClick={() => handleNavigation('/admin/dashboard/cases')}
              className={`cursor-pointer flex items-center px-4 py-2 text-[14px] text-white hover:bg-[#51677E] rounded-lg transition-colors ${
                isActive('/admin/dashboard/cases') ? 'bg-[#51677E]' : ''
              }`}
            >
              <span className="mr-3">
                <IoBriefcase className="text-[20px]" />
              </span>
              Cases
            </li>
          </ul>

          {/* Logout */}
          <div className="pt-4 border-t border-blue-100">
            <ul className="space-y-2">
              <li
                onClick={handleLogoutFunc}
                className="cursor-pointer flex items-center px-4 py-2 text-[14px] text-white hover:bg-[#51677E] rounded-lg transition-colors"
              >
                <span className="mr-3">
                  <IoLogOut className="text-[22px]" />
                </span>
                Log out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
