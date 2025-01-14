import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import buildingLogo from '../assets/image/buildingdesign.png'
import { RxDashboard } from 'react-icons/rx'
import { FaUsers } from 'react-icons/fa'
import { IoBriefcase, IoLogOut } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateRole } from '../redux/auth/authAction'
import { USER_LOGOUT_SUCCESS } from '../redux/auth/authType'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [isUsersOpen, setIsUsersOpen] = useState(false)

  const isActive = (path) => location.pathname === path
  const isParentActive = (paths) =>
    paths.some((path) => location.pathname === path)

  const userPaths = [
    '/admin/coordinator/dashboard',
    '/admin/field-executive/dashboard',
    '/admin/supervisor/dashboard',
    '/admin/auditor/dashboard',
    '/admin/dashboard/all/users',
  ]

  const handleNavigation = (path) => {
    if (!userPaths.includes(path)) {
      // Collapse Users section if navigating outside its routes
      setIsUsersOpen(false)
    }
    navigate(path)
  }

  const handleLogoutFunc = () => {
    dispatch({ type: USER_LOGOUT_SUCCESS })
  }

  const handleAllUser = () => {
    navigate('/admin/dashboard/all/users')
  }

  return (
    <aside
      className={`bg-[#073c4e] shadow-lg h-screen lg:sticky lg:h-[100vh] w-60 p-4 top-0 left-0  fixed z-50 transform transition-transform
       duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      lg:translate-x-0 lg:relative md:w-64`}
    >
      {/* Sidebar Content */}
      <div className="flex gap-10 flex-col h-full">
        <div className="flex gap-4 ">
          <button
            onClick={toggleSidebar}
            className="text-xl lg:hidden text-white rounded-full hover:bg-black p-1"
          >
            <FaTimes />
          </button>
          <Link to="/admin/dashboard">
            <div className="">
              <h1 className="text-lg font-medium text-white">BLACK OLIVE</h1>
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2 ">
            <ul className="space-y-1">
              <li
                onClick={() => handleNavigation('/admin/dashboard')}
                className={`cursor-pointer flex items-center px-4 py-2 text-[14px] text-white hover:bg-[#51677E] hover:text-white rounded-lg transition-colors ${
                  isActive('/admin/dashboard') ? 'bg-[#51677E] text-white' : ''
                }`}
              >
                <span className="mr-3">
                  <RxDashboard className="text-[20px]" />
                </span>
                Dashboard
              </li>

              {/* Users */}
              <li
                // onClick={() => setIsUsersOpen(!isUsersOpen)}
                onClick={() => handleNavigation('/admin/dashboard/all/users')}
                className={`flex items-center justify-between px-4 py-2 text-black text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg cursor-pointer transition-colors ${
                  isParentActive(userPaths) ? 'bg-[#51677E] text-white' : ''
                }`}
              >
                <div
                  className="flex items-center text-white"
                  onClick={handleAllUser}
                >
                  <span className="mr-3">
                    <FaUsers
                      className={`text-[20px]  ${
                        isActive('/admin/dashboard/all/users')
                          ? 'bg-[#51677E] text-white'
                          : ''
                      }`}
                    />
                  </span>
                  Users
                </div>
              </li>

              {/* {isUsersOpen && (
                <div className="ml-8 space-y-1">
                  <li
                    onClick={() =>
                      handleNavigation('/admin/coordinator/dashboard')
                    }
                    className={`flex items-center px-4 py-2 cursor-pointer text-sm text-white text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors ${
                      isActive('/admin/coordinator/dashboard')
                        ? 'bg-[#51677E] text-white'
                        : ''
                    }`}
                  >
                    Co-ordinator
                  </li>
                  <li
                    onClick={() =>
                      handleNavigation('/admin/field-executive/dashboard')
                    }
                    className={`flex items-center px-4 py-2 cursor-pointer text-sm text-white text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors ${
                      isActive('/admin/field-executive/dashboard')
                        ? 'bg-[#51677E] text-white'
                        : ''
                    }`}
                  >
                    Field Executive
                  </li>
                  <li
                    onClick={() =>
                      handleNavigation('/admin/supervisor/dashboard')
                    }
                    className={`flex items-center px-4 py-2 cursor-pointer text-sm text-white text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors ${
                      isActive('/admin/supervisor/dashboard')
                        ? 'bg-[#51677E] text-white'
                        : ''
                    }`}
                  >
                    Supervisor
                  </li>
                  <li
                    onClick={() => handleNavigation('/admin/auditor/dashboard')}
                    className={`flex items-center px-4 py-2 cursor-pointer text-sm text-white text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors ${
                      isActive('/admin/auditor/dashboard')
                        ? 'bg-[#51677E] text-white'
                        : ''
                    }`}
                  >
                    Auditor
                  </li>
                </div>
              )} */}

              {/* Cases */}
              <li
                onClick={() => handleNavigation('/admin/dashboard/cases')}
                className={`cursor-pointer flex items-center px-4 py-2 text-white text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors ${
                  isActive('/admin/dashboard/cases')
                    ? 'bg-[#51677E] text-white'
                    : ''
                }`}
              >
                <span className="mr-3">
                  <IoBriefcase className="text-[20px]" />
                </span>
                Cases
              </li>
            </ul>
          </div>

          {/* <-----------------------------------Logout------------------------------------> */}
          <div className="pt-4 border-t border-blue-100">
            <ul className="space-y-2">
              <li
                onClick={handleLogoutFunc}
                className="cursor-pointer flex items-center px-4 py-2 text-white text-[14px] hover:bg-[#51677E] hover:text-white rounded-lg transition-colors"
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
  )
}

export default Sidebar
