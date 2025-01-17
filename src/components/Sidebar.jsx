import React from 'react'
import { FaTimes, FaUsers } from 'react-icons/fa'
import { RxDashboard } from 'react-icons/rx'
import { IoBriefcase, IoLogOut } from 'react-icons/io5'
import { BsBank2 } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { USER_LOGOUT_SUCCESS } from '../redux/auth/authType'
import { MdDashboard } from 'react-icons/md'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // Define the navigation items for the sidebar
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <MdDashboard className="text-[20px]" />,
      path: '/admin/dashboard',
    },
    {
      name: 'Users',
      icon: <FaUsers className="text-[20px]" />,
      path: '/admin/dashboard/all/users',
    },
    {
      name: 'Banks',
      icon: <BsBank2 className="text-[20px]" />,
      path: '/admin/dashboard/all/banks',
    },
    {
      name: 'Cases',
      icon: <IoBriefcase className="text-[20px]" />,
      path: '/admin/dashboard/cases',
    },
  ]

  // Helper to check if a menu item is active based on the current path
  const isActive = (path) => location.pathname === path

  const handleNavigation = (path) => {
    navigate(path)
  }

  const handleLogout = () => {
    dispatch({ type: USER_LOGOUT_SUCCESS })
  }

  return (
    <aside
      className={`bg-white shadow-lg shadow-[#52687e] rounded-sm h-screen lg:sticky lg:h-[100vh] w-48 lg:w-56 p-4 top-0 left-0 fixed z-50 transform transition-transform
        duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } 
        lg:translate-x-0 lg:relative md:w-64`}
    >
      <div className="flex gap-10 flex-col h-full">
        {/* Header */}
        <div className="flex gap-4">
          <button
            onClick={toggleSidebar}
            className="text-xl lg:hidden text-gray-500 rounded-full hover:bg-black p-1"
          >
            <FaTimes />
          </button>
          <div className="w-full text-center flex justify-center items-center">
            <Link to="/admin/dashboard">
              <h1 className="text-lg font-medium text-gray-500">REV</h1>
            </Link>
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
                  isActive(item.path) ? 'bg-[#51677E] !text-white' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </li>
            ))}
          </ul>

          {/* Logout */}
          <div className="pt-4 border-t border-blue-100">
            <ul className="space-y-2">
              <li
                onClick={handleLogout}
                className="cursor-pointer flex items-center px-4 py-2 text-[14px] text-gray-500 hover:bg-[#51677E] hover:!text-white rounded-lg transition-colors"
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
